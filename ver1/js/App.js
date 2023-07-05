import { fetchLanguages } from "./api.js";
import SearchInput from "./components/SearchInput.js";
import SelectedLanguages from "./components/SelectedLanguages.js";
import Suggestion from "./components/Suggestion.js";

export default function App(target) {
  // 앱의 상태를 초기화합니다.
  this.state = {
    fetchedLanguages: [],
    selectedLanguages: [],
    selectedIndex: 0,
  };

  // 상태를 업데이트하는 메서드입니다.
  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    // Suggestion 컴포넌트의 상태를 업데이트합니다.
    suggestion.setState({
      selectedIndex: 0,
      items: this.state.fetchedLanguages,
    });
    // SelectedLanguages 컴포넌트의 상태를 업데이트합니다.
    selectedLanguages.setState({
      items: this.state.selectedLanguages,
    });
    console.log(fetchLanguages);
  };

  // SelectedLanguages 컴포넌트를 생성합니다.
  const selectedLanguages = new SelectedLanguages(target);

  // SearchInput 컴포넌트를 생성합니다.
  const searchInput = new SearchInput(target, async (value) => {
    if (value.length > 0) {
      // 입력된 키워드로 프로그래밍 언어를 조회합니다.
      const result = await fetchLanguages(value);
      this.setState({ fetchedLanguages: result });
    } else {
      this.setState({ fetchedLanguages: [] });
    }
  });

  // Suggestion 컴포넌트를 생성합니다.
  const suggestion = new Suggestion(target, (value) => {
    if (!this.state.selectedLanguages.includes(value)) {
      // 선택된 언어를 상태에 추가합니다.
      this.setState({
        selectedLanguages: [...this.state.selectedLanguages, value],
      });
    }
  });
}
