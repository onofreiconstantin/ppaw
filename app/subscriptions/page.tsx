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
import { Users } from "@prisma/client";
import SignIn from "@/components/sign-in/sign-in";

export const metadata = {
  title: "Subscriptions",
};

export default async function Page() {
  const [subscriptions, session] = await Promise.all([
    getSubscriptions(),
    auth(),
  ]);

  let user: Users;
  if (session?.user?.id) user = await getUser(session.user.id);

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

            return (
              <TableRow key={id}>
                <TableCell>{title}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{`${Number(time / ONE_DAY_IN_MS).toFixed(2)} days`}</TableCell>
                <TableCell>{`${price} LEI`}</TableCell>
                <TableCell>
                  {session?.user && user.isCompleted ? (
                    <Link href={`/purchase/${id}`}>
                      <Button variant="outline">Purchase</Button>
                    </Link>
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
