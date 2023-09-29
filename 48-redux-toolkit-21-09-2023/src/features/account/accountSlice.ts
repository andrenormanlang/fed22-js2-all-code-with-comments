import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import { Account } from "../../types/Account.types"

const initialState: Account = {
	balance: 42,
}

export const accountSlice = createSlice({
	name: "account",
	initialState,/* : initialState, */
	reducers: {
		deposit: (state, action: PayloadAction<number>) =>{
			state.balance += action.payload
		},
		withdraw: (state, action: PayloadAction<number>) =>{
			// if (state.balance < 0) {return} // not possible to withdraw minus 0!
			if (state.balance - action.payload < 0) {
				return
			} // not possible to withdraw minus 0!
			state.balance -= action.payload
		},
		// OR
		// 	if (state.balance - action.payload >= 0) {

		// 		state.balance -= action.payload
		// 	} // not possible to withdraw minus 0!
		//},
	}
})

// Action creators are generated for each reducer function
export const {deposit, withdraw} = accountSlice.actions

// Export the reducer
//  called only .reducer instead of reducers since is skips the switch and state as in the previous redux lesson
export default accountSlice.reducer
