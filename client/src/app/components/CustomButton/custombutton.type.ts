export interface CustomButtonsProps {
  title?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  icon?: JSX.Element;
  image?: string;
  animated?: boolean;
}
