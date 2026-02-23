interface LearnAnswerChoicesProps {
    choices: number[];
    selected: number | null;
    correctAnswer: number;
    onSelect: (choice: number) => void;
    disabled: boolean;
}

export const LearnAnswerChoices = ({
    choices,
    selected,
    correctAnswer,
    onSelect,
    disabled,
}: LearnAnswerChoicesProps) => {
    return (
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {choices.map((choice) => {
                let btnClass =
                    "py-5 text-3xl font-bold rounded-2xl shadow-md transition-all duration-200 border-4 ";
                if (selected === null) {
                    btnClass +=
                        "bg-white border-gray-200 hover:border-orange-400 hover:shadow-lg text-gray-800 cursor-pointer";
                } else if (choice === correctAnswer) {
                    btnClass += "bg-green-100 border-green-500 text-green-700";
                } else if (choice === selected) {
                    btnClass += "bg-red-100 border-red-400 text-red-600";
                } else {
                    btnClass += "bg-gray-50 border-gray-200 text-gray-400 opacity-60";
                }

                return (
                    <button
                        key={choice}
                        onClick={() => onSelect(choice)}
                        className={btnClass}
                        disabled={disabled}
                    >
                        {choice}
                    </button>
                );
            })}
        </div>
    );
};
