import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface GameOverMessageProps {
    turn: 'w' | 'b';
    isCheckmate: boolean;
    isDraw: boolean;
}

export function GameOverMessage({ turn, isCheckmate, isDraw }: GameOverMessageProps) {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-bold text-center"
        >
            {isCheckmate ? (
                <span className="text-primary-600">🎉 {turn === 'w' ? t('gameInfo.gameOverBlack') : t('gameInfo.gameOverWhite')} 🎉</span>
            ) : isDraw ? (
                <span className="text-text-600">{t('gameInfo.draw')} 🤝</span>
            ) : null}
        </motion.div>
    );
}
