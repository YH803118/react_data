import { useEffect, useRef, useState } from "react";
import "./FileInput.css";

function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState();
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue); // 부모가 prop로 물려준 onChange 호출
    console.log("re");
    return () => {
      console.log("return");
    };
    // console.log("returnturn");
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    // value를 빈 값으로만 바꿀 수 있는 성질을 이용
    onChange(name, null);
    // imgFile prop을 null로 = 삭제
  };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    // 해당 파일의 주소처럼 쓸 수있는 문자열을 리턴
    // 만들때마다 웹브라우저에 메모리를 할당
    // 할당한 메모리 => 사이드 이펙트
    setPreview(nextPreview);
    console.log("ObjectURL 할당");

    return () => {
      console.log("ObjectURL 해제");
      setPreview();
      URL.revokeObjectURL(nextPreview);
      // 앞에서 만든 ObjectURL을 해제
    }; // 정리 함수.
    // 디펜던스 리스트 값이 바뀌어서 새로 콜백을 실행해야 할때
    // 실행하기 전에 앞에서 리턴한 정리 함수를 먼저 실행.
  }, [value]);
  // value 값이 바뀔 때마다 => 파일을 선택할 때마다

  return (
    <div>
      {preview ? (
        <img
          className="ReviewListItem-img"
          src={preview}
          alt="이미지 미리보기"
        />
      ) : (
        <img className="ReviewListItem-img" src="" />
      )}
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={inputRef}
      />
      {value && <button onClick={handleClearClick}>초기화</button>}
    </div>
  );
}

export default FileInput;
