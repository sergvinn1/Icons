import { createSlice } from '@reduxjs/toolkit';

const iconsSlice = createSlice({
  name: 'icons',
  initialState: {
    items: [],
  },
  reducers: {
    addIcon: (state, action) => {
      state.items.push(action.payload);
    },
    deleteIcon: (state, action) => {
      state.items = state.items.filter((icon) => icon.id !== action.payload);
    },
  },
});

export const { addIcon, deleteIcon } = iconsSlice.actions;

export const selectIcons = (state) => state.icons.items;

export default iconsSlice.reducer;
