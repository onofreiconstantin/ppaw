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
import { ONE_DAY_IN_MS } from "@/utils/constants";
import Link from "next/link";
import { auth } from "@/auth";
import { getUser } from "@/data/users";
import { Users, UsersSubscriptions } from "@prisma/client";
import SignIn from "@/components/sign-in/sign-in";
import { getActiveSubscription } from "@/data/user-subscriptions";
import { getPaymentType } from "@/utils/payments";
import PageContainer from "@/components/page-container/page-container";
import PageTitle from "@/components/page-title/page-title";

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
    <PageContainer>
      <PageTitle>Subscriptions</PageTitle>
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

            const paymentType = getPaymentType(
              subscription,
              activeSubscription,
            );

            return (
              <TableRow key={id}>
                <TableCell>{title}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{`${Number(Number(time) / ONE_DAY_IN_MS).toFixed(2)} days`}</TableCell>
                <TableCell>{`${price} RON`}</TableCell>
                <TableCell>
                  {session?.user && user.isCompleted ? (
                    paymentType ? (
                      <Link href={`/purchase/${id}`}>
                        <Button variant="outline">{paymentType}</Button>
                      </Link>
                    ) : null
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
    </PageContainer>
  );
}
