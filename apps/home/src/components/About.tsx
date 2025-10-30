
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-primary font-medium">{t('about')}</span>
          <h2 className="text-3xl font-bold mt-2 mb-12">{t('professionalOverview')}</h2>
          
          <div className="space-y-8">
            <p className="text-lg text-gray-300 leading-relaxed">
              {t('aboutDescription1')}
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              {t('aboutDescription2')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
              <div>
                <h3 className="text-xl font-medium mb-6">{t('personalInfo')}</h3>
                <ul className="space-y-4">
                  <li className="flex border-b border-gray-800 pb-3">
                    <span className="w-32 text-gray-500">{t('name')}:</span>
                    <span>Jordi Marqués Godó</span>
                  </li>
                  <li className="flex border-b border-gray-800 pb-3">
                    <span className="w-32 text-gray-500">{t('email')}:</span>
                    <span>jordimarquesgodo@gmail.com</span>
                  </li>
                  <li className="flex border-b border-gray-800 pb-3">
                    <span className="w-32 text-gray-500">{t('location')}:</span>
                    <span>Andorra</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-6">{t('myExpertise')}</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>{t('backendDevelopment')}</span>
                      <span className="text-primary">95%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>{t('dataArchitecture')}</span>
                      <span className="text-primary">90%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>{t('apiDevelopment')}</span>
                      <span className="text-primary">85%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>{t('technicalLeadership')}</span>
                      <span className="text-primary">80%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: '80%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span>{t('aiNlp')}</span>
                      <span className="text-primary">85%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span>{t('blockchain')}</span>
                      <span className="text-primary">80%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
