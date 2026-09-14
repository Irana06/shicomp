import { Link } from '@inertiajs/react';
import { FolderKanban, Globe, LayoutGrid, Package, Tags } from 'lucide-react';
import ProductCategoryController from '@/actions/App/Http/Controllers/Admin/ProductCategoryController';
import ProductController from '@/actions/App/Http/Controllers/Admin/ProductController';
import ProjectController from '@/actions/App/Http/Controllers/Admin/ProjectController';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, home } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Project',
        href: ProjectController.index(),
        icon: FolderKanban,
        activeWhenNested: true,
    },
    {
        title: 'Paket',
        href: ProductController.index(),
        icon: Package,
        activeWhenNested: true,
    },
    {
        title: 'Kategori',
        href: ProductCategoryController.index(),
        icon: Tags,
        activeWhenNested: true,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Lihat website',
        href: home(),
        icon: Globe,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
