# 🚀 CodeType — Learn Programming by Typing

CodeType is an interactive typing game designed to help programmers improve their coding speed and accuracy across multiple programming languages. Type code snippets fast and accurately to build your streak, increase your WPM (Words Per Minute), and compete on the leaderboard!

![CodeType Game Screenshot](https://img.shields.io/badge/Version-1.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Languages](https://img.shields.io/badge/Languages-5-purple)

---

## ✨ Features

- **5 Programming Languages**: Java, Python, JavaScript, SQL, and C++
- **Real-time Statistics**: Track WPM, Accuracy, Score, and Streak
- **60-Second Challenges**: Fast-paced gameplay with timer
- **Leaderboard System**: Save and view your top 10 scores locally
- **Streak Counter**: Build consecutive perfect snippets
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Theme**: Eye-friendly dark interface with vibrant accents
- **Local Storage**: Persistent leaderboard using browser storage

---

## 🎮 How to Play

1. **Start the Game**
   - Open `index.html` in your web browser
   - The game automatically starts when you begin typing

2. **Type the Code**
   - A code snippet displays at the top
   - Type it exactly in the input field below
   - Each character is highlighted in real-time:
     - 🟢 **Green** = Correct
     - 🔴 **Red** = Wrong
     - ⚪ **Gray** = Not yet typed

3. **Monitor Your Stats**
   - **WPM**: Words Per Minute (character speed)
   - **Accuracy**: Percentage of correct characters
   - **Timer**: 60 seconds countdown
   - **Score**: WPM × Accuracy - (Errors × 5)

4. **Complete a Snippet**
   - Type the entire snippet perfectly to:
     - Increase your streak
     - Auto-load the next snippet
     - See a success notification

5. **Game Over**
   - When the 60-second timer ends
   - View your final stats and grade
   - Check the leaderboard
   - Play again with a new streak

---

## 🎯 Game Mechanics

### Scoring System
```
Score = (WPM × Accuracy) - (Errors × 5)
```

### Performance Grades
| Grade | WPM | Accuracy | Emoji |
|-------|-----|----------|-------|
| Outstanding | ≥60 | ≥95% | 🏆 |
| Excellent | ≥40 | ≥85% | 🥇 |
| Good Job | ≥25 | ≥75% | 🥈 |
| Nice Try | ≥10 | Any | 🥉 |
| Keep Going | <10 | Any | 💪 |

### Streak System
- Build a streak by typing snippets perfectly
- Each perfect completion increases your streak counter
- Streak resets when you finish a game
- Track your best streak in the leaderboard

---

## 📁 File Structure

```
codetype/
├── index.html          # HTML structure
├── style.css           # Styling and layout
├── script.js           # Game logic and functionality
└── README.md           # Documentation
```

### File Descriptions

**index.html**
- Complete HTML markup for all game screens
- Semantic structure with proper IDs and classes
- Links to CSS and JavaScript files
- Font imports from Google Fonts

**style.css**
- CSS custom properties (variables) for theming
- Flexbox and Grid layouts
- Dark theme with cyan, red, and yellow accents
- Responsive design rules
- Animation effects (cursor blink, button hover)
- 500+ lines of clean, organized CSS

**script.js**
- Game state management
- 50 code snippets across 5 languages
- Real-time WPM and accuracy calculation
- Timer and game flow logic
- Leaderboard management with localStorage
- Event listeners for all interactions
- 600+ lines of well-commented JavaScript

---

## 🔧 Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No backend or dependencies required
- All data stored locally in browser

### Steps to Run

1. **Download the Files**
   ```bash
   git clone https://github.com/yourusername/codetype.git
   cd codetype
   ```

2. **Open in Browser**
   - Double-click `index.html`, OR
   - Right-click → Open with Browser, OR
   - Drag `index.html` into your browser window

3. **Start Playing**
   - Click a language tab to select
   - Type the code snippet
   - Watch your stats update in real-time

---

## 🎨 Customization

### Change Colors
Edit the CSS variables in `style.css`:
```css
:root {
  --bg: #0a0e17;           /* Background */
  --accent: #00f5c4;       /* Cyan accent */
  --accent2: #ff6b6b;      /* Red accent */
  --accent3: #ffd93d;      /* Yellow accent */
  --text: #e2e8f0;         /* Text color */
}
```

### Add More Snippets
Edit the `snippets` object in `script.js`:
```javascript
const snippets = {
  java: [
    { code: `your code here`, tip: "Description" },
    // Add more...
  ],
  // Add new languages
};
```

### Adjust Timer Duration
Change the timer value in `script.js`:
```javascript
let timer = 60; // Change to any number (seconds)
```

### Modify Leaderboard Size
Edit the leaderboard limit:
```javascript
leaderboard = leaderboard.slice(0, 10); // Change 10 to desired count
```

---

## 🌐 Available Languages & Snippets

### Java (5 Snippets)
- For loop
- Method definition
- Enhanced for loop
- If-else statement
- ArrayList usage

### Python (5 Snippets)
- Function definition
- List comprehension
- Loop with condition
- Dictionary iteration
- Class definition

### JavaScript (5 Snippets)
- Arrow function
- Array filter
- Fetch API
- Destructuring
- setTimeout loop

### SQL (5 Snippets)
- SELECT query
- INSERT statement
- INNER JOIN
- UPDATE statement
- GROUP BY query

### C++ (5 Snippets)
- Hello World program
- Bubble Sort
- Abstract class
- Vector with range-for loop
- Recursion

---

## 💾 Local Storage

CodeType saves your leaderboard locally using browser localStorage:

**Storage Key**: `codetype_lb`

**Data Structure**:
```javascript
[
  {
    wpm: 45,
    acc: 92,
    score: 3520,
    streak: 3,
    cat: "java",
    date: "6/26/2026"
  },
  // ... more entries
]
```

### Clear Your Data
Open browser developer tools and run:
```javascript
localStorage.removeItem('codetype_lb');
```

---

## 🎮 Game Screens

### 1. Main Game Screen
- Category tabs to select language
- Real-time stats display
- Code snippet with syntax highlighting
- Text input field
- Control buttons (Restart, Next, Leaderboard)

### 2. Result Screen
- Performance emoji and grade
- Detailed stats (WPM, Accuracy, Score, Streak)
- Leaderboard preview option
- Play Again button

### 3. Leaderboard Screen
- Top 10 scores sorted by score
- Ranking badges (🥇 🥈 🥉)
- Language and date for each entry
- WPM and accuracy for each score

### 4. Toast Notifications
- Success message with current streak
- Appears for 2 seconds when snippet completed

---

## ⌨️ Keyboard Controls

| Key | Action |
|-----|--------|
| Type | Input code |
| Tab | Switch between tabs (depends on browser) |
| Enter | No function (can be added) |
| Ctrl+A | Select all text in input |

---

## 🐛 Troubleshooting

### Game Not Loading
- Check browser console for errors (F12 → Console)
- Ensure all three files (HTML, CSS, JS) are in the same folder
- Clear browser cache and reload

### Stats Not Updating
- Make sure you're typing in the input field (it should be focused)
- Check that JavaScript is enabled in your browser
- Refresh the page if stats seem stuck

### Leaderboard Not Saving
- Check if localStorage is enabled in your browser
- Private/Incognito mode may not persist data
- Try clearing browser cache and restart

### Input Field Not Responding
- Click inside the text input to focus it
- Check if NumLock or other toggles are interfering
- Try a different browser

---

## 📊 Performance Tips

- **Build Muscle Memory**: Practice the same language daily
- **Focus on Accuracy**: Higher accuracy = higher score
- **Study Syntax**: Familiarize yourself with code structure before playing
- **Track Progress**: Check your leaderboard to monitor improvements
- **Take Breaks**: Play multiple rounds for better results

---

## 🔐 Privacy & Data

- **No External Servers**: All data stays on your device
- **No Tracking**: No analytics or user tracking
- **Local Storage Only**: Uses browser localStorage
- **No Account Required**: Play anonymously

---

## 🚀 Future Enhancements

- [ ] Multiplayer mode
- [ ] Custom snippet upload
- [ ] Sound effects and music
- [ ] Difficulty levels (Easy, Medium, Hard)
- [ ] More programming languages
- [ ] Time challenges (2min, 5min, 10min)
- [ ] Cloud leaderboard
- [ ] Achievement badges
- [ ] Daily challenges
- [ ] Dark/Light theme toggle

---

## 🤝 Contributing

Found a bug or have a suggestion? Here's how to contribute:

1. **Report Issues**: Create a detailed bug report
2. **Suggest Features**: Share your ideas in discussions
3. **Submit Code**: Fork and create a pull request
4. **Improve Snippets**: Add or improve code examples

---

## 📄 License

This project is licensed under the **MIT License** - feel free to use, modify, and distribute.

```
MIT License

Copyright (c) 2026 CodeType

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---



## 🙏 Acknowledgments

- **Font**: Google Fonts (Space Mono, Syne)
- **Inspiration**: TypeRacer, Nitro Type
- **Community**: All contributors and testers

---

## 📈 Stats & Metrics

- **Total Snippets**: 25 (5 per language)
- **Supported Languages**: 5
- **Game Duration**: 60 seconds
- **Max Leaderboard Size**: 10 entries
- **Code Size**: ~1500 lines (HTML + CSS + JS)
- **Load Time**: <1 second
- **Browser Support**: All modern browsers

---

## 🎓 Educational Value

CodeType helps developers:
- ✅ Improve typing speed and accuracy
- ✅ Reinforce syntax knowledge
- ✅ Practice across multiple languages
- ✅ Build muscle memory for common patterns
- ✅ Gain confidence in code writing
- ✅ Monitor progress over time

---

## 🏆 Leaderboard Hall of Fame

Top performers will have their names featured here! Play and compete to make it to the hall of fame.

---

## 📝 Changelog

### Version 1.0 (Current)
- Initial release
- 5 programming languages
- Real-time stats tracking
- Local leaderboard
- Streak counter
- Dark theme UI

### Future Versions
- Version 1.1: More languages and snippets
- Version 2.0: Multiplayer and cloud features

---

## 🎮 Get Started Now!

1. Download all files
2. Open `index.html` in your browser
3. Select a language
4. Start typing
5. Build your streak!

**Happy Coding! 🚀**

---

*Last Updated: June 2026*
*Created with ❤️ for developers*
