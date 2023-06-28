import MeetingsHeader from "./MeetingsHeader";
import MeetingsList from "./MeetingsList";
import { Meeting, MeetingCategory } from "@/types/meetings";

const mockMeetings: Meeting[] = [
  {
    agenda: "Monthly meeting",
    title: "Monthly meeting",
    date: new Date("12-10-2021"),
    id: 1,
    kind: MeetingCategory.MONTHLY_MEETING,
  },
  {
    agenda: "Contribute to funeral",
    title: "Monthly meeting",
    date: new Date("12-10-2021"),
    id: 2,
    kind: MeetingCategory.WELFARE,
  },
  {
    agenda: "Monthly meeting",
    date: new Date("12-10-2021"),
    title: "Monthly meeting",
    id: 3,
    kind: MeetingCategory.MONTHLY_MEETING,
  },
  {
    agenda: "Monthly meeting",
    title: "Monthly meeting",
    date: new Date("12-10-2024"),
    id: 4,
    kind: MeetingCategory.MONTHLY_MEETING,
  },
  {
    agenda: "Emergency meeting",
    title: "Monthly meeting",
    date: new Date("12-10-2024"),
    id: 5,
    kind: MeetingCategory.EMERGENCY,
  },
  {
    agenda: "Monthly meeting",
    title: "Monthly meeting",
    date: new Date("12-10-2021"),
    id: 6,
    kind: MeetingCategory.MONTHLY_MEETING,
  },
];

const getMeetings = async () => {
  return new Promise<Meeting[]>(resolve => {
    setTimeout(() => {
      resolve(mockMeetings);
    }, 1000);
  });
};

export default async function Page() {
  const meetings = await getMeetings();

  return (
    <section className="grid gap-4">
      <MeetingsHeader />
      <MeetingsList meetings={meetings} />
    </section>
  );
}
