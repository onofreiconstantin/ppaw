import { auth } from "@/auth";
import PageContainer from "@/components/page-container/page-container";
import PageTitle from "@/components/page-title/page-title";
import PurchaseForm from "@/components/purchase-form/purchase-form";
import { getSubscriptions } from "@/data/subscriptions";
import { getActiveSubscription } from "@/data/user-subscriptions";

export const metadata = {
  title: "Purchase Subscription",
};

export default async function Page({
  params,
}: {
  params: Promise<{ routes: string[] }>;
}) {
  const [subscriptions, session, { routes }] = await Promise.all([
    getSubscriptions(),
    auth(),
    params,
  ]);

  if (!session?.user?.id) throw Error("You should not be on this page!");

  const activeSubscription = await getActiveSubscription(session.user.id);

  const id = Array.isArray(routes) ? routes.at(0) : undefined;

  return (
    <PageContainer>
      <PageTitle>Purchase subscription</PageTitle>
      <PurchaseForm
        id={id}
        subscriptions={subscriptions}
        activeSubscription={activeSubscription}
      />
    </PageContainer>
  );
}
