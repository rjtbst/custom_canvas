

export default function CreatePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="  flex justify-center items-start bg-warm-white">
     
      {children}
    </main>
  );
}
// 