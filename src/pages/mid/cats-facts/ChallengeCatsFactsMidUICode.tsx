import CodeViewer from '../../../components/CodeViewer';

const codeString = `
import ChallengeCatsFactsLowUICode from './ChallengeCatsFactsLowUICode';

function ChallengeCatsFactsLow() {
  return (
    <>
      <div className="container">
        <h1>Cats Facts Mid</h1>
      </div>
      <ChallengeCatsFactsLowUICode />
    </>
  );
}

export default ChallengeCatsFactsLow;
`;

function ChallengeCactsFactsLowUICode() {
  return (
    <div>
      <CodeViewer
        code={codeString}
        title="Source Code: ChallengeCountryLow.tsx"
      />
    </div>
  );
}

export default ChallengeCactsFactsLowUICode;
