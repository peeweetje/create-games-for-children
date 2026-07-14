interface HighScoreStatItemProps {
    value: string | number;
    label: string;
    valueClassName?: string;
    labelClassName?: string;
    containerClassName?: string;
}

export const HighScoreStatItem = ({
    value,
    label,
    valueClassName = "text-xl md:text-2xl font-bold text-primary-600",
    labelClassName = "text-xs md:text-sm text-text-600",
    containerClassName = "bg-white rounded-lg p-3 md:p-4 shadow-sm",
}: HighScoreStatItemProps) => {
    return (
        <div className={containerClassName}>
            <div className={valueClassName}>
                {value}
            </div>
            <div className={labelClassName}>
                {label}
            </div>
        </div>
    );
};