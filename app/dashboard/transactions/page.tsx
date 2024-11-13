import { getTransactions } from "@/data/transactions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata = {
  title: "Dashboard | Transactions",
};

export default async function Page() {
  const transactions = await getTransactions();

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
