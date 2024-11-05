import { signOut } from "@/auth";
import { Button } from "@components/ui/button";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button type="submit">Signout with Google</Button>
    </form>
  );
}
