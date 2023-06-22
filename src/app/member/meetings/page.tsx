import MeetingsHeader from "./MeetingsHeader";
import MeetingsList from "./MeetingsList";

export default function Page() {
  return (
    <section className="grid gap-4">
      <MeetingsHeader />
      <MeetingsList />
    </section>
  );
}
