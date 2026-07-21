import { motion } from 'framer-motion'
import flipSoundUrl from '../../assets/sounds/capture.mp3'

export interface Card {
    id: number
    value: string
    isFlipped: boolean
    isMatched: boolean
}

interface MemoryCardProps {
    card: Card
    onClick: (id: number) => void
}

export const MemoryCard = ({ card, onClick }: MemoryCardProps) => {
    const handleCardClick = (id: number) => {
        // Play flip sound when card is flipped
        const audio = new Audio(flipSoundUrl)
        audio.volume = 0.3
        audio.play().catch(() => {
            // Ignore autoplay errors
        })
        onClick(id)
    }

    const isFaceUp = card.isFlipped || card.isMatched

    return (
        <motion.button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className="aspect-square cursor-pointer rounded-xl md:rounded-2xl shadow-lg"
            whileHover={{ scale: isFaceUp ? 1 : 1.05 }}
            animate={{ rotateY: isFaceUp ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Back of card - always visible when face down */}
            <div
                className="absolute inset-0 w-full h-full bg-gradient-to-br from-accent-500 to-primary-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-inner"
                style={{ backfaceVisibility: 'hidden' }}
            >
                <div className="w-4 h-4 md:w-6 md:h-6 bg-white rounded-full opacity-50"></div>
            </div>
            
            {/* Front of card - always visible when face up */}
            <div
                className={`absolute inset-0 w-full h-full rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-4xl font-bold transition-colors duration-300 ${
                    card.isMatched
                        ? 'bg-gradient-to-br from-green-300 to-emerald-500 ring-4 ring-green-400 ring-offset-2'
                        : 'bg-gradient-to-br from-accent-200 to-primary-200'
                }`}
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
                {card.isMatched ? (
                    <span className="flex flex-col items-center gap-1">
                        <span className="text-3xl md:text-5xl">{card.value}</span>
                        <span className="text-green-700 text-lg md:text-xl">✓</span>
                    </span>
                ) : (
                    <span>{card.value}</span>
                )}
            </div>
        </motion.button>
    )
}