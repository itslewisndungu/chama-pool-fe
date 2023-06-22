import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"flex flex-row"}>
      <AdminSidebar />

      <main className={"m-8 flex-1"}>{children}</main>
    </div>
  );
}
