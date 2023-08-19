import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import List from './List';

const Users = () => {
    return (
        <Container>
            <Row>
                <Col></Col>
                <Col xs={6}>
                    <List />
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
};

export default Users;