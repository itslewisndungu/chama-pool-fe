import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

type Params = {
  params: {
    meetingId: number;
  };
};

export default async function MeetingInfoPage({ params }: Params) {
  const session = getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  return redirect(`/member/meetings/${params.meetingId}/attendance`);
}
