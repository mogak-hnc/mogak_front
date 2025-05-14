import { useForm } from "react-hook-form";
import { ChallengeForm } from "@/types";
import { getDateString } from "@/utils/today";

export function useChallengeForm() {
  return useForm<ChallengeForm>({
    defaultValues: {
      name: "",
      description: "",
      ownerOnly: false,
      startDate: getDateString(1),
      endDate: getDateString(8),
    },
  });
}
