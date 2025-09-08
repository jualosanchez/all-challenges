import { useMemo, useState } from 'react';
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
    `${API_URL}all?fields=name,capital,population,flags`
  );
  if (!response.ok) throw new Error('Error en la red.');

  const data: Country[] = await response.json();
  return data;
}

async function getCountryByName(name: string): Promise<Country[]> {
  const response = await fetch(`${API_URL}name/${name}`);
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

  const allCountries = useMemo(() => {
    if (isLoading) return [];

    if (isInputEmpty) return data?.slice(start, end);

    return data?.filter((countries) =>
      countries.name.common.toLowerCase().includes(query.toLowerCase())
    );
  }, [isLoading, isInputEmpty, data, start, end, query]);

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
              <p>Población: {countryInfo.population?.toLocaleString()}</p>
              <img
                src={countryInfo.flags.svg}
                alt={`Bandera de ${countryInfo.name.common}`}
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
                    <td>{country.population?.toLocaleString()}</td>
                    <td>
                      <img
                        src={country.flags.svg}
                        alt={`Bandera de ${country.name.common}`}
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
            listada: {allCountries?.length ?? 0}
          </h2>
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            allCountries?.length && (
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
                    {allCountries?.map((country) => (
                      <tr
                        key={country.name.common}
                        style={{ borderTop: '1px solid #eee' }}
                      >
                        <td>{country.name.common}</td>
                        <td>{country.capital?.join(', ') ?? 'N/A'}</td>
                        <td>{country.population?.toLocaleString()}</td>
                        <td>
                          <img
                            src={country?.flags?.svg}
                            alt={`Bandera de ${country.name.common}`}
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
          {!allCountries?.length && <p>No hay países.</p>}
        </div>
      </div>
      <ChallengeCountryHardUICode />
    </>
  );
}

export default ChallengeCountryHard;
