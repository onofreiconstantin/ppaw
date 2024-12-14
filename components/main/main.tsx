import React, { ReactNode } from "react";

export default function Main({ children }: { children: ReactNode }) {
  return <main className="flex flex-1">{children}</main>;
}
