import { useEffect, useState } from "react"
import {
  Expand,
  Layers,
  Minimize2,
  Satellite,
} from "lucide-react"
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const defaultPosition = [27.041, 88.266]

const markerIcon = L.icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

function ChangeMapView({ position, zoom = 14 }) {
  const map = useMap()

  useEffect(() => {
    if (!position) return

    map.flyTo(position, zoom, {
      duration: 0.8,
    })
  }, [map, position, zoom])

  return null
}

function TravelMap({
  destination,
  places = [],
  activePlace = null,
}) {
  const [destinationPosition, setDestinationPosition] =
    useState(defaultPosition)

  const [destinationName, setDestinationName] =
    useState("Destination")

  const [placePositions, setPlacePositions] = useState([])
  const [activePosition, setActivePosition] = useState(null)
  const [activeZoom, setActiveZoom] = useState(14)

  const [mapType, setMapType] = useState("map")
  const [isFullscreen, setIsFullscreen] = useState(false)

  // --------------------------------------------------
  // Destination location search
  // --------------------------------------------------

  useEffect(() => {
    if (!destination?.trim()) return

    const controller = new AbortController()

    const searchLocation = async () => {
      try {
        const query = `${destination.trim()}, India`

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
            query
          )}&countrycodes=in&addressdetails=1&limit=5&accept-language=en`,
          {
            signal: controller.signal,
          }
        )

        const data = await response.json()

        if (data.length > 0) {
          const validResults = data.filter(
            (item) => item.lat && item.lon
          )

          if (validResults.length > 0) {
            const result = validResults[0]

            setDestinationPosition([
              Number(result.lat),
              Number(result.lon),
            ])

            setDestinationName(
              result.display_name || destination
            )

            let zoom = 14

            if (
              result.type === "house" ||
              result.type === "building"
            ) {
              zoom = 18
            } else if (result.type === "road") {
              zoom = 16
            } else if (
              result.type === "neighbourhood" ||
              result.type === "suburb"
            ) {
              zoom = 15
            }

            setActiveZoom(zoom)
          }
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "Destination location search failed:",
            error
          )
        }
      }
    }

    searchLocation()

    return () => controller.abort()
  }, [destination])

  // --------------------------------------------------
  // Place location search
  // --------------------------------------------------

  useEffect(() => {
    if (!places.length || !destination?.trim()) {
      setPlacePositions([])
      return
    }

    const controller = new AbortController()

    const searchPlaces = async () => {
      const results = []

      for (const place of places) {
        try {
          const query = `${place}, ${destination.trim()}, India`

          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
              query
            )}&countrycodes=in&limit=3&accept-language=en`,
            {
              signal: controller.signal,
            }
          )

          const data = await response.json()

          if (
            data.length > 0 &&
            data[0].lat &&
            data[0].lon
          ) {
            results.push({
              name: place,
              displayName: data[0].display_name,
              position: [
                Number(data[0].lat),
                Number(data[0].lon),
              ],
            })
          }
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error(
              `Location search failed for ${place}:`,
              error
            )
          }
        }
      }

      setPlacePositions(results)
    }

    searchPlaces()

    return () => controller.abort()
  }, [places, destination])

  // --------------------------------------------------
  // Active place
  // --------------------------------------------------

  useEffect(() => {
    if (!activePlace) {
      setActivePosition(null)
      return
    }

    const selectedPlace = placePositions.find(
      (item) => item.name === activePlace
    )

    if (selectedPlace) {
      setActivePosition(selectedPlace.position)
      setActiveZoom(16)
    }
  }, [activePlace, placePositions])

  const mapPosition =
    activePosition || destinationPosition

  // --------------------------------------------------
  // Fullscreen
  // --------------------------------------------------

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev)
  }

  return (
    <div
      className={`relative w-full overflow-hidden border border-slate-200 shadow-sm ${
        isFullscreen
          ? "fixed inset-0 z-[3000] h-screen rounded-none"
          : "h-[420px] rounded-2xl"
      }`}
    >
      {/* ============================================ */}
      {/* Map / Satellite Toggle */}
      {/* ============================================ */}

      <div className="absolute right-3 top-3 z-[1000] flex overflow-hidden rounded-xl border border-white/20 bg-[#0b0b0d]/95 p-1 shadow-xl backdrop-blur-md">
        <button
          type="button"
          onClick={() => setMapType("map")}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition ${
            mapType === "map"
              ? "bg-blue-600 text-white"
              : "text-slate-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          <Layers size={14} />
          Map
        </button>

        <button
          type="button"
          onClick={() => setMapType("satellite")}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition ${
            mapType === "satellite"
              ? "bg-blue-600 text-white"
              : "text-slate-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          <Satellite size={14} />
          Satellite
        </button>
      </div>

      {/* ============================================ */}
      {/* Fullscreen Button */}
      {/* ============================================ */}

      <button
        type="button"
        onClick={toggleFullscreen}
        className="absolute bottom-4 right-3 z-[1000] flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-[#0b0b0d]/95 text-slate-300 shadow-xl backdrop-blur-md transition hover:bg-blue-600 hover:text-white"
        aria-label={
          isFullscreen
            ? "Exit fullscreen"
            : "Open map fullscreen"
        }
      >
        {isFullscreen ? (
          <Minimize2 size={17} />
        ) : (
          <Expand size={17} />
        )}
      </button>

      {/* ============================================ */}
      {/* Map */}
      {/* ============================================ */}

      <MapContainer
        center={destinationPosition}
        zoom={14}
        scrollWheelZoom={true}
        zoomControl={true}
        className="h-full w-full"
        attributionControl={true}
      >
        {/* ========================================== */}
        {/* NORMAL MAP */}
        {/* ========================================== */}

        {mapType === "map" && (
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        )}

        {/* ========================================== */}
        {/* SATELLITE MAP */}
        {/* ========================================== */}

        {mapType === "satellite" && (
          <>
            {/* Satellite imagery */}
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri"
            />

            {/* Place names + boundaries + labels */}
            <TileLayer
              url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
              attribution="Labels &copy; Esri"
              pane="overlayPane"
            />
          </>
        )}

        {/* Automatic map movement */}
        <ChangeMapView
          position={mapPosition}
          zoom={activeZoom}
        />

        {/* ========================================== */}
        {/* Destination Marker */}
        {/* ========================================== */}

        <Marker
          position={destinationPosition}
          icon={markerIcon}
        >
          <Popup>
            <strong>{destinationName}</strong>
          </Popup>
        </Marker>

        {/* ========================================== */}
        {/* Place Markers */}
        {/* ========================================== */}

        {placePositions.map((place, index) => (
          <Marker
            key={`${place.name}-${index}`}
            position={place.position}
            icon={markerIcon}
          >
            <Popup>
              <strong>{place.name}</strong>

              {place.displayName && (
                <div className="mt-1 text-xs">
                  {place.displayName}
                </div>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* ============================================ */}
      {/* Map Styling */}
      {/* ============================================ */}

      <style>{`
        /* ------------------------------- */
        /* Zoom + / - buttons */
        /* ------------------------------- */

        .leaflet-control-zoom {
          margin-left: 12px !important;
          margin-top: 12px !important;
          border: none !important;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35) !important;
          border-radius: 12px !important;
          overflow: hidden !important;
        }

        .leaflet-control-zoom a {
          width: 38px !important;
          height: 38px !important;
          line-height: 36px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;

          background: rgba(11, 11, 13, 0.95) !important;
          color: #cbd5e1 !important;

          border: 1px solid rgba(255, 255, 255, 0.12) !important;

          font-size: 21px !important;
          font-weight: 400 !important;

          transition: all 0.2s ease !important;
        }

        .leaflet-control-zoom a:hover {
          background: #2563eb !important;
          color: white !important;
        }

        .leaflet-control-zoom-in {
          border-radius: 12px 12px 0 0 !important;
        }

        .leaflet-control-zoom-out {
          border-radius: 0 0 12px 12px !important;
          border-top: none !important;
        }

        /* ------------------------------- */
        /* Attribution */
        /* ------------------------------- */

        .leaflet-control-attribution {
          font-size: 8px !important;
          line-height: 11px !important;

          padding: 1px 4px !important;

          background: rgba(0, 0, 0, 0.45) !important;

          color: rgba(255, 255, 255, 0.55) !important;

          border-radius: 4px 0 0 0 !important;

          box-shadow: none !important;
        }

        .leaflet-control-attribution a {
          color: rgba(255, 255, 255, 0.65) !important;
        }

        .leaflet-control-attribution:hover {
          opacity: 1 !important;
        }

        /* ------------------------------- */
        /* Remove default Leaflet border */
        /* ------------------------------- */

        .leaflet-bar {
          border: none !important;
        }
      `}</style>
    </div>
  )
}

export default TravelMap