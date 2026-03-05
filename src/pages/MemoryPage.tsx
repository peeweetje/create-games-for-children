import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RefreshCcw } from 'lucide-react'
import { GameButtons } from '../components/buttons/GameButtons'
import { MemoryGame } from '../components/MemoryGame'

export const MemoryPage = () => {
    const { t } = useTranslation()
    const [gameKey, setGameKey] = useState(0)

    const handleNewGame = () => {
        setGameKey(prev => prev + 1)
    }

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mt-8 mx-auto p-2 pb-24 md:pb-4 md:p-4">
            <main className="w-full max-w-2xl flex flex-col items-center gap-4 md:gap-6">
                <div className="w-full flex justify-between items-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-violet-800">
                        {t('memory.title')}
                    </h1>
                    <div className="flex gap-2">
                        <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm">
                            {t('memory.description')}
                        </span>
                    </div>
                </div>

                <div className="w-full border-4 md:border-8 border-white rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl p-2 md:p-4 bg-gradient-to-br from-violet-50 to-fuchsia-50">
                    <MemoryGame key={gameKey} />
                </div>

                <GameButtons 
                    buttons={[
                        {
                            labelKey: 'app.newGame',
                            icon: RefreshCcw,
                            onClick: handleNewGame,
                            color: 'bg-violet-500',
                            hoverColor: 'hover:bg-violet-600',
                            size: 18,
                        },
                    ]}
                />
               
            </main>
        </div>
    )
}