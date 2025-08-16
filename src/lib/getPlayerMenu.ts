export default function getUserMenu({ context, team }: { context: any, team: any}) {

    const basepath = `/teams/${team.slug}`;
    const managerPath = `/users/${team.manager.slug}`;
    
    const menu = [
        { label: "Home", href: `${basepath}`, active: true },
        { label: "Manager", href: `${managerPath}`, active: true },
        { label: "Roster", href: `${basepath}/roster`, active: true },
    ]

    return menu;
};