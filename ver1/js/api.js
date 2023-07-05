const BASE_URL =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

const cache = {};

// 주어진 URL로 요청을 보내는 함수입니다.
const request = async (url) => {
  if (cache[url]) return cache[url];

  const res = await fetch(url);
  if (res.ok) {
    const result = await res.json();
    cache[url] = result;
    return result;
  }
  throw new Error("요청이 실패했습니다.");
};

// 프로그래밍 언어를 조회하는 함수입니다.
export const fetchLanguages = async (keyword) =>
  request(BASE_URL + `/languages?keyword=${keyword}`);
