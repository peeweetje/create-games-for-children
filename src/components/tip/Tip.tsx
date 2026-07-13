import { ReactNode } from "react";
import { Lightbulb } from "lucide-react";

interface TipProps {
    icon?: ReactNode;
    title?: string;
    children: ReactNode;
    variant?: "simple" | "gradient";
}

const simpleStyles = {
    container: "bg-yellow-100 border-2 border-yellow-300 rounded-2xl px-6 py-4 max-w-sm w-full",
    iconWrapper: "shrink-0 mt-0.5",
    iconColor: "text-yellow-500",
    text: "text-yellow-700 font-semibold text-sm",
};

const gradientStyles = {
    container: "w-full max-w-2xl mx-auto bg-gradient-to-r from-accent-300 to-primary-100 rounded-xl p-6 border border-primary-200",
    iconWrapper: "w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0",
    iconColor: "text-white text-lg",
    text: "text-text-700 leading-relaxed",
};

export const Tip = ({
    icon,
    title,
    children,
    variant = "simple",
}: TipProps) => {
    const styles = variant === "gradient" ? gradientStyles : simpleStyles;

    const renderIcon = () => {
        if (icon) return icon;
        if (variant === "gradient") {
            return <span className={styles.iconColor}>💡</span>;
        }
        return <Lightbulb size={20} className={styles.iconColor} />;
    };

    return (
        <div className={styles.container}>
            <div className="flex items-start gap-3">
                <div className={styles.iconWrapper}>
                    {renderIcon()}
                </div>
                <div className="flex-1">
                    {title && (
                        <h3 className="font-semibold text-text-800 mb-2">{title}</h3>
                    )}
                    <p className={styles.text}>{children}</p>
                </div>
            </div>
        </div>
    );
};