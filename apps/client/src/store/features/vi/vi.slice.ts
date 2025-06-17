import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface IViState {
  enabled: boolean;
  mode: 'normal' | 'insert'
}

const initialState: IViState = {
  enabled: true,
  mode: 'normal',
};

const viSlice = createSlice({
  name: 'vi',
  initialState,
  reducers: {
    toggleVi(state, action: PayloadAction<boolean>) {
      state.enabled = action.payload;
    },
    setViMode(state, action: PayloadAction<IViState['mode']>) {
      state.mode = action.payload;
    },
  },
});

export const { toggleVi, setViMode } = viSlice.actions;

export default viSlice.reducer;
