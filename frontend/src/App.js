import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/home/Home';
import Layout from './components/layout/Layout';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Dashboard from './components/dashboard/Dashboard'
import FindNutrition from './components/findnutrition/Findnutrition'
import Queries from './components/queries/Queries'
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
        },
        {
          path:'dashboard',
          element:<Dashboard/>
        },
        {
          path:'find-nutrition',
          element:<FindNutrition/>
        },
        {
          path:'queries',
          element:<Queries/>
        }
      ]
    }
  ]);


  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
