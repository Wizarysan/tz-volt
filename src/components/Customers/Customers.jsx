import React, { Component } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import Modal from 'react-responsive-modal';

import Customer from './../Customer/Customer';

class Customers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customers: [],
            editModal: false,
            deleteModal: false,
            addModal: false,
            editing: 0,
            targeted: 0
        }
    }

    componentDidMount() {
        this.fetchCustomers()
    }

    onOpenModal(type, id) {
        this.setState({ 
            [type]: true,
            editing: id
         });
    };
     
    onCloseModal(type) {
        this.setState({ 
            [type]: false,
            editing: 0 
        });
    };

    targetCustomer(id) {      
        this.setState({targeted: id})
    }

    fetchCustomers() {
        fetch('/api/customers').then(res=> {
            return res.json()
        }).then(customers=> {
            this.setState({customers})          
        }).catch(err=> console.log(err))
    }

    onEditCustomer(id) {
        fetch(`/api/customers/${id}`)
        .then(res=> {
            return res.json()
        })
        .then(customer=> {
            let form = document.getElementById('editForm').elements
            form[0].value = customer.name;
            form[1].value = customer.address;
            form[2].value = customer.phone;
        })
        .catch(err=> console.log(err))   
    }

    onEditCustomerConfirm(form){
        let data = {}
        let x = [...form.elements].forEach(item=> {
            if(!item.name) return
            data[item.name] = item.value
        })
        fetch(`/api/customers/${this.state.targeted}`, 
        {
            method: 'PUT',    
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(data)
        }
        ).then(res=> {
            this.onCloseModal('editModal')
            this.fetchCustomers()
            return res.json()
        }).catch(err=> console.log(err))
    }

    onDeleteCustomer(id) {        
        fetch(`/api/customers/${id}`, 
            {
                method: 'DELETE',    
            }
        ).then(res=> {
            this.onCloseModal('deleteModal')
            this.fetchCustomers()
            return res.json()
        }).catch(err=> console.log(err))    
    }

    onAddCustomer(form) {
        //To collect form
        let data = {}
        let x = [...form.elements].forEach(item=> {
            if(!item.name) return
            data[item.name] = item.value
        })
        fetch('/api/customers', 
            {
                method: 'POST',    
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(data)
            }
        ).then(res=> {
            this.onCloseModal('addModal')
            this.fetchCustomers()
            return res.json()
        }).catch(err=> console.log(err))
    }
    
    render() {
        let customers = this.state.customers.map(customer => {
            return <Customer
                        key={customer.id}  
                        id={customer.id} 
                        name={customer.name} 
                        address={customer.address} 
                        phone={customer.phone}
                        editHandler={()=>{
                            this.onEditCustomer(customer.id)
                            this.onOpenModal('editModal', customer.id)
                        }}
                        deleteHandler={()=>{
                            this.onOpenModal('deleteModal', customer.id)
                        }}
                        targetHandler={(id)=>{
                            this.targetCustomer(id)
                        }}
                        />
        })

        return (
            <div className="container customers">
                <h1>Customer List</h1>
                <Button variant="outline-dark" onClick={()=>{this.onOpenModal('addModal')}}>Add</Button> 
                <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {customers}
                </tbody>
                </Table>
                <Modal open={this.state.editModal} onClose={()=>{this.onCloseModal('editModal')}} center>
                    <h3>Edit customer</h3>
                    <Form onSubmit={(e)=>{
                            e.preventDefault()
                            this.onEditCustomerConfirm(e.target);    
                        }} id="editForm">
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" placeholder="Address" />
                        </Form.Group>
                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" name="phone" placeholder="Phone" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal>
                <Modal open={this.state.deleteModal} onClose={()=>{this.onCloseModal('deleteModal')}} center>
                    <h3>Delete customer</h3>
                    <p>Confirm Customer deletion?</p>
                    <Button variant="danger" onClick={()=>{this.onDeleteCustomer(this.state.targeted)}}>Delete</Button>
                    <Button variant="outline-primary" onClick={()=>{this.onCloseModal('deleteModal')}}>Cancel</Button>
                </Modal>
                <Modal open={this.state.addModal} onClose={()=>{this.onCloseModal('addModal')}} center>
                    <h3>Add customer</h3>
                    <Form onSubmit={(e)=>{
                            e.preventDefault()
                            this.onAddCustomer(e.target);    
                        }}>
                        <Form.Group controlId="addFormName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group controlId="addFormAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" placeholder="Address" />
                        </Form.Group>
                        <Form.Group controlId="addFormPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" name="phone" placeholder="Phone" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Customers;
