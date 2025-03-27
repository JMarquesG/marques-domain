
import React from 'react';
import { useLanguage, Language } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, availableLanguages } = useLanguage();
  
  const languageNames: Record<Language, string> = {
    en: 'English',
    es: 'Español',
    ca: 'Català'
  };
  
  return (
    <div className="flex items-center">
      <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
        <SelectTrigger className="w-[120px] bg-transparent border-gray-700 text-sm">
          <div className="flex items-center gap-2">
            <Globe size={16} />
            <SelectValue placeholder="Select language" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {availableLanguages.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {languageNames[lang]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
