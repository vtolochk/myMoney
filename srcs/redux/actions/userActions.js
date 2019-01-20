import { AUTH_USER } from '../actionTypes'

export const authUserAction = isAuth => ({ type: AUTH_USER, payload: isAuth })