import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import  Spinner  from "@/components/ui/spinner";
import UserMenu from "./UserMenu";

const AppContainer = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-[90vh] w-full flex-col items-center justify-center">
        <Spinner className="mb-4 h-8 w-8" />
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          redirectUrl: window.location.pathname,
        }}
      />
    );
  }

  return (
    <div className="min-h-screen p-4">
      <UserMenu />
      <Outlet />
    </div>
  );
};

export default AppContainer;