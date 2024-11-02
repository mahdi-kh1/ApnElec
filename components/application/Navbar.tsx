"use client";

import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Switch,
} from "@nextui-org/react";
import { useModalController } from "@/modals";
import { useAuthentication, useAppearance } from "@/states";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SunIcon } from '@/components/icons/SunIcon';
import { MoonIcon } from '@/components/icons/MoonIcon';
import { Suspense }  from 'react';
import { useMemo } from 'react';
import Image from 'next/image'; // Import Image component

interface MenuItem {
  name: string;
  href: string;
}

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const { user: currentUser, clearUser } = useAuthentication();
  const { setModalId } = useModalController();
  const pathname = usePathname();
  const router = useRouter();
  const { activeTheme, setTheme } = useAppearance();

  // Memoize menuItems to prevent unnecessary recreations
  const menuItems: MenuItem[] = useMemo(() => [
    { name: "About", href: "/application/about" },
    { name: "Blog", href: "/application/blog" },
    { name: "Contact", href: "/application/contact" },
    { name: "Services", href: "/application/services" },
    { name: "Calculator", href: "/application/calculator" }
  ], []);

  // Prefetch all routes on component mount
  React.useEffect(() => {
    menuItems.forEach((item) => {
      router.prefetch(item.href);
    });
  }, [router, menuItems]); // Added menuItems to the dependency array

  const handleSignIn = (): void => {
    setModalId("sign-in-method");
  };

  const handleLogout = (): void => {
    clearUser();
  };

  const handleThemeToggle = (): void => {
    setTheme(activeTheme === 'light' ? 'dark' : 'light');
  };

  const handleNavigation = (href: string) => {
    setIsMenuOpen(false);
    router.push(href);
  };

  const isActivePath = (path: string): boolean => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  const NavLink: React.FC<{ href: string; children: React.ReactNode; isActive?: boolean }> = ({
    href,
    children,
    isActive
  }) => {
    return (
      <Link
        href={href}
        onClick={() => handleNavigation(href)}
        className={`w-full transition-colors ${isActive ? 'text-primary' : 'hover:text-primary/80'
          }`}
        prefetch={true}
      >
        {children}
      </Link>
    );
  };

  return (
    <Suspense fallback={<div className="h-16 bg-background/70" />}>
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className=" bg-transparent"
        shouldHideOnScroll
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle aria-label="Menu toggle" />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <Link href="/" className="font-bold text-inherit">
              <Image // Use Image component here
                className='w-16 sm:w-16 md:w-20'
                src="https://www.apnelec.co.uk/Portals/0/apnelec-Logo-02.png"
                alt="apnelec"
                width={80} // Set width based on design
                height={80} // Set height based on design
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-5" justify="center">
          <NavbarBrand>
            <Link href="/" className="font-bold text-inherit">
              <Image // Use Image component here
                className='w-16 sm:w-16 md:w-20'
                src="https://www.apnelec.co.uk/Portals/0/apnelec-Logo-02.png"
                alt="apnelec"
                width={80} // Set width based on design
                height={80} // Set height based on design
              />
            </Link>
          </NavbarBrand>
          {menuItems.map((item) => (
            <NavbarItem
              key={item.name}
              isActive={isActivePath(item.href)}
            >
              <NavLink
                href={item.href}
                isActive={isActivePath(item.href)}
              >
                {item.name}
              </NavLink>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Switch
              defaultSelected={activeTheme === 'dark'}
              size="lg"
              color="primary"
              startContent={<SunIcon />}
              endContent={<MoonIcon />}
              onChange={handleThemeToggle}
            />
          </NavbarItem>
          {currentUser ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="primary"
                  name={`${currentUser.firstName.charAt(0).toUpperCase()} `}
                  size="sm"
                  alt={`${currentUser.lastName}`}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Welcome </p>
                  <p className="font-semibold">{`${currentUser.firstName} ${currentUser.lastName}`}</p>
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  href="/dashboard"
                >
                  Dashboard
                </DropdownItem>
                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarItem>
              <Button
                color="primary"
                variant="flat"
                onPress={handleSignIn}
              >
                Sign In
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item) => (
            <NavbarMenuItem key={item.name}>
              <NavLink
                href={item.href}
                isActive={isActivePath(item.href)}
              >
                {item.name}
              </NavLink>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </Suspense>
  );
};

export default Navigation;
