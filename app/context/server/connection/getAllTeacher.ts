import getAndDeleteRequest from "../../services/getAndDeleteRequest";

const getAllTeachers = async (userId: string) => {
    const result = await getAndDeleteRequest("GET", `/teachers/all?userId=${userId}`);
    return result as any;
};

export default getAllTeachers;
