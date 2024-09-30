import getAndDeleteRequest from "../../services/getAndDeleteRequest";

const getMcqsImgs = async () => {


    const result = await getAndDeleteRequest("GET", "/image/all");
    return result as any;
};

export default getMcqsImgs;
