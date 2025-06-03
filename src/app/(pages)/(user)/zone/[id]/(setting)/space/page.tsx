import type { Metadata } from "next";
import ZoneSpaceSetting from "./zone-space-setting";

export const metadata: Metadata = {
  title: "모각 | 모각존 관리",
  description: "모여서 각자",
};

export default function ZoneDetailSpacePage() {
  return <ZoneSpaceSetting />;
}
