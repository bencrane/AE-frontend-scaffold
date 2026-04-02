import { ReactNode } from "react";
import { CompanySidebar } from "@/components/company/CompanySidebar";

export default function CompanyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <CompanySidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {children}
      </main>
    </div>
  );
}
