import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import Turnstile from "react-turnstile";

export default function Register(props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const { url, messagesPerField, register, realm, passwordRequired, recaptchaRequired, recaptchaSiteKey } = kcContext;

  const recaptchaVisible = "recaptchaVisible" in kcContext ? kcContext.recaptchaVisible === true : true;

  const { msg, msgStr } = i18n;

  const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("Loading");

  const handleTurnstileSuccess = () => {
    setIsRegisterButtonDisabled(false);
    setErrorMessage("");
    setLoadingMessage("");
  };

  const handleTurnstileError = (error: string) => {
    if (error === "Failed to load Turnstile.") {
      setIsRegisterButtonDisabled(false);
      setErrorMessage("");
    } else {
      setIsRegisterButtonDisabled(true);
      setErrorMessage(error);
    }

    console.log("Turnstile Error:", error);
    setLoadingMessage("");
  };

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={msg("registerTitle")}>
      <form id="kc-register-form" className={getClassName("kcFormClass")} action={url.registrationAction} method="post" noValidate>
        <div
          className={clsx(
            getClassName("kcFormGroupClass"),
            messagesPerField.printIfExists("firstName", getClassName("kcFormGroupErrorClass")),
          )}
        >
          <div className={getClassName("kcLabelWrapperClass")}>
            <label htmlFor="firstName" className={getClassName("kcLabelClass")}>
              {msg("firstName")}
            </label>
          </div>
          <div className={getClassName("kcInputWrapperClass")}>
            <input type="text" id="firstName" className={getClassName("kcInputClass")} name="firstName" defaultValue={register.formData.firstName ?? ""} />
          </div>
        </div>

        <div
          className={clsx(
            getClassName("kcFormGroupClass"),
            messagesPerField.printIfExists("lastName", getClassName("kcFormGroupErrorClass")),
          )}
        >
          <div className={getClassName("kcLabelWrapperClass")}>
            <label htmlFor="lastName" className={getClassName("kcLabelClass")}>
              {msg("lastName")}
            </label>
          </div>
          <div className={getClassName("kcInputWrapperClass")}>
            <input type="text" id="lastName" className={getClassName("kcInputClass")} name="lastName" defaultValue={register.formData.lastName ?? ""} />
          </div>
        </div>

        <div
          className={clsx(
            getClassName("kcFormGroupClass"),
            messagesPerField.printIfExists("email", getClassName("kcFormGroupErrorClass")),
          )}
        >
          <div className={getClassName("kcLabelWrapperClass")}>
            <label htmlFor="email" className={getClassName("kcLabelClass")}>
              {msg("email")}
            </label>
          </div>
          <div className={getClassName("kcInputWrapperClass")}>
            <input
              type="text"
              id="email"
              className={getClassName("kcInputClass")}
              name="email"
              defaultValue={register.formData.email ?? ""}
              autoComplete="email"
            />
          </div>
        </div>

        {!realm.registrationEmailAsUsername && (
          <div
            className={clsx(
              getClassName("kcFormGroupClass"),
              messagesPerField.printIfExists("username", getClassName("kcFormGroupErrorClass")),
            )}
          >
            <div className={getClassName("kcLabelWrapperClass")}>
              <label htmlFor="username" className={getClassName("kcLabelClass")}>
                {msg("username")}
              </label>
            </div>
            <div className={getClassName("kcInputWrapperClass")}>
              <input
                type="text"
                id="username"
                className={getClassName("kcInputClass")}
                name="username"
                defaultValue={register.formData.username ?? ""}
                autoComplete="username"
              />
            </div>
          </div>
        )}

        {passwordRequired && (
          <>
            <div
              className={clsx(
                getClassName("kcFormGroupClass"),
                messagesPerField.printIfExists("password", getClassName("kcFormGroupErrorClass")),
              )}
            >
              <div className={getClassName("kcLabelWrapperClass")}>
                <label htmlFor="password" className={getClassName("kcLabelClass")}>
                  {msg("password")}
                </label>
              </div>
              <div className={getClassName("kcInputWrapperClass")}>
                <input
                  type="password"
                  id="password"
                  className={getClassName("kcInputClass")}
                  name="password"
                  autoComplete="new-password"
                  minLength={12}
                  aria-describedby="password-help"
                />
                <div
                  id="password-help"
                  style={{
                    color: "var(--kc-text-secondary, #6B7280)",
                    fontSize: "0.875rem",
                    marginTop: "0.5rem",
                    lineHeight: 1.4,
                  }}
                >
                  Password must include:
                  <ul style={{ margin: "0.25rem 0 0 1rem", padding: 0 }}>
                    <li>A capital letter (A-Z)</li>
                    <li>A lowercase letter (a-z)</li>
                    <li>A number (0-9)</li>
                    <li>A special character (!@#$%^&* etc.)</li>
                    <li>At least 12 characters in length</li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              className={clsx(
                getClassName("kcFormGroupClass"),
                messagesPerField.printIfExists("password-confirm", getClassName("kcFormGroupErrorClass")),
              )}
            >
              <div className={getClassName("kcLabelWrapperClass")}>
                <label htmlFor="password-confirm" className={getClassName("kcLabelClass")}>
                  {msg("passwordConfirm")}
                </label>
              </div>
              <div className={getClassName("kcInputWrapperClass")}>
                <input type="password" id="password-confirm" className={getClassName("kcInputClass")} name="password-confirm" autoComplete="new-password" />
              </div>
            </div>
          </>
        )}

        {recaptchaRequired && recaptchaVisible && (
          <div className="form-group">
            <div className={getClassName("kcInputWrapperClass")}>
              <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey}></div>
            </div>
          </div>
        )}

        <Turnstile size="flexible" sitekey="0x4AAAAAACAYJLZXr_BFRj0f" onSuccess={handleTurnstileSuccess} onError={handleTurnstileError} />

        {errorMessage && errorMessage.trim() !== "" && (
          <h2 className="error">
            Error occurred in login verification with error code "{errorMessage}". Please contact info@bitedata.io!
          </h2>
        )}

        {loadingMessage === "Loading" && (
          <div id="kc-form-buttons" className={getClassName("kcFormGroupClass")}>
            <div className="loading">
              Verifying that you are human.
              <div className="spinner" />
            </div>
          </div>
        )}

        {loadingMessage !== "Loading" && (
          <div id="kc-form-buttons" className={getClassName("kcFormButtonsClass")}>
            <input
              className={clsx(
                getClassName("kcButtonClass"),
                getClassName("kcButtonPrimaryClass"),
                getClassName("kcButtonBlockClass"),
                getClassName("kcButtonLargeClass"),
              )}
              type="submit"
              value={msgStr("doRegister")}
              disabled={isRegisterButtonDisabled || (recaptchaRequired && !recaptchaVisible)}
            />
          </div>
        )}

        <div className={clsx(getClassName("kcFormGroupClass"), "pf-v5-c-login__main-footer-band")}>
          <div id="kc-form-options" className={clsx(getClassName("kcFormOptionsClass"), "pf-v5-c-login__main-footer-band-item")}>
            <div className={getClassName("kcFormOptionsWrapperClass")}>
              <span>
                <a href={url.loginUrl}>{msg("backToLogin")}</a>
              </span>
            </div>
          </div>
        </div>
      </form>
    </Template>
  );
}
