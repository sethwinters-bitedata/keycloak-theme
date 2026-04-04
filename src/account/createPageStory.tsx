import type { KcContext } from "../login/kcContext";
import type { DeepPartial } from "keycloakify/tools/DeepPartial";
import { createGetKcContextMock } from "keycloakify/login/KcContext/getKcContextMock";
import KcApp from "./KcApp";

const getKcContextMock = createGetKcContextMock({
  kcContextExtension: {},
  kcContextExtensionPerPage: {},
});

export function createPageStory<PageId extends KcContext["pageId"]>(params: {
  pageId: PageId;
}) {
  const { pageId } = params;

  function PageStory(props: {
    kcContext?: DeepPartial<Extract<KcContext, { pageId: PageId }>>;
  }) {
    const kcContext = getKcContextMock({
      pageId,
      overrides: props.kcContext ?? {},
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
