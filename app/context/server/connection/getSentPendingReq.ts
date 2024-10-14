import getAndDeleteRequest from "../../services/getAndDeleteRequest";

const getSendPending = async (id: string) => {
    const result = await getAndDeleteRequest("GET", `/connection/getSendPending/${id}`);
    return result as any;
};

export default getSendPending;
