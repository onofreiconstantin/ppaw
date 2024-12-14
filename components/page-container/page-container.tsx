import React, { ReactNode } from "react";

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-7xl flex-1 flex-col gap-8 p-8">
      {children}
    </div>
  );
}
