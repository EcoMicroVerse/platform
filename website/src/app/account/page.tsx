import { redirect } from "next/navigation";
import {
  Shield,
  UserCircle,
  BriefcaseBusiness,
} from "lucide-react";

import { getCurrentUser } from "@/lib/auth/authorization";
import AccountMenu from "@/components/account/AccountMenu";
import EMVCard from "@/components/ui/EMVCard";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in?next=/account");
  }

  const roleNames = user.roles.map((role) => role.name).join(", ");

  return (
    <main className="min-h-screen bg-[#07121f] text-white">
      <div className="mx-auto max-w-5xl p-8">

        <div className="mb-8 flex justify-end">
          <AccountMenu
            name={user.name}
            email={user.email}
            role={roleNames}
          />
        </div>

        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wider text-teal-300">
            EcoMicroVerse
          </p>

          <h1 className="mt-2 text-4xl font-semibold">
            My Account
          </h1>

          <p className="mt-3 max-w-2xl text-slate-300">
            Manage your EcoMicroVerse identity, editorial access and
            account security.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <EMVCard>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-300">
                  <UserCircle className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Profile
                  </h2>
                  <p className="text-sm text-slate-400">
                    Your authenticated identity
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Name
                </p>
                <p className="mt-1 text-white">{user.name}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Email
                </p>
                <p className="mt-1 break-all text-white">{user.email}</p>
              </div>
            </div>
          </EMVCard>

          <EMVCard>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-300">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Editorial Access
                  </h2>
                  <p className="text-sm text-slate-400">
                    Your EcoMicroVerse authorization
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Role
                </p>
                <p className="mt-1 text-white">{roleNames}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Account status
                </p>

                <span className="mt-2 inline-flex rounded-full bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-300">
                  {user.status}
                </span>
              </div>
            </div>
          </EMVCard>

          <div id="security" className="md:col-span-2">
            <EMVCard>
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-300">
                    <Shield className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      Security
                    </h2>
                    <p className="text-sm text-slate-400">
                      Account security controls
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-[#082028] p-4">
                  <p className="font-medium text-white">
                    Session security
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Session management, active-session review and additional
                    security controls will be available here as the account
                    system is expanded.
                  </p>
                </div>
              </div>
            </EMVCard>
          </div>

        </div>
      </div>
    </main>
  );
}
