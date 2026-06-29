import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { Race } from "@/types/races";
import { fetchJson } from "@/utils/api";

export type RacesState = {
  details: { [P in Race["id"]]?: Race };
  detailsLoading: boolean;
  list: Race[];
  listLoading: boolean;
};

const initialState: RacesState = { details: {}, detailsLoading: false, list: [], listLoading: false };

export const fetchRace = createAsyncThunk<Race, Race["id"]>("races/fetch", async (raceId, { getState }) => {
  const state = getState() as { races: RacesState };
  const stateRace = state.races.details[raceId];

  if (stateRace) {
    console.log(`Раса c ID "${raceId}" найдена в хранилище`);

    return stateRace;
  }

  console.log(`Загрузка расы c ID "${raceId}" с сервера`);

  return await fetchJson<Race>(`${import.meta.env.BASE_URL}data/races/details/${raceId}.json`);
});
export const fetchRaceList = createAsyncThunk<Race[]>("races/fetchList", async (_, { getState }) => {
  const state = getState() as { races: RacesState };
  const stateList = state.races.list;

  if (stateList.length) {
    console.log("Список рас найден в хранилище");

    return stateList;
  }

  console.log("Загрузка списка рас с сервера");

  const list = await fetchJson<Race[]>(`${import.meta.env.BASE_URL}data/races/index.json`);

  return list.sort((a, b) => a.name.localeCompare(b.name));
});

export const racesSlice = createSlice({
  name: "races",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchRace
      .addCase(fetchRace.pending, (state) => {
        state.detailsLoading = true;
      })
      .addCase(fetchRace.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.details[action.payload.id] = action.payload;
      })
      .addCase(fetchRace.rejected, (state, action) => {
        state.detailsLoading = false;
        console.error(action.error.message ?? `Ошибка загрузки расы с ID "${action.meta.arg}"`);
      })
      // fetchRaceList
      .addCase(fetchRaceList.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(fetchRaceList.fulfilled, (state, action) => {
        state.listLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchRaceList.rejected, (state, action) => {
        state.listLoading = false;
        console.error(action.error.message ?? "Ошибка загрузки списка рас");
      });
  },
});

export default racesSlice.reducer;
