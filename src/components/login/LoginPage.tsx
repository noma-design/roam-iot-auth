import { TextLink } from "@/components/ui/TextLink";
import { BrandPanel } from "./BrandPanel";
import { LoginForm } from "./LoginForm";

export function LoginPage() {
  return (
    <main className="min-h-screen w-full bg-roam-surface">
      {/* Desktop (≥1200px): Log In - Direction 01 */}
      <div className="hidden min-h-screen desktop:flex">
        <BrandPanel />

        <section className="relative flex min-h-screen flex-1 flex-col items-center justify-center overflow-hidden bg-roam-surface px-12 py-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-28 size-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,173,186,0.18)_0%,rgba(243,243,244,0)_70%)] blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 size-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,58,93,0.12)_0%,rgba(243,243,244,0)_70%)] blur-2xl"
          />

          <div className="relative z-10 flex w-full max-w-[624px] flex-col items-center gap-12">
            <div className="flex flex-col items-center gap-2 text-center">
              <h2 className="text-[32px] font-semibold leading-9 text-roam-navy">
                Sign in to Roam IoT
              </h2>
              <p className="text-base leading-[26.4px] text-roam-muted">
                Manage your SIMs, usage and connectivity.
              </p>
            </div>

            <div className="flex w-full flex-col items-center gap-[52px]">
              <LoginForm variant="desktop" />

              <nav
                aria-label="Legal"
                className="flex flex-wrap items-center justify-center text-sm uppercase tracking-normal"
              >
                <TextLink
                  href="#support"
                  tone="footer"
                  className="border-r-[1.5px] border-roam-border px-2 py-1"
                >
                  Contact Support
                </TextLink>
                <TextLink
                  href="#privacy"
                  tone="footer"
                  className="border-r-[1.5px] border-roam-border px-2 py-1"
                >
                  Privacy & Security Policy
                </TextLink>
                <TextLink href="#terms" tone="footer" className="px-2 py-1">
                  Terms of Service
                </TextLink>
              </nav>
            </div>
          </div>
        </section>
      </div>

      {/* Tablet (768px–1199px): Log In - Tablet centered card */}
      <div className="relative hidden min-h-screen items-center justify-center overflow-hidden bg-roam-surface px-6 py-10 tablet:flex desktop:hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[149px] top-0 size-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,173,186,0.16)_0%,rgba(243,243,244,0)_68%)] blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-[438px] top-[608px] size-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,58,93,0.12)_0%,rgba(243,243,244,0)_68%)] blur-2xl"
        />

        <div className="relative z-10 flex w-full max-w-[768px] flex-col items-center gap-[84px] p-2.5">
          <div className="flex w-full max-w-[416px] flex-col items-center rounded-[2px] border border-[#eaecf0] bg-white p-8 shadow-[0px_4px_14px_rgba(16,24,40,0.08),0px_12px_40px_rgba(16,24,40,0.1)]">
            <div className="flex w-full flex-col items-center gap-9 px-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/logo-tablet.svg"
                alt="Roam IoT"
                width={296}
                height={76}
                className="h-auto w-[296px] max-w-full"
              />

              <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-[32px] font-semibold leading-9 text-roam-navy">
                  Sign in to Roam IoT
                </h1>
                <p className="text-base leading-[26.4px] text-roam-ink">
                  Manage your SIMs, usage and connectivity.
                </p>
              </div>

              <div className="flex w-full flex-col items-center gap-5">
                <LoginForm variant="tablet" />

                <div className="flex w-full flex-col items-center gap-3">
                  <nav
                    aria-label="Legal"
                    className="flex items-center justify-center text-sm"
                  >
                    <TextLink
                      href="#privacy"
                      tone="footer"
                      enableHover={false}
                      className="border-r-[1.5px] border-roam-border px-2 py-1 leading-[21px]"
                    >
                      Privacy & Security Policy
                    </TextLink>
                    <TextLink
                      href="#terms"
                      tone="footer"
                      enableHover={false}
                      className="px-2 py-1 leading-[21px]"
                    >
                      Terms of Service
                    </TextLink>
                  </nav>
                  <TextLink
                    href="#support"
                    tone="footer"
                    enableHover={false}
                    className="px-2 py-1 text-sm leading-[21px]"
                  >
                    Contact Support
                  </TextLink>
                </div>
              </div>
            </div>
          </div>

          <footer className="flex w-full items-center justify-center px-11 text-sm text-roam-muted">
            <p className="leading-[21px]">
              ©2026 Roam IoT. All rights reserved.
            </p>
          </footer>
        </div>
      </div>

      {/* Mobile (≤767px): Modernized Continuity */}
      <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-roam-surface px-5 pb-8 pt-[102px] tablet:hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[149px] top-0 size-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,173,186,0.16)_0%,rgba(243,243,244,0)_68%)] blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-[89px] top-[485px] size-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,58,93,0.12)_0%,rgba(243,243,244,0)_68%)] blur-2xl"
        />

        <div className="relative z-10 flex w-full max-w-[350px] flex-col items-center">
          <div className="flex w-full flex-col items-center gap-9 px-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo-mobile.svg"
              alt="Roam IoT"
              width={296}
              height={76}
              className="h-auto w-[296px] max-w-full"
            />

            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-[32px] font-semibold leading-9 text-roam-navy">
                Sign in to Roam IoT
              </h1>
              <p className="text-base leading-[26.4px] text-roam-ink">
                Manage your SIMs, usage and connectivity.
              </p>
            </div>

            <div className="flex w-full flex-col items-center gap-5">
              <LoginForm variant="mobile" />

              <TextLink
                href="#support"
                tone="footer"
                enableHover={false}
                className="p-2 text-sm leading-[21px]"
              >
                Contact Support
              </TextLink>
            </div>
          </div>

          <nav
            aria-label="Legal"
            className="mt-10 flex w-full items-start justify-between text-sm"
          >
            <TextLink
              href="#privacy"
              tone="footer"
              enableHover={false}
              className="px-2 py-1 leading-[21px]"
            >
              Privacy & Security Policy
            </TextLink>
            <TextLink
              href="#terms"
              tone="footer"
              enableHover={false}
              className="px-2 py-1 leading-[21px]"
            >
              Terms of Service
            </TextLink>
          </nav>
        </div>
      </div>
    </main>
  );
}
