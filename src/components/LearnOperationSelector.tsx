import { useTranslation } from "react-i18next";
import {
    type Operation,
    operationSymbols,
    operationColors,
    operationActiveBorder,
    operationIcons,
} from "../helpers/mathHelper";

interface LearnOperationSelectorProps {
    selectedOperation: Operation;
    onSelect: (operation: Operation) => void;
}

export const LearnOperationSelector = ({
    selectedOperation,
    onSelect,
}: LearnOperationSelectorProps) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-wrap gap-3 justify-center mb-6">
            {(Object.keys(operationSymbols) as Operation[]).map((op) => (
                <button
                    key={op}
                    onClick={() => onSelect(op)}
                    className={`${operationColors[op]} text-white font-bold py-2 px-4 rounded-2xl text-lg shadow-md transition-all duration-200 border-4 flex items-center gap-2 ${
                        selectedOperation === op
                            ? `${operationActiveBorder[op]} scale-110 shadow-lg`
                            : "border-transparent"
                    }`}
                >
                    {operationIcons[op]}
                    {t(`learn.operations.${op}`)}
                </button>
            ))}
        </div>
    );
};
