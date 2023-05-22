import { Sidebar } from '@/components/layout/Sidebar';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={'flex flex-row'}>
      <Sidebar />

      <main className={'m-8 flex-1'}>{children}</main>
    </div>
  );
}
