import PageContainer from "@/components/page-container/page-container";
import PageTitle from "@/components/page-title/page-title";

export const metadata = {
  title: "Purchase Success",
};

export default function Page() {
  return (
    <PageContainer>
      <PageTitle>Purchase Success!</PageTitle>
      <p className="text-green-500">The purchase has been completed!</p>
    </PageContainer>
  );
}
