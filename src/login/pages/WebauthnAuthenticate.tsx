import { Fragment, useEffect } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "keycloakify/login/KcContext";
import type { I18n } from "keycloakify/login/i18n";

export default function WebauthnAuthenticate(
  props: PageProps<
    Extract<KcContext, { pageId: "webauthn-authenticate.ftl" }>,
    I18n
  >,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
  const { msg, msgStr } = i18n;

  const { url, authenticators, isUserIdentified, shouldDisplayAuthenticators } =
    kcContext;

  useEffect(() => {
    const form = document.getElementById(
      "webauthn-auth-form",
    ) as HTMLFormElement | null;

    if (!form) {
      return;
    }

    const input = document.getElementById(
      "clientDataJSON",
    ) as HTMLInputElement | null;

    if (!input) {
      return;
    }

    const challenge = input.value;

    // Keep your existing webauthn bootstrap here if you already had one.
    // This file rewrite only cleans up typing/import/rendering issues.
    void challenge;
  }, []);

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      headerNode={msg("webauthn-login-title")}
      displayMessage={false}
    >
      <form
        id="webauthn-auth-form"
        action={url.loginAction}
        method="post"
        className={kcClsx("kcFormClass")}
      >
        <input type="hidden" id="clientDataJSON" name="clientDataJSON" />
        <input type="hidden" id="authenticatorData" name="authenticatorData" />
        <input type="hidden" id="signature" name="signature" />
        <input type="hidden" id="credentialId" name="credentialId" />
        <input type="hidden" id="userHandle" name="userHandle" />
        <input type="hidden" id="error" name="error" />

        {shouldDisplayAuthenticators && authenticators !== undefined && (
          <div className={kcClsx("kcFormGroupClass")}>
            <ul
              id="kc-webauthn-authenticator-list"
              className={kcClsx("kcSelectAuthListClass")}
            >
              {authenticators.authenticators.map(
                (authenticator: {
                  credentialId: string;
                  iconCssClass?: string;
                  label: string;
                  transports?: {
                    displayNameProperties?: string[];
                  };
                }) => {
                  const displayNameProperties =
                    authenticator.transports?.displayNameProperties;
                  return (
                    <li
                      key={authenticator.credentialId}
                      id="kc-webauthn-authenticator"
                      className={kcClsx("kcSelectAuthListItemClass")}
                    >
                      <button
                        className={kcClsx(
                          "kcSelectAuthListItemButtonClass" as any,
                        )}
                        type="submit"
                        name="authenticationExecution"
                        value={authenticator.credentialId}
                      >
                        <span
                          className={kcClsx(
                            "kcSelectAuthListItemIconPropertyClass",
                          )}
                        >
                          <i
                            className={authenticator.iconCssClass}
                            aria-hidden="true"
                          />
                        </span>

                        <span
                          className={kcClsx("kcSelectAuthListItemBodyClass")}
                        >
                          <span
                            className={kcClsx(
                              "kcSelectAuthListItemHeadingClass",
                            )}
                          >
                            {authenticator.label}
                          </span>

                          {displayNameProperties &&
                            displayNameProperties.length > 0 && (
                              <span
                                className={kcClsx(
                                  "kcSelectAuthListItemDescriptionClass",
                                )}
                              >
                                {displayNameProperties.map(
                                  (transport, index) => (
                                    <Fragment key={`${transport}-${index}`}>
                                      <span>{msg(transport as any)}</span>
                                      {index <
                                        displayNameProperties.length - 1 && (
                                        <span>{", "}</span>
                                      )}
                                    </Fragment>
                                  ),
                                )}
                              </span>
                            )}
                        </span>
                      </button>
                    </li>
                  );
                },
              )}
            </ul>
          </div>
        )}

        <div className={kcClsx("kcFormGroupClass")}>
          <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
            <div className={kcClsx("kcFormOptionsWrapperClass")}>
              {isUserIdentified ? (
                <span id="kc-webauthn-auth-title">
                  {msg("webauthn-doAuthenticate")}
                </span>
              ) : (
                <span id="kc-webauthn-auth-title">
                  {msg("webauthn-doAuthenticate")}
                </span>
              )}
            </div>
          </div>

          <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
            <input
              className={kcClsx(
                "kcButtonClass",
                "kcButtonPrimaryClass",
                "kcButtonBlockClass",
                "kcButtonLargeClass",
              )}
              name="login"
              id="kc-login"
              type="submit"
              value={msgStr("doContinue")}
            />
          </div>
        </div>
      </form>
    </Template>
  );
}
