export default function App(target) {
  // 앱의 상태를 초기화
  this.state = {
    fetchLanguages: [],
    selectedLanguages: [],
    selectedIndex: 0,
  };

  // 상태 업데이트 메서드
  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    //suggestion 컴포넌트 상태 업데이트
    suggestion.setState({
      selectedIndex: 0,
      items: this.state.fetchedLanguages,
    });

    // SelectedLanguages 컴포넌트 상태 업데이트
    selectedLanguages.setState({
      items: this.state.selectedLanguages,
    });

    // 콘솔에 this 값 출력
  };

  //SelectedLanguages 컴포넌트 상태 생성
  const selectedLanguages = new SelectedLanguages(target);

  // SearchInput 컴포넌트 생성
  const searchInput = new SearchInput(target, async (value) => {
    if (value.length > 0) {
      // 입력된 키워드로 프로그래밍 언어 조회
      const result = await fetchLanguages(value);
      this.setState({ fetchedLanguages: result });
    } else {
      this.setState({ fetchedLanguages: [] });
    }
  });
  // Suggestion 컴포넌트 생성
  const suggestion = new Suggestion(target, (value) => {
    if (!this.state.selectedLanguages.includes(value)) {
      this.setState({
        selectedLanguages: [...this.state.selectedLanguages, value],
      });
    }
  });
}
