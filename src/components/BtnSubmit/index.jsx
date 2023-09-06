import { Button } from 'antd';
import React from 'react';

const BtnSubmit = ({ title, onclick }) => {
    return (
        <div>
            <Button className='bg-secondary' onClick={onclick}>Hủy</Button>
            <Button className='bg-primary mx-1' htmlType='submit'>{title}</Button>
        </div>
    );
};

export default BtnSubmit;