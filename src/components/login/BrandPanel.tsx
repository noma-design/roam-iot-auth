const stats = [
  { value: "700+", label: "Networks Worldwide" },
  { value: "17M+", label: "Active Connections" },
  { value: "200+", label: "Countries & Territories" },
];

export function BrandPanel() {
  return (
    <aside className="relative flex min-h-full flex-1 flex-col justify-between overflow-hidden bg-[#0a202b] px-6 py-10 text-roam-white desktop:px-[42px] desktop:py-16">
      {/*
        Figma Frame 1:
        background: url(video), linear-gradient(147.99deg, rgba(0,63,92,0.9) 0%, rgba(0,169,181,0.7) 100%);
        + video fill 50% + #000 5%. Opaque base stops white bleed through translucent stops.
      */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(147.99deg, rgba(0, 63, 92, 0.9) 0%, rgba(0, 169, 181, 0.7) 100%)",
        }}
      />
      <video
        className="absolute inset-0 size-full object-cover object-center opacity-50"
        src="/assets/hero-globe-fill.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
      <div aria-hidden className="absolute inset-0 bg-black/[0.08]" />

      <div className="relative z-10 flex h-full min-h-[640px] flex-col justify-between tablet:min-h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/logo-white.svg"
          alt="Roam IoT"
          width={359}
          height={93}
          className="h-auto w-[220px] max-w-full desktop:w-[359px]"
        />

        <div className="flex max-w-[560px] flex-col justify-between gap-10 desktop:h-[432px] desktop:gap-0">
          <h1 className="text-[36px] font-semibold leading-[1.2] desktop:text-[48px] desktop:leading-[60px]">
            Global Connectivity
            <span className="block text-roam-teal">Redefined.</span>
          </h1>

          <div className="flex flex-col gap-10 desktop:gap-[100px]">
            <p className="max-w-[509px] text-lg leading-7 text-roam-white desktop:text-2xl desktop:leading-8">
              Scale your IoT ecosystem securely with our world-class connectivity
              management platform.
            </p>

            <div className="flex flex-wrap gap-6 desktop:gap-8">
              {stats.map((stat) => (
                <div key={stat.value} className="min-w-[120px] p-1">
                  <p className="text-[32px] font-bold uppercase tracking-[1.4px] text-roam-teal desktop:text-[40px] desktop:leading-5">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-base leading-7 text-roam-white desktop:text-xl">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="relative z-10 text-sm leading-[21px] text-roam-white desktop:text-base">
          ©2026 Roam IoT. All rights reserved.
        </p>
      </div>
    </aside>
  );
}
