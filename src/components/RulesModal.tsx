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
                    className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border-4 border-orange-400 relative overflow-y-auto max-h-[90vh]"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-3xl hover:scale-110 transition-transform"
                    >
                        ❌
                    </button>

                    <h2 className="text-3xl font-extrabold text-orange-600 mb-6 text-center">{t('rules.title')} 🤔</h2>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 bg-orange-50 p-4 rounded-xl">
                            <span className="text-4xl">♟️</span>
                            <div>
                                <h3 className="font-bold text-xl text-orange-800">{t('rules.pawn')}</h3>
                                <p className="text-sm text-slate-600">{t('rules.pawnDesc')}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-xl">
                            <span className="text-4xl">🏰</span>
                            <div>
                                <h3 className="font-bold text-xl text-blue-800">{t('rules.rook')}</h3>
                                <p className="text-sm text-slate-600">{t('rules.rookDesc')}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-purple-50 p-4 rounded-xl">
                            <span className="text-4xl">🐴</span>
                            <div>
                                <h3 className="font-bold text-xl text-purple-800">{t('rules.knight')}</h3>
                                <p className="text-sm text-slate-600">{t('rules.knightDesc')}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-yellow-50 p-4 rounded-xl">
                            <span className="text-4xl">👑</span>
                            <div>
                                <h3 className="font-bold text-xl text-yellow-800">{t('rules.king')}</h3>
                                <p className="text-sm text-slate-600">{t('rules.kingDesc')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={onClose}
                            className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg text-lg hover:bg-orange-600 transition-colors"
                        >
                            {t('rules.gotIt')} 🚀
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
