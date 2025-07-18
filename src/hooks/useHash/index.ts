'use client'

import { useState, useEffect, useCallback } from 'react';

export const useHash = (): [string, (newHash: string) => void] => {
  const [hash, setHash] = useState<string>('');

  useEffect(() => {
    setHash(window.location.hash);

    const hashChangeHandler = () => {
      setHash(window.location.hash);
    };

    window.addEventListener("hashchange", hashChangeHandler);
    return () => window.removeEventListener("hashchange", hashChangeHandler);
  }, []);

  const updateHash = useCallback((newHash: string): void => {
    const formattedHash = newHash.startsWith('#') ? newHash : `#${newHash}`;
    if (formattedHash !== hash) {
      window.location.hash = formattedHash;
    }
  }, [hash]);

  return [hash, updateHash];
};