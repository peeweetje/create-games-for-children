import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TIPS = [
    "Rooks move in straight lines! 🏰",
    "Bishops move diagonally! ♝",
    "Knights jump in an L-shape! 🐴",
    "Protect your King! 👑",
    "Control the center of the board! 🎯",
    "Pawns only move forward! ♟️"
];

interface MascotProps {
    isCheckmate: boolean;
    isCheck: boolean;
    turn: 'w' | 'b';
}

export function Mascot({ isCheckmate, isCheck, turn }: MascotProps) {
    const [message, setMessage] = useState("Hi! I'm Leo! Let's play Chess! 🦁");

    useEffect(() => {
        if (isCheckmate) {
            setMessage("Game Over! What a great game! 🎉");
        } else if (isCheck) {
            setMessage("Oh no! The King is in danger! (Check!) 😱");
        } else if (turn === 'w') {
            setMessage("Your turn! What will you do? 🤔");
        } else {
            setMessage(TIPS[Math.floor(Math.random() * TIPS.length)]);
        }
    }, [turn, isCheck, isCheckmate]);

    return (
        <div className="fixed bottom-4 right-4 flex items-end max-w-[200px] pointer-events-none md:pointer-events-auto">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={message}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-white p-4 rounded-2xl rounded-br-none shadow-xl border-2 border-orange-300 mb-2 mr-2"
                >
                    <p className="text-sm font-comic font-medium text-slate-700 leading-snug">
                        {message}
                    </p>
                </motion.div>
            </AnimatePresence>
            <div className="text-6xl filter drop-shadow-lg transform hover:scale-110 transition-transform cursor-pointer" role="img" aria-label="Lion Mascot">
                🦁
            </div>
        </div>
    );
}
