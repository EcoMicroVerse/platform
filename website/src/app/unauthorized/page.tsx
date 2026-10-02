import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07121f] px-6 text-white">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0b1a2a] p-8 text-center">
        <div className="mb-4 text-sm font-medium uppercase tracking-wider text-teal-300">
          EcoMicroVerse
        </div>

        <h1 className="text-3xl font-semibold">
          Access restricted
        </h1>

        <p className="mt-4 text-slate-300">
          Your account is authenticated, but it does not currently have
          permission to access this workspace.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex rounded-xl bg-teal-400 px-5 py-3 font-medium text-slate-950 transition hover:bg-teal-300"
          >
            Return to EcoMicroVerse
          </Link>
        </div>
      </div>
    </main>
  );
}
