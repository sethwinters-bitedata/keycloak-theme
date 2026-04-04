import { clsx } from "keycloakify/tools/clsx";
import { useRerenderOnStateChange } from "evt/hooks";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import { evtTermMarkdown } from "keycloakify/login/lib/useDownloadTerms";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";


export default function Terms(props: PageProps<Extract<KcContext, { pageId: "terms.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    useRerenderOnStateChange(evtTermMarkdown);

    const { url } = kcContext;

    const termMarkdown = evtTermMarkdown.state;

    if (termMarkdown === undefined) {
        return null;
    }

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} displayMessage={false} headerNode={msg("termsTitle")}>
            <div id="kc-terms-text">
            Please read before continuing to the BITE app. View the BITE Terms and Conditions
and Privacy Policy before continuing. By continuing to the BITE app
you are agreeing to be bound by the BITE Privacy Policy and Terms and Conditions.
            </div>
            <div className="terms-links">
            <a href='https://www.bitedata.io/terms-of-use' rel='noreferrer' target='_blank' style={{color: "#0E8BFF"}}>
                Terms of Use
            </a> 
             <a href='https://www.bitedata.io/privacy-policy' rel='noreferrer' target='_blank' style={{color: '#0E8BFF'}}>
                 Privacy Policy
            </a>
            </div>
            
            <form className="form-actions" action={url.loginAction} method="POST">
                <input
                    className={clsx(
                        getClassName("kcButtonClass"),
                        getClassName("kcButtonClass"),
                        getClassName("kcButtonClass"),
                        getClassName("kcButtonPrimaryClass"),
                        getClassName("kcButtonLargeClass")
                    )}
                    name="accept"
                    id="kc-accept"
                    type="submit"
                    value={msgStr("doAccept")}
                />
                <input
                    className={clsx(getClassName("kcButtonClass"), getClassName("kcButtonDefaultClass"), getClassName("kcButtonLargeClass"))}
                    name="cancel"
                    id="kc-decline"
                    type="submit"
                    value={msgStr("doDecline")}
                />
            </form>
            <div className="clearfix" />
        </Template>
    );
}
