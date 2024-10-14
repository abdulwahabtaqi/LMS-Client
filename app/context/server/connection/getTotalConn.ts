import getAndDeleteRequest from "../../services/getAndDeleteRequest";

const getTotalConn = async (userId: {}) => {


    const result = await getAndDeleteRequest("GET", `/connection/getAcceptedConnections/${userId}`);
    return result as any;
};

export default getTotalConn;
