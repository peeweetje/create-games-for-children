import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface RulesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function RulesModal({ isOpen, onClose }: RulesModalProps) {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-white rounded-3xl p-4 md:p-6 max-w-lg w-full shadow-2xl border-4 border-orange-400 relative overflow-y-auto max-h-[85vh]"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-2xl hover:scale-110 transition-transform"
                    >
                        ❌
                    </button>

                    <h2 className="text-2xl font-extrabold text-orange-600 mb-4 text-center">{t('rules.title')} 🤔</h2>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-orange-50 p-3 rounded-xl">
                            <span className="text-3xl">♟️</span>
                            <div>
                                <h3 className="font-bold text-lg text-orange-800">{t('rules.pawn')}</h3>
                                <p className="text-xs text-slate-600">{t('rules.pawnDesc')}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-xl">
                            <span className="text-3xl">🏰</span>
                            <div>
                                <h3 className="font-bold text-lg text-blue-800">{t('rules.rook')}</h3>
                                <p className="text-xs text-slate-600">{t('rules.rookDesc')}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-xl">
                            <span className="text-3xl">🐴</span>
                            <div>
                                <h3 className="font-bold text-lg text-purple-800">{t('rules.knight')}</h3>
                                <p className="text-xs text-slate-600">{t('rules.knightDesc')}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded-xl">
                            <span className="text-3xl">♝</span>
                            <div>
                                <h3 className="font-bold text-lg text-green-800">{t('rules.bishop')}</h3>
                                <p className="text-xs text-slate-600">{t('rules.bishopDesc')}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-red-50 p-3 rounded-xl">
                            <span className="text-3xl">♛</span>
                            <div>
                                <h3 className="font-bold text-lg text-red-800">{t('rules.queen')}</h3>
                                <p className="text-xs text-slate-600">{t('rules.queenDesc')}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded-xl">
                            <span className="text-3xl">👑</span>
                            <div>
                                <h3 className="font-bold text-lg text-yellow-800">{t('rules.king')}</h3>
                                <p className="text-xs text-slate-600">{t('rules.kingDesc')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 text-center">
                        <button
                            onClick={onClose}
                            className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full shadow-lg text-base hover:bg-orange-600 transition-colors"
                        >
                            {t('rules.gotIt')} 🚀
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
