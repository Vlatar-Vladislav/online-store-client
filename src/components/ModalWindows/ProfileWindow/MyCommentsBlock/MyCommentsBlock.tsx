import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import styles from "./index.module.scss"
import Link from "next/link"
import moment from "moment"
import { isAuthWindowOpen, isProfileWindowOpen } from "@/src/store/reducers/modalWindowsSlice"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { setCommentDeleted, setIsAuth, setUser } from "@/src/store/reducers/authSlice"
import { setNotActivatedWindowTimer, setReviewAddWindowTimer, setReviewDeleteWindowTimer } from "@/src/store/reducers/alertWindowsSlice"
import { deleteComment, getMe, updateComment } from "@/src/services/userService"

interface FormData {
    comment: string
    advantages: string
    disadvantages: string
}

const MyCommentsBlock = () => {
    const stars = ['★', '★', '★', '★', '★']

    const [remake, setRemake] = useState(-1)
    const [remakeComment, setRemakeComment] = useState({rating: 0, comment: '', advantages: '', disadvantages: ''})

    const { register, handleSubmit, formState: { errors }, setValue} = useForm<FormData>({mode: 'onChange'})
    const {isAuth, user} = useAppSelector(state => state.authReducer)
    const comments = useAppSelector(state => state.authReducer.user.comments)
    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if(isAuth){
            if(user.isActivated){
                const message = await updateComment(remake, {...remakeComment})
                if(message === 'Ok'){                    
                    const data = await getMe()
                    if(data){
                        dispatch(setReviewAddWindowTimer(3))
                        dispatch(setIsAuth(true))
                        dispatch(setUser(data))
                    } else{
                        dispatch(setIsAuth(false))
                        dispatch(isAuthWindowOpen(true))
                    }
                } else{
                    dispatch(setIsAuth(false))
                    dispatch(isAuthWindowOpen(true))
                }
            } else{
                dispatch(setNotActivatedWindowTimer(3))
                dispatch(isProfileWindowOpen(false))
                dispatch(isProfileWindowOpen(true))
            }
        } else{
            dispatch(setIsAuth(false))
            dispatch(isAuthWindowOpen(true))
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.container_comments}>
                {comments?.length === 0 || !comments ? <div className={styles.no_comments}>Вы не оставляли отзывов о товарах!</div> : comments.map((comment) => 
                    <div key={comment.id} className={styles.comment}>
                        <div className={styles.comment_buttons}>
                            {remake === comment.id ? 
                                <button className={styles.comment_buttons_button_3} onClick={() =>{
                                    handleSubmit(onSubmit)()
                                    setRemake(-1)
                                    setRemakeComment({rating: 0, comment: '', advantages: '', disadvantages: ''})                                    
                                }}>
                                    <img className={styles.img} src={'./ico/ok-ico.svg'}/>
                                </button> :
                                <button className={styles.comment_buttons_button_1} onClick={() => {
                                    setRemakeComment({rating: comment.rating, comment: comment.comment, advantages: comment.advantages, disadvantages: comment.disadvantages})
                                    setValue('comment', comment.comment)
                                    setValue('advantages', comment.advantages ? comment.advantages : '')
                                    setValue('disadvantages', comment.disadvantages ? comment.disadvantages : '')
                                    setRemake(comment.id)
                                }}>
                                    <img className={styles.img} src={'/ico/hammer-ico.svg'}/>
                                </button>
                            }
                            <button className={styles.comment_buttons_button_2} onClick={async () => {
                                if(isAuth){
                                    if(user.isActivated){
                                        dispatch(setCommentDeleted(true))
                                        const message = await deleteComment(comment.id)
                                        if(message === 'Ok'){                    
                                            const data = await getMe()
                                            if(data){
                                                dispatch(setCommentDeleted(false))
                                                dispatch(setReviewDeleteWindowTimer(3))
                                                dispatch(setIsAuth(true))
                                                dispatch(setUser(data))
                                            } else{
                                                dispatch(setCommentDeleted(false))
                                                dispatch(setIsAuth(false))
                                                dispatch(isAuthWindowOpen(true))
                                            }
                                        } else{
                                            dispatch(setCommentDeleted(false))
                                            dispatch(setIsAuth(false))
                                            dispatch(isAuthWindowOpen(true))
                                        }
                                    } else{
                                        dispatch(setNotActivatedWindowTimer(3))
                                        dispatch(isProfileWindowOpen(false))
                                        dispatch(isProfileWindowOpen(true))
                                    }
                                } else{
                                    dispatch(setIsAuth(false))
                                    dispatch(isAuthWindowOpen(true))
                                }
                            }}>
                                <img className={styles.img} src={'/ico/cross-ico.svg'}/>
                            </button>
                        </div>
                        <div className={styles.comment_product}>
                            Товар:<Link onClick={() => dispatch(isProfileWindowOpen(false))} className={styles.comment_product_link} href={`http://localhost:3000/${comment.productId}`}>{comment.productName}</Link>
                        </div>
                        <div className={styles.comment_info}>
                            {remake === comment.id ?
                                stars.map((star, starIndex) => 
                                    <button key={starIndex} className={starIndex + 1 <= Math.round(remakeComment.rating) ? styles.star_button_active : styles.star_button} onClick={() => {setRemakeComment({...remakeComment, rating: starIndex+1})}}>{star}</button>):
                                stars.map((star, starIndex) => 
                                    <h3 key={starIndex} className={starIndex + 1 <= Math.round(comment.rating) ? styles.comment_info_star_active : styles.comment_info_star}>{star}</h3>
                                )
                            }
                            <h3 className={styles.comment_info_time}>{moment(comment.updatedAt).utcOffset('+03:00').locale('ru').format('DD.MM.YYYY')}</h3>
                        </div>
                        {remake === comment.id ? 
                            <form className={styles.comment_form}>
                                <textarea className={styles.comment_form_input} {...register('comment', {
                                        required: 'Основная часть обязательна!',
                                        maxLength: {value: 500, message: 'Не более 500 символов!'}
                                    }
                                )} maxLength={500}  value={remakeComment.comment} onChange={(e) => {
                                    setRemakeComment({...remakeComment, comment: e.target.value})
                                }}/>
                                <div>
                                    <div className={styles.comment_form_position_block}>
                                        <h6 className={styles.comment_content_advantages_static}>Преимущества:</h6>
                                        <textarea className={styles.comment_form_input_advantages}{...register('advantages', {
                                                maxLength: {value: 500, message: 'Не более 500 символов!'}
                                            }
                                        )} maxLength={500} value={remakeComment.advantages ? remakeComment.advantages : ''} onChange={(e) => {
                                            setRemakeComment({...remakeComment, advantages: e.target.value})
                                        }}/>
                                    </div>
                                    <div className={styles.comment_form_position_block}>
                                        <h6 className={styles.comment_content_advantages_static}>Недостатки:</h6>
                                        <textarea className={styles.comment_form_input_advantages} {...register('disadvantages', {
                                                maxLength: {value: 500, message: 'Не более 500 символов!'}
                                            }
                                        )} maxLength={500} value={remakeComment.disadvantages ? remakeComment.disadvantages : ''} onChange={(e) => {
                                            setRemakeComment({...remakeComment, disadvantages: e.target.value})
                                        }}/>
                                    </div>
                                </div>
                            </form> :
                            <div className={styles.comment_content}>
                                <div className={styles.comment_content_position_block}>
                                    <p className={styles.comment_content_main}>{comment.comment}</p>
                                </div>
                                {comment.advantages || comment.disadvantages || remake === comment.id ? 
                                    <div>
                                        <div className={styles.comment_content_position_block}>
                                            <p className={styles.comment_content_advantages}><span className={styles.comment_content_advantages_static}>Преимущества:</span> {comment.advantages ? comment.advantages : '—'}</p>
                                        </div>
                                        <div className={styles.comment_content_position_block}>
                                            <p className={styles.comment_content_advantages}><span className={styles.comment_content_advantages_static}>Недостатки:</span> {comment.disadvantages ? comment.disadvantages : '—'}</p>
                                        </div>
                                    </div> : null
                                } 
                            </div>                            
                        }
                    </div>
                )}
            </div>
            
        </div>        
    )
}
export default MyCommentsBlock