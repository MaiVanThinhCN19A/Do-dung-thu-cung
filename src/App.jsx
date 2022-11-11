import Footer from 'components/Footer';
import Header from 'components/Header';
import AdminPage from 'features/Admin';
import FeatureProduct from 'features/Home/components/FeatureProduct';
import HomeProduct from 'features/Home/components/HomeProduct';
import HotPromotion from 'features/Home/components/HotPromotion';
import SlideHome from 'features/Home/components/SlideHome';
import ProductList from 'features/Product/components/ProductList';
import ProductPage from 'features/Product/page/ProductPage';
//import Home from 'features/Home';
import React, { Fragment, Suspense } from 'react';             
import { Route, Switch } from 'react-router';

 const Home = React.lazy(() => import('features/Home'));
const Cart = React.lazy(() => import('features/Cart'));
const Product = React.lazy(() => import('features/Product'));
const User = React.lazy(() => import('features/User'));
const NotFound = React.lazy(() => import('features/NotFound'));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<div className='loading-lazy'/>}>
        <Switch>
          <Route path='/admin' component={AdminPage} />
          <Route>
         <Header />
           
            {/* <SlideHome/>
           /
            <HotPromotion/>
            <FeatureProduct/> <HomeProduct/>
            <ProductPage/> */}
            <main>
              <Switch>
              <Route path='/' exact component={Home} />  
                <Route path='/product' component={Product} />
              <Route path='/cart' component={Cart} />
                
                  <Route path='/user' component={User} />
                 {/*<Route component={NotFound} />*/}
              </Switch>
            </main> 
            <Footer />
          </Route>
        </Switch>
      </Suspense>
    </Fragment>
  );
}

export default App;
