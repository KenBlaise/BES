import { isWorkbackStatus } from "@/lib/workback/progress";
import { loadWorkbackProgress, saveWorkbackProgress } from "@/lib/workback/store";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await loadWorkbackProgress();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to load workback progress." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as { id?: unknown; status?: unknown };
    if (typeof body.id !== "string" || typeof body.status !== "string" || !isWorkbackStatus(body.status)) {
      return NextResponse.json({ error: "A valid task id and status are required." }, { status: 400 });
    }

    const result = await saveWorkbackProgress(body.id, body.status);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to save workback progress." },
      { status: 500 },
    );
  }
}
