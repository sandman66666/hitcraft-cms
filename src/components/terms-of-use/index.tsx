import { useMemo } from "react";

import { termsOfUseText } from "./text";

interface Section {
  title: string;
  content: string;
  subsections: {
    id: string;
    title: string;
    content: string;
  }[];
}

const TermsProcessor = ({ text }: { text: string }) => {
  const processedContent = useMemo(() => {
    // Split the text into sections
    const sections: Section[] = [];
    let currentSection: Section | null = null;
    let headerSection = {
      title: "",
      content: "",
      subsections: [],
    };
    let isHeader = true;

    // Split text into lines and process each line
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    lines.forEach((line) => {
      // Match main section headers (e.g., "1. Definitions")
      const sectionMatch = line.match(/^(\d+)\.\s*([^.]+)/);
      // Match subsection headers (e.g., "1.1 Customer Data")
      const subsectionMatch = line.match(/^(\d+\.\d+)\s+(.+?)(?=:|$)/);

      if (line.includes("SUBSCRIPTION AGREEMENT")) {
        headerSection.title = line;
      } else if (sectionMatch && !subsectionMatch) {
        isHeader = false;
        currentSection = {
          title: `${sectionMatch[1]}. ${sectionMatch[2]}`,
          content: "",
          subsections: [],
        };
        sections.push(currentSection);
      } else if (subsectionMatch && currentSection) {
        currentSection.subsections.push({
          id: subsectionMatch[1],
          title: subsectionMatch[2],
          content: "",
        });
      } else if (currentSection && currentSection.subsections.length > 0) {
        // Add content to the last subsection
        const lastSubsection =
          currentSection.subsections[currentSection.subsections.length - 1];
        lastSubsection.content += " " + line;
      } else if (currentSection) {
        // Add content to the main section
        currentSection.content += " " + line;
      } else if (isHeader && line.length > 0) {
        // Add content to header section
        headerSection.content += " " + line;
      }
    });

    return { headerSection, sections };
  }, [text]);

  return (
    <article 
      className="max-w-4xl mx-auto p-8 space-y-8"
      itemScope 
      itemType="https://schema.org/LegalDocument"
    >
      {/* Table of Contents */}
      <nav aria-label="Table of contents" className="mb-8">
        <h2 className="sr-only">Table of Contents</h2>
        <ul className="space-y-2">
          {processedContent.sections.map((section, index) => (
            <li key={index}>
              <a href={`#section-${index}`} className="text-blue-600 hover:underline">
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Header Section */}
      <header className="space-y-6">
        <h1 className="text-xl font-semibold" itemProp="name">
          {processedContent.headerSection.title}
        </h1>
        {processedContent.headerSection.content && (
          <div className="pl-6">
            <p className="text-gray-600">
              {processedContent.headerSection.content.trim()}
            </p>
          </div>
        )}
      </header>

      {/* Main Sections */}
      {processedContent.sections.map((section, index) => (
        <section 
          key={index} 
          id={`section-${index}`}
          className="space-y-6"
          aria-labelledby={`section-heading-${index}`}
        >
          <h2 
            id={`section-heading-${index}`} 
            className="text-xl font-semibold"
            itemProp="hasPart"
            itemScope
            itemType="https://schema.org/Article"
          >
            <span itemProp="name">{section.title}</span>
          </h2>

          {section.content && (
            <p className="text-gray-700 pl-6" itemProp="text">{section.content}</p>
          )}

          {section.subsections.length > 0 && (
            <div className="space-y-4 pl-6" role="list">
              {section.subsections.map((subsection, subIndex) => (
                <div 
                  key={subIndex} 
                  role="listitem"
                  itemProp="hasPart"
                  itemScope
                  itemType="https://schema.org/Article"
                >
                  <h3 
                    id={`subsection-${index}-${subIndex}`}
                    className="font-medium"
                    itemProp="name"
                  >
                    {subsection.id} {subsection.title}
                  </h3>
                  <p 
                    className="text-gray-600"
                    itemProp="text"
                  >
                    {subsection.content.trim()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </article>
  );
};

export default function TermsOfUse() {
  return (
    <div>
      <TermsProcessor text={termsOfUseText} />
    </div>
  );
}
