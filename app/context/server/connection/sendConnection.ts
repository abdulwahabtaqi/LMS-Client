import postAndPutRequest from "../../services/postAndPutRequest";

const sendConnection = async (data: {}) => {


    const result = await postAndPutRequest("POST", data, `/connection/sendConn`, "direct");
    return result as any;
};

export default sendConnection;
