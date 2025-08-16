export default function getUserMenu({ context, team }: { context: any, team: any}) {

    const basepath = `/teams/${team.slug}`;
    const managerPath = `/users/${team.manager.slug}`;
    
    const menu = [
        { label: "Home", href: `${basepath}`, active: true },
        { label: "Manager", href: `${managerPath}`, active: true },
        { label: "Roster", href: `${basepath}/roster`, active: true },
        { label: "Matches", href: `${basepath}/matches`, active: true },
        { label: "Balance", href: `${basepath}/balance`, active: true },
        { label: "Market", href: `${basepath}/market`, active: true },
        { label: "Facilities", href: `${basepath}/facilities`, active: true },
        { label: "Stats", href: `${basepath}/stats`, active: true },
    ]

    return menu;
};