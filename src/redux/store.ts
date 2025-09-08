// En tu archivo: src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice'; // Asegúrate de que la ruta a tu slice sea correcta
import countriesSlice from './countriesSlice'; // Asegúrate de que la ruta a tu slice sea correcta

export const store = configureStore({
  reducer: {
    // Aquí van todos tus reducers
    todos: todoReducer,
    countries: countriesSlice,
  },
});

// ¡Esta es la parte clave!
// Infiere el tipo `RootState` directamente desde el store
export type RootState = ReturnType<typeof store.getState>;

// También es una buena práctica inferir y exportar el tipo AppDispatch
export type AppDispatch = typeof store.dispatch;
