import React from 'react';
import styles from './TextDetail.module.css';

interface TextDetailProps {
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
}

const TextDetail: React.FC<TextDetailProps> = ({ text, fontFamily, fontSize, fontWeight }) => {
  return (
    <div
      className={styles.detailContainer}
      style={{ fontFamily, fontSize: `${fontSize}px`, fontWeight }}
    >
      {text}
    </div>
  );
};

export default TextDetail;
