


 export const SAMPLE_PUZZLES = [
    {
        fen: "4r3/R7/1R6/2p2p1k/5P1P/7K/8/8 w - - 0 1",
        moves: ["b6h6"],
        descriptionKey: "puzzles.descriptions.mate1White",
        hintKey: "puzzles.hints.checkmateRook"
    },
    {
        fen: "1r6/p1p3kp/2p1qp2/8/3Q4/BP6/P1P2PPP/4R1K1 w - - 0 1",
        moves: ["e1e6"],
        descriptionKey: "puzzles.descriptions.captureHanging",
        hintKey: "puzzles.hints.undefendedQueen"
    },
    {
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 1",
        moves: ["h5f7"],
        descriptionKey: "puzzles.descriptions.scholarsMate",
        hintKey: "puzzles.hints.weakF7"
    },
    {
        fen: "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1",
        moves: ["e1e8"],
        descriptionKey: "puzzles.descriptions.backRankMate",
        hintKey: "puzzles.hints.trappedKing"
    },
    {
        fen: "rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 1",
        moves: ["d8h4"],
        descriptionKey: "puzzles.descriptions.foolsMate",
        hintKey: "puzzles.hints.openDiagonal"
    },
    {
        fen: "r1b1k2r/ppppqppp/2n2n2/4p3/1b2P3/2NP1N2/PPP1BPPP/R1BQK2R w KQkq - 0 1",
        moves: ["c1d2"],
        descriptionKey: "puzzles.descriptions.escapePin",
        hintKey: "puzzles.hints.unpinKnight"
    },
    {
        fen: "r3k2r/ppp2ppp/2n5/3q4/3P4/5N2/PP2QPPP/R1B1K2R b KQkq - 0 1",
        moves: ["c6e7"],
        descriptionKey: "puzzles.descriptions.blockCheck",
        hintKey: "puzzles.hints.blockCheckPiece"
    },
    {
        fen: "8/8/8/8/8/6k1/4Kp2/8 b - - 0 1",
        moves: ["g3g2"],
        descriptionKey: "puzzles.descriptions.promotePawn",
        hintKey: "puzzles.hints.supportPromotion"
    },
    {
        fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1",
        moves: ["g8f6"],
        descriptionKey: "puzzles.descriptions.developPieces",
        hintKey: "puzzles.hints.controlCenterKnight"
    },
    {
        fen: "r2qk2r/ppp2ppp/2n5/3pP3/3P1nb1/2N2N2/PP2BPPP/R2Q1RK1 b kq - 0 1",
        moves: ["f4e2"],
        descriptionKey: "puzzles.descriptions.removeDefender",
        hintKey: "puzzles.hints.captureDefender"
    },
    {
        fen: "r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 1",
        moves: ["e1g1"],
        descriptionKey: "puzzles.descriptions.castleSafety",
        hintKey: "puzzles.hints.saferPosition"
    },
    {
        fen: "3r4/2k5/8/8/7P/2K5/8/3R4 w - - 0 1",
        moves: ["d1d8"],
        descriptionKey: "puzzles.descriptions.simplifyPosition",
        hintKey: "puzzles.hints.tradeRooks"
    },
    {
        fen: "7k/8/8/8/8/8/6PP/7K w - - 0 1",
        moves: ["h1g1"],
        descriptionKey: "puzzles.descriptions.kingSafety",
        hintKey: "puzzles.hints.awayFromCorner"
    },
    {
        fen: "rnbq1rk1/pp2ppbp/3p1np1/2p5/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 1",
        moves: ["d4d5"],
        descriptionKey: "puzzles.descriptions.controlCenter",
        hintKey: "puzzles.hints.gainSpace"
    },
    {
        fen: "r1bq1rk1/pppp1ppp/2n2n2/4p3/1b2P3/2NP1N2/PPP1BPPP/R1BQK2R w KQ - 0 1",
        moves: ["c1g5"],
        descriptionKey: "puzzles.descriptions.pinKnight",
        hintKey: "puzzles.hints.pinToQueen"
    },
    {
        fen: "r3k2r/ppp2ppp/2n5/8/1b1P4/5N2/PP2BPPP/R1B1K2R w KQkq - 0 1",
        moves: ["c1d2"],
        descriptionKey: "puzzles.descriptions.defendCheck",
        hintKey: "puzzles.hints.blockWithBishop"
    },
    {
        fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 1",
        moves: ["d2d3"],
        descriptionKey: "puzzles.descriptions.solidifyPosition",
        hintKey: "puzzles.hints.supportCenter"
    },
    {
        fen: "r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P1n1/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 1",
        moves: ["h2h3"],
        descriptionKey: "puzzles.descriptions.kickKnight",
        hintKey: "puzzles.hints.attackKnight"
    },
    {
        fen: "r1bq1rk1/pppp1ppp/2n2n2/4p3/1b2P3/2NP1N2/PPP1BPPP/R1BQK2R w KQ - 0 1",
        moves: ["a2a3"],
        descriptionKey: "puzzles.descriptions.challengeBishop",
        hintKey: "puzzles.hints.forceBishop"
    },
    {
        fen: "r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R w KQ - 0 1",
        moves: ["c1g5"],
        descriptionKey: "puzzles.descriptions.activeDevelopment",
        hintKey: "puzzles.hints.activeSquare"
    }
];
