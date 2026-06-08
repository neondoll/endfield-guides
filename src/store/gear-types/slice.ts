import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { GearType, GearTypeListItem } from "@/types/gear-types";
import { fetchJson } from "@/utils/api";

export type GearTypesState = {
  details: { [P in GearType["id"]]?: GearType };
  detailsLoading: boolean;
  list: GearTypeListItem[];
  listLoading: boolean;
};

const initialState: GearTypesState = { details: {}, detailsLoading: false, list: [], listLoading: false };

export const fetchGearType = createAsyncThunk<GearType, GearType["id"]>("gearTypes/fetch", async (gearTypeId, { getState }) => {
  const state = getState() as { gearTypes: GearTypesState };
  const stateGearType = state.gearTypes.details[gearTypeId];

  if (stateGearType) {
    console.log(`Тип снаряжения c ID "${gearTypeId}" найден в хранилище`);

    return stateGearType;
  }

  console.log(`Загрузка типа снаряжения c ID "${gearTypeId}" с сервера`);

  return await fetchJson<GearType>(`${import.meta.env.BASE_URL}data/gear-types/details/${gearTypeId}.json`);
});
export const fetchGearTypeList = createAsyncThunk<GearTypeListItem[]>("gearTypes/fetchList", async (_, { getState }) => {
  const state = getState() as { gearTypes: GearTypesState };
  const stateList = state.gearTypes.list;

  if (stateList.length) {
    console.log("Список типов снаряжения найден в хранилище");

    return stateList;
  }

  console.log("Загрузка списка типов снаряжения с сервера");

  const list = await fetchJson<GearType[]>(`${import.meta.env.BASE_URL}data/gear-types/index.json`);

  return list.sort((a, b) => a.name.localeCompare(b.name));
});

export const gearTypesSlice = createSlice({
  name: "gearTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchGearType
      .addCase(fetchGearType.pending, (state) => {
        state.detailsLoading = true;
      })
      .addCase(fetchGearType.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.details[action.payload.id] = action.payload;
      })
      .addCase(fetchGearType.rejected, (state, action) => {
        state.detailsLoading = false;
        console.error(action.error.message ?? `Ошибка загрузки типа снаряжения с ID "${action.meta.arg}"`);
      })
      // fetchGearTypeList
      .addCase(fetchGearTypeList.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(fetchGearTypeList.fulfilled, (state, action) => {
        state.listLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchGearTypeList.rejected, (state, action) => {
        state.listLoading = false;
        console.error(action.error.message ?? "Ошибка загрузки списка типов снаряжения");
      });
  },
});

export default gearTypesSlice.reducer;
