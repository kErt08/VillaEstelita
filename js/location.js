(function () {
  const RESORT = {
    lat: 14.2614786,
    lng: 121.4313217,
    panoid: "qRtNKl0uHfXugAWLT5r4rw",
    yaw: 116.37,
    name: "Villa Estelita",
  };

  const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${RESORT.lat},${RESORT.lng}`;
  const STREET_VIEW_LINK = `https://www.google.com/maps/@${RESORT.lat},${RESORT.lng},3a,75y,${RESORT.yaw}h,90t/data=!3m7!1e1!3m5!1s${RESORT.panoid}!2e0!7i16384!8i8192`;

  const CATEGORIES = {
    commute: { label: "Commute", color: "#865131" },
    food: { label: "Food", color: "#ed3110" },
    coffee: { label: "Coffee Shop", color: "#e4904e" },
    facilities: { label: "Facilities", color: "#5a7a5e" },
  };

  // Coordinates from OpenStreetMap or verified local references (Pagsanjan, Laguna).
  const PLACES = [
    { id: "lli-bus", name: "LLI Bus Terminal", category: "commute", lat: 14.2651905, lng: 121.4307451 },
    { id: "shakeys", name: "Shakey's Pagsanjan", category: "food", lat: 14.26485, lng: 121.4331 },
    { id: "jollibee", name: "Jollibee Pagsanjan", category: "food", lat: 14.2647818, lng: 121.4374744 },
    { id: "mcdonalds", name: "McDonald's Pagsanjan", category: "food", lat: 14.2738656, lng: 121.4505321 },
    { id: "le-katsu", name: "Le Katsu Mnl — Pagsanjan", category: "food", lat: 14.2675, lng: 121.4392 },
    { id: "hana-japanese", name: "Hana Japanese", category: "food", lat: 14.2699356, lng: 121.4445663 },
    { id: "bean-there", name: "Bean There Slowbar Pagsanjan", category: "coffee", lat: 14.264426, lng: 121.433028 },
    { id: "pickup-coffee", name: "PICKUP COFFEE — Areza Town Center Pagsanjan", category: "coffee", lat: 14.2650629, lng: 121.4395513 },
    { id: "starbucks-sc", name: "Starbucks Santa Cruz Laguna", category: "coffee", lat: 14.2574196, lng: 121.3959441 },
    { id: "hometown-cafe", name: "Hometown Cafe Pagsanjan", category: "coffee", lat: 14.273, lng: 121.4542 },
    { id: "goodwill", name: "Goodwill Supermarket Pagsanjan", category: "facilities", lat: 14.2648363, lng: 121.4377214 },
    { id: "areza-mall", name: "Areza Mall and Shopping Complex Pagsanjan", category: "facilities", lat: 14.26435, lng: 121.43935 },
    { id: "public-market", name: "Pagsanjan Public Market", category: "facilities", lat: 14.2642794, lng: 121.4391001 },
    { id: "puregold", name: "Puregold Pagsanjan", category: "facilities", lat: 14.2648987, lng: 121.4395157 },
    { id: "rhu", name: "Pagsanjan Rural Health Unit", category: "facilities", lat: 14.2645212, lng: 121.4401921 },
    { id: "prime-medical", name: "Pagsanjan Prime Medical Center Inc.", category: "facilities", lat: 14.269, lng: 121.4435 },
    { id: "laguna-doctors", name: "Laguna Doctors Hospital", category: "facilities", lat: 14.2726596, lng: 121.4190919 },
    { id: "petron-lanz", name: "Petron — Pagsanjan (Lanz Gasoline Station)", category: "facilities", lat: 14.2645786, lng: 121.4351712 },
    { id: "shell", name: "Shell Pagsanjan", category: "facilities", lat: 14.268011, lng: 121.4419954 },
  ];

  const CACHE_KEY = "villa-estelita-nearby-geocode-v2";

  let map;
  let markersLayer;
  let resortCircle;
  let routeLine;
  let placeMarkers = new Map();
  let resolvedPlaces = [];
  let activeCategory = "all";
  let selectedId = null;

  const listEl = document.getElementById("nearbyList");
  const listStatusEl = document.getElementById("nearbyListStatus");
  const selectionDefault = document.getElementById("locationSelectionDefault");
  const selectionActive = document.getElementById("locationSelectionActive");
  const selectionName = document.getElementById("locationSelectionName");
  const selectionDistance = document.getElementById("locationSelectionDistance");

  function loadGeocodeCache() {
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function saveGeocodeCache(cache) {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  }

  function haversineKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function formatDistance(km) {
    if (km == null) return "Distance being updated";
    if (km < 1) return `${Math.round(km * 1000)} m from Villa Estelita`;
    return `${km.toFixed(1)} km from Villa Estelita`;
  }

  function formatDistanceShort(km) {
    if (km == null) return "—";
    if (km < 1) return `~${Math.round(km * 1000)} m`;
    return `~${km.toFixed(1)} km`;
  }

  function createPlaceMarkerIcon(color) {
    return L.divIcon({
      className: "map-marker-wrap",
      html: `<span class="map-marker map-marker--place" style="--marker-color:${color}"></span>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });
  }

  function createResortMarkerIcon() {
    return L.divIcon({
      className: "map-marker-wrap map-marker-wrap--resort",
      html: `
        <div class="resort-marker">
          <span class="resort-marker-pin" aria-hidden="true"></span>
          <span class="resort-marker-label">Villa Estelita</span>
        </div>
      `,
      iconSize: [140, 48],
      iconAnchor: [70, 44],
    });
  }

  function withDistance(place) {
    if (place.lat == null || place.lng == null) return { ...place, distanceKm: null };
    return {
      ...place,
      distanceKm: haversineKm(RESORT.lat, RESORT.lng, place.lat, place.lng),
    };
  }

  async function geocodePlace(place, cache) {
    if (place.lat != null && place.lng != null) return withDistance(place);
    if (cache[place.id]) return withDistance({ ...place, ...cache[place.id] });
    if (!place.search) return withDistance(place);

    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=ph&q=${encodeURIComponent(place.search)}`;
    try {
      const res = await fetch(url, { headers: { "Accept-Language": "en" } });
      if (!res.ok) return withDistance(place);
      const data = await res.json();
      if (!data.length) return withDistance(place);
      const coords = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      cache[place.id] = coords;
      saveGeocodeCache(cache);
      return withDistance({ ...place, ...coords });
    } catch {
      return withDistance(place);
    }
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function resolveAllPlaces() {
    const cache = loadGeocodeCache();
    const results = [];

    for (let i = 0; i < PLACES.length; i++) {
      const place = PLACES[i];
      const needsLookup = place.lat == null || place.lng == null;
      const resolved = await geocodePlace(place, cache);
      results.push(resolved);
      if (needsLookup && i < PLACES.length - 1) await delay(1100);
    }

    return results.sort((a, b) => {
      if (a.distanceKm == null) return 1;
      if (b.distanceKm == null) return -1;
      return a.distanceKm - b.distanceKm;
    });
  }

  function getFilteredPlaces() {
    if (activeCategory === "all") return resolvedPlaces;
    return resolvedPlaces.filter((p) => p.category === activeCategory);
  }

  function updateSelectionBar(place) {
    if (!place) {
      selectionDefault.hidden = false;
      selectionActive.hidden = true;
      return;
    }
    selectionDefault.hidden = true;
    selectionActive.hidden = false;
    selectionName.textContent = place.name;
    selectionDistance.textContent = formatDistance(place.distanceKm);
  }

  function renderList() {
    const places = getFilteredPlaces();
    listEl.innerHTML = "";

    places.forEach((place) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "nearby-list-item" + (place.id === selectedId ? " active" : "");
      btn.dataset.id = place.id;
      btn.setAttribute("role", "option");
      btn.setAttribute("aria-selected", place.id === selectedId ? "true" : "false");

      const cat = CATEGORIES[place.category];
      btn.innerHTML = `
        <span class="nearby-list-dot" style="background:${cat.color}"></span>
        <span class="nearby-list-text">
          <strong>${place.name}</strong>
          <span>${cat.label} · ${formatDistanceShort(place.distanceKm)}</span>
        </span>
      `;

      btn.addEventListener("click", () => selectPlace(place.id));
      li.appendChild(btn);
      listEl.appendChild(li);
    });

    listStatusEl.textContent = `${places.length} places · distances from Villa Estelita`;
  }

  function addResortLayers() {
    resortCircle = L.circle([RESORT.lat, RESORT.lng], {
      radius: 120,
      color: "#ed3110",
      fillColor: "#ed3110",
      fillOpacity: 0.1,
      weight: 2,
      dashArray: "6 6",
    }).addTo(map);

    const resortMarker = L.marker([RESORT.lat, RESORT.lng], {
      icon: createResortMarkerIcon(),
      zIndexOffset: 1000,
      title: RESORT.name,
    });
    resortMarker.bindPopup(`<strong>${RESORT.name}</strong><br><em>The resort — your starting point</em>`);
    resortMarker.on("click", () => clearSelection());
    markersLayer.addLayer(resortMarker);
  }

  function updateMarkers() {
    markersLayer.clearLayers();
    placeMarkers.clear();
    addResortLayers();

    getFilteredPlaces().forEach((place) => {
      if (place.lat == null || place.lng == null) return;
      const cat = CATEGORIES[place.category];
      const marker = L.marker([place.lat, place.lng], {
        icon: createPlaceMarkerIcon(cat.color),
        title: place.name,
      });
      const dist = formatDistance(place.distanceKm);
      marker.bindPopup(`<strong>${place.name}</strong><br>${cat.label}<br>${dist}`);
      marker.on("click", () => selectPlace(place.id));
      markersLayer.addLayer(marker);
      placeMarkers.set(place.id, marker);
    });
  }

  function drawRoute(place) {
    if (routeLine) {
      map.removeLayer(routeLine);
      routeLine = null;
    }
    if (!place || place.lat == null || place.lng == null) return;
    routeLine = L.polyline(
      [
        [RESORT.lat, RESORT.lng],
        [place.lat, place.lng],
      ],
      { color: "#e4904e", weight: 3, dashArray: "8 8", opacity: 0.9 }
    ).addTo(map);
  }

  function fitResortAndPlace(place) {
    if (place && place.lat != null && place.lng != null) {
      const bounds = L.latLngBounds([
        [RESORT.lat, RESORT.lng],
        [place.lat, place.lng],
      ]);
      map.fitBounds(bounds.pad(0.35));
      return;
    }
    map.flyTo([RESORT.lat, RESORT.lng], 15, { duration: 0.6 });
  }

  function selectPlace(id) {
    const place = resolvedPlaces.find((p) => p.id === id);
    if (!place) return;

    selectedId = id;
    renderList();
    updateSelectionBar(place);
    drawRoute(place);

    if (place.lat != null && place.lng != null) {
      const marker = placeMarkers.get(place.id);
      if (marker) marker.openPopup();
      fitResortAndPlace(place);
    } else {
      fitResortAndPlace(null);
    }
  }

  function clearSelection() {
    selectedId = null;
    renderList();
    updateSelectionBar(null);
    drawRoute(null);
    map.flyTo([RESORT.lat, RESORT.lng], 15, { duration: 0.6 });
  }

  function initMap() {
    map = L.map("locationMap", { scrollWheelZoom: true, zoomControl: true }).setView(
      [RESORT.lat, RESORT.lng],
      15
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    markersLayer = L.layerGroup().addTo(map);
  }

  function bindFilters() {
    document.querySelectorAll(".nearby-filter").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeCategory = btn.dataset.category;
        document.querySelectorAll(".nearby-filter").forEach((b) => {
          const on = b.dataset.category === activeCategory;
          b.classList.toggle("active", on);
          b.setAttribute("aria-selected", on ? "true" : "false");
        });
        updateMarkers();
        renderList();
        if (selectedId && !getFilteredPlaces().some((p) => p.id === selectedId)) {
          clearSelection();
        }
      });
    });
  }

  function bindResortLinks() {
    const mapsLink = document.getElementById("mapsLink");
    const streetViewLink = document.getElementById("streetViewLink");
    const copyBtn = document.getElementById("copyCoordsBtn");

    if (mapsLink) mapsLink.href = MAPS_LINK;
    if (streetViewLink) streetViewLink.href = STREET_VIEW_LINK;

    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        const coords = `${RESORT.lat}, ${RESORT.lng}`;
        const toast = document.getElementById("copyToast");
        try {
          await navigator.clipboard.writeText(coords);
          toast.textContent = "Coordinates copied to clipboard.";
        } catch {
          toast.textContent = coords;
        }
        setTimeout(() => {
          toast.textContent = "";
        }, 3000);
      });
    }

    const focusResortBtn = document.getElementById("focusResortBtn");
    if (focusResortBtn) focusResortBtn.addEventListener("click", clearSelection);
  }

  async function init() {
    const mapEl = document.getElementById("locationMap");
    if (!mapEl || typeof L === "undefined") return;

    initMap();
    bindFilters();
    bindResortLinks();

    resolvedPlaces = await resolveAllPlaces();
    updateMarkers();
    renderList();

    const bounds = L.latLngBounds([[RESORT.lat, RESORT.lng]]);
    resolvedPlaces.forEach((p) => {
      if (p.lat != null && p.lng != null) bounds.extend([p.lat, p.lng]);
    });
    if (bounds.isValid()) map.fitBounds(bounds.pad(0.12));

    const locationSection = document.getElementById("location");
    if (locationSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            map.invalidateSize();
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(locationSection);
    }

    setTimeout(() => map.invalidateSize(), 200);

    let resizeTimer;
    function onMapResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (map) map.invalidateSize();
      }, 150);
    }
    window.addEventListener("resize", onMapResize);
    window.addEventListener("orientationchange", onMapResize);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
