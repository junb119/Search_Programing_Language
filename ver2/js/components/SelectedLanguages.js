export default function SelectedLanguages(target) {
  // SelectedLanguages 컴포넌트 생성자 함수
  this.element = document.createElement("div");
  this.element.className = "SelectedLanguage";
  target.appendChild(this.element);

  this.state = {
    items: [],
  };

  this.setState = (nextState) => {
    // 상태 업데이트하고 렌더링하는 함수
    this.state = {
      ...this.state,
      ...nextState,
    };

    // 선택된 언어 목록이 5개가 넘으면 최근 5개만 남기기
    if (this.state.items.length > 5) {
      this.state.items = this.state.items.slice(
        this.state.items.length - 5,
        this.state.items.length
      );
    }
    this.render();
  };

  this.render = () => {
    // 상태에 따라 선택된 언어 목록을 렌더링하는 함수
    if (this.state.items.length > 0) {
      this.element.style.display = "block";
      this.element.innerHTML = `
        <ul>
          ${this.state.items.map(
            (el) => `
              <li>${el}</li>
            `
          )}
        </ul>
      `;
    } else {
      this.element.style.display = "none";
      this.element.innerHTML = "";
    }
  };

  this.render();
}
