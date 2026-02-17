import { useTranslation } from 'react-i18next';
import { LucideIcon } from 'lucide-react';

interface ButtonConfig {
    labelKey: string;
    icon: LucideIcon;
    onClick: () => void;
    color: string;
    hoverColor: string;
    size?: number;
}

interface GameButtonsProps {
    buttons: ButtonConfig[];
}

export const GameButtons = ({ buttons }: GameButtonsProps) => {
    const { t } = useTranslation();

    return (
        <div className="flex gap-2 md:gap-4 mt-2 md:mt-4">
            {buttons.map((button, index) => (
                <button
                    key={index}
                    onClick={button.onClick}
                    className={`${button.color} ${button.hoverColor} text-white font-bold rounded-lg shadow-lg transform transition active:scale-95 text-xs md:text-sm flex items-center gap-1 px-4 py-2 md:px-6 md:py-2`}
                >
                    {t(button.labelKey)}
                    <button.icon size={button.size || 16} />
                </button>
            ))}
        </div>
    );
};
