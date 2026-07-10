import { useTranslation } from "react-i18next";

interface ReadingStarsProps {
    count: number;
}

export const ReadingStars = ({ count }: ReadingStarsProps) => {
    const { t } = useTranslation();
    
    return (
        <div className="w-full max-w-2xl mx-auto mb-6">
            <div className="flex justify-center items-center gap-4 bg-gradient-to-r from-star/20 to-streak/20 rounded-xl p-4 border border-star/30">
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-text-800 mb-2">{t("learn.reading.stars.starsEarned")}</h3>
                    <p className="text-sm text-text-600">{t("learn.reading.stars.outOfFive")}</p>
                </div>
                <div className="flex gap-2">
                    {Array.from({ length: 5 }, (_, index) => (
                        <div
                            key={index}
                            className={`text-3xl transition-all duration-300 ${
                                index < count 
                                    ? "scale-110 text-star drop-shadow-lg" 
                                    : "scale-75 text-text-300"
                            }`}
                        >
                            ⭐
                        </div>
                    ))}
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-star-600">{count}</div>
                    <div className="text-sm text-text-600">{t("learn.reading.stars.outOfFive")}</div>
                </div>
            </div>
        </div>
    );
};