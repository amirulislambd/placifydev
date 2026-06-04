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
import { hr } from "framer-motion/client";
import Link from "next/link";

const Sidebar = () => {
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

  const navContainer = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          type="button"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContainer}
      </aside>
      <Drawer>
        <Button className={"lg:hidden"} variant="secondary">
          <LayoutSideContentLeft />
          <h1 className="hidden md:block">Sidebar</h1>
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
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
