import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { siteConfig } from "@/config/site";

export default function HeroSection() {
  const { hero } = siteConfig.home;

  return (
    <section className="relative w-full px-6 lg:px-10 pt-8 pb-20">
      <div className="w-[85vw] mx-auto flex flex-col min-h-[87vh]">
        
        {/* HERO */}
        <div className="flex flex-1 mt-6 min-w-0">
          <div className="w-full min-w-0">
            <h1
              className="
                font-normal
                leading-[0.82]
                tracking-[-0.06em]
                text-[clamp(3.5rem,9.5vw,12rem)]
                text-[#2E3129]
              "
            >
              <span className="block">
                {hero.titleLine1}
              </span>

              <span className="flex items-center gap-[0.15em] min-w-0">
                <span>{hero.titleLine2}</span>

                <div
                  className="w-[1.5em] h-[1.5em] shrink-0"
                  style={{ mixBlendMode: "multiply" }}
                >
                  <DotLottieReact
                    src="https://lottie.host/43576938-961f-47db-863e-dcde945ced21/aOYzYLyjIH.lottie"
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </span>

              <span className="block text-[#1A4DFF]">
                {hero.titleHighlight}
              </span>
            </h1>
          </div>
        </div>

        {/* FOOTER */}
        <div className="grid grid-cols-12 items-end gap-y-8 gap-x-6 mt-12">
          
          <div className="col-span-12 lg:col-span-3 flex items-center gap-2 min-w-0">
            <div className="font-bold text-[22px] shrink-0">
              {hero.footerPrefix}
            </div>

            <div className="text-[18px] text-[#111111] min-w-0">
              {hero.footerText}
            </div>
          </div>

          <div className="col-span-12 lg:col-start-4 lg:col-span-5">
            <button className="w-full bg-[#1A4DFF] hover:bg-[#0036FF] transition-colors text-white py-5 px-8 rounded-sm font-bold uppercase tracking-wide text-[14px] flex items-center justify-center gap-3">
              {hero.cta}
            </button>
          </div>

          <div className="col-span-12 lg:col-start-10 lg:col-span-3">
            <div className="text-[#1A4DFF] text-[28px] leading-none mb-3">
              ✳
            </div>

            <p className="text-[14px] leading-[1.7] text-[#111111]">
              {hero.descriptionInfo}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}