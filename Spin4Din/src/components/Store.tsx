import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const groceryListSlice = createSlice({
  name: "groceryList",
  initialState: {
    ingredients: localStorage.getItem("groceryListIngredients")
      ? JSON.parse(localStorage.getItem("groceryListIngredients") || "")
      : ([] as string[]),
  },
  reducers: {
    addIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = [...state.ingredients, action.payload];
      localStorage.setItem(
        "groceryListIngredients",
        JSON.stringify(state.ingredients)
      );
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item: string) => item !== action.payload
      );
      localStorage.setItem(
        "groceryListIngredients",
        JSON.stringify(state.ingredients)
      );
    },
  },
});

export const { addIngredient, removeIngredient } = groceryListSlice.actions;

const store = configureStore({
  reducer: {
    groceryList: groceryListSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;