import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import List from './List';

const Users = () => {
    return (
        <div>
            {/* <Container> */}
            <Row>
                <Col className='mt-2'>
                    <h3>Quản lý người dùng</h3>
                    <List />
                </Col>
            </Row>
            {/* </Container> */}
        </div>

    );
};

export default Users;