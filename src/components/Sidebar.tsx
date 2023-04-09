import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as Avatar from '@radix-ui/react-avatar';
import { MdDashboard } from 'react-icons/md';
import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react';

function Sidebar() {
  const { data: session, status: sessionStatus } = useSession()

  return (
    <div className="flex flex-col w-64 h-screen bg-gray-800">
      <nav className="flex-grow">
        <NavigationMenu.Root>

          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger>
                <div className="flex items-center space-x-2">
                  <Avatar.Root>
                    <Avatar.Image
                      src={session?.user?.image || ''}
                      alt='Avatar'
                      className='w-10 h-10 rounded-full'
                    />
                  </Avatar.Root>
                  <div className="text-white text-sm font-medium">
                    {session?.user?.name || 'Guest'}
                  </div>
                </div>
              </NavigationMenu.Trigger>
            </NavigationMenu.Item>
          </NavigationMenu.List>

          <NavigationMenu.Item
            className="
              flex items-center 
              px-3 py-2 text-sm font-medium text-gray-300 
              rounded-md hover:text-white hover:bg-gray-700
              transition-colors duration-200 ease-in-out
              cursor-pointer
            "
          >
            <MdDashboard className="mr-2" />
            <NavigationMenu.Link className="transition-colors duration-200 ease-in-out">
              <Link href='/dashboard'>
                Dashboard
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.Root>
      </nav>
    </div>
  );
}

export default Sidebar;
