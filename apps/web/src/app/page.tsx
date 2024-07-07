export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Public_APP_ENV:{JSON.stringify(process.env.PUBLIC_APP_ENV)}
    </main>
  );
}
