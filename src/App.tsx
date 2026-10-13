import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Catalog from './components/Catalog'
import Reset from './components/Reset'
import Layout from './components/Layout'

const App = () => {
  let router=createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children:[
        {
          index: true,
          element: <Catalog/>
        },
        {
          path:'/about',
          element:<Reset/>
        }
      ]
    }

  ]
    
 )

  return (
    <RouterProvider router={router} />    
  )
}

export default App