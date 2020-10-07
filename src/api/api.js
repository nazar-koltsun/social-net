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
        console.warn('Obsolete method. Please use profileApi object');
        return profileApi.getProfile(userId);
    },
};

export const profileApi = {
    getProfile(userId) {
        return instance.get(
            `profile/${userId}`
        );
    },

    getStatus(userId) {
        return instance.get(
            `profile/status/${userId}`
        );
    },

    updateStatus(status) {
        return instance.put(
            'profile/status', {status: status}
        );
    },
};

export const authApi = {
    me() {
        return instance
            .get("auth/me");
    }
};

export const loginApi = {
    validUserData(email, password) {
        return instance.post("/auth/login", {email, password});
    }
}
