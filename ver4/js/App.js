import fetchLanguages from "./api.js";
import SearchInput from "./components/SearchInput.js";
import Suggestion from "./components/Suggestion.js";
import SelectedLanguages from "./components/SelectedLanguages.js";

export default function App(target) {
  // 앱 상태 초기화
  this.state = {
    fetchedLanguages: [],
    selectedLanguages: [],
    currentInputValue: "",
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };

    // suggestion 업데이트
    suggestion.setState({
      selectedIndex: 0,
      items: this.state.fetchedLanguages,
      keyword: this.state.currentInputValue,
    });

    selectedLanguages.setState({
      selectedLanguages: this.state.selectedLanguages,
    });
  };
  // selectedLanguages 컴포넌트 생성
  const selectedLanguages = new SelectedLanguages(target, (countLimit) => {
    const startIndex = this.state.selectedLanguages.length - countLimit;
    this.setState({
      selectedLanguages: this.state.selectedLanguages.slice(startIndex),
    });
  });
  // searchInput 컴포넌트 생성
  const searchInput = new SearchInput(target, async (inputValue) => {
    // console.log("inputValue :", inputValue);
    let result = [];
    if (inputValue.length > 0) {
      result = await fetchLanguages(inputValue);
      // console.log("api result : ", result);
    }
    this.setState({ fetchedLanguages: result, currentInputValue: inputValue });
  });

  // suggestion 컴포넌트 생성
  const suggestion = new Suggestion(target, (language) => {
    const nextSelectedLanguages = [...this.state.selectedLanguages];
    const index = nextSelectedLanguages.indexOf(language);

    if (index !== -1) nextSelectedLanguages.splice(index, 1);
    nextSelectedLanguages.push(language);
    // console.log("nextSelectedLanguages", nextSelectedLanguages);
    this.setState({ selectedLanguages: nextSelectedLanguages });
  });

  console.log('test')
  console.log('test2')
}
