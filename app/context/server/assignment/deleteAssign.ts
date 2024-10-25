import getAndDeleteRequest from "../../services/getAndDeleteRequest";

interface GetTeacherAssignParams {
    id: string;
    teacherId: string;
}
const deleteAssign = async ({ id, teacherId }: GetTeacherAssignParams) => {

    const result = await getAndDeleteRequest("DELETE", `/assign/delete/${id}/teacher/${teacherId}`);
    return result as any;
};

export default deleteAssign;


