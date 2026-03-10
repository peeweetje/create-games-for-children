import { useTranslation } from 'react-i18next'

interface GameStatsProps {
    moves: number
    matches: number
}

export const GameStats = ({ moves, matches }: GameStatsProps) => {
    const { t } = useTranslation()
    
    return (
        <div className="flex justify-between items-center mb-4 md:mb-6">
            <div className="flex gap-4 text-lg font-semibold text-violet-700">
                <span>{t('memory.moves')}: {moves}</span>
                <span>{t('memory.matches')}: {matches}/6</span>
            </div>
        </div>
    )
}