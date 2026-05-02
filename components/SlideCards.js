export default function SlideCard({ slide, theme, customBg }) {
  const themes = {
    light: "bg-white text-slate-900 border shadow-xl",
    dark: "bg-neutral-900 text-purple-400 border border-purple-800 shadow-2xl",
    gradient: "bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl",
  };

  return (
    <div 
      style={customBg ? { backgroundImage: `url(${customBg})`, backgroundSize: 'cover' } : {}}
      className={`${themes[theme]} relative w-full aspect-video rounded-3xl p-10 flex flex-col justify-center overflow-hidden`}
    >
      {customBg && <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] z-0" />}
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-current pb-2 inline-block">{slide.title}</h2>
        <ul className="space-y-3">
          {slide.bullets.map((b, i) => (
            <li key={i} className="text-lg flex items-start gap-3">
              <span className="mt-2 w-2 h-2 rounded-full bg-current opacity-70" /> {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
