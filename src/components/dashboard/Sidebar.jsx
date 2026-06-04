"use client";

import React, { useState } from "react"; // 👈 ড্রয়ার ওপেন/ক্লোজ স্টেট হ্যান্ডেল করার জন্য useState আনা হয়েছে
import {
  LayoutSideContentLeft,
  Bell,
  Envelope,
  Briefcase,
  Gear,
  House,
  Magnifier,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // 👈 ড্রয়ারের ওপেন স্টেট

  const navItems = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    {
      icon: Magnifier,
      href: "/dashboard/recruiter/jobs/new",
      label: "Add A Jobs",
    },
    { icon: Bell, href: "/dashboard/recruiter/jobs", label: "Recruiter Jobs" },
    {
      icon: Briefcase,
      href: "/dashboard/recruiter/company",
      label: "Recruiter Company",
    },
    { icon: Envelope, href: "#", label: "Messages" },
    { icon: Person, href: "#", label: "Profile" },
    { icon: Gear, href: "#", label: "Settings" },
  ];

  // 💡 লিংকে ক্লিক করলে যেন সাইডবার বন্ধ হয়, তাই এই ফাংশন
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
            onClick={handleLinkClick} // 👈 এই ক্লিক ইভেন্টটি মোবাইলে সাইডবার ক্লোজ করে দেবে
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
      {/* 💻 ডেক্সটপ সাইডবার */}
      <aside className="hidden w-64 shrink-0 border-r border-zinc-800 p-4 lg:block bg-[#121212]">
        {navContainer}
      </aside>

      {/* 📱 মোবাইল ড্রয়ার/সাইডবার */}
      {/* 💡 এখানে isOpen এবং onOpenChange প্রোপার্টি দিয়ে ড্রয়ার কন্ট্রোল করা হচ্ছে */}
      <Drawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <Button
          className={"lg:hidden"}
          variant="secondary"
          onClick={() => setIsDrawerOpen(true)} // 👈 বাটনে ক্লিক করলে ড্রয়ার ওপেন হবে
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
