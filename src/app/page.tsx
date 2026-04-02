import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="max-w-md w-full space-y-8 p-8 border border-border bg-card">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight">Login Portal</h1>
          <p className="text-muted-foreground mt-2 font-mono text-xs uppercase tracking-widest">Prototype Gate</p>
        </div>
        
        <div className="space-y-4 mt-8">
          <Link href="/company" className="block w-full text-center p-4 bg-primary text-primary-foreground font-semibold hover:bg-emerald-600 transition-colors">
            Login as Company
          </Link>
          <Link href="/candidate" className="block w-full text-center p-4 border border-border text-foreground font-semibold hover:bg-secondary/50 transition-colors cursor-not-allowed opacity-50">
            Login as Candidate (WIP)
          </Link>
        </div>
      </div>
    </div>
  );
}
