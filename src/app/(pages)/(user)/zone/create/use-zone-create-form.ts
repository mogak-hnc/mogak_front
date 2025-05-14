import { ZoneFormInputs } from "@/types";
import { getDateString } from "@/utils/today";
import { useForm } from "react-hook-form";

export function useZoneCreateForm() {
  return useForm<ZoneFormInputs>({
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
