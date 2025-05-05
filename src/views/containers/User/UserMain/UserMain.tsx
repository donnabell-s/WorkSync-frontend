import { Outlet } from 'react-router'
import Header from '../../../components/Layout/UserLayout/Header'

const UserMain = () => {


  return (
    <div className='h-screen w-screen flex flex-col bg-[#F3F4F6]'>
      <Header></Header>
      <main className='flex h-full'>
        <div className={`w-full h-full overflow-y-auto`}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default UserMain