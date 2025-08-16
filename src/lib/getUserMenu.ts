export default function getUserMenu({ context, user }: { context: any, user: any}) {

    const basepath = `/users/${user.slug}`;

    
    const menu = [
        { label: "Home", href: `${basepath}`, active: true },
        { label: "Team", href: `/teams/teamSlug`, active: true },
        { label: "Teams", href: `/teams`, active: true },
        { label: "Players", href: `/players`, active: true },
        { label: "Market", href: `/market`, active: true },
        { label: "Matches", href: `/matches`, active: true },
        { label: "Competitions", href: `/competitions`, active: true },
        { label: "Settings", href: `/settings`, active: true },
    ]

    if(context.team){
        menu.push({ label: "Team", href: `/teams/${context.team.slug}`, active: true })
    }

    return menu;
};