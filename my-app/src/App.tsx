import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, FormControl, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header/Header';
import AddTextModal from './components/AddTextModal/AddTextModal';
import FileList from './components/FileList/FileList';
import TextList from './features/TextList/TextList';
import TextDetail from './features/TextDetail/TextDetail';

const App: React.FC = () => {
  // State Declarations
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [fileList, setFileList] = useState<string[]>(['연결이 되지 않았습니다']);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [texts, setTexts] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState<string>('');
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [intervalTime, setIntervalTime] = useState<number>(200);
  const [tempIntervalTime, setTempIntervalTime] = useState<string>('200');
  const [fontFamily, setFontFamily] = useState<string>('Arial');
  const [fontSize, setFontSize] = useState<number>(30);
  const [customFontSize, setCustomFontSize] = useState<string>(fontSize.toString());
  const [fontWeight, setFontWeight] = useState<number>(400);
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newText, setNewText] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [displayMode, setDisplayMode] = useState<number | 'sentence'>(1);
  const [buttonVariant, setButtonVariant] = useState<"dark" | "light">("dark");
  const [toggleDisplay, setToggleDisplay] = useState(true);




  // Modal Control
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Display Mode Control
  const setDisplay = (mode: number | 'sentence') => {
    setDisplayMode(mode);
    setCurrentWordIndex(0);
  };

  // // Determine Current Display Text
  // let currentDisplay = '';
  // const words = currentText.split(' ');

  // if (displayMode === 'sentence') {
  //   const sentences = currentText.split('.');
  //   currentDisplay = sentences[currentWordIndex] || '';
  // } else {
  //   currentDisplay = words.slice(currentWordIndex, currentWordIndex + displayMode).join(' ');
  // }


  // Determine Current Display Text
let currentDisplay = '';
const words = currentText.split(' ');

if (!toggleDisplay) {
  currentDisplay = ''; // toggleDisplay가 false일 경우 빈 화면 출력
} else {
  if (displayMode === 'sentence') {
    const sentences = currentText.split('.');
    currentDisplay = sentences[currentWordIndex] || '';
  } else {
    currentDisplay = words.slice(currentWordIndex, currentWordIndex + displayMode).join(' ');
  }
}

  // Handle New Text Addition
  const handleNewTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value);
  const handleNewTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setNewText(e.target.value);
  const handleFormSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/add-text", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newTitle,
          text: newText
        })
      });
      const data = await response.json();
      if (data.success) {
        setFileList(prev => [...prev, newTitle]); // 제목 리스트 업데이트
      }
    } catch (error) {
      console.error("Error adding new text:", error);
    }
  };

  useEffect(() => {
    // 파일 리스트를 백엔드에서 가져오는 함수
    const fetchFiles = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/files");
        const data = await response.json();
        setFileList(data);
      } catch (error) {
        console.error("Error fetching file list:", error);
      }
    };

    fetchFiles();
  }, []);

  // Dark Mode Toggle
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    document.body.classList.toggle('dark-mode', !darkMode);
    if (darkMode) {
      // Dark Mode에서 Light Mode로 변경할 때 variant 값을 "dark"로 설정
      setButtonVariant("dark");
    } else {
      // Light Mode에서 Dark Mode로 변경할 때 variant 값을 "light"로 설정
      setButtonVariant("light");
    }
  };


  // File Selection and Text Loading
  const handleTitleSelect = (title: string) => {
    setSelectedFile(title);
    fetch(`http://127.0.0.1:8000/api/text/${title}`)
      .then(response => response.json())
      .then(data => {
        const text = data.text || "";
        const lines = text.split('\n').filter((line: string) => line.trim() !== '');
        setTexts(lines);
        setCurrentText(lines.join(' '));
        setIsFileSelected(true);
      });
  };

  const handleCustomFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomFontSize(e.target.value);
  };

  const handleTempIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempIntervalTime(e.target.value); // 임시 간격 값 업데이트
  };


  // Font and Size Adjustments
  const handleFontChange = (font: string) => setFontFamily(font);
  const handleFontSizeChange = (size: number) => {
    const newSize = fontSize + size;
    setFontSize(newSize);
    setCustomFontSize(newSize.toString());
  };
  const applyCustomFontSize = () => {
    const newSize = parseInt(customFontSize, 10);
    if (!isNaN(newSize)) setFontSize(newSize);
  };

  const handleFontBold = () => {
    setFontWeight(700); // 700은 굵은 폰트의 fontWeight 값
  };
  const handleFontNormal = () => {
    setFontWeight(400); // 400은 일반 폰트의 fontWeight 값
  };
  const applyIntervalTime = () => {
    const value = Number(tempIntervalTime);
    setIntervalTime(value);
    if (intervalId) {
      clearInterval(intervalId);
      handleStart();
    }
  };

  // // Text Playback and Control
  // const handleStart = () => {
  //   if (intervalId) return;
  //   const id = setInterval(() => {
  //     if (displayMode === 'sentence') {
  //       const sentences = currentText.split('.'); // Assuming sentences are separated by periods
  //       if (currentWordIndex < sentences.length - 1) {

  //         setToggleDisplay(prev => {
  //           console.log("Before:", prev);  // 이전 상태 출력
  //           if (prev === true) {
  //             setCurrentWordIndex(prev => prev + 1);
  //           }
  //           return !prev; // 값 변경
  //         });
  //       } else {
  //         clearInterval(id);
  //       }
  //     } else {
  //       if (currentWordIndex < words.length - displayMode) {

  //         setToggleDisplay(prev => {
  //           console.log("Before:", prev);  // 이전 상태 출력
  //           if (prev === true) {
  //             setCurrentWordIndex(prev => prev + displayMode);
  //           }
  //           return !prev; // 값 변경
  //         });
  //       } else {
  //         clearInterval(id);
  //       }
  //     }
  //   }, intervalTime);
  //   setIntervalId(id);
  // };



    // Text Playback and Control
    const handleStart = () => {
      if (intervalId) return;
      const id = setInterval(() => {
        if (displayMode === 'sentence') {
          const sentences = currentText.split('.'); // Assuming sentences are separated by periods
          if (currentWordIndex < sentences.length - 1) {
            setCurrentWordIndex(prev => prev + 1);
          } else {
            clearInterval(id);
          }
        } else {
          if (currentWordIndex < words.length - displayMode) {
            setCurrentWordIndex(prev => prev + displayMode);
          } else {
            clearInterval(id);
          }
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

  const handleSpeedUp = () => {
    const newIntervalTime = Math.max(50, intervalTime - 50); // 최소값은 50으로 제한
    setIntervalTime(newIntervalTime);
    setTempIntervalTime(newIntervalTime.toString()); // 임시 간격 값도 업데이트
  };

  const handleSpeedDown = () => {
    const newIntervalTime = intervalTime + 50; // 느리게 버튼을 클릭하면 간격을 더 길게 설정
    setIntervalTime(newIntervalTime);
    setTempIntervalTime(newIntervalTime.toString()); // 임시 간격 값도 업데이트
  };

  const getCurrentLineIndex = () => {
    if (displayMode === 'sentence') {
      const sentences = currentText.split('.'); // Assuming sentences are separated by periods
      return currentWordIndex; // In sentence mode, the currentWordIndex directly corresponds to the sentence index
    } else {
      let accumulatedWords = 0;
      for (let i = 0; i < texts.length; i++) {
        accumulatedWords += texts[i].split(' ').length;
        if (currentWordIndex < accumulatedWords) {
          return i;
        }
      }
      return 0;
    }
  };

  const handleDeleteFile = async (e: React.MouseEvent, title: string) => {
    e.stopPropagation(); // Prevent triggering other click events

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/text/${title}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFileList(prev => prev.filter(t => t !== title));
      } else {
        console.error("Error deleting file:", title);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };


  const handleTextClick = (selectedText: string) => {
    setCurrentText(selectedText);
    setCurrentWordIndex(0); // 선택된 텍스트의 시작부터 시작
  };

  const currentLineIndex = getCurrentLineIndex();




  return (
    <Container fluid className="mt-5">
      {/* Header 컴포넌트를 렌더링합니다. */}
      <Header />



      {/* 파일에 들어갔을 때 */}
      {!isFileSelected ? (
        <>
          <Row className="justify-content-end align-items-center mb-3">
            <Col xs="auto">
              <Button variant={buttonVariant} onClick={toggleDarkMode}>
                {darkMode ? "Light Mode" : "Dark Mode"}
              </Button>


            </Col>
          </Row>
          {/* FileList 컴포넌트를 렌더링합니다. */}
          <FileList
            fileList={fileList}
            handleTitleSelect={handleTitleSelect}
            handleDeleteFile={handleDeleteFile}
          />


          <Row className="justify-content-center mt-3">
            <Col xs={12} sm={10} md={8} lg={6}>
              <Button onClick={handleShow}>텍스트 추가하기</Button>
            </Col>
          </Row>

          {/* AddTextModal 컴포넌트를 렌더링합니다. */}
          <AddTextModal
            showModal={showModal}
            newTitle={newTitle}
            newText={newText}
            handleNewTitleChange={handleNewTitleChange}
            handleNewTextChange={handleNewTextChange}
            handleShow={handleShow}
            handleClose={handleClose}
            handleFormSubmit={handleFormSubmit}
          />
        </>
      ) : (
        <>
          <Row className="justify-content-between align-items-center mb-3">
            <Col xs="auto">
              <Button variant="secondary" onClick={() => setIsFileSelected(false)}>나가기</Button>
            </Col>
            <Col xs="auto">
              <Button variant={buttonVariant} onClick={toggleDarkMode}>
                {darkMode ? "Light Mode" : "Dark Mode"}
              </Button>


            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <TextDetail
                text={currentDisplay}
                fontFamily={fontFamily}
                fontSize={fontSize}
                fontWeight={fontWeight}
              />
              <div className="mt-3">
                <Button onClick={() => setDisplay(1)} className="mr-2">한 단어</Button>
                <Button onClick={() => setDisplay(2)} className="mr-2">2단어</Button>
                <Button onClick={() => setDisplay(3)} className="mr-2">3단어</Button>
                <Button onClick={() => setDisplay('sentence')} className="mr-2">한 문장</Button>

              </div>
              <div className="mt-3">
                <Button variant="outline-primary" onClick={() => handleFontChange('Noto Sans KR')} className="mr-2">Noto Sans KR</Button>
                <Button variant="outline-primary" onClick={() => handleFontChange('Jeju Gothic')} className="mr-2">Jeju Gothic</Button>
                <Button variant="outline-primary" onClick={() => handleFontChange('Nanum Gothic')} className="mr-2">Nanum Gothic</Button>
                <Button variant="outline-primary" onClick={() => handleFontChange('Nanum Myeongjo')}>Nanum Myeongjo</Button>
              </div>
              <div className="mt-3">
                <Button variant="primary" onClick={() => handleFontSizeChange(-1)} className="mr-2">작게</Button>
                <Button variant="primary" onClick={() => handleFontSizeChange(1)} className="mr-2">크게</Button>
                <Button variant="success" onClick={handleFontBold} className="mr-2">굵게</Button>
                <Button variant="danger" onClick={handleFontNormal} className="mr-2">얇게</Button>
                <InputGroup className="mt-3">
                  <InputGroup.Text>크기(pt)</InputGroup.Text>
                  <FormControl
                    type="number"
                    value={customFontSize}
                    onChange={handleCustomFontSizeChange}
                    placeholder="텍스트 크기"
                  />
                  <Button onClick={applyCustomFontSize}>적용</Button>
                </InputGroup>
              </div>
            </Col>

            <Col xs={12} sm={12} md={6} lg={6}>
              <TextList texts={texts} currentLine={currentLineIndex} onTextClick={handleTextClick} />

              <div className="mt-3">
                <InputGroup className="mb-3">
                  <InputGroup.Text>간격(ms)</InputGroup.Text>
                  <FormControl
                    type="number"
                    value={tempIntervalTime} // 임시 간격 값 사용
                    onChange={handleTempIntervalChange}
                  />
                  <Button onClick={applyIntervalTime}>적용</Button> {/* "적용" 버튼 추가 */}
                </InputGroup>
                <Button onClick={handleStart} className="mr-2">시작</Button>
                <Button onClick={handleStop} className="mr-2">중지</Button>
                <Button onClick={handleReset} className="mr-2">초기화</Button>
                <Button onClick={handleSpeedUp} className="mr-2">빠르게</Button>
                <Button onClick={handleSpeedDown}>느리게</Button>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default App;