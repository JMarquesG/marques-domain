"use client";
import React from "react";
import MinimalNav from "@/components/MinimalNav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ExperienceCard from "@/components/ExperienceCard";
import ExpertiseCard from "@/components/ExpertiseCard";
import { Brain, Boxes, Terminal, Users, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-full flex flex-col">
      <MinimalNav />
      <main className="flex-1">
        <section id="home">
          <Hero />
        </section>

        <About />

        <section id="experience" className="py-24 bg-secondary">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <span className="text-primary font-medium">{t("resume")}</span>
              <h2 className="text-3xl font-bold mt-2 mb-12">{t("experience")}</h2>

              <div className="relative">
                <ExperienceCard 
                  title="Full-Stack / Tech Lead"
                  company="Omnios"
                  position="Full-Stack / Tech Lead"
                  period="Mar 2022 - Present"
                  description="Led core products from inception with Node.js and Python, heavy data scraping and processing, AI integrations, and robust infra/data architecture. Owned documentation and mentored teammates. Scrum-driven delivery."
                />

                <ExperienceCard 
                  title="Full-Stack Developer"
                  company="SinzerAD"
                  position="Full-Stack Developer"
                  period="Feb 2021 - Mar 2022"
                  description="Delivered applications across varied infrastructures (Python/Node.js). Strong requirements engineering translating needs into concrete milestones. End-to-end contributor across lifecycle."
                />

                <ExperienceCard 
                  title="Junior Software Developer"
                  company="Sopra Steria"
                  position="Junior Software Developer"
                  period="Feb 2020 - May 2020"
                  description="Grew in Scrum practices and backend craft with exposure to agile collaboration and modern engineering workflows."
                />

                <ExperienceCard 
                  title="Junior Software Developer"
                  company="Bekodo"
                  position="Junior Software Developer"
                  period="Feb 2019 - Dec 2019"
                  description="Hands-on learning with strong emphasis on Node.js and early Python. Demonstrated autonomy and rapid progression."
                  isLast
                />
              </div>
            </div>
          </div>
        </section>

        <section id="expertise" className="py-24 bg-black">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <span className="text-primary font-medium">{t("technicalExpertise")}</span>
              <h2 className="text-3xl font-bold mt-2 mb-12">{t("coreCompetencies")}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ExpertiseCard 
                  title={t("backendDevelopment")}
                  description={t("backendDevDescription")}
                  icon={<Terminal size={28} />}
                  modalTitleKey="backendDevelopment"
                  modalDescriptionKey="backendDevExpertise"
                />

                <ExpertiseCard 
                  title={t("aiNlp")}
                  description={t("aiNlpDescription")}
                  icon={<Brain size={28} />}
                  modalTitleKey="aiNlp"
                  modalDescriptionKey="aiNlpExpertise"
                />

                <ExpertiseCard 
                  title={t("blockchain")}
                  description={t("blockchainDescription")}
                  icon={<Boxes size={28} />}
                  modalTitleKey="blockchain"
                  modalDescriptionKey="blockchainExpertise"
                />

                <ExpertiseCard 
                  title={t("technicalLeadership")}
                  description={t("techLeadershipDescription")}
                  icon={<Users size={28} />}
                  modalTitleKey="technicalLeadership"
                  modalDescriptionKey="techLeadershipApproach"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-24 bg-secondary">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <span className="text-primary font-medium">{t("projects")}</span>
              <h2 className="text-3xl font-bold mt-2 mb-12">{t("projectsSubtitle")}</h2>

              <div className="grid grid-cols-1 gap-8">
                <div className="glass-card p-8 hover-lift" onClick={() => window.open("https://mentaestate.com", "_blank")}> 
                  <h3 className="text-xl font-semibold mb-2">MentaEstate</h3>
                  <p className="text-sm text-primary mb-4">{t("mentaEstateTagline")}</p>
                  <p className="text-gray-300">{t("mentaEstateDescription")}</p>
                </div>

                <div className="glass-card p-8 hover-lift" onClick={() => window.open("https://llista.cat", "_blank")}> 
                  <h3 className="text-xl font-semibold mb-2">llista.cat</h3>
                  <p className="text-sm text-primary mb-4">{t("llistaTagline")}</p>
                  <p className="text-gray-300">{t("llistaDescription")}</p>
                </div>

                <div className="glass-card p-8 hover-lift" onClick={() => window.open("https://github.com/JMarquesG/bills-app", "_blank")}>
                  <h3 className="text-xl font-semibold mb-2">Bills App</h3>
                  <p className="text-sm text-primary mb-4">{t("billsAppTagline")}</p>
                  <p className="text-gray-300">{t("billsAppDescription")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 bg-black">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <span className="text-primary font-medium">{t("contact")}</span>
              <h2 className="text-3xl font-bold mt-2 mb-12">{t("getInTouch")}</h2>

              <div className="glass-card p-8">
                <div className="gap-12">
                  <div>
                    <h3 className="text-xl font-semibold mb-6">{t("letConnect")}</h3>
                    <p className="text-gray-400 mb-8">{t("connectDescription")}</p>

                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-muted text-primary mr-4">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium">{t("phone")}</h4>
                          <p className="text-gray-400">+34 638772122</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-muted text-primary mr-4">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium">{t("email")}</h4>
                          <p className="text-gray-400">jordimarquesgodo@gmail.com</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-muted text-primary mr-4">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium">{t("location")}</h4>
                          <p className="text-gray-400">Andorra</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-10 bg-black border-t border-muted">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-500">© {new Date().getFullYear()} Jordi Marqués. {t("allRightsReserved")}</p>
          </div>
        </footer>
      </main>
    </div>
  );
}


