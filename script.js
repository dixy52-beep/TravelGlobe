// 1. Inizializzazione del Globo
const world = Globe()
    (document.getElementById('globeViz'))
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg') // Texture notturna
    .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png') // Cielo stellato
    .pointAltitude(0.1) // Altezza dei punti
    .pointRadius(0.5)   // Grandezza dei punti
    .pointColor('color'); // Colore preso dal JSON

// 2. Carichiamo i dati
fetch('history_data.json')
    .then(res => res.json())
    .then(places => {
        world.pointsData(places);
        
        // Gestione click sul punto
        world.onPointClick(point => {
            // Effetto "Teletrasporto": Zoom sul punto
            world.pointOfView({ lat: point.lat, lng: point.lng, altitude: 0.8 }, 2000); // 2000ms di animazione

            // Aggiorna e mostra il pannello
            showInfo(point);
        });
    });

// 3. Funzioni per l'interfaccia
function showInfo(data) {
    const panel = document.getElementById('info-panel');
    
    // Popola i dati
    document.getElementById('location-title').innerText = data.title;
    document.getElementById('year-badge').innerText = `ANNO: ${data.year}`;
    document.getElementById('figure-badge').innerText = data.figure;
    document.getElementById('description').innerText = data.desc;

    // Mostra il pannello
    panel.classList.remove('hidden');
}

function closePanel() {
    document.getElementById('info-panel').classList.add('hidden');
    // Zoom out leggero quando chiudi
    world.pointOfView({ altitude: 2.5 }, 2000);
}

// Rendiamo il globo responsivo se ridimensioni la finestra
window.addEventListener('resize', () => {
    world.width(window.innerWidth).height(window.innerHeight);
});
