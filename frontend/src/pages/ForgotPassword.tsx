import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "../lib/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // shadcn Alert component
import { Input } from "@/components/ui/input"; // shadcn Input component
import { Button } from "@/components/ui/button"; // shadcn Button component
import { Label } from "@/components/ui/label"; // shadcn Label component
import { CheckCircle, AlertCircle } from "lucide-react"; // Icons for success/error states

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const {
    mutate: sendPasswordReset,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: sendPasswordResetEmail,
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg border p-6 text-center">
        <h1 className="text-4xl font-bold mb-8">Reset your password</h1>
        <div className="rounded-lg bg-background shadow-lg p-8">
          {isError && (
            <Alert variant="destructive" className="mb-3">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error.message || "An error occurred"}
              </AlertDescription>
            </Alert>
          )}
          <div className="space-y-4">
            {isSuccess ? (
              <Alert variant="default">
                <CheckCircle className="h-5 w-5" />
                <AlertTitle>Email sent!</AlertTitle>
                <AlertDescription>
                  Check your inbox for further instructions.
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                </div>
                <Button
                  className="w-full"
                  disabled={!email || isPending}
                  onClick={() => sendPasswordReset(email)}
                >
                  Reset Password
                </Button>
              </>
            )}
            <p className="text-sm text-muted-foreground text-center">
              Go back to{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Sign in
              </Link>
              &nbsp;or&nbsp;
              <Link to="/register" className="font-medium text-primary underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;