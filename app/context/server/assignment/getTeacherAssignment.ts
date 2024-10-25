import getAndDeleteRequest from "../../services/getAndDeleteRequest";

const getTeacherAssign = async (id: string) => {


    const result = await getAndDeleteRequest("GET", `/assign/my/${id}`);
    return result as any;
};

export default getTeacherAssign;


