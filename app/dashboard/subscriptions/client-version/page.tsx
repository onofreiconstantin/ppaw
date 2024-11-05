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
import { ONE_DAY_IN_MS } from "@/lib/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/subscriptions");
      const data = await res.json();
      setSubscriptions(data);
    })();
  }, []);

  return (
    <div className="flex flex-col gap-8">
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
                <TableCell>{`${Number(time / ONE_DAY_IN_MS).toFixed(2)} days`}</TableCell>
                <TableCell>{`${price} LEI`}</TableCell>
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
    </div>
  );
}