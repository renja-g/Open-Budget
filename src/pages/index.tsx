import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

import { api } from '~/utils/api';

const Navbar: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <nav className="flex items-center justify-between flex-wrap bg-indigo-950 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href="/">
          <span className="font-extrabold tracking-tight text-white sm:text-xl">
            Open <span className="text-fuchsia-500">Budget</span>
          </span>
        </Link>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          {sessionData && (
            <Link href="/dashboard" className="text-white hover:text-fuchsia-500">Dashboard</Link>
          )}
        </div>
        <div>
          <button
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-purple-500 hover:bg-white mt-4 lg:mt-0"
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            {sessionData ? 'Sign out' : 'Sign in'}
          </button>
        </div>
      </div>
    </nav>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Open Budget</title>
        <meta name="description" content="Open Budget" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Welcome to Open Budget
          </h1>
        </div>
      </main>
    </>
  );
};

export default Home;
