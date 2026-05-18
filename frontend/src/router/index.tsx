import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import MarketPage from '../pages/MarketPage'
import InventoryPage from '../pages/InventoryPage'
import ItemDetailPage from '../pages/ItemDetailPage'
import PurchasePage from '../pages/PurchasePage'

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/market', element: <MarketPage /> },
  { path: '/inventory', element: <InventoryPage /> },
  { path: '/item/:id', element: <ItemDetailPage /> },
  { path: '/purchase/:id', element: <PurchasePage /> },
])
