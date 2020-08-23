import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "APi-KEY": "23593d60-c22c-47da-81ff-747dcfc87e16",
    },
});

export const usersApi = {
    getUsers(currentPage = 1, totalUsersCount = 10) {
        return instance
            .get(`users?page=${currentPage}&count=${totalUsersCount}`)
            .then((response) => {
                return response.data;
            });
    },

    follow(userId) {
        return instance.post(`follow/${userId}`);
    },

    unFollow(userId) {
        return instance.delete(`follow/${userId}`);
    },

    getProfile(userId) {
        return instance.get(
            `profile/${userId}`
        );
    },
};

export const authApi = {
    me() {
        return instance
            .get("auth/me");
    }
};
