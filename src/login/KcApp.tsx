import "./KcApp.css";
import { lazy, Suspense } from "react";
import DefaultPage from "keycloakify/login/DefaultPage";
import type { KcContext } from "./kcContext";
import { useI18n } from "./i18n";
import Template from "./Template";

const Login = lazy(() => import("./pages/Login"));
// If you can, favor register-user-profile.ftl over register.ftl, see: https://docs.keycloakify.dev/realtime-input-validation
const Register = lazy(() => import("./pages/Register"));
const RegisterUserProfile = lazy(() => import("./pages/RegisterUserProfile"));
const Terms = lazy(() => import("./pages/Terms"));
const MyExtraPage1 = lazy(() => import("./pages/MyExtraPage1"));
const MyExtraPage2 = lazy(() => import("./pages/MyExtraPage2"));
const Info = lazy(() => import("keycloakify/login/pages/Info"));
const UserProfileFormFields = lazy(
  () => import("keycloakify/login/UserProfileFormFields"),
);

// This is like adding classes to theme.properties
const classes = {
  kcHtmlClass: "my-root-class",
  kcHeaderWrapperClass: "my-color my-font",
};

export default function KcApp(props: { kcContext: KcContext }) {
  const { kcContext } = props;

  const i18n = useI18n({ kcContext });

  if (i18n === null) {
    return null;
  }

  return (
    <Suspense>
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

          case "register-user-profile.ftl":
            return (
              <RegisterUserProfile
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

          case "my-extra-page-1.ftl":
            return (
              <MyExtraPage1
                {...{ kcContext, i18n, Template, classes }}
                doUseDefaultCss={true}
              />
            );

          case "my-extra-page-2.ftl":
            return (
              <MyExtraPage2
                {...{ kcContext, i18n, Template, classes }}
                doUseDefaultCss={true}
              />
            );

          case "info.ftl":
            return (
              <Info
                {...{ kcContext, i18n, classes }}
                Template={lazy(() => import("keycloakify/login/Template"))}
                doUseDefaultCss={true}
              />
            );

          default:
            return (
              <DefaultPage
                {...{ kcContext, i18n, Template, classes }}
                doUseDefaultCss={true}
                UserProfileFormFields={UserProfileFormFields}
                doMakeUserConfirmPassword={true}
              />
            );
        }
      })()}
    </Suspense>
  );
}
