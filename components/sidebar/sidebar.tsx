import React, { ReactNode } from "react";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/utils/cn";

export default function Sidebar({
  children,
  items,
}: {
  children: ReactNode;
  items: {
    href: string;
    label: string;
  }[];
}) {
  return (
    <div className="flex flex-1 gap-8">
      <div className="bg-zinc-500 p-4">
        <NavigationMenu className="items-stretch">
          <NavigationMenuList className="flex-col items-start gap-2">
            {items.map((item) => {
              const { href, label } = item;

              return (
                <Link key={href} href={href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), "!ml-0 w-full")}
                  >
                    {label}
                  </NavigationMenuLink>
                </Link>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
