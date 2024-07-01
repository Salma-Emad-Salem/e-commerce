
import { RouterProvider , createBrowserRouter } from 'react-router-dom';
import MainLayout from './component/MainLayout/MainLayout';
import Home from './component/Home/Home';
import Products from './component/Products/Products';
import Categories from './component/Categories/Categories'
import Brands from './component/Brands/Brands';
import Cart from './component/Cart/Cart';
import SignIn from './component/SignIn/SignIn';
import SignUp from './component/SignUp/SignUp';
import AuthLayout from './component/AuthLayout/AuthLayout';
import NotFound from './component/NotFound/NotFound';
import {Offline} from 'react-detect-offline';
import ProductRoutes from './ProductRoutes/ProductRoutes';
import ProductDetails from './component/ProductDetails/ProductDetails';
import CartContainr from './context/CartContext';
import Address from './component/AdressInfo/Address'
import CashOrder from './component/CashOrder/CashOrder';
import WishLIstContainr from './context/WishList';
import WichList from './component/wishList/WichList';
import ForgetPassword from './component/forgetpassword/ForgetPassword';
import ResetPassword from './component/ResetPassword/ResetPassword'
import NewPass from './component/NewPassword/NewPass';
import './App.css';



function App() {
  let routes = createBrowserRouter([
    {
    path : '/', element:<MainLayout/>,children:[
      {index:true , element:<ProductRoutes> <Home/> </ProductRoutes> },
      {path:'Home', element: <ProductRoutes> <Home/> </ProductRoutes>},
      {path:'Products', element: <ProductRoutes> <Products/> </ProductRoutes>},
      {path:'Categories', element: <ProductRoutes> <Categories/> </ProductRoutes> },
      {path:'Brands', element:<ProductRoutes> <Brands/> </ProductRoutes> },
      {path:'Cart', element: <ProductRoutes >  <Cart/></ProductRoutes>},
      {path:'WichList', element: <ProductRoutes>  <WichList/> </ProductRoutes>},
      {path:'ProductDetails/:MyId', element: <ProductRoutes>  <ProductDetails/> </ProductRoutes>},
      {path:'Address/:id', element: <ProductRoutes>  <Address/> </ProductRoutes>},
      {path:'CashOrder/:id', element: <ProductRoutes>  <CashOrder/> </ProductRoutes>},
      {path : '*',  element: <NotFound/>}


]},
{
    path : '/', element:<AuthLayout/>,children:[
      {path:'SignIn', element: <SignIn/>},
      {path:'SignUp', element: <SignUp/>},
      {path:'forgotPasswords', element: <ForgetPassword/>},
      {path:'ResetPassword', element: <ResetPassword/>},
      {path:'NewPass', element: <NewPass/>},
  ]}
])

  return (
    <>
<CartContainr>
<WishLIstContainr>
<RouterProvider router={routes} />
</WishLIstContainr>
</CartContainr>



    <Offline>
      <div className='offline'>
        You are offline now!
      </div>
    </Offline>
    </>
  );
}

export default App;
