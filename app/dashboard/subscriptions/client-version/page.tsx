"use client";

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
import { useEffect, useState } from "react";
import PageContainer from "@/components/page-container/page-container";
import PageTitle from "@/components/page-title/page-title";
import LoadingSpinner from "@/components/loading-spinner/loading-spinner";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/subscriptions");
      const data = await res.json();
      setSubscriptions(data);
      setLoading(false);
    })();
  }, []);

  return (
    <PageContainer>
      <PageTitle>Subscriptions - Client version</PageTitle>
      <Link href={"/dashboard/subscriptions/create"}>
        <Button variant="outline">Create new</Button>
      </Link>
      {loading ? (
        <LoadingSpinner />
      ) : (
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
                  <TableCell>{`${Number(time / ONE_DAY_IN_MS).toFixed(2)} days`}</TableCell>
                  <TableCell>{`${price} RON`}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`/dashboard/subscriptions/${id}/edit`}>
                        <Button variant="outline">Edit</Button>
                      </Link>
                      <Link href={`/dashboard/subscriptions/${id}`}>
                        <Button variant="outline">Details</Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </PageContainer>
  );
}
