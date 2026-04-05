import "./KcApp.css";
import { lazy, Suspense } from "react";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import DefaultPage from "keycloakify/account/DefaultPage";
import type { KcContext } from "./kcContext";
import { useI18n } from "./i18n";
import Template from "./Template";

const Password = lazy(() => import("./pages/Password"));

const classes = {
  kcBodyClass: "my-root-account-class",
} satisfies PageProps<
  KcContext,
  ReturnType<typeof useI18n> extends null
    ? never
    : NonNullable<ReturnType<typeof useI18n>>
>["classes"];

export default function KcApp(props: { kcContext: KcContext }) {
  const { kcContext } = props;

  const { i18n } = useI18n({ kcContext });

  if (i18n === null) {
    return null;
  }

  return (
    <Suspense>
      {(() => {
        switch (kcContext.pageId) {
          case "password.ftl":
            return (
              <Password
                kcContext={kcContext}
                i18n={i18n}
                Template={Template}
                classes={classes}
                doUseDefaultCss={true}
              />
            );
          default:
            return (
              <DefaultPage
                kcContext={kcContext}
                i18n={i18n}
                Template={Template}
                classes={classes}
                doUseDefaultCss={true}
              />
            );
        }
      })()}
    </Suspense>
  );
}
