import MeetingsHeader from "./MeetingsHeader";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MeetingsList } from "@/components/meetings/meetings-list";
import { getMeetings } from "@/lib/api/utils";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  const meetings = await getMeetings(session.accessToken);

  return (
    <section className="grid gap-4">
      <MeetingsHeader token={session.accessToken} />
      <MeetingsList meetings={meetings} />
    </section>
  );
}
