"use client";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const handleLogout = () => signOut(auth).then(() => router.push("/login"));

  return (
    <nav className="flex justify-between items-center p-5 bg-white border-b sticky top-0 z-50">
      <Link href="/" className="text-xl font-black text-blue-600">AUTOSLIDES AI</Link>
      <div className="flex gap-6 items-center">
        <Link href="/dashboard" className="text-sm font-medium hover:text-blue-600">Dashboard</Link>
        <Link href="/dashboard/upgrade" className="text-sm font-bold text-orange-500">Go Pro</Link>
        <button onClick={handleLogout} className="text-sm text-red-500 font-medium">Logout</button>
      </div>
    </nav>
  );
}
