import { useState, useEffect, useRef } from 'react'
import { Card } from './memory-game/MemoryCard'
import { GameStats } from './memory-game/GameStats'
import { ThemeSelector } from './memory-game/ThemeSelector'
import { MemoryBoard } from './memory-game/MemoryBoard'
import { GameOverModal } from './memory-game/GameOverModal'
import { ThemeType, THEMES } from './memory-game/ThemeSelector'

export const MemoryGame = () => {
    const [theme, setTheme] = useState<ThemeType>('animals')
    const [cards, setCards] = useState<Card[]>([])
    const [flippedCards, setFlippedCards] = useState<number[]>([])
    const [moves, setMoves] = useState(0)
    const [matches, setMatches] = useState(0)
    const [isGameOver, setIsGameOver] = useState(false)
    
    // Refs for timeout management
    const matchTimeoutRef = useRef<number | null>(null)

    // Clear any existing timeout
    const clearExistingTimeout = () => {
        if (matchTimeoutRef.current !== null) {
            clearTimeout(matchTimeoutRef.current)
            matchTimeoutRef.current = null
        }
    }

    // Initialize game
    const initializeGame = () => {
        // Clear any existing timeout before resetting the game
        clearExistingTimeout()
        
        const selectedTheme = THEMES[theme]
        const pairs = selectedTheme.slice(0, 6) // Use 6 pairs = 12 cards
        const deck = [...pairs, ...pairs]
            .sort(() => Math.random() - 0.5)
            .map((value, index) => ({
                id: index,
                value,
                isFlipped: false,
                isMatched: false
            }))
        
        setCards(deck)
        setFlippedCards([])
        setMoves(0)
        setMatches(0)
        setIsGameOver(false)
    }

    // Handle card flip
    const handleCardClick = (id: number) => {
        // Don't allow clicking if already flipped or matched
        const card = cards.find(c => c.id === id)
        if (!card || card.isFlipped || card.isMatched || flippedCards.length === 2) {
            return
        }
        
        // Flip the card
        setCards(prev => prev.map(c => 
            c.id === id ? { ...c, isFlipped: true } : c
        ))
        
        setFlippedCards(prev => [...prev, id])
    }

    // Check for matches
    useEffect(() => {
        if (flippedCards.length !== 2) return

        const [firstId, secondId] = flippedCards
        const firstCard = cards.find(c => c.id === firstId)
        const secondCard = cards.find(c => c.id === secondId)
        const isMatch = !!firstCard && !!secondCard && firstCard.value === secondCard.value
        
        setMoves(prev => prev + 1)

        // Clear any existing timeout before setting a new one
        clearExistingTimeout()

        const timeoutId = window.setTimeout(() => {
            if (isMatch) {
                setCards(prev => prev.map(c =>
                    c.id === firstId || c.id === secondId
                        ? { ...c, isMatched: true }
                        : c
                ))
                setMatches(prev => prev + 1)
            } else {
                setCards(prev => prev.map(c =>
                    c.id === firstId || c.id === secondId
                        ? { ...c, isFlipped: false }
                        : c
                ))
            }
            setFlippedCards([])
        }, isMatch ? 500 : 1000)

        // Store the timeout ID and return cleanup function
        matchTimeoutRef.current = timeoutId
        return () => window.clearTimeout(timeoutId)
    }, [flippedCards, cards])

    // Check if game is over
    useEffect(() => {
        if (matches === 6) {
            setIsGameOver(true)
        }
    }, [matches])

    // Initialize game on mount and theme change
    useEffect(() => {
        initializeGame()
    }, [theme])

    // Cleanup on component unmount
    useEffect(() => {
        return () => {
            clearExistingTimeout()
        }
    }, [])

    return (
        <div className="w-full">
            <GameStats moves={moves} matches={matches} />
            <ThemeSelector theme={theme} onThemeChange={setTheme} />
            <MemoryBoard cards={cards} onCardClick={handleCardClick} />
            <GameOverModal 
                isGameOver={isGameOver} 
                moves={moves} 
                onPlayAgain={initializeGame} 
            />
        </div>
    )
}
