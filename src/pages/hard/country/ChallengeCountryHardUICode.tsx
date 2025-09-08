import CodeViewer from '../../../components/CodeViewer';

const codeString = `
import { useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import ChallengeCountryHardUICode from './ChallengeCountryHardUICode';
import {
  Country,
  setSavedCountries,
  removeCountry,
} from '../../../redux/countriesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';

const API_URL = 'https://restcountries.com/v3.1/';

async function getAllCountries(): Promise<Country[]> {
  const response = await fetch(
    \`\${API_URL}all?fields=name,capital,population,flags\`
  );
  if (!response.ok) throw new Error('Error en la red.');

  const data: Country[] = await response.json();
  return data;
}

async function getCountryByName(name: string): Promise<Country[]> {
  const response = await fetch(\`\${API_URL}name/\${name}\`);
  if (!response.ok) throw new Error('Pais no encontrado o error de red');

  const data: Country[] = await response.json();
  return data;
}

function ChallengeCountryHard() {
  // 2. Usamos los tipos de datos en los hooks de estado
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(10);
  const [query, setQuery] = useState<string>('');
  const [countryInfo, setCountryInfo] = useState<Country | null>(null);
  const savedCountries = useSelector((state: RootState) => state.countries);
  const dispatch: AppDispatch = useDispatch();

  // 👇 Dos queries en un solo hook
  const [
    { data, isLoading },
    { data: dataName, isLoading: isLoadingName, isError: error, refetch },
  ] = useQueries({
    queries: [
      {
        queryKey: ['countrieName'],
        queryFn: getAllCountries,
      },
      {
        queryKey: ['country', query],
        queryFn: () => getCountryByName(query),
        enabled: !!query, // la disparamos a mano con refetch()
        retry: false,
      },
    ],
  });

  const handleSearch = async () => {
    if (!query.trim()) return;

    setCountryInfo(null);
    refetch();
    setCountryInfo(dataName?.[0] ?? null);
  };

  const handleSaveCountry = () => {
    if (countryInfo) {
      const isAlreadySaved = savedCountries.some(
        (country) => country.name.common === countryInfo.name.common
      );

      if (!isAlreadySaved) {
        dispatch(setSavedCountries([...savedCountries, countryInfo]));
      }
    }
  };

  const handleClear = () => {
    setQuery('');
    setCountryInfo(null);
    setStart(0);
    setEnd(10);
  };

  const isInputEmpty = query.trim() === '';

  const filterCountries = !isLoading
    ? data?.filter((countries) =>
        countries.name.common.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const pagCountries = !isLoading ? data?.slice(start, end) : [];

  const paginateCountries = query ? filterCountries : pagCountries;

  const dataEnd = data?.length ? data?.length : -1;

  return (
    <>
      <div className="container">
        <h1>Buscador de Países</h1>

        <div className="search-controls">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Escribe un país..."
          />
          <button onClick={handleSearch} disabled={isInputEmpty}>
            Buscar
          </button>
          <button onClick={handleSaveCountry} disabled={!countryInfo}>
            Guardar
          </button>
          <button onClick={handleClear} disabled={isInputEmpty}>
            Limpiar
          </button>
        </div>

        <div className="info-area">
          {error && <p className="error">{error}</p>}
          {isLoadingName && <p>Cargando país...</p>}

          {!isLoadingName && !error && countryInfo && (
            <div className="country-card">
              <h2>{countryInfo.name.common}</h2>
              <p>Capital: {countryInfo.capital?.[0] || 'N/A'}</p>
              <p>Población: {countryInfo.population.toLocaleString()}</p>
              <img
                src={countryInfo.flags.svg}
                alt={\`Bandera de \${countryInfo.name.common}\`}
                width="100"
              />
            </div>
          )}
        </div>

        <hr />

        <div className="saved-list">
          <h2>Países Guardados</h2>

          {savedCountries.length ? (
            <table
              width="100%"
              cellPadding={8}
              style={{ borderCollapse: 'collapse' }}
            >
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Capital</th>
                  <th>Población</th>
                  <th>Bandera</th>
                  <th>Borrar</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: 'center' }}>
                {savedCountries.map((country) => (
                  <tr
                    key={country.name.common}
                    style={{ borderTop: '1px solid #eee' }}
                  >
                    <td>{country.name.common}</td>
                    <td>{country.capital?.join(', ') ?? 'N/A'}</td>
                    <td>{country.population.toLocaleString()}</td>
                    <td>
                      <img
                        src={country.flags.svg}
                        alt={\`Bandera de \${country.name.common}\`}
                        width={24}
                        height={16}
                        style={{ display: 'inline' }}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          dispatch(removeCountry(country.name.common))
                        }
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay países guardados.</p>
          )}
        </div>

        <hr />

        <div className="saved-list">
          <h2>
            Todos Los Paises - Total: {data?.length ?? 0} Cantidad Anctual
            listada: {paginateCountries?.length ?? 0}
          </h2>
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            paginateCountries?.length && (
              <>
                <table
                  width="100%"
                  cellPadding={8}
                  style={{ borderCollapse: 'collapse' }}
                >
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Capital</th>
                      <th>Población</th>
                      <th>Bandera</th>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: 'center' }}>
                    {paginateCountries.map((country) => (
                      <tr
                        key={country.name.common}
                        style={{ borderTop: '1px solid #eee' }}
                      >
                        <td>{country.name.common}</td>
                        <td>{country.capital?.join(', ') ?? 'N/A'}</td>
                        <td>{country.population.toLocaleString()}</td>
                        <td>
                          <img
                            src={country.flags.svg}
                            alt={\`Bandera de \${country.name.common}\`}
                            width={24}
                            height={16}
                            style={{ display: 'inline' }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!query && (
                  <>
                    <button
                      onClick={() => {
                        setStart((prev) => (prev >= 10 ? prev - 10 : prev));
                        setEnd((prev) => (prev >= 20 ? prev - 10 : prev));
                      }}
                    >
                      Anterior
                    </button>
                    <button
                      onClick={() => {
                        setStart((prev) => (prev >= 0 ? prev + 10 : 0));
                        setEnd((prev) =>
                          prev <= dataEnd ? prev + 10 : prev - (dataEnd - 1)
                        );
                      }}
                      disabled={end + 10 >= dataEnd ? true : false}
                    >
                      Siguiente
                    </button>
                    <p>
                      Inicio: {start} - Final: {end}
                    </p>
                  </>
                )}
              </>
            )
          )}
          {!paginateCountries?.length && <p>No hay países.</p>}
        </div>
      </div>
      <ChallengeCountryHardUICode />
    </>
  );
}

export default ChallengeCountryHard;

//----------------------------------------------------------

import { Routes, Route, Link, Navigate } from 'react-router-dom';
import ChallengeCountryMid from './mid/country/ChallengeCountryMid';
import ChallengeCountryLow from './low/country/ChallengeCountryLow';
import ChallengeCountryHard from './hard/country/ChallengeCountryHard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

export default function ChallengeCountry() {
  return (
    <QueryClientProvider client={client}>
      <section>
        <h2>Challenge: Country</h2>

        {/* Navegación local de niveles */}
        <nav style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
          <Link to="low">Low</Link>
          <Link to="mid">Mid</Link>
          <Link to="hard">Hard</Link>
        </nav>

        {/* Rutas anidadas */}
        <Routes>
          <Route index element={<Navigate to="low" replace />} />
          <Route path="low" element={<ChallengeCountryLow />} />
          <Route path="mid" element={<ChallengeCountryMid />} />
          <Route path="hard" element={<ChallengeCountryHard />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </section>
    </QueryClientProvider>
  );
}

//----------------------------------------------------------

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
// Infiere el tipo \`RootState\` directamente desde el store
export type RootState = ReturnType<typeof store.getState>;

// También es una buena práctica inferir y exportar el tipo AppDispatch
export type AppDispatch = typeof store.dispatch;

//----------------------------------------------------------------------
// En tu archivo: src/redux/countriesSlice.ts

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

//----------------------------------------------------

// Router en index
<Container component="main" sx={{ mt: 4, mb: 4 }}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/todo/*" element={<ChallengeTodo />} />
    <Route path="/stopwatch/*" element={<ChallengeStopwatch />} />
    <Route path="/users/*" element={<ChallengeUsers />} />
    <Route path="/country/*" element={<ChallengeCountry />} />
    <Route path="/map/*" element={<ChallengeMap />} />
    <Route path="/filter/*" element={<ChallengeFilter />} />
    <Route path="*" element={<p>Not Found</p>} />
  </Routes>
</Container>
`;

function ChallengeCountryHardUICode() {
  return (
    <div>
      <CodeViewer
        code={codeString}
        title="Source Code: ChallengeCountryMid.tsx"
      />
    </div>
  );
}

export default ChallengeCountryHardUICode;
