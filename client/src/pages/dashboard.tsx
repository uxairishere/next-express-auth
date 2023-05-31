import AdminDashboard from '@/components/dashboard/admin.dashboard'
import Header from '@/components/header'
import React from 'react'
import { useAuth } from '@/context/AuthUserContext'
import UserDashboard from '@/components/dashboard/user.dashboard'

type Props = {}

const Dashboard = (props: Props) => {

  const { user } = useAuth();

  return (
    <div>
      <Header />
      <>
        {(user?.user?.role && user.user.role === 'admin') ? <AdminDashboard /> : <UserDashboard/>}
      </>
    </div>
  )
}

export default Dashboard