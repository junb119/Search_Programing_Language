export default function SearchInput(target, onChange) {
  // 검색 입력 요소를 생성합니다.
  this.element = document.createElement("form");
  this.element.className = "SearchInput";
  this.state = "";

  // 검색 입력 요소를 렌더링합니다.
  this.render = () => {
    this.element.innerHTML = `<input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value=${this.state}>`;
  };

  this.render();
  target.appendChild(this.element);

  // 폼 제출 이벤트를 방지합니다.
  document.querySelector(".SearchInput").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // 검색 입력 값이 변경될 때 onChange 콜백을 호출합니다.
  document
    .querySelector(".SearchInput__input")
    .addEventListener("keyup", (e) => {
      if (
        e.code !== "ArrowUp" &&
        e.code !== "ArrowDown" &&
        e.code !== "Enter"
      ) {
        onChange(e.target.value);
      }
    });

  // 검색 입력 요소에 포커스를 설정합니다.
  document.querySelector(".SearchInput__input").focus();
}
