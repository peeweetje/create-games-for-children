import { useTranslation } from 'react-i18next';

interface RuleItemProps {
    emoji: string;
    titleKey: string;
    descKey: string;
    bgColor: string;
    textColor: string;
}

export function RuleItem({ emoji, titleKey, descKey, bgColor, textColor }: RuleItemProps) {
    const { t } = useTranslation();
    return (
        <div className={`flex items-center gap-2 ${bgColor} p-2 md:p-3 rounded-lg md:rounded-xl`}>
            <span className="text-2xl md:text-3xl">{emoji}</span>
            <div>
                <h3 className={`font-bold text-sm md:text-lg ${textColor}`}>{t(titleKey)}</h3>
                <p className="text-[10px] md:text-xs text-slate-600">{t(descKey)}</p>
            </div>
        </div>
    );
}
