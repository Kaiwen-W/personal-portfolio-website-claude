import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative z-10 mx-auto max-w-xl px-6 py-24 sm:px-8">
      <h1 className="arc-display text-3xl font-extrabold">Page not found</h1>
      <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
        That page doesn&rsquo;t exist — it may have been moved or renamed.
      </p>
      <div className="mt-6">
        <a href="#/" className="arc-back">
          <ArrowLeft size={15} strokeWidth={2.5} /> Back to home
        </a>
      </div>
    </main>
  );
}
