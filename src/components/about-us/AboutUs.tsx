import React from "react";
import { Link } from "react-router-dom";
import { CTAButton } from "@/components/shared/CTAButton";

const teamMembers = [
  // Row 1 - 2 members (Leadership)
  {
    id: 1,
    name: "Oudi Antebi",
    role: "Co-Founder & CEO",
    image: "/assets/images/about-us/members/Oudi.jpg",
  },
  {
    id: 2,
    name: "Amit Shine",
    role: "Co-Founder & COO",
    image: "/assets/images/about-us/members/Amit.jpg",
  },
  // Row 2 - 3 members (Co-Founders & Music Producers)
  {
    id: 3,
    name: "Stav Beger",
    role: "Co-Founder & Music Producer",
    image: "/assets/images/about-us/members/05_stav.webp",
  },
  {
    id: 4,
    name: "Tal Forer",
    role: "Co-Founder & Music Producer",
    image: "/assets/images/about-us/members/03_tal.webp",
  },
  {
    id: 5,
    name: "Yinon Yahel",
    role: "Co-Founder & Music Producer",
    image: "/assets/images/about-us/members/04_yinon.webp",
  },
  // Row 3 - 3 members (Core Team)
  {
    id: 6,
    name: "Ran Hagai",
    role: "CFO",
    image: "/assets/images/about-us/members/Ran.jpg",
  },
  {
    id: 7,
    name: "Yadin Katz",
    role: "CMO",
    image: "/assets/images/about-us/members/yadin2.jpg",
  },
  {
    id: 8,
    name: "Rafi Levinson",
    role: "Head of DSTRO",
    image: "/assets/images/about-us/members/Rafi.jpg",
  },
  // Row 4 - 3 members (Development Team)
  {
    id: 9,
    name: "Ido Heth",
    role: "Head of Engineering",
    image: "/assets/images/about-us/members/Ido.jpg",
  },
  {
    id: 10,
    name: "Ronen Betzer",
    role: "Developer",
    image: "/assets/images/about-us/members/Ronen.jpg",
  },
  {
    id: 11,
    name: "Tamir Lavi",
    role: "Product Manager & Sound",
    image: "/assets/images/about-us/members/Tamir.jpg",
  },
  // Row 5 - 3 members (Additional Developers)
  {
    id: 12,
    name: "Maayan Blum",
    role: "Developer",
    image: "/assets/images/about-us/members/Maayan.jpg",
  },
  {
    id: 13,
    name: "Idan Ofek",
    role: "Developer",
    image: "/assets/images/about-us/members/idan.png",
  },
  {
    id: 14,
    name: "Aviv Barel",
    role: "Developer",
    image: "/assets/images/about-us/members/aviv.jpg",
  },
  // Row 6 - 3 members (Support Team)
  {
    id: 15,
    name: "Rachel Bracha",
    role: "Artist Management",
    image: "/assets/images/about-us/members/Rachel.jpg",
  },
  {
    id: 16,
    name: "Osher Biton",
    role: "Music Producer",
    image: "/assets/images/about-us/members/Osher.jpg",
  },
  {
    id: 17,
    name: "Yan Zalka",
    role: "Music Composer",
    image: "/assets/images/about-us/members/Yan.jpg",
  },
];

const AboutUs: React.FC = (): React.ReactElement => {
  return (
    <main className="flex flex-col items-center" role="main">
      <div className="xl:w-[703px] xl:me-[66px] lg:w-[650px] lg:ms-0 lg:me-[45px] lg:text-start sm:w-[85%] w-[90%] mx-auto">
        <article className="article-content">
          {/* About HitCraft Section */}
          <section aria-labelledby="about-hitcraft">
          <h1 id="about-hitcraft" className="article-content__title">
            About <strong className="font-bold">HitCraft</strong>
          </h1>
          <div className="article-content__text" itemScope itemType="https://schema.org/Organization">
            <meta itemProp="name" content="HitCraft" />
            <p>
              HitCraft is an innovative AI-powered platform revolutionizing
              music production. Our cutting-edge technology combines artificial
              intelligence with deep musical understanding to help musicians and
              producers bring their creative visions to life. Whether you're a
              seasoned professional or just starting your musical journey,
              HitCraft provides the tools and intelligence you need to create
              professional-grade music.
            </p>
            <div className="flex justify-center mt-8">
              <CTAButton
                className="main-button-design gradient-purple-button"
                text="Sign up for free now"
              />
            </div>
          </div>

          </section>

          {/* About Us (Session42) Section */}
          <section aria-labelledby="about-session42" className="mt-12">
          <h2 id="about-session42" className="article-content__title">
            About <strong className="font-bold">Us</strong>
          </h2>
          <div className="article-content__text" itemScope itemType="https://schema.org/Organization">
            <meta itemProp="name" content="Session42" />
            <p>
              Session42 is a dynamic team of music industry veterans, technology
              innovators, and passionate creators. We've combined our diverse
              expertise to build HitCraft, driven by our shared vision of
              democratizing music production. Our team brings together decades
              of experience in music production, artificial intelligence, and
              software development.
            </p>
            <p className="mt-4">
              Our mission is to break down the technical barriers in music
              production, making professional-grade tools accessible to creators
              at all levels. We believe that technology should enhance
              creativity, not complicate it.
            </p>
          </div>

          </section>

          {/* The Team Section */}
          <section aria-labelledby="team-section" className="mt-16">
          <h2 id="team-section" className="article-content__title">
            The <strong className="font-bold">Team</strong>
          </h2>
          <div className="article-content__text">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-16 mt-10" itemScope itemType="https://schema.org/Organization">
              <meta itemProp="name" content="HitCraft Team" />
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`flex flex-col items-center ${
                    index < 2 ? "sm:col-span-3" : "sm:col-span-1"
                  } ${index < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}
                >
                  <div className="w-[160px] sm:w-[200px] aspect-square rounded-full overflow-hidden mb-4" itemScope itemType="https://schema.org/Person">
                    <meta itemProp="name" content={member.name} />
                    <meta itemProp="jobTitle" content={member.role} />
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.role} at HitCraft`}
                      className="w-[130%] h-[130%] object-cover object-center transform scale-105"
                      loading="lazy"
                      width="200"
                      height="200"
                      style={{
                        objectFit: [14, 12].includes(member.id)
                          ? "contain"
                          : "cover",
                        objectPosition:
                          member.id === 7
                            ? "center 38%" // Yadin2
                            : member.id === 10
                            ? "center 25%" // Ronen
                            : member.id === 12
                            ? "top" // Maayan - fine-tuned position
                            : member.id === 1
                            ? "center 35%" // Oudi
                            : member.id === 2
                            ? "center 28%" // Amit
                            : member.id === 15
                            ? "center 35%" // Rachel
                            : member.id === 6
                            ? "center 32%" // Ran - adjusted
                            : member.id === 8
                            ? "center 32%" // Rafi - adjusted
                            : member.id === 9
                            ? "center 32%" // Ido - adjusted
                            : member.id === 11
                            ? "center 28%" // Tamir
                            : member.id === 3 ||
                              member.id === 4 ||
                              member.id === 5
                            ? "center 10%" // Stav, Tal, Yinon - reduced zoom
                            : member.id === 14
                            ? "top" // Aviv - fine-tuned position
                            : member.id === 15
                            ? "center 50%"
                            : "center 40%",
                      }}
                    />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#252931] text-center">
                    {member.name}
                  </h3>
                  <p className="text-[14px] text-[#252931] mt-1 text-center">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
          </section>
        </article>

        {/* Contact CTA Section */}
        <section aria-label="Contact Call to Action" className="flex justify-center w-full mt-24 px-4">
          <div className="action flex flex-col items-center bg-white py-12 px-8 rounded-2xl max-w-[800px] w-full shadow-[0_0_15px_rgba(0,0,0,0.05)]" itemScope itemType="https://schema.org/ContactPoint">
            <h3 className="text-[32px] font-bold text-[#252931] mb-4">
              Get in Touch <strong className="font-extrabold">With Us!</strong>
            </h3>
            <p className="text-[18px] text-[#252931] text-center mb-8">
              Just send us a message and we'll get back to you!
            </p>
            <div className="w-full max-w-[320px]">
              <Link to="/contact" aria-label="Navigate to contact page">
                <button className="gradient-purple-button w-full text-[20px] uppercase tracking-wide" aria-label="Contact Us">
                  CONTACT US
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutUs;
