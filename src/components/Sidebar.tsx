import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';

import {
  IoChevronBackSharp,
  IoChevronForwardSharp,
  IoHomeSharp,
  IoSettingsSharp,
  IoPersonSharp,
  IoShieldSharp,
  IoNotificationsSharp,
  IoPersonAddSharp,
} from 'react-icons/io5';

interface Menu {
  name: string;
  icon: JSX.Element;
  link: string;
  needAuth: boolean;
  children?: Menu[];
  active?: boolean;
}

const Sidebar = () => {
  const { data: session, status: sessionStatus } = useSession();
  const [open, setOpen] = useState(true);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const router = useRouter();
  const currentPath = router.pathname;

  const menus: Menu[] = [
    {
      name: 'Dashboard',
      icon: <IoHomeSharp />,
      link: '/dashboard',
      active: currentPath === '/dashboard',
      needAuth: true,
    },
    {
      name: 'Settings',
      icon: <IoSettingsSharp />,
      link: '/settings',
      active: currentPath.startsWith('/settings'),
      needAuth: true,
      children: [
        {
          name: 'Profile',
          icon: <IoPersonSharp />,
          link: '/settings/profile',
          active: currentPath === '/settings/profile',
          needAuth: true,
        },
        {
          name: 'Security',
          icon: <IoShieldSharp />,
          link: '/settings/security',
          active: currentPath === '/settings/security',
          needAuth: true,
        },
        {
          name: 'Notifications',
          icon: <IoNotificationsSharp />,
          link: '/settings/notifications',
          active: currentPath === '/settings/notifications',
          needAuth: true,
        },
      ],
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed flex h-screen flex-col ${
          open ? 'w-48' : 'w-16'
        } bg-gray-800 text-white transition-all duration-300 ease-in-out`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          {/* Sidebar header */}
          <Link href="/">
            {open ? (
              <span className="text-xl font-bold">
                Open <span className="text-fuchsia-500">Budget</span>
              </span>
            ) : (
              <span className="text-xl font-bold">
                O<span className="text-fuchsia-500">B</span>
              </span>
            )}
          </Link>
          {/* Sidebar collapse/expand button */}
          <button
            className="text-white hover:text-gray-500"
            onClick={() => setOpen(!open)}
          >
            {open ? <IoChevronBackSharp /> : <IoChevronForwardSharp />}
          </button>
        </div>
        {/* Sidebar menu */}
        <div className="flex-grow overflow-y-auto px-2 py-4">
          {menus.map((menu, index) => {
            // Hide menu item if user is not authenticated and menu item requires authentication
            if (menu.needAuth && !session) {
              return null;
            }

            return (
              <div key={index} className="mb-4">
                {/* Link element */}
                {menu.link ? (
                  <Link href={menu.link}>
                    <div
                      className={`flex cursor-pointer items-center rounded-lg px-4 py-2 hover:bg-gray-700 ${
                        menu.active ? 'bg-gray-700' : ''
                      }`}
                    >
                      {menu.icon}
                      <span className={`${open ? 'ml-2' : 'hidden'}`}>
                        {menu.name}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div
                    className={`flex cursor-pointer items-center rounded-lg px-4 py-2 hover:bg-gray-700 ${
                      menu.active ? 'bg-gray-700' : ''
                    }`}
                  >
                    {menu.icon}
                    <span className={`${open ? 'ml-2' : 'hidden'}`}>
                      {menu.name}
                    </span>
                  </div>
                )}
                {/* Nested menu */}
                {menu.children && (
                  <div
                    className={`${
                      open ? 'ml-8' : 'hidden'
                    } mt-2 flex flex-col space-y-2`}
                  >
                    {menu.children.map((child, index) => {
                      // Hide menu item if user is not authenticated and menu item requires authentication
                      if (child.needAuth && !session) {
                        return null;
                      }

                      return (
                        <Link key={index} href={child.link}>
                          <div
                            className={`flex cursor-pointer items-center rounded-lg px-4 py-2 hover:bg-gray-700 ${
                              menu.active ? 'bg-gray-700' : ''
                            }`}
                          >
                            {child.icon}
                            <span className="ml-2">{child.name}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* Sidebar footer */}
        <div className="px-2 py-4">
          <div className="flex cursor-pointer items-center rounded-lg px-4 py-2 hover:bg-gray-700">
            {!session && sessionStatus === 'unauthenticated' && (
              <div
                className="flex cursor-pointer items-center space-x-2"
                onClick={() => void signIn()}
              >
                <IoPersonAddSharp />
                <span className={`${open ? 'font-medium' : 'hidden'}`}>
                  Sign in
                </span>
              </div>
            )}
            {session && sessionStatus === 'authenticated' && (
              <div
                className="flex cursor-pointer items-center space-x-2"
                onClick={() => void signOut()}
              >
                <div className="relative h-8 w-8">
                  <Image
                    src={session.user.image ?? '/default-avatar.png'}
                    alt={'img'}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-full"
                  />
                </div>
                <span className={`${open ? 'text-sm font-medium' : 'hidden'}`}>
                  {session.user.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
