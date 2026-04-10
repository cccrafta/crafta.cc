import Header from "@/components/header";
import JournalHeaderNav from "@/components/journal-header-nav";

export default function JournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header>
        <JournalHeaderNav />
      </Header>
      <main
        className="mx-auto w-full px-6 py-8"
        style={{ maxWidth: "var(--content-max-width)", marginTop: "var(--header-height)" }}
      >
        {children}
      </main>
    </>
  );
}
