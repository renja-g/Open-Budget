import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

const Navbar = () => {
  const { data: session, status: sessionStatus } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="flex items-center justify-between py-4 bg-indigo-950 pl-4">
      <div className="flex items-center">
        <Link href="/">
          <span className="font-extrabold tracking-tight text-white sm:text-xl">
            Open <span className="text-fuchsia-500">Budget</span>
          </span>
        </Link>
        {session && (
          <Link href="/dashboard" className="ml-5 font-medium text-white hover:text-fuchsia-800">
            Dashboard
          </Link>
        )}
      </div>
      <div className="flex items-center">
        {sessionStatus === 'loading' && (
          <span className="mr-4 font-medium text-gray-700">Loading...</span>
        )}
        {sessionStatus === 'authenticated' && (
          <Menu as="div" className="relative">
            <Menu.Button>
              <div className="relative mr-4 flex-shrink-0">
                <Image
                  src={session.user?.image ?? ''}
                  alt="Profile Picture"
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                />
              </div>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className={`absolute right-0 z-50 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${menuOpen ? 'mb-16' : ''}`}>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } block px-4 py-2 text-sm w-full text-left`}
                        onClick={() => signOut()}
                      >
                        Sign Out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        )}
        {sessionStatus === 'unauthenticated' && (
          <button className="ml-5 font-medium text-white hover:text-fuchsia-800 mr-4" onClick={() => signIn()}>
            Sign In
          </button>)}
      </div>
    </nav>
  )
}

export default Navbar
