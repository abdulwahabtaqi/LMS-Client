export interface  AppContextProps {
    message: string;
    pageLoader: PageLoader
}
export interface MainContextProviderProps {
    children: React.ReactNode;
}

export interface PageLoader {
    pageLoading:number;
    setPageLoading: (newPageLoading: number) => void;
    primeReactLoader: boolean;
    setPrimeReactLoader: (newPrimeReactLoader: boolean) => void;
}
