import { notFound } from "next/navigation";
import { getUser } from "@/lib/data/users";
import { getDictionary } from "@/lib/i18n";
import DashboardView from "@/components/dashboard/DashboardView";

interface Props {
  params: Promise<{ username: string }>;
}

export default async function EnglishUserDashboard({ params }: Props) {
  const { username } = await params;
  const user = getUser(username);

  if (!user) notFound();

  const dict = getDictionary("en");

  return <DashboardView user={user} username={username} dict={dict} locale="en" />;
}
