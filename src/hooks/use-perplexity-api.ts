
import useLocalStorage from './use-local-storage';

export const usePerplexityApi = () => {
  const [apiKey, setApiKey, removeApiKey] = useLocalStorage<string>('perplexity-api-key', '');

  const isValidKey = (key: string) => {
    return key.startsWith('pplx-') && key.length > 20;
  };

  return {
    apiKey,
    setApiKey: (key: string) => {
      if (!isValidKey(key)) {
        throw new Error('Invalid Perplexity API key format');
      }
      setApiKey(key);
    },
    removeApiKey,
    isValidKey,
  };
};
