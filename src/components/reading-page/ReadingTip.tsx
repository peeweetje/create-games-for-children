import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { Tip } from "../tip/Tip";

export const ReadingTip = () => {
    const { t } = useTranslation();
    
    const tips = useMemo(() => [
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
    ], [t]);

    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    return (
        <Tip
            variant="gradient"
            title={t("learn.reading.tip.readingTip")}
        >
            {randomTip}
        </Tip>
    );
};