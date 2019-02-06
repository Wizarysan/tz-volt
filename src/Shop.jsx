import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createGlobalStyle } from 'styled-components'

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Navigation from './components/Navigation/Navigation';
import Customers from './components/Customers/Customers';
import Products from './components/Products/Products';

const GlobalStyle = createGlobalStyle`
    .modal-padded {
        padding: 30px;
        button {
            margin-right: 10px;
        }
    }
    .modal-form {
        padding: 20px 30px;
    }
`

class Shop extends React.Component {
    render() {
        return (
            <div className="shop">                
                <Router>
                    <React.Fragment>
                    <Navigation />
                        <ErrorBoundary errorMessage="Something went wrong, try again">
                            <Route path="/customers" exact component={Customers} />
                            <Route path="/products" component={Products} />   
                        </ErrorBoundary>                  
                    </React.Fragment>                  
                </Router>
                <GlobalStyle />
            </div>
        )
    }
}

export default Shop;