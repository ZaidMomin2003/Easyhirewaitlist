import { WaitlistForm } from "@/components/waitlist-form";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-background overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0%, transparent 40%), radial-gradient(circle at 75% 75%, hsl(var(--accent)) 0%, transparent 40%)`}} />
      <div className="z-10">
        <WaitlistForm />
      </div>
    </main>
  );
}
