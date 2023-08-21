import { useForm, SubmitHandler, Controller } from "react-hook-form"
import styles from "./index.module.scss"
import { useState } from "react"
import { useAppDispatch } from "@/src/hooks/redux"
import { isAuthWindowOpen } from "@/src/store/reducers/modalWindowsSlice"
import { setIsAuth, setUser } from "@/src/store/reducers/authSlice"
import { setSignupWindowTimer } from "@/src/store/reducers/alertWindowsSlice"
import { checkEmail } from "@/src/services/formService"
import { signup } from "@/src/services/authService"
import { getMe } from "@/src/services/userService"

interface FormData {
    email: string
    password: string
    confirmPassword: string
}

const SignupForm = () => {
    const { control, register, handleSubmit, getValues, formState: { errors }, formState } = useForm<FormData>({mode: 'all'});
    const dispatch = useAppDispatch()
    const [isBusy, setIsBusy] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setIsDisabled(true)
        const message = await signup(data)
        if(message === 'Busy'){
            setIsBusy(true)
            setIsDisabled(false)
        }
    	if(message === 'Ok'){
            const user = await getMe()
            if(user){
                dispatch(setSignupWindowTimer(3))
                dispatch(setIsAuth(true))
                dispatch(setUser(user))
                dispatch(isAuthWindowOpen(false))
            } else{
                dispatch(setIsAuth(false))
                dispatch(isAuthWindowOpen(true))
            }
        }
    };

    const onChangeEmail = async (e: any) => {
        setIsBusy(false)
        if(e.target.value){
            const message = await checkEmail(e.target.value)
            if(message === 'Busy'){
                setIsBusy(true)
            }
        }
    }

    return(        
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate={true}>
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
                <div className={styles.row_error}>{isBusy ? '*- Данный Email занят!' : errors.email ? `${errors.email.message}` : null}</div>
            </div>
            <div className={styles.row}>
                <label className={styles.row_name}>Пароль</label>
                <input className={styles.row_input} style={{borderColor: errors.password ? 'red' : 'rgb(224, 145, 0)'}} {...register("password", {
                    required: '* - Пароль обязателен!',
                    maxLength: {value: 24, message: '* - Не более 24 символов!'},
                    minLength: {value: 3, message: '* - Не короче 3 символов!'}
                })} placeholder="Введите Пароль" type="password" minLength={3} maxLength={24}/>
                <div className={styles.row_error}>{errors.password && `${errors.password.message}`}</div>
            </div>
            <div className={styles.row}>
                <label className={styles.row_name}>Подтверждение пароля</label>
                <input className={styles.row_input} style={{borderColor: errors.confirmPassword ? 'red' : 'rgb(224, 145, 0)'}} {...register("confirmPassword", {
                    required: '* - Подтверждение обязательно!',
                    validate: (value) => value === getValues('password') || 'Пароли не совпадают',
                })} placeholder="Подтвердите Пароль" type="password" minLength={3} maxLength={24}/>
                <div className={styles.row_error}>{errors.confirmPassword && `${errors.confirmPassword.message}`}</div>
            </div>
            <button disabled={errors.email || errors.password || errors.confirmPassword || isBusy || !formState.dirtyFields.email || !formState.dirtyFields.password || !formState.dirtyFields.confirmPassword || isDisabled ? true : false} className={styles.form_button} type="submit">Зарегистрироваться</button>
        </form>
    )   
}
export default SignupForm