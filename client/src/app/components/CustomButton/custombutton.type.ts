export interface CustomButtonsProps {
  title?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  icon?: JSX.Element;
  image?: string;
  rightArrow?: boolean;
  animated?: boolean;
}
