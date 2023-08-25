import { MemberSidebar } from "@/components/layout/member-sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"flex flex-row"}>
      <MemberSidebar />

      <main className={"m-8 flex-1"}>{children}</main>
    </div>
  );
}
