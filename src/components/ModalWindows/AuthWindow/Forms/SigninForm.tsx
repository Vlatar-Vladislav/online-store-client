import { useForm, SubmitHandler, Controller } from "react-hook-form"
import styles from "./index.module.scss"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import { setEmail, setPassword } from "@/src/store/reducers/signinSlice"
import { isAuthWindowOpen } from "@/src/store/reducers/modalWindowsSlice"
import { setIsAuth, setUser } from "@/src/store/reducers/authSlice"
import { setSigninWindowTimer } from "@/src/store/reducers/alertWindowsSlice"
import { checkEmail, checkPassword } from "@/src/services/formService"
import { signin } from "@/src/services/authService"
import { getMe } from "@/src/services/userService"

interface FormData {
    email: string
    password: string
}



const SigninForm = () => {
    const { control, register, handleSubmit, formState: { errors }, formState } = useForm<FormData>({mode: 'onChange'});
    const {email, password} = useAppSelector(state => state.signinReducer)
    const dispatch = useAppDispatch()

    const [isDisabled, setIsDisabled] = useState(false)
    const [isNoExists, setIsNoExists] = useState(true)
    const [isNoTrue, setIsNoTrue] = useState(true)

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setIsDisabled(true)
        const message = await signin(data)
        if(message === 'No exists'){
            setIsNoExists(true)
            setIsDisabled(false)
        }
        if(message === 'Incorrect password'){
            setIsNoTrue(true)
            setIsDisabled(false)
        }
    	if(message === 'Ok'){
            const user = await getMe()
            if(user){
                dispatch(setSigninWindowTimer(3))
                dispatch(setIsAuth(true))
                dispatch(setUser(user))
                dispatch(isAuthWindowOpen(false))
            } else {
                dispatch(setIsAuth(false))
                dispatch(isAuthWindowOpen(true))
            }
        }
    };

    const onChangeEmail = async (e: any) => {
        setIsNoExists(true)
        if(e.target.value){
            dispatch(setEmail(e.target.value))
            const message = await checkEmail(e.target.value)
            if(message === 'Busy'){
                setIsNoExists(false)
            }
        }
    }

    const onChangePassword = async (e: any) => {
        if(email){
            if(e.target.value){
                dispatch(setPassword(e.target.value))
                const message = await checkPassword(email, e.target.value)
                // console.log(`Сorrect password: ${message === 'Сorrect password'}`)
                // console.log(`Incorrect password: ${message === 'Incorrect password'}`)
                if(message === 'Сorrect password'){
                    setIsNoTrue(false)
                }
                if(message === 'Incorrect password'){
                    setIsNoTrue(true)
                }
                if(message === 'No exists'){
                    setIsNoExists(true)
                    setIsNoTrue(true)
                }
            }
        }
    }

    return(        
        <form className={styles.form_2} onSubmit={handleSubmit(onSubmit)} noValidate={true}>
            <div className={styles.row}>
                <label className={styles.row_name}>Email</label>
                <Controller name="email" control={control} defaultValue="" rules={{
                        required: '* - Email обязателен!',
                        maxLength: { value: 36, message: '* - Не более 36 символов!' },
                        pattern: {
                            value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                            message: '* - Неверный адрес электронной почты!'
                        }
                    }} render={({field}) => (
                        <input {...field} className={styles.row_input} style={{ borderColor: errors.email ? 'red' : 'rgb(224, 145, 0)' }} placeholder="Введите Email" type="email" maxLength={36}
                            onChange={(e) => {
                                field.onChange(e);
                                onChangeEmail(e);
                            }}
                        />
                    )}
                />
                <div className={styles.row_error_2}>{(isNoExists && formState.dirtyFields.email) ? '*- Пользователь с таким Email не существует!' : errors.email ? `${errors.email.message}` : null}</div>
            </div>
            <div className={styles.row}>
                <label className={styles.row_name}>Пароль</label>
                <Controller name="password" control={control} defaultValue="" rules={{
                        required: '* - Пароль обязателен!',
                        maxLength: {value: 24, message: '* - Не более 24 символов!'},
                        minLength: {value: 3, message: '* - Не короче 3 символов!'}
                    }} render={({field}) => (
                        <input {...field} className={styles.row_input} style={{ borderColor: errors.email ? 'red' : 'rgb(224, 145, 0)' }} placeholder="Введите Пароль" type="password" minLength={3} maxLength={24}
                            onChange={(e) => {
                                field.onChange(e);
                                onChangePassword(e);
                            }}
                        />
                    )}
                />
                <div className={styles.row_error}>{(isNoTrue && formState.dirtyFields.password) ? '*- Неверный пароль' : errors.password ? `${errors.password.message}` : null}</div>
            </div>
            <button disabled={errors.email || errors.password || !formState.dirtyFields.email || !formState.dirtyFields.password || isDisabled || isNoExists || isNoTrue ? true : false} className={styles.form_button} type="submit">Войти</button>
        </form>
    )   
}
export default SigninForm