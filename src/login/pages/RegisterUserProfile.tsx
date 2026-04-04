// ejected using 'npx eject-keycloak-page'
import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { UserProfileFormFields } from "./shared/UserProfileFormFields";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function RegisterUserProfile(
  props: PageProps<
    Extract<KcContext, { pageId: "register-user-profile.ftl" }>,
    I18n
  >,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  });

  const { url, messagesPerField, recaptchaRequired, recaptchaSiteKey } =
    kcContext;

  const { msg, msgStr } = i18n;

  const [isFormSubmittable, setIsFormSubmittable] = useState(false);

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayMessage={messagesPerField.exists("global")}
      displayRequiredFields={true}
      headerNode={msg("registerTitle")}
    >
      <form
        id="kc-register-form"
        className={kcClsx("kcFormClass")}
        action={url.registrationAction}
        method="post"
      >
        <UserProfileFormFields
          kcContext={kcContext}
          onIsFormSubmittableValueChange={setIsFormSubmittable}
          i18n={i18n}
          getClassName={kcClsx}
        />
        {recaptchaRequired && (
          <div className="form-group">
            <div className={kcClsx("kcInputWrapperClass")}>
              <div
                className="g-recaptcha"
                data-size="compact"
                data-sitekey={recaptchaSiteKey}
              />
            </div>
          </div>
        )}
        <div
          className={kcClsx("kcFormGroupClass")}
          style={{ marginBottom: 30 }}
        >
          <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
            <div className={kcClsx("kcFormOptionsWrapperClass")}>
              <span>
                <a href={url.loginUrl}>{msg("backToLogin")}</a>
              </span>
            </div>
          </div>

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
              disabled={!isFormSubmittable}
            />
          </div>
        </div>
      </form>
    </Template>
  );
}
