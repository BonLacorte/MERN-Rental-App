// import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useQuery, } from "@tanstack/react-query";
import { getSessions } from "@/lib/api";

export const SESSIONS = "sessions";

// Define the Session interface based on your backend model
export interface Session {
  _id: string;
  userAgent?: string;
  createdAt: string;
  isCurrent?: boolean;
}

// Define the response type from the API
// interface SessionsResponse {
//   data: Session[];
// }

const useSessions = (opts= {}) => {
  const { data:sessions = [], ...rest } = useQuery({
    queryKey: [SESSIONS],
    queryFn: getSessions,
    ...opts,
  });

  return { 
    sessions, 
    ...rest 
  };
};

export default useSessions;