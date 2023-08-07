import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Header: React.FC = () => {
  return (
    <Row className="justify-content-center mb-4">
      <Col xs={12} sm={10} md={8} lg={6} className="text-center">
        <h1 className="logo-text">Speed Reader</h1>
      </Col>
    </Row>
  );
};

export default Header;
