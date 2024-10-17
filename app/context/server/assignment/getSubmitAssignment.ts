import getAndDeleteRequest from "../../services/getAndDeleteRequest";

const getSubmitAssign = async (id: string) => {


    const result = await getAndDeleteRequest("GET", `/assignment/allAssignments/${id}`);
    return result as any;
};

export default getSubmitAssign;


