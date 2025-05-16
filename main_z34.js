const form = document.getElementById('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  calculate();
});

function calculate() {
  const a = parseFloat(document.getElementById('a').value) || 1;
  const b = parseFloat(document.getElementById('b').value);
  const c = parseFloat(document.getElementById('c').value);

  const multiFormElement = document.getElementById('multiForm');
  const generalFormElement = document.getElementById('generalForm');
  const canonicalFormElement = document.getElementById('canonicalForm');
  const roots = document.getElementById('roots');
  const functionType = document.getElementById('functionType');
  const vertexElement = document.getElementById('vertex');

  const discriminant = b ** 2 - 4 * a * c;
  let root1, root2;

  if (discriminant > 0) {
    root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    root2 = (-b - Math.sqrt(discriminant)) / (2 * a);

    roots.innerHTML = 'Korzenie: ' + root1.toFixed(2) + ', ' + root2.toFixed(2);
  } else if (discriminant == 0) {
    root1 = root2 = -b / (2 * a);

    roots.innerHTML = 'Korzeń: ' + root1.toFixed(2);
  } else {

    roots.innerHTML = 'Brak rzeczywistych korzeni';
  }

  if (discriminant >= 0) {
    multiFormElement.innerHTML = `Postać iloczyniowa: ${a}*(x - ${root1.toFixed(2)})*(x - ${root2.toFixed(2)})`;
  } else {
    multiFormElement.innerHTML = 'Postać iloczyniowa: Brak (discriminant < 0)';
  }

  const vertexX = -b / (2 * a);
  const vertexY = -discriminant / (4 * a);
  vertexElement.innerHTML = `Wierzchołek: (${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})`;

  if (a > 0) {
    functionType.innerHTML = `Funkcja malejąca w przedziale: [-∞; ${vertexX}]<br>Funkcja rosnąca w przedziale: [${vertexX}; ∞]`;
  } else {
    functionType.innerHTML = `Funkcja rosnąca w przedziale: [-∞; ${vertexX}]<br>Funkcja malejąca w przedziale: [${vertexX}; ∞]`;
  }

  generalFormElement.innerHTML = `Postać ogólna: ${a}x^2 + ${b}x + ${c}`;

  const p = -b / (2 * a);
  const q = -discriminant / (4 * a);
  canonicalFormElement.innerHTML = `Postać kanoniczna: ${a}(x - ${p.toFixed(2)})^2 + ${q.toFixed(2)}`;

  drawGraph(a, b, c);
}

function drawGraph(a, b, c) {
  const canvas = document.getElementById('graph');
  let context = canvas.getContext('2d');

  context.clearRect(0, 0, canvas.width, canvas.height);

  drawAxes(context);
  drawParabola(context, a, b, c);
}

function drawAxes(context) {
  context.beginPath();
  context.moveTo(0, 200);
  context.lineTo(400, 200);
  context.stroke();

  context.beginPath();
  context.moveTo(200, 0);
  context.lineTo(200, 400);
  context.stroke();
}

function drawParabola(context, a, b, c) {
  context.beginPath();
  for (let x = -20; x < 20; x += 0.1) {
    const y = a * x ** 2 + b * x + c;
    context.lineTo(200 + 10 * x, 200 - 10 * y);
  }
  context.stroke();
}
