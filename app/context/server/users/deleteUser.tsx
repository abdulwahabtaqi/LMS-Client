import getAndDeleteRequest from '../../services/getAndDeleteRequest';

const deleteUser = async (id: string) => {
    const result = await getAndDeleteRequest('DELETE', `/users/user/${id}`);
    return result as any;
};

export default deleteUser;
