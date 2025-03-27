
import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

interface ExperienceCardProps {
  titleKey?: string;
  title: string;
  company: string;
  position: string;
  period: string;
  descriptionKey?: string;
  description: string;
  isLast?: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  titleKey,
  title,
  company,
  position,
  period,
  descriptionKey,
  description,
  isLast = false
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="relative">
      <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-gold-100 ring-4 ring-dark-200 z-10"></div>
      {!isLast && (
        <div className="absolute left-1.5 top-5 bottom-0 w-0.5 bg-dark-300"></div>
      )}
      <div className="ml-12 pb-8">
        <div className="glass-card p-6 hover-lift">
          <span className="text-xs text-gray-400">{period}</span>
          <h3 className="text-lg font-semibold mt-1 mb-2">{titleKey ? t(titleKey) : title}</h3>
          <p className="text-sm text-gold-100 mb-3">{company}</p>
          <p className="text-sm text-gray-400">{position}</p>
          <p className="mt-3 text-sm leading-relaxed">{descriptionKey ? t(descriptionKey) : description}</p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
