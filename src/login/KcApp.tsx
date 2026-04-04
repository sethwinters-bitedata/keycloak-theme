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

export default function KcApp(props: { kcContext: KcContext }) {
  const { kcContext } = props;

  const i18n = useI18n({ kcContext });

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
                {...{ kcContext, i18n, Template, classes }}
                doUseDefaultCss={true}
              />
            );

          case "register.ftl":
            return (
              <Register
                {...{ kcContext, i18n, Template, classes }}
                doUseDefaultCss={true}
              />
            );

          case "terms.ftl":
            return (
              <Terms
                {...{ kcContext, i18n, Template, classes }}
                doUseDefaultCss={true}
              />
            );

          case "info.ftl":
            return (
              <Info
                {...{ kcContext, i18n, classes }}
                Template={Template}
                doUseDefaultCss={true}
              />
            );

          default:
            return (
              <DefaultPage
                {...{ kcContext, i18n, Template, classes }}
                doUseDefaultCss={true}
              />
            );
        }
      })()}
    </Suspense>
  );
}
