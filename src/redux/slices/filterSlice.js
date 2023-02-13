import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  orderType: true,
  sort: {
    name: 'популярности',
    sortProperty: 'rating'
  }
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setOrder(state, action) {
      state.orderType = action.payload;
    },
    setFilters(state, action) {
      state.sort.sortProperty = action.payload.sort.sortProperty;
      state.categoryId = Number(action.payload.categoryId);
    }
  }
})

export const { setCategoryId, setSort, setOrder, setFilters } = filterSlice.actions;
export default filterSlice.reducer;