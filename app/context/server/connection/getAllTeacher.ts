import getAndDeleteRequest from "../../services/getAndDeleteRequest";

const getAllTeachers = async () => {


    const result = await getAndDeleteRequest("GET", "/teachers/all");
    return result as any;
};

export default getAllTeachers;
