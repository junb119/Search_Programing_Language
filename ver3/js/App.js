import { fetchLanguages } from "./api.js";
import SearchInput from "./components/SearchInput.js";
import Suggestion from "./components/Suggestion.js";
import SelectedLanguages from "./components/SelectedLanguages.js";

export default function App(target) {
  // 앱 상태 초기화
  this.state = {
    fetchedLanguages: [],
    selectedLanguages: [],
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };

    suggestion.setState({
      selectedIndex: 0,
      items: this.state.fetchedLanguages,
    });

    selectedLanguages.setState(this.state.selectedLanguages);
  };

  // SelectedLanguages 객체 생성
  const selectedLanguages = new SelectedLanguages(target);

  // SearchInput 객체 생성
  const searchInput = new SearchInput(target, async (value) => {
    if (value.length > 0) {
      const result = await fetchLanguages(value);
      console.log(result);
      this.setState({ fetchedLanguages: result });
    } else this.setState({ fetchedLanguages: [] });
  });

  // Suggestion 객체 생성
  const suggestion = new Suggestion({
    target,
    onSelect: (language) => {
      alert(language);

      // 이미 선택된 언어인 경우, 맨 뒤로 보내는 처리
      const nextSelectedLanguages = [...this.state.selectedLanguages];
      const index = nextSelectedLanguages.findIndex(
        (selectedLanguages) => selectedLanguages === language
      );

      if (index > -1) {
        nextSelectedLanguages.splice(index, 1);
      }
      nextSelectedLanguages.push(language);

      this.setState({
        ...this.state,
        selectedLanguages: nextSelectedLanguages,
      });
    },
  });
}
