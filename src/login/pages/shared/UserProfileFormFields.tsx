import { Fragment, useEffect } from "react";
import type { ClassKey } from "keycloakify/login/TemplateProps";
import { clsx } from "keycloakify/tools/clsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { Attribute } from "keycloakify/login/KcContext";

export default function UserProfileFormFields(
  props: UserProfileFormFieldsProps,
) {
  const {
    kcContext,
    i18n,
    onIsFormSubmittableValueChange,
    BeforeField,
    AfterField,
  } = props;

  const { kcClsx } = getKcClsx({ doUseDefaultCss: true, classes: {} });

  const getClassName = (classKey: ClassKey) => kcClsx(classKey);

  const { advancedMsg, msg } = i18n;
  const { profile, messagesPerField } = kcContext;

  useEffect(() => {
    onIsFormSubmittableValueChange(true);
  }, [onIsFormSubmittableValueChange]);

  let currentGroup = "";

  return (
    <>
      {(Object.values(profile.attributesByName) as Attribute[]).map(
        (attribute, i) => {
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

              {BeforeField && (
                <BeforeField
                  attribute={attribute}
                  valueOrValues={attribute.value ?? ""}
                  displayableErrors={
                    hasError ? [messagesPerField.get(attribute.name)] : []
                  }
                  dispatchFormAction={() => {}}
                  kcClsx={kcClsx}
                  i18n={i18n}
                />
              )}

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

              {AfterField && (
                <AfterField
                  attribute={attribute}
                  valueOrValues={attribute.value ?? ""}
                  displayableErrors={
                    hasError ? [messagesPerField.get(attribute.name)] : []
                  }
                  dispatchFormAction={() => {}}
                  kcClsx={kcClsx}
                  i18n={i18n}
                />
              )}
            </Fragment>
          );
        },
      )}
    </>
  );
}
