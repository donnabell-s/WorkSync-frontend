import { Outlet } from 'react-router'
import Header from '../../../components/Layout/UserLayout/Header'

const UserMain = () => {


  return (
    <div className='min-h-screen w-full flex flex-col bg-[#F3F4F6]'>
      <Header></Header>
      <main className='flex flex-1'>
        <div className={`w-full h-full`}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default UserMain