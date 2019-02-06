import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import {collectForm} from './../../helpers/formHelpers';

import TableEntry from '../TableEntry/TableEntry';
import EditProduct from './../Modals/EditProduct'
import DeleteConfirm from '../Modals/DeleteConfirm'
import AddProduct from './../Modals/AddProduct'

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            editModal: false,
            deleteModal: false,
            addModal: false,
            editing: 0,
            targeted: 0
        }
    }

    componentDidMount() {
        this.fetchProducts()
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

    targetProduct(id) {      
        this.setState({targeted: id})
    }

    fetchProducts() {
        fetch('/api/products').then(res=> {
            return res.json()
        }).then(products=> {
            this.setState({products})          
        }).catch(err=> console.log(err))
    }

    onEditProduct(id) {
        fetch(`/api/products/${id}`)
        .then(res=> {
            return res.json()
        })
        .then(product=> {
            let form = document.getElementById('editForm').elements
            form[0].value = product.name;
            form[1].value = product.price;
        })
        .catch(err=> console.log(err))   
    }

    onEditProductConfirm(form){
        fetch(`/api/products/${this.state.targeted}`, 
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
            this.fetchProducts()
            return res.json()
        }).catch(err=> console.log(err))
    }

    onDeleteProduct(id) {        
        fetch(`/api/products/${id}`, 
            {
                method: 'DELETE',    
            }
        ).then(res=> {
            this.onCloseModal('deleteModal')
            this.fetchProducts()
            return res.json()
        }).catch(err=> console.log(err))    
    }

    onAddProduct(form) { 
        fetch('/api/products', 
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
            this.fetchProducts()
            return res.json()
        }).catch(err=> console.log(err))
    }
    
    render() {
        let products = this.state.products.map(product => {
            return <TableEntry
                        key={product.id}  
                        fields={{
                            id: product.id,
                            name: product.name,
                            price: product.price
                         }} 
                        editHandler={()=>{
                            this.onEditProduct(product.id)
                            this.onOpenModal('editModal', product.id)
                        }}
                        deleteHandler={()=>{
                            this.onOpenModal('deleteModal', product.id)
                        }}
                        targetHandler={(id)=>{
                            this.targetProduct(id)
                        }}
                        />
        })

        return (
            <div className="container customers">
                <h1>Products List</h1>
                <Button variant="outline-dark" onClick={()=>{this.onOpenModal('addModal')}}>Add</Button> 
                <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products}
                </tbody>
                </Table>
                <EditProduct open={this.state.editModal} onCloseModal={name=>this.onCloseModal(name)} onEditProductConfirm={(form)=>this.onEditProductConfirm(form)} />
                <AddProduct open={this.state.addModal} onCloseModal={name=>this.onCloseModal(name)} onAddProduct={(form)=>this.onAddProduct(form)} />
                <DeleteConfirm title="Delete product" open={this.state.deleteModal} onCloseModal={name=>this.onCloseModal(name)} onDelete={()=>this.onDeleteProduct(this.state.targeted)} />
            </div>
        );
    }
}

export default Products;
