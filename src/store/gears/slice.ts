import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { Gear, GearListItem } from "@/types/gears";
import { fetchJson } from "@/utils/api";

export type GearsState = {
  details: { [P in Gear["id"]]?: Gear };
  detailsLoading: boolean;
  list: GearListItem[];
  listLoading: boolean;
};

const initialState: GearsState = { details: {}, detailsLoading: false, list: [], listLoading: false };

export const fetchGear = createAsyncThunk<Gear, Gear["id"]>("gears/fetch", async (gearId, { getState }) => {
  const state = getState() as { gears: GearsState };
  const stateGear = state.gears.details[gearId];

  if (stateGear) {
    console.log(`Снаряжение c ID "${gearId}" найдено в хранилище`);

    return stateGear;
  }

  console.log(`Загрузка снаряжения c ID "${gearId}" с сервера`);

  return await fetchJson<Gear>(`${import.meta.env.BASE_URL}data/gears/details/${gearId}.json`);
});
export const fetchGearList = createAsyncThunk<GearListItem[]>("gears/fetchList", async (_, { getState }) => {
  const state = getState() as { gears: GearsState };
  const stateList = state.gears.list;

  if (stateList.length) {
    console.log("Список снаряжения найден в хранилище");

    return stateList;
  }

  console.log("Загрузка списка снаряжеия с сервера");

  const list = await fetchJson<Gear[]>(`${import.meta.env.BASE_URL}data/gears/index.json`);

  return list.sort((a, b) => {
    if (a.level !== b.level) {
      return b.level - a.level;
    }

    if (a.setId !== b.setId) {
      return a.setId.localeCompare(b.setId);
    }

    if (a.typeId !== b.typeId) {
      return a.typeId.localeCompare(b.typeId);
    }

    return a.name.localeCompare(b.name);
  });
});

export const gearsSlice = createSlice({
  name: "gears",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchGear
      .addCase(fetchGear.pending, (state) => {
        state.detailsLoading = true;
      })
      .addCase(fetchGear.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.details[action.payload.id] = action.payload;
      })
      .addCase(fetchGear.rejected, (state, action) => {
        state.detailsLoading = false;
        console.error(action.error.message ?? `Ошибка загрузки снаряжения с ID "${action.meta.arg}"`);
      })
      // fetchGearList
      .addCase(fetchGearList.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(fetchGearList.fulfilled, (state, action) => {
        state.listLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchGearList.rejected, (state, action) => {
        state.listLoading = false;
        console.error(action.error.message ?? "Ошибка загрузки списка снаряжения");
      });
  },
});

export default gearsSlice.reducer;
