import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { PieceDropHandlerArgs, PieceHandlerArgs } from "react-chessboard";

interface ChessBoardProps {
    game: Chess;
    onPieceDrop: (sourceSquare: string, targetSquare: string, piece: string) => boolean;
    boardWidth?: number;
    moveSquares: Record<string, React.CSSProperties>;
    onSquareClick: (square: string) => void;
}

export function ChessBoard({ game, onPieceDrop, boardWidth = 400, moveSquares, onSquareClick }: ChessBoardProps) {

    function handlePieceDrop({ sourceSquare, targetSquare, piece }: PieceDropHandlerArgs) {
        return onPieceDrop(sourceSquare, targetSquare ?? "", piece.pieceType!);
    }

    function handleSquareClick({ square }: { square: string }) {
        onSquareClick(square);
    }

    function handlePieceDragBegin({ square }: PieceHandlerArgs) {
        onSquareClick(square);
    }

    return (
        <div
            className="p-4 bg-violet-50 rounded-xl shadow-inner border-4 border-violet-300 overflow-hidden"
            style={{ width: boardWidth }}
        >
            <Chessboard
                options={{
                    id: "ChessBoard",
                    position: game.fen(),
                    onPieceDrop: handlePieceDrop,
                    onSquareClick: handleSquareClick,
                    onPieceDrag: handlePieceDragBegin,
                    squareStyles: moveSquares,
                    darkSquareStyle: { backgroundColor: "oklch(71.4% 0.203 305.504)" },
                    lightSquareStyle: { backgroundColor: "oklch(94.3% 0.029 294.588)" },
                    animationDurationInMs: 200,
                }}
            />
        </div>
    );
}
