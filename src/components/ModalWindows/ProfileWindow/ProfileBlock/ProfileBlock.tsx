import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import styles from "./index.module.scss"
import moment from "moment"
import { isProfileWindowOpen } from "@/src/store/reducers/modalWindowsSlice"
import { setIsAuth } from "@/src/store/reducers/authSlice"
import { setLogoutWindowTimer } from "@/src/store/reducers/alertWindowsSlice"
import { logout } from "@/src/services/authService"

const ProfileBlock = () => {
    const user = useAppSelector( state => state.authReducer.user)
    const dispatch = useAppDispatch()

    const onClick = async () => {
        const response = await logout()
        if(response === 'Ok'){
            dispatch(setLogoutWindowTimer(3))
            dispatch(setIsAuth(false))
            dispatch(isProfileWindowOpen(false))
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.container_items}>
                <div className={styles.container_items_item}>ID: <span className={styles.container_items_item_value}>{user.id}</span></div>
                <div className={styles.container_items_item}>Почта: <span className={styles.container_items_item_value}>{user.email}</span></div>
                <div className={styles.container_items_item}>Акаунт автивирован: <span className={styles.container_items_item_value}>{user.isActivated ? 'Да' : 'Нет'}</span></div>
                <div className={styles.container_items_item}>Забанен: <span className={styles.container_items_item_value}>{user.isBanned ? 'Да' : 'Нет'}</span></div>
                <div className={styles.container_items_item}>Дата регистрации акаунта: <span className={styles.container_items_item_value}>{moment(user.createdAt).utcOffset('+03:00').format(`DD.MM.YYYY`)}</span></div>
                <div className={styles.container_items_item}>Дата последнего входа: <span className={styles.container_items_item_value}>{moment(user.updatedAt).utcOffset('+03:00').format(`HH:mm ${'МСК'} DD.MM.YYYY`)}</span></div>                               
            </div>
            <div>
                <button className={styles.close} onClick={() => dispatch(isProfileWindowOpen(false))}>Закрыть</button>
                <button className={styles.logout} onClick={onClick}>Выйти</button>
            </div>

        </div>        
    )
}
export default ProfileBlock