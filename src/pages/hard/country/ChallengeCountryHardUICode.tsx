import CodeViewer from '../../../components/CodeViewer';

const codeString = `
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ChallengeCountryHardUICode from './ChallengeCountryHardUICode';

// 1. Definimos las interfaces para los tipos de datos de la API
interface Country {
  name: {
    common: string;
  };
  capital?: string[];
  population: number;
  flags: {
    svg: string;
  };
}

const API_URL = 'https://restcountries.com/v3.1/name/';

async function getAllCountries() {
  const response = await fetch(
    'https://restcountries.com/v3.1/all?fields=name'
  );
  if (!response.ok) throw new Error('País no encontrado.');

  const data: Country[] = await response.json();
  return data;
}

function ChallengeCountryHard() {
  // 2. Usamos los tipos de datos en los hooks de estado
  const [query, setQuery] = useState<string>('');
  const [countryInfo, setCountryInfo] = useState<Country | null>(null);
  const [savedCountries, setSavedCountries] = useState<Country[]>([]);
  const [error, setError] = useState<string>('');
  const { data, isLoading } = useQuery({
    queryKey: ['countrieName'],
    queryFn: getAllCountries,
  });

  const handleSearch = async () => {
    if (!query.trim()) return;

    setCountryInfo(null);
    setError('');

    try {
      const response = await fetch(\`\${API_URL}\${query}\`);
      if (!response.ok) {
        throw new Error('País no encontrado.');
      }
      const data: Country[] = await response.json();
      setCountryInfo(data[0]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const handleSaveCountry = () => {
    if (countryInfo) {
      const isAlreadySaved = savedCountries.some(
        (country) => country.name.common === countryInfo.name.common
      );

      if (!isAlreadySaved) {
        setSavedCountries([...savedCountries, countryInfo]);
      }
    }
  };

  const handleClear = () => {
    setQuery('');
    setCountryInfo(null);
    setError('');
  };

  const isInputEmpty = query.trim() === '';

  const filterCountries = data?.filter((countries) =>
    countries.name.common.toLowerCase().includes(query.toLowerCase())
  );

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

          {countryInfo && (
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
          <ul>
            {savedCountries.map((country) => (
              // Es buena práctica usar una key única, como el nombre del país
              <li key={country.name.common}>{country.name.common}</li>
            ))}
          </ul>
          {!savedCountries.length && <p>No hay países guardados.</p>}
        </div>

        <hr />

        <div className="saved-list">
          <h2>Todos Los Paises</h2>
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <ul>
              {filterCountries &&
                filterCountries.map((country) => (
                  // Es buena práctica usar una key única, como el nombre del país
                  <li key={country.name.common}>{country.name.common}</li>
                ))}
            </ul>
          )}
          {!filterCountries?.length && <p>No hay países.</p>}
        </div>
      </div>
      <ChallengeCountryHardUICode />
    </>
  );
}

export default ChallengeCountryHard;
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
