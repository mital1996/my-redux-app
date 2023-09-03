import { createSlice } from "@reduxjs/toolkit";

const open = true;
const emptyObj = {
  open: false,
  data: null,
};
const handlePayload = ({ payload: data }) => ({
  open,
  data,
});

const initialState = {
  standard: emptyObj,
  delete:emptyObj
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openStandard: (state, action) => {
      state.standard = handlePayload(action);
    },
    closeStandard: (state) => {
      state.standard = emptyObj;
    },
    openDelete: (state, action) => {
      state.delete = handlePayload(action);
    },
    closeDelete: (state) => {
      state.delete = emptyObj;
    },
  },
});

export const { openStandard, closeStandard, openDelete, closeDelete } =
  modalSlice.actions;

export default modalSlice.reducer;
