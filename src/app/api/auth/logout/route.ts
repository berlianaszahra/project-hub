import type { NextRequest } from "next/server";

import { handleLogout } from "@/features/auth/server/auth-route";

export function POST(request: NextRequest) {
  return handleLogout(request);
}
