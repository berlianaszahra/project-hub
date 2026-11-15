import { handleAuth } from "@/features/auth/server/auth-route";

export function POST(request: Request) {
  return handleAuth(request, "login");
}
