import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface IViState {
  enabled: boolean;
  mode: 'normal' | 'insert' | 'visual' | 'command';
  caretPosition: {
    elementIndex: number;
    elementId?: string;
  };
  viElements: { id: string; index: number }[];
}

const initialState: IViState = {
  enabled: true,
  mode: 'normal',
  caretPosition: {
    elementIndex: 0,
  },
  viElements: [],
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
    setCaretPosition(state, action: PayloadAction<IViState['caretPosition']>) {
      state.caretPosition = action.payload;
    },
    setViElements(state, action: PayloadAction<IViState['viElements']>) {
      state.viElements = action.payload;
    },
  },
});

export const { toggleVi, setViMode, setCaretPosition, setViElements } = viSlice.actions;

export default viSlice.reducer;
