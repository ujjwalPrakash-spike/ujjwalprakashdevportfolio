import React from "react";
import {
  TextRevealBlock,
  TextRevealWords,
  TextRevealHighlighted,
} from "@/components/ui/text-reveal";

export default function DescriptionSection() {
  return (
    <section className="relative  w-full px-10 py-10 z-10 ">
      <div className="grid grid-cols-12  gap-x-4">
        <div className="col-span-12 lg:col-start-2 lg:col-span-10 lg:px-12 text-[32px] md:text-[48px] lg:text-[60px] font-light leading-[1.1] tracking-[-0.03em]">
          <TextRevealBlock wordCount={47}>
            <TextRevealWords startIndex={0}>
              Promoted to Senior Software Engineer & Team Lead for the official
              IIT Kanpur placement portal (RAS), managing a team of 4 developers
              and a
            </TextRevealWords>{" "}
            <TextRevealHighlighted
              startIndex={24}
              action="highlight"
              color="#87CEFA"
              animationDuration={800}
              className="inline"
            >
              37K+ line production codebase
            </TextRevealHighlighted>{" "}
            <TextRevealWords startIndex={28}>
              for 20,000+ students. Co-authored peer-reviewed deep learning
              research with ISRO, accepted for an oral presentation at IEEE
              IGARSS 2026.
            </TextRevealWords>
          </TextRevealBlock>
        </div>
      </div>
    </section>
  );
}
