import { LucideIcon, X } from 'lucide-react';
import { ReactNode } from 'react';

interface CloseButtonProps {
    onClick: () => void;
    className?: string;
    icon?: LucideIcon;
    size?: number;
    strokeWidth?: number;
    showIcon?: boolean;
    children?: ReactNode;
}

export function CloseButton({ 
    onClick, 
    className = '', 
    icon: Icon = X,
    size,
    strokeWidth,
    showIcon = true,
    children,
}: CloseButtonProps) {
    return (
        <button
            onClick={onClick}
            className={className}
        >
            {showIcon && <Icon size={size} strokeWidth={strokeWidth} />}
            {children}
        </button>
    );
}
