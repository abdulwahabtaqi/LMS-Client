import getAndDeleteRequest from "../../services/getAndDeleteRequest";

const getPendingConnections = async (id: string) => {
    const result = await getAndDeleteRequest("GET", `/connection/getPendingConnections/${id}`);
    return result as any;
};

export default getPendingConnections;
