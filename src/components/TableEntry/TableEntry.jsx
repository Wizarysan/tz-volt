import React from 'react';
import { Button } from 'react-bootstrap';

const TableEntry = ({editHandler, deleteHandler, targetHandler, fields}) => {
    const renderedFields = Object.keys(fields).map(field=> <td key={field}>{fields[field]}</td>)
    return (
        <tr>
            {renderedFields}
            <td><Button variant="outline-primary" onClick={()=>{
                    targetHandler(fields.id)
                    editHandler(fields.id)
                }}>Edit</Button></td>
            <td><Button variant="outline-danger" onClick={()=>{
                    targetHandler(fields.id)
                    deleteHandler(fields.id)
                }}>Delete</Button></td>
        </tr>
    );
}

export default TableEntry;
