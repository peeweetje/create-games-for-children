import { useTranslation } from "react-i18next";
import { Tip } from "../tip/Tip";

export const LearnTip = () => {
    const { t } = useTranslation();

    return (
        <Tip variant="simple">
            {t("learn.tip")}
        </Tip>
    );
};