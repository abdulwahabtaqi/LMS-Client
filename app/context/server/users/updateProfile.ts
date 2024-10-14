import postAndPutRequest from "../../services/postAndPutRequest";

const updateProfile = async (data: {} | [], type: string = "direct") => {
    const result = await postAndPutRequest("PUT", data, `/auth/update`, type);
    return result as any;
};

export default updateProfile;
