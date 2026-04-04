import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import Turnstile from "react-turnstile";

export default function Register(
  props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  });

  const {
    url,
    messagesPerField,
    register,
    realm,
    passwordRequired,
    recaptchaRequired,
    recaptchaSiteKey,
  } = kcContext;

  const recaptchaVisible =
    "recaptchaVisible" in kcContext
      ? kcContext.recaptchaVisible === true
      : true;

  const { msg, msgStr } = i18n;

  const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] =
    useState(true);
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
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      headerNode={msg("registerTitle")}
    >
      <form
        id="kc-register-form"
        className={kcClsx("kcFormClass")}
        action={url.registrationAction}
        method="post"
        noValidate
      >
        <div
          className={clsx(
            kcClsx("kcFormGroupClass"),
            messagesPerField.printIfExists(
              "firstName",
              kcClsx("kcFormGroupErrorClass"),
            ),
          )}
        >
          <div className={kcClsx("kcLabelWrapperClass")}>
            <label htmlFor="firstName" className={kcClsx("kcLabelClass")}>
              {msg("firstName")}
            </label>
          </div>
          <div className={kcClsx("kcInputWrapperClass")}>
            <input
              type="text"
              id="firstName"
              className={kcClsx("kcInputClass")}
              name="firstName"
              defaultValue={register.formData.firstName ?? ""}
            />
          </div>
        </div>

        <div
          className={clsx(
            kcClsx("kcFormGroupClass"),
            messagesPerField.printIfExists(
              "lastName",
              kcClsx("kcFormGroupErrorClass"),
            ),
          )}
        >
          <div className={kcClsx("kcLabelWrapperClass")}>
            <label htmlFor="lastName" className={kcClsx("kcLabelClass")}>
              {msg("lastName")}
            </label>
          </div>
          <div className={kcClsx("kcInputWrapperClass")}>
            <input
              type="text"
              id="lastName"
              className={kcClsx("kcInputClass")}
              name="lastName"
              defaultValue={register.formData.lastName ?? ""}
            />
          </div>
        </div>

        <div
          className={clsx(
            kcClsx("kcFormGroupClass"),
            messagesPerField.printIfExists(
              "email",
              kcClsx("kcFormGroupErrorClass"),
            ),
          )}
        >
          <div className={kcClsx("kcLabelWrapperClass")}>
            <label htmlFor="email" className={kcClsx("kcLabelClass")}>
              {msg("email")}
            </label>
          </div>
          <div className={kcClsx("kcInputWrapperClass")}>
            <input
              type="text"
              id="email"
              className={kcClsx("kcInputClass")}
              name="email"
              defaultValue={register.formData.email ?? ""}
              autoComplete="email"
            />
          </div>
        </div>

        {!realm.registrationEmailAsUsername && (
          <div
            className={clsx(
              kcClsx("kcFormGroupClass"),
              messagesPerField.printIfExists(
                "username",
                kcClsx("kcFormGroupErrorClass"),
              ),
            )}
          >
            <div className={kcClsx("kcLabelWrapperClass")}>
              <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                {msg("username")}
              </label>
            </div>
            <div className={kcClsx("kcInputWrapperClass")}>
              <input
                type="text"
                id="username"
                className={kcClsx("kcInputClass")}
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
                kcClsx("kcFormGroupClass"),
                messagesPerField.printIfExists(
                  "password",
                  kcClsx("kcFormGroupErrorClass"),
                ),
              )}
            >
              <div className={kcClsx("kcLabelWrapperClass")}>
                <label htmlFor="password" className={kcClsx("kcLabelClass")}>
                  {msg("password")}
                </label>
              </div>
              <div className={kcClsx("kcInputWrapperClass")}>
                <input
                  type="password"
                  id="password"
                  className={kcClsx("kcInputClass")}
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
                kcClsx("kcFormGroupClass"),
                messagesPerField.printIfExists(
                  "password-confirm",
                  kcClsx("kcFormGroupErrorClass"),
                ),
              )}
            >
              <div className={kcClsx("kcLabelWrapperClass")}>
                <label
                  htmlFor="password-confirm"
                  className={kcClsx("kcLabelClass")}
                >
                  {msg("passwordConfirm")}
                </label>
              </div>
              <div className={kcClsx("kcInputWrapperClass")}>
                <input
                  type="password"
                  id="password-confirm"
                  className={kcClsx("kcInputClass")}
                  name="password-confirm"
                  autoComplete="new-password"
                />
              </div>
            </div>
          </>
        )}

        {recaptchaRequired && recaptchaVisible && (
          <div className="form-group">
            <div className={kcClsx("kcInputWrapperClass")}>
              <div
                className="g-recaptcha"
                data-size="compact"
                data-sitekey={recaptchaSiteKey}
              ></div>
            </div>
          </div>
        )}

        <Turnstile
          size="flexible"
          sitekey="0x4AAAAAACAYJLZXr_BFRj0f"
          onSuccess={handleTurnstileSuccess}
          onError={handleTurnstileError}
        />

        {errorMessage && errorMessage.trim() !== "" && (
          <h2 className="error">
            Error occurred in login verification with error code "{errorMessage}
            ". Please contact info@bitedata.io!
          </h2>
        )}

        {loadingMessage === "Loading" && (
          <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
            <div className="loading">
              Verifying that you are human.
              <div className="spinner" />
            </div>
          </div>
        )}

        {loadingMessage !== "Loading" && (
          <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
            <input
              className={clsx(
                kcClsx("kcButtonClass"),
                kcClsx("kcButtonPrimaryClass"),
                kcClsx("kcButtonBlockClass"),
                kcClsx("kcButtonLargeClass"),
              )}
              type="submit"
              value={msgStr("doRegister")}
              disabled={
                isRegisterButtonDisabled ||
                (recaptchaRequired && !recaptchaVisible)
              }
            />
          </div>
        )}

        <div
          className={clsx(
            kcClsx("kcFormGroupClass"),
            "pf-v5-c-login__main-footer-band",
          )}
        >
          <div
            id="kc-form-options"
            className={clsx(
              kcClsx("kcFormOptionsClass"),
              "pf-v5-c-login__main-footer-band-item",
            )}
          >
            <div className={kcClsx("kcFormOptionsWrapperClass")}>
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
