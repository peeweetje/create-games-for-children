import { useState } from 'react';
import { ChessPuzzle } from '@react-chess-tools/react-chess-puzzle';
import Confetti from 'react-confetti';
import { Trophy, ArrowRight, RefreshCw } from 'lucide-react';

const SAMPLE_PUZZLES = [
    {
        fen: "4r3/R7/1R6/2p2p1k/5P1P/7K/8/8 w - - 0 1",
        moves: ["b6h6"],
        description: "Mate in 1: Find the winning move for White!",
        hint: "Look for a checkmate with the rook."
    },
    {
        fen: "1r6/p1p3kp/2p1qp2/8/3Q4/BP6/P1P2PPP/4R1K1 w - - 0 1",
        moves: ["e1e6"],
        description: "White to move: Capture the hanging piece!",
        hint: "The black queen is undefended."
    },
    {
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 1",
        moves: ["h5f7"],
        description: "Mate in 1: Scholar's Mate pattern.",
        hint: "Target the weak f7 pawn."
    },
    {
        fen: "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1",
        moves: ["e1e8"],
        description: "Mate in 1: Back rank checkmate!",
        hint: "The black king is trapped behind his own pawns."
    },
    {
        fen: "rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 1",
        moves: ["d8h4"],
        description: "Mate in 1: Fool's Mate pattern.",
        hint: "Look for a checkmate on the open diagonal."
    },
    {
        fen: "r1b1k2r/ppppqppp/2n2n2/4p3/1b2P3/2NP1N2/PPP1BPPP/R1BQK2R w KQkq - 0 1",
        moves: ["c1d2"],
        description: "Escape the pin!",
        hint: "Unpin your knight by developing a piece."
    },
    {
        fen: "r3k2r/ppp2ppp/2n5/3q4/3P4/5N2/PP2QPPP/R1B1K2R b KQkq - 0 1",
        moves: ["c6e7"],
        description: "Block the check!",
        hint: "Develop a piece to block the check."
    },
    {
        fen: "8/8/8/8/8/6k1/4Kp2/8 b - - 0 1",
        moves: ["g3g2"],
        description: "Black to move: Promote the pawn!",
        hint: "Move your king to support the pawn promotion."
    },
    {
        fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1",
        moves: ["g8f6"],
        description: "Develop your pieces!",
        hint: "Bring your knight out to control the center."
    },
    {
        fen: "r2qk2r/ppp2ppp/2n5/3pP3/3P1nb1/2N2N2/PP2BPPP/R2Q1RK1 b kq - 0 1",
        moves: ["f4e2"],
        description: "Remove the defender!",
        hint: "Capture the piece defending the knight."
    },
    {
        fen: "r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 1",
        moves: ["e1g1"],
        description: "Castle to safety!",
        hint: "Move your king to a safer position."
    },
    {
        fen: "3r4/2k5/8/8/7P/2K5/8/3R4 w - - 0 1",
        moves: ["d1d8"],
        description: "Simplify the position!",
        hint: "Trade rooks to enter a winning endgame."
    },
    {
        fen: "7k/8/8/8/8/8/6PP/7K w - - 0 1",
        moves: ["h1g1"],
        description: "King safety!",
        hint: "Move your king away from the corner."
    },
    {
        fen: "rnbq1rk1/pp2ppbp/3p1np1/2p5/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 1",
        moves: ["d4d5"],
        description: "Control the center!",
        hint: "Push your pawn to gain space."
    },
    {
        fen: "r1bq1rk1/pppp1ppp/2n2n2/4p3/1b2P3/2NP1N2/PPP1BPPP/R1BQK2R w KQ - 0 1",
        moves: ["c1g5"],
        description: "Pin the knight!",
        hint: "Develop your bishop to pin the knight to the queen."
    },
    {
        fen: "r3k2r/ppp2ppp/2n5/8/1b1P4/5N2/PP2BPPP/R1B1K2R w KQkq - 0 1",
        moves: ["c1d2"],
        description: "Defend against the check!",
        hint: "Block the check with your bishop."
    },
    {
        fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 1",
        moves: ["d2d3"],
        description: "Solidify your position!",
        hint: "Support your center pawn."
    },
    {
        fen: "r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P1n1/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 1",
        moves: ["h2h3"],
        description: "Kick the knight!",
        hint: "Attack the knight with a pawn."
    },
    {
        fen: "r1bq1rk1/pppp1ppp/2n2n2/4p3/1b2P3/2NP1N2/PPP1BPPP/R1BQK2R w KQ - 0 1",
        moves: ["a2a3"],
        description: "Challenge the bishop!",
        hint: "Force the bishop to move or exchange."
    },
    {
        fen: "r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R w KQ - 0 1",
        moves: ["c1g5"],
        description: "Active development!",
        hint: "Develop your bishop to an active square."
    }
];

export const PuzzlesPage = () => {
    const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [key, setKey] = useState(0); // Used to reset the puzzle component

    const currentPuzzle = SAMPLE_PUZZLES[currentPuzzleIndex];

    const handleNextPuzzle = () => {
        const nextIndex = (currentPuzzleIndex + 1) % SAMPLE_PUZZLES.length;
        setCurrentPuzzleIndex(nextIndex);
        setShowConfetti(false);
        setKey(prev => prev + 1);
    };

    const handleReset = () => {
        setKey(prev => prev + 1);
        setShowConfetti(false);
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-orange-50 min-h-full">
            {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

            <div className="max-w-4xl w-full flex flex-col items-center gap-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold text-orange-600 flex items-center justify-center gap-3">
                        <Trophy className="w-10 h-10" />
                        Chess Puzzles
                    </h1>
                    <p className="text-xl text-gray-700 font-medium">
                        Puzzle {currentPuzzleIndex + 1} of {SAMPLE_PUZZLES.length}
                    </p>
                    <p className="text-gray-600">{currentPuzzle.description}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
                    <div className="aspect-square w-full">
                        <ChessPuzzle.Root
                            key={key}
                            puzzle={currentPuzzle}
                            onSolve={() => setShowConfetti(true)}
                        >
                            <ChessPuzzle.Board />
                            {/* Hidden hints component if needed, or custom UI below */}
                        </ChessPuzzle.Root>
                    </div>

                    <div className="mt-6 flex gap-4 justify-center">
                        <button
                            onClick={handleReset}
                            className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-bold transition-colors cursor-pointer"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Reset
                        </button>

                        {showConfetti && (
                            <button
                                onClick={handleNextPuzzle}
                                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all cursor-pointer animate-bounce"
                            >
                                Next Puzzle
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                    {/* Hint Text Display */}
                    <div className="mt-4 text-center ">
                        <p className="text-sm text-gray-500 italic">Hint: {currentPuzzle.hint}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
