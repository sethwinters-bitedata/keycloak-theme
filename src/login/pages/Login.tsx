import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import Turnstile from "react-turnstile";

export default function Login(
  props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const getClassName = (
    kcClass: string,
    ...extra: Array<string | undefined | false>
  ) =>
    clsx(
      doUseDefaultCss && kcClass,
      classes?.[kcClass as keyof typeof classes],
      ...extra,
    );

  const {
    social,
    realm,
    url,
    usernameHidden,
    login,
    auth,
    registrationDisabled,
    messagesPerField,
    isAppInitiatedAction,
  } = kcContext;

  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("Loading");

  const hasSocialProviders = (social?.providers?.length ?? 0) > 0;

  const loginLabel = !realm.loginWithEmailAllowed
    ? "username"
    : realm.registrationEmailAsUsername
      ? "email"
      : "usernameOrEmail";

  const onTurnstileVerify = (token: string) => {
    const captchaInput = document.getElementById(
      "cf-turnstile-response",
    ) as HTMLInputElement | null;

    if (captchaInput) {
      captchaInput.value = token;
    }

    setIsLoginButtonDisabled(false);
    setErrorMessage("");
    setLoadingMessage("");
  };

  const onTurnstileExpire = () => {
    setIsLoginButtonDisabled(true);
    setErrorMessage("Security check expired. Please verify again.");
  };

  const onTurnstileError = () => {
    setIsLoginButtonDisabled(true);
    setErrorMessage("Security check failed. Please try again.");
  };

  const onRememberMeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const hiddenInput = document.getElementById(
      "rememberMe-hidden",
    ) as HTMLInputElement | null;

    if (!hiddenInput) {
      return;
    }

    hiddenInput.disabled = event.target.checked;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (isLoginButtonDisabled) {
      event.preventDefault();
    }
  };

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayInfo={Boolean(
        realm.password && realm.registrationAllowed && !registrationDisabled,
      )}
      headerNode={msg("loginAccountTitle")}
      infoNode={
        <div id="kc-registration-container">
          <div id="kc-registration">
            <span>
              {msg("noAccount")}{" "}
              <a href={url.registrationUrl}>{msg("doRegister")}</a>
            </span>
          </div>
        </div>
      }
    >
      {realm.password && (
        <form
          id="kc-form-login"
          className={getClassName("kcFormClass")}
          onSubmit={onSubmit}
          action={url.loginAction}
          method="post"
          noValidate
        >
          {!usernameHidden && (
            <div className={getClassName("kcFormGroupClass")}>
              <label
                htmlFor="username"
                className={getClassName("kcLabelClass")}
              >
                {msg(loginLabel)}
              </label>
              <input
                tabIndex={1}
                id="username"
                className={getClassName("kcInputClass")}
                name="username"
                defaultValue={login.username ?? ""}
                type="text"
                autoFocus
                autoComplete="username"
                aria-invalid={messagesPerField.existsError(
                  "username",
                  "password",
                )}
              />
            </div>
          )}

          <div className={getClassName("kcFormGroupClass")}>
            <label htmlFor="password" className={getClassName("kcLabelClass")}>
              {msg("password")}
            </label>
            <input
              tabIndex={2}
              id="password"
              className={getClassName("kcInputClass")}
              name="password"
              type="password"
              autoComplete="current-password"
              aria-invalid={messagesPerField.existsError(
                "username",
                "password",
              )}
            />
          </div>

          {messagesPerField.existsError("username", "password") && (
            <div
              className={getClassName("kcInputErrorMessageClass")}
              aria-live="polite"
            >
              {messagesPerField.getFirstError("username", "password")}
            </div>
          )}

          {realm.rememberMe && !usernameHidden && (
            <div className={getClassName("kcFormGroupClass")}>
              <label className={getClassName("kcLabelClass")}>
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  defaultChecked={
                    login.rememberMe !== undefined &&
                    login.rememberMe.toLowerCase() === "on"
                  }
                  onChange={onRememberMeChange}
                />{" "}
                {msg("rememberMe")}
              </label>
              <input
                type="hidden"
                id="rememberMe-hidden"
                name="rememberMe"
                value="off"
                defaultChecked={
                  login.rememberMe !== undefined &&
                  login.rememberMe.toLowerCase() === "on"
                }
              />
            </div>
          )}

          {realm.resetPasswordAllowed && (
            <div className={getClassName("kcFormGroupClass")}>
              <span>
                <a href={url.loginResetCredentialsUrl}>
                  {msg("doForgotPassword")}
                </a>
              </span>
            </div>
          )}

          <div className={getClassName("kcFormGroupClass")}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Turnstile
                sitekey="<SECRET>"
                onVerify={onTurnstileVerify}
                onExpire={onTurnstileExpire}
                onError={onTurnstileError}
              />
            </div>
          </div>

          <input
            type="hidden"
            id="cf-turnstile-response"
            name="cf-turnstile-response"
            value=""
          />

          {errorMessage && (
            <div
              className={getClassName("kcInputErrorMessageClass")}
              aria-live="polite"
            >
              {errorMessage}
            </div>
          )}

          {loadingMessage && <div aria-live="polite">{loadingMessage}</div>}

          <div className={getClassName("kcFormGroupClass")}>
            <input
              tabIndex={4}
              className={getClassName(
                "kcButtonClass",
                "kcButtonPrimaryClass",
                "kcButtonBlockClass",
                "kcButtonLargeClass",
              )}
              name="login"
              id="kc-login"
              type="submit"
              value={msgStr("doLogIn")}
              disabled={isLoginButtonDisabled}
            />
          </div>

          {auth?.selectedCredential && (
            <input
              type="hidden"
              id="id-hidden-input"
              name="credentialId"
              value={auth.selectedCredential}
            />
          )}
        </form>
      )}

      {hasSocialProviders && (
        <div
          id="kc-social-providers"
          className={getClassName("kcFormSocialAccountSectionClass")}
        >
          <hr />
          <h2>{msg("identity-provider-login-label")}</h2>
          <ul className={getClassName("kcFormSocialAccountListClass")}>
            {social?.providers?.map((provider: any) => (
              <li key={provider.alias}>
                <a
                  id={`social-${provider.alias}`}
                  className={getClassName(
                    "kcFormSocialAccountListButtonClass",
                    provider.providerId,
                  )}
                  type="button"
                  href={provider.loginUrl}
                >
                  {provider.iconClasses && (
                    <i
                      className={clsx(
                        getClassName("kcCommonLogoIdP"),
                        provider.iconClasses,
                      )}
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={clsx(
                      getClassName("kcFormSocialAccountNameClass"),
                      provider.iconClasses ? "kc-social-icon-text" : undefined,
                    )}
                  >
                    {provider.displayName}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isAppInitiatedAction && (
        <div className={getClassName("kcFormGroupClass")}>
          <a href={url.loginAction}>{msg("backToApplication")}</a>
        </div>
      )}
    </Template>
  );
}
