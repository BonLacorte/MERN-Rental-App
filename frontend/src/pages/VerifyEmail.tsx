import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import Spinner from "@/components/ui/spinner"; // Assuming shadcn provides a Spinner component
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // shadcn Alert component
import { CheckCircle, AlertCircle } from "lucide-react"; // Icons for success/error states
import { verifyEmail } from "@/lib/api";


const VerifyEmail = () => {
  const { code } = useParams<{ code: string }>();
  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmail(code!),
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-md space-y-6 rounded-lg border p-6 text-center">
        {isPending ? (
          <Spinner className="h-8 w-8" /> // Use shadcn Spinner with Tailwind classes
        ) : (
          <div className="space-y-4">
            <Alert variant={isSuccess ? "default" : "destructive"}>
              {isSuccess ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <AlertTitle>
                {isSuccess ? "Email Verified!" : "Invalid Link"}
              </AlertTitle>
              {isError && (
                <AlertDescription>
                  The link is either invalid or expired.{" "}
                  <Link
                    to="/password/forgot"
                    className="font-medium text-primary underline"
                  >
                    Get a new link
                  </Link>
                </AlertDescription>
              )}
            </Alert>
            <Link
              to="/"
              className="inline-block text-sm font-medium text-primary underline"
            >
              Back to home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
