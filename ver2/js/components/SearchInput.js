export default function SearchInput(target, onChange) {
  // 검색 입력 요소 생성
  this.element = document.createElement("form");
  this.element.className = "SearchInput";
  this.state = "";

  // 검색 입력 요소 렌더링
  this.render = () => {
    this.element.innerHTML = `<input class='SearchInput__input' type='text' placeholder='프로그래밍 언어를 입력하세요.'  value=${this.state}>`;
  };

  this.render();
  target.appendChild(this.element);

  // 폼 제출 이벤트 방지
  document.querySelector(".SearchInput").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // 검색 입력 값이 변경될 때 onChange 콜백 호출
  document
    .querySelector(".SearchInput__input")
    .addEventListener("keyup", (e) => {
      if (
        e.code !== "ArrowUp" &&
        e.code !== "AroowDown" &&
        e.code !== "Enter"
      ) {
        onChange(e.target.value);
      }
    });

  // 검색 입력 요소에 포커스 설정
  document.querySelector(".SearchInput__input").focus();
}
