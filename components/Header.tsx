
'use client';

export default function Header({ title }: { title?: string }) {
  return (
    <header className="fixed top-0 w-full bg-blue-600 text-white z-50 px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-center md:justify-between">
        <h1 className="text-lg font-semibold">{title || "CityReport"}</h1>
        <div className="hidden md:flex items-center space-x-4 text-sm">
          <span>Signalement Citoyen</span>
        </div>
      </div>
    </header>
  );
}
