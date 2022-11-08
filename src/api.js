export async function getReivews({
  order = "createdAt",
  offset = 0,
  limit = 6,
  search = "",
}) {
  const query = `order=${order}&offset=${offset}&limit=${limit}&search=${search}`;
  const response = await fetch(
    `https://learn.codeit.kr/api/film-reviews?${query}`
  );
  if (!response.ok) {
    throw new Error("불러오기 실패");
  }
  const body = await response.json();
  return body;
}