import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId, transactionId } = await req.json();
  await setDoc(doc(db, "payment_requests", transactionId), {
    userId, status: "pending", timestamp: serverTimestamp(), method: "Payoneer"
  });
  return NextResponse.json({ success: true });
}
