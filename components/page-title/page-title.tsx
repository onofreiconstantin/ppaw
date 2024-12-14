import React, { ReactNode } from "react";

export default function PageTitle({ children }: { children: ReactNode }) {
  return <h1 className="text-3xl">{children}</h1>;
}
