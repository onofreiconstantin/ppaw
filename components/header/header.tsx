import React, { ReactNode } from "react";

export default function Header({ children }: { children: ReactNode }) {
  return <header className="bg-black p-4">{children}</header>;
}
