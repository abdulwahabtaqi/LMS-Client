
import PrimeReactToast from "../../shared/components/Toast/toast";
import { pageLoader } from "../provider";
import { ApiResponse, ServiceResponse } from "../types";


const postAndPutRequest = async (method: string, data: {} | [], url: string, type = "direct" as string, contentType = "application/json" as string):Promise<ServiceResponse> => {
    try {
        const apiUrl = process?.env?.LOCAL_API_URL + url as string;
        pageLoader?.setPageLoading(30);
        const response = await fetch(apiUrl, {
            method,
            headers: {
                'Content-Type': contentType,
                'Authorization': `${localStorage.getItem("authToken")}`
            },
            body: data ? JSON.stringify(data) : undefined
        });
        pageLoader?.setPageLoading(50);
        const result = await response.json() as ApiResponse;
        pageLoader?.setPageLoading(80);
        if (response?.status === 401) {
            setTimeout(() => {
                localStorage.clear();
                const baseUrl = window.location.origin;
                window.location.href = baseUrl + "/auth/login";
            }, 1500);
            return {} as ServiceResponse;
        } else {
            if (type === "direct") {
                if (result?.status) {
                    PrimeReactToast({severity:'success', summary:'Congratulations!',detail:result?.message, life: 3000});
                    pageLoader.setPrimeReactLoader(false);
                    pageLoader.setPageLoading(100);
                } else {
                    PrimeReactToast({severity:'warn', summary:'Warning!',detail:result?.message, life: 3000});
                    pageLoader.setPrimeReactLoader(false);
                    pageLoader.setPageLoading(100);
                } 
                return {} as ServiceResponse;
            } else if (type === "callback") {
                if (result?.status) {
                    pageLoader.setPageLoading(100);
                    pageLoader.setPrimeReactLoader(false);
                    return {
                        status: true,
                        result,
                    } as ServiceResponse;
                } else {
                    pageLoader.setPageLoading(100);
                    pageLoader.setPrimeReactLoader(false);
                    return {
                        status: false,
                        result,
                    } as ServiceResponse;
                } 

            } else {
                return {} as ServiceResponse;
            }
        }
    } catch (error: any) {
        if (type === "direct") {
            PrimeReactToast({severity:'error', summary:'Error!',detail:error?.message, life: 3000});
            pageLoader.setPrimeReactLoader(false);
            pageLoader.setPageLoading(100);
            return {} as ServiceResponse;
        } else if (type === "callback") {
            pageLoader.setPageLoading(100);
            pageLoader.setPrimeReactLoader(false);
            return {
                status: false,
                result: {} as ApiResponse
            } as ServiceResponse;
        } else {
            return {} as ServiceResponse;
        }
    }
}
export default postAndPutRequest;