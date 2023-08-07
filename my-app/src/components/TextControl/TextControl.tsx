// TextControl.tsx
import React from 'react';
import { Button, Col, FormControl, InputGroup, Row } from 'react-bootstrap';

interface TextControlProps {
  tempIntervalTime: string;
  handleTempIntervalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  applyIntervalTime: () => void;
  handleStart: () => void;
  handleStop: () => void;
  handleReset: () => void;
  handleSpeedUp: () => void;
  handleSpeedDown: () => void;
}

const TextControl: React.FC<TextControlProps> = ({
  tempIntervalTime,
  handleTempIntervalChange,
  applyIntervalTime,
  handleStart,
  handleStop,
  handleReset,
  handleSpeedUp,
  handleSpeedDown
}) => {
  return (
    <Row className="justify-content-center">
      <Col xs={12} sm={10} md={8} lg={6}>
        {/* ... Other components and logic ... */}
        <div className="mt-3">
          <InputGroup className="mb-3">
            <InputGroup.Text>간격(ms)</InputGroup.Text>
            <FormControl
              type="number"
              value={tempIntervalTime}
              onChange={handleTempIntervalChange}
            />
            <Button onClick={applyIntervalTime}>적용</Button>
          </InputGroup>
          <Button onClick={handleStart} className="mr-2">시작</Button>
          <Button onClick={handleStop} className="mr-2">중지</Button>
          <Button onClick={handleReset} className="mr-2">초기화</Button>
          <Button onClick={handleSpeedUp} className="mr-2">빠르게</Button>
          <Button onClick={handleSpeedDown}>느리게</Button>
        </div>
      </Col>
    </Row>
  );
};

export default TextControl;
