export interface NavItem {
  title: string;
  href: string;
  icon: () => JSX.Element;
  subNav?: NavItem[];
}

export interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: (value: boolean) => void;
}

export interface SidenavControlProps {
  open: boolean;
}

export interface SidenavOpeCloseProps {
  open: boolean;
}

export type Props = {
  isSidebarOpen: boolean;

  onClose: (value: boolean) => void;
};
