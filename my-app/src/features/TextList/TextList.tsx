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
      const containerHeight = containerRef.current.clientHeight;
      const itemHeight = currentItemRef.current.clientHeight;

      // 아이템의 중앙을 컨테이너의 중앙에 위치시킵니다.
      containerRef.current.scrollTop = topPos - (containerHeight / 2) + (itemHeight / 2) - 150; // -150은 textContainer의 상단 패딩 값을 보정합니다.
    }
  }, [currentLine]);

  return (
    <div className={styles.textContainer} ref={containerRef}>
      {texts.map((text, index) => (
        <div 
          key={index} 
          className={index === currentLine ? styles.boldText : styles.textItem}
          ref={index === currentLine ? currentItemRef : null}
          onClick={() => onTextClick && onTextClick(text)}
        >
          {text}
        </div>
      ))}
    </div>
  );
};

export default TextList;
