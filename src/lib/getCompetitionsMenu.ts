import { teamsGetBySlug } from "@/client";

export default function getUserMenu({ context, competition, user,team }: { context: any, competition: any, user: any}) {

    const basepath = `/competitions/${competition.slug}`;
    const managerPath = `/users/${user?.slug}`;
    const teamPath = `/teams/${team?.slug}`;
    
    
    const menu = [
        { label: "Home", href: `${basepath}`, active: true },
        { label: "Manager", href: `${managerPath}`, active: true },
        { label: "Calendars", href: `${basepath}`, active: true },
        { label: "Rankings", href: `${basepath}/rankings`, active: true }

    ]

    return menu;
};