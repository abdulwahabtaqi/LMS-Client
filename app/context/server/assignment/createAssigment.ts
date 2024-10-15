import postAndPutRequest from "../../services/postAndPutRequest";

const createAssignment = async (data: {}) => {


    const result = await postAndPutRequest("POST", data, `/assignment/create`, "direct");
    return result as any;
};

export default createAssignment;
