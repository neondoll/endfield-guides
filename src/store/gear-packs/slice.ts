import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { GearPack, GearPackListItem } from "@/types/gear-packs";
import { fetchJson } from "@/utils/api";

export type GearPacksState = {
  details: { [P in GearPack["id"]]?: GearPack };
  detailsLoading: boolean;
  list: GearPackListItem[];
  listLoading: boolean;
};

const initialState: GearPacksState = { details: {}, detailsLoading: false, list: [], listLoading: false };

export const fetchGearPack = createAsyncThunk<GearPack, GearPack["id"]>("gearPacks/fetch", async (gearPackId, { getState }) => {
  const state = getState() as { gearPacks: GearPacksState };
  const stateGearPack = state.gearPacks.details[gearPackId];

  if (stateGearPack) {
    console.log(`Набор снаряжения c ID "${gearPackId}" найден в хранилище`);

    return stateGearPack;
  }

  console.log(`Загрузка набора снаряжения c ID "${gearPackId}" с сервера`);

  return await fetchJson<GearPack>(`${import.meta.env.BASE_URL}data/gear-packs/details/${gearPackId}.json`);
});
export const fetchGearPackList = createAsyncThunk<GearPackListItem[]>("gearPacks/fetchList", async (_, { getState }) => {
  const state = getState() as { gearPacks: GearPacksState };
  const stateList = state.gearPacks.list;

  if (stateList.length) {
    console.log("Список наборов снаряжения найден в хранилище");

    return stateList;
  }

  console.log("Загрузка списка наборов снаряжения с сервера");

  const list = await fetchJson<GearPack[]>(`${import.meta.env.BASE_URL}data/gear-packs/index.json`);

  return list.sort((a, b) => a.name.localeCompare(b.name));
});

export const gearPacksSlice = createSlice({
  name: "gearPacks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchGearPack
      .addCase(fetchGearPack.pending, (state) => {
        state.detailsLoading = true;
      })
      .addCase(fetchGearPack.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.details[action.payload.id] = action.payload;
      })
      .addCase(fetchGearPack.rejected, (state, action) => {
        state.detailsLoading = false;
        console.error(action.error.message ?? `Ошибка загрузки набора снаряжения с ID "${action.meta.arg}"`);
      })
      // fetchGearPackList
      .addCase(fetchGearPackList.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(fetchGearPackList.fulfilled, (state, action) => {
        state.listLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchGearPackList.rejected, (state, action) => {
        state.listLoading = false;
        console.error(action.error.message ?? "Ошибка загрузки списка наборов снаряжения");
      });
  },
});

export default gearPacksSlice.reducer;
