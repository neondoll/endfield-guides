import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { WeaponType, WeaponTypeListItem } from "@/types/weapon-types";
import { fetchJson } from "@/utils/api";

export type WeaponTypesState = {
  details: { [P in WeaponType["id"]]?: WeaponType };
  detailsLoading: boolean;
  list: WeaponTypeListItem[];
  listLoading: boolean;
};

const initialState: WeaponTypesState = { details: {}, detailsLoading: false, list: [], listLoading: false };

export const fetchWeaponType = createAsyncThunk<WeaponType, WeaponType["id"]>("weaponTypes/fetch", async (weaponTypeId, { getState }) => {
  const state = getState() as { weaponTypes: WeaponTypesState };
  const stateWeaponType = state.weaponTypes.details[weaponTypeId];

  if (stateWeaponType) {
    console.log(`Тип оружия c ID "${weaponTypeId}" найден в хранилище`);

    return stateWeaponType;
  }

  console.log(`Загрузка типа оружия c ID "${weaponTypeId}" с сервера`);

  return await fetchJson<WeaponType>(`${import.meta.env.BASE_URL}data/weapon-types/details/${weaponTypeId}.json`);
});
export const fetchWeaponTypeList = createAsyncThunk<WeaponTypeListItem[]>("weaponTypes/fetchList", async (_, { getState }) => {
  const state = getState() as { weaponTypes: WeaponTypesState };
  const stateList = state.weaponTypes.list;

  if (stateList.length) {
    console.log("Список типов оружия найден в хранилище");

    return stateList;
  }

  console.log("Загрузка списка типов оружия с сервера");

  const list = await fetchJson<WeaponType[]>(`${import.meta.env.BASE_URL}data/weapon-types/index.json`);

  return list.sort((a, b) => a.name.localeCompare(b.name));
});

export const weaponTypesSlice = createSlice({
  name: "weaponTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchWeaponType
      .addCase(fetchWeaponType.pending, (state) => {
        state.detailsLoading = true;
      })
      .addCase(fetchWeaponType.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.details[action.payload.id] = action.payload;
      })
      .addCase(fetchWeaponType.rejected, (state, action) => {
        state.detailsLoading = false;
        console.error(action.error.message ?? `Ошибка загрузки типа оружия с ID "${action.meta.arg}"`);
      })
      // fetchWeaponTypeList
      .addCase(fetchWeaponTypeList.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(fetchWeaponTypeList.fulfilled, (state, action) => {
        state.listLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchWeaponTypeList.rejected, (state, action) => {
        state.listLoading = false;
        console.error(action.error.message ?? "Ошибка загрузки списка типов оружия");
      });
  },
});

export default weaponTypesSlice.reducer;
