import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExampleState {
    isAuth: boolean
    commentDeleted: boolean
    timerSendActivationLink: number
    user: IUser
    addToCartProductId: number | null
}

const initialState: ExampleState = {
    isAuth: false,
    commentDeleted: true,
    timerSendActivationLink: 0,
    user: {} as IUser,
    addToCartProductId: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth(state, action: PayloadAction<boolean>){
            state.isAuth = action.payload
            state.user = {id: null, email: null, isActivated: null, isBanned: null, comments: null, cartItems: null, favoriteProducts: null, comparedProducts: null, createdAt: null, updatedAt: null}
        },
        setCommentDeleted(state, action: PayloadAction<boolean>){
            state.commentDeleted = action.payload
        },
        setTimerSendActivationLink(state, action: PayloadAction<number>){
            state.timerSendActivationLink = action.payload
        },
        setUser(state, action: PayloadAction<IUser>){
            state.user = action.payload
            state.user.comments?.sort((a, b) => {
                const dateA: any = new Date(a.createdAt);
                const dateB: any = new Date(b.createdAt);
                return dateA - dateB;
            })
        },
        setAddToCartProductId(state, action: PayloadAction<number | null>){
            state.addToCartProductId = action.payload
        }
    },
})

export const { setIsAuth, setCommentDeleted, setUser, setTimerSendActivationLink, setAddToCartProductId } = authSlice.actions

export default authSlice.reducer