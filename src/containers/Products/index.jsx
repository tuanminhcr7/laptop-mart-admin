import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import List from './List';

const Products = () => {
    return (
        <div>
            <Row>
                <Col className='mt-2'>
                    <Row>
                        <Col><h3>Quản lý sản phẩm</h3></Col>
                        <Col style={{ display: 'flex', justifyContent: 'end' }}><Button>Thêm mới</Button></Col>
                    </Row>

                    <List />
                </Col>
            </Row>
        </div>

    );
};

export default Products;