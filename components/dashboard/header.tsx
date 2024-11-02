"use client";

import React from 'react';
import { 
  Navbar, 
  NavbarContent,
  Button,
  Dropdown, 
  DropdownTrigger, 
  Avatar, 
  DropdownMenu, 
  DropdownItem,
  Input
} from "@nextui-org/react";
import { Search, Bell, HelpCircle, LogOut, Menu } from 'lucide-react';
import { useAuthentication } from "@/states";
import { useRouter } from 'next/navigation';

interface HeaderProps {
  onMenuClick: () => void;
}

const DashboardHeader = ({ onMenuClick }: HeaderProps) => {
  const { user: currentUser, clearUser } = useAuthentication();
  const router = useRouter();

  return (
    <Navbar 
      isBordered 
      className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <NavbarContent className="gap-4" justify="start">
        <Button
          isIconOnly
          variant="light"
          className="lg:hidden"
          onPress={onMenuClick}
        >
          <Menu size={20} />
        </Button>
        
        <div className="hidden sm:flex flex-1 max-w-xl">
          <Input
            classNames={{
              input: "text-small",
              inputWrapper: "h-8",
            }}
            placeholder="Search..."
            size="sm"
            startContent={<Search size={16} />}
            type="search"
            fullWidth
          />
        </div>
      </NavbarContent>

      <NavbarContent justify="end">
        <Button
          isIconOnly
          variant="light"
          radius="full"
          className="sm:hidden"
          onPress={() => {/* Add search modal/drawer handler */}}
        >
          <Search size={20} />
        </Button>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly variant="light" radius="full">
              <Bell size={20} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem>No new notifications</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name={currentUser?.firstName?.charAt(0).toUpperCase()}
              size="sm"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Welcome</p>
              <p className="font-semibold">
                {`${currentUser?.firstName} ${currentUser?.lastName}`}
              </p>
            </DropdownItem>
            <DropdownItem key="help" startContent={<HelpCircle size={16} />}>
              Help & Feedback
            </DropdownItem>
            <DropdownItem 
              key="logout" 
              color="danger" 
              startContent={<LogOut size={16} />}
              onClick={() => {
                clearUser();
                router.push('/');
              }}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default DashboardHeader;