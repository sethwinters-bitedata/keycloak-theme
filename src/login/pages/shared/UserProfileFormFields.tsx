import { Fragment, useEffect } from "react";
import type { ClassKey } from "keycloakify/login/TemplateProps";
import { clsx } from "keycloakify/tools/clsx";
import type { KcContext } from "keycloakify/login/KcContext";
import type { I18n } from "keycloakify/login/i18n";
import type { Attribute } from "keycloakify/login/KcContext";

type RegisterKcContext = Extract<KcContext, { pageId: "register.ftl" }>;

export type UserProfileFormFieldsProps = {
  kcContext: RegisterKcContext;
  i18n: I18n;
  getClassName: (classKey: ClassKey) => string;
  onIsFormSubmittableValueChange: (isFormSubmittable: boolean) => void;
  BeforeField?: (props: { attribute: Attribute }) => JSX.Element | null;
  AfterField?: (props: { attribute: Attribute }) => JSX.Element | null;
};

export function UserProfileFormFields(props: UserProfileFormFieldsProps) {
  const {
    kcContext,
    i18n,
    getClassName,
    onIsFormSubmittableValueChange,
    BeforeField,
    AfterField,
  } = props;

  const { advancedMsg, msg } = i18n;
  const { profile, messagesPerField } = kcContext;

  useEffect(() => {
    onIsFormSubmittableValueChange(true);
  }, [onIsFormSubmittableValueChange]);

  let currentGroup = "";

  return (
    <>
      {Object.values(profile.attributesByName).map(
        (attribute: Attribute, i: number) => {
          const group = attribute.group;
          const groupName = group?.name ?? "";
          const groupDisplayHeader = group?.displayHeader ?? "";
          const groupDisplayDescription = group?.displayDescription ?? "";

          const hasError = messagesPerField.existsError(attribute.name);

          const formGroupClassName = clsx(
            getClassName("kcFormGroupClass"),
            hasError && getClassName("kcFormGroupErrorClass"),
          );

          return (
            <Fragment key={i}>
              {groupName !== currentGroup &&
                (currentGroup = groupName) !== "" && (
                  <div className={formGroupClassName}>
                    <div className={getClassName("kcContentWrapperClass")}>
                      <label
                        id={`header-${groupName}`}
                        className={getClassName("kcFormGroupHeader")}
                      >
                        {advancedMsg(groupDisplayHeader) || currentGroup}
                      </label>
                    </div>
                    {groupDisplayDescription !== "" && (
                      <div className={getClassName("kcLabelWrapperClass")}>
                        <label
                          id={`description-${groupName}`}
                          className={getClassName("kcLabelClass")}
                        >
                          {advancedMsg(groupDisplayDescription)}
                        </label>
                      </div>
                    )}
                  </div>
                )}

              {BeforeField && <BeforeField attribute={attribute} />}

              <div className={formGroupClassName}>
                <div className={getClassName("kcLabelWrapperClass")}>
                  <label
                    htmlFor={attribute.name}
                    className={getClassName("kcLabelClass")}
                  >
                    {advancedMsg(attribute.displayName ?? "")}
                  </label>
                  {attribute.required && <>*</>}
                </div>

                <div className={getClassName("kcInputWrapperClass")}>
                  {attribute.validators.options ? (
                    <select
                      id={attribute.name}
                      name={attribute.name}
                      defaultValue={attribute.value ?? ""}
                      className={getClassName("kcInputClass")}
                      aria-invalid={hasError}
                      disabled={attribute.readOnly}
                      autoComplete={attribute.autocomplete}
                    >
                      <option value="" disabled hidden>
                        {msg("selectAnOption")}
                      </option>
                      {attribute.validators.options.options.map(
                        (option: string) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ),
                      )}
                    </select>
                  ) : (
                    <input
                      type={
                        attribute.name === "password" ||
                        attribute.name === "password-confirm"
                          ? "password"
                          : "text"
                      }
                      id={attribute.name}
                      name={attribute.name}
                      defaultValue={attribute.value ?? ""}
                      className={getClassName("kcInputClass")}
                      aria-invalid={hasError}
                      disabled={attribute.readOnly}
                      autoComplete={attribute.autocomplete}
                    />
                  )}

                  {hasError && (
                    <span
                      className={getClassName("kcInputErrorMessageClass")}
                      aria-live="polite"
                    >
                      {messagesPerField.get(attribute.name)}
                    </span>
                  )}
                </div>
              </div>

              {AfterField && <AfterField attribute={attribute} />}
            </Fragment>
          );
        },
      )}
    </>
  );
}
