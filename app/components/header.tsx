export type HeaderProps = {
  menuItems: MenuItemType[];
};

const WHATSAPP_API_URL = "https://api.whatsapp.com/send?phone=5555839152520";

export const Header = ({ menuItems }: HeaderProps) => (
  <header className="w-screen bg-white flex flex-col px-8 lg:px-40">
    <div className="flex py-6 justify-between items-center border-b">
      <Logo />
      <ContactLinks />
    </div>
    <MenuItems menuItems={menuItems} />
  </header>
);

const Logo = () => (
  <a href="/" className="font-bold text-2xl">
    PlanetaKeys
  </a>
);

const ContactLinks = () => (
  <div className="flex space-x-4">
    <ContactLink label="Contato" />
    <ContactLink label="Suporte" />
  </div>
);

const ContactLink = ({ label }: { label: string }) => (
  <a href={WHATSAPP_API_URL} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline">
    {label}
  </a>
);

export type MenuItemType = {
  label: string;
  href: string;
};

export type MenuItemsProps = {
  menuItems: MenuItemType[];
};

const MenuItems = ({ menuItems }: MenuItemsProps) => (
  <ul className="flex space-x-6 py-2">
    {menuItems.map((item, index) => (
      <MenuItem key={index} item={item} />
    ))}
  </ul>
);

const MenuItem = ({ item }: { item: MenuItemType }) => (
  <li>
    <a href={item.href} className="text-sm text-gray-800 hover:font-bold">
      {item.label}
    </a>
  </li>
);
