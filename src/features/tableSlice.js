import { createSlice } from '@reduxjs/toolkit';

export const tableSlice = createSlice({
  name: 'table',
  initialState: {
    tableAsset: [],
    tableSkill: []
  },
  reducers: {
    tableAssetData: (state,action) => {
      state.tableAsset = action.payload
    },
    tableSkillData: (state,action) => {
      state.tableSkill = action.payload
    }
  },
});

export const {tableAssetData ,tableSkillData} = tableSlice.actions;
export const selectTableAsset = state => state.table.tableAsset;
export const selectTableSkill = state => state.table.tableSkill;

export default tableSlice.reducer;
