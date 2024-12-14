import PageContainer from "@/components/page-container/page-container";
import PageTitle from "@/components/page-title/page-title";

export const metadata = {
  title: "Purchase Canceled",
};

export default function Page() {
  return (
    <PageContainer>
      <PageTitle>Purchase Canceled!</PageTitle>
      <p className="text-red-500">The purchase has been canceled!</p>
    </PageContainer>
  );
}
