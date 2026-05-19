import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh flex flex-col bg-surface">
      <div className="flex items-center justify-center pt-12 pb-6">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-2xl font-bold text-primary">APPetit</span>
          <span className="text-2xl font-bold text-accent">+</span>
        </Link>
      </div>
      <div className="flex-1 flex flex-col px-6 pb-8 max-w-md mx-auto w-full">
        {children}
      </div>
    </div>
  );
}
