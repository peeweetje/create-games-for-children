
import type { ReactNode } from "react";
import { Plus, Minus, X, Divide } from "lucide-react";

export type Operation = "addition" | "subtraction" | "multiplication" | "division";

export const operationIcons: Record<Operation, ReactNode> = {
    addition: <Plus size={20} />,
    subtraction: <Minus size={20} />,
    multiplication: <X size={20} />,
    division: <Divide size={20} />,
};

export interface Question {
    num1: number;
    num2: number;
    operation: Operation;
    answer: number;
}

export const operationSymbols: Record<Operation, string> = {
    addition: "+",
    subtraction: "−",
    multiplication: "×",
    division: "÷",
};

export const operationColors: Record<Operation, string> = {
    addition: "bg-green-400 hover:bg-green-500",
    subtraction: "bg-blue-400 hover:bg-blue-500",
    multiplication: "bg-purple-400 hover:bg-purple-500",
    division: "bg-orange-400 hover:bg-orange-500",
};

export const operationActiveBorder: Record<Operation, string> = {
    addition: "border-green-600",
    subtraction: "border-blue-600",
    multiplication: "border-purple-600",
    division: "border-orange-600",
};



export function generateQuestion(operation: Operation): Question {
    let num1: number, num2: number, answer: number;

    switch (operation) {
        case "addition":
            num1 = Math.floor(Math.random() * 20) + 1;
            num2 = Math.floor(Math.random() * 20) + 1;
            answer = num1 + num2;
            break;
        case "subtraction":
            num1 = Math.floor(Math.random() * 20) + 1;
            num2 = Math.floor(Math.random() * num1) + 1;
            answer = num1 - num2;
            break;
        case "multiplication":
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            answer = num1 * num2;
            break;
        case "division":
            num2 = Math.floor(Math.random() * 9) + 2;
            answer = Math.floor(Math.random() * 10) + 1;
            num1 = num2 * answer;
            break;
    }

    return { num1, num2, operation, answer };
}

export function generateChoices(correct: number): number[] {
    const choices = new Set<number>([correct]);
    while (choices.size < 4) {
        const offset = Math.floor(Math.random() * 10) - 5;
        const wrong = correct + offset;
        if (wrong !== correct && wrong >= 0) {
            choices.add(wrong);
        }
    }
    return [...choices].sort(() => Math.random() - 0.5);
}

export const FEEDBACK_EMOJIS_CORRECT = ["🎉", "⭐", "🌟", "🥳", "🎊", "👏", "🏆"];
export const FEEDBACK_EMOJIS_WRONG = ["😅", "🙈", "💪", "🤔", "😬"];
