<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=true; section>
    <#if section = "form">
        <p>${kcSanitize(message.summary)?no_esc}</p>
        <#if skipLink??>
            <a href="${url.loginUrl}">${msg("backToLogin")}</a>
        </#if>
    </#if>
</@layout.registrationLayout>
