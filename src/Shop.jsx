import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Navigation from './components/Navigation/Navigation';
import Customers from './components/Customers/Customers';
import Products from './components/Products/Products';


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
            </div>
        )
    }
}

export default Shop;