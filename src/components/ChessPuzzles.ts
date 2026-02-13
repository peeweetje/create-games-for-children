export type Difficulty = "easy" | "medium" | "hard";

export interface Puzzle {
    fen: string;
    moves: string[];
    descriptionKey: string;
    hintKey: string;
    difficulty: Difficulty;
}

export const SAMPLE_PUZZLES: Puzzle[] = [
    // ==================== EASY PUZZLES (1-25) ====================
    // Basic checkmates, simple captures, and straightforward tactics
    
    // Mate in 1 patterns - Easy
    {
        fen: "4r3/R7/1R6/2p2p1k/5P1P/7K/8/8 w - - 0 1",
        moves: ["b6h6"],
        descriptionKey: "puzzles.descriptions.mate1White",
        hintKey: "puzzles.hints.checkmateRook",
        difficulty: "easy"
    },
    {
        fen: "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1",
        moves: ["e1e8"],
        descriptionKey: "puzzles.descriptions.backRankMate",
        hintKey: "puzzles.hints.trappedKing",
        difficulty: "easy"
    },
    {
        fen: "rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 1",
        moves: ["d8h4"],
        descriptionKey: "puzzles.descriptions.foolsMate",
        hintKey: "puzzles.hints.openDiagonal",
        difficulty: "easy"
    },
    {
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 1",
        moves: ["h5f7"],
        descriptionKey: "puzzles.descriptions.scholarsMate",
        hintKey: "puzzles.hints.weakF7",
        difficulty: "easy"
    },
    {
        fen: "6k1/6pp/8/8/8/8/5QPP/5RK1 w - - 0 1",
        moves: ["f1f8"],
        descriptionKey: "puzzles.descriptions.backRankMate",
        hintKey: "puzzles.hints.trappedKing",
        difficulty: "easy"
    },
    {
        fen: "rnbqkb1r/pppp1ppp/4pn2/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 1",
        moves: ["g1f3"],
        descriptionKey: "puzzles.descriptions.developPieces",
        hintKey: "puzzles.hints.developKnight",
        difficulty: "easy"
    },
    
    // Simple captures - Easy
    {
        fen: "1r6/p1p3kp/2p1qp2/8/3Q4/BP6/P1P2PPP/4R1K1 w - - 0 1",
        moves: ["e1e6"],
        descriptionKey: "puzzles.descriptions.captureHanging",
        hintKey: "puzzles.hints.undefendedQueen",
        difficulty: "easy"
    },
    {
        fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
        moves: ["e7e5"],
        descriptionKey: "puzzles.descriptions.openGame",
        hintKey: "puzzles.hints.openGame",
        difficulty: "easy"
    },
    {
        fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKBNR w KQkq - 0 1",
        moves: ["f1c4"],
        descriptionKey: "puzzles.descriptions.italianGame",
        hintKey: "puzzles.hints.italianGame",
        difficulty: "easy"
    },
    
    // Basic development and safety - Easy
    {
        fen: "r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 1",
        moves: ["e1g1"],
        descriptionKey: "puzzles.descriptions.castleSafety",
        hintKey: "puzzles.hints.saferPosition",
        difficulty: "easy"
    },
    {
        fen: "7k/8/8/8/8/8/6PP/7K w - - 0 1",
        moves: ["h1g1"],
        descriptionKey: "puzzles.descriptions.kingSafety",
        hintKey: "puzzles.hints.awayFromCorner",
        difficulty: "easy"
    },
    {
        fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1",
        moves: ["g8f6"],
        descriptionKey: "puzzles.descriptions.developPieces",
        hintKey: "puzzles.hints.controlCenterKnight",
        difficulty: "easy"
    },
    
    // Pawn promotion - Easy
    {
        fen: "8/8/8/8/8/6k1/4Kp2/8 b - - 0 1",
        moves: ["g3g2"],
        descriptionKey: "puzzles.descriptions.promotePawn",
        hintKey: "puzzles.hints.supportPromotion",
        difficulty: "easy"
    },
    
    // Simple tactics - Easy
    {
        fen: "3r4/2k5/8/8/7P/2K5/8/3R4 w - - 0 1",
        moves: ["d1d8"],
        descriptionKey: "puzzles.descriptions.simplifyPosition",
        hintKey: "puzzles.hints.tradeRooks",
        difficulty: "easy"
    },
    {
        fen: "r1bq1rk1/pp2ppbp/3p1np1/2p5/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 1",
        moves: ["d4d5"],
        descriptionKey: "puzzles.descriptions.controlCenter",
        hintKey: "puzzles.hints.gainSpace",
        difficulty: "easy"
    },
    
    // Blocking checks - Easy
    {
        fen: "r3k2r/ppp2ppp/2n5/3q4/3P4/5N2/PP2QPPP/R1B1K2R b KQkq - 0 1",
        moves: ["c6e7"],
        descriptionKey: "puzzles.descriptions.blockCheck",
        hintKey: "puzzles.hints.blockCheckPiece",
        difficulty: "easy"
    },
    {
        fen: "r3k2r/ppp2ppp/2n5/8/1b1P4/5N2/PP2BPPP/R1B1K2R w KQkq - 0 1",
        moves: ["c1d2"],
        descriptionKey: "puzzles.descriptions.defendCheck",
        hintKey: "puzzles.hints.blockWithBishop",
        difficulty: "easy"
    },
    
    // Pins and basic tactics - Easy
    {
        fen: "r1bq1rk1/pppp1ppp/2n2n2/4p3/1b2P3/2NP1N2/PPP1BPPP/R1BQK2R w KQ - 0 1",
        moves: ["c1g5"],
        descriptionKey: "puzzles.descriptions.pinKnight",
        hintKey: "puzzles.hints.pinToQueen",
        difficulty: "easy"
    },
    {
        fen: "r1b1k2r/ppppqppp/2n2n2/4p3/1b2P3/2NP1N2/PPP1BPPP/R1BQK2R w KQkq - 0 1",
        moves: ["c1d2"],
        descriptionKey: "puzzles.descriptions.escapePin",
        hintKey: "puzzles.hints.unpinKnight",
        difficulty: "easy"
    },
    {
        fen: "r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R w KQ - 0 1",
        moves: ["c1g5"],
        descriptionKey: "puzzles.descriptions.activeDevelopment",
        hintKey: "puzzles.hints.activeSquare",
        difficulty: "easy"
    },
    {
        fen: "r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 1",
        moves: ["d2d3"],
        descriptionKey: "puzzles.descriptions.solidifyPosition",
        hintKey: "puzzles.hints.supportCenter",
        difficulty: "easy"
    },
    {
        fen: "r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P1n1/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 1",
        moves: ["h2h3"],
        descriptionKey: "puzzles.descriptions.kickKnight",
        hintKey: "puzzles.hints.attackKnight",
        difficulty: "easy"
    },
    {
        fen: "r1bq1rk1/pppp1ppp/2n2n2/4p3/1b2P3/2NP1N2/PPP1BPPP/R1BQK2R w KQ - 0 1",
        moves: ["a2a3"],
        descriptionKey: "puzzles.descriptions.challengeBishop",
        hintKey: "puzzles.hints.forceBishop",
        difficulty: "easy"
    },

    // ==================== MEDIUM PUZZLES (26-50) ====================
    // Fun forks, pins, and tactics for kids
    
    {
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R b KQkq - 0 1",
        moves: ["c6d4"],
        descriptionKey: "puzzles.descriptions.fork",
        hintKey: "puzzles.hints.knightFork",
        difficulty: "medium"
    },
    {
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPPQPPP/R1B1K2R b KQkq - 0 1",
        moves: ["d7d5"],
        descriptionKey: "puzzles.descriptions.attackBishop",
        hintKey: "puzzles.hints.attackBishopKnight",
        difficulty: "medium"
    },
    {
        fen: "r2qk2r/ppp2ppp/2n5/3pP3/3P1nb1/2N2N2/PP2BPPP/R2Q1RK1 b kq - 0 1",
        moves: ["f4e2"],
        descriptionKey: "puzzles.descriptions.removeDefender",
        hintKey: "puzzles.hints.captureDefender",
        difficulty: "medium"
    },
    {
        fen: "r1bqk2r/ppp2ppp/2n5/3np3/1bB1P3/2NP1N2/PPPBQPPP/R3K2R w KQkq - 0 1",
        moves: ["d2g5"],
        descriptionKey: "puzzles.descriptions.winPiece",
        hintKey: "puzzles.hints.trappedPiece",
        difficulty: "medium"
    },
    {
        fen: "rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 1",
        moves: ["c4d5"],
        descriptionKey: "puzzles.descriptions.isolatedPawn",
        hintKey: "puzzles.hints.isolatedPawn",
        difficulty: "medium"
    },
    {
        fen: "r1bqkbnr/ppp2ppp/2np4/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQ1RK1 w - - 0 1",
        moves: ["f1e1"],
        descriptionKey: "puzzles.descriptions.connectRooks",
        hintKey: "puzzles.hints.saferKing",
        difficulty: "medium"
    },
    {
        fen: "r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/2N2N2/PPPP1PPP/R1BQK2R b KQkq - 0 1",
        moves: ["a7a6"],
        descriptionKey: "puzzles.descriptions.attackBishop",
        hintKey: "puzzles.hints.attackBishopPawn",
        difficulty: "medium"
    },
    {
        fen: "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1",
        moves: ["c6d4"],
        descriptionKey: "puzzles.descriptions.fork",
        hintKey: "puzzles.hints.knightFork",
        difficulty: "medium"
    },
    {
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R b KQkq - 0 1",
        moves: ["d7d5"],
        descriptionKey: "puzzles.descriptions.openGame",
        hintKey: "puzzles.hints.openGame",
        difficulty: "medium"
    },
    {
        fen: "rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/4PN2/PP3PPP/RNBQKB1R w KQkq - 0 1",
        moves: ["b1c3"],
        descriptionKey: "puzzles.descriptions.queensGambit",
        hintKey: "puzzles.hints.queensGambit",
        difficulty: "medium"
    },
    {
        fen: "rnbqkbnr/pp2pppp/2pp4/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 1",
        moves: ["g1f3"],
        descriptionKey: "puzzles.descriptions.developPieces",
        hintKey: "puzzles.hints.developKnight",
        difficulty: "medium"
    },
    {
        fen: "rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1",
        moves: ["e4d5"],
        descriptionKey: "puzzles.descriptions.capturePawn",
        hintKey: "puzzles.hints.captureCenter",
        difficulty: "medium"
    },
    {
        fen: "rnbqkbnr/ppp1pppp/8/8/3pP3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 0 1",
        moves: ["d4c3"],
        descriptionKey: "puzzles.descriptions.captureKnight",
        hintKey: "puzzles.hints.captureKnight",
        difficulty: "medium"
    },
    {
        fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1",
        moves: ["b1c3"],
        descriptionKey: "puzzles.descriptions.twoKnights",
        hintKey: "puzzles.hints.twoKnights",
        difficulty: "medium"
    },
    {
        fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R b KQkq - 0 1",
        moves: ["g8f6"],
        descriptionKey: "puzzles.descriptions.twoKnightsDefense",
        hintKey: "puzzles.hints.twoKnightsDefense",
        difficulty: "medium"
    },
    {
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 1",
        moves: ["c2c3"],
        descriptionKey: "puzzles.descriptions.giuocoPianissimo",
        hintKey: "puzzles.hints.giuocoPianissimo",
        difficulty: "medium"
    },
    {
        fen: "r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1",
        moves: ["c6a5"],
        descriptionKey: "puzzles.descriptions.attackBishop",
        hintKey: "puzzles.hints.attackBishopKnight",
        difficulty: "medium"
    },
    {
        fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R b KQkq - 0 1",
        moves: ["d7d6"],
        descriptionKey: "puzzles.descriptions.hungarianDefense",
        hintKey: "puzzles.hints.hungarianDefense",
        difficulty: "medium"
    },
    {
        fen: "r1bqkb1r/ppp2ppp/2np1n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 1",
        moves: ["c4a6"],
        descriptionKey: "puzzles.descriptions.evansGambit",
        hintKey: "puzzles.hints.evansGambit",
        difficulty: "medium"
    },
    {
        fen: "r1bqk1nr/pppp1ppp/2n5/2b1p3/1PB1P3/5N2/P1PP1PPP/RNBQK2R b KQkq - 0 1",
        moves: ["c5b4"],
        descriptionKey: "puzzles.descriptions.captureBishop",
        hintKey: "puzzles.hints.captureBishop",
        difficulty: "medium"
    },
    {
        fen: "r1bqk2r/ppp2ppp/2n2n2/1B1pp3/1b2P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 1",
        moves: ["b5c6"],
        descriptionKey: "puzzles.descriptions.exchangePieces",
        hintKey: "puzzles.hints.exchangePieces",
        difficulty: "medium"
    },
    {
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/1B2P3/2N2N2/PPPP1PPP/R1BQK2R b KQkq - 0 1",
        moves: ["a7a5"],
        descriptionKey: "puzzles.descriptions.attackBishop",
        hintKey: "puzzles.hints.attackBishopPawn",
        difficulty: "medium"
    },
    {
        fen: "r1bqk2r/pppp1ppp/2n2n2/4p3/1b2P3/2NP1N2/PPP1BPPP/R1BQK2R w KQkq - 0 1",
        moves: ["d3d4"],
        descriptionKey: "puzzles.descriptions.scotchGame",
        hintKey: "puzzles.hints.scotchGame",
        difficulty: "medium"
    },

    // ==================== HARD PUZZLES (51-75) ====================
    // Advanced tactics and checkmates for kids!
    
    // Fork - knight attacks queen and rook
    {
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1",
        moves: ["f3e5"],
        descriptionKey: "puzzles.descriptions.fork",
        hintKey: "puzzles.hints.knightFork",
        difficulty: "hard"
    },
   
    // Discovered attack - bishop opens line for queen
    {
        fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQ1RK1 w - - 0 1",
        moves: ["c4b5"],
        descriptionKey: "puzzles.descriptions.discoveredCheck",
        hintKey: "puzzles.hints.unleashAttack",
        difficulty: "hard"
    },
    // Pin - rook pins knight to queen
    {
        fen: "r1bqk2r/pppp1ppp/2n5/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 1",
        moves: ["c4b5"],
        descriptionKey: "puzzles.descriptions.pin",
        hintKey: "puzzles.hints.pinWin",
        difficulty: "hard"
    },
    // Decoy - sacrifice to expose the king
    {
        fen: "r1bq1rk1/ppp2ppp/2n2n2/1b1pp3/4P3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 1",
        moves: ["c3d5"],
        descriptionKey: "puzzles.descriptions.decoy",
        hintKey: "puzzles.hints.sacrificeExpose",
        difficulty: "hard"
    },
    // // Double attack - queen forks king and knight
    // {
    //     fen: "r1bq1rk1/pppp1ppp/2n2n2/4p3/2B1P3/2N2Q2/PPPP1PPP/R1B1K2R w KQ - 0 1",
    //     moves: ["f3c6"],
    //     descriptionKey: "puzzles.descriptions.doubleAttack",
    //     hintKey: "puzzles.hints.multipleThreats",
    //     difficulty: "hard"
    // },
    // // Removal of defender - capture the protecting knight
    // {
    //     fen: "r1bq1rk1/ppp2ppp/2n2n2/3pp3/2B1P3/2N2N2/PPPP1PPP/R1BQ1RK1 w - - 0 1",
    //     moves: ["c3d5"],
    //     descriptionKey: "puzzles.descriptions.removeGuard",
    //     hintKey: "puzzles.hints.eliminateDefender",
    //     difficulty: "hard"
    // },
    // // Deflection - queen deflects king from defense
    // {
    //     fen: "r1bq1rk1/pppp1ppp/5n2/4p3/2B1P3/2N2Q2/PPPP1PPP/R1B2RK1 b - - 0 1",
    //     moves: ["f6d5"],
    //     descriptionKey: "puzzles.descriptions.deflection",
    //     hintKey: "puzzles.hints.distract",
    //     difficulty: "hard"
    // },
    // // Interference - knight blocks queen's defense
    // {
    //     fen: "r1bq1rk1/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R2Q1RK1 w - - 0 1",
    //     moves: ["d1d6"],
    //     descriptionKey: "puzzles.descriptions.interference",
    //     hintKey: "puzzles.hints.blockPath",
    //     difficulty: "hard"
    // },
    // // X-ray attack - rook attacks through knight
    // {
    //     fen: "r4rk1/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQ1RK1 w - - 0 1",
    //     moves: ["d1d8"],
    //     descriptionKey: "puzzles.descriptions.xray",
    //     hintKey: "puzzles.hints.xrayAttack",
    //     difficulty: "hard"
    // },
    // // Clearance sacrifice - bishop clears file for rook
    // {
    //     fen: "r1bq1rk1/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQ1R2 w - - 0 1",
    //     moves: ["c4e2"],
    //     descriptionKey: "puzzles.descriptions.clearance",
    //     hintKey: "puzzles.hints.makeRoom",
    //     difficulty: "hard"
    // },
    // // Zwischenzug - intermediate check before recapturing
    // {
    //     fen: "r1bq1rk1/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQ3R w - - 0 1",
    //     moves: ["d1d8"],
    //     descriptionKey: "puzzles.descriptions.zwischenzug",
    //     hintKey: "puzzles.hints.intermediateMove",
    //     difficulty: "hard"
    // },
    // // Back rank mate - rook delivers checkmate
    // {
    //     fen: "r4rk1/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQ2K1 w - - 0 1",
    //     moves: ["d1d8"],
    //     descriptionKey: "puzzles.descriptions.backRankMate",
    //     hintKey: "puzzles.hints.trappedKing",
    //     difficulty: "hard"
    // },
    // // Desperado - capture before being captured
    // {
    //     fen: "r1bq1rk1/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQ2K1 b - - 0 1",
    //     moves: ["c6e7"],
    //     descriptionKey: "puzzles.descriptions.desperado",
    //     hintKey: "puzzles.hints.goCrazy",
    //     difficulty: "hard"
    // },
    // // Attraction - lure king to mating net
    // {
    //     fen: "r1bq1rk1/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R2Q1RK1 b - - 0 1",
    //     moves: ["e5e4"],
    //     descriptionKey: "puzzles.descriptions.attraction",
    //     hintKey: "puzzles.hints.lureKing",
    //     difficulty: "hard"
    // },
    // // Windmill - repeated discovered checks
    // {
    //     fen: "r4rk1/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQ1R2 w - - 0 1",
    //     moves: ["f1f7"],
    //     descriptionKey: "puzzles.descriptions.windmill",
    //     hintKey: "puzzles.hints.repeatedChecks",
    //     difficulty: "hard"
    // },
    // // Overloading - queen has too many defensive tasks
    // {
    //     fen: "r1bq1rk1/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R2Q1RK1 w - - 0 1",
    //     moves: ["c3d5"],
    //     descriptionKey: "puzzles.descriptions.overloading",
    //     hintKey: "puzzles.hints.tooManyTasks",
    //     difficulty: "hard"
    // },
    // // Anastasia's mate pattern - rook and knight
    // {
    //     fen: "r4rk1/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R2Q2K1 w - - 0 1",
    //     moves: ["h1h8"],
    //     descriptionKey: "puzzles.descriptions.anastasia",
    //     hintKey: "puzzles.hints.knightRookMate",
    //     difficulty: "hard"
    // },
    // // Boden's mate - two bishops pattern
    // {
    //     fen: "r4rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQ2K1 w - - 0 1",
    //     moves: ["c4b5"],
    //     descriptionKey: "puzzles.descriptions.boden",
    //     hintKey: "puzzles.hints.twoBishops",
    //     difficulty: "hard"
    // },
    // // Arabian mate - rook and knight classic pattern
    // {
    //     fen: "r4rk1/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1B2RK1 w - - 0 1",
    //     moves: ["f1f8"],
    //     descriptionKey: "puzzles.descriptions.arabian",
    //     hintKey: "puzzles.hints.rookKnightMate",
    //     difficulty: "hard"
    // },
    // // Pawn promotion - advance to queen
    // {
    //     fen: "r4rk1/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/P1PP1PPP/2KR3R w - - 0 1",
    //     moves: ["a2a4"],
    //     descriptionKey: "puzzles.descriptions.promotion",
    //     hintKey: "puzzles.hints.queeningCheck",
    //     difficulty: "hard"
    // },
    // // Stalemate trap - force a draw
    // {
    //     fen: "r4rk1/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQ2K1 b - - 0 1",
    //     moves: ["f6d5"],
    //     descriptionKey: "puzzles.descriptions.stalemateTrap",
    //     hintKey: "puzzles.hints.forceDraw",
    //     difficulty: "hard"
    // },
    // // Perpetual check - save the game
    // {
    //     fen: "r2q1rk1/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1B2RK1 w - - 0 1",
    //     moves: ["c4d5"],
    //     descriptionKey: "puzzles.descriptions.perpetual",
    //     hintKey: "puzzles.hints.repeatMoves",
    //     difficulty: "hard"
    // },
    // // Zugzwang - force opponent to worsen their position
    // {
    //     fen: "r1b2rk1/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQ2K1 w - - 0 1",
    //     moves: ["c4d5"],
    //     descriptionKey: "puzzles.descriptions.zugzwang",
    //     hintKey: "puzzles.hints.forceMove",
    //     difficulty: "hard"
    // },
    // // Quiet move - prepare unstoppable threat
    // {
    //     fen: "r1bq1rk1/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1B2RK1 w - - 0 1",
    //     moves: ["d1d2"],
    //     descriptionKey: "puzzles.descriptions.quietMove",
    //     hintKey: "puzzles.hints.prepareMate",
    //     difficulty: "hard"
    // },
    // // Block - cut off king's escape
    // {
    //     fen: "r1bq2k1/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1B2RK1 w - - 0 1",
    //     moves: ["c4d5"],
    //     descriptionKey: "puzzles.descriptions.block",
    //     hintKey: "puzzles.hints.cutOffKing",
    //     difficulty: "hard"
    // }
];

// Helper function to get puzzles by difficulty
export const getPuzzlesByDifficulty = (difficulty: Difficulty): Puzzle[] => {
    return SAMPLE_PUZZLES.filter(puzzle => puzzle.difficulty === difficulty);
};

// Helper function to get a random puzzle by difficulty
export const getRandomPuzzleByDifficulty = (difficulty: Difficulty): Puzzle => {
    const puzzles = getPuzzlesByDifficulty(difficulty);
    return puzzles[Math.floor(Math.random() * puzzles.length)];
};

// Puzzle counts by difficulty
export const PUZZLE_COUNTS = {
    easy: 25,
    medium: 25,
    hard: 25,
    total: 75
} as const;
