import { getTransactions } from "@/data/transactions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UsersRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const metadata = {
  title: "Dashboard | Transactions",
};

export default async function Page() {
  const [session, transactions] = await Promise.all([
    auth(),
    getTransactions(),
  ]);

  if (session?.user.role === UsersRole.USER) redirect("/");

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Subscription</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => {
          const { id, price, status, UserSubscription } = transaction;
          const { Subscription, User } = UserSubscription || {};
          const { title } = Subscription || {};
          const { firstName, lastName } = User || {};

          return (
            <TableRow key={id}>
              <TableCell>{status}</TableCell>
              <TableCell>{`${price} LEI`}</TableCell>
              <TableCell>{`${firstName} ${lastName}`}</TableCell>
              <TableCell>{title}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
