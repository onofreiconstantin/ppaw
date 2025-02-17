import { getSubscriptions } from "@data/subscriptions";
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
import { remove } from "@/actions/subscriptions";
import { auth } from "@/auth";
import { UsersRole } from "@prisma/client";
import { redirect } from "next/navigation";
import PageContainer from "@/components/page-container/page-container";
import PageTitle from "@/components/page-title/page-title";
import { Input } from "@/components/ui/input";
import Form from "@/components/form/form";
import FormButton from "@/components/form-button/form-button";

export const metadata = {
  title: "Dashboard | Subscriptions",
};

export default async function Page() {
  const [session, subscriptions] = await Promise.all([
    auth(),
    getSubscriptions(),
  ]);

  if (session?.user && session?.user.role === UsersRole.USER) redirect("/");

  return (
    <PageContainer>
      <PageTitle>Create subscription</PageTitle>
      <Link href={"/dashboard/subscriptions/create"}>
        <Button variant="outline">Create new</Button>
      </Link>
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
                <TableCell>{`${Number(Number(time) / ONE_DAY_IN_MS).toFixed(2)} days`}</TableCell>
                <TableCell>{`${price} RON`}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/subscriptions/${id}`}>
                      <Button variant="outline">Details</Button>
                    </Link>
                    <Link href={`/dashboard/subscriptions/${id}/edit`}>
                      <Button variant="outline">Edit</Button>
                    </Link>
                    <Form action={remove}>
                      <Input name="id" type="hidden" defaultValue={id} />
                      <FormButton variant="outline">Delete</FormButton>
                    </Form>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </PageContainer>
  );
}
