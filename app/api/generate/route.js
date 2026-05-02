import { openai } from "@/lib/openai";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt, userId } = await req.json();
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    if (userData?.usageCount >= 3 && !userData?.isPremium) {
      return NextResponse.json({ error: "Limit reached! Upgrade to Pro via Payoneer." }, { status: 403 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        { role: "system", content: "Convert text to JSON: { 'slides': [{ 'title': '', 'bullets': [] }] }. Max 5 slides, 40 words each." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
    });

    await updateDoc(userRef, { usageCount: increment(1) });
    return NextResponse.json(JSON.parse(response.choices[0].message.content).slides);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
