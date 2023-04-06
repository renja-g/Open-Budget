import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Dashboard = () => {
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

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
      .then(() => {
        toast.success("Signed out successfully", {
          position: "top-center",
        });
      })
      .catch((error) => {
        console.error(error);
      });
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
