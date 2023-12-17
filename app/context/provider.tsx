'use client';
import React, { ReactNode, useState } from 'react';
import AppContext from './context';
import { AppContextProps, PageLoader, ToasterData } from './types';
import { Toaster } from '../shared/types';
import { NewData, NewGrade, NewQuestion, NewSchool, NewSubTopic, NewSubject, NewTopic } from './types/NewData';


interface AppProviderProps {
  children: ReactNode;
}

let pageLoader: PageLoader;
let toasterData: ToasterData;
let newData: NewData;
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [pageLoading, setPageLoading] = useState(0);
  const [primeReactLoader, setPrimeReactLoader] = useState(false);
  const [toaster, setToaster] = useState({} as Toaster);
  
  // ***************New Data**************** //  
   const [isNewSchool, setIsNewSchool] = useState<boolean>(false);
   const [isNewGrade, setIsNewGrade] = useState<boolean>(false);
   const [isNewSubject, setIsNewSubject] = useState<boolean>(false);
   const [isNewTopic, setIsNewTopic] = useState<boolean>(false);
   const [isNewSubTopic, setIsNewSubTopic] = useState<boolean>(false);
   const [isNewQuestion, setIsNewQuestion] = useState<boolean>(false);
  // ***************End New Data************ // 
  
  pageLoader = {
    pageLoading, setPageLoading, primeReactLoader, setPrimeReactLoader
  } as PageLoader;
  toasterData = {
      toaster, setToaster
  } as ToasterData;

  newData = {
    school: {
      isNewSchool, setIsNewSchool
    } as NewSchool,
    grade: {
      isNewGrade, setIsNewGrade
    } as NewGrade,
    subject:{
      isNewSubject, setIsNewSubject
    } as NewSubject,
    topic:{
      isNewTopic, setIsNewTopic
    } as NewTopic,
    subTopic:{
      isNewSubTopic, setIsNewSubTopic
    } as NewSubTopic,
    question:{
      isNewQuestion, setIsNewQuestion
    } as NewQuestion
  } as NewData;


  const [message, setMessage] = useState<string>('');

  const contextValue = {
    message,
    pageLoader,
    toaster,
    setToaster,
    newData
  } as AppContextProps;

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
};

export default AppProvider;
export { pageLoader , toasterData }
