import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GroceryListState {
  storeRecipes: {
    [storeRecipeName: string]: string[];
  };
}

// Load persisted state from localStorage
const persistedState = JSON.parse(localStorage.getItem("groceryList") || "null") as GroceryListState | null;

const groceryListSlice = createSlice({
  name: "groceryList",
  initialState: {
    storeRecipes: persistedState?.storeRecipes || {} as { [storeRecipeName: string]: string[] },
  } as GroceryListState,
  reducers: {
    addedToStore: (state, action: PayloadAction<{ storeRecipeName: string; storeIngredient: string }>) => {
      const { storeRecipeName, storeIngredient } = action.payload;
      if (!state.storeRecipes[storeRecipeName]) {
        state.storeRecipes[storeRecipeName] = [];
      }
      state.storeRecipes[storeRecipeName].push(storeIngredient);
    },
    removeFromStore: (state, action: PayloadAction<{ storeRecipeName: string; storeIngredient: string }>) => {
      const { storeRecipeName, storeIngredient } = action.payload;
      if (state.storeRecipes[storeRecipeName]) {
        state.storeRecipes[storeRecipeName] = state.storeRecipes[storeRecipeName].filter(item => item !== storeIngredient);
        
        // If the list becomes empty, remove the storeRecipeName entry
        if (state.storeRecipes[storeRecipeName].length === 0) {
          delete state.storeRecipes[storeRecipeName];
        }
      }
    },
    removeAllFromStore: (state) => {
      state.storeRecipes = {}; // Clear the entire storeRecipes object
    },
  },
});

export const { addedToStore, removeFromStore, removeAllFromStore } = groceryListSlice.actions;

const store = configureStore({
  reducer: {
    groceryList: groceryListSlice.reducer,
  },
});

// Subscribe to store changes to persist state to localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("groceryList", JSON.stringify(state.groceryList));
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;