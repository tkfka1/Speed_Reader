// AddTextModal.tsx
import React from 'react';
import { Button, FormControl, InputGroup, Modal } from 'react-bootstrap';

interface AddTextModalProps {
    showModal: boolean;
    newTitle: string;
    newText: string;
    handleNewTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleNewTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleShow: () => void;
    handleClose: () => void;
    handleFormSubmit: () => void;
}
const AddTextModal: React.FC<AddTextModalProps> = ({
    showModal,
    newTitle,
    newText,
    handleNewTitleChange,
    handleNewTextChange,
    handleShow,
    handleClose,
    handleFormSubmit
}) => {
    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>텍스트 추가하기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <InputGroup.Text>제목</InputGroup.Text>
                    <FormControl
                        type="text"
                        value={newTitle}
                        onChange={handleNewTitleChange}
                        placeholder="새 제목 입력"
                    />
                </InputGroup>
                <InputGroup>
                    <InputGroup.Text>내용</InputGroup.Text>
                    <FormControl
                        as="textarea"
                        value={newText}
                        onChange={handleNewTextChange}
                        placeholder="내용 입력"
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
                <Button variant="primary" onClick={() => { handleFormSubmit(); handleClose(); }}>
                    추가하기
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddTextModal;