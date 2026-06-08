import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { Element, ElementListItem } from "@/types/elements";
import { fetchJson } from "@/utils/api";

export type ElementsState = {
  details: { [P in Element["id"]]?: Element };
  detailsLoading: boolean;
  list: ElementListItem[];
  listLoading: boolean;
};

const initialState: ElementsState = { details: {}, detailsLoading: false, list: [], listLoading: false };

export const fetchElement = createAsyncThunk<Element, Element["id"]>("elements/fetch", async (elementId, { getState }) => {
  const state = getState() as { elements: ElementsState };
  const stateElement = state.elements.details[elementId];

  if (stateElement) {
    console.log(`Элемент c ID "${elementId}" найден в хранилище`);

    return stateElement;
  }

  console.log(`Загрузка элемента c ID "${elementId}" с сервера`);

  return await fetchJson<Element>(`${import.meta.env.BASE_URL}data/elements/details/${elementId}.json`);
});
export const fetchElementList = createAsyncThunk<ElementListItem[]>("elements/fetchList", async (_, { getState }) => {
  const state = getState() as { elements: ElementsState };
  const stateList = state.elements.list;

  if (stateList.length) {
    console.log("Список элементов найден в хранилище");

    return stateList;
  }

  console.log("Загрузка списка элементов с сервера");

  const list = await fetchJson<Element[]>(`${import.meta.env.BASE_URL}data/elements/index.json`);

  return list.sort((a, b) => a.name.localeCompare(b.name));
});

export const elementsSlice = createSlice({
  name: "elements",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchElement
      .addCase(fetchElement.pending, (state) => {
        state.detailsLoading = true;
      })
      .addCase(fetchElement.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.details[action.payload.id] = action.payload;
      })
      .addCase(fetchElement.rejected, (state, action) => {
        state.detailsLoading = false;
        console.error(action.error.message ?? `Ошибка загрузки элемента с ID "${action.meta.arg}"`);
      })
      // fetchElementList
      .addCase(fetchElementList.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(fetchElementList.fulfilled, (state, action) => {
        state.listLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchElementList.rejected, (state, action) => {
        state.listLoading = false;
        console.error(action.error.message ?? "Ошибка загрузки списка элементов");
      });
  },
});

export default elementsSlice.reducer;
