import useSessions from "../hooks/useSessions";
import SessionCard from "../components/SessionCard";
import  Spinner  from "@/components/ui/spinner"; // Assuming shadcn provides a Spinner component
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // shadcn Alert component
import { AlertCircle } from "lucide-react"; // Icon for error state

const Settings = () => {
  const { sessions, isPending, isSuccess, isError } = useSessions();

  return (
    <div className="container mt-16">
      <h1 className="mb-6 text-2xl font-bold">My Sessions</h1>
      {isPending && <Spinner className="h-8 w-8" />} {/* Use shadcn Spinner with Tailwind classes */}
      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to get sessions.</AlertDescription>
        </Alert>
      )}
      {isSuccess && (
        <div className="space-y-3">
          {sessions.map((session) => (
            <SessionCard key={session._id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Settings;