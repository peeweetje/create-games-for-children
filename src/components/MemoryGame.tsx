import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Confetti from 'react-confetti'

// Card types for the memory game
interface Card {
    id: number
    value: string
    isFlipped: boolean
    isMatched: boolean
}

// Available themes with different emojis
const THEMES = {
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'],
    fruits: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🍍', '🥝'],
    food: ['🍕', '🍔', '🍟', '🌭', '🍿', '🍩', '🍪', '🍫', '🍭', '🍦', '🍧', '🎂'],
    sports: ['⚽️', '🏀', '🏈', '⚾️', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸', '🏒', '🏑']
}

type ThemeType = keyof typeof THEMES

export const MemoryGame = () => {
    const { t } = useTranslation()
    const [theme, setTheme] = useState<ThemeType>('animals')
    const [cards, setCards] = useState<Card[]>([])
    const [flippedCards, setFlippedCards] = useState<number[]>([])
    const [moves, setMoves] = useState(0)
    const [matches, setMatches] = useState(0)
    const [isGameOver, setIsGameOver] = useState(false)
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })
    
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

    // Handle window resize for confetti
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

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
            {/* Game Stats */}
            <div className="flex justify-between items-center mb-4 md:mb-6">
                <div className="flex gap-4 text-lg font-semibold text-violet-700">
                    <span>{t('memory.moves')}: {moves}</span>
                    <span>{t('memory.matches')}: {matches}/6</span>
                </div>
                
                {/* Theme Selector */}
                <div className="flex flex-wrap gap-2">
                    {Object.keys(THEMES).map((themeKey) => (
                        <button
                            key={themeKey}
                            onClick={() => setTheme(themeKey as ThemeType)}
                            className={`px-2.5 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-base font-medium transition-all min-w-[80px] ${
                                theme === themeKey 
                                    ? 'bg-violet-500 text-white shadow-lg' 
                                    : 'bg-white text-gray-700 hover:bg-violet-200'
                            }`}
                        >
                            <span className="hidden md:inline mr-1">{THEMES[themeKey as ThemeType][0]}</span>
                            {t(`memory.themes.${themeKey}`)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Game Board */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
                {cards.map((card) => (
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
                ))}
            </div>

            {/* Game Over Modal */}
            {isGameOver && (
                <>
                    <Confetti 
                        width={windowSize.width} 
                        height={windowSize.height} 
                        recycle={false} 
                        numberOfPieces={500}
                    />
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl text-center max-w-sm w-full mx-4">
                            <div className="text-6xl mb-4">🎉</div>
                            <h2 className="text-2xl md:text-3xl font-bold text-violet-800 mb-2">
                                {t('memory.congratulations')}
                            </h2>
                            <p className="text-gray-600 mb-4">
                                {t('memory.completedIn', { moves })}
                            </p>
                            <button
                                onClick={initializeGame}
                                className="bg-violet-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-violet-600 transition-colors shadow-lg"
                            >
                                {t('memory.playAgain')}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}