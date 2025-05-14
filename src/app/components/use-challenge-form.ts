import { useForm } from "react-hook-form";

import { getDateString } from "@/utils/today";
import { ChallengeForm } from "@/types/challenge.type";

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
