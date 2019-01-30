import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from './components/Navigation/Navigation';
import Customers from './components/Customers/Customers';
import Goods from './components/Goods/Goods';


class Shop extends React.Component {
    render() {
        return (
            <div className="shop">                
                <Router>
                    <React.Fragment>
                    <Navigation />
                        <React.Fragment>
                            <Route path="/customers" exact component={Customers} />
                            <Route path="/goods" component={Goods} />   
                        </React.Fragment>                  
                    </React.Fragment>                  
                </Router>
            </div>
        )
    }
}

export default Shop;