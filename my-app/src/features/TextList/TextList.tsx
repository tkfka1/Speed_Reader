import React, { useRef, useEffect } from 'react';
import styles from './TextList.module.css';

interface TextListProps {
  texts: string[];
  currentLine: number;
}

const TextList: React.FC<TextListProps> = ({ texts, currentLine }) => {
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
        >
          {text}
        </div>
      ))}
    </div>
  );
};

export default TextList;
