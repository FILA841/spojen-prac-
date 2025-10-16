// Show main after clicking
const startBtn = document.getElementById('startBtn');
const projekty = document.getElementById('projekty');
const hero = document.getElementById('hero');

startBtn.addEventListener('click', () => {
  hero.style.display = 'none';
  projekty.classList.remove('hidden');
  // scroll to top to show layout nicely
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* --------------------------
   DATA: events (blue markers)
   and birthplaces (red markers)
   -------------------------- */
// events: year, title, coords, description, link
const events = [
  { year: 1939, id: '1939-poland', title: 'Německo napadá Polsko — začátek války', coords: [52.2297, 21.0122], desc: '1. 9. 1939: útok na Polsko — začátek 2. světové války.', link: 'https://github.com/BohmJakub/projekt-wet/tree/master' },
  { year: 1940, id: '1940-battle-britain', title: 'Bitva o Británii', coords: [51.5072, -0.1276], desc: '1940: Letecké boje o Británii.', link: 'https://github.com/Danda0077/WET_PROJECT_CHURCHILL' },
  { year: 1941, id: '1941-barbarossa', title: 'Operace Barbarossa', coords: [55.7558, 37.6173], desc: '22.6.1941: Německý útok na SSSR.', link: 'https://github.com/FILA841/Operace-Barbarossa.git' },
  { year: 1941, id: '1941-pearl', title: 'Útok na Pearl Harbor', coords: [21.3649, -157.9394], desc: '7.12.1941: Japonský útok na Pearl Harbor.', link: 'https://github.com/KrizMartin/wet-project2.IT' },
  { year: 1942, id: '1942-stalingrad', title: 'Bitva u Stalingradu', coords: [48.708, 44.513], desc: '1942–1943: Bitva u Stalingradu, zlom na východní frontě.', link: 'https://github.com/FILA841/Operace-Barbarossa.git' },
  { year: 1942, id: '1942-anthropoid', title: 'Operace Anthropoid', coords: [50.08804, 14.42076], desc: 'Atentát na Heydricha v Praze (1942).', link: 'https://github.com/Filip603/WET---Proch-zka-Operace-Anthropoid.git' },
  { year: 1942, id: '1942-africa', title: 'Severoafrická kampaň', coords: [31, 10], desc: 'Boje v severní Africe (1940–1943).', link: 'https://github.com/Tomas-Hepner/NorthAfricanCampaign' },
  { year: 1944, id: '1944-d-day', title: 'Vylodění v Normandii (D-Day)', coords: [49.3, -0.7], desc: '6.6.1944: Vylodění spojenců v Normandii.', link: 'https://github.com/Formy12/Projekt---Vylod-n-v-It-lii.git' },
  { year: 1944, id: '1944-warsaw', title: 'Varšavské povstání', coords: [52.2297, 21.0122], desc: 'Srpen–říjen 1944: Varšavské povstání.', link: 'https://github.com/HalackaDavid/Project.git' },
  { year: 1945, id: '1945-hiroshima', title: 'Hiroshima', coords: [34.3853, 132.4553], desc: '6.8.1945: Svržení atomové bomby na Hirošimu.', link: 'https://github.com/kresadlo/project-hiroshima-nagasaki' },
  { year: 1945, id: '1945-nagasaki', title: 'Nagasaki', coords: [32.7767, 129.865], desc: '9.8.1945: Svržení atomové bomby na Nagasaki.', link: 'https://github.com/kresadlo/project-hiroshima-nagasaki' },
  { year: 1941, id: 'holocaust', title: 'Holokaust / Osvětim', coords: [50.0359, 19.1783], desc: 'Systematické vyhlazování — Osvětim a další tábory.', link: 'https://github.com/Mbarborka/holokaust' },
  { year: 1939, id: 'zbrojeni', title: 'Zbrojení a průmysl', coords: [50.0755, 14.4378], desc: 'Intenzivní zbrojení a přeměna průmyslu na válečnou výrobu.', link: 'https://github.com/BohmJakub/projekt-wet/tree/master' }
];

// birthplaces (red markers). Add more here if you want (coords are approximate).
const birthplaces = [
  { name: 'Nicholas Winton (nar.) — zhruba London', coords: [51.5072, -0.1276], link: 'https://github.com/Honku08/WET-Nicholas_Winton-Kupecek.git' },
  { name: 'Anna Frank (nar.) — Frankfurt (přibližně)', coords: [50.1109, 8.6821], link: 'https://github.com/budicek232/Projekt-Anna_Frankova.git' }
];

/* --------------------------
   Initialize map (Leaflet)
   -------------------------- */
const map = L.map('map', { preferCanvas: true }).setView([50, 10], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Layer groups for control (optional)
const eventsLayer = L.layerGroup().addTo(map);
const birthsLayer = L.layerGroup().addTo(map);

/* --------------------------
   Add event markers (blue)
   -------------------------- */
const markerById = {}; // to open popups later

events.forEach(ev => {
  const marker = L.circleMarker(ev.coords, {
    color: '#2b89d9',
    fillColor: '#2b89d9',
    fillOpacity: 0.9,
    radius: 8,
    weight: 1
  }).addTo(eventsLayer);

  // popup content: short text + button (opens project when clicked)
  const popupHtml = `
    <div style="max-width:260px">
      <strong style="display:block;margin-bottom:6px">${ev.title}</strong>
      <div style="color:#eee;font-size:0.95rem;margin-bottom:8px">${ev.desc}</div>
      <a class="popup-btn" href="${ev.link}" target="_blank" style="
         display:inline-block;padding:8px 10px;border-radius:8px;background:#e74c3c;color:#fff;text-decoration:none;font-weight:700">
         Zobrazit projekt
      </a>
    </div>
  `;

  marker.bindPopup(popupHtml, { maxWidth: 280 });
  markerById[ev.id] = marker;
});

/* --------------------------
   Add birthplace markers (red)
   -------------------------- */
birthplaces.forEach(b => {
  const marker = L.circleMarker(b.coords, {
    color: '#d9534f',
    fillColor: '#d9534f',
    fillOpacity: 0.95,
    radius: 7,
    weight: 1
  }).addTo(birthsLayer);

  const popupHtml = `
    <div style="max-width:260px">
      <strong style="display:block;margin-bottom:6px">${b.name}</strong>
      <div style="color:#eee;font-size:0.95rem;margin-bottom:8px">Místo narození (přibližně)</div>
      <a class="popup-btn" href="${b.link}" target="_blank" style="
         display:inline-block;padding:8px 10px;border-radius:8px;background:#3498db;color:#fff;text-decoration:none;font-weight:700">
         Zobrazit projekt
      </a>
    </div>
  `;
  marker.bindPopup(popupHtml, { maxWidth: 280 });
});

/* --------------------------
   Build dynamic timeline
   -------------------------- */
const timelineEl = document.getElementById('timeline');

// Sort events by year
const eventsSorted = events.slice().sort((a,b) => a.year - b.year);

timelineEl.innerHTML = '<h3 style="margin-bottom:10px;color:#ffd9b3">Časová osa 1939–1945</h3>';
eventsSorted.forEach(ev => {
  const row = document.createElement('div');
  row.className = 'timeline-row';

  const year = document.createElement('div');
  year.className = 'timeline-year';
  year.textContent = ev.year;

  const desc = document.createElement('div');
  desc.className = 'timeline-desc';
  desc.innerHTML = `<p style="margin:0 0 6px 0"><strong>${ev.title}</strong></p><div style="font-size:0.95rem;color:#ddd">${ev.desc}</div>`;

  const action = document.createElement('div');
  action.className = 'timeline-action';
  const btn = document.createElement('button');
  btn.className = 'timeline-btn';
  btn.textContent = 'Zobrazit na mapě';
  btn.onclick = () => {
    map.setView(ev.coords, 5, { animate: true });
    // find the marker and open popup
    const marker = Object.values(markerById).find(m => {
      const latlng = m.getLatLng();
      return Math.abs(latlng.lat - ev.coords[0]) < 0.01 && Math.abs(latlng.lng - ev.coords[1]) < 0.01;
    });
    if (marker) marker.openPopup();
  };

  action.appendChild(btn);
  row.appendChild(year);
  row.appendChild(desc);
  row.appendChild(action);

  timelineEl.appendChild(row);
});

/* --------------------------
   Optional: layer control
   -------------------------- */
L.control.layers({}, { 'Události (modré)': eventsLayer, 'Narození (červené)': birthsLayer }, { collapsed: true }).addTo(map);

/* --------------------------
   Helpful: open first popup and fit bounds
   -------------------------- */
// Fit to events bounds for nicer view but avoid too tight
const allCoords = events.map(e => e.coords).concat(birthplaces.map(b => b.coords));
if (allCoords.length) {
  const latlngs = allCoords.map(c => L.latLng(c[0], c[1]));
  const bounds = L.latLngBounds(latlngs);
  map.fitBounds(bounds.pad(0.5));
}
