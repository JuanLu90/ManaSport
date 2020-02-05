import React from 'react';
import Button from 'react-bootstrap/Button';

interface IProps {};
interface IPropsGlobal {};

const Tennis: React.FC<IProps & IPropsGlobal> = () => {
    return (
        <div>
            tennissssssssssssssss
            <Button type="button" className="btn btn-success">Close me ya'll!</Button>
            <span className="text-danger">aaaaaaaa</span>
        </div>
    );
}

export default Tennis;


