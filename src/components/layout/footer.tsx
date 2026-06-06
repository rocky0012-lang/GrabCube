import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { FaInstagram, FaFacebook, FaXTwitter, FaLinkedin } from "react-icons/fa6";


const footerNavList = [
    {
        label: "Product",
        items: [
            {
                label: "Overview",
                href: "#",
            },
            {
                label: "Features",
                href: "#",
            },
            {
                label: "Solutions",
                href: "#",
                badge: (
                    <Badge color="gray" type="modern" size="sm" className="ml-1">
                        New
                    </Badge>
                ),
            },
            {
                label: "Pricing",
                href: "#",
            },
            
        ],
    },
    {
        label: "Company",
        items: [
            {
                label: "About us",
                href: "#",
            },
            {
                label: "Careers",
                href: "#",
            },
            {
                label: "Blog",
                href: "#",
            },
            {
                label: "Contact",
                href: "#",
            },
        ],
    },
    {
        label: "Use cases",
        items: [
            {
                label: "Startups",
                href: "#",
            },
            {
                label: "Enterprise",
                href: "#",
            },
            {
                label: "Government",
                href: "#",
            },
            {
                label: "Marketplaces",
                href: "#",
            },
        ],
    },        
    {
        label: "Legal",
        items: [
            {
                label: "Terms",
                href: "#",
            },
            {
                label: "Privacy",
                href: "#",
            },
            {
                label: "Cookies",
                href: "#",
            },
            {
                label: "Licenses",
                href: "#",
            },
            
        ],
    },
];

export const FooterLarge01 = () => {
    return (
        <footer className="py-12 md:pt-16">
            <div className="mx-auto max-w-container flex gap-4 px-4 md:px-8">
                <div className="flex-1 flex flex-col items-start gap-4">
                    <h2 className="text-lg font-bold --color-text-primary">CubeGrab</h2>
                    <p className="text-sm text-quaternary">© 2026 CubeGrab. All rights reserved.</p>
                </div>
                <nav className="flex-1" aria-label="Footer Navigation">
                    <ul className="grid grid-cols-2 gap-12 md:grid-cols-3 lg:grid-cols-4">
                        {footerNavList.map((category) => (
                            <li key={category.label}>
                                <h4 className="text-sm font-bold --color-text-primary">{category.label}</h4>
                                <ul className="mt-4 flex flex-col gap-3">
                                    {category.items.map((item) => (
                                        <li key={item.label} className="flex">
                                            <Button color="link-gray" size="md" href={item.href} iconTrailing={item.badge} className="max-h-5 gap-1">
                                                {item.label}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex flex-col items-center gap-4">
                    <h3 className="text-sm font-bold pb-0 text-center --color-text-primary">Follow Us</h3>
                    <div className="flex gap-4">
                        <FaInstagram className="h-5 w-5" />
                        <FaFacebook className="h-5 w-5" />
                        <FaXTwitter className="h-5 w-5" />
                        <FaLinkedin className="h-5 w-5" />
                    </div>
                </div>
            </div>
        </footer>
    );
};
