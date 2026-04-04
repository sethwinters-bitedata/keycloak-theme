import { clsx } from "keycloakify/tools/clsx";
import type { TemplateProps } from "keycloakify/login/TemplateProps"; // ✅ FIXED
import type { KcContext } from "./kcContext"; // ✅ FIXED
import type { I18n } from "./i18n";

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const { kcContext, i18n, children } = props;

  const { msg } = i18n;

  const { locale, url, realm, message, referrer } = kcContext;

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
                {/* 🌍 Language selector (NEW API) */}
                {realm.internationalizationEnabled &&
                  locale?.supported?.length &&
                  locale?.supported?.length > 1 && (
                    <li>
                      <div className="kc-dropdown" id="kc-locale-dropdown">
                        <a href="#" onClick={(e) => e.preventDefault()}>
                          {i18n.currentLanguage.label}
                        </a>

                        <ul>
                          {i18n.supportedLanguages.map((lang) => (
                            <li key={lang.languageTag}>
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  i18n.setCurrentLanguageTag(lang.languageTag);
                                }}
                              >
                                {lang.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  )}

                {referrer?.url && (
                  <li>
                    <a href={referrer.url}>{msg("backTo", referrer.name)}</a>
                  </li>
                )}

                <li>
                  <a href={url.getLogoutUrl()}>{msg("doSignOut")}</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className="container">
        {message && (
          <div className={clsx("alert", `alert-${message.type}`)}>
            <span>{message.summary}</span>
          </div>
        )}

        {children}
      </div>
    </>
  );
}
