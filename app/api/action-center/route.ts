import { getUnifiedActionCenterData } from "@/actions/get-unified-action-center-data";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const ids = searchParams.get("ids");

  if (!ids) {
    return NextResponse.json({ error: "IDs requis" }, { status: 400 });
  }

  const cookiesStore = await cookies();
  const sessionId = cookiesStore.get("sessionId")?.value;

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID requis" }, { status: 400 });
  }

  const arrayIds = ids.split(",");
  const data = await getUnifiedActionCenterData(sessionId, arrayIds);

  return NextResponse.json(data);
}
