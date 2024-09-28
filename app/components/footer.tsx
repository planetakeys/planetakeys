import { PropsWithChildren } from "react";
import { AmericanExpressIcon } from "./icons/AmericanExpressIcon";
import { AuraIcon } from "./icons/AuraIcon";
import { BilletIcon } from "./icons/BilletIcon";
import { DinersIcon } from "./icons/DinersIcon";
import { DiscoverIcon } from "./icons/DiscoverIcon";
import { EloIcon } from "./icons/EloIcon";
import { HiperIcon } from "./icons/HiperIcon";
import { HipercardIcon } from "./icons/HipercardIcon";
import { MastercardIcon } from "./icons/MastercardIcon";
import { PaypalIcon } from "./icons/PaypalIcon";
import { PixIcon } from "./icons/PixIcon";
import { VisaIcon } from "./icons/VisaIcon";
import { GoogleSafeIcon } from "./icons/googleSafe";
import { SslIcon } from "./icons/sslIcon";

import { PiPhone, PiWhatsappLogo } from "react-icons/pi";
import { MdMail } from "react-icons/md";
import { BsClock } from "react-icons/bs";
import { MenuItemType } from "./header";

const paymentIcons = [
  AmericanExpressIcon,
  AuraIcon,
  BilletIcon,
  DinersIcon,
  DiscoverIcon,
  EloIcon,
  HipercardIcon,
  HiperIcon,
  MastercardIcon,
  PaypalIcon,
  PixIcon,
  VisaIcon,
];

const securityIcons = [GoogleSafeIcon, SslIcon];

export type FooterProps = {
  categories: MenuItemType[];
};

export const Footer = ({ categories }: FooterProps) => {
  return (
    <div className="px-8 lg:px-40 pt-10 space-y-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <FooterSection title="Categorias" items={categories} />
        <FooterSection
          title="Institucional"
          items={[
            { label: "Política de envio", href: "#" },
            { label: "Política de privacidade", href: "#" },
            { label: "Política de Trocas, Devoluções, Reembolso e Garantia", href: "#" },
            { label: "Quem somos", href: "#" },
          ]}
        />
        <ContactSection />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <IconSection title="Pagamento" icons={paymentIcons} />
        <IconSection title="Segurança" icons={securityIcons} />
      </div>
      <div className="text-center py-6 border-t-2 border-gray-300">
        Todos os direitos reservados
      </div>
    </div>
  );
};

const FooterSection = ({ title, items }: { title: string; items: MenuItemType[] }) => (
  <div className="col-span-4 space-y-6">
    <Title>{title}</Title>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index}>
          <a href={item.href} className="text-gray-700 text-sm">
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const ContactSection = () => (
  <div className="col-span-4 space-y-6">
    <Title>Central de atendimento</Title>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ContactInfo />
      <BusinessHours />
    </div>
  </div>
);

const ContactInfo = () => (
  <ul className="space-y-2">
    <ContactItem icon={<PiPhone />} label="(83) 99999-9999" />
    <ContactItem icon={<PiWhatsappLogo />} label="(83) 99999-9999" />
    <ContactItem icon={<MdMail />} label="atendimento@gmail.com" />
  </ul>
);

const ContactItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <li className="flex items-center space-x-2">
    <div className="text-primary text-xl">{icon}</div>
    <div className="text-gray-700 text-sm">{label}</div>
  </li>
);

const BusinessHours = () => (
  <div>
    <div className="space-y-2">
      <div className="flex items-center space-x-2 text-sm font-bold text-primary">
        <BsClock />
        <div>Horário de atendimento</div>
      </div>
      <p className="text-xs text-gray-600">
        Vendas 24h por dia
        <br />
        Atendimento: Seg. à Sex.: 10h às 17h
        <br />
        Sáb. Dom. e Feriado Fechado
      </p>
    </div>
  </div>
);

const IconSection = ({ title, icons }: { title: string; icons: any[] }) => (
  <div className="col-span-6 space-y-6">
    <Title>{title}</Title>
    <div className="grid grid-cols-4 lg:grid-cols-6 gap-4">
      {icons.map((Icon, index) => (
        <div key={index} className="text-3xl">
          <Icon />
        </div>
      ))}
    </div>
  </div>
);

const Title = ({ children }: PropsWithChildren<{}>) => (
  <div className="font-bold text-gray-600">{children}</div>
);
