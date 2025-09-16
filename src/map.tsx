import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import MobileDropdown from './MobileDropdown';
import 'ol/ol.css';
import { Map, View } from 'ol';
import { fromLonLat, transformExtent } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import MapList from '@/components/MapList';
import Feature from 'ol/Feature';
import Icon from 'ol/style/Icon';
import Point from 'ol/geom/Point';

import entitie1 from '@/assets/icons/icon_8.png';
import entitie2 from '@/assets/icons/icon_5.png';
import entitie3 from '@/assets/icons/icon_6.png';
import entitie4 from '@/assets/icons/icon_10.png';
import entitie5 from '@/assets/icons/icon_9.png';
import entitie6 from '@/assets/icons/icon_11.png';

export default function MapComponent() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [_, setMap] = useState<Map | null>(null);
    const [selectedFeature, setSelectedFeature] = useState<any>(null);
    const [selectedZone, setSelectedZone] = useState<'commune' | 'reunion' | 'group' | 'interco' | 'zones-pc'>('reunion');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredZones, setFilteredZones] = useState<string[]>([]);
    const [selectedName, setSelectedName] = useState<string | null>(null);
    const [showLegendMobile, setShowLegendMobile] = useState(false);

    const zones = [
        "la réunion",
        "bois rouge",
        "le gol",
        "saint-paul",
        "le port",
        "saint-denis",
        "la possession",
        "saint-leu",
        "saint-andré",
        "saint-benoît",
        "saint-joseph",
        "saint-louis",
        "saint-pierre",
        "saint-philippe",
        "sainte-rose",
        "sainte-marie",
        "sainte-suzanne",
        "le tampon",
        "bras-panon",
        "cilaos",
        "entre-deux",
        "petite-île",
        "la plaine-des-palmistes",
        "salazie",
        "l'étang-salé",
        "les avirons",
        "les trois-bassins",
    ];

    const handleCloseCard = () => {
        setSelectedFeature(null);
        setSelectedName(null);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        setFilteredZones(zones.filter((zone) => zone.includes(value)));
    };

    const handleSelect = (zone: string) => {
        setSearchTerm(zone);
        setFilteredZones([]);
        setSelectedName(zone);
    };

    useEffect(() => {
        if (!mapRef.current) return;

        const reunionExtent = transformExtent(
            [54.5, -22.0, 56.5, -20.5],
            'EPSG:4326',
            'EPSG:3857'
        );

        const defaultCommunesStyle = new Style({
            stroke: new Stroke({ color: 'rgba(45, 95, 82, 0.6)', width: 0.7 }),
            fill: new Fill({ color: '#FFFFFF' })
        });

        const hoverCommunesStyle = new Style({
            fill: new Fill({ color: '#2D5F52' }),
        });

        const entities = [
            ///////////// Recherche en canne à sucre ///////////// PAS OK
            {
                name: 'Recherche en canne à sucre',
                coordinates: [55.50387635597419, -20.900633880894485],
                image: entitie1,
            },
            {
                name: 'Recherche en canne à sucre',
                coordinates: [55.447877031256986, -20.882203864501154],
                image: entitie1,
            },
            {
                name: 'Recherche en canne à sucre',
                coordinates: [55.4904563580626, -21.306420061837542],
                image: entitie1,
            },
            {
                name: 'Recherche en canne à sucre',
                coordinates: [55.4879560554464, -21.305947261846523],
                image: entitie1,
            },

            ///////////// Centre de réception des cannes à sucres ///////////// OK
            {
                name: 'Centre de réception des cannes à sucres',
                coordinates: [55.3026892383773, -20.964962234163195],
                image: entitie2,

            },
            {
                name: 'Centre de réception des cannes à sucres',
                coordinates: [55.251122818413634, -21.061422851765354],
                image: entitie2,

            },
            {
                name: 'Centre de réception des cannes à sucres',
                coordinates: [55.29588577688214, -21.19750777405142],
                image: entitie2,

            },
            {
                name: 'Centre de réception des cannes à sucres',
                coordinates: [55.40187359290508, -21.274877186077216],
                image: entitie2,

            },
            {
                name: 'Centre de réception des cannes à sucres',
                coordinates: [55.48707585772701, -21.319780364547217],
                image: entitie2,

            },
            {
                name: 'Centre de réception des cannes à sucres',
                coordinates: [55.528137381511186, -21.35546850009855],
                image: entitie2,

            },
            {
                name: 'Centre de réception des cannes à sucres',
                coordinates: [55.64687327314811, -21.376696462666544],
                image: entitie2,

            },
            {
                name: 'Centre de réception des cannes à sucres',
                coordinates: [55.729365781745784, -21.362133209600152],
                image: entitie2,

            },
            {
                name: 'Centre de réception des cannes à sucres',
                coordinates: [55.80614497494987, -21.13151106839816],
                image: entitie2,

            },
            {
                name: 'Centre de réception des cannes à sucres',
                coordinates: [55.72413910887077, -21.044376292190243],
                image: entitie2,

            },
            {
                name: 'Centre de réception des cannes à sucres',
                coordinates: [55.6597350836412 - 20.957459222656215],
                image: entitie2,

            },
            {
                name: 'Centre de réception des cannes à sucres',
                coordinates: [55.636852336769564, -20.908844232097778],
                image: entitie2,

            },
            {
                name: 'Centre de réception des cannes à sucres',
                coordinates: [55.529211314257886, -20.901301169524025],
                image: entitie2,

            },

            ///////////// Pôle canne ///////////// OK ENVIRON
            {
                name: 'Pôle canne',
                coordinates: [55.7167, -21.0333],
                image: entitie3,
            },
            {
                name: 'Pôle canne',
                coordinates: [55.6000, -20.9000],
                image: entitie3,
            },
            {
                name: 'Pôle canne',
                coordinates: [55.4000, -21.2833],
                image: entitie3,
            },
            {
                name: 'Pôle canne',
                coordinates: [55.4667, -21.3333],
                image: entitie3,
            },
            {
                name: 'Pôle canne',
                coordinates: [55.2833, -21.0000],
                image: entitie3,
            },
            {
                name: 'Pôle canne',
                coordinates: [55.6333, -21.3833],
                image: entitie3,
            },

            ///////////// Terminal sucrier ///////////// OK
            {
                name: 'Terminal sucrier',
                coordinates: [55.28310991755115, -20.932297456802974],
                image: entitie4,
            },
            ///////////// Centres de conditionnement ///////////// OK
            {
                name: 'Centres de conditionnement',
                coordinates: [55.32009273933543, -20.945778950303474],
                image: entitie5,
            },
            ///////////// Centre logistique ///////////// OK
            {
                name: 'Centre logistique',
                coordinates: [55.28856540897765, -20.946513687003524],
                image: entitie6,
            },
        ];

        const entitiesSource = new VectorSource();

        entities.forEach((entity) => {
            const feature = new Feature({
                geometry: new Point(fromLonLat(entity.coordinates)),
                name: entity.name,
            });

            feature.setStyle(
                new Style({
                    image: new Icon({
                        src: entity.image,
                        scale: 0.3,
                    }),
                })
            );

            entitiesSource.addFeature(feature);
        });

        const communesLayer = new VectorLayer({
            source: new VectorSource({
                url: '/communes.geojson',
                format: new GeoJSON({
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857',
                }),
            }),
            style: defaultCommunesStyle,
        });

        const soleCanniereLayer = new VectorLayer({
            source: new VectorSource({
                url: '/sole-canniere.geojson',
                format: new GeoJSON(),
            }),
            style: new Style({
                fill: new Fill({ color: 'rgba(45, 95, 82, 0.6)' }),
            }),
        });

        const groupLayer = new VectorLayer({
            source: new VectorSource({
                url: '/bassin-cannier.geojson',
                format: new GeoJSON(),
            }),
            style: defaultCommunesStyle,
        });

        const zonesPCLayer = new VectorLayer({
            source: new VectorSource({
                url: '/zones-pc.geojson',
                format: new GeoJSON({
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857',
                }),
            }),
            style: defaultCommunesStyle,
        });

        const reunionLayer = new VectorLayer({
            source: new VectorSource({
                url: '/all-reunion.geojson',
                format: new GeoJSON(),
            }),
            style: defaultCommunesStyle,
        });

        const intercoLayer = new VectorLayer({
            source: new VectorSource({
                url: '/interco.geojson',
                format: new GeoJSON(),
            }),
            style: defaultCommunesStyle
        })

        const entitiesLayer = new VectorLayer({
            source: entitiesSource,
        });

        let mainLayer;
        if (selectedZone === 'commune') mainLayer = communesLayer;
        if (selectedZone === 'group') mainLayer = groupLayer;
        if (selectedZone === 'interco') mainLayer = intercoLayer;
        if (selectedZone === 'zones-pc') mainLayer = zonesPCLayer;

        const layersToShow = [
            reunionLayer,
            mainLayer,
            soleCanniereLayer,
            entitiesLayer
        ].filter((layer): layer is VectorLayer<VectorSource<Feature>> => layer !== undefined);

        const isMobile = window.innerWidth < 640;

        const mapInstance = new Map({
            target: mapRef.current,
            layers: layersToShow,
            view: new View({
                center: fromLonLat([55.5364, -21.1151]),
                zoom: isMobile ? 9.5 : 10,
                minZoom: 9.5,
                maxZoom: 11,
                extent: reunionExtent,
            }),
            controls: [],
        });

        let lastHoveredFeature: any = null;

        mapInstance.on('pointermove', (evt) => {
            const feature = mapInstance.forEachFeatureAtPixel(evt.pixel, (feat, layer) => {
                if (
                    (selectedZone === 'commune' && layer === communesLayer) ||
                    (selectedZone === 'reunion' && layer === reunionLayer) ||
                    (selectedZone === 'group' && layer === groupLayer) ||
                    (selectedZone === 'interco' && layer === intercoLayer) ||
                    (selectedZone === 'zones-pc' && layer === zonesPCLayer)
                ) {
                    return feat;
                }
                return null;
            });

            if (feature !== lastHoveredFeature) {
                if (lastHoveredFeature instanceof Feature) {
                    lastHoveredFeature.setStyle(defaultCommunesStyle);
                }
                if (feature instanceof Feature) {
                    feature.setStyle(hoverCommunesStyle);
                }
                lastHoveredFeature = feature;
            }
        });

        mapInstance.on('singleclick', function (evt) {
            const feature = mapInstance.forEachFeatureAtPixel(evt.pixel, (feat, layer) => {
                if (
                    (selectedZone === 'commune' && layer === communesLayer) ||
                    (selectedZone === 'reunion' && layer === reunionLayer) ||
                    (selectedZone === 'group' && layer === groupLayer) ||
                    (selectedZone === 'interco' && layer === intercoLayer) ||
                    (selectedZone === 'zones-pc' && layer === zonesPCLayer)
                ) {
                    return feat;
                }
                return null;
            });

            if (feature) {
                setSelectedFeature(feature);
            } else {
                setSelectedFeature(null);
            }
        });

        setMap(mapInstance);

        return () => mapInstance.setTarget(undefined);
    }, [selectedZone]);

    return (
        <div style={{ width: '100%', height: '700px', position: 'relative' }}>
            <div ref={mapRef} style={{ width: '100%', height: '100%', backgroundColor: '#eaeeed' }} />
            {/* Barre de recherche */}
            <div className="absolute bottom-4 right-4 bg-white shadow-lg rounded-sm z-10 w-35 md:w-80">
                <div className="relative">
                    {filteredZones.length > 0 && (
                        <ul className="absolute bottom-full mb-2 bg-white border rounded-sm shadow-lg max-h-40 overflow-y-auto w-full z-20">
                            {filteredZones.map((zone) => (
                                <li
                                    key={zone}
                                    onClick={() => handleSelect(zone)}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    {zone}
                                </li>
                            ))}
                        </ul>
                    )}
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Rechercher ..."
                        className="w-full p-3 border rounded-sm"
                    />
                </div>
            </div>
            {(selectedFeature || selectedName) && (
                <div className="absolute z-20 p-4 top-0 right-0 w-screen">
                    {selectedFeature && (
                        <MapList
                            zone={selectedFeature.get('name')?.trim().toLowerCase()}
                            onClose={handleCloseCard}
                        />
                    )}
                    {!selectedFeature && selectedName && (
                        <MapList zone={selectedName} onClose={handleCloseCard} />
                    )}
                </div>
            )}
            <div className="relative bottom-170 left-4 bg-white p-4 shadow-lg rounded-sm z-10 w-40 sm:w-64">
                <h3 className="font-semibold mb-2 hidden sm:block">Changer la sélection :</h3>
                {/* Desktop view */}
                <div className="hidden sm:grid font-light">
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="zone"
                            value="reunion"
                            checked={selectedZone === 'reunion'}
                            onChange={() => setSelectedZone('reunion')}
                        />
                        <span>Toute La Réunion</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="zone"
                            value="group"
                            checked={selectedZone === 'group'}
                            onChange={() => setSelectedZone('group')}
                        />
                        <span>Bassins canniers</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="zone"
                            value="zones-pc"
                            checked={selectedZone === 'zones-pc'}
                            onChange={() => setSelectedZone('zones-pc')}
                        />
                        <span>Zones pôles canne</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="zone"
                            value="interco"
                            checked={selectedZone === 'interco'}
                            onChange={() => setSelectedZone('interco')}
                        />
                        <span>Intercommunalités</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="zone"
                            value="commune"
                            checked={selectedZone === 'commune'}
                            onChange={() => setSelectedZone('commune')}
                        />
                        <span>Communes</span>
                    </label>
                </div>
            </div>

            {/* Mobile view */}
            <MobileDropdown
                selectedZone={selectedZone}
                setSelectedZone={setSelectedZone}
            />

            {/* Bouton + légende mobile collés à la map */}
            <div className="sm:hidden absolute bottom-4 left-4">
                {!showLegendMobile && (
                    <button
                        onClick={() => setShowLegendMobile(true)}
                        className="flex items-center justify-between px-4 py-3 rounded-sm shadow bg-white text-black font-semibold text-base w-[140px]"
                    >
                        <span>Légende</span>
                        <IoIosArrowUp className="ml-2 text-gray-600" />
                    </button>
                )}

                {showLegendMobile && (
                    <div className="relative bg-white shadow-lg rounded-sm p-4 w-[260px] z-10">
                        {/* Flèche de fermeture */}
                        <div className="absolute top-2 right-2">
                            <button onClick={() => setShowLegendMobile(false)}>
                                <IoIosArrowDown size={20} className="text-gray-600" />
                            </button>
                        </div>

                        <h4 className="font-semibold mb-2">Légende</h4>
                        <ul className="grid font-light gap-1 text-xs">
                            <li className="flex items-center space-x-2">
                                <img src={entitie1} alt="Recherche en canne à sucre" className="w-4 h-4" />
                                <span>Recherche en canne à sucre</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <img src={entitie2} alt="Centre de réception des cannes à sucres" className="w-4 h-4" />
                                <span>Centre de réception des cannes à sucres</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <img src={entitie3} alt="Pôle canne" className="w-4 h-4" />
                                <span>Pôle canne</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <img src={entitie4} alt="Terminal sucrier" className="w-4 h-4" />
                                <span>Terminal sucrier</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <img src={entitie5} alt="Centres de conditionnement" className="w-4 h-4" />
                                <span>Centres de conditionnement</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <img src={entitie6} alt="Centre logistique" className="w-4 h-4" />
                                <span>Centre logistique</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'rgba(45, 95, 82, 0.6)' }} />
                                <span>Sole cannière</span>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Légende desktop */}
            <div
                className="absolute bottom-4 left-4 bg-white p-4 shadow-lg rounded-sm z-10 sm:block hidden"

            >
                <h4 className="font-semibold mb-4">Légende</h4>
                <ul className="grid gap-1 text-xs font-light">
                    <li className="flex items-center space-x-3">
                        <img src={entitie1} alt="Recherche en canne à sucre" className="w-5 h-5" />
                        <span>Recherche en canne à sucre</span>
                    </li>
                    <li className="flex items-center space-x-3">
                        <img src={entitie2} alt="Centre de réception des cannes à sucres" className="w-5 h-5" />
                        <span>Centre de réception des cannes à sucres</span>
                    </li>
                    <li className="flex items-center space-x-3">
                        <img src={entitie3} alt="Pôle canne" className="w-5 h-5" />
                        <span>Pôle canne</span>
                    </li>
                    <li className="flex items-center space-x-3">
                        <img src={entitie4} alt="Terminal sucrier" className="w-5 h-5" />
                        <span>Terminal sucrier</span>
                    </li>
                    <li className="flex items-center space-x-3">
                        <img src={entitie5} alt="Centres de conditionnement" className="w-5 h-5" />
                        <span>Centres de conditionnement</span>
                    </li>
                    <li className="flex items-center space-x-3">
                        <img src={entitie6} alt="Centre logistique" className="w-5 h-5" />
                        <span>Centre logistique</span>
                    </li>
                    <li className="flex items-center space-x-3">
                        <div className="w-5 h-5 rounded-full" style={{ backgroundColor: 'rgba(45, 95, 82, 0.6)' }}></div>
                        <span>Sole cannière</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
