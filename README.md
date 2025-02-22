# Timer Countdown

Run a timer countdown with costumizable theme (color, font, etc), animated or not.

- [x] Adjust Time Freely (hours, minutes, seconds)
- [x] Toggle Always on top
- [ ] Costumizable Theme / Set Theme
- [ ] Toggle Animate

## Tauri + React + Vite + Bun

### Requirement

- [Bun](https://bun.sh/docs/installation) (or Node) 
> to easily install node and manage node version, use [nvm-windows](https://github.com/coreybutler/nvm-windows), [nvs](https://github.com/jasongin/nvs), or [fnm](https://github.com/Schniz/fnm)
- [Tauri Pre-Requisites](https://tauri.app/start/prerequisites/)

### Usage

- After clone the repository, install dependencies :

  ```bash
  bun install
  ```

- Run tauri in local (frontend will auto run first with `vite` command):

  ```bash
  bun tauri dev
  ```

---
To Build for production:

  ```bash
  bun tauri build
  ```
> To set up your release platform, see [Tauri Distribute](https://tauri.app/distribute/)
---
Note: 

- If you only want the frontend:

  ```bash
  bun run dev
  ```
  then access http://localhost:5173 in your browser


## React + Vite

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
- [ES7+ React...](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Tailwind CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)