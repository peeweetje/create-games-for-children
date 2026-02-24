import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { RuleItem } from './RuleItem';
import { CloseButton } from './buttons/CloseButton';

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
                    className="bg-white rounded-xl p-3 md:p-6 max-w-sm md:max-w-lg w-full shadow-2xl border-2 md:border-4 border-orange-400 relative overflow-y-auto max-h-[80vh] md:max-h-[85vh]"
                >
                    <CloseButton 
                        onClick={onClose} 
                        icon={X}
                        size={28}
                        strokeWidth={3}
                        className="absolute top-2 right-2 p-1 hover:scale-110 transition-transform text-violet-500 hover:text-violet-600" 
                    />

                    <h2 className="text-2xl font-extrabold text-violet-600 mb-4 text-center">{t('rules.title')} 🤔</h2>

                    <div className="space-y-3">
                        {RULE_ITEMS.map((item) => (
                            <RuleItem key={item.titleKey} {...item} />
                        ))}
                    </div>

                    <div className="text-center">
                        <CloseButton
                            onClick={onClose}
                            showIcon={false}
                            className="mt-4 bg-violet-500 text-white font-bold py-2 px-6 rounded-full shadow-lg text-base hover:bg-violet-600 transition-colors"
                        >
                            {t('rules.gotIt')} 🚀
                        </CloseButton>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
