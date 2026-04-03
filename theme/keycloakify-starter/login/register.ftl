<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('firstName','lastName','email','username','password','password-confirm') displayInfo=true; section>
    <#if section = "form">
        <form id="kc-register-form" action="${url.registrationAction}" method="post">
            <div>
                <label for="firstName">${msg("firstName")}</label>
                <input type="text" id="firstName" name="firstName" value="${(register.formData.firstName!'')}" />
            </div>
            <div>
                <label for="lastName">${msg("lastName")}</label>
                <input type="text" id="lastName" name="lastName" value="${(register.formData.lastName!'')}" />
            </div>
            <div>
                <label for="email">${msg("email")}</label>
                <input type="email" id="email" name="email" value="${(register.formData.email!'')}" />
            </div>
            <div>
                <label for="username">${msg("username")}</label>
                <input type="text" id="username" name="username" value="${(register.formData.username!'')}" />
            </div>
            <div>
                <label for="password">${msg("password")}</label>
                <input type="password" id="password" name="password" />
            </div>
            <div>
                <label for="password-confirm">${msg("passwordConfirm")}</label>
                <input type="password" id="password-confirm" name="password-confirm" />
            </div>
            <div>
                <input type="submit" value="${msg("doRegister")}" />
            </div>
        </form>
    <#elseif section = "info">
        ${msg("backToLogin")} <a href="${url.loginUrl}">${msg("doLogIn")}</a>
    </#if>
</@layout.registrationLayout>
