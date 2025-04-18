import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { login } from "@/lib/api"

const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const redirectUrl = location.state?.redirectUrl || "/"

  const {
    mutate: signIn,
    isPending,
    isError,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate(redirectUrl, { 
        replace: true 
      })
    },
  })

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-md px-6 py-12 text-center">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-4xl">Sign in to your account</CardTitle>
          </CardHeader>
          <CardContent>
            {isError && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>Invalid email or password</AlertDescription>
              </Alert>
            )}
            <div className="space-y-4">
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
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && signIn({ email, password })
                  }
                />
              </div>
              <div className="text-right">
                <Link
                  to="/password/forgot"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                className="w-full"
                disabled={!email || password.length < 6 || isPending}
                onClick={() => signIn({ email, password })}
              >
                {isPending ? "Signing in..." : "Sign in"}
              </Button>
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login