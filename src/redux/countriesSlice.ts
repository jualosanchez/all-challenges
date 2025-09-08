import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ES: Define la interfaz para un solo objeto 'todo'.
// EN: Defines the interface for a single 'todo' object.
export interface Country {
  name: {
    common: string;
  };
  capital?: string[];
  population: number;
  flags: {
    svg: string;
  };
}

// ES: El estado inicial es un array vacío de todos.
// EN: The initial state is an empty array of todos.
const initialState: Country[] = [];

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setSavedCountries(_, action: PayloadAction<Country[]>) {
      return action.payload;
    },
    removeCountry(state, action: PayloadAction<string>) {
      const filteredState = state.filter(
        (country) =>
          country.name.common.toLowerCase() !== action.payload.toLowerCase()
      );
      return filteredState;
    },
  },
});
export const { setSavedCountries, removeCountry } = countrySlice.actions;
export default countrySlice.reducer;
