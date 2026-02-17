import { TurnIndicator } from './TurnIndicator';
import { GameOverMessage } from './GameOverMessage';

interface GameInfoProps {
    turn: 'w' | 'b';
    isGameOver: boolean;
    isCheckmate: boolean;
    isDraw: boolean;
}

export function GameInfo({ turn, isGameOver, isCheckmate, isDraw }: GameInfoProps) {
    return (
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-lg border-2 border-orange-200">
            {isGameOver ? (
                <GameOverMessage 
                    turn={turn} 
                    isCheckmate={isCheckmate} 
                    isDraw={isDraw} 
                />
            ) : (
                <TurnIndicator turn={turn} />
            )}
        </div>
    );
}
