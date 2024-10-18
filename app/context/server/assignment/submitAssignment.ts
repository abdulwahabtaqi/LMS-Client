import { pageLoader } from "../../provider";

const submitAssignment = async (userId: string, assignmentId: string, file: string) => {
    try {

        const data = { assignmentId, file, userId }

        pageLoader?.setPageLoading(30);

        const url = "/assignment/submit";
        // const apiUrl = "http://localhost:4040/api/v1" + url;
        const apiUrl = "https://lms-server-production-3667.up.railway.app/api/v1" + url as string;




        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `${localStorage?.getItem("lms-token")}`,
                'Content-Type': 'application/json',
            },
            body: data ? JSON?.stringify(data) : undefined,
        });

        pageLoader?.setPageLoading(50);

        if (!response.ok) {
            return { status: false, message: 'Upload failed', data: null };
        }

        pageLoader?.setPageLoading(80);

        const result = await response.json();
        pageLoader?.setPageLoading(100);

        return result;
    } catch (error) {
        pageLoader?.setPageLoading(100);
        return { status: false, message: 'Upload failed', data: null };
    }
};

export default submitAssignment;
