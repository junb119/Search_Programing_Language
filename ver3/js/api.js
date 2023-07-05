const BASE_URL =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

const cache = {};

const request = async (url) => {
  if (cache[url]) return cache[url];

  const res = await fetch(url);

  if (res.ok) {
    const result = res.json();
    cache[url] = result;
    return result;
  }
  throw new Error("요청이 실패했습니다.");
};
export const fetchLanguages = (keyword) => {
  return request(BASE_URL + `/languages?keyword=${keyword}`);
};
