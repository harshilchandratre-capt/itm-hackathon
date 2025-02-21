import Hamburger from "hamburger-react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SidebarDrawer = () => {
  const [toggled, setToggled] = useState<boolean>(false);

  const { pathname } = useLocation();
  const [currentItem, setCurrentItem] = useState("");

  useEffect(() => {
    checkUrl();
  }, []);

  const checkUrl = () => {
    setCurrentItem(pathname);
  };
  return (
    <Drawer onOpenChange={(e) => setToggled(e)} direction="left">
      <DrawerTrigger>
        <Hamburger color="#12723D" size={25} toggled={toggled} />
      </DrawerTrigger>
      <DrawerContent className="w-3/4 h-full">
        <DrawerHeader className="bg-red-900">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
        </DrawerHeader>

        <DrawerDescription>huhu</DrawerDescription>
        <DrawerFooter className="bg-pink-700">I am footer</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SidebarDrawer;
