import React, { type ReactElement } from "react";
import { CTAButton } from "@/components/shared/CTAButton";
import { IconIndicator } from "./IconIndicator";

type IconType = "check" | "x" | "exclamation";

interface CellContent {
  text: string;
  icon: IconType;
}

interface Feature {
  feature: string;
  ourTool: CellContent;
  sunolUdio: CellContent;
  manual: CellContent;
}

const comparisonData: Record<string, Feature[]> = {
  "Creative Freedom": [
    {
      feature: "Full Creative Control",
      ourTool: {
        text: "Yes, complete control of every element",
        icon: "check",
      },
      sunolUdio: { text: "No, limited to AI generations", icon: "x" },
      manual: { text: "Yes, complete control", icon: "check" },
    },
    {
      feature: "DAW Integration",
      ourTool: { text: "Yes, works with your existing tools", icon: "check" },
      sunolUdio: { text: "No, AI-only environment", icon: "x" },
      manual: { text: "Yes, native to DAW", icon: "check" },
    },
    {
      feature: "Own Your Sound",
      ourTool: { text: "Yes, download complete project files", icon: "check" },
      sunolUdio: { text: "Limited stems/exports", icon: "exclamation" },
      manual: { text: "Yes, Full ownership", icon: "check" },
    },
  ],
  "Production Power": [
    {
      feature: "Production Power",
      ourTool: { text: "Yes, Professional-grade", icon: "check" },
      sunolUdio: { text: "Good for sketches", icon: "check" },
      manual: { text: "Varies with experience", icon: "exclamation" },
    },
    {
      feature: "Production Quality",
      ourTool: { text: "Yes, Professional-grade", icon: "check" },
      sunolUdio: { text: "Good for sketches", icon: "check" },
      manual: { text: "Varies with experience", icon: "exclamation" },
    },
    {
      feature: "Genre Flexibility",
      ourTool: { text: "Yes, 30 genres with deep expertise", icon: "check" },
      sunolUdio: { text: "Limited genre options", icon: "exclamation" },
      manual: { text: "Unlimited but requires expertise", icon: "exclamation" },
    },
    {
      feature: "Speedy Results",
      ourTool: { text: "Yes, Minutes", icon: "check" },
      sunolUdio: { text: "Yes, Minutes", icon: "check" },
      manual: { text: "No, Days/Weeks", icon: "x" },
    },
  ],
  "Learning & Growth": [
    {
      feature: "Production Education",
      ourTool: { text: "Yes, continuous learning & tips", icon: "check" },
      sunolUdio: { text: "No learning features", icon: "x" },
      manual: { text: "Years of practice needed", icon: "x" },
    },
    {
      feature: "Best Practices",
      ourTool: { text: "Yes, instant access to pro techniques", icon: "check" },
      sunolUdio: { text: "No guidance", icon: "x" },
      manual: { text: "Requires external courses", icon: "x" },
    },
    {
      feature: "Workflow Optimization",
      ourTool: { text: "Yes, personalized workflow help", icon: "check" },
      sunolUdio: { text: "No workflow features", icon: "x" },
      manual: { text: "Trial and error", icon: "exclamation" },
    },
  ],
  "Practical Realities": [
    {
      feature: "Time Investment",
      ourTool: { text: "Minimal, minutes to hours", icon: "check" },
      sunolUdio: { text: "Minimal, minutes", icon: "check" },
      manual: { text: "Weeks to years", icon: "x" },
    },
    {
      feature: "Flexible Cost",
      ourTool: {
        text: "Yes, subscription-based or pay per track",
        icon: "check",
      },
      sunolUdio: { text: "Per-track pricing", icon: "check" },
      manual: { text: "$1000s in courses & plugins", icon: "x" },
    },
    {
      feature: "Ease of Use",
      ourTool: { text: "Any skill level", icon: "check" },
      sunolUdio: { text: "No experience needed", icon: "check" },
      manual: { text: "Advanced skills required", icon: "x" },
    },
  ],
  "Beyond Basic Production": [
    {
      feature: "DAW Guidance",
      ourTool: { text: "Yes, comprehensive", icon: "check" },
      sunolUdio: { text: "No, none", icon: "x" },
      manual: { text: "No, external tutorials needed", icon: "x" },
    },
    {
      feature: "Mixing Support",
      ourTool: { text: "Yes, professional guidance", icon: "check" },
      sunolUdio: { text: "No, none", icon: "x" },
      manual: { text: "No, external expertise needed", icon: "x" },
    },
    {
      feature: "Creative Guidance",
      ourTool: { text: "Yes, lyric, chord, & arrangement help", icon: "check" },
      sunolUdio: { text: "Basic generation only", icon: "exclamation" },
      manual: { text: "No, external resources needed", icon: "x" },
    },
  ],
};

const WhyChooseUs = (): ReactElement => {
  // const renderCell = (content: CellContent): ReactElement => (
  //   <div className="flex items-center gap-2">
  //     <IconIndicator type={content.icon} />
  //     <span>{content.text}</span>
  //   </div>
  // );

  return (
    <div className="flex flex-col items-center">
      <div className="xl:w-[1200px] lg:w-[950px] sm:w-[85%] w-[90%] mx-auto">
        <div className="article-content">
          <h2 className="article-content__title">
            The GPT For Songwriters <strong className="font-bold">Vs.</strong>{" "}
            The Alternatives
          </h2>

          <div className="article-content__text">
            <p>
              We know how hard it can be to make your music sound the way you
              imagine it. For most of us, creating a song that feels "just
              right" has meant endless hours, pricey tools, and connections that
              aren't always easy to come by. That's exactly why we built this
              tool—to change the game. We're a team of musicians who believe
              everyone deserves a real shot at creating something extraordinary.
              With our AI-powered technology, you've got access to world-class
              talent at your fingertips. Here's how we stand out among the
              alternatives:
            </p>
          </div>

          {/* Comparison Table */}
          <div className="comparison-table mt-8">
            <div className="comparison-header">
              <div className="manual-col">Feature</div>
              <div className="manual-col">The GPT For Songwriters</div>
              <div className="manual-col">Suno/Udio</div>
              <div className="manual-col">Manual Process</div>
            </div>

            {Object.entries(comparisonData).map(([category, features]) => (
              <React.Fragment key={category}>
                <div className="category-row">
                  <div className="category-name">{category}</div>
                </div>
                {features.map((item, index) => (
                  <div key={`${category}-${index}`} className="comparison-row">
                    <div className="feature-col">{item.feature}</div>
                    <div className="our-tool-col">
                      <div className="flex items-center gap-2">
                        <IconIndicator type={item.ourTool.icon} />
                        <span>{item.ourTool.text}</span>
                      </div>
                    </div>
                    <div className="sunol-col">
                      <div className="flex items-center gap-2">
                        <IconIndicator type={item.sunolUdio.icon} />
                        <span>{item.sunolUdio.text}</span>
                      </div>
                    </div>
                    <div className="manual-col">
                      <div className="flex items-center gap-2">
                        <IconIndicator type={item.manual.icon} />
                        <span>{item.manual.text}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>

          {/* CTA Section */}
          <div className="flex flex-col items-center mt-12">
            <h3 className="text-2xl font-bold text-center mb-4">
              Ready to Experience the Difference?
            </h3>
            <CTAButton className="main-button-design gradient-purple-button !w-[290px] !text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
