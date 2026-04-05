import type { DeepPartial } from "keycloakify/tools/DeepPartial";
import { createGetKcContextMock } from "keycloakify/login/KcContext/getKcContextMock";
import KcApp from "./KcApp";

const { getKcContextMock } = createGetKcContextMock({
  kcContextExtension: {},
  kcContextExtensionPerPage: {
    "my-extra-page-1.ftl": {},
    "my-extra-page-2.ftl": {
      someCustomValue: "",
    },
    "register.ftl": {
      authorizedMailDomains: [],
    },
    "password.ftl": {},
  },
});

type ExtendedKcContext = ReturnType<typeof getKcContextMock>;

export function createPageStory<
  PageId extends ExtendedKcContext["pageId"],
>(params: { pageId: PageId }) {
  const { pageId } = params;

  function PageStory(props: {
    kcContext?: DeepPartial<Extract<ExtendedKcContext, { pageId: PageId }>>;
  }) {
    const kcContext = getKcContextMock({
      pageId,
      overrides: props.kcContext,
    });

    return (
      <>
        <link
          rel="stylesheet"
          type="text/css"
          href={`${import.meta.env.BASE_URL}fonts/WorkSans/font.css`}
        />
        <KcApp kcContext={kcContext} />
      </>
    );
  }

  return { PageStory };
}
