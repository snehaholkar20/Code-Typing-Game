// ── Snippets Data ──────────────────────────────────────────────────
const snippets = {
  java: [
    { code: `for (int i = 0; i < 10; i++) {\n    System.out.println(i);\n}`, tip: "For loop in Java" },
    { code: `public static int add(int a, int b) {\n    return a + b;\n}`, tip: "Method definition" },
    { code: `String[] fruits = {"apple", "banana", "mango"};\nfor (String f : fruits) {\n    System.out.println(f);\n}`, tip: "Enhanced for loop" },
    { code: `if (age >= 18) {\n    System.out.println("Adult");\n} else {\n    System.out.println("Minor");\n}`, tip: "If-else statement" },
    { code: `ArrayList<String> list = new ArrayList<>();\nlist.add("Hello");\nlist.add("World");`, tip: "ArrayList usage" },
  ],
  python: [
    { code: `def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))`, tip: "Python function" },
    { code: `nums = [1, 2, 3, 4, 5]\nsquares = [x**2 for x in nums]\nprint(squares)`, tip: "List comprehension" },
    { code: `for i in range(10):\n    if i % 2 == 0:\n        print(i)`, tip: "Loop with condition" },
    { code: `my_dict = {"name": "Alice", "age": 20}\nfor key, val in my_dict.items():\n    print(key, val)`, tip: "Dictionary iteration" },
    { code: `class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        return "..."`, tip: "Python class" },
  ],
  javascript: [
    { code: `const greet = (name) => {\n    return \`Hello, \${name}!\`;\n};\nconsole.log(greet("World"));`, tip: "Arrow function" },
    { code: `const nums = [1, 2, 3, 4, 5];\nconst evens = nums.filter(n => n % 2 === 0);\nconsole.log(evens);`, tip: "Array filter" },
    { code: `fetch("https://api.example.com/data")\n    .then(res => res.json())\n    .then(data => console.log(data));`, tip: "Fetch API" },
    { code: `const obj = { name: "Alice", age: 20 };\nconst { name, age } = obj;\nconsole.log(name, age);`, tip: "Destructuring" },
    { code: `for (let i = 0; i < 5; i++) {\n    setTimeout(() => console.log(i), i * 1000);\n}`, tip: "setTimeout loop" },
  ],
  sql: [
    { code: `SELECT name, age\nFROM students\nWHERE age > 18\nORDER BY name ASC;`, tip: "Basic SELECT query" },
    { code: `INSERT INTO students (name, age, grade)\nVALUES ('Alice', 20, 'A');`, tip: "INSERT statement" },
    { code: `SELECT s.name, c.title\nFROM students s\nINNER JOIN courses c\nON s.id = c.student_id;`, tip: "INNER JOIN" },
    { code: `UPDATE students\nSET grade = 'A'\nWHERE score >= 90;`, tip: "UPDATE statement" },
    { code: `SELECT department, COUNT(*) as total\nFROM employees\nGROUP BY department\nHAVING total > 5;`, tip: "GROUP BY query" },
  ],
  cpp: [
    { code: `#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello World";\n    return 0;\n}`, tip: "Hello World in C++" },
    { code: `int arr[] = {5, 3, 1, 4, 2};\nfor (int i = 0; i < 5; i++)\n    for (int j = i+1; j < 5; j++)\n        if (arr[i] > arr[j])\n            swap(arr[i], arr[j]);`, tip: "Bubble Sort" },
    { code: `class Shape {\npublic:\n    virtual double area() = 0;\n    virtual ~Shape() {}\n};`, tip: "Abstract class" },
    { code: `vector<int> v = {1, 2, 3, 4, 5};\nfor (auto& x : v) {\n    cout << x << " ";\n}`, tip: "Vector with range-for" },
    { code: `int factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}`, tip: "Recursion" },
  ]
};

// ── State ──────────────────────────────────────────────────────────
let currentCat = 'java';
let currentSnippetIdx = 0;
let currentText = '';
let typedIndex = 0;
let errors = 0;
let totalTyped = 0;
let timer = 60;
let timerInterval = null;
let gameActive = false;
let wpm = 0;
let streak = 0;
let score = 0;
let leaderboard = JSON.parse(localStorage.getItem('codetype_lb') || '[]');
let typedChars = [];

// ── DOM ────────────────────────────────────────────────────────────
const codeDisplay    = document.getElementById('code-display');
const typingInput    = document.getElementById('typing-input');
const wpmVal         = document.getElementById('wpm-val');
const accVal         = document.getElementById('acc-val');
const timerVal       = document.getElementById('timer-val');
const scoreVal       = document.getElementById('score-val');
const progressBar    = document.getElementById('progress-bar');
const snippetInfo    = document.getElementById('snippet-info');
const langLabel      = document.getElementById('lang-label');
const streakDisplay  = document.getElementById('streak-display');
const toast          = document.getElementById('toast');

// ── Load Snippet ───────────────────────────────────────────────────
function loadSnippet() {
  const snips = snippets[currentCat];
  const snip = snips[currentSnippetIdx % snips.length];
  currentText = snip.code;
  typedIndex = 0;
  errors = 0;
  totalTyped = 0;
  typingInput.value = '';
  progressBar.style.width = '0%';
  snippetInfo.innerHTML = `Category: <strong>${currentCat.toUpperCase()}</strong> — ${snip.tip}`;
  langLabel.textContent = `// ${currentCat}`;
  renderCode();
}

function renderCode() {
  codeDisplay.innerHTML = '';
  for (let i = 0; i < currentText.length; i++) {
    const span = document.createElement('span');
    span.classList.add('char');
    if (i < typedIndex) {
      span.classList.add(currentText[i] === typedChars[i] ? 'correct' : 'wrong');
    } else if (i === typedIndex) {
      span.classList.add('pending', 'cursor');
    } else {
      span.classList.add('pending');
    }
    span.textContent = currentText[i] === '\n' ? '\n' : currentText[i];
    codeDisplay.appendChild(span);
  }
}

// ── Start Timer ────────────────────────────────────────────────────
function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    timer--;
    timerVal.textContent = timer;
    if (timer <= 10) timerVal.classList.add('danger');
    else timerVal.classList.remove('danger');
    updateWPM();
    if (timer <= 0) endGame();
  }, 1000);
}

function updateWPM() {
  const minutesElapsed = (60 - timer) / 60;
  if (minutesElapsed > 0) {
    wpm = Math.round((typedIndex / 5) / minutesElapsed);
    wpmVal.textContent = wpm;
  }
}

// ── Typing Input ───────────────────────────────────────────────────
typingInput.addEventListener('input', (e) => {
  const val = typingInput.value;

  if (!gameActive && val.length > 0) {
    gameActive = true;
    startTimer();
  }

  typedChars = val.split('');
  typedIndex = val.length;
  totalTyped = Math.max(totalTyped, typedIndex);

  // Count errors
  errors = 0;
  for (let i = 0; i < typedIndex; i++) {
    if (typedChars[i] !== currentText[i]) errors++;
  }

  // Accuracy
  const acc = totalTyped > 0 ? Math.round(((totalTyped - errors) / totalTyped) * 100) : 100;
  accVal.textContent = acc + '%';

  // Progress
  progressBar.style.width = ((typedIndex / currentText.length) * 100) + '%';

  // Score
  score = Math.max(0, wpm * acc - errors * 5);
  scoreVal.textContent = score;

  renderCode();

  // Completed!
  if (typedIndex >= currentText.length) {
    const correct = typedChars.slice(0, currentText.length).filter((c, i) => c === currentText[i]).length;
    if (correct === currentText.length) {
      streak++;
      streakDisplay.textContent = `🔥 ${streak}`;
      showToast(`✅ Perfect! Streak: ${streak}`);
      setTimeout(() => {
        currentSnippetIdx++;
        loadSnippet();
        typedChars = [];
      }, 600);
    }
  }
});

// ── End Game ───────────────────────────────────────────────────────
function endGame() {
  clearInterval(timerInterval);
  timerInterval = null;
  gameActive = false;
  typingInput.disabled = true;

  const acc = totalTyped > 0 ? Math.round(((totalTyped - errors) / totalTyped) * 100) : 100;

  // Grade
  let emoji, heading, grade;
  if (wpm >= 60 && acc >= 95) {
    emoji = '🏆';
    heading = 'Outstanding!';
    grade = 'You are a code typing master!';
  } else if (wpm >= 40 && acc >= 85) {
    emoji = '🥇';
    heading = 'Excellent!';
    grade = 'Great speed and accuracy!';
  } else if (wpm >= 25 && acc >= 75) {
    emoji = '🥈';
    heading = 'Good Job!';
    grade = 'Keep practicing to go faster!';
  } else if (wpm >= 10) {
    emoji = '🥉';
    heading = 'Nice Try!';
    grade = 'Practice daily to improve!';
  } else {
    emoji = '💪';
    heading = 'Keep Going!';
    grade = 'Every expert was once a beginner!';
  }

  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-heading').textContent = heading;
  document.getElementById('result-grade').textContent = grade;
  document.getElementById('r-wpm').textContent = wpm;
  document.getElementById('r-acc').textContent = acc + '%';
  document.getElementById('r-score').textContent = score;
  document.getElementById('r-streak').textContent = streak;

  // Save to leaderboard
  const entry = {
    wpm,
    acc,
    score,
    streak,
    cat: currentCat,
    date: new Date().toLocaleDateString()
  };
  leaderboard.push(entry);
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 10);
  localStorage.setItem('codetype_lb', JSON.stringify(leaderboard));

  document.getElementById('game-screen').style.display = 'none';
  document.getElementById('result-screen').style.display = 'block';
}

// ── Leaderboard Render ─────────────────────────────────────────────
function renderLeaderboard(containerId) {
  const el = document.getElementById(containerId);
  if (!leaderboard.length) {
    el.innerHTML = '<div style="color:var(--muted);font-size:0.85rem;padding:12px">No scores yet. Play to set a record!</div>';
    return;
  }
  const medals = ['🥇', '🥈', '🥉'];
  el.innerHTML = leaderboard.map((e, i) => `
    <div class="lb-row ${i===0?'top1':''}">
      <span class="rank">${medals[i] || '#'+(i+1)}</span>
      <span class="lb-name">${e.cat.toUpperCase()} <span style="color:var(--muted);font-size:0.75rem">${e.date}</span></span>
      <span class="lb-wpm">${e.wpm} WPM</span>
      <span class="lb-acc">${e.acc}%</span>
    </div>
  `).join('');
}

// ── Restart ────────────────────────────────────────────────────────
function restartGame() {
  clearInterval(timerInterval);
  timerInterval = null;
  gameActive = false;
  timer = 60;
  wpm = 0;
  score = 0;
  streak = 0;
  timerVal.textContent = 60;
  timerVal.classList.remove('danger');
  wpmVal.textContent = 0;
  accVal.textContent = '100%';
  scoreVal.textContent = 0;
  streakDisplay.textContent = '🔥 0';
  typingInput.disabled = false;
  typedChars = [];
  document.getElementById('game-screen').style.display = 'block';
  document.getElementById('result-screen').style.display = 'none';
  document.getElementById('lb-screen').style.display = 'none';
  loadSnippet();
  typingInput.focus();
}

// ── Toast ──────────────────────────────────────────────────────────
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// ── Event Listeners ────────────────────────────────────────────────
document.getElementById('btn-restart').addEventListener('click', restartGame);

document.getElementById('btn-next').addEventListener('click', () => {
  currentSnippetIdx++;
  typedChars = [];
  loadSnippet();
  typingInput.focus();
});

document.getElementById('btn-leaderboard').addEventListener('click', () => {
  document.getElementById('game-screen').style.display = 'none';
  document.getElementById('lb-screen').style.display = 'block';
  renderLeaderboard('lb-main-list');
});

document.getElementById('btn-back').addEventListener('click', () => {
  document.getElementById('lb-screen').style.display = 'none';
  document.getElementById('game-screen').style.display = 'block';
});

document.getElementById('btn-play-again').addEventListener('click', restartGame);

document.getElementById('btn-view-lb').addEventListener('click', () => {
  const lbSection = document.getElementById('lb-section');
  lbSection.style.display = 'block';
  renderLeaderboard('lb-list');
});

// Category tabs
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentCat = tab.dataset.cat;
    currentSnippetIdx = 0;
    typedChars = [];
    loadSnippet();
    typingInput.focus();
  });
});

// ── Init ────────────────────────────────────────────────────────────
loadSnippet();
typingInput.focus();