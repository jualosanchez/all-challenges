import CodeViewer from '../../../components/CodeViewer';

const codeString = `
import { useState } from 'react';
import ChallengeCountryLowUICode from './ChallengeCountryLowUICode';

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

function ChallengeCountryLow() {
  // 2. Usamos los tipos de datos en los hooks de estado
  const [query, setQuery] = useState<string>('');
  const [countryInfo, setCountryInfo] = useState<Country | null>(null);
  const [error, setError] = useState<string>('');

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

  const handleClear = () => {
    setQuery('');
    setCountryInfo(null);
    setError('');
  };

  const isInputEmpty = query.trim() === '';

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
      </div>
      <ChallengeCountryLowUICode />
    </>
  );
}

export default ChallengeCountryLow;
`;

function ChallengeCountryLowUICode() {
  return (
    <div>
      <CodeViewer
        code={codeString}
        title="Source Code: ChallengeCountryLow.tsx"
      />
    </div>
  );
}

export default ChallengeCountryLowUICode;
