// FileList.tsx
import React from 'react';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';

interface FileListProps {
  fileList: string[];
  handleTitleSelect: (title: string) => void;
  handleDeleteFile: (e: React.MouseEvent, title: string) => void;
}

const FileList: React.FC<FileListProps> = ({ fileList, handleTitleSelect, handleDeleteFile }) => {
  return (
    <Row className="justify-content-center">
      <Col xs={12} sm={10} md={8} lg={6}>
        <ListGroup>
          {fileList.map(title => (
            <ListGroup.Item key={title}>
  <div 
    className="d-flex justify-content-between align-items-center"
    onClick={() => handleTitleSelect(title)}
    style={{ cursor: 'pointer' }} // 마우스를 올렸을 때 포인터로 표시
  >
    <span className="mr-2">{title}</span>
    <Button
      variant="danger"
      size="sm"
      onClick={(e) => {
        e.stopPropagation(); // 상위의 onClick 이벤트를 방지하기 위해
        handleDeleteFile(e, title);
      }}
    >
      -
    </Button>
  </div>
</ListGroup.Item>

          ))}
        </ListGroup>
      </Col>
    </Row>
  );
};

export default FileList;
