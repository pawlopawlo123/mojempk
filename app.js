// Dane aplikacji — tu dodajesz swoje linie, przystanki i rozkłady
const data = {
  "L47": {
    stops: {
       
  },
  "ZS2": {
    stops: {
      "Sulejówek Miłosna-Pomnik 01": ["06:00", "06:15", "06:30", "06:45", "07:00", "07:15", "07:30", "07:45"],
      "PKP Sulejówek Miłosna 01": ["06:05", "06:20", "06:35", "06:50", "07:05", "07:20", "07:35", "07:50"],
      "Krótka 01": ["06:10", "06:25", "06:40", "06:55", "07:10", "07:25", "07:40", "07:55"],
      "Rondo Moraczewskiej 51": ["06:15", "06:30", "06:45", "07:00", "07:15", "07:30", "07:45", "08:00"],
      "Ogińskiego 54": ["06:20", "06:35", "06:50", "07:05", "07:20", "07:35", "07:50", "08:05"],
      "PKP Sulejówek 52": ["06:25", "06:40", "06:55", "07:10", "07:25", "07:40", "07:55", "08:10"],
      "Ogińskiego 51": ["06:30", "06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15"],
      "PKP Wesoła 03": ["06:35", "06:50", "07:05", "07:20", "07:35", "07:50", "08:05", "08:20"],
      "Buławy 01": ["06:40", "06:55", "07:10", "07:25", "07:40", "07:55", "08:10", "08:25"],
      "Przebieg 01": ["06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30"],
      "PKP Rembertów 06": ["06:50", "07:05", "07:20", "07:35", "07:50", "08:05", "08:20", "08:35"],
      "Rembertów-Ratusz 02": ["06:55", "07:10", "07:25", "07:40", "07:55", "08:10", "08:25", "08:40"],
      "Eskulapów 02": ["07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45"],
      "Rembertów-Akademia 04": ["07:05", "07:20", "07:35", "07:50", "08:05", "08:20", "08:35", "08:50"]
    }
  }
};

     

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
