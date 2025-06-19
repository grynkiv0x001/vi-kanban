import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface IModalState {
  isOpen: boolean;
  type: 'create' | null;
  instance: 'project' | 'list' | 'task' | null;
  formId: string;
  ids?: Record<string, number>;
}

const initialState: IModalState = {
  isOpen: false,
  type: null,
  instance: null,
  formId: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Omit<IModalState, 'isOpen' | 'formId'>>) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.instance = action.payload.instance;
      state.formId = `${action.payload.type}-${action.payload.instance}-form`;
      state.ids = action.payload.ids;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.instance = null;
      state.formId = '';
      state.ids = undefined;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
