import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ViElement = {
  id: string;
  top: number;
  left: number;
  width: number;
  height: number;
};

interface IViState {
  enabled: boolean;
  device: 'keyboard' | 'mouse';
  mode: 'normal' | 'insert' | 'visual' | 'command';
  caretPosition: {
    row: number;
    col: number;
    elementId?: string;
  };
  viElements: ViElement[][];
}

const initialState: IViState = {
  enabled: true,
  device: 'keyboard',
  mode: 'normal',
  caretPosition: {
    row: 0,
    col: 0,
  },
  viElements: [],
};

const groupIntoGrid = (elements: ViElement[], tolerance = 10): ViElement[][] => {
  const rows: ViElement[][] = [];

  for (const el of elements) {
    const row = rows.find(r =>
      r.length > 0 && Math.abs(r[0].top - el.top) <= tolerance,
    );

    if (row) {
      row.push(el);
    } else {
      rows.push([el]);
    }
  }

  for (const row of rows) {
    row.sort((a, b) => a.left - b.left);
  }

  rows.sort((a, b) => a[0].top - b[0].top);

  return rows;
};

const viSlice = createSlice({
  name: 'vi',
  initialState,
  reducers: {
    toggleVi(state, action: PayloadAction<boolean>) {
      state.enabled = action.payload;
    },
    setDevice(state, action: PayloadAction<IViState['device']>) {
      state.device = action.payload;
    },
    setViMode(state, action: PayloadAction<IViState['mode']>) {
      state.mode = action.payload;
    },
    setCaretPosition(state, action: PayloadAction<IViState['caretPosition']>) {
      state.caretPosition = action.payload;
    },
    setViElements(state, action: PayloadAction<ViElement[]>) {
      state.viElements = groupIntoGrid(action.payload, 20);
    },
  },
});

export const { toggleVi, setDevice, setViMode, setCaretPosition, setViElements } = viSlice.actions;

export default viSlice.reducer;
