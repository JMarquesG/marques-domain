
import React, { useState, useEffect } from 'react';
import ExperienceCard from '@/components/ExperienceCard';
import ExpertiseCard from '@/components/ExpertiseCard';
import { Code2, Database, Terminal, Users, ChevronDown, ArrowRight } from 'lucide-react';
import MinimalNav from '@/components/MinimalNav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import { useLanguage } from '@/context/LanguageContext';

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-full flex flex-col">
      <MinimalNav />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section id="home">
          <Hero />
        </section>
        
        {/* About Section */}
        <About />
        
        {/* Experience Section */}
        <section id="experience" className="py-24 bg-secondary">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <span className="text-primary font-medium">{t('resume')}</span>
              <h2 className="text-3xl font-bold mt-2 mb-12">{t('experience')}</h2>
              
              <div className="relative">
                <ExperienceCard 
                  title={t('fullStackTechLead')}
                  company="Omnios"
                  position={t('fullStackTechLead')}
                  period="Mar 2022 - Now"
                  description="Leading core projects from inception, specializing in data scraping and analysis with Node.js and Python. Implemented AI integrations while designing robust infrastructure and data architecture. Created comprehensive documentation and mentored junior developers. Applied Scrum methodology to enhance team productivity and streamline project execution."
                />
                
                <ExperienceCard 
                  title="Full-Stack"
                  company="SinzerAD"
                  position="Full-Stack"
                  period="Feb 2021 - Mar 2022"
                  description="Developed applications across various infrastructures using Python and Node.js. Excelled in requirements engineering, translating client needs into actionable project plans. Demonstrated autonomy by self-educating and contributing to all phases of the development lifecycle."
                />
                
                <ExperienceCard 
                  title="Junior Software Developer"
                  company="Sopra Steria"
                  position="Junior Software Developer"
                  period="Feb 2020 - May 2020"
                  description="Enhanced knowledge of Scrum methodologies and backend development skills while gaining insights into agile practices and advanced programming techniques."
                />
                
                <ExperienceCard 
                  title="Junior Software Developer"
                  company="Bekodo"
                  position="Junior Software Developer"
                  period="Feb 2019 - Dec 2019"
                  description="Learned from experts predominantly in Node.js, with an introduction to Python. Demonstrated rapid learning ability and self-driven progression from the start of my career."
                  isLast
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Expertise Section */}
        <section id="expertise" className="py-24 bg-black">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <span className="text-primary font-medium">{t('technicalExpertise')}</span>
              <h2 className="text-3xl font-bold mt-2 mb-12">{t('coreCompetencies')}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ExpertiseCard 
                  title={t('backendDevelopment')}
                  description={t('backendDevDescription')}
                  icon={<Terminal size={28} />}
                  modalTitleKey="backendDevelopment"
                  modalDescriptionKey="backendDevExpertise"
                />
                
                <ExpertiseCard 
                  title={t('dataArchitecture')}
                  description={t('databaseArchDescription')}
                  icon={<Database size={28} />}
                  modalTitleKey="dataArchitecture"
                  modalDescriptionKey="databaseArchExcellence"
                />
                
                <ExpertiseCard 
                  title={t('apiDevelopment')}
                  description={t('apiDevDescription')}
                  icon={<Code2 size={28} />}
                  modalTitleKey="apiDevelopment"
                  modalDescriptionKey="apiDevMethodology"
                />
                
                <ExpertiseCard 
                  title={t('technicalLeadership')}
                  description={t('techLeadershipDescription')}
                  icon={<Users size={28} />}
                  modalTitleKey="technicalLeadership"
                  modalDescriptionKey="techLeadershipApproach"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Education Section */}
        <section id="education" className="py-24 bg-secondary">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <span className="text-primary font-medium">{t('myBackground')}</span>
              <h2 className="text-3xl font-bold mt-2 mb-12">{t('education')}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-8 hover-lift">
                  <h3 className="text-xl font-semibold mb-3">{t('computerScience')}</h3>
                  <p className="text-sm text-primary mb-5">{t('upc')}</p>
                  <p className="text-gray-400">
                    {t('csDescription')}
                  </p>
                </div>
                
                <div className="glass-card p-8 hover-lift">
                  <h3 className="text-xl font-semibold mb-3">{t('competenciasTecnologicas')}</h3>
                  <p className="text-sm text-primary mb-5">{t('fundacionEsplai')}</p>
                  <p className="text-gray-400">
                    {t('javaCppDescription')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-24 bg-black">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <span className="text-primary font-medium">{t('contact')}</span>
              <h2 className="text-3xl font-bold mt-2 mb-12">{t('getInTouch')}</h2>
              
              <div className="glass-card p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-xl font-semibold mb-6">{t('letConnect')}</h3>
                    <p className="text-gray-400 mb-8">
                      {t('connectDescription')}
                    </p>
                    
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-muted text-primary mr-4">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium">{t('phone')}</h4>
                          <p className="text-gray-400">648777122</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-muted text-primary mr-4">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium">{t('email')}</h4>
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
                          <h4 className="text-lg font-medium">{t('location')}</h4>
                          <p className="text-gray-400">Barcelona, Spain</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <form>
                      <div className="mb-6">
                        <label htmlFor="name" className="block text-sm font-medium mb-2">{t('name')}</label>
                        <input 
                          type="text" 
                          id="name" 
                          className="w-full px-4 py-3 rounded-md bg-muted border border-muted focus:border-primary outline-none transition-colors" 
                          placeholder={t('yourName')}
                        />
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium mb-2">{t('email')}</label>
                        <input 
                          type="email" 
                          id="email" 
                          className="w-full px-4 py-3 rounded-md bg-muted border border-muted focus:border-primary outline-none transition-colors" 
                          placeholder={t('yourEmail')}
                        />
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="message" className="block text-sm font-medium mb-2">{t('message')}</label>
                        <textarea 
                          id="message" 
                          rows={5} 
                          className="w-full px-4 py-3 rounded-md bg-muted border border-muted focus:border-primary outline-none transition-colors resize-none" 
                          placeholder={t('yourMessage')}
                        ></textarea>
                      </div>
                      
                      <button 
                        type="submit" 
                        className="button-accent w-full flex items-center justify-center"
                      >
                        <span>{t('sendMessage')}</span>
                        <ArrowRight size={16} className="ml-2" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-10 bg-black border-t border-muted">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-500">
              © {new Date().getFullYear()} Jordi Marqués. {t('allRightsReserved')}
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
