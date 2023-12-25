import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import styles from "./index.module.scss"
import moment from "moment"
import { isProfileWindowOpen } from "@/src/store/reducers/modalWindowsSlice"

const OrdersBlock = () => {
    const user = useAppSelector( state => state.authReducer.user)
    const dispatch = useAppDispatch()

    let orders: IOrder[] = []
    if(user.orders !== null){
        orders = [...user.orders].sort((a, b) => {
            const dateA: any = new Date(a.createdAt);
            const dateB: any = new Date(b.createdAt);
            return dateB - dateA;
        })
    }
    

    return (
        <div className={styles.container}>
            {orders?.map((order) => 
                <div className={styles.order} key={order.id}>
                    <div className={styles.number}>{order.id}</div>
                    <div className={styles.data}>
                        Статус: <span>{order.status}</span>
                        <span className={styles.time}>{moment(order.createdAt).utcOffset('+03:00').format('HH:mm DD.MM.YYYY')}</span>
                    </div>
                    <div style={{margin: '10px 0px 5px 0px'}} className={styles.line}>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</div>
                    {order.items.map((item) => 
                        <div className={styles.item} key={item.id}>
                            <span style={{width: '90%'}}>{item.name}</span>
                            <span className={styles.center}>x</span>
                            <span className={styles.center}>{item.quantity} шт</span>
                            <span className={styles.center}>x</span>
                            <span className={styles.center}>{item.price}$</span>
                        </div>
                    )}
                    <div style={{margin: '5px 0px 5px 0px'}} className={styles.line}>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</div>
                    <div className={styles.price}>Общая стоимость: <span>{order.totalPrice}$</span></div>
                </div>
            )}
        </div>        
    )
}
export default OrdersBlock