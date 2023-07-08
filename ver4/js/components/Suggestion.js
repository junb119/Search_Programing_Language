export default function Suggestion(target, onSelect) {
  this.element = document.createElement("div");
  this.element.className = "Suggestion";
  target.appendChild(this.element);

  this.state = {
    items: [],
    selectedIndex: 0,
    keyword: "",
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };
  this.renderMatchedItem = (keyword, item) => {
    if (!item.includes(keyword)) {
      return item;
    }

    const matchedText = item.match(new RegExp(keyword, "gi"))[0];
    console.log(item);
    console.log(item.match(new RegExp(keyword, "gi")));
    return item.replace(
      new RegExp(matchedText, "gi"),
      `<span class="Suggestion__item--matched">${matchedText}</span>`
    );
  };

  this.render = () => {
    const { items, selectedIndex, keyword } = this.state;
    if (items.length > 0) {
      this.element.style.display = "block";
      //   this.element.innerHTML = `
      //   <ul>
      //   ${items
      //     .map((item, index) => {
      //       const machedItem = this.state.currentInputValue;
      //       // console.log("machedItem", machedItem);
      //       const reg = new RegExp(`${machedItem}`, "gi");
      //       if (item.test(reg)) {
      //         item = item.replace(
      //           item.match(reg),
      //           `<span class="Suggestion__item--matched">${machedItem}</span>`
      //         );
      //       }
      //       return index === selectedIndex
      //         ? `<li class="Suggestion__item--selected">${item}</li>`
      //         : `<li>${item}</li>`;
      //     })
      //     .join("")}
      //   </ul>
      // `;
      this.element.innerHTML = `
    <ul>
      ${items
        .map(
          (item, index) => `
        <li class="${
          index === selectedIndex ? "Suggestion__item--selected" : ""
        }" data-index="${index}">${this.renderMatchedItem(keyword, item)}</li>
            </li>
      `
        )
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
    onSelect(this.state.items[this.state.selectedIndex]);

    this.setState({
      selectedIndex: parseInt(e.target.dataset.index),
    });
    alert(this.state.items[this.state.selectedIndex]);
    console.log(e.target.dataset.index);
    document.querySelector(".SearchInput__input").focus();
    // const li = e.target.closest("li");
    // console.log(li);
    // if (li) {
    //   const { index } = li.dataset;
    //   console.log(index);
    //   try {
    //     onSelect(this.state.items[parseInt(index)]);
    //   } catch (e) {
    //     alert("무언가 잘못되었습니다. 선택할 수 없습니다!");
    //   }
    // }
  });
}
