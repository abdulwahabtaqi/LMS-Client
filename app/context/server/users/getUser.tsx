import getAndDeleteRequest from '../../services/getAndDeleteRequest';

const getUser = async (id: string) => {
    const result = await getAndDeleteRequest('GET', `/users/user/${id}`);
    return result as any;
};

export default getUser;
