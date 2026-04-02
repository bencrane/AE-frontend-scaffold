import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between mx-auto px-4 md:px-6">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2 pb-1">
            <span className="font-heading font-bold sm:inline-block text-2xl tracking-tight">
              AccountExecutive<span className="text-primary">.com</span>
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className="flex items-center text-sm font-medium text-foreground transition-colors"
            >
              Role Exchange
            </Link>
            <Link
              href="/insights"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Insights
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground hidden sm:block"
          >
            Sign In
          </Link>
          <Button variant="outline" className="hidden sm:flex rounded-none text-foreground/80 hover:text-foreground">
            For Candidates
          </Button>
          <Button className="rounded-none">
            <Lock className="mr-2 h-4 w-4" />
            Unlock Talent
          </Button>
        </div>
      </div>
    </header>
  );
}
