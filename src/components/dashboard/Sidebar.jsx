"use client";

import React, { useState } from "react";
import {
  LayoutSideContentLeft,
  Bell,
  Envelope,
  Briefcase,
  Gear,
  House,
  Magnifier,
  Person,
  Bookmark,
  FileText,
  CreditCard,
  Factory,
} from "@gravity-ui/icons";
import {} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";

const Sidebar = () => {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;
  console.log(user);

  const adminNavItems = [
    { icon: House, href: "/dashboard/admin", label: "Dashboard" },
    { icon: Person, href: "/dashboard/admin/users", label: "Users" },
    { icon: Factory, href: "/dashboard/admin/companies", label: "Companies" },
    { icon: Briefcase, href: "/dashboard/admin/jobs", label: "Jobs" },
    { icon: CreditCard, href: "/dashboard/admin/payments", label: "Payments" },
    { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
  ];

  const recruiterNavItems = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    { icon: Bell, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    {
      icon: Magnifier,
      href: "/dashboard/recruiter/jobs/new",
      label: "Post A Job",
    },
    {
      icon: Briefcase,
      href: "/dashboard/recruiter/company",
      label: "Company Profile",
    },
    { icon: Envelope, href: "#", label: "Messages" },
    { icon: Person, href: "#", label: "Profile" },
    { icon: Gear, href: "#", label: "Settings" },
  ];

  const seekerNavItems = [
    { icon: House, href: "/dashboard/seeker", label: "Dashboard" },
    { icon: Magnifier, href: "/jobs", label: "Jobs" },
    {
      icon: Bookmark,
      href: "/dashboard/seeker/saved-jobs",
      label: "Saved Jobs",
    },
    {
      icon: FileText,
      href: "/dashboard/seeker/applications",
      label: "Applications",
    },
    { icon: CreditCard, href: "/dashboard/seeker/billing", label: "Billing" },
    { icon: Gear, href: "/dashboard/seeker/settings", label: "Settings" },
  ];

  const navLinksMapping = {
    admin: adminNavItems,
    recruiter: recruiterNavItems,
    seeker: seekerNavItems,
  };

  const navItems = navLinksMapping[user?.role] || seekerNavItems;

  const handleLinkClick = () => {
    setIsDrawerOpen(false);
  };

  const navContainer = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            href={item.href}
            key={item.label}
            onClick={handleLinkClick}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
              isActive
                ? "bg-zinc-800 text-white font-medium"
                : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
            }`}
          >
            <item.icon
              className={`size-5 ${isActive ? "text-white" : "text-zinc-500"}`}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-zinc-800 p-4 lg:block bg-[#121212]">
        {navContainer}
      </aside>
      {/* mobile sidebar */}
      <Drawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <Button
          className={"lg:hidden"}
          variant="secondary"
          onClick={() => setIsDrawerOpen(true)}
        >
          <LayoutSideContentLeft />
          <h1 className="hidden md:block">Sidebar</h1>
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left" className="bg-[#1c1c1e]">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading className="text-zinc-200">
                  Navigation
                </Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContainer}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
};

export default Sidebar;
