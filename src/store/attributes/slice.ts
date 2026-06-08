import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { Attribute, AttributeListItem } from "@/types/attributes";
import { fetchJson } from "@/utils/api";

export type AttributesState = {
  details: { [P in Attribute["id"]]?: Attribute };
  detailsLoading: boolean;
  list: AttributeListItem[];
  listLoading: boolean;
};

const initialState: AttributesState = { details: {}, detailsLoading: false, list: [], listLoading: false };

export const fetchAttribute = createAsyncThunk<Attribute, Attribute["id"]>("attributes/fetch", async (attributeId, { getState }) => {
  const state = getState() as { attributes: AttributesState };
  const stateAttribute = state.attributes.details[attributeId];

  if (stateAttribute) {
    console.log(`Атрибут c ID "${attributeId}" найден в хранилище`);

    return stateAttribute;
  }

  console.log(`Загрузка атрибута c ID "${attributeId}" с сервера`);

  return await fetchJson<Attribute>(`${import.meta.env.BASE_URL}data/attributes/details/${attributeId}.json`);
});
export const fetchAttributeList = createAsyncThunk<AttributeListItem[]>("attributes/fetchList", async (_, { getState }) => {
  const state = getState() as { attributes: AttributesState };
  const stateList = state.attributes.list;

  if (stateList.length) {
    console.log("Список атрибутов найден в хранилище");

    return stateList;
  }

  console.log("Загрузка списка атрибутов с сервера");

  const list = await fetchJson<Attribute[]>(`${import.meta.env.BASE_URL}data/attributes/index.json`);

  return list.sort((a, b) => a.name.localeCompare(b.name));
});

export const attributesSlice = createSlice({
  name: "attributes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAttribute
      .addCase(fetchAttribute.pending, (state) => {
        state.detailsLoading = true;
      })
      .addCase(fetchAttribute.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.details[action.payload.id] = action.payload;
      })
      .addCase(fetchAttribute.rejected, (state, action) => {
        state.detailsLoading = false;
        console.error(action.error.message ?? `Ошибка загрузки атрибута с ID "${action.meta.arg}"`);
      })
      // fetchAttributeList
      .addCase(fetchAttributeList.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(fetchAttributeList.fulfilled, (state, action) => {
        state.listLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchAttributeList.rejected, (state, action) => {
        state.listLoading = false;
        console.error(action.error.message ?? "Ошибка загрузки списка атрибутов");
      });
  },
});

export default attributesSlice.reducer;
