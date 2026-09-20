
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07121f] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <Image
          src="/images/coming-soon-hero.png"
          alt="EcoMicroVerse Coming Soon"
          width={1400}
          height={2200}
          className="w-full h-auto rounded-3xl shadow-2xl"
          priority
        />
      </div>
    </main>
  );
}