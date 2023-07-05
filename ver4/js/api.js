const BASE_URL =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
  const res = await fetch(url);
  if (res.ok) {
    const result = res.json();
    return result;
  }

  throw new Error("에러가 발생했습니다.");
};
const fetchLanguages = (keyword) => {
  return request(`${BASE_URL}/languages?keyword=${keyword}`);
};

export default fetchLanguages;
