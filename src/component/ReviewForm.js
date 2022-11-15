import { useState } from "react";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import { createReviews } from "../api";
import "./ReviewForm.css";
const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

// 제어 컴포넌트 방식
function ReviewForm({
  initialValues = INITIAL_VALUES,
  initialPreview,
  onSubmitSuccess,
  onCancel,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  const [values, setValues] = useState(initialValues);

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

  const handleReivewSubmit = async (e) => {
    e.preventDefault();
    // preventDefault : 이벤트 객체의 기본 동작을 막는다
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("content", values.content);
    formData.append("imgFile", values.imgFile);
    let result;
    try {
      setSubmittingError(null);
      setIsSubmitting(true);
      result = await createReviews(formData);
    } catch (error) {
      setSubmittingError(error);
    } finally {
      setIsSubmitting(false);
    }
    const { review } = result;
    onSubmitSuccess(review);
    setValues(INITIAL_VALUES);
  };

  return (
    <form className="ReviewForm" onSubmit={handleReivewSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        initialPreview={initialPreview}
        onChange={handleChange}
      />
      <div className="inputReview">
        제목 :&nbsp;
        <input
          className="inputTitle"
          name="title"
          value={values.title}
          onChange={handleInputChange}
        />
        <RatingInput
          name="rating"
          value={values.rating}
          onChange={handleChange}
        />
        <textarea
          className="inputContent"
          name="content"
          value={values.content}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={isSubmitting}>
          전송
        </button>
        {onCancel && <button onClick={onCancel}>취소</button>}
        {submittingError?.message && <div>{submittingError.message}</div>}
      </div>
    </form>
  );
}

export default ReviewForm;
