import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  const [avatar, setAvatar] = useState(() => localStorage.getItem('avatar') || '');
  return (
    <div className='container mx-auto h-screen flex flex-col justify-around'>
      <ToastContainer theme='colored' autoClose={1000} />
      <div className='flex justify-between'>
        <nav className='space-x-5'>
          <NavLink className={({ isActive, isPending }) => (isPending ? 'italic' : isActive ? 'underline' : '')} to='/'>
            Chat
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) => (isPending ? 'italic' : isActive ? 'underline' : '')}
            to='/settings'
          >
            Settings
          </NavLink>
        </nav>
        <div className='avatar'>
          <div className='mask mask-hexagon w-24'>
            <img src={avatar} alt='' />
          </div>
        </div>
      </div>
      <Outlet context={setAvatar} />
    </div>
  );
};

export default MainLayout;
