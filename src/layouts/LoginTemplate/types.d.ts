import type { ReactNode } from "react";


export type TemplateProps<KcContext, I18n> = {
    kcContext: KcContext;
    i18n: I18n;
    children: ReactNode;

    documentTitle?: string;
};
