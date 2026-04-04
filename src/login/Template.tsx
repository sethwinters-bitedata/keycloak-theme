// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { useState, useEffect } from "react";
import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/login/TemplateProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        displayWide = false,
        showAnotherWayIfPresent = true,
        headerNode,
        showUsernameNode = null,
        infoNode = null,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

    const { msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag } = i18n;

    const { realm, locale, auth, url, message, isAppInitiatedAction } = kcContext;

    const { isReady } = usePrepareTemplate({
        "doFetchDefaultThemeResources": doUseDefaultCss,
        "styles": [
            `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
            `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
            `${url.resourcesCommonPath}/lib/zocial/zocial.css`,
            `${url.resourcesPath}/css/login.css`
        ],
        "htmlClassName": getClassName("kcHtmlClass"),
        "bodyClassName": getClassName("kcBodyClass")
    });

    useState(()=> { document.title = i18n.msgStr("loginTitle", kcContext.realm.displayName); });

    useEffect(() => {
        console.log(`Value of MY_ENV_VARIABLE on the Keycloak server: "${kcContext.properties.MY_ENV_VARIABLE}"`);
    }, []);

    if (!isReady) {
        return null;
    }

    return (
        <div className={getClassName("kcLoginClass")}>
            <div id="kc-header" className={getClassName("kcHeaderClass")}>
                <div 
                    id="kc-header-wrapper" 
                    className={getClassName("kcHeaderWrapperClass")}
                    style={{ 'display': 'flex', 'gap': '10px', 'justifyContent': 'center', alignItems: 'center' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <g clip-path="url(#clip0_3791_27667)">
    <path d="M29.6082 14.6797C30.232 14.5404 30.7832 14.2106 31.1999 13.7546C32.3012 12.5485 32.2572 10.6865 31.1011 9.53165C30.7106 9.14115 30.2142 8.85541 29.6605 8.72088C29.1093 8.58753 28.4557 8.62801 27.7485 8.47324C26.7151 8.24703 25.7686 7.72675 25.0197 6.97789C24.2137 6.17307 23.6756 5.14085 23.4791 4.02053C23.3708 3.40262 23.4113 2.68948 23.2136 2.09419C23.0589 1.6263 22.7934 1.20841 22.4493 0.871483C21.2516 -0.300033 19.3324 -0.289318 18.1478 0.896485C16.9894 2.0549 16.9489 3.92409 18.0585 5.12894C18.3537 5.4504 18.7169 5.70756 19.1252 5.879C19.9253 6.21593 20.261 6.09449 21.0456 6.20045C21.4992 6.26117 21.9457 6.37784 22.3707 6.5481C22.8255 6.73025 22.9493 6.79811 23.3374 7.0517C24.0577 7.52198 24.6614 8.15655 25.0971 8.90065C25.5769 9.72214 25.8519 10.6758 25.8519 11.6937C25.8519 13.2153 25.2376 14.5951 24.2423 15.5976C23.447 16.4 22.4064 16.9596 21.2432 17.1572C20.6896 17.2513 20.086 17.2048 19.5431 17.3441C19.0062 17.4822 18.5264 17.7632 18.1466 18.143C16.9525 19.3371 16.9525 21.2742 18.1466 22.4683C19.2955 23.6172 21.1456 23.6684 22.3529 22.5826C22.7481 22.2278 23.0493 21.7707 23.2184 21.254C23.4363 20.5849 23.3541 20.2658 23.441 19.5907C23.6018 18.3466 24.1744 17.231 25.0185 16.3869C25.8793 15.5261 27.0211 14.9475 28.295 14.7999C28.8236 14.7392 29.0962 14.7928 29.607 14.6785L29.6082 14.6797Z" fill="url(#paint0_linear_3791_27667)"/>
    <path d="M14.6797 2.39066C14.5404 1.7668 14.2106 1.21438 13.7546 0.798874C12.5486 -0.301207 10.6865 -0.258347 9.53166 0.897691C9.14115 1.2882 8.85542 1.78347 8.72089 2.33827C8.58754 2.88951 8.62802 3.54313 8.47206 4.25032C8.24585 5.28373 7.72557 6.23023 6.97671 6.97791C6.17189 7.78392 5.13967 8.32205 4.01935 8.5185C3.40144 8.62684 2.68829 8.58636 2.09301 8.78399C1.62512 8.93877 1.20842 9.20426 0.871492 9.54834C-0.300024 10.746 -0.289308 12.6664 0.896494 13.851C2.05491 15.0095 3.9241 15.0499 5.12895 13.9403C5.4504 13.6451 5.70757 13.2819 5.87901 12.8736C6.21594 12.0735 6.0945 11.739 6.20046 10.952C6.26118 10.4984 6.37785 10.0519 6.54811 9.62691C6.73026 9.17212 6.79812 9.0483 7.05291 8.66017C7.52318 7.93988 8.15656 7.33627 8.90185 6.90052C9.72215 6.42072 10.677 6.1457 11.6949 6.1457C13.2176 6.1457 14.5963 6.76003 15.5988 7.75534C16.4012 8.55183 16.9608 9.5912 17.1584 10.7544C17.2525 11.308 17.2049 11.9104 17.3453 12.4545C17.4834 12.9914 17.7644 13.4712 18.1442 13.851C19.3383 15.0452 21.2754 15.0452 22.4695 13.851C23.6637 12.6569 23.6696 10.852 22.5838 9.64477C22.229 9.2495 21.7719 8.94829 21.2552 8.78042C20.5861 8.56255 20.267 8.6447 19.5919 8.55659C18.3478 8.39587 17.2322 7.82321 16.3881 6.9791C15.5273 6.11832 14.9487 4.97538 14.8011 3.70266C14.7404 3.17405 14.794 2.90141 14.6797 2.39066Z" fill="url(#paint1_linear_3791_27667)"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.3203 29.6093C17.4596 30.2332 17.7894 30.7844 18.2454 31.2011C19.4514 32.3012 21.3135 32.2583 22.4683 31.1023C22.8588 30.7118 23.1446 30.2165 23.2779 29.6605C23.4113 29.1093 23.3708 28.4569 23.5256 27.7485C23.7518 26.7151 24.272 25.7686 25.0209 25.0209C25.8269 24.2149 26.858 23.6768 27.9783 23.4803C28.5962 23.372 29.3093 23.4124 29.9046 23.2148C30.3725 23.06 30.7892 22.7945 31.1261 22.4505C32.2976 21.2528 32.2869 19.3324 31.1011 18.1478C29.9427 16.9893 28.0735 16.9489 26.8687 18.0585C26.5472 18.3537 26.2901 18.7169 26.1186 19.1252C25.7817 19.9265 25.9031 20.2598 25.7972 21.0456C25.7364 21.4992 25.6198 21.9457 25.4495 22.3707C25.2674 22.8255 25.1995 22.9493 24.9459 23.3374C24.4744 24.0577 23.8411 24.6613 23.097 25.0971C22.2755 25.5769 21.3218 25.8519 20.3039 25.8519C18.7812 25.8519 17.4025 25.2376 16.4 24.2423C15.5976 23.4458 15.038 22.4064 14.8404 21.2432C14.7463 20.6896 14.7928 20.0872 14.6535 19.5431C14.5154 19.0062 14.2344 18.5264 13.8546 18.1466C12.6605 16.9524 10.7234 16.9524 9.52928 18.1466C8.38039 19.2955 8.32919 21.1456 9.41499 22.3528C9.76978 22.7481 10.227 23.0493 10.7437 23.2172C11.4128 23.4351 11.7318 23.3529 12.4069 23.441C13.651 23.6006 14.7666 24.1744 15.6107 25.0185C16.4715 25.8793 17.0501 27.021 17.1977 28.295C17.2584 28.8236 17.2049 29.0962 17.3191 29.607L17.3203 29.6093Z" fill="url(#paint2_linear_3791_27667)"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.39065 17.3203C1.7668 17.4596 1.21557 17.7894 0.798869 18.2454C-0.301213 19.4515 -0.258352 21.3135 0.897686 22.4683C1.28819 22.8588 1.78347 23.1446 2.33827 23.2791C2.8895 23.4125 3.54312 23.372 4.25032 23.5279C5.28373 23.7542 6.23023 24.2744 6.97909 25.0233C7.7851 25.8281 8.32324 26.8603 8.51968 27.9807C8.62802 28.5986 8.58754 29.3117 8.78518 29.907C8.93995 30.3749 9.20545 30.7928 9.54952 31.1285C10.7472 32.3 12.6664 32.2893 13.8522 31.1047C15.0106 29.9463 15.0511 28.0771 13.9415 26.8722C13.6463 26.5508 13.2831 26.2936 12.8748 26.1222C12.0747 25.7853 11.7402 25.9067 10.9544 25.8007C10.5008 25.74 10.0543 25.6233 9.62929 25.4531C9.17449 25.2709 9.05067 25.2031 8.66255 24.9495C7.94226 24.4792 7.33864 23.8446 6.90289 23.1005C6.4231 22.279 6.14808 21.3254 6.14808 20.3075C6.14808 18.7859 6.76241 17.4061 7.75772 16.4036C8.55421 15.6012 9.59357 15.0416 10.7568 14.844C11.3104 14.7499 11.914 14.7975 12.4569 14.657C12.9938 14.5189 13.4736 14.238 13.8534 13.8582C15.0475 12.664 15.0475 10.727 13.8534 9.53286C12.7045 8.38396 10.8544 8.33277 9.64715 9.41975C9.25188 9.77454 8.95067 10.2317 8.7828 10.7484C8.56492 11.4175 8.64707 11.7366 8.56016 12.4116C8.39944 13.6558 7.82677 14.7713 6.98266 15.6155C6.12188 16.4762 4.98013 17.0548 3.70623 17.2025C3.17762 17.2632 2.90498 17.2096 2.39423 17.3227L2.39065 17.3203Z" fill="url(#paint3_linear_3791_27667)"/>
  </g>
  <defs>
    <linearGradient id="paint0_linear_3791_27667" x1="24.6244" y1="-6.10352e-05" x2="24.6244" y2="23.3646" gradientUnits="userSpaceOnUse">
      <stop offset="0.0885417" stop-color="#4CC9F0"/>
      <stop offset="0.630208" stop-color="#4895EF"/>
      <stop offset="1" stop-color="#4361EE"/>
    </linearGradient>
    <linearGradient id="paint1_linear_3791_27667" x1="11.6911" y1="0.00140381" x2="11.6911" y2="14.7469" gradientUnits="userSpaceOnUse">
      <stop offset="0.0885417" stop-color="#4CC9F0"/>
      <stop offset="0.630208" stop-color="#4895EF"/>
      <stop offset="1" stop-color="#4361EE"/>
    </linearGradient>
    <linearGradient id="paint2_linear_3791_27667" x1="20.3153" y1="17.251" x2="20.3153" y2="31.9986" gradientUnits="userSpaceOnUse">
      <stop stop-color="#4895EF"/>
      <stop offset="0.489583" stop-color="#4361EE"/>
      <stop offset="1" stop-color="#3F37C9"/>
    </linearGradient>
    <linearGradient id="paint3_linear_3791_27667" x1="7.37521" y1="8.63672" x2="7.37521" y2="32.0002" gradientUnits="userSpaceOnUse">
      <stop offset="0.161458" stop-color="#4895EF"/>
      <stop offset="0.645833" stop-color="#4361EE"/>
      <stop offset="1" stop-color="#3F37C9"/>
    </linearGradient>
    <clipPath id="clip0_3791_27667">
      <rect width="32" height="32" fill="white"/>
    </clipPath>
  </defs>
                    </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="18" viewBox="0 0 52 18" fill="none">
                        <path d="M0.675137 17.2638V0.896179H7.22858C8.43271 0.896179 9.43704 1.07467 10.2416 1.43164C11.0461 1.78862 11.6508 2.28412 12.0558 2.91816C12.4607 3.54686 12.6631 4.27147 12.6631 5.09198C12.6631 5.73134 12.5353 6.29345 12.2795 6.7783C12.0238 7.25782 11.6721 7.65209 11.2246 7.96111C10.7824 8.26481 10.2762 8.48059 9.70611 8.60847V8.76831C10.3295 8.79495 10.9129 8.97077 11.4564 9.29578C12.0051 9.62079 12.45 10.0763 12.791 10.6624C13.132 11.2432 13.3025 11.9358 13.3025 12.7403C13.3025 13.6088 13.0867 14.384 12.6552 15.066C12.2289 15.7427 11.5975 16.2781 10.7611 16.6724C9.92455 17.0667 8.89358 17.2638 7.66814 17.2638H0.675137ZM4.13568 14.4346H6.95685C7.92122 14.4346 8.62452 14.2508 9.06674 13.8832C9.50897 13.5102 9.73008 13.0147 9.73008 12.3967C9.73008 11.9438 9.62086 11.5442 9.40241 11.1979C9.18396 10.8516 8.87227 10.5798 8.46734 10.3827C8.06774 10.1856 7.59089 10.087 7.03677 10.087H4.13568V14.4346ZM4.13568 7.74533H6.70111C7.1753 7.74533 7.59622 7.66275 7.96385 7.49758C8.33681 7.32708 8.62985 7.08732 8.84297 6.7783C9.06142 6.46927 9.17064 6.09898 9.17064 5.66741C9.17064 5.076 8.96019 4.59914 8.53927 4.23684C8.12369 3.87453 7.53228 3.69338 6.76505 3.69338H4.13568V7.74533Z" fill="#EFF1F6"/>
                        <path d="M20.1401 0.896179V17.2638H16.6795V0.896179H20.1401Z" fill="#EFF1F6"/>
                        <path d="M23.4891 3.74933V0.896179H36.9317V3.74933H31.9207V17.2638H28.5001V3.74933H23.4891Z" fill="#EFF1F6"/>
                        <path d="M40.2707 17.2638V0.896179H51.2997V3.74933H43.7313V7.64943H50.7323V10.5026H43.7313V14.4107H51.3317V17.2638H40.2707Z" fill="#EFF1F6"/>
                    </svg>
                </div>
            </div>

            <div className={clsx(getClassName("kcFormCardClass"), displayWide && getClassName("kcFormCardAccountClass"))} style={ {background: 'var(--Background-200, #202227)'}}>
                <header className={getClassName("kcFormHeaderClass")}>
                    {realm.internationalizationEnabled && (assert(locale !== undefined), true) && locale.supported.length > 1 && (
                        <div id="kc-locale">
                            <div id="kc-locale-wrapper" className={getClassName("kcLocaleWrapperClass")}>
                                <div className="kc-dropdown" id="kc-locale-dropdown">
                                    <a href="#" id="kc-current-locale-link">
                                        {labelBySupportedLanguageTag[currentLanguageTag]}
                                    </a>
                                    <ul>
                                        {locale.supported.map(({ languageTag }) => (
                                            <li key={languageTag} className="kc-dropdown-item">
                                                <a href="#" onClick={() => changeLocale(languageTag)}>
                                                    {labelBySupportedLanguageTag[languageTag]}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                    {!(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                        displayRequiredFields ? (
                            <div className={getClassName("kcContentWrapperClass")}>
                                <div className={clsx(getClassName("kcLabelWrapperClass"), "subtitle")}>
                                    <span className="subtitle">
                                        <span className="required">*</span>
                                        {msg("requiredFields")}
                                    </span>
                                </div>
                                <div className="col-md-10">
                                    <h1 id="kc-page-title">{headerNode}</h1>
                                </div>
                            </div>
                        ) : (
                            <h1 id="kc-page-title">{headerNode}</h1>
                        )
                    ) : displayRequiredFields ? (
                        <div className={getClassName("kcContentWrapperClass")}>
                            <div className={clsx(getClassName("kcLabelWrapperClass"), "subtitle")}>
                                <span className="subtitle">
                                    <span className="required">*</span> {msg("requiredFields")}
                                </span>
                            </div>
                            <div className="col-md-10">
                                {showUsernameNode}
                                <div className={getClassName("kcFormGroupClass")}>
                                    <div id="kc-username">
                                        <label id="kc-attempted-username">{auth?.attemptedUsername}</label>
                                        <a id="reset-login" href={url.loginRestartFlowUrl}>
                                            <div className="kc-login-tooltip">
                                                <i className={getClassName("kcResetFlowIcon")}></i>
                                                <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {showUsernameNode}
                            <div className={getClassName("kcFormGroupClass")}>
                                <div id="kc-username">
                                    <label id="kc-attempted-username">{auth?.attemptedUsername}</label>
                                    <a id="reset-login" href={url.loginRestartFlowUrl}>
                                        <div className="kc-login-tooltip">
                                            <i className={getClassName("kcResetFlowIcon")}></i>
                                            <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </>
                    )}
                </header>
                <div id="kc-content">
                    <div id="kc-content-wrapper">
                        {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                        {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                            <div className={clsx("alert", `alert-${message.type}`)}>
                                {message.type === "success" && <span className={getClassName("kcFeedbackSuccessIcon")}></span>}
                                {message.type === "warning" && <span className={getClassName("kcFeedbackWarningIcon")}></span>}
                                {message.type === "error" && <span className={getClassName("kcFeedbackErrorIcon")}></span>}
                                {message.type === "info" && <span className={getClassName("kcFeedbackInfoIcon")}></span>}
                                <span
                                    className="kc-feedback-text"
                                    dangerouslySetInnerHTML={{
                                        "__html": message.summary
                                    }}
                                />
                            </div>
                        )}
                        {children}
                        {auth !== undefined && auth.showTryAnotherWayLink && showAnotherWayIfPresent && (
                            <form
                                id="kc-select-try-another-way-form"
                                action={url.loginAction}
                                method="post"
                                className={clsx(displayWide && getClassName("kcContentWrapperClass"))}
                            >
                                <div
                                    className={clsx(
                                        displayWide && [getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass")]
                                    )}
                                >
                                    <div className={getClassName("kcFormGroupClass")}>
                                        <input type="hidden" name="tryAnotherWay" value="on" />
                                        <a
                                            href="#"
                                            id="try-another-way"
                                            onClick={() => {
                                                document.forms["kc-select-try-another-way-form" as never].submit();
                                                return false;
                                            }}
                                        >
                                            {msg("doTryAnotherWay")}
                                        </a>
                                    </div>
                                </div>
                            </form>
                        )}
                        {displayInfo && (
                            <div id="kc-info" className={getClassName("kcSignUpClass")}>
                                <div id="kc-info-wrapper" className={getClassName("kcInfoAreaWrapperClass")}>
                                    {infoNode}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
