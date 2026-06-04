import {LayoutSideContentLeft, Bell, Envelope, Gear, House, Magnifier, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";

const Sidebar = () => {

    const navItems= [
        {icon: House, label: "Home"},
        {icon: Magnifier, label: "Search"},
        {icon: Bell, label: "Notifications"},
        {icon: Envelope, label: "Messages"},
        {icon: Person, label: "Profile"},
        {icon: Gear, label: "Settings"},
      ];

      const navContainer = <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <button
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          type="button"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </button>
      ))}
    </nav>

    return (
        <>
        <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">{navContainer}</aside>
        <Drawer>
          <Button className={'lg:hidden'} variant="secondary">
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
                <Drawer.Body>
                 {navContainer}
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
        </>
      );
};

export default Sidebar;