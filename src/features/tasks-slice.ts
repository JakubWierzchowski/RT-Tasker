import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { removeUser } from './user-slice';
type TaskState = {
  entities: Task[];
  loading?: boolean;
};

type DraftTask = Pick<Task, 'title'>;

export const createTask = (draftTask: DraftTask): Task => {
  return { id: nanoid(), ...draftTask };
};
const initialState: TaskState = {
  entities: [],
  loading: false,
};

export const fetchTasks = createAsyncThunk(
  'task/fetchTasks',
  async (thunkApi): Promise<Task[]> => {
    const response = await fetch('/api/tasks').then((response) =>
      response.json(),
    );
    return response.tasks;
  },
);

const tasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<DraftTask>) => {
      const task = createTask(action.payload);
      state.entities.unshift(task);
    },
    removeTask: (state, action: PayloadAction<Task['id']>) => {
      const index = state.entities.findIndex(
        (task) => task.id === action.payload,
      );
      state.entities.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeUser, (state, action) => {
      const userId = action.payload;
      for (const task of state.entities) {
        if (task.user === userId) {
          task.user = undefined;
        }
      }
    });
    builder.addCase(fetchTasks.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    });
  },
});

export const tasksReducer = tasksSlice.reducer;
export const { addTask, removeTask } = tasksSlice.actions;
export default tasksSlice;
