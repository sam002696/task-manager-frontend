import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";

export const navigation = [
  { name: "Dashboard", href: "/taskboard", icon: HomeIcon },
  { name: "Team", href: "/team", icon: UsersIcon },
  { name: "Projects", href: "/projects", icon: FolderIcon },
  { name: "Calendar", href: "/calendar", icon: CalendarIcon },
  { name: "Documents", href: "/documents", icon: DocumentDuplicateIcon },
  { name: "Reports", href: "/reports", icon: ChartPieIcon },
];

export const userNavigation = [
  { name: "Your profile", href: "/profile" },
  { name: "Sign out", href: "/logout" },
];
