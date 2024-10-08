import getAndDeleteRequest from '../../services/getAndDeleteRequest';

const getAllUsers = async () => {
    const result = await getAndDeleteRequest('GET', `/users/all`);
    return result as any;
};

export default getAllUsers;
