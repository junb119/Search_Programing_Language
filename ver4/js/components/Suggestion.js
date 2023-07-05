export default function Suggestion(target, onSelect) {
  this.element = document.createElement("div");
  this.element.className = "Suggestion";
  target.appendChild(this.element);

  this.state = {
    items: [],
    selectedIndex: 0,
    currentInputValue: "",
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.render = () => {
    const { items, selectedIndex } = this.state;
    if (items.length > 0) {
      this.element.style.display = "block";
      this.element.innerHTML = `
      <ul>
      ${items
        .map((item, index) => {
          const machedItem = this.state.currentInputValue;
          // console.log("machedItem", machedItem);
          const reg = new RegExp(`${machedItem}`, "gi");
          if (item.test(reg)) {
            item = item.replace(
              item.match(reg),
              `<span class="Suggestion__item--matched">${machedItem}</span>`
            );
          }
          return index === selectedIndex
            ? `<li class="Suggestion__item--selected">${item}</li>`
            : `<li>${item}</li>`;
        })
        .join("")} 
      </ul>
    `;
    } else {
      this.element.style.display = "none";
      this.element.innerHTML = "";
    }
  };
  this.render();

  window.addEventListener("keyup", (e) => {
    const thisItems = this.state.items;
    const length = thisItems.length;
    let nextSelectedIndex = this.state.selectedIndex;
    if (thisItems.length > 0) {
      if (e.key === "ArrowUp") {
        nextSelectedIndex =
          nextSelectedIndex === 0 ? length - 1 : nextSelectedIndex - 1;
      } else if (e.key === "ArrowDown") {
        nextSelectedIndex =
          nextSelectedIndex === length - 1 ? 0 : nextSelectedIndex + 1;
      } else if (e.code === "Enter") {
        alert(thisItems[nextSelectedIndex]);
        onSelect(thisItems[nextSelectedIndex]);
      }
      this.setState({ selectedIndex: nextSelectedIndex });
    }
  });

  this.element.addEventListener("click", (e) => {
    alert(this.state.items[this.state.selectedIndex]);
    onSelect(this.state.items[this.state.selectedIndex]);
    document.querySelector(".SearchInput__input").focus();
    this.setState({
      selectedIndex: this.state.items.indexOf(e.target.innerText),
    });
  });
}
