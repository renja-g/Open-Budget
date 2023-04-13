import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { api } from '~/utils/api';

const Deposit = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  const [input, setInput] = useState({
    name: '',
    description: '',
    balance: 0,
    deposit_type: 'CURRENT' as const,
  });

  const createMutation = api.deposit.create.useMutation({
    onSuccess: (data) => {
      setInput({
        name: '',
        description: '',
        balance: 0,
        deposit_type: 'CURRENT',
      });
      toast.success('Deposit created successfully', {
        position: 'top-center',
      });
    },
    onError: (error) => {
      const errorMessage = error.data?.zodError?.fieldErrors.content;
      if (errorMessage) {
        toast.error(errorMessage, {
          position: 'top-center',
        });
      } else {
        toast.error('Something went wrong', {
          position: 'top-center',
        });
      }
    },
  });

  useEffect(() => {
    const checkAuthentication = () => {
      if (sessionStatus === 'unauthenticated') {
        // Centered toast
        toast.error('You must be signed in to view this page', {
          position: 'top-center',
        });
        router.push('/').catch((error) => {
          console.error(error);
        });
      }
    };

    checkAuthentication();
  }, [sessionStatus, router]);

  if (sessionStatus === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMutation.mutate(input);
  };

  return (
    <div className="container mx-auto">
      <h1 className="mb-4 text-3xl font-bold">Create a new deposit</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block font-bold text-gray-700">
            Name
          </label>
          <input
            type="text"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
            id="name"
            required
            value={input.name}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block font-bold text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
            id="description"
            required
            value={input.description}
            onChange={(e) =>
              setInput({ ...input, description: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="balance"
            className="mb-2 block font-bold text-gray-700"
          >
            Balance
          </label>
          <input
            type="number"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
            id="balance"
            required
            value={input.balance}
            onChange={(e) =>
              setInput({ ...input, balance: Number(e.target.value) })
            }
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="deposit_type"
            className="mb-2 block font-bold text-gray-700"
          >
            Deposit Type
          </label>
          <select
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
            id="deposit_type"
            value={input.deposit_type}
            onChange={(e) =>
              setInput({ ...input, deposit_type: e.target.value as 'CURRENT' })
            }
          >
            <option value="CURRENT">Current</option>
            <option value="CASH">Cash</option>
            <option value="CREDIT">Credit</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Deposit;
