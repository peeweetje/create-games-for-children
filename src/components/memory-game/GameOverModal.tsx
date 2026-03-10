import { useTranslation } from 'react-i18next'

interface GameOverModalProps {
    isGameOver: boolean
    moves: number
    onPlayAgain: () => void
}

export const GameOverModal = ({ isGameOver, moves, onPlayAgain }: GameOverModalProps) => {
    const { t } = useTranslation()
    
    if (!isGameOver) return null
    
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl text-center max-w-sm w-full mx-4">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl md:text-3xl font-bold text-violet-800 mb-2">
                    {t('memory.congratulations')}
                </h2>
                <p className="text-gray-600 mb-4">
                    {t('memory.completedIn', { moves })}
                </p>
                <button
                    onClick={onPlayAgain}
                    className="bg-violet-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-violet-600 transition-colors shadow-lg"
                >
                    {t('memory.playAgain')}
                </button>
            </div>
        </div>
    )
}