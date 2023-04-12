import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Deposit = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = () => {
      if (sessionStatus === "unauthenticated") {
        // Centered toast
        toast.error("You must be signed in to view this page", {
          position: "top-center",
        });
        router.push("/").catch((error) => {
          console.error(error);
        });
      }
    };

    checkAuthentication();
  }, [sessionStatus, router]);

  if (sessionStatus === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return null;
  }

  return (
    <div>
      <h1>Welcome to the Deposit!</h1>
    </div>
  );
};

export default Deposit;
