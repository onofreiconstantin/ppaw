import PageContainer from "@/components/page-container/page-container";
import PageTitle from "@/components/page-title/page-title";

export default function NotFound() {
  return (
    <PageContainer>
      <PageTitle>Not found</PageTitle>
      <p className="text-orange-500">No entity was found!</p>
    </PageContainer>
  );
}
