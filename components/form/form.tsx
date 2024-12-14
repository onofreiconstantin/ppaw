"use client";

import { useToast } from "@/hooks/use-toast";
import React, { useActionState, useEffect } from "react";

export default function Form({
  children,
  action,
  ...props
}: {
  action: (
    prevState:
      | {
          error?: string | Record<string, string[]>;
          currentData?: Record<string, unknown>;
        }
      | undefined,
    formData: FormData,
  ) => Promise<
    | {
        error: string | Record<string, string[]>;
        currentData?: Record<string, unknown>;
      }
    | undefined
  >;
} & Omit<React.FormHTMLAttributes<HTMLFormElement>, "action">) {
  const [state, formAction] = useActionState(action, undefined);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.error)
      toast({
        title: "Error",
        description:
          typeof state.error === "string"
            ? state.error
            : Object.values(state.error).flat().join(", "),
        variant: "destructive",
      });
  }, [state]);

  return (
    <form {...props} action={formAction}>
      {children}
    </form>
  );
}
