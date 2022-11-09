import { useState } from "react";
import FileInput from "./FileInput";

// 제어 컴포넌트 방식
function ReviewForm() {
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    content: "",
    imgFile: null,
  });

  const handleChange = (name, value) => {
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
      // 대괄호표기 : 프로퍼티명으로 지?정해줄 수 있음
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleReivewSubmit = (e) => {
    e.preventDefault();
    // preventDefault : 이벤트 객체의 기본 동작을 막는다
    console.log(values);
  };

  return (
    <form className="ReviewForm" onSubmit={handleReivewSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
      />
      <br></br>
      <input name="title" value={values.title} onChange={handleInputChange} />
      <input
        name="rating"
        type="number"
        value={values.rating}
        onChange={handleInputChange}
      />
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      />
      <button type="submit">전송</button>
    </form>
  );
}

export default ReviewForm;
