
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const chatUrl = typeof window !== 'undefined'
    ? `${window.location.protocol}//chat.${window.location.hostname.replace(/^www\./, '')}`
    : '#';

  return (
    <section className="relative min-h-screen flex items-center bg-black">
      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 space-y-6 pt-12">
          <h2 className="text-xl font-light text-gray-400">{t('hello')}</h2>
          <h1 className="header-title">
            {t('softwareDeveloper')}
          </h1>
          
          <p className="header-subtitle mt-6 max-w-xl">
            {t('designAndCode')}
          </p>
          
          <div className="pt-8 flex gap-4">
            <a 
              href="#about" 
              className="button-primary inline-flex items-center"
            >
              <span>{t('viewMyWork')}</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a 
              href={chatUrl} 
              className="button-accent inline-flex items-center"
              target="_blank"
              rel="noreferrer"
            >
              <span>{t('tryChat')}</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
