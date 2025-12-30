import { Chessboard } from "react-chessboard";

export function ChessBoard({ game, onPieceDrop, boardWidth = 400 }) {

    const customBoardStyle = {
        borderRadius: "8px",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    };

    const customDarkSquareStyle = { backgroundColor: "#FFB067" }; // Soft orange
    const customLightSquareStyle = { backgroundColor: "#FFF4E0" }; // Creamy white

    return (
        <div className="p-4 bg-orange-100 rounded-xl shadow-inner border-4 border-orange-300">
            <Chessboard
                id="ChessBoard"
                position={game.fen()}
                onPieceDrop={onPieceDrop}
                boardWidth={boardWidth}
                customDarkSquareStyle={customDarkSquareStyle}
                customLightSquareStyle={customLightSquareStyle}
                customBoardStyle={customBoardStyle}
                animationDuration={200}
            />
        </div>
    );
}
