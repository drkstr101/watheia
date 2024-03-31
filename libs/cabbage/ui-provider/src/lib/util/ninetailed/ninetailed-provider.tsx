import { NinetailedProvider } from '@ninetailed/experience.js-next';
import { ReactNode, createContext, useContext, useState } from 'react';

export const ninetailedApiKey = process.env.NEXT_PUBLIC_NINETAILED_API_KEY ?? '';
export const ninetailedEnvironment = process.env.NEXT_PUBLIC_NINETAILED_ENVIRONMENT ?? '';
export const ninetailedEnabled = ninetailedApiKey ? true : false;

// For use in custom App
export function WithNinetailedProvider({ children }: { children: ReactNode }) {
  if (ninetailedEnabled) {
    console.log('Ninetailed enabled');
    return (
      <NinetailedProvider clientId={ninetailedApiKey} environment={ninetailedEnvironment}>
        <VariantChoicesProvider>{children}</VariantChoicesProvider>
      </NinetailedProvider>
    );
  } else {
    return children;
  }
}

type VariantChoicesProps = {
  choices: Record<string, any>;
  updateChoice: (baselineVariantId: any, userSelectedVariantId: any) => void;
};

/*
  Persist the user-select variant in personalized components (see withPersonalization),
  so that editing content or navigation will not reset the component to its default (i.e. show the personalized variant).
  However, doing a hard page reload does mean a new context (TODO persist to local storage as well!)

  Mapping is: baseline variant ID (Contentful object ID) => selected variant ID, regardless of where the baseline is shown.
*/

const VariantChoicesContext = createContext<VariantChoicesProps | null>(null);

export function VariantChoicesProvider({ children }: { children: ReactNode }) {
  const [choices, setChoices] = useState<Record<string, any>>({});

  function updateChoice(baselineVariantId, userSelectedVariantId) {
    const updatedChoices = { ...choices };
    updatedChoices[baselineVariantId] = userSelectedVariantId;
    setChoices(updatedChoices);
  }

  const sharedState = { choices, updateChoice };
  return (
    <VariantChoicesContext.Provider value={sharedState}>
      {children}
    </VariantChoicesContext.Provider>
  );
}

export function useVariantChoicesContext(): VariantChoicesProps {
  const ctx = useContext(VariantChoicesContext);
  if (ctx === null) throw Error('VariantChoicesContext must be used with a react provider');

  return ctx;
}
