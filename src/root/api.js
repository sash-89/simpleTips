import * as  axios from "axios";

let instance;

export const setAuthToken =(token)=> {
    instance = axios.create({
        // withCredentials: true,
        baseURL: "http://172.105.27.80:8080",
        headers: {
            Accept: "*/*",
            Authorization: token ?  'Bearer ' + token : ""
        }
    });
};

// if (token) {
//     axios.defaults.headers.common.Authorization = `Bearer ${ token }`
// }

export const LoginAPI = {
    async getSmsCode(phoneNumber) {
        try {
            const response = await instance(`/api/public/v1/sendSmsCode`, {
                params: {
                    phoneNumber
                }
            });

            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data
            }
        }
    },

    async login({code, phoneNumber, roleType}) {
        try {
            const response = await instance.post(`/api/public/v1/login`, {code, phoneNumber, roleType});
            return  response.data;
        } catch (error) {
            if (error.response) {
                throw error.response.data
            }
        }
    }
};


export const userProfileAPI = {
    async updateUserProfile({nameForProfile, firstName, lastName}) {
        try {
            const response = await instance.post(`/api/private/v1/updateUserData`, {nameForProfile, firstName, lastName});
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data
            }
        }
    },
    async updateAdminProfile({address, city, organizationName}) {
        try {
            const response = await instance.post(`/api/private/v1/addAndUpdateOrganization`, {address, city, organizationName});
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data
            }
        }
    },
    async changePhoneNumber({code, phoneNumber}) {
        try {
            const response = await instance.post(`/api/private/v1/changePhoneNumber`, {code, phoneNumber});
            return  response.data;
        } catch (error) {
            if (error.response) {
                throw error.response.data
            }
        }
    },
    async addEmailAndConfirm({email}) {
        try {
            const response = await instance(`/api/private/addEmailAndConfirm?email=${email}`);
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data
            }
        }
    },
    async confirmEmail({code}) {
        try {
            const response = await instance(`/api/public/confirmEmail/${code}`);
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data
            }
        }
    },
};

export const userBalanceAPI = {
    async getUserCardData() {
        try {
            const response = await instance(`/api/private/v1/getUserCard`);
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data
            }
        }
    },
};


export const organizationAPI = {
    async getAdminOrganization() {
        try {
            const response = await instance(`/api/private/v1/getOrganization`);
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data
            }
        }
    },
    async addRoom({floor, number, organizationId}) {
        try {
            const response = await instance.post(`/api/private/v1/addRoom`, {floor, number, organizationId});
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data
            }
        }
    },
    async attachOrganizationForUser({userID, organizationId}) {
        try {
            const response = await instance(`/api/private/v1/attachOrganizationForUser?userID=${userID}&organizationId=${organizationId}`);
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data
            }
        }
    },
    async getOrganizationRooms() {
        try {
            const response = await instance(`/api/private/v1/getOrganizationRooms`);
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data
            }
        }
    },
    async attachRoomFromAdmin({userID, roomNumber, organizationId}) {
        try {
            const response = await instance.post(`/api/private/v1/attachRoomFromAdmin`, {userID, roomNumber});
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data
            }
        }
    },
    async getUserOrganizationRoomsByFloor({organizationId, floor}) {
        try {
            const response = await instance(`/api/private/v1/OrganizationRoomsByFloor?organizationId=${organizationId}&floor=${floor}`);
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data
            }
        }
    },
    async getUserRoomList({organizationId}) {
        try {
            const response = await instance(`/api/private/v1/roomsListOrganization?organizationId=${organizationId}`);
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data
            }
        }
    },

    async attachRoomFromUser({roomNumber}) {
        try {
            const response = await instance(`/api/private/v1/attachRoom?roomNumber=${roomNumber}`);
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data
            }
        }
    },
    // async getOrganizationByID(organizationId) {
    //     try {
    //         const response = await instance(`/api/private/v1/roomsByOrganization?organizationId=${organizationId}`);
    //         return response.data;
    //     }
    //     catch (error) {
    //         if (error.response) {
    //             throw error.response.data
    //         }
    //     }
    // },
};


export const supportAPI = {
    async writeInSupport({description, emailOrPhoneNumber, name}) {
        try {
            const response = await instance.post(`/api/private/v1/writeInSupport`, {description, emailOrPhoneNumber, name});
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data
            }
        }
    },

    async getSupportContacts() {
        try {
            const response = await instance.post(`/api/public/v1/getSupportText`);
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data
            }
        }
    },
};

export const popularQuestionsAPI = {
    async getPopularQuestions() {
        try {
            const response = await instance.post(`/api/public/v1/getPopularQuestions`);
            // const response = await axios.post(`https://dev.chargex.am/api/api/public/v1/getPopularQuestions?location=RU`);
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw error.response.data
            }
        }
    },
};