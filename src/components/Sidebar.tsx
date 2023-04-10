import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  IoChevronBackSharp,
  IoChevronForwardSharp,
  IoHomeSharp,
  IoSettingsSharp,
  IoPersonSharp,
  IoShieldSharp,
  IoNotificationsSharp,
} from 'react-icons/io5';

interface Menu {
  name: string;
  icon: JSX.Element;
  link: string;
  children?: Menu[];
  active?: boolean;
}

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const router = useRouter();
  const currentPath = router.pathname;

  const menus: Menu[] = [
    {
      name: 'Dashboard',
      icon: <IoHomeSharp />,
      link: '/dashboard',
      active: currentPath === '/dashboard',
    },
    {
      name: 'Settings',
      icon: <IoSettingsSharp />,
      link: '/settings',
      active: currentPath.startsWith('/settings'),
      children: [
        {
          name: 'Profile',
          icon: <IoPersonSharp />,
          link: '/settings/profile',
          active: currentPath === '/settings/profile',
        },
        {
          name: 'Security',
          icon: <IoShieldSharp />,
          link: '/settings/security',
          active: currentPath === '/settings/security',
        },
        {
          name: 'Notifications',
          icon: <IoNotificationsSharp />,
          link: '/settings/notifications',
          active: currentPath === '/settings/notifications',
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
          {menus.map((menu, index) => (
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
                  {menu.children.map((child, index) => (
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
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

// Things sthat should be done
// 1. Add Avatar / Login
// 2. Add Logout
