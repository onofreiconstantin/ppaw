import { LoaderCircle } from "lucide-react";
import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="mx-auto items-center justify-center">
      <LoaderCircle className="h-12 w-12 animate-spin" />
    </div>
  );
}
