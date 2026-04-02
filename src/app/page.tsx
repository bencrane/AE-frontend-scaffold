"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Rocket } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data } = useQuery({
    queryKey: ["ping"],
    queryFn: async () => {
      return "Tanstack Query works!";
    },
  });

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-8 text-center max-w-lg p-8 border border-zinc-200 rounded-2xl bg-white shadow-sm dark:bg-zinc-950 dark:border-zinc-800">
        <div className="p-4 bg-zinc-100 rounded-full dark:bg-zinc-900">
          <Rocket className="w-8 h-8 text-zinc-900 dark:text-zinc-100" />
        </div>
        
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Foundation Ready
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Next.js, Tailwind, shadcn/ui, Zustand, React Query, React Hook Form, and Zod are all installed and configured.
          </p>
        </div>

        <div className="text-xs font-mono px-3 py-1 rounded bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
          {data || "Loading..."}
        </div>

        <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800" />

        <Button 
          className="w-full"
          onClick={() => toast.success("Environment setup complete!", {
            description: "You're ready to start building your app."
          })}
        >
          Test Toast
        </Button>
      </main>
    </div>
  );
}
