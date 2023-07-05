export default function SearchInput(target, changeInputValue) {
  this.element = document.createElement("form");
  this.element.className = "SearchInput";
  this.state = "";
  target.appendChild(this.element);

  this.render = () => {
    this.element.innerHTML = `
    <input
        class="SearchInput__input"
        type="text"
        placeholder="프로그램 언어를 입력하세요."
        value="${this.state}"
    />
  `;
    // console.log("input state :", this.state);
  };
  this.render();

  document.querySelector(".SearchInput").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  document
    .querySelector(".SearchInput__input")
    .addEventListener("keyup", (e) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"].indexOf(
          e.code
        ) === -1
      )
        changeInputValue(e.target.value);
    });

  window.onload = () => {
    document.querySelector(".SearchInput__input").focus();
  };
}
