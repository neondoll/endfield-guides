import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { Weapon, WeaponListItem } from "@/types/weapons";
import { fetchJson } from "@/utils/api";

export type WeaponsState = {
  details: { [P in Weapon["id"]]?: Weapon };
  detailsLoading: boolean;
  list: WeaponListItem[];
  listLoading: boolean;
};

const initialState: WeaponsState = { details: {}, detailsLoading: false, list: [], listLoading: false };

export const fetchWeapon = createAsyncThunk<Weapon, Weapon["id"]>("weapons/fetch", async (weaponId, { getState }) => {
  const state = getState() as { weapons: WeaponsState };
  const stateWeapon = state.weapons.details[weaponId];

  if (stateWeapon) {
    console.log(`Оружие c ID "${weaponId}" найдено в хранилище`);

    return stateWeapon;
  }

  console.log(`Загрузка оружия c ID "${weaponId}" с сервера`);

  return await fetchJson<Weapon>(`${import.meta.env.BASE_URL}data/weapons/details/${weaponId}.json`);
});
export const fetchWeaponList = createAsyncThunk<WeaponListItem[]>("weapons/fetchList", async (_, { getState }) => {
  const state = getState() as { weapons: WeaponsState };
  const stateList = state.weapons.list;

  if (stateList.length) {
    console.log("Список оружия найден в хранилище");

    return stateList;
  }

  console.log("Загрузка списка оружия с сервера");

  const list = await fetchJson<Weapon[]>(`${import.meta.env.BASE_URL}data/weapons/index.json`);

  return list.sort((a, b) => {
    if (a.rarity !== b.rarity) {
      return a.rarity - b.rarity;
    }

    return a.name.localeCompare(b.name);
  });
});

export const weaponsSlice = createSlice({
  name: "weapons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchWeapon
      .addCase(fetchWeapon.pending, (state) => {
        state.detailsLoading = true;
      })
      .addCase(fetchWeapon.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.details[action.payload.id] = action.payload;
      })
      .addCase(fetchWeapon.rejected, (state, action) => {
        state.detailsLoading = false;
        console.error(action.error.message ?? `Ошибка загрузки оружия с ID "${action.meta.arg}"`);
      })
      // fetchWeaponList
      .addCase(fetchWeaponList.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(fetchWeaponList.fulfilled, (state, action) => {
        state.listLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchWeaponList.rejected, (state, action) => {
        state.listLoading = false;
        console.error(action.error.message ?? "Ошибка загрузки списка оружия");
      });
  },
});

export default weaponsSlice.reducer;
