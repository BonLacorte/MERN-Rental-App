import useAuth from "../hooks/useAuth";
import { Alert, AlertTitle } from "@/components/ui/alert"; // shadcn Alert component
import { AlertCircle } from "lucide-react"; // Icon for warning state

const Profile = () => {
  const { user } = useAuth();
  const { email, verified, createdAt } = user;

  return (
    <div className="mt-16 flex flex-col items-center">
      <h1 className="mb-4 text-2xl font-bold">My Account</h1>
      {!verified && (
        <Alert className="mb-3 w-fit rounded-lg">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>Please verify your email</AlertTitle>
        </Alert>
      )}
      <p className="mb-2 text-white">
        Email: <span className="text-gray-300">{email}</span>
      </p>
      <p className="text-white">
        Created on{" "}
        <span className="text-gray-300">
          {new Date(createdAt).toLocaleDateString("en-US")}
        </span>
      </p>
    </div>
  );
};

export default Profile;