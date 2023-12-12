'use client';
import React, { ReactNode, useState } from 'react';
import AppContext from './context';
import { AppContextProps, PageLoader } from './types';


interface AppProviderProps {
  children: ReactNode;
}

let pageLoader: PageLoader;
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [pageLoading, setPageLoading] = useState(0)
  const [primeReactLoader, setPrimeReactLoader] = useState(false);
  pageLoader = {
    pageLoading, setPageLoading, primeReactLoader, setPrimeReactLoader
  } ;
  const [message, setMessage] = useState<string>('');

  const contextValue = {
    message,
    pageLoader,
  } as AppContextProps;

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
};

export default AppProvider;
export { pageLoader }
