import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";
import { getReivews } from "../api";
import ReviewForm from "./ReviewForm";
import "./App.css";
const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const [hasNext, setHasNext] = useState(false);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");

  const handleBestClick = () => setOrder("rating");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getReivews(options);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
    const { reviews, paging } = result;
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]);
    }

    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext);
  };

  const handleLoadMore = () => {
    handleLoad({
      order,
      offset,
      limit: LIMIT,
    });
  };

  useEffect(() => {
    handleLoad({
      order,
      offset: 0,
      limit: LIMIT,
    });
  }, [order]);
  // 무한뤂프가 발생했을 때 useEffect를 사용.
  // 뒤에 빈 배열을 넣어야하는데 아무것도 없는 초기화면을 의미함!
  // 즉 페이지 오픈 초기에만 발동되는 것이다.
  // 뒤에 배열을 디펜던시 리스트라 하는데
  // 렌더링 할 때 디펜던시 리스트의 값을 확인해서 바뀐게 있으면 콜백함수를 실행.

  return (
    <div className="app">
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>별점순</button>
        {/* <form onSubmit={handleSearch}>
          <input name="search" />
          <button type="submit"> 검색 </button>
        </form> */}
      </div>
      <ReviewForm></ReviewForm>
      <ReviewList items={sortedItems} onDelete={handleDelete} />
      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
