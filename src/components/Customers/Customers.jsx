import React, { Component } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import {collectForm} from './../../helpers/formHelpers';

import EditCustomer from './../Modals/EditCustomer'
import DeleteConfirm from '../Modals/DeleteConfirm'
import AddCustomer from './../Modals/AddCustomer'
import TableEntry from './../TableEntry/TableEntry';

class Customers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customers: [],
            editModal: false,
            deleteModal: false,
            addModal: false,
            fetchError: false,
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
        this.setState({fetchError:false}, ()=> fetch('/api/customers').then(res=> {
            return res.json()
        }).then(customers=> {
            this.setState({customers})          
        }).catch(err=> {
            this.setState({fetchError:true})
            console.log(err)
        }))
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
        fetch(`/api/customers/${this.state.targeted}`, 
        {
            method: 'PUT',    
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(collectForm(form))
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
        fetch('/api/customers', 
            {
                method: 'POST',    
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(collectForm(form))
            }
        ).then(res=> {
            this.onCloseModal('addModal')
            this.fetchCustomers()
            return res.json()
        }).catch(err=> console.log(err))
    }
    
    render() {
        if(this.state.fetchError) return <h4>Fetching error, try again</h4>
        let customers = this.state.customers.map(customer => {
            return <TableEntry
                        key={customer.id}
                        fields={{
                            id: customer.id,
                            name: customer.name,
                            address: customer.address,
                            phone: customer.phone,
                        }}  
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
                <EditCustomer open={this.state.editModal} onCloseModal={name=>this.onCloseModal(name)} onEditCustomerConfirm={(form)=>this.onEditCustomerConfirm(form)} />
                <AddCustomer open={this.state.addModal} onCloseModal={name=>this.onCloseModal(name)} onAddCustomer={(form)=>this.onAddCustomer(form)} />
                <DeleteConfirm title="Delete customer" open={this.state.deleteModal} onCloseModal={name=>this.onCloseModal(name)} onDelete={()=>this.onDeleteCustomer(this.state.targeted)} />
            </div>
        );
    }
}

export default Customers;
