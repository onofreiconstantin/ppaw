"use client";

import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import LoadingSpinner from "@/components/loading-spinner/loading-spinner";

export default function FormButton({
  children,
  disabled,
  ...props
}: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={disabled || pending} {...props}>
      {pending ? <LoadingSpinner /> : children}
    </Button>
  );
}
