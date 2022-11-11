import "./Rating.css";

const RATINGS = [1, 2, 3, 4, 5];

function Star({ selected = false }) {
  const className = `Rating-star ${selected ? "selected" : ""}`;
  return <span className={className}>★</span>;
}
// selected값이 true 일 때 seleted 스타일을 추가

function Rating({ value = 0 }) {
  return (
    <div>
      {RATINGS.map((rating) => (
        <Star key={rating} selected={value >= rating} />
      ))}
    </div>
  );
}

export default Rating;
