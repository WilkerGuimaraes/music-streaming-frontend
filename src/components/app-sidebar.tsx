"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import {
  Home,
  ListMusicIcon,
  MusicIcon,
  SquareUserRoundIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Músicas",
    url: "#",
    icon: MusicIcon,
  },
  {
    title: "Artistas",
    url: "#",
    icon: SquareUserRoundIcon,
  },
  {
    title: "Playlists",
    url: "#",
    icon: ListMusicIcon,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent className="p-5">
        <SidebarGroupLabel className="text-lg font-semibold">
          Navegação
        </SidebarGroupLabel>
        <SidebarGroup>
          <SidebarMenu>
            {routes.map((route) => {
              const isActive = pathname === route.url;

              return (
                <SidebarMenuItem key={route.title}>
                  <Button
                    asChild
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Link href={route.url}>
                      <route.icon />
                      <span>{route.title}</span>
                    </Link>
                  </Button>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
