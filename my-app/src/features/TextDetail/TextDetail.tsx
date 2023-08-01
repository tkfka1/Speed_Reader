import React from 'react';
import styles from './TextDetail.module.css';

interface TextDetailProps {
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number; // fontWeight 프롭 추가
}

const TextDetail: React.FC<TextDetailProps> = ({ text, fontFamily, fontSize, fontWeight }) => {
  return (
    <div
      className={styles.detailContainer}
      style={{ fontFamily, fontSize: `${fontSize}px`, fontWeight }} // fontWeight 스타일 속성 적용
    >
      {text}
    </div>
  );
};

export default TextDetail;