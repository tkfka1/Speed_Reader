// TextDisplay.tsx
import React from 'react';
import { Button, Col, FormControl, InputGroup, Row } from 'react-bootstrap';

interface TextDisplayProps {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  customFontSize: string;
  handleFontChange: (font: string) => void;
  handleFontSizeChange: (size: number) => void;
  handleCustomFontSizeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  applyCustomFontSize: () => void;
}

const TextDisplay: React.FC<TextDisplayProps> = ({
  fontFamily,
  fontSize,
  fontWeight,
  customFontSize,
  handleFontChange,
  handleFontSizeChange,
  handleCustomFontSizeChange,
  applyCustomFontSize
}) => {
  return (
    <Row className="justify-content-center">
      <Col xs={12} sm={10} md={8} lg={6}>
        {/* ... Other components and logic ... */}
        <div className="mt-3">
          <Button variant="outline-primary" onClick={() => handleFontChange('Noto Sans KR')} className="mr-2">Noto Sans KR</Button>
          <Button variant="outline-primary" onClick={() => handleFontChange('Jeju Gothic')} className="mr-2">Jeju Gothic</Button>
          <Button variant="outline-primary" onClick={() => handleFontChange('Nanum Gothic')} className="mr-2">Nanum Gothic</Button>
          <Button variant="outline-primary" onClick={() => handleFontChange('Nanum Myeongjo')}>Nanum Myeongjo</Button>
        </div>
        <div className="mt-3">
          <Button variant="primary" onClick={() => handleFontSizeChange(-1)} className="mr-2">작게</Button>
          <Button variant="primary" onClick={() => handleFontSizeChange(1)} className="mr-2">크게</Button>
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
    </Row>
  );
};

export default TextDisplay;
