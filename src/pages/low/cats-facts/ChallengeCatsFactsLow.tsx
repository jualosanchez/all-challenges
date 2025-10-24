import { useEffect, useState } from 'react';
import ChallengeCatsFactsLowUICode from './ChallengeCatsFactsLowUICode';

function ChallengeCatsFactsLow() {
  const [factValue, setFact] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://catfact.ninja/fact')
      .then((res) => res.json())
      .then((response) => {
        const { fact } = response;
        setFact(fact);
      });
  }, []);

  useEffect(() => {
    if (!factValue) return;

    const threeFirstWords = factValue?.split(' ', 3).join(' ');
    fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&json=true`)
      .then((res) => res.json())
      .then((response) => {
        const { url } = response;
        setImgUrl(url);
      });
  }, [factValue]);

  return (
    <>
      <header className="container">
        <h1>Cats Facts Low</h1>
      </header>
      <main>
        <p>{factValue && factValue}</p>
        {factValue && imgUrl && <img src={imgUrl} alt="" />}
      </main>
      <ChallengeCatsFactsLowUICode />
    </>
  );
}

export default ChallengeCatsFactsLow;
