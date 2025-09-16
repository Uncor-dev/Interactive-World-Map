import { useEffect, useRef, useState } from "react";
import { get as getProjection } from "ol/proj";
import { unByKey } from "ol/Observable";
import "ol/ol.css";
import { Map, View } from "ol";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Fill, Stroke, Circle as CircleStyle } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Overlay from "ol/Overlay";

type Mode =
    | "all-producers"
    | "top-producers"
    | "competitors-specialty"; // libellés FR dans l’UI

// ————————————————————————————————————————
// Données (exemples) — adapte librement
// ISO-A3 pour filtrer les pays dans le GeoJSON
const ALL_SUGAR_PRODUCERS = new Set<string>([
    // échantillon — complète ta liste
    "BRA", "IND", "CHN", "THA", "MEX", "USA", "FRA", "RUS", "AUS", "VNM", "IDN", "PAK", "PHL", "ZAF", "EGY"
]);

const TOP_PRODUCERS = new Set<string>(["BRA", "IND", "CHN", "THA", "MEX", "USA", "RUS"]); // exemple

const COMPETITORS_SPECIALTY = new Set<string>(["FRA", "DEU", "GBR", "NLD"]); // “concurrents sucres de spécialité”

// pins (centroïdes simples)
const PINS: Array<{ iso3: string; name: string; lon: number; lat: number }> = [
    { iso3: "USA", name: "États-Unis", lon: -98.5, lat: 39.5 },
    { iso3: "MEX", name: "Mexique", lon: -102.5, lat: 23.5 },
    { iso3: "BRA", name: "Brésil", lon: -51.9253, lat: -14.235 },
    { iso3: "FRA", name: "France", lon: 2.2137, lat: 46.2276 },
    { iso3: "RUS", name: "Russie", lon: 105.3188, lat: 61.524 },
    { iso3: "IND", name: "Inde", lon: 78.9629, lat: 20.5937 },
    { iso3: "CHN", name: "Chine", lon: 104.1954, lat: 35.8617 },
    { iso3: "THA", name: "Thaïlande", lon: 100.9925, lat: 15.870 },
    { iso3: "AUS", name: "Australie", lon: 133.7751, lat: -25.274 }
];

// ————————————————————————————————————————
// Styles (proches de ta carte Réunion)
const COLOR_BG = "#eaeeed";               // fond
const COLOR_DEFAULT = "#e9eceb";          // pays non-sélection
const COLOR_STROKE = "rgba(45,95,82,0.6)";
const COLOR_SELECTED = "#88b940";         // vert “principal”
const COLOR_HOVER = "#2D5F52";            // vert foncé au survol
const PIN_FILL = "#0D5B57";               // teal foncé

const defaultCountryStyle = new Style({
    fill: new Fill({ color: COLOR_DEFAULT }),
    stroke: new Stroke({ color: COLOR_STROKE, width: 0.7 }),
});

const selectedCountryStyle = new Style({
    fill: new Fill({ color: COLOR_SELECTED }),
    stroke: new Stroke({ color: COLOR_STROKE, width: 0.7 }),
});

const hoverCountryStyle = new Style({
    fill: new Fill({ color: COLOR_HOVER }),
    stroke: new Stroke({ color: COLOR_STROKE, width: 0.7 }),
});

const pinStyle = new Style({
    image: new CircleStyle({
        radius: 7,
        fill: new Fill({ color: PIN_FILL }),
    }),
});

// ...imports identiques...

export default function WorldSugarMap() {
    const mapDivRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const [mode, setMode] = useState<Mode>("top-producers");
    const [countryLayer, setCountryLayer] = useState<VectorLayer<VectorSource> | null>(null);
    const [hoveredFeature, setHoveredFeature] = useState<any>(null);
    const [selected, setSelected] = useState<{ name: string; iso3: string } | null>(null);
    const [overlay, setOverlay] = useState<Overlay | null>(null);

    const styleFunction = (feature: any) => {
        const iso3 = (feature.get("ISO_A3") || feature.get("iso_a3") || "").toUpperCase();
        const set = mode === "all-producers" ? ALL_SUGAR_PRODUCERS
            : mode === "top-producers" ? TOP_PRODUCERS
                : COMPETITORS_SPECIALTY;
        return set.has(iso3) ? selectedCountryStyle : defaultCountryStyle;
    };

    useEffect(() => {
        if (!mapDivRef.current) return;

        // ✅ UNE SEULE SOURCE + URL cohérente (underscore)
        const countriesSource = new VectorSource({
            url: "/world_countries.geojson",
            format: new GeoJSON({
                dataProjection: "EPSG:4326",
                featureProjection: "EPSG:3857",
            }),
            wrapX: false,
            attributions: "© Natural Earth",
        });

        countriesSource.on("featuresloadend", () =>
            console.log("✓ countries loaded:", countriesSource.getFeatures().length)
        );
        countriesSource.on("featuresloaderror", (e) =>
            console.error("✗ load error", e)
        );

        const countries = new VectorLayer({
            source: countriesSource,
            style: styleFunction,
        });

        // (Optionnel) frontières internes si tu as le fichier
        const borders = new VectorLayer({
            source: new VectorSource({
                url: "/world_borders.geojson", // assure qu’il existe sinon enlève cette couche
                format: new GeoJSON({ dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" }),
            }),
            style: new Style({ stroke: new Stroke({ color: "rgba(45,95,82,0.6)", width: 0.6 }) }),
        });

        // Pins
        const pinSource = new VectorSource();
        PINS.forEach(p => {
            const f = new Feature({
                geometry: new Point(fromLonLat([p.lon, p.lat])),
                name: p.name,
                iso3: p.iso3,
            });
            f.setStyle(pinStyle);
            pinSource.addFeature(f);
        });
        const pins = new VectorLayer({ source: pinSource });

        const worldExtent = getProjection("EPSG:3857")!.getExtent();

        const map = new Map({
            target: mapDivRef.current,
            layers: [countries, /* borders? */ pins],
            view: new View({
                center: fromLonLat([10, 20]),
                zoom: 3,          // ← plus éloigné au départ (essaie 0.8 si tu veux)
                minZoom: 2,       // ← autorise le dézoom fort
                maxZoom: 4,      // ← laisse tel quel ou ajuste pour tes besoins
                extent: worldExtent,        // ← limite la navigation à un seul monde
                constrainOnlyCenter: true,
            }),
            controls: [],
        });

        const ov = new Overlay({
            element: popupRef.current as HTMLElement,
            offset: [0, -15],
            positioning: "bottom-center",
            stopEvent: true,
        });
        map.addOverlay(ov);

        let lastHover: Feature | null = null;

        const moveKey = map.on("pointermove", (evt) => {
            const feat = map.forEachFeatureAtPixel(
                evt.pixel,
                (f, layer) => (layer === countries ? (f as Feature) : null),
                { hitTolerance: 3, layerFilter: (l) => l === countries } // + tolérance = moins de “flicker”
            );

            if (feat !== lastHover) {
                // remettre l’ancien feature à son style de couche (pas un style figé)
                if (lastHover) lastHover.setStyle(undefined);

                // appliquer le style hover sur le nouveau
                if (feat) feat.setStyle(hoverCountryStyle);

                lastHover = feat ?? null;
            }

            // curseur pointeur sur les pays
            (map.getTargetElement() as HTMLElement).style.cursor = feat ? "pointer" : "";
        });

        // quand la souris quitte la map ou au cleanup
        const outKey = map.on("pointerout", () => {
            if (lastHover) lastHover.setStyle(undefined);
            lastHover = null;
            (map.getTargetElement() as HTMLElement).style.cursor = "";
        });

        return () => {
            unByKey(moveKey);
            unByKey(outKey);
            map.setTarget(undefined);
        };

        map.on("singleclick", (evt) => {
            let handled = false;
            const pin = map.forEachFeatureAtPixel(evt.pixel, (f, layer) => (layer === pins ? f : null));
            if (pin) {
                const iso3 = (pin.get("iso3") || "").toUpperCase();
                const name = pin.get("name") || "";
                setSelected({ iso3, name });
                ov.setPosition((pin.getGeometry() as Point).getCoordinates());
                handled = true;
            }
            if (!handled) {
                const f = map.forEachFeatureAtPixel(evt.pixel, (feat, layer) => (layer === countries ? feat : null));
                if (f) {
                    const iso3 = (f.get("ISO_A3") || f.get("iso_a3") || "").toUpperCase();
                    const admin = f.get("ADMIN") || f.get("name") || "Pays";
                    const set = mode === "all-producers" ? ALL_SUGAR_PRODUCERS
                        : mode === "top-producers" ? TOP_PRODUCERS
                            : COMPETITORS_SPECIALTY;
                    if (set.has(iso3)) {
                        setSelected({ iso3, name: admin });
                        ov.setPosition(evt.coordinate);
                    } else {
                        setSelected(null);
                        ov.setPosition(undefined);
                    }
                } else {
                    setSelected(null);
                    ov.setPosition(undefined);
                }
            }
        });

        setCountryLayer(countries);
        setOverlay(ov);

        return () => map.setTarget(undefined);
    }, []);

    useEffect(() => {
        if (!countryLayer) return;
        countryLayer.setStyle(styleFunction);
        countryLayer.changed();
        if (selected) {
            const set = mode === "all-producers" ? ALL_SUGAR_PRODUCERS
                : mode === "top-producers" ? TOP_PRODUCERS
                    : COMPETITORS_SPECIALTY;
            if (!set.has(selected.iso3)) {
                setSelected(null);
                overlay?.setPosition(undefined);
            }
        }
    }, [mode]);

    return (
        <div className="relative w-full" style={{ height: 700, background: COLOR_BG }}>
            <div ref={mapDivRef} className="w-full h-full" />

            {/* panneau radio */}
            <div className="absolute left-4 top-4 bg-white shadow-lg rounded-sm z-10 w-64 p-4">
                <h3 className="font-semibold mb-2">Changer la sélection :</h3>
                <div className="grid gap-2 text-sm font-light">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="mode"
                            value="all-producers"
                            checked={mode === "all-producers"}
                            onChange={() => setMode("all-producers")}
                        />
                        <span>Pays producteurs de sucre de canne et de betterave</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="mode"
                            value="top-producers"
                            checked={mode === "top-producers"}
                            onChange={() => setMode("top-producers")}
                        />
                        <span>Principaux producteurs de sucre au monde</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="mode"
                            value="competitors-specialty"
                            checked={mode === "competitors-specialty"}
                            onChange={() => setMode("competitors-specialty")}
                        />
                        <span>Principaux concurrents des sucres de spécialité</span>
                    </label>
                </div>
            </div>

            {/* légende */}
            <div className="absolute left-4 bottom-4 bg-white shadow-lg rounded-sm z-10 p-4 w-72">
                <h4 className="font-semibold mb-2">Légende</h4>
                <ul className="text-xs font-light grid gap-2">
                    <li className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded" style={{ background: COLOR_SELECTED }} />
                        <span>Pays sélectionnés</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full" style={{ background: PIN_FILL }} />
                        <span>Cliquer pour plus d’informations</span>
                    </li>
                </ul>
            </div>

            {/* popup/card */}
            <div
                ref={popupRef}
                className="absolute z-20"
                style={{ transform: "translate(-50%, -100%)" }}
            >
                {selected && (
                    <div className="bg-white/95 backdrop-blur shadow-xl rounded-md p-4 w-72">
                        <div className="flex items-start justify-between mb-2">
                            <h5 className="font-semibold">{selected.name}</h5>
                            <button
                                className="text-gray-500 hover:text-gray-800"
                                onClick={() => {
                                    setSelected(null);
                                    overlay?.setPosition(undefined);
                                }}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="text-sm text-gray-700 space-y-2">
                            <p>ISO-3 : {selected.iso3}</p>
                            <p className="text-gray-600">
                                Placeholder: stats sucre / liens / CTA.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
