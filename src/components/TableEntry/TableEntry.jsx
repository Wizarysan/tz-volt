import React from 'react';
import PropTypes from 'prop-types';
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

TableEntry.propTypes = {
    editHandler: PropTypes.func,
    deleteHandler: PropTypes.func,
    targetHandler: PropTypes.func,
    fields: PropTypes.object.isRequired,
}

export default TableEntry;
