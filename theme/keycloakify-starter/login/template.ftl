<#macro registrationLayout displayMessage=true displayInfo=false displayWide=false>
<!DOCTYPE html>
<html class="login-pf" lang="${(locale.currentLanguageTag)!'en'}">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="noindex, nofollow" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${msg("loginTitle", (realm.displayName!""))}</title>
    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
</head>
<body>
    <main id="kc-content">
        <header id="kc-header">
            <h1 id="kc-header-wrapper">${kcSanitize(msg("loginTitleHtml", (realm.displayNameHtml!realm.displayName!"")))?no_esc}</h1>
        </header>

        <section id="kc-form-section">
            <#if displayMessage && message?has_content>
                <div class="alert-${message.type}">
                    ${kcSanitize(message.summary)?no_esc}
                </div>
            </#if>

            <#nested "form">

            <#if displayInfo>
                <div id="kc-info">
                    <#nested "info">
                </div>
            </#if>
        </section>
    </main>
</body>
</html>
</#macro>
