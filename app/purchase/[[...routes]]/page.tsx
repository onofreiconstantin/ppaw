import { auth } from "@/auth";
import PurchaseForm from "@/components/purchase-form/purchase-form";
import { getSubscriptions } from "@/data/subscriptions";

export const metadata = {
  title: "Purchase Subscription",
};

export default async function Page({
  params,
}: {
  params: { routes: string[] };
}) {
  const [subscriptions, session, { routes }] = await Promise.all([
    getSubscriptions(),
    auth(),
    params,
  ]);

  if (!session?.user?.id) throw new Error("You should not be on this page!");

  const id = Array.isArray(routes) ? routes.at(0) : undefined;

  return (
    <div className="flex flex-col gap-8">
      <h3>Purchase subscription</h3>
      <PurchaseForm
        id={id}
        userId={session?.user?.id}
        subscriptions={subscriptions}
      />
    </div>
  );
}
