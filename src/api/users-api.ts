import { APIResponseType, GetItemsType, instance } from './api';

export const usersApi = {
    getUsers(currentPage = 1, totalUsersCount = 10) {
        return instance
            .get<GetItemsType>(`users?page=${currentPage}&count=${totalUsersCount}`)
            .then((response) => {
                return response.data;
            });
    },

    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data);
    },

    unFollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(resp => resp.data) as Promise<APIResponseType>;
    }
};