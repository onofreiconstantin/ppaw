import { auth } from "@/auth";
import PageContainer from "@/components/page-container/page-container";
import PageTitle from "@/components/page-title/page-title";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserSubscriptions } from "@/data/user-subscriptions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import QRCode from "qrcode";

export const metadata = {
  title: "Account | Subscriptions",
};

export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) throw Error("You should not be on this page");

  const userSubscriptions = await getUserSubscriptions(session.user.id);

  return (
    <PageContainer>
      <PageTitle>Subscriptions</PageTitle>
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
          {userSubscriptions.map(async (subscription) => {
            const {
              id,
              createdAt,
              expiresAt,
              status,
              transactionId,
              Subscription,
            } = subscription;
            const { type, title } = Subscription;
            const qrCode = await QRCode.toDataURL(transactionId);

            return (
              <TableRow key={id}>
                <TableCell>{title}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{new Date(expiresAt).toDateString()}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>{new Date(createdAt).toDateString()}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View QR Code</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>QR Code</DialogTitle>
                      </DialogHeader>
                      <Image
                        width={400}
                        height={400}
                        src={qrCode}
                        alt="Error loading the QR Code!"
                      />
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </PageContainer>
  );
}
