import { useTranslation } from "react-i18next";

export const ReadingTip = () => {
    const { t } = useTranslation();
    
    const tips = [
        t("learn.reading.tip.tipText"),
        t("learn.reading.tip.pointingTip"),
        t("learn.reading.tip.readingAloudTip"),
        t("learn.reading.tip.retellTip"),
        t("learn.reading.tip.starRewardTip"),
        t("learn.reading.tip.soundingOutTip"),
        t("learn.reading.tip.audioTip"),
        t("learn.reading.tip.pictureTip"),
        t("learn.reading.tip.celebrationTip"),
        t("learn.reading.tip.grownupTip")
    ];

    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-fuchsia-100 to-purple-100 rounded-xl p-6 border border-fuchsia-200">
                <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-fuchsia-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-lg">💡</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2">{t("learn.reading.tip.readingTip")}</h3>
                        <p className="text-gray-700 leading-relaxed">{randomTip}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
