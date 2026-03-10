import { Card } from './MemoryCard'
import { MemoryCard } from './MemoryCard'

interface MemoryBoardProps {
    cards: Card[]
    onCardClick: (id: number) => void
}

export const MemoryBoard = ({ cards, onCardClick }: MemoryBoardProps) => {
    return (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 mt-6 md:mt-8">
            {cards.map((card) => (
                <MemoryCard key={card.id} card={card} onClick={onCardClick} />
            ))}
        </div>
    )
}
