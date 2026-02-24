import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface MascotProps {
    isCheckmate: boolean;
    isCheck: boolean;
    turn: 'w' | 'b';
}

export function Mascot({ isCheckmate, isCheck, turn }: MascotProps) {
    const { t } = useTranslation();
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Initialize message after translation is ready
        setMessage(t('mascot.welcome') + " 🦁");
    }, [t]);

    useEffect(() => {
        const TIPS = [
            t('mascot.tips.rook') + " 🏰",
            t('mascot.tips.bishop') + " ♝",
            t('mascot.tips.knight') + " 🐴",
            t('mascot.tips.king') + " 👑",
            t('mascot.tips.center') + " 🎯",
            t('mascot.tips.pawn') + " ♟️"
        ];

        if (isCheckmate) {
            setMessage(t('mascot.gameOver') + " 🎉");
        } else if (isCheck) {
            setMessage(t('mascot.check') + " 😱");
        } else if (turn === 'w') {
            setMessage(t('mascot.yourTurn') + " 🤔");
        } else {
            setMessage(TIPS[Math.floor(Math.random() * TIPS.length)]);
        }
    }, [turn, isCheck, isCheckmate, t]);

    return (
        <div className="fixed bottom-20 md:bottom-4 right-4 flex items-end max-w-[200px] pointer-events-none md:pointer-events-auto z-40">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={message}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-white p-4 rounded-2xl rounded-br-none shadow-xl border-2 border-violet-300 mb-2 mr-2"
                >
                    <p className="text-sm font-comic font-medium text-slate-700 leading-snug">
                        {message}
                    </p>
                </motion.div>
            </AnimatePresence>
            <div className="text-4xl md:text-6xl filter drop-shadow-lg transform hover:scale-110 transition-transform cursor-pointer" role="img" aria-label="Lion Mascot">
                🦁
            </div>
        </div>
    );
}
