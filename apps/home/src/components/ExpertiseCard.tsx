
import React from 'react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ExpertiseCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  modalTitleKey?: string;
  modalDescriptionKey?: string;
}

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({
  title,
  description,
  icon,
  modalTitleKey,
  modalDescriptionKey
}) => {
  const [open, setOpen] = React.useState(false);
  const { t } = useLanguage();
  
  return (
    <>
      <div className="glass-card p-6 flex flex-col items-center hover-lift">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-dark-300 text-gold-100 mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <p className="text-sm text-gray-400 text-center">{description}</p>
        <div className="mt-6">
          <button 
            onClick={() => setOpen(true)}
            className="text-sm text-gold-100 hover:text-gold-200 transition-colors flex items-center"
          >
            <span>{t('learnMore')}</span>
            <ArrowRight className="ml-1 w-4 h-4" />
          </button>
        </div>
      </div>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-dark-200 border-dark-300">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white">
              {modalTitleKey ? t(modalTitleKey) : title}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-gray-300 mt-4">
            {modalDescriptionKey ? t(modalDescriptionKey) : "Detailed information will be provided soon."}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExpertiseCard;
