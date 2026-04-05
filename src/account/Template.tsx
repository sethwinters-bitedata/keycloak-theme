import { clsx } from "keycloakify/tools/clsx";
import type { ReactElement } from "react";
import type { TemplateProps } from "keycloakify/account/TemplateProps";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";

export default function Template(
  props: TemplateProps<KcContext, I18n> & {
    headerNode?: ReactElement | string;
    infoNode?: ReactElement | string;
    displayInfo?: boolean;
    displayMessage?: boolean;
  },
): ReactElement | null {
  const {
    kcContext,
    i18n,
    children,
    headerNode,
    displayMessage = true,
    displayInfo = false,
    infoNode,
  } = props;

  const { msg } = i18n;
  const { url, message } = kcContext;
  const referrer =
    "referrer" in kcContext
      ? (kcContext.referrer as { url: string; name: string })
      : undefined;

  return (
    <>
      <header className="navbar navbar-default navbar-pf navbar-main header">
        <nav className="navbar" role="navigation">
          <div className="navbar-header">
            <div className="container">
              <h1 className="navbar-title">Keycloak</h1>
            </div>
          </div>

          <div className="navbar-collapse navbar-collapse-1">
            <div className="container">
              <ul className="nav navbar-nav navbar-utility">
                {referrer?.url && (
                  <li>
                    <a href={referrer.url} id="referrer">
                      {msg("backTo", referrer.name)}
                    </a>
                  </li>
                )}

                <li>
                  <a href={url.loginAction}>{msg("doLogIn")}</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className="container">
        <div className="col-sm-12 content-area">
          {headerNode && <h1>{headerNode}</h1>}

          {displayMessage && message !== undefined && (
            <div className={clsx("alert", `alert-${message.type}`)}>
              <span className="kc-feedback-text">{message.summary}</span>
            </div>
          )}

          {children}

          {displayInfo && infoNode && <div id="kc-info">{infoNode}</div>}
        </div>
      </div>
    </>
  );
}
