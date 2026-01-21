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

    const customBoardStyle = {
        borderRadius: "8px",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    };

    const customDarkSquareStyle = { backgroundColor: "#FFB067" }; // Soft orange
    const customLightSquareStyle = { backgroundColor: "#FFF4E0" }; // Creamy white

    function handlePieceDrop({ sourceSquare, targetSquare, piece }: PieceDropHandlerArgs) {
        return onPieceDrop(sourceSquare, targetSquare || "", piece.pieceType!);
    }

    function handleSquareClick({ square }: { square: string }) {
        onSquareClick(square);
    }

    function handlePieceDragBegin({ square }: PieceHandlerArgs) {
        onSquareClick(square);
    }

    return (
        <div className="p-4 bg-orange-100 rounded-xl shadow-inner border-4 border-orange-300" style={{ width: boardWidth }}>
            <Chessboard
                options={{
                    id: "ChessBoard",
                    position: game.fen(),
                    onPieceDrop: handlePieceDrop,
                    onSquareClick: handleSquareClick,
                    onPieceDrag: handlePieceDragBegin,
                    squareStyles: moveSquares,
                    boardStyle: customBoardStyle,
                    darkSquareStyle: customDarkSquareStyle,
                    lightSquareStyle: customLightSquareStyle,
                    animationDurationInMs: 200,
                }}
            />
        </div>
    );
}
