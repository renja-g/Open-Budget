import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      if (sessionStatus === "unauthenticated") {
        // Centered toast
        toast.error("You must be signed in to view this page", {
          position: "top-center",
        });

        await router.push("/");
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

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <p>Hello {session.user.name}!</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Dashboard;
