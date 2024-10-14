import postAndPutRequest from "../../services/postAndPutRequest";

const acceptReq = async (data: {}) => {


    const result = await postAndPutRequest("POST", data, `/connection/acceptRequest`, "direct");
    return result as any;
};

export default acceptReq;
