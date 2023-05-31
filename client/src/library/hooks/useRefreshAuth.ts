import axios from "axios";

export const refreshToken = async (user:any, setUser:any) => {
    try {
        if (!user || !user.refreshToken || !user.user) {
            console.log("User or refreshToken is missing");
            return;
        }

        const res = await axios.post("http://localhost:5000/auth/api/token", { token: user.refreshToken });
        console.log("Refresh Request: ", user)
        setUser({
            ...user,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};