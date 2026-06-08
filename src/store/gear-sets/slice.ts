import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { GearSet, GearSetListItem } from "@/types/gear-sets";
import { fetchJson } from "@/utils/api";

export type GearSetsState = {
  details: { [P in GearSet["id"]]?: GearSet };
  detailsLoading: boolean;
  list: GearSetListItem[];
  listLoading: boolean;
};

const initialState: GearSetsState = { details: {}, detailsLoading: false, list: [], listLoading: false };

export const fetchGearSet = createAsyncThunk<GearSet, GearSet["id"]>("gearSets/fetch", async (gearSetId, { getState }) => {
  const state = getState() as { gearSets: GearSetsState };
  const stateGearSet = state.gearSets.details[gearSetId];

  if (stateGearSet) {
    console.log(`Набор снаряжения c ID "${gearSetId}" найден в хранилище`);

    return stateGearSet;
  }

  console.log(`Загрузка набора снаряжения c ID "${gearSetId}" с сервера`);

  return await fetchJson<GearSet>(`${import.meta.env.BASE_URL}data/gear-sets/details/${gearSetId}.json`);
});
export const fetchGearSetList = createAsyncThunk<GearSetListItem[]>("gearSets/fetchList", async (_, { getState }) => {
  const state = getState() as { gearSets: GearSetsState };
  const stateList = state.gearSets.list;

  if (stateList.length) {
    console.log("Список наборов снаряжения найден в хранилище");

    return stateList;
  }

  console.log("Загрузка списка наборов снаряжения с сервера");

  const list = await fetchJson<GearSet[]>(`${import.meta.env.BASE_URL}data/gear-sets/index.json`);

  return list.sort((a, b) => a.name.localeCompare(b.name));
});

export const gearSetsSlice = createSlice({
  name: "gearSets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchGearSet
      .addCase(fetchGearSet.pending, (state) => {
        state.detailsLoading = true;
      })
      .addCase(fetchGearSet.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.details[action.payload.id] = action.payload;
      })
      .addCase(fetchGearSet.rejected, (state, action) => {
        state.detailsLoading = false;
        console.error(action.error.message ?? `Ошибка загрузки набора снаряжения с ID "${action.meta.arg}"`);
      })
      // fetchGearSetList
      .addCase(fetchGearSetList.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(fetchGearSetList.fulfilled, (state, action) => {
        state.listLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchGearSetList.rejected, (state, action) => {
        state.listLoading = false;
        console.error(action.error.message ?? "Ошибка загрузки списка наборов снаряжения");
      });
  },
});

export default gearSetsSlice.reducer;
