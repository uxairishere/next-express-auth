import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useAuth } from '@/context/AuthUserContext';
import { refreshToken } from './useRefreshAuth';


export const useAxiosAuth = () => {
const axiosJWT = axios.create()
const { user, setUser } = useAuth();

axiosJWT.interceptors.request.use(
    async (config) => {
        let currentDate = new Date();
        const decodedToken: any = jwt_decode(user.accessToken);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            const data = await refreshToken(user, setUser);
            config.headers["authorization"] = "Bearer " + data.accessToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

return axiosJWT;

}