import { redirect } from "next/navigation";
import HomeClient from "./HomeClient";

export default function RootPage() {
  const isAdminRoot = process.env.NEXT_PUBLIC_ADMIN_APP === "true";

  if (isAdminRoot) {
    redirect("/admin");
  }

  return <HomeClient />;
}
