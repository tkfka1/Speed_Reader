import React, { useRef, useEffect } from 'react';
import styles from './TextList.module.css';

interface TextListProps {
  texts: string[];
  currentLine: number;
  onTextClick?: (text: string) => void;
}

const TextList: React.FC<TextListProps> = ({ texts, currentLine, onTextClick }) => {
  const currentItemRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (currentItemRef.current && containerRef.current) {
      const topPos = currentItemRef.current.offsetTop;
      containerRef.current.scrollTop = topPos - (containerRef.current.clientHeight / 2);
    }
  }, [currentLine]);

  return (
    <div className={styles.textContainer} ref={containerRef}>
      {texts.map((text, index) => (
        <div 
          key={index} 
          className={index === currentLine ? styles.boldText : styles.textItem}
          ref={index === currentLine ? currentItemRef : null}
          onClick={() => onTextClick && onTextClick(text)} // 클릭 이벤트 핸들러 수정
        >
          {text}
        </div>
      ))}
    </div>
  );
};

export default TextList;
