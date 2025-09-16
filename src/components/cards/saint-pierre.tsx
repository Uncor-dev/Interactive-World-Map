import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FaFileDownload } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import icon1 from "@/assets/icons/icon_1.png";
import icon2 from "@/assets/icons/icon_2.png";
import icon3 from "@/assets/icons/icon_3.png";
import icon4 from "@/assets/icons/icon_4.png";

export default function SaintPierreCard({ onClose }: { onClose: () => void }) {
  const handleDownload = () => {
    const pdfUrl = "/fiches-pdf/SaintPierre.pdf"
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "saint-pierre-la-fillière-canne-sucre.pdf";
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
          <h2 className="text-base sm:text-lg font-bold">Saint-Pierre</h2>
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
      <CardContent>
        <div className="bg-white py-4 rounded-lg px-2 sm:px-4 text-xs sm:text-sm">
          <div className="px-2 sm:px-5 text-[#2D5F52] text-base sm:text-lg">
            <span className="text-lg sm:text-xl font-bold">210 000</span> tonnes de canne à sucre produites soit <span className="text-lg sm:text-xl font-bold">55%</span> de la production de la CIVIS<sup>(1)</sup>
          </div>
          <div className="px-2 sm:px-5 pt-4">
            <Separator className="bg-[#2D5F52]" />
          </div>
          {/* Bloc 1 */}
          <div className="pt-4 grid grid-cols-12 items-center">
            <div className="col-span-2 flex justify-center">
              <img src={icon1} alt="cane" className="mx-auto w-6 sm:w-7" />
            </div>
            <div className="col-span-10">
              <p>
                <span className="text-base sm:text-lg font-bold text-[#2D5F52]">3 240</span> ha de canne à sucre sur <span className="text-base sm:text-lg font-bold text-[#2D5F52]">2 400</span> ha de Surface Agricole Utile<sup>(1)</sup>
              </p>
            </div>
          </div>
          <div className="pr-10 sm:pr-80 pl-2 sm:pl-5 pt-4">
            <Separator className="bg-[#2D5F52]" />
          </div>
          {/* Bloc 2 */}
          <div className="pt-4 grid grid-cols-12 items-center">
            <div className="col-span-2 flex justify-center">
              <img src={icon2} alt="cane" className="mx-auto w-8 sm:w-10" />
            </div>
            <div className="col-span-10">
              <p>
                <span className="text-base sm:text-lg font-bold text-[#2D5F52]">445</span> exploitations cannières<sup>(1)</sup>
              </p>
            </div>
          </div>
          <div className="pr-10 sm:pr-80 pl-2 sm:pl-5 pt-4">
            <Separator className="bg-[#2D5F52]" />
          </div>
          {/* Bloc 3 */}
          <div className="pt-4 grid grid-cols-12 items-center">
            <div className="col-span-2 flex justify-center">
              <img src={icon3} alt="cane" className="mx-auto w-6 sm:w-7" />
            </div>
            <div className="col-span-10">
              <p>
                <span className="text-base sm:text-lg font-bold text-[#2D5F52]">935</span> actifs agricoles dédiés à la canne à sucre<sup>(2)</sup>
              </p>
            </div>
          </div>
          <div className="pr-10 sm:pr-80 pl-2 sm:pl-5 pt-4">
            <Separator className="bg-[#2D5F52]" />
          </div>
          {/* Bloc 4 */}
          <div className="pt-4 grid grid-cols-12 items-center">
            <div className="col-span-2 flex justify-center">
              <img src={icon4} alt="cane" className="mx-auto w-9 sm:w-11" />
            </div>
            <div className="col-span-10">
              <p>
                <span className="text-base sm:text-lg font-bold text-[#2D5F52]">40%</span> des exploitations cannières produisent également des fruits et légumes et font de l’élevage ce qui participe à la souveraineté alimentaire de l’île<sup>(1)</sup>
              </p>
            </div>
          </div>
          <div className="px-2 sm:px-5 pt-4">
            <Separator className="bg-[#2D5F52]" />
          </div>
          <p className="text-[10px] sm:text-xs text-[#2D5F52] px-2 sm:px-5 pt-4">
            <span className="font-bold">Sources: </span>
            <sup>(1)</sup> Données filière Canne-Sucre (Moyenne Olympique 5 ans 2019-2023) <sup>(2)</sup> RA (2020)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
