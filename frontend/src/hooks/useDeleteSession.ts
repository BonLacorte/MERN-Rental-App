import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSession } from "../lib/api";
import { SESSIONS } from "./useSessions";

// Define the Session type based on your backend model
export interface Session {
  _id: string;
  userAgent?: string;
  createdAt: string;
  isCurrent?: boolean;
}

const useDeleteSession = (sessionId: string) => {
  const queryClient = useQueryClient();
  
  const { mutate, ...rest } = useMutation({
    mutationFn: () => deleteSession(sessionId),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: [SESSIONS] });
      queryClient.setQueryData<Session[]>([SESSIONS], (cache) => 
        cache ? cache.filter((session) => session._id !== sessionId) : []
      );
    },
  });

  return { deleteSession: mutate, ...rest };
};

export default useDeleteSession;