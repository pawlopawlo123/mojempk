// Dane aplikacji — tu dodajesz swoje linie, przystanki i rozkłady
const data = {
  "101": {
    stops: {
      "Dworzec": ["05:30", "06:00", "06:30"],
      "Rynek": ["05:40", "06:10", "06:40"],
      "Szpital": ["05:50", "06:20", "06:50"]
    }
  },
  "105": {
    stops: {
      "Stadion": ["06:10", "06:40", "07:10"],
      "Centrum": ["06:20", "06:50", "07:20"]
    }
  }
};

// Zmienna stanu
let currentLine = null;
let currentStop = null;

// Inicjalizacja
window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
  showMain();
});

function showMain() {
  const screen = document.getElementById('screen');
  screen.innerHTML = `
    <button onclick="showLines()">Wybierz linię</button>
  `;
}

function showLines() {
  const screen = document.getElementById('screen');
  screen.innerHTML = '<h2>Wybierz linię:</h2>';
  Object.keys(data).forEach(line => {
    const btn = document.createElement('button');
    btn.textContent = `Linia ${line}`;
    btn.onclick = () => showStops(line);
    screen.appendChild(btn);
  });
  screen.innerHTML += `<br><button onclick="showMain()">⬅ Powrót</button>`;
}

function showStops(line) {
  currentLine = line;
  const screen = document.getElementById('screen');
  screen.innerHTML = `<h2>Linia ${line}</h2>`;
  Object.keys(data[line].stops).forEach(stop => {
    const btn = document.createElement('button');
    btn.textContent = stop;
    btn.onclick = () => showSchedule(stop);
    screen.appendChild(btn);
  });
  screen.innerHTML += `<br><button onclick="showLines()">⬅ Powrót</button>`;
}

function showSchedule(stop) {
  currentStop = stop;
  const times = data[currentLine].stops[stop];
  const screen = document.getElementById('screen');
  screen.innerHTML = `<h2>${stop} (${currentLine})</h2>`;
  times.forEach(time => {
    const p = document.createElement('p');
    p.textContent = time;
    screen.appendChild(p);
  });
  screen.innerHTML += `<br><button onclick="showStops('${currentLine}')">⬅ Powrót</button>`;
}
