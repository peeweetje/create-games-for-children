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

    return (
        <motion.button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square cursor-pointer rounded-xl md:rounded-2xl shadow-lg ${
                card.isMatched
                    ? 'opacity-50 cursor-default'
                    : 'bg-gradient-to-br from-purple-200 to-violet-200'
            }`}
            whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.05 }}
            animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Back of card - always visible when face down */}
            <div
                className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-inner"
                style={{ backfaceVisibility: 'hidden' }}
            >
                <div className="w-4 h-4 md:w-6 md:h-6 bg-white rounded-full opacity-50"></div>
            </div>
            
            {/* Front of card - always visible when face up */}
            <div
                className="absolute inset-0 w-full h-full rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-4xl font-bold"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
                <span>{card.value}</span>
            </div>
        </motion.button>
    )
}