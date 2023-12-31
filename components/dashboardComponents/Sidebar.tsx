import React from 'react';
import { useUser } from '../../lib/profile/user-data';
import { useAuthContext } from '../../lib/user/AuthContext';

function Sidebar() {
  const { isSignedIn } = useAuthContext();
  const user = useUser();
  const role = user.permissions?.length > 0 ? user.permissions[0] : '';
  return (
    <>
      {/* ghost section to fill in for fixed sidebar */}
      <section
        id="ghost"
        className="hidden md:flex justify-center h-screen sticky top-0 lg:w-1/8 md:w-1/7 w-1/6"
      ></section>

      <section
        id="Sidebar"
        className="hidden md:flex flex-col content-center justify-center items-center h-screen fixed top-16 lg:w-1/8 md:w-1/7 w-1/6 border-black border-r-2 text-xs lg:text-sm text-center"
        style={{
          backgroundImage: 'url(assets/7.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
        }}
      >
        <div>
          Welcome,{' '}
          {!user || !isSignedIn ? 'hacker' : user.firstName !== '' ? user.firstName : 'hacker'}
        </div>
        <div className="text-white">{role}</div>
      </section>
    </>
  );
}

export default Sidebar;
