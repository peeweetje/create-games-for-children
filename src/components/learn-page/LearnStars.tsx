import { Star } from "lucide-react";

interface LearnStarsProps {
    count: number;
}

export const LearnStars = ({ count }: LearnStarsProps) => {
    if (count === 0) return null;

    return (
        <div className="mb-4 flex gap-1">
            {Array.from({ length: count }).map((_, i) => (
                <Star
                    key={i}
                    size={28}
                    className="text-yellow-400 fill-yellow-400 animate-bounce"
                    style={{ animationDelay: `${i * 80}ms` }}
                />
            ))}
        </div>
    );
};
