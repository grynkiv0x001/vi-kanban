import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task } from 'shared/src/types';

interface IModalState {
  isOpen: boolean;
  type: 'create' | 'auth' | 'settings' | 'edit' | null;
  instance: 'project' | 'list' | 'task' | 'login' | 'register' | 'app' | null;
  formId: string;
  ids?: Record<string, number>;
  data?: Task;
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

      if (action.payload.type === 'edit') {
        state.data = action.payload.data;
      }
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.instance = null;
      state.formId = '';
      state.ids = undefined;
      state.data = undefined;
    },
    setModalType: (state, action: PayloadAction<IModalState['type']>) => {
      state.type = action.payload;
    },
    setModalInstance: (state, action: PayloadAction<IModalState['instance']>) => {
      state.instance = action.payload;
    },
  },
});

export const { openModal, closeModal, setModalInstance } = modalSlice.actions;

export default modalSlice.reducer;
