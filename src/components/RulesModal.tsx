import { motion, AnimatePresence } from 'framer-motion';

interface RulesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function RulesModal({ isOpen, onClose }: RulesModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-9999 flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border-4 border-orange-400 relative overflow-y-auto max-h-[90vh]"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-3xl hover:scale-110 transition-transform"
                    >
                        ❌
                    </button>

                    <h2 className="text-3xl font-extrabold text-orange-600 mb-6 text-center">How to Play? 🤔</h2>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 bg-orange-50 p-4 rounded-xl">
                            <span className="text-4xl">♟️</span>
                            <div>
                                <h3 className="font-bold text-xl text-orange-800">Pawn</h3>
                                <p className="text-sm text-slate-600">Moves forward one step. Captures diagonally!</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-xl">
                            <span className="text-4xl">🏰</span>
                            <div>
                                <h3 className="font-bold text-xl text-blue-800">Rook</h3>
                                <p className="text-sm text-slate-600">Moves in straight lines (up, down, left, right)!</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-purple-50 p-4 rounded-xl">
                            <span className="text-4xl">🐴</span>
                            <div>
                                <h3 className="font-bold text-xl text-purple-800">Knight</h3>
                                <p className="text-sm text-slate-600">Jumps in an 'L' shape! Can jump over others.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-yellow-50 p-4 rounded-xl">
                            <span className="text-4xl">👑</span>
                            <div>
                                <h3 className="font-bold text-xl text-yellow-800">King</h3>
                                <p className="text-sm text-slate-600">Most important! Usage one step in any direction. Don't lose him!</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={onClose}
                            className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg text-lg hover:bg-orange-600 transition-colors"
                        >
                            Got it! Let's Play! 🚀
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
