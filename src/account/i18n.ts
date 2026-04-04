import { i18nBuilder } from "keycloakify/login";

const { useI18n, ofTypeI18n } = i18nBuilder
  .withCustomTranslations({
    en: {
      termsTitle: "Terms and Conditions",
      changePasswordHtmlTitle: "Change password",
      allFieldsRequired: "All fields are required.",
      doSave: "Save",
      passwordNew: "New password",
      passwordConfirm: "Confirm new password",
      backTo: "Back to the BITE app",
      doSignOut: "Logout",
    },
  })
  .build();

export { useI18n };
export type I18n = typeof ofTypeI18n;
