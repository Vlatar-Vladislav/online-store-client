import { useEffect, useState } from "react"
import styles from "./index.module.scss"
import moment from "moment"
import { SubmitHandler, useForm } from "react-hook-form"
import { setIsAuth, setUser } from "@/src/store/reducers/authSlice"
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux"
import { isAuthWindowOpen, isProfileWindowOpen } from "@/src/store/reducers/modalWindowsSlice"
import { setNotActivatedWindowTimer, setReviewAddWindowTimer } from "@/src/store/reducers/alertWindowsSlice"
import { addComment, getComments, getMe } from "@/src/services/userService"

interface FormData {
    comment: string
    advantages: string
    disadvantages: string
}

// const ReviewsBlock = ({product} : {product: any}) => {
const ReviewsBlock = ({productId}: {productId: number}) => {
    const [comments, setComments] = useState([])
    const [createComment, setCreateComment] = useState(false)
    const [rating, setRating] = useState(0)
    const {isAuth, commentDeleted, user} = useAppSelector(state => state.authReducer)
    const { register, handleSubmit, formState: { errors }, setValue} = useForm<FormData>({mode: 'onChange'})
    const dispatch = useAppDispatch()

    useEffect(() => {
        async function getData() {
            const responce = await getComments(productId)
            setComments(responce.sort((a: IProductComment, b: IProductComment) => {
                const dateA: any = new Date(a.updatedAt);
                const dateB: any = new Date(b.updatedAt);
                return dateB - dateA;
            }))
        }
        getData()
    }, [commentDeleted])

    const stars = ['★', '★', '★', '★', '★']
    let sum = 0
    let one = 0
    let two = 0
    let three = 0
    let four = 0
    let five = 0

    comments.map((comment: IProductComment) => {
        switch (comment.rating) {
            case 5:
                five += 1
                sum += 5
                break;
            case 4:
                four += 1
                sum += 4
                break; 
            case 3:
                three += 1
                sum += 3
                break;
            case 2:
                two += 1
                sum += 2
                break;
            case 1:
                one += 1
                sum += 1
                break; 
            default:
                break;
        }
    })

    const onSubmit: SubmitHandler<FormData> = async (comment) => {
        if(isAuth){
            if(user.isActivated){
                const data = await getMe()
                if(data){
                    const message = await addComment(productId, {rating, ...comment})
                    if(message === 'Ok'){
                        const responce = await getComments(productId)
                        dispatch(setReviewAddWindowTimer(3))
                        setCreateComment(false)
                        setRating(0)
                        setValue("comment", '')
                        setValue("advantages", '')
                        setValue("disadvantages", '')
                        setComments(responce.sort((a: IProductComment, b: IProductComment) => {
                            const dateA: any = new Date(a.updatedAt);
                            const dateB: any = new Date(b.updatedAt);
                            return dateB - dateA;
                        }))
                    } else {
                        dispatch(setIsAuth(false))
                        dispatch(isAuthWindowOpen(true))
                    }
                } else{
                    dispatch(setIsAuth(false))
                    dispatch(isAuthWindowOpen(true))
                }
            } else{
                dispatch(setNotActivatedWindowTimer(3))
                dispatch(isProfileWindowOpen(true))
            }
        }else{
            dispatch(setIsAuth(false))
            dispatch(isAuthWindowOpen(true))
        }
    };

    const onClick = async () => {
        if(isAuth){
            if(user.isActivated){
                const data = await getMe()
                if(data){
                    dispatch(setIsAuth(true))
                    dispatch(setUser(data))
                    setCreateComment(true)
                } else{
                    dispatch(setIsAuth(false))
                    dispatch(isAuthWindowOpen(true))
                }
            } else{
                dispatch(setNotActivatedWindowTimer(3))
                dispatch(isProfileWindowOpen(true))
            }
        }else{
            dispatch(setIsAuth(false))
            dispatch(isAuthWindowOpen(true))
        }
    }

    return(
        <div className={styles.column}>
            <div className={styles.column_comments}>
                {comments.length === 0 ? <div className={styles.no_comments}>Под этим товаром ещё нет отзывов!</div> : comments.map((comment: IProductComment) => 
                    <div key={comment.id} className={styles.comment}>
                        <div className={styles.comment_info}>
                            {stars.map((star, starIndex) => 
                                <h3 key={starIndex} className={starIndex + 1 <= Math.round(comment.rating) ? styles.comment_info_star_active : styles.comment_info_star}>{star}</h3>
                            )}
                            <h3 className={styles.comment_info_time}>{moment(comment.updatedAt).utcOffset('+03:00').format('DD.MM.YYYY')}</h3>
                        </div>
                        <div className={styles.comment_content}>
                            <div className={styles.comment_content_position_block}>
                                <p className={styles.comment_content_main}>{comment.comment}</p>
                            </div>
                            {comment.advantages || comment.disadvantages ? 
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
                    </div>
                )}
            </div>
            <div className={styles.column_statistics}>
                {createComment && isAuth ? 
                    <div className={styles.add_comment}>
                        <form className={styles.add_comment_form} onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.add_comment_form_header}>
                                Оставить отзыв
                                <button className={styles.add_comment_form_header_button} onClick={() => {
                                    setCreateComment(false)
                                    setRating(0)
                                    setValue("comment", '')
                                    setValue("advantages", '')
                                    setValue("disadvantages", '')
                                }}>
                                    <img className={styles.img} src={'./ico/another-left-ico.svg'}/>
                                </button>
                            </div>
                            <div className={styles.star_button_block}>
                                {stars.map((star, starIndex) => 
                                    <button key={starIndex} type="button" className={starIndex + 1 <= Math.round(rating) ? styles.star_button_active : styles.star_button} onClick={() => {setRating(starIndex + 1)}}>{star}</button>)
                                }
                            </div>
                            <div>
                                <div className={styles.add_comment_form_position_block}>
                                    <h6 className={styles.add_comment_form_text}>{'Основная часть (обязательная):'}</h6>
                                    <textarea className={styles.add_comment_form_input} {...register('comment', {
                                            required: 'Основная часть обязательна!',
                                            maxLength: {value: 500, message: 'Не более 500 символов!'}
                                        }
                                    )} maxLength={500}/>
                                </div>
                                <div className={styles.add_comment_form_position_block}>
                                    <h6 className={styles.add_comment_form_text}>Преимущества:</h6>
                                    <textarea className={styles.add_comment_form_input}{...register('advantages', {
                                            maxLength: {value: 500, message: 'Не более 500 символов!'}
                                        }
                                    )} maxLength={500}/>
                                </div>
                                <div className={styles.add_comment_form_position_block}>
                                    <h6 className={styles.add_comment_form_text}>Недостатки:</h6>
                                    <textarea className={styles.add_comment_form_input} {...register('disadvantages', {
                                            maxLength: {value: 500, message: 'Не более 500 символов!'}
                                        }
                                    )} maxLength={500}/>
                                </div>
                            </div>
                            <div className={styles.add_comment_form_button_block}>
                                <button disabled={errors.comment || errors.advantages || errors.disadvantages || rating === 0 ? true : false} className={styles.add_comment_form_button} type="submit">Отправить</button>
                            </div>                            
                        </form>
                    </div>:
                    <div className={styles.add_comment_button} onClick={onClick}>
                        <span className={styles.add_comment_button_plus}>+</span>Оставить отзыв
                    </div>
                }
                <div className={styles.statistics}>
                    <div className={styles.statistics_all}>
                        <h2 className={styles.statistics_all_rating}>{comments.length ? Number((sum / comments.length).toFixed(1)) : 0} ★</h2>
                        <span className={styles.statistics_all_all}>{`Всего отзывов: ${comments.length}`}</span>
                    </div>
                    <div className={styles.statistics_detail}>
                        <div className={styles.statistics_row}>
                            <span className={styles.statistics_row_span}>5</span><div className={styles.statistics_row_line} style={{backgroundImage: `linear-gradient(to right, rgb(224, 145, 0) ${five / comments.length * 100}%, rgba(0, 0, 0, 0) ${five / comments.length * 100}%)`}}></div>{}
                        </div>
                        <div className={styles.statistics_row}>
                            <span className={styles.statistics_row_span}>4</span><div className={styles.statistics_row_line} style={{backgroundImage: `linear-gradient(to right, rgb(224, 145, 0) ${four / comments.length * 100}%, rgba(0, 0, 0, 0) ${four / comments.length * 100}%)`}}></div>{}
                        </div>
                        <div className={styles.statistics_row}>
                            <span className={styles.statistics_row_span}>3</span><div className={styles.statistics_row_line} style={{backgroundImage: `linear-gradient(to right, rgb(224, 145, 0) ${three / comments.length * 100}%, rgba(0, 0, 0, 0) ${three / comments.length * 100}%)`}}></div>{}
                        </div>
                        <div className={styles.statistics_row}>
                            <span className={styles.statistics_row_span}>2</span><div className={styles.statistics_row_line} style={{backgroundImage: `linear-gradient(to right, rgb(224, 145, 0) ${two / comments.length * 100}%, rgba(0, 0, 0, 0) ${two / comments.length * 100}%)`}}></div>{}
                        </div>
                        <div className={styles.statistics_row}>
                            <span className={styles.statistics_row_span}>1</span><div className={styles.statistics_row_line} style={{backgroundImage: `linear-gradient(to right, rgb(224, 145, 0) ${one / comments.length * 100}%, rgba(0, 0, 0, 0) ${one / comments.length * 100}%)`}}></div>{}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ReviewsBlock