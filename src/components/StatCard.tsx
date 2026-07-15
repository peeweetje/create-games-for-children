import { type ReactNode } from "react";

interface StatCardProps {
    value: string | number;
    label: string | ReactNode;
    valueClassName?: string;
    labelClassName?: string;
    containerClassName?: string;
    variant?: "gradient" | "simple";
}

const gradientStyles = {
    container: "rounded-lg p-4 text-center border",
    value: "text-2xl font-bold",
    label: "text-sm text-text-600",
};

const simpleStyles = {
    container: "rounded-lg p-2 text-center",
    value: "text-lg font-bold",
    label: "text-xs font-medium",
};

export const StatCard = ({
    value,
    label,
    valueClassName = "",
    labelClassName = "",
    containerClassName = "",
    variant = "gradient",
}: StatCardProps) => {
    const base = variant === "gradient" ? gradientStyles : simpleStyles;

    return (
        <div className={`${base.container} ${containerClassName}`}>
            <div className={`${base.value} ${valueClassName}`}>
                {value}
            </div>
            <div className={`${base.label} ${labelClassName}`}>
                {label}
            </div>
        </div>
    );
};