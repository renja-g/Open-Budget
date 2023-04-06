import { type NextPage } from 'next';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Open Budget</title>
        <meta name="description" content="Open Budget" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Welcome to Open <span className="text-fuchsia-500">Budget</span>
          </h1>
        </div>
      </main>
    </>
  );
};

export default Home;
