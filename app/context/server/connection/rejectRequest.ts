import postAndPutRequest from "../../services/postAndPutRequest";

const rejectReq = async (data: {}) => {


    const result = await postAndPutRequest("POST", data, `/connection/rejectRequest`, "direct");
    return result as any;
};

export default rejectReq;
