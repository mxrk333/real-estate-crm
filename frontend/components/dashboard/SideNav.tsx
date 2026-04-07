"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { isNavActive } from "@/lib/path-match";
import type { NavItem } from "@/types/dashboard";

type SideNavProps = {
  items: NavItem[];
  settingsHref?: string;
  user: {
    name: string;
    role: string;
    avatarSrc: string;
    avatarAlt: string;
  };
};

export function SideNav({
  items,
  settingsHref = "/settings",
  user,
}: SideNavProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-white px-0 py-8 dark:bg-slate-950">
      <div className="mb-12 px-8">
        <h1 className="text-xl font-bold tracking-tight text-primary dark:text-white">
          Inner SPARC Realty Corporation
        </h1>
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
          Building Dreams, One Property at a Time
        </p>
      </div>

      <nav className="flex min-h-0 flex-1 flex-col gap-1">
        {items.map((item) => {
          const base =
            "flex w-full items-center px-8 py-4 font-label tracking-tight transition-colors duration-200";
          const active = isNavActive(pathname, item.href);
          if (active) {
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`${base} border-l-4 border-primary bg-surface-container-low font-bold text-primary dark:bg-slate-900 dark:text-white`}
              >
                <MaterialIcon name={item.icon} className="mr-4 shrink-0" />
                {item.label}
              </Link>
            );
          }
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`${base} text-on-surface-variant hover:bg-surface-container-high hover:text-primary dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white`}
            >
              <MaterialIcon name={item.icon} className="mr-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}

        <Link
          href={settingsHref}
          className="mt-auto flex w-full items-center px-8 py-4 font-label tracking-tight text-on-surface-variant transition-colors duration-200 hover:bg-surface-container-high hover:text-primary dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <MaterialIcon name="settings" className="mr-4" />
          Settings
        </Link>
      </nav>

      <div className="mt-8 px-8 pt-8">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-fixed">
            <Image
              src={user.avatarSrc}
              alt={user.avatarAlt}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
              unoptimized
            />
          </div>
          <div>
            <p className="text-sm font-bold text-on-surface">{user.name}</p>
            <p className="text-xs text-on-surface-variant">{user.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
