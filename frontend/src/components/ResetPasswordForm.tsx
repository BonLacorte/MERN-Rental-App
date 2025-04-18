import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/lib/api";
import { CheckCircle, AlertCircle } from "lucide-react";

interface ResetPasswordFormProps {
  code: string;
}

const ResetPasswordForm = ({ code }: ResetPasswordFormProps) => {
  const [password, setPassword] = useState("");

  const {
    mutate: resetUserPassword,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: resetPassword,
  });

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">Change your password</h1>
      <Card className="bg-background shadow-lg">
        <CardContent className="p-8">
          {isError && (
            <Alert variant="destructive" className="mb-3">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error.message || "An error occurred"}
              </AlertDescription>
            </Alert>
          )}
          
          {isSuccess ? (
            <div className="space-y-4">
              <Alert variant="default" className="mb-3">
                <CheckCircle className="h-5 w-5" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Password updated successfully!
                </AlertDescription>
              </Alert>
              <Link 
                to="/login" 
                replace 
                className="font-medium text-primary underline"
              >
                Sign in
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    password.length >= 6 &&
                    resetUserPassword({ password, verificationCode: code })
                  }
                  autoFocus
                />
                <p className="text-xs text-muted-foreground">
                  Must be at least 6 characters long
                </p>
              </div>
              
              <Button
                className="w-full"
                disabled={password.length < 6 || isPending}
                onClick={() =>
                  resetUserPassword({
                    password,
                    verificationCode: code,
                  })
                }
              >
                {isPending ? "Resetting..." : "Reset Password"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ResetPasswordForm;