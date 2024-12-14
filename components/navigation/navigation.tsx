import React from "react";
import SignOut from "@components/sing-out/sign-out";
import SignIn from "@components/sign-in/sign-in";
import { auth } from "@/auth";
import { UsersRole } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";

export default async function Navigation() {
  const session = await auth();

  return (
    <div className="flex items-center justify-between gap-2">
      <NavigationMenu>
        <NavigationMenuList className="gap-2">
          <Link href={"/"} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
          <Link href={"/subscriptions"} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Subscriptions
            </NavigationMenuLink>
          </Link>
          {session?.user && (
            <Link href={"/purchase"} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Purchase subscriptions
              </NavigationMenuLink>
            </Link>
          )}
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList className="gap-2">
          {session?.user ? (
            <>
              <Link href={"/account"} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={String(session.user.image)} />
                      <AvatarFallback>USER</AvatarFallback>
                    </Avatar>
                    Account
                  </div>
                </NavigationMenuLink>
              </Link>

              {session.user.role === UsersRole.ADMIN && (
                <Link href={"/dashboard"} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              )}
              <SignOut />
            </>
          ) : (
            <SignIn />
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
