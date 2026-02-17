import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface TurnIndicatorProps {
    turn: 'w' | 'b';
}

export function TurnIndicator({ turn }: TurnIndicatorProps) {
    const { t } = useTranslation();

    return (
        <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-orange-800">{t('gameInfo.turn')}</span>
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`px-3 py-1 md:px-4 md:py-1 rounded-lg font-bold text-white shadow-md text-xs sm:text-sm md:text-base min-w-[120px] md:min-w-[160px] text-center ${turn === 'w' ? 'bg-orange-400' : 'bg-gray-700'
                    }`}
            >
                {turn === 'w' ? t('gameInfo.whiteTurn') : t('gameInfo.blackTurn')}
            </motion.div>
        </div>
    );
}
