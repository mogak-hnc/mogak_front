export interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

export interface InfoCardProps {
  type: string;
  title: string;
  description1: string;
  description2?: string;
  button: string;
  buttonUrl: string;
  img1?: string;
  img2?: string;
  img3?: string;
  bgImageLight: string;
  bgImageDark: string;
}

export interface TagsProps {
  name: string;
}

export interface FormGroupProps {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface ImageCardProps {
  type: string;
  title: string;
  description1: string;
  description2?: string;
  button: string;
  buttonUrl: string;
  img1?: string;
  img2?: string;
  img3?: string;
  bgImageLight: string;
  bgImageDark: string;
}

export type paramProps = {
  params: {
    id: string;
  };
};
