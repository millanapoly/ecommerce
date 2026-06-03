import { createBrowserRouter, Navigate } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Account } from './pages/Account';
import { About } from './pages/About';
import { Delivery } from './pages/Delivery';
import { LoyaltyProgram } from './pages/LoyaltyProgram';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: RootLayout,
      children: [
        {
          path: '/',
          Component: Layout,
          children: [
            { index: true, element: <Navigate to="home" replace /> },
            { path: 'home', Component: Home },
            { path: 'catalog', Component: Catalog },
            { path: 'product/:id', Component: ProductDetail },
            { path: 'cart', Component: Cart },
            { path: 'checkout', Component: Checkout },
            { path: 'order-success/:orderNumber', Component: OrderSuccess },
            { path: 'account', Component: Account },
            { path: 'loyalty', Component: LoyaltyProgram },
            { path: 'about', Component: About },
            { path: 'delivery', Component: Delivery },
          ],
        },
        {
          path: '/login',
          Component: Login,
        },
        {
          path: '/register',
          Component: Register,
        },
      ],
    },
  ],
  {
    basename: '/ecommerce',
  }
);
