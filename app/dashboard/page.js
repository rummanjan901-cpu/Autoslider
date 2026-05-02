"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import SlideCard from "@/components/SlideCard";
import pptxgen from "pptxgenjs";

export default function Dashboard() {
  const [text, setText] = useState("");
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [theme, setTheme] = useState("light");

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ prompt: text, userId: auth.currentUser?.uid }),
    });
    const data = await res.json();
    if (data.error) alert(data.error);
    else setSlides(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-10">
        <textarea 
          className="w-full h-40 p-4 rounded-2xl border focus:ring-2 ring-blue-500 outline-none"
          placeholder="Paste notes here..."
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-between mt-4">
          <select onChange={(e) => setTheme(e.target.value)} className="p-2 border rounded-lg">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="gradient">Gradient</option>
          </select>
          <button onClick={handleGenerate} className="bg-blue-600 text-white px-8 py-2 rounded-xl font-bold">
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {slides.length > 0 && (
          <div className="mt-10 flex flex-col items-center">
            <SlideCard slide={slides[index]} theme={theme} />
            <div className="flex gap-4 mt-6">
              <button onClick={() => setIndex(Math.max(0, index-1))} className="px-4 py-2 border rounded-lg">Prev</button>
              <button onClick={() => setIndex(Math.min(slides.length-1, index+1))} className="px-4 py-2 border rounded-lg">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
