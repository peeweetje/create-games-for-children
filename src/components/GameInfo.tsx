import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface GameInfoProps {
    turn: 'w' | 'b';
    isGameOver: boolean;
    isCheckmate: boolean;
    isDraw: boolean;
}

export function GameInfo({ turn, isGameOver, isCheckmate }: GameInfoProps) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-lg border-2 border-orange-200">
            {isGameOver ? (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-center"
                >
                    {isCheckmate ? (
                        <span className="text-purple-600">🎉 {turn === 'w' ? t('gameInfo.gameOverBlack') : t('gameInfo.gameOverWhite')} 🎉</span>
                    ) : (
                        <span className="text-gray-600">{t('gameInfo.draw')} 🤝</span>
                    )}
                </motion.div>
            ) : (
                <div className="flex items-center gap-4">
                    <span className="text-xl font-bold text-orange-800">{t('gameInfo.turn')}</span>
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className={`px-3 py-1 md:px-6 md:py-2 rounded-full font-bold text-white shadow-md text-xs sm:text-sm md:text-base min-w-[140px] md:min-w-[200px] text-center ${turn === 'w' ? 'bg-orange-400' : 'bg-gray-700'
                            }`}
                    >
                        {turn === 'w' ? t('gameInfo.whiteTurn') : t('gameInfo.blackTurn')}
                    </motion.div>
                </div>
            )}
        </div>
    );
}
