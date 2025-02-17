import { auth } from "@/auth";
import PageContainer from "@/components/page-container/page-container";
import PageTitle from "@/components/page-title/page-title";
import { Button } from "@/components/ui/button";
import { getSubscription } from "@/data/subscriptions";
import { ONE_DAY_IN_MS } from "@/utils/constants";
import { UsersRole } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const subscription = await getSubscription(id);
  const { title, description } = subscription;

  return {
    title: `Dashboard | Subscriptions | ${title}`,
    description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [session, { id }] = await Promise.all([auth(), params]);
  if (session?.user && session?.user.role === UsersRole.USER) redirect("/");

  const subscription = await getSubscription(id);
  const { title, type, description, time, price } = subscription;

  return (
    <PageContainer>
      <PageTitle>Subscription details</PageTitle>
      <div className="flex flex-col gap-2">
        <p>{`Title: ${title}`}</p>
        <p>{`Description: ${description}`}</p>
        <p>{`Type: ${type}`}</p>
        <p>{`Time: ${Number(Number(time) / ONE_DAY_IN_MS).toFixed(2)} days`}</p>
        <p>{`Price: ${price} RON`}</p>
      </div>
      <div className="flex gap-2">
        <Link href={`/dashboard/subscriptions/${id}/edit`}>
          <Button variant="outline">Edit</Button>
        </Link>
        <Link href={`/dashboard/subscriptions`}>
          <Button variant="outline">Back to list</Button>
        </Link>
      </div>
    </PageContainer>
  );
}
