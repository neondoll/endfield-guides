import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { Operator, OperatorListItem } from "@/types/operators";
import { fetchJson } from "@/utils/api";

export type OperatorsState = {
  details: { [P in Operator["id"]]?: Operator };
  detailsLoading: boolean;
  list: OperatorListItem[];
  listLoading: boolean;
};

const initialState: OperatorsState = { details: {}, detailsLoading: false, list: [], listLoading: false };

export const fetchOperator = createAsyncThunk<Operator, Operator["id"]>("operators/fetch", async (operatorId, { getState }) => {
  const state = getState() as { operators: OperatorsState };
  const stateOperator = state.operators.details[operatorId];

  if (stateOperator) {
    console.log(`Оператор c ID "${operatorId}" найден в хранилище`);

    return stateOperator;
  }

  console.log(`Загрузка оператора c ID "${operatorId}" с сервера`);

  return await fetchJson<Operator>(`${import.meta.env.BASE_URL}data/operators/details/${operatorId}.json`);
});
export const fetchOperatorList = createAsyncThunk<OperatorListItem[]>("operators/fetchList", async (_, { getState }) => {
  const state = getState() as { operators: OperatorsState };
  const stateList = state.operators.list;

  if (stateList.length) {
    console.log("Список операторов найден в хранилище");

    return stateList;
  }

  console.log("Загрузка списка операторов с сервера");

  const list = await fetchJson<Operator[]>(`${import.meta.env.BASE_URL}data/operators/index.json`);

  return list.sort((a, b) => {
    if (a.rarity !== b.rarity) {
      return b.rarity - a.rarity;
    }

    return a.name.localeCompare(b.name);
  });
});

export const operatorsSlice = createSlice({
  name: "operators",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchOperator
      .addCase(fetchOperator.pending, (state) => {
        state.detailsLoading = true;
      })
      .addCase(fetchOperator.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.details[action.payload.id] = action.payload;
      })
      .addCase(fetchOperator.rejected, (state, action) => {
        state.detailsLoading = false;
        console.error(action.error.message ?? `Ошибка загрузки оператора с ID "${action.meta.arg}"`);
      })
      // fetchOperatorList
      .addCase(fetchOperatorList.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(fetchOperatorList.fulfilled, (state, action) => {
        state.listLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchOperatorList.rejected, (state, action) => {
        state.listLoading = false;
        console.error(action.error.message ?? "Ошибка загрузки списка операторов");
      });
  },
});

export default operatorsSlice.reducer;
