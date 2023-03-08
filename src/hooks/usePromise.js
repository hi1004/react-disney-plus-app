import { useEffect, useState } from 'react';

export default function usePromise(promiseCreate, deps) {
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolvedData = await promiseCreate();

        setResolved(resolvedData);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    process();
  }, deps);

  return [loading, resolved, error];
}
