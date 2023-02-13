import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  totalAmount: 0,
  items: []
}

const sumPrice = (state) => {
  state.totalPrice = state.items.reduce((acc, obj) => {
    return acc + (obj.count * obj.price);
  }, 0);
  return state.totalPrice;
}

// const sumAmount = (state) => {
//   state.totalAmount = state.items.reduce((acc, elem) => {
//     return acc + elem.count;
//   }, 0)
// }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addItem: (state, action) => {
      const findItem = state.items.find(obj => obj.id === action.payload.id)
      if (findItem) {
        findItem.count += 1
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }
      state.totalPrice = sumPrice(state)
      // state.totalAmount = sumAmount(state)
    },

    minusItem: (state, action) => {
      const findItem = state.items.find(obj => obj.id === action.payload)
      if (findItem && findItem.count > 1) {
        findItem.count -= 1
      } else {
        state.items = state.items.filter(elem => elem.id !== action.payload)
      }
      state.totalPrice = sumPrice(state)
      // state.totalAmount = sumAmount(state)

    },

    removeItem: (state, action) => {
      state.items = state.items.filter(elem => elem.id !== action.payload)
      state.totalPrice = sumPrice(state)
      // state.totalAmount = sumAmount(state)

    },

    clearItems: (state) => {
      state.items = []
      state.totalPrice = 0
      // state.totalAmount = sumAmount(state)
    },

  }
})

export const { clearItems, removeItem, minusItem, addItem } = cartSlice.actions;
export default cartSlice.reducer;