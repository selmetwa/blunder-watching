# Blunder Watching
## Blunder Watching: Chrome Extension for Chess.com

**Overview:**
Blunder Watching is a Chrome extension designed to aid chess players in evaluating their positions on the board. This extension automatically calculates attackers and defenders for each piece, identifies hanging pieces, and assesses whether you can gain material in exchanges.

[Download Here](https://chromewebstore.google.com/detail/blunder-watching/ohlopomldieclgohoboicmpmcfgehnnf)

**Note**
This extension is not mean to cheat on chess.com and will only work when playing against the computer or completing puzzles.

**Features:**
1. Attackers and Defenders Calculation:
   - The extension visually displays the number of attackers and defenders for each piece on the board.
   - Positive numbers indicate defenders, while negative numbers indicate attackers.
2. Hanging Pieces Identification:
  - Pieces that are undefended (hanging) are indicated by a target icon, allowing you to quickly spot vulnerabilities in your position.
3. Material Gain Analysis:
  - Blunder Watching evaluates potential exchanges and determines if you can win material.
4. Interface:
  - The extension overlays information directly onto the board for easy reference.
  - Colors and symbols are used to represent different states and values for quick visual recognition.
5. Real-Time Updates:
  - The extension updates in real-time as you make moves, ensuring that you always have the latest information at your fingertips.

## Screenshots
Each square displays a numerical value representing the balance of attackers and defenders.
Negative values indicate that the piece on that square is being attacked by more enemy pieces than it is defended by friendly pieces.
Positive values indicate that the piece is well-defended.
Squares with the target icon indicate hanging pieces.

<img width="600" alt="Screenshot 2024-05-26 at 9 33 42 PM" src="https://github.com/selmetwa/blunder-watching/assets/46908343/4f26a25b-edbb-4fb8-94bc-4c8396da6b9e">
<img width="600" alt="Screenshot 2024-05-26 at 9 37 13 PM" src="https://github.com/selmetwa/blunder-watching/assets/46908343/0bdfa489-2d56-4010-abbf-3ea711d6d1ff">

![blunder-watching-vid_HgKhCHbB](https://github.com/selmetwa/blunder-watching/assets/46908343/57139a6e-b076-467b-a207-d5accc782696)


## Scripts Available

In the project directory, you can run:

### npm dev

```
// Runs the app in the development mode.
// Will open a new browser instance with your extension loaded.
// The page will reload when you make changes.
npm dev
```

### npm start

```
// Runs the app in the production mode.
// Will open a new browser instance with your extension loaded.
// This is how your browser extension will work once publihed.
npm start
```

### npm build

```
// Builds the app for production.
// Bundles your browser extension in production mode for the target browser.
npm run build
```

## Learn More

You can learn more in the [Extension](https://extension.js.org) documentation.
