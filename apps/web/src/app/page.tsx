import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      NEXT_PUBLIC_APP_ENV:{JSON.stringify(process.env.NEXT_PUBLIC_APP_ENV)}
      <br />
      <Image src="/cat.jpg" width={900} height={650} alt="cat" />
    </main>
  );
}
