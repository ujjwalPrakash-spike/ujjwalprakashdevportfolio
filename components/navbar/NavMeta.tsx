import { siteConfig } from "@/config/site";

export default function NavMeta() {
  const { line1, line2 } = siteConfig.navbar.eventMeta;

  return (
    <div className="col-start-4 col-span-3 hidden lg:flex flex-col justify-start border-l border-black/10 pl-8">
      <p className="text-[18px] leading-[1.45] font-light text-black">
        {line1}
        <span className="text-[#1A4DFF] ml-1">/</span>
        <br />
        {line2}
      </p>
    </div>
  );
}