import { EdgeLoading, FullScreenLoading } from '@/components/loading/loading'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter();

    function storeToken() {
        if (window.localStorage.getItem("uxairishere")) {
            try {
                const current_user = window.localStorage.getItem("uxairishere");
                if (current_user && JSON.parse(current_user)?.accessToken) {
                    setUser(JSON.parse(current_user));
                }
            } catch (error) {
                console.error("Error parsing user from localStorage:", error);
            }
        }
    }

    useEffect(() => {
        storeToken();
        setLoading(false);
    }, []);

    useEffect(() => {
        console.log("User from context: ", user);
    }, [user]);



    const logout = async () => {
        window.localStorage.removeItem("uxairishere");
        setUser(null);
        console.log("You are logged out")
        router.push('/')
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {loading ? <FullScreenLoading/> : children}
        </AuthContext.Provider>
    )
}