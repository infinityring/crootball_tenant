import Main from "./main";

export default class Application extends Main {
  constructor() {
    super();
 
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.App = new Application();
  window.dispatchEvent(new CustomEvent("app:mounted"));
});
