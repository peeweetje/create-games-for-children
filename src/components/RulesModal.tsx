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
    { emoji: '♟️', titleKey: 'rules.pawn', descKey: 'rules.pawnDesc', bgColor: 'bg-streak/10 border-streak', textColor: 'text-streak-600' },
    { emoji: '🏰', titleKey: 'rules.rook', descKey: 'rules.rookDesc', bgColor: 'bg-info/10 border-info', textColor: 'text-info-600' },
    { emoji: '🐴', titleKey: 'rules.knight', descKey: 'rules.knightDesc', bgColor: 'bg-primary/10 border-primary', textColor: 'text-primary-600' },
    { emoji: '♝', titleKey: 'rules.bishop', descKey: 'rules.bishopDesc', bgColor: 'bg-success/10 border-success', textColor: 'text-success-600' },
    { emoji: '♛', titleKey: 'rules.queen', descKey: 'rules.queenDesc', bgColor: 'bg-error/10 border-error', textColor: 'text-error' },
    { emoji: '👑', titleKey: 'rules.king', descKey: 'rules.kingDesc', bgColor: 'bg-star/10 border-star', textColor: 'text-star-600' },
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
                    className="bg-surface rounded-xl p-3 md:p-6 max-w-sm md:max-w-lg w-full shadow-2xl border-2 md:border-4 border-streak relative overflow-y-auto max-h-[80vh] md:max-h-[85vh]"
                >
                    <CloseButton 
                        onClick={onClose} 
                        icon={X}
                        size={28}
                        strokeWidth={3}
                    className="absolute top-2 right-2 p-1 hover:scale-110 transition-transform text-primary hover:text-primary-600" 
                    />

                    <h2 className="text-2xl font-extrabold text-primary-600 mb-4 text-center">{t('rules.title')} 🤔</h2>

                    <div className="space-y-3">
                        {RULE_ITEMS.map((item) => (
                            <RuleItem key={item.titleKey} {...item} />
                        ))}
                    </div>

                    <div className="text-center">
                        <CloseButton
                            onClick={onClose}
                            showIcon={false}
                            className="mt-4 bg-primary text-text-inverse font-bold py-2 px-6 rounded-full shadow-lg text-base hover:bg-primary-600 transition-colors"
                        >
                            {t('rules.gotIt')} 🚀
                        </CloseButton>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
