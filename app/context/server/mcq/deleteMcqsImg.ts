import getAndDeleteRequest from "../../services/getAndDeleteRequest";

const deleteMcqsImg = async (id: string) => {


    const result = await getAndDeleteRequest("DELETE", `/image/delete/${id}`,);
    return result as any;
};

export default deleteMcqsImg;
