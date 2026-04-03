<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=true; section>
    <#if section = "form">
        <#if message?has_content>
            <p>${kcSanitize(message.summary)?no_esc}</p>
        </#if>
        <#if pageRedirectUri?has_content>
            <p><a href="${pageRedirectUri}">${msg("backToApplication")}</a></p>
        </#if>
    </#if>
</@layout.registrationLayout>
