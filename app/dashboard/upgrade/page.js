"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import Navbar from "@/components/Navbar";

export default function Upgrade() {
  const [tid, setTid] = useState("");
  const [sent, setSent] = useState(false);

  const submit = async () => {
    await fetch("/api/premium/request", {
      method: "POST",
      body: JSON.stringify({ userId: auth.currentUser.uid, transactionId: tid }),
    });
    setSent(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-md mx-auto mt-20 p-8 border rounded-3xl text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Go Pro with Payoneer</h2>
        <p className="mb-4">Send $10 to: <strong>{process.env.NEXT_PUBLIC_PAYONEER_EMAIL}</strong></p>
        <input 
          className="w-full p-3 border rounded mb-4" 
          placeholder="Transaction ID" 
          onChange={(e) => setTid(e.target.value)} 
        />
        <button onClick={submit} className="w-full bg-black text-white p-3 rounded-xl font-bold">
          {sent ? "Submitted!" : "Verify Payment"}
        </button>
      </div>
    </div>
  );
}
