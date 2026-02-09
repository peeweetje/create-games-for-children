import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { RuleItem } from './RuleItem';

interface RulesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface RuleItemData {
    emoji: string;
    titleKey: string;
    descKey: string;
    bgColor: string;
    textColor: string;
}

const RULE_ITEMS: RuleItemData[] = [
    { emoji: '♟️', titleKey: 'rules.pawn', descKey: 'rules.pawnDesc', bgColor: 'bg-orange-50', textColor: 'text-orange-800' },
    { emoji: '🏰', titleKey: 'rules.rook', descKey: 'rules.rookDesc', bgColor: 'bg-blue-50', textColor: 'text-blue-800' },
    { emoji: '🐴', titleKey: 'rules.knight', descKey: 'rules.knightDesc', bgColor: 'bg-purple-50', textColor: 'text-purple-800' },
    { emoji: '♝', titleKey: 'rules.bishop', descKey: 'rules.bishopDesc', bgColor: 'bg-green-50', textColor: 'text-green-800' },
    { emoji: '♛', titleKey: 'rules.queen', descKey: 'rules.queenDesc', bgColor: 'bg-red-50', textColor: 'text-red-800' },
    { emoji: '👑', titleKey: 'rules.king', descKey: 'rules.kingDesc', bgColor: 'bg-yellow-50', textColor: 'text-yellow-800' },
];

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
                        {RULE_ITEMS.map((item) => (
                            <RuleItem key={item.titleKey} {...item} />
                        ))}
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
