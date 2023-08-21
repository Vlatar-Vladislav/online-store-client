import { useAppDispatch } from "@/src/hooks/redux"
import styles from "./index.module.scss"
import { isAuthWindowOpen } from "@/src/store/reducers/modalWindowsSlice"
import WindowLogo from "../WindowLogo/WindowLogo"
import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from "react"
import SignupForm from "./Forms/SignupForm"
import SigninForm from "./Forms/SigninForm"

interface FormData {
    email: string
    password: string
    confirmPassword?: string
}

const AuthWindow = () => {
    const dispatch = useAppDispatch()
    const [isNoRegistered, setIsNoRegistered] = useState(true)

    return(
        <div className={styles.modal} onClick={() => dispatch(isAuthWindowOpen(false))}>
            <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
                <WindowLogo/>
                {isNoRegistered ?
                <div className={styles.modal_container_content}>
                    <h2 className={styles.modal_container_content_name}>Регистрация</h2>
                    <SignupForm/>
                    <div className={styles.modal_container_content_or}>
                        Уже есть акаунт? <span className={styles.modal_container_content_or_click} onClick={() => setIsNoRegistered(false)}>Войти!</span>
                    </div>
                </div> : 
                <div className={styles.modal_container_content}>
                    <h2 className={styles.modal_container_content_name}>Вход</h2>
                    <SigninForm/>
                    <div className={styles.modal_container_content_or_2}>
                        Ещё нет акаунта? <span className={styles.modal_container_content_or_2_click} onClick={() => setIsNoRegistered(true)}>Создать!</span>
                    </div>
                </div>}
            </div>
        </div>
    )
}
export default AuthWindow