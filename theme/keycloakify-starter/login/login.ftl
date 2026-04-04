<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password') displayInfo=realm.password && realm.registrationAllowed && !registrationDisabled??; section>
    <#if section = "form">
        <form id="kc-form-login" action="${url.loginAction}" method="post">
            <div>
                <label for="username">${msg("usernameOrEmail")}</label>
                <input id="username" name="username" type="text" value="${(login.username!'')}" autofocus autocomplete="username" />
            </div>

            <div>
                <label for="password">${msg("password")}</label>
                <input id="password" name="password" type="password" autocomplete="current-password" />
            </div>

            <#if realm.rememberMe>
                <div>
                    <label>
                        <input id="rememberMe" name="rememberMe" type="checkbox" <#if login.rememberMe??>checked</#if> />
                        ${msg("rememberMe")}
                    </label>
                </div>
            </#if>

            <#if realm.resetPasswordAllowed>
                <div>
                    <a href="${url.loginResetCredentialsUrl}">${msg("doForgotPassword")}</a>
                </div>
            </#if>

            <div>
                <input name="login" id="kc-login" type="submit" value="${msg("doLogIn")}" />
            </div>
        </form>
    <#elseif section = "info">
        <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
            ${msg("noAccount")} <a href="${url.registrationUrl}">${msg("doRegister")}</a>
        </#if>
    </#if>
</@layout.registrationLayout>
