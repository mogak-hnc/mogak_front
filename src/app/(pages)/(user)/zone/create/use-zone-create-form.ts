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

const getDateString = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().split("T")[0];
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
      startDate: getDateString(1),
      endDate: getDateString(8),
    },
  });
}
