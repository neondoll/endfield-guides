import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { Faction } from "@/types/factions";
import { fetchJson } from "@/utils/api";

export type FactionsState = {
  details: { [P in Faction["id"]]?: Faction };
  detailsLoading: boolean;
  list: Faction[];
  listLoading: boolean;
};

const initialState: FactionsState = { details: {}, detailsLoading: false, list: [], listLoading: false };

export const fetchFaction = createAsyncThunk<Faction, Faction["id"]>("factions/fetch", async (factionId, { getState }) => {
  const state = getState() as { factions: FactionsState };
  const stateFaction = state.factions.details[factionId];

  if (stateFaction) {
    console.log(`Фракция c ID "${factionId}" найдена в хранилище`);

    return stateFaction;
  }

  console.log(`Загрузка фракции c ID "${factionId}" с сервера`);

  return await fetchJson<Faction>(`${import.meta.env.BASE_URL}data/factions/details/${factionId}.json`);
});
export const fetchFactionList = createAsyncThunk<Faction[]>("factions/fetchList", async (_, { getState }) => {
  const state = getState() as { factions: FactionsState };
  const stateList = state.factions.list;

  if (stateList.length) {
    console.log("Список фракций найден в хранилище");

    return stateList;
  }

  console.log("Загрузка списка фракций с сервера");

  const list = await fetchJson<Faction[]>(`${import.meta.env.BASE_URL}data/factions/index.json`);

  return list.sort((a, b) => a.name.localeCompare(b.name));
});

export const factionsSlice = createSlice({
  name: "factions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchFaction
      .addCase(fetchFaction.pending, (state) => {
        state.detailsLoading = true;
      })
      .addCase(fetchFaction.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.details[action.payload.id] = action.payload;
      })
      .addCase(fetchFaction.rejected, (state, action) => {
        state.detailsLoading = false;
        console.error(action.error.message ?? `Ошибка загрузки фракции с ID "${action.meta.arg}"`);
      })
      // fetchFactionList
      .addCase(fetchFactionList.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(fetchFactionList.fulfilled, (state, action) => {
        state.listLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchFactionList.rejected, (state, action) => {
        state.listLoading = false;
        console.error(action.error.message ?? "Ошибка загрузки списка фракций");
      });
  },
});

export default factionsSlice.reducer;
