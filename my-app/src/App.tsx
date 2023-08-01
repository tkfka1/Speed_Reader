import React, { useState, useEffect } from 'react';
import TextList from './features/TextList/TextList';
import TextDetail from './features/TextDetail/TextDetail';
import styles from './App.module.css';

const App: React.FC = () => {
  const [texts, setTexts] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState<string>('');
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [intervalTime, setIntervalTime] = useState<number>(200);
  const [fontFamily, setFontFamily] = useState<string>('Arial');
  const [fontSize, setFontSize] = useState<number>(18);
  const [customFontSize, setCustomFontSize] = useState<string>(fontSize.toString());
  const [fontWeight, setFontWeight] = useState<number>(400); // 기본값은 400 (일반 폰트)


const handleCustomFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setCustomFontSize(e.target.value);
};

const applyCustomFontSize = () => {
  const newSize = parseInt(customFontSize, 10);
  if (!isNaN(newSize)) {
    setFontSize(newSize);
  }
};

  const handleFontChange = (font: string) => {
    setFontFamily(font);
  };

  const handleFontSizeChange = (size: number) => {
    const newSize = fontSize + size;
    setFontSize(newSize);
    setCustomFontSize(newSize.toString()); // customFontSize도 업데이트
  };

  useEffect(() => {
    fetch('/data.txt')
      .then(response => response.text())
      .then(data => {
        const lines = data.split('\n').filter(line => line.trim() !== '');
        setTexts(lines);
        setCurrentText(lines.join(' ')); // 전체 텍스트를 하나의 문자열로 합칩니다.
      });
  }, []);



  
  const handleStart = () => {
    if (intervalId) return;
    const words = currentText.split(' ');
    const id = setInterval(() => {
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex(prev => prev + 1);
      } else {
        clearInterval(id);
      }
    }, intervalTime);
    setIntervalId(id);
  };


  const handleStop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleReset = () => {
    setCurrentWordIndex(0);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setIntervalTime(value);
    if (intervalId) {
      clearInterval(intervalId);
      handleStart();
    }
  };
  const handleFontBold = () => {
    setFontWeight(700); // 700은 굵은 폰트의 fontWeight 값
  };

  const handleFontNormal = () => {
    setFontWeight(400); // 400은 일반 폰트의 fontWeight 값
  };

  const handleSpeedUp = () => {
    const newIntervalTime = Math.max(50, intervalTime - 50); // 최소값은 50으로 제한
    setIntervalTime(newIntervalTime);
  };

  const handleSpeedDown = () => {
    setIntervalTime(intervalTime + 50); // 느리게 버튼을 클릭하면 간격을 더 길게 설정
  };

  const currentWord = currentText.split(' ')[currentWordIndex] || '';

  const getCurrentLineIndex = () => {
    let accumulatedWords = 0;
    for (let i = 0; i < texts.length; i++) {
      accumulatedWords += texts[i].split(' ').length;
      if (currentWordIndex < accumulatedWords) {
        return i;
      }
    }
    return 0;
  };

  const currentLineIndex = getCurrentLineIndex();

  return (
    <div className={styles.appContainer}>
      <div>
        <TextList texts={texts} currentLine={currentLineIndex} />

        <div className={styles.controls}>
          <label>
            간격(ms):
            <input
              type="number"
              value={intervalTime}
              onChange={handleIntervalChange}
              className={styles.intervalInput}
            />
          </label>
          <button onClick={handleStart}>시작</button>
          <button onClick={handleStop}>중지</button>
          <button onClick={handleReset}>초기화</button>

          {/* 텍스트 지나가는 속도 조절 부분 */}
          <div>
          <button onClick={handleSpeedUp}>빠르게</button>
            <button onClick={handleSpeedDown}>느리게</button>
          </div>
        </div>

      </div>
      <div>
      <TextDetail
        text={currentWord}
        fontFamily={fontFamily}
        fontSize={fontSize}
        fontWeight={fontWeight}
      />
        <div className={styles.controls}>
          <div>
          {/* 한국어 폰트 변경 버튼 추가 */}
          <button onClick={() => handleFontChange('Noto Sans KR')}>Noto Sans KR</button>
          <button onClick={() => handleFontChange('Jeju Gothic')}>Jeju Gothic</button>
          <button onClick={() => handleFontChange('Nanum Gothic')}>Nanum Gothic</button>
          <button onClick={() => handleFontChange('Nanum Myeongjo')}>Nanum Myeongjo</button>
          </div>

          <div>
          {/* 폰트 크기 변경 버튼 */}
          <button onClick={() => handleFontSizeChange(-1)}>작게</button>
          <button onClick={() => handleFontSizeChange(1)}>크게</button>
          {/* 텍스트 크기 직접 지정 부분 */}
          <div>
            <input 
              type="number" 
              value={customFontSize} 
              onChange={handleCustomFontSizeChange} 
              placeholder="텍스트 크기"
            />
            <button onClick={applyCustomFontSize}>적용</button>
          </div>

                {/* 폰트 굵기 조절 부분 */}
                <div>
            <button onClick={handleFontBold}>굵게</button>
            <button onClick={handleFontNormal}>얇게</button>
          </div>



          </div>


        </div>
      </div>


    </div>
  );
};

export default App;