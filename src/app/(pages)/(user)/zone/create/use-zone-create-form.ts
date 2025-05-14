import { ZoneCreateInput } from "@/types/zone.type";
import { getDateString } from "@/utils/today.util";
import { useForm } from "react-hook-form";

export function useZoneCreateForm() {
  return useForm<ZoneCreateInput>({
    defaultValues: {
      spaceName: "",
      tag: "",
      capacity: 3,
      password: "",
      usePassword: false,
      useChat: true,
      memberOnly: false,
      startDate: getDateString(1),
      endDate: getDateString(8),
    },
  });
}
