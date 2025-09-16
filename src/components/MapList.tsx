import TroisBassinCard from "./cards/trois-bassins";
import LaPossessionCard from "./cards/la-possession";
import SainteSuzanneCard from "./cards/sainte-suzanne";
import SalazieCard from "./cards/salazie";
import SainteRoseCard from "./cards/sainte-rose";
import SainteMarieCard from "./cards/sainte-marie";
import SaintPierreCard from "./cards/saint-pierre";
import SaintPhilippeCard from "./cards/saint-philippe";
import SaintPaulCard from "./cards/saint-paul";
import SaintLouisCard from "./cards/saint-louis";
import SaintLeuCard from "./cards/saint-leu";
import SaintJosephCard from "./cards/saint-joseph";
import SaintDenisCard from "./cards/saint-denis";
import SaintBenoitCard from "./cards/saint-benoit";
import PetiteIleCard from "./cards/petite-ile";
import LesAvironsCard from "./cards/les-avirons";
import LeTamponCard from "./cards/le-tampon";
import LePortCard from "./cards/le-port";
import EtangSaléCard from "./cards/etang-sale";
import EntreDeuxCard  from "./cards/entre-deux";
import BrasPanonCard from "./cards/bras-panon";
import SaintAndréCard from "./cards/saint-andre";
import ReunionCard from "./cards/reunion";
import CinorCard from "./cards/cinor";
import CasudCard from "./cards/casud";
import CirestCard from "./cards/cirest";
import CivisCard from "./cards/civis";
import TcoCard from "./cards/tco";
import BoisRougeCard from "./cards/bois-rouge";
import LeGolCard from "./cards/le-gol";
import PCBeaufondsCard from "./cards/pc-beaufonds";
import PCBoisRougeCard from "./cards/pc-bois-rouge";
import PCLeGolCard from "./cards/pc-le-gol";
import PCCasernesCard from "./cards/pc-casernes";
import PCLangevinCard from "./cards/pc-langevin";
import PCTamarinsCard from "./cards/pc-tamarins";

export default function MapList({ zone, onClose }: { zone: string; onClose: () => void }) {
  const renderCard = () => {
    switch (zone) {
      case 'la réunion':
        return <ReunionCard onClose={onClose} />;
      //////////////
      case 'bois rouge':
        return <BoisRougeCard onClose={onClose} />;
      case 'le gol':
        return <LeGolCard onClose={onClose} />;
      //////////////
      case 'tco':
        return <TcoCard onClose={onClose} />;
      case 'cinor':
        return <CinorCard onClose={onClose} />;
      case 'cirest':
        return <CirestCard onClose={onClose} />;
      case 'civis':
        return <CivisCard onClose={onClose} />;
      case 'casud':
        return <CasudCard onClose={onClose} />;
      //////////////
      case 'saint-paul':
        return <SaintPaulCard onClose={onClose} />;
      case 'le port':
        return <LePortCard onClose={onClose} />;
      case 'saint-denis':
        return <SaintDenisCard onClose={onClose} />;
      case 'la possession':
        return <LaPossessionCard onClose={onClose} />;
      case 'saint-leu':
        return <SaintLeuCard onClose={onClose} />;
      case 'saint-andré':
        return <SaintAndréCard onClose={onClose} />;
      case 'saint-benoît':
        return <SaintBenoitCard onClose={onClose} />;
      case 'saint-joseph':
        return <SaintJosephCard onClose={onClose} />;
      case 'saint-louis':
        return <SaintLouisCard onClose={onClose} />;
      case 'saint-pierre':
        return <SaintPierreCard onClose={onClose} />;
      case 'saint-philippe':
        return <SaintPhilippeCard onClose={onClose} />;
      case 'sainte-rose':
        return <SainteRoseCard onClose={onClose} />;
      case 'sainte-marie':
        return <SainteMarieCard onClose={onClose} />;
      case 'sainte-suzanne':
        return <SainteSuzanneCard onClose={onClose} />;
      case 'le tampon':
        return <LeTamponCard onClose={onClose} />;
      case 'bras-panon':
        return <BrasPanonCard onClose={onClose} />;
      case 'cilaos':
        return;
      case 'entre-deux':
        return <EntreDeuxCard onClose={onClose} />;
      case 'petite-île':
        return <PetiteIleCard onClose={onClose} />;
      case 'la plaine-des-palmistes':
        return;
      case 'salazie':
        return <SalazieCard onClose={onClose} />;
      case 'l\'étang-salé':
        return <EtangSaléCard onClose={onClose} />;
      case 'les avirons':
        return <LesAvironsCard onClose={onClose} />;
      case 'les trois-bassins':
        return <TroisBassinCard onClose={onClose} />;
      //////////////
      case 'pc beaufonds':
        return <PCBeaufondsCard onClose={onClose} />;
      case 'pc le gol':
        return <PCLeGolCard onClose={onClose} />;
      case 'pc casernes':
        return <PCCasernesCard onClose={onClose} />;
      case 'pc bois rouge':
        return <PCBoisRougeCard onClose={onClose} />;
      case 'pc langevin':
        return <PCLangevinCard onClose={onClose} />;
      case 'pc tamarins':
        return <PCTamarinsCard onClose={onClose} />;
      //////////////
      //pc le gol / pc casernes / pc langevin / pc bois rouge / pc tamarins
      default:
        return <p>Zone non supportée</p>;
    }
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-0 right-0 z-50">{renderCard()}</div>
    </div>
  );
}
