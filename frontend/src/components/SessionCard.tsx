import { Button } from "@/components/ui/button";
import useDeleteSession from "../hooks/useDeleteSession";
import { Session } from "../hooks/useSessions";
import { X } from "lucide-react"; // Using Lucide React's X icon instead of &times;

interface SessionCardProps {
  session: Session;
}

const SessionCard = ({ session }: SessionCardProps) => {
  const { _id, createdAt, userAgent, isCurrent } = session;
  const { deleteSession, isPending } = useDeleteSession(_id);

  return (
    <div className="flex rounded-md border p-3">
      <div className="flex-1">
        <p className="mb-1 text-sm font-bold">
          {new Date(createdAt).toLocaleString("en-US")}
          {isCurrent && " (current session)"}
        </p>
        <p className="text-xs text-muted-foreground">
          {userAgent}
        </p>
      </div>
      {!isCurrent && (
        <Button
          size="sm"
          variant="ghost"
          className="ml-4 self-center text-destructive"
          title="Delete Session"
          onClick={() => deleteSession()}
          disabled={isPending}
        >
          <X className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default SessionCard;