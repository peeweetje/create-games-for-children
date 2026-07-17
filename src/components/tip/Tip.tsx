import { ReactNode } from "react";
import { Lightbulb } from "lucide-react";

interface TipProps {
    icon?: ReactNode;
    title?: string;
    children: ReactNode;
}

const styles = {
    container: "bg-yellow-100 border-2 border-yellow-300 rounded-2xl px-6 py-4 max-w-sm w-full",
    iconWrapper: "shrink-0 mt-0.5",
    iconColor: "text-yellow-500",
    text: "text-yellow-700 font-semibold text-sm",
};

export const Tip = ({
    icon,
    title,
    children,
}: TipProps) => {
    return (
        <div className={styles.container}>
            <div className="flex items-start gap-3">
                <div className={styles.iconWrapper}>
                    {icon ?? <Lightbulb size={20} className={styles.iconColor} />}
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
