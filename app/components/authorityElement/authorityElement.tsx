import { BsShieldLock } from "react-icons/bs";

export const AuthorityElement = () => {
  return (
    <div className="hidden lg:flex justify-center items-center py-2 space-x-1 bg-gray-2">
      <div className="text-green-500">
        <BsShieldLock />
      </div>
      <p className="text-sm text-white">
        <b>Revenda Oficial Microsoft.</b> Produtos com nota fiscal e garantia.
      </p>
    </div>
  );
};
