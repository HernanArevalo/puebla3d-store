import { Footer, Sidebar, TopMenu } from "@/components";

export default function ShopLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-puebla-blue bg-opacity-50">
      <TopMenu />
      <Sidebar />
      <div className="px-5 sm:px-10">
        {children}
      </div>
      <Footer />
    </main>
  );
}