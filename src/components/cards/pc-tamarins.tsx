import { Card } from "@/components/ui/card";
import { FaFileDownload } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function PCTamarinsCard({ onClose }: { onClose: () => void }) {
  const handleDownload = () => {
    const pdfUrl = "/fiches-pdf/TamarinsCard.pdf"
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "TamarinsCard.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Card
      className="
        md:w-[30rem]
        shadow-lg rounded-2xl overflow-hidden border bg-[#F4F3F2]
        relative
      "
    >
      <div
        className="
          bg-[#2D5F52] text-white py-3 mx-6 rounded-lg px-4 pt-4
          grid grid-cols-11 items-center
        "
      >
        <div className="col-span-10">
          <h2 className="text-base sm:text-lg font-bold">PC Tamarins</h2>
          <p className="text-xs sm:text-sm">La Filière Canne-Sucre</p>
        </div>
        <div className="col-span-1 flex justify-end items-start">
          <div className="flex gap-1">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 cursor-pointer"
            >
              <FaFileDownload className="text-white w-5 h-5 sm:w-6 sm:h-6 hover:text-orange-300 transition" />
            </button>
            <button
              onClick={onClose}
              className="hover:bg-[#FF3B30] transition rounded-lg w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center"
            >
              <IoClose className="text-white w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
