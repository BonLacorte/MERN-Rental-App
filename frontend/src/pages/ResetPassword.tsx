import { useSearchParams, Link } from "react-router-dom";
import ResetPasswordForm from "../components/ResetPasswordForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // shadcn Alert component
import { AlertCircle } from "lucide-react"; // Icon for error state

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const exp = Number(searchParams.get("exp"));
  const now = Date.now();
  const linkIsValid = code && exp && exp > now;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg border p-6 text-center">
        {linkIsValid ? (
          <ResetPasswordForm code={code} />
        ) : (
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle>Invalid Link</AlertTitle>
              <AlertDescription>
                The link is either invalid or expired.
              </AlertDescription>
            </Alert>
            <Link
              to="/password/forgot"
              className="text-sm font-medium text-primary underline"
            >
              Request a new password reset link
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;