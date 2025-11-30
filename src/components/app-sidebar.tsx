"use client";
import { PROJECT_NAME, ROUTES } from "@/constant";
import { useHasActiveSubscription } from "@/feature/subscription/hoots/use-subscription";
import { authClient } from "@/lib/auth-client";
import {
  CreditCardIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

const menuItems = [
  {
    title: "Home",
    iteam: [
      {
        title: "Workflows",
        href: ROUTES.WORKFLOWS,
        icon: FolderOpenIcon,
      },
      {
        title: "Credentials",
        href: ROUTES.CREDENTIALS,
        icon: KeyIcon,
      },
      {
        title: "Executions",
        href: ROUTES.EXECUTIONS,
        icon: CreditCardIcon,
      },
    ],
  },
];

function AppSidebar() {
  const router = useRouter();
  const pathename = usePathname();
  const { hasActiveSubscription, isLoading } = useHasActiveSubscription();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
            <Link href={ROUTES.WORKFLOWS} prefetch>
              <FolderOpenIcon className="size-4" />
              <span className="font-semibold text-sm">{PROJECT_NAME}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.iteam.map((Item) => (
                  <SidebarMenuItem key={Item.title}>
                    <SidebarMenuButton
                      tooltip={Item.title}
                      isActive={
                        Item.href === "/workflows"
                          ? pathename === "/workflows"
                          : pathename.startsWith(Item.href)
                      }
                      asChild
                      className="gap-x-4 h-10 px-4"
                    >
                      <Link href={Item.href} prefetch>
                        <Item.icon className="size-4" />
                        <span>{Item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {!hasActiveSubscription && !isLoading && (
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Upgrade to pro"
                onClick={() =>
                  authClient.checkout({
                    slug: "Nodeflow-pro",
                  })
                }
                className="gap-x-4 h-10 px-4"
              >
                <StarIcon className="size-4" />
                <span>Upgrade to pro</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => authClient.customer.portal()}
              tooltip="Billing"
              className="gap-x-4 h-10 px-4"
            >
              <CreditCardIcon className="size-4" />
              <span>Billing</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => router.push(ROUTES.SIGN_IN),
                  },
                })
              }
              className="gap-x-4 h-10 px-4"
            >
              <LogOutIcon className="size-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
