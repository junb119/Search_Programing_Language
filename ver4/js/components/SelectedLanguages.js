export default function SelectedLanguages(target, onLimitCount) {
  const $countLimit = 5;

  this.element = document.createElement("div");
  this.element.className = "SelectedLanguage";
  target.appendChild(this.element);
  this.state = {
    selectedLanguages: [],
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.render = () => {
    if (this.state.selectedLanguages.length > 0) {
      if (this.state.selectedLanguages.length > $countLimit)
        onLimitCount($countLimit);

      this.element.innerHTML = `
        <ul>
          ${this.state.selectedLanguages.map((item) => `<li>${item}</li>`)}
        </ul>
      `;
    } else {
      this.element.innerHTML = ``;
    }
  };

  this.render();
}
