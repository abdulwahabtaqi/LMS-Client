'use client';
import React, { ReactNode, useState } from 'react';
import AppContext from './context';
import { AppContextProps, PageLoader, ToasterData } from './types';
import { Toaster } from '../shared/types';


interface AppProviderProps {
  children: ReactNode;
}

let pageLoader: PageLoader;
let toasterData: ToasterData;
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [pageLoading, setPageLoading] = useState(0)
  const [primeReactLoader, setPrimeReactLoader] = useState(false);
  const [toaster, setToaster] = useState({} as Toaster)
  pageLoader = {
    pageLoading, setPageLoading, primeReactLoader, setPrimeReactLoader
  };
  toasterData = {
      toaster, setToaster
  }
  const [message, setMessage] = useState<string>('');

  const contextValue = {
    message,
    pageLoader,
    toaster,
    setToaster
  } as AppContextProps;

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
};

export default AppProvider;
export { pageLoader , toasterData }
