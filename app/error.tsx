"use client";

import PageContainer from "@/components/page-container/page-container";
import PageTitle from "@/components/page-title/page-title";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <PageContainer>
      <PageTitle>An error occurred</PageTitle>
      <p className="text-red-500">{error.message}</p>
    </PageContainer>
  );
}
