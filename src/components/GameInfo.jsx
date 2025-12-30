import { motion } from 'framer-motion';

export function GameInfo({ turn, isGameOver, isCheckmate, isDraw }) {
    return (
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-lg border-2 border-orange-200">
            {isGameOver ? (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-center"
                >
                    {isCheckmate ? (
                        <span className="text-purple-600">🎉 Game Over! {turn === 'w' ? "Black" : "White"} Wins! 🎉</span>
                    ) : (
                        <span className="text-gray-600">It's a Draw! 🤝</span>
                    )}
                </motion.div>
            ) : (
                <div className="flex items-center gap-4">
                    <span className="text-xl font-bold text-orange-800">Turn:</span>
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className={`px-6 py-2 rounded-full font-bold text-white shadow-md ${turn === 'w' ? 'bg-amber-400' : 'bg-slate-700'
                            }`}
                    >
                        {turn === 'w' ? "White (You)" : "Black (Opponent)"}
                    </motion.div>
                </div>
            )}
        </div>
    );
}
