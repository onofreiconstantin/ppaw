import { getSubscriptions } from "@/data/subscriptions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ONE_DAY_IN_MS } from "@/lib/constants";
import Link from "next/link";
import { auth } from "@/auth";
import { getUser } from "@/data/users";
import { Users, UsersSubscriptions } from "@prisma/client";
import SignIn from "@/components/sign-in/sign-in";
import { getActiveSubscription } from "@/data/user-subscriptions";

export const metadata = {
  title: "Subscriptions",
};

export default async function Page() {
  const [subscriptions, session] = await Promise.all([
    getSubscriptions(),
    auth(),
  ]);

  let user: Users,
    activeSubscription: UsersSubscriptions | null = null;

  if (session?.user?.id)
    [user, activeSubscription] = await Promise.all([
      getUser(session.user.id),
      getActiveSubscription(session.user.id),
    ]);

  return (
    <div className="flex flex-col gap-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Price</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map((subscription) => {
            const { id, title, type, time, price } = subscription;

            const purchase =
              type === "TICKET" ||
              (type === "SUBSCRIPTION" && !activeSubscription);

            const renewOrUpgrade =
              type === "SUBSCRIPTION" &&
              activeSubscription &&
              new Date(activeSubscription?.expiresAt).setHours(0, 0, 0, 0) <
                new Date().setHours(0, 0, 0, 0) + Number(time);

            return (
              <TableRow key={id}>
                <TableCell>{title}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{`${Number(Number(time) / ONE_DAY_IN_MS).toFixed(2)} days`}</TableCell>
                <TableCell>{`${price} RON`}</TableCell>
                <TableCell>
                  {session?.user && user.isCompleted ? (
                    purchase || renewOrUpgrade ? (
                      <Link href={`/purchase/${id}`}>
                        <Button variant="outline">
                          {purchase
                            ? "Purchase"
                            : activeSubscription &&
                                activeSubscription.subscriptionId === id
                              ? "Renew"
                              : "Upgrade"}
                        </Button>
                      </Link>
                    ) : (
                      "You can't buy this subscription"
                    )
                  ) : !session?.user ? (
                    <SignIn />
                  ) : (
                    <Link href={"account/edit"}>
                      <Button variant="outline">
                        Finalize account creation
                      </Button>
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
