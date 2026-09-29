import type { ReactNode } from "react";

import { PublicHeader } from "../../components/layout/PublicHeader";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#06101d] text-slate-100">
      <PublicHeader />
      <main>{children}</main>
    </div>
  );
}
