import { Sidebar } from '@/components/layout/Sidebar';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={"flex gap-4"}>
      <Sidebar />

      <main>
        {children}
      </main>
    </div>
  );
}