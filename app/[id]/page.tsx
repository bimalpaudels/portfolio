import NotionBlockChildrenRenderer, {
  NotionPagePropsRenderer,
} from "@/app/renderer";
import { fetchNotionPageContent, fetchPageProperties } from "@/lib";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export default async function Page({ params }: { params: { id: string } }) {
  const resp = await fetchNotionPageContent(params.id);
  const resp_page = await fetchPageProperties(params.id);
  console.log(resp_page);
  return (
    <div>
      <NotionPagePropsRenderer {...(resp_page as PageObjectResponse)} />
      <NotionBlockChildrenRenderer blocks={resp.results} />
    </div>
  );
}
