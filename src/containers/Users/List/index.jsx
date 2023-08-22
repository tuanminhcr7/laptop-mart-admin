import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import ModalUpdate from '../Modal/ModalUpdate.jsx';
import ModalDetail from '../Modal/ModalDetail.jsx';

const List = () => {

    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalDetail, setShowModalDetail] = useState(false);
    const [dataChoose, setDataChoose] = useState({
        id: null,
        firstName: null,
        lastName: null,
        phone: null,
        email: null,
        status: null
    });

    const handleCloseModalUpdate = () => {
        setShowModalUpdate(false);
        setDataChoose({
            ...dataChoose,
            id: null,
            firstName: null,
            lastName: null,
            phone: null,
            email: null,
            status: null
        })
    }
    const handleShowModalUpdate = () => {
        setShowModalUpdate(true);
    }

    const handleCloseModalDetail = () => {
        setShowModalDetail(false);
        setDataChoose({
            ...dataChoose,
            id: null,
            firstName: null,
            lastName: null,
            phone: null,
            email: null,
            status: null
        });
    }
    const handleShowModalDetail = () => {
        setShowModalDetail(true);
    }

    console.log(dataChoose);

    const fakeData = [
        {
            id: 1,
            firstName: "Nguyễn",
            lastName: "Văn Tuấn",
            phone: "0923431313",
            email: "tuanvn@gmail.com",
            status: 1
        },
        {
            id: 2,
            firstName: "Nguyễn",
            lastName: "Xuân Ánh",
            phone: "0923431313",
            email: "anhxn@gmail.com",
            status: 1
        },
        {
            id: 1,
            firstName: "Nguyễn",
            lastName: "Viết Hiếu",
            phone: "0923431313",
            email: "hieunv@gmail.com",
            status: 1
        },
        {
            id: 1,
            firstName: "Vũ",
            lastName: "Nguyễn Tuấn Minh",
            phone: "0923431313",
            email: "minhvnt@gmail.com",
            status: 1
        },
    ]

    return (
        <div className='mt-3'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {fakeData?.map((item, index) => {

                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item?.firstName}</td>
                                <td>{item?.lastName}</td>
                                <td>{item?.phone}</td>
                                <td>{item?.email}</td>
                                <td key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button variant='success' onClick={() => {
                                        handleShowModalUpdate();
                                        setDataChoose({
                                            ...dataChoose,
                                            id: item?.id,
                                            firstName: item?.firstName,
                                            lastName: item?.lastName,
                                            phone: item?.phone,
                                            email: item?.email,
                                            status: item?.status
                                        });
                                    }}
                                    >Edit</Button>
                                    <Button variant='warning' className='mx-1' onClick={() => {
                                        handleShowModalDetail();
                                        setDataChoose(item);
                                    }}
                                    >Detail</Button>

                                </td>
                            </tr>
                        );
                    })}

                </tbody>
            </Table>
            <ModalUpdate dataChoose={dataChoose} show={showModalUpdate} handleClose={handleCloseModalUpdate} handleShow={handleShowModalUpdate} />
            <ModalDetail dataChoose={dataChoose} show={showModalDetail} handleClose={handleCloseModalDetail} handleShow={handleShowModalDetail} />
        </div>
    );
};

export default List;