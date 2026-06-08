import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { OperatorRole, OperatorRoleListItem } from "@/types/operator-roles";
import { fetchJson } from "@/utils/api";

export type OperatorRolesState = {
  details: { [P in OperatorRole["id"]]?: OperatorRole };
  detailsLoading: boolean;
  list: OperatorRoleListItem[];
  listLoading: boolean;
};

const initialState: OperatorRolesState = { details: {}, detailsLoading: false, list: [], listLoading: false };

export const fetchOperatorRole = createAsyncThunk<OperatorRole, OperatorRole["id"]>("operatorRoles/fetch", async (operatorRoleId, { getState }) => {
  const state = getState() as { operatorRoles: OperatorRolesState };
  const stateOperatorRole = state.operatorRoles.details[operatorRoleId];

  if (stateOperatorRole) {
    console.log(`Роль оператора c ID "${operatorRoleId}" найдена в хранилище`);

    return stateOperatorRole;
  }

  console.log(`Загрузка роли оператора c ID "${operatorRoleId}" с сервера`);

  return await fetchJson<OperatorRole>(`${import.meta.env.BASE_URL}data/operator-roles/details/${operatorRoleId}.json`);
});
export const fetchOperatorRoleList = createAsyncThunk<OperatorRoleListItem[]>("operatorRoles/fetchList", async (_, { getState }) => {
  const state = getState() as { operatorRoles: OperatorRolesState };
  const stateList = state.operatorRoles.list;

  if (stateList.length) {
    console.log("Список ролей операторов найден в хранилище");

    return stateList;
  }

  console.log("Загрузка списка ролей операторов с сервера");

  const list = await fetchJson<OperatorRole[]>(`${import.meta.env.BASE_URL}data/operator-roles/index.json`);

  return list.sort((a, b) => a.name.localeCompare(b.name));
});

export const operatorRolesSlice = createSlice({
  name: "operatorRoles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchOperatorRole
      .addCase(fetchOperatorRole.pending, (state) => {
        state.detailsLoading = true;
      })
      .addCase(fetchOperatorRole.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.details[action.payload.id] = action.payload;
      })
      .addCase(fetchOperatorRole.rejected, (state, action) => {
        state.detailsLoading = false;
        console.error(action.error.message ?? `Ошибка загрузки роли оператора с ID "${action.meta.arg}"`);
      })
      // fetchOperatorRoleList
      .addCase(fetchOperatorRoleList.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(fetchOperatorRoleList.fulfilled, (state, action) => {
        state.listLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchOperatorRoleList.rejected, (state, action) => {
        state.listLoading = false;
        console.error(action.error.message ?? "Ошибка загрузки списка ролей операторов");
      });
  },
});

export default operatorRolesSlice.reducer;
