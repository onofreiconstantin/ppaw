import { auth } from "@/auth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserSubscriptions } from "@/data/user-subscriptions";

export const metadata = {
  title: "Account | Subscriptions",
};

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) throw Error("You should not be on this page");

  const userSubscriptions = await getUserSubscriptions(session.user.id);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Expires at</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {userSubscriptions.map((subscription) => {
          const { id, createdAt, expiresAt, status, Subscription } =
            subscription;
          const { type, title } = Subscription;

          return (
            <TableRow key={id}>
              <TableCell>{title}</TableCell>
              <TableCell>{type}</TableCell>
              <TableCell>{new Date(expiresAt).toDateString()}</TableCell>
              <TableCell>{status}</TableCell>
              <TableCell>{new Date(createdAt).toDateString()}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
