import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import tableReducer from '../features/tableSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    table: tableReducer,
  },
});
