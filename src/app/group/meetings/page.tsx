import MeetingsHeader from "./MeetingsHeader";
import MeetingsList from "./MeetingsList";
import { Meeting, MeetingCategory } from "@/types/meetings";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

const mockMeetings: Meeting[] = [
  {
    agenda: "Monthly meeting",
    title: "Monthly meeting",
    date: new Date("12-10-2021"),
    id: 1,
    category: MeetingCategory.MONTHLY_MEETING,
  },
  {
    agenda: "Contribute to funeral",
    title: "Monthly meeting",
    date: new Date("12-10-2021"),
    id: 2,
    category: MeetingCategory.WELFARE,
  },
  {
    agenda: "Monthly meeting",
    date: new Date("12-10-2021"),
    title: "Monthly meeting",
    id: 3,
    category: MeetingCategory.MONTHLY_MEETING,
  },
  {
    agenda: "Monthly meeting",
    title: "Monthly meeting",
    date: new Date("12-10-2024"),
    id: 4,
    category: MeetingCategory.MONTHLY_MEETING,
  },
  {
    agenda: "Emergency meeting",
    title: "Monthly meeting",
    date: new Date("12-10-2024"),
    id: 5,
    category: MeetingCategory.EMERGENCY,
  },
  {
    agenda: "Monthly meeting",
    title: "Monthly meeting",
    date: new Date("12-10-2021"),
    id: 6,
    category: MeetingCategory.MONTHLY_MEETING,
  },
];

const mockGetMeeting = async () => {
  return new Promise<Meeting[]>(resolve => {
    setTimeout(() => {
      resolve(mockMeetings);
    }, 1000);
  });
};

const getMeetings = async (token: string) => {
  const req = new Request(`http://localhost:8080/meetings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as Meeting[];
};

export default async function Page() {
  // const meetings = await mockGetMeeting();
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  const meetings = await getMeetings(session.accessToken);

  return (
    <section className="grid gap-4">
      <MeetingsHeader />
      <MeetingsList meetings={meetings} />
    </section>
  );
}
