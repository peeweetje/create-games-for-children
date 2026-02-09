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
        <div className={`flex items-center gap-3 ${bgColor} p-3 rounded-xl`}>
            <span className="text-3xl">{emoji}</span>
            <div>
                <h3 className={`font-bold text-lg ${textColor}`}>{t(titleKey)}</h3>
                <p className="text-xs text-slate-600">{t(descKey)}</p>
            </div>
        </div>
    );
}
