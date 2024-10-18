import postAndPutRequest from "../../services/postAndPutRequest";

const gradeAssignment = async (data: {}) => {
    const result = await postAndPutRequest("POST", data, `/assignment/grade`, "direct");
    return result as any;
};

export default gradeAssignment;
