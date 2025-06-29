let energy = 0;
let energyPerClick = 1;
let bought = [];

const upgrades = [
  { name: 'ChatGPT-2', cost: 10, value: 0.1 },
  { name: 'ChatGPT-3', cost: 100, value: 1 },
  { name: 'ChatGPT-3.5', cost: 1000, value: 8 },
  { name: 'ChatGPT-4', cost: 10000, value: 47 },
  { name: 'IA Conciente', cost: 50000, value: 150 }
];

const achievements = [
  { name: 'Início Digital', condition: () => energy >= 1 },
  { name: 'Aprendizado de Máquina', condition: () => energy >= 100 },
  { name: 'Geração de Arte', condition: () => energy >= 500 },
  { name: 'Controle Algorítmico', condition: () => energy >= 2500 },
  { name: 'Humanos Obsoletos', condition: () => energy >= 10000 },
  { name: 'Colapso Global', condition: () => energy >= 50000 }
];

const clickBtn = document.getElementById('click-btn');
const energyDisplay = document.getElementById('energy-count');
const store = document.getElementById('store');
const achievementsList = document.getElementById('achievements');
const personImg = document.getElementById('person-img');

clickBtn.addEventListener('click', () => {
  energy += energyPerClick;
  updateUI();
});

function updateUI() {
  energyDisplay.textContent = Math.floor(energy);
  updateAchievements();
  updateMood();
}

function updateStore() {
  store.innerHTML = '';
  upgrades.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'store-item';

    const name = document.createElement('div');
    name.textContent = `${item.name}: +${item.value}/click`;

    const cost = document.createElement('div');
    cost.textContent = `Custo: ${item.cost} energia`;

    const btn = document.createElement('button');
    btn.textContent = 'Comprar';
    btn.onclick = () => {
      if (energy >= item.cost) {
        energy -= item.cost;
        energyPerClick += item.value;
        item.cost = Math.floor(item.cost * 1.75);
        updateUI();
        updateStore();
      }
    };

    div.appendChild(name);
    div.appendChild(cost);
    div.appendChild(btn);
    store.appendChild(div);
  });
}

function updateAchievements() {
  achievements.forEach((a, i) => {
    if (!bought[i] && a.condition()) {
      bought[i] = true;
      const li = document.createElement('li');
      li.className = 'achievement';
      li.textContent = a.name;
      achievementsList.appendChild(li);
    }
  });
}

function updateMood() {
  if (energy >= 50000) {
    personImg.src = 'triste4.png';
  } else if (energy >= 10000) {
    personImg.src = 'triste3.png';
  } else if (energy >= 2500) {
    personImg.src = 'triste2.png';
  } else if (energy >= 500) {
    personImg.src = 'triste1.png';
  } else {
    personImg.src = 'feliz.png';
  }
}

updateStore();
setInterval(() => {
  energy += energyPerClick / 10;
  updateUI();
}, 100);

updateUI();
