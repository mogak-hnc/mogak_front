import { useForm } from "react-hook-form";

export type ZoneFormInputs = {
  spaceName: string;
  tag: string;
  capacity: number;
  password: string;
  usePassword: boolean;
  useChat: boolean;
  memberOnly: boolean;
  startDate: string;
  endDate: string;
};

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
      startDate: "2024-06-10",
      endDate: "2024-06-10",
    },
  });
}
