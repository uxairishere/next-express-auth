import jwt_decode from "jwt-decode";
import axios from 'axios'
import { useAuth } from "@/context/AuthUserContext";
import { refreshToken } from "@/library/hooks/useRefreshAuth";
import { useAxiosAuth } from "@/library/hooks/useAxiosAuth";
const links = [
    { name: 'Open roles', href: '#' },
    { name: 'Internship program', href: '#' },
    { name: 'Our values', href: '#' },
    { name: 'Meet our leadership', href: '#' },
]
const stats = [
    { name: 'Offices worldwide', value: '12' },
    { name: 'Full-time colleagues', value: '300+' },
    { name: 'Hours per week', value: '40' },
    { name: 'Paid time off', value: 'Unlimited' },
]

export default function HeroSection() {

    const { user, setUser } = useAuth();
    const axiosJWT = useAxiosAuth();

    // const axiosJWT = axios.create()

    // axiosJWT.interceptors.request.use(
    //     async (config) => {
    //         let currentDate = new Date();
    //         const decodedToken: any = jwt_decode(user.accessToken);
    //         if (decodedToken.exp * 1000 < currentDate.getTime()) {
    //             const data = await refreshToken(user, setUser);
    //             config.headers["authorization"] = "Bearer " + data.accessToken;
    //         }
    //         return config;
    //     },
    //     (error) => {
    //         return Promise.reject(error);
    //     }
    // );

    const handleLetsGo = async () => {
        try {
            const allusers = await axiosJWT.post("http://localhost:5000/auth/api/users", { "user": "uxair" }, {
                headers: { authorization: "Bearer " + user.accessToken },
            });
            console.log(allusers)
            console.log("success")
        } catch (err) {
            console.log("failed")
            console.log(err)
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10">

                <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32 col-span-1 rounded-lg">
                    <img
                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
                        alt=""
                        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
                    />
                    <div
                        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                        aria-hidden="true"
                    >
                        <div
                            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                    <div
                        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
                        aria-hidden="true"
                    >
                        <div
                            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                </div>
                <div className="col-span-1">
                    <h1 className="text-5xl font-semibold  mb-3">Brilliant Web Templates</h1>
                    <h1 className="text-lg text-gray-500 ">Have an idea about your website? we got you!</h1>
                    <h1 className="text-lg text-gray-500 mb-5">Choose a template for your website and start building</h1>
                    <div>
                    <a href={"/register"} className="transition-all bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 px-5 rounded-lg hover:from-cyan-400 hover:to-blue-400">Get started</a>
                    </div>
                </div>
                <div className='flex flex-col items-start gap-5 col-span-2'>
                      <div className='bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg w-full h-20'></div>
                      <div className='bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg w-full h-20 opacity-50'></div>
                      <div className='bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg w-full h-20 opacity-20'></div>

                    </div>
            </div>

        </>

    )
}
