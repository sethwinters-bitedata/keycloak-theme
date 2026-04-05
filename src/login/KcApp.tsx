import "./KcApp.css";
import { lazy, Suspense } from "react";
import DefaultPage from "keycloakify/login/DefaultPage";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "./kcContext";
import { useI18n } from "./i18n";
import type { I18n } from "./i18n";
import Template from "keycloakify/login/Template";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Terms = lazy(() => import("./pages/Terms"));
const Info = lazy(() => import("keycloakify/login/pages/Info"));

const classes = {
  kcHtmlClass: "my-root-class",
  kcHeaderWrapperClass: "my-color my-font",
} satisfies PageProps<KcContext, I18n>["classes"];

const UserProfileFormFields = lazy(
  () => import("./pages/shared/UserProfileFormFields"),
);

export default function KcApp(props: { kcContext: KcContext }) {
  const { kcContext } = props;

  const { i18n } = useI18n({ kcContext });

  if (i18n === null) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      {(() => {
        switch (kcContext.pageId) {
          case "login.ftl":
            return (
              <Login
                kcContext={kcContext}
                i18n={i18n}
                Template={Template}
                classes={classes}
                doUseDefaultCss={true}
              />
            );

          case "register.ftl":
            return (
              <Register
                kcContext={kcContext}
                i18n={i18n}
                Template={Template}
                classes={classes}
                doUseDefaultCss={true}
              />
            );

          case "terms.ftl":
            return (
              <Terms
                kcContext={kcContext}
                i18n={i18n}
                Template={Template}
                classes={classes}
                doUseDefaultCss={true}
              />
            );

          case "info.ftl":
            return (
              <Info
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
                UserProfileFormFields={UserProfileFormFields}
                doMakeUserConfirmPassword={false}
                doUseDefaultCss={true}
              />
            );
        }
      })()}
    </Suspense>
  );
}
