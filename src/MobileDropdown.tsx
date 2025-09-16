import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const options = [
  { label: "Toute La Réunion", value: "reunion" },
  { label: "Bassins canniers", value: "group" },
  { label: "Zones pôles canne", value: "zones-pc" },
  { label: "Intercommunalités", value: "interco" },
  { label: "Communes", value: "commune" },
];

export default function MobileDropdown({ selectedZone, setSelectedZone }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sm:hidden absolute top-0 left-0 right-0 z-10 bg-white border-b border-gray-200">
      <div
        className="relative w-full p-4 font-semibold text-black bg-white border border-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{options.find(o => o.value === selectedZone)?.label}</span>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
          <IoIosArrowDown size={24} />
        </div>
      </div>

      {isOpen && (
        <div className="w-full bg-white border-x border-b border-gray-300 shadow-md">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-3 hover:bg-gray-100 cursor-pointer ${
                selectedZone === option.value ? "font-bold text-green-800" : ""
              }`}
              onClick={() => {
                setSelectedZone(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
