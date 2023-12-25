import { isAuthWindowOpen, isChatWindowOpen } from "@/src/store/reducers/modalWindowsSlice"
import styles from "./index.module.scss"
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import WindowLogo from "../WindowLogo/WindowLogo"
import { useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"
import moment from "moment"

const ChatWindow = () => {
    const {isAuth} = useAppSelector(state => state.authReducer)
    const {email, createdAt} = useAppSelector(state => state.authReducer.user)
    const dispatch = useAppDispatch()

    const [globalSocket, setGlobalSocket] = useState<Socket | null>(null)
    const [message, setMessage] = useState<string>('')
    const [messages, setMessages] = useState<IMessage[]>([])

    // const socket = io('http://localhost:7002')

    // socket.on('connect', () => {
    //     console.log('Connect')
    //     // // dispatch(setIsLoading(false))
    // })
    // socket.on('onConnected', (data) => {
    //     console.log(data)
    //     socket.emit('sendUserData', id)
    // })

    globalSocket?.on('sendNewMessageToUser', (data: any) => {
        setMessages([data.message, ...messages])
    })

    useEffect(() => {
        // const socket = io('http://localhost:7002')
        const socket = io('http://localhost:7002')
        setGlobalSocket(socket)

		socket.on('connect', () => {
			// // dispatch(setIsLoading(false))
		})

		socket.on('onConnected', (data) => {
			socket.emit('sendUserData', {email})
		})

        socket.on('sendMessagesToUser', (data) => {
            setMessages([...messages, ...data.messages])
		})
    
        return () => {
            socket.close()
        };
    }, []);

    const eventSendMessage = async () => {
        if(isAuth){
            if (message.trim() !== ''){
                globalSocket?.emit('sendMessageToAdmin', {email: email, message: message})
                globalSocket?.on('onIsCreated', (data) => {
                    setMessages([data.message, ...messages])
                })
                setMessage('')
            }
        } else{
            dispatch(isAuthWindowOpen(true))
        }
    }

    let date: string | null = null
    let messageBlocks: any[] = []
    const renderMessages = async () => {
        messages.map((message, messageIndex) => {
            if(date === null){
                date = moment(message.createdAt).utcOffset('+03:00').format('DD.MM.YYYY')
            }
            if(date !== moment(message.createdAt).utcOffset('+03:00').format('DD.MM.YYYY')){
                messageBlocks.push(
                    <div key={date} className={styles.date}>{date}</div>
                )
                date = moment(message.createdAt).utcOffset('+03:00').format('DD.MM.YYYY')
            }
            messageBlocks.push(
                <div key={message.id} className={message.addresser !== 'ADMIN' ? styles.messages_user : styles.messages_admin}>
                    <div>{message.message}</div>
                    <span>{moment(message.createdAt).utcOffset('+03:00').format('HH.mm')}</span>
                </div>
            )
            if(messageIndex === messages.length - 1){
                messageBlocks.push(
                    <div key={`${date}f`} className={styles.date}>{date}</div>
                )
            }
        })
    }
    renderMessages()

    return(
        <div className={styles.modal} onClick={() => dispatch(isChatWindowOpen(false))}>
            <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
                <WindowLogo/>
                <div className={styles.messages}>
                    {messageBlocks}
                    <div className={styles.messages_admin}>
                        <div>Приветствуем вас! В данном чате вы можете задать любой интересующий вас вопрос.</div>
                        <span>{moment(createdAt).utcOffset('+03:00').format('HH.mm')}</span>
                    </div>
                    <div className={styles.date}>{moment(createdAt).utcOffset('+03:00').format('DD.MM.YYYY')}</div>                 
                </div>
                <div className={styles.message_input}>
                    <textarea value={message} placeholder="Введите сообщение" maxLength={255} onChange={(e) => {
                        setMessage(e.target.value)
                    }}/>
                    <button onClick={eventSendMessage}>
                        <svg className={styles.svg} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.66193 4.75542L43.9718 23.0781C44.7575 23.4352 44.7522 24.553 43.9632 24.9027L3.66056 42.7641C2.94016 43.0833 2.1507 42.4827 2.26618 41.7033L3.9015 30.6649C3.96106 30.2628 4.25805 29.9368 4.65283 29.8401L24.5339 24.9713C25.55 24.7224 25.55 23.2776 24.5339 23.0287L4.65649 18.1608C4.25988 18.0636 3.96216 17.7351 3.90441 17.3309L2.25817 5.80721C2.14646 5.02525 2.94283 4.42856 3.66193 4.75542Z" fill="rgb(224, 145, 0)" stroke="rgb(224, 145, 0)" strokeWidth="4"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ChatWindow