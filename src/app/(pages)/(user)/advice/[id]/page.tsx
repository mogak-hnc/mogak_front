import { AdviceDetail } from "@/lib/server/advice.server.api";
import AdviceContents from "./advice-contents";

export default async function AdviceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const data = await AdviceDetail(id);

  return <AdviceContents id={id} data={data} />;
}
