import getAndDeleteRequest from "../../services/getAndDeleteRequest";

interface GetAssignDetailParams {
    assignmentId: string;
    userId: string;
}

const getAssignDetail = async ({ assignmentId, userId }: GetAssignDetailParams) => {

    const result = await getAndDeleteRequest("GET", `/assignment/${assignmentId}/user/${userId}`);
    return result as any;
};

export default getAssignDetail;


