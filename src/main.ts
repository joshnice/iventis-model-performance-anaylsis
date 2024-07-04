import "./style.css";
import viteLogo from "/vite.svg";
import typescriptLogo from "./typescript.svg";

const app = document.querySelector<HTMLDivElement>("#app");

if (app == null) {
  throw new Error("#app not found");
}

app.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;
