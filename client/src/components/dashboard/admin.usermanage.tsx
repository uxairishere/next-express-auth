import React, { useEffect, useState } from 'react'
import avatar from "../../../public/assets/profile.jpg"
import { useAxiosAuth } from '@/library/hooks/useAxiosAuth'
import { useAuth } from '@/context/AuthUserContext'

type Props = {}

const UserManagement = (props: Props) => {
    const axiosJWT = useAxiosAuth();
    const { user } = useAuth();
    const [users, setUsers] = useState<any>([]);

    useEffect(() => {
        fetchAllUsers();
    }, [])

    const fetchAllUsers = async () => {
        try {
            const allusers = await axiosJWT.post("http://localhost:5000/auth/api/users", { "user": "uxair" }, {
                headers: { authorization: "Bearer " + user.accessToken },
            });
            console.log(allusers)
            console.log("success")
            setUsers(allusers.data.allusers)
        } catch (err) {
            console.log("failed")
            console.log(err)
        }
    }
    return (
        <div>
            <h1 className='font-bold text-md mb-3'>User management</h1>
            {(users && users.length > 0) ?
users.map((user:any, index:any) => (
                <div key={index} className='border border-zinc-200 rounded-lg flex justify-start items-center gap-5 p-3 mb-3'>
                    <img className='w-8 h-8 rounded-full border border-zinc-200' src={(user?.profileImg && user.profileImg !==null) ? `${process.env.NEXT_PUBLIC_SERVER_PATH}/images/${user.profileImg}` : avatar.src} alt="avatar" />
                    <div>
                        <h1 className='text-base font-semibold'>{user.name}</h1>
                        <h1 className='text-xs'>{user.role}</h1>
                    </div>
                </div> ))
                :
                <div className="flex items-center mt-4 space-x-3">
                    <svg className="text-gray-200 w-14 h-14 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
                    <div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-32 mb-2"></div>
                        <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserManagement