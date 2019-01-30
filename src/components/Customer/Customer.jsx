import React from 'react';
import { Button } from 'react-bootstrap';

const Customer = ({editHandler, deleteHandler, targetHandler, id, name, address, phone}) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{address}</td>
            <td>{phone}</td>
            <td><Button variant="outline-primary" onClick={()=>{
                    targetHandler(id)
                    editHandler(id)
                }}>Edit</Button></td>
            <td><Button variant="outline-danger" onClick={()=>{
                    targetHandler(id)
                    deleteHandler(id)
                }}>Delete</Button></td>
        </tr>
    );
}

export default Customer;
