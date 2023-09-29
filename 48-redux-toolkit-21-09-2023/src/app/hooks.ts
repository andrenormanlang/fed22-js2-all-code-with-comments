import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"
import type {RootState, AppDispatch} from "./store"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
// useAppDispatch()
// instead of this useAppSelector((state: RootState) =>)) write the below??
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

