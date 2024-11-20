import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "../models/users-model";

export async function GET() {
  await connectDB();

  try {
    const users = await User.find({});
    return NextResponse.json({ data: users }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: `Failed to fetch User: ${e}` },
      { status: 500 }
    );
  }
}
