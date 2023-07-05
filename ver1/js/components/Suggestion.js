export default function Suggestion(target, onSelect) {
  // Suggestion 컴포넌트 생성자 함수
  this.element = document.createElement("div");
  this.element.className = "Suggestion";
  target.appendChild(this.element);

  this.state = {
    selectedIndex: 0,
    items: [],
  };

  this.setState = (nextState) => {
    // 상태를 업데이트하고 렌더링하는 함수
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.render = () => {
    // 상태에 따라 제안된 언어 목록을 렌더링하는 함수
    const { selectedIndex, items } = this.state;
    if (items.length > 0) {
      this.element.style.display = "block";
      this.element.innerHTML = `
              <ul>
                  ${items
                    .map(
                      (el, index) =>
                        `<li class="${
                          index === selectedIndex
                            ? "Suggestion__item--selected"
                            : ""
                        }" data-index=${index}>${el}</li>`
                    )
                    .join("")}
              </ul>
          `;
    } else {
      this.element.style.display = "none";
      this.element.innerHTML = "";
    }
  };

  window.addEventListener("keyup", (e) => {
    // 키보드 이벤트를 처리하여 제안된 언어 목록을 제어하는 함수
    if (this.state.items.length > 0) {
      const lastIndex = this.state.items.length - 1;
      if (e.code === "ArrowUp") {
        this.setState({
          selectedIndex:
            this.state.selectedIndex > 0
              ? this.state.selectedIndex - 1
              : lastIndex,
        });
      } else if (e.code === "ArrowDown") {
        this.setState({
          selectedIndex:
            this.state.selectedIndex < lastIndex
              ? this.state.selectedIndex + 1
              : 0,
        });
      } else if (e.code === "Enter") {
        onSelect(this.state.items[this.state.selectedIndex]);
      }
    }
  });

  window.addEventListener("click", (e) => {
    // 마우스 클릭 이벤트를 처리하여 선택된 언어를 처리하는 함수
    const li = e.target.closest("li");
    if (li) {
      const { index } = li.dataset;
      onSelect(this.state.items[index]);
    }
  });

  this.render();
}
