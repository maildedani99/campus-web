// config/menu.ts
export type MenuItem = {
  id: string;
  label: string;
    name: string;
  href?: string;
  icon?: string; // o React.ComponentType, según cómo lo uses en Sidebar
  children?: MenuItem[];
  roles?: Array<"admin" | "teacher" | "client">;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "dashboard",
    label: "Inicio",
    name: "Inicio",
    href: "/campus",
  },
  {
    id: "courses",
    label: "Mis cursos",
    name: "Inicio",
    href: "/campus/courses",
  },
  {
    id: "profile",
    label: "Mi perfil",
    name: "Inicio",
    href: "/campus/profile",
  },
  // añade aquí lo que ya tuvieras en local si lo tenías en otro archivo
];
