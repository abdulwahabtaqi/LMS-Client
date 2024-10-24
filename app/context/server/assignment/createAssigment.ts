import postAndPutRequest from "../../services/postAndPutRequest";

const createAssignment = async (data: {}) => {

    const result = await postAndPutRequest("POST", data, `/assign/create`);
    console.log(result)
    return result as any;
};

export default createAssignment;
