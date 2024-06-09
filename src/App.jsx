
import { Navigate, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/auth.context';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

import Homepage from './pages/Homepage';
import Friends from './pages/FriendsPage';
import Groups from './pages/GroupsPage';
import IsAnon from './components/IsAnon';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import About from './pages/AboutPage';
import User from './pages/UserPage';
import Recents from './pages/RecentsPage';
import Expenses from './pages/ExpensesPage';

function App() {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <div className="flex h-screen">
      { isLoggedIn && (
        <>
          <Sidebar />
          <Header />
        </>
      )}
      <Routes>
        <Route 
          path='/user' 
          element={ isLoggedIn ? <User/> : <Navigate to='/signup' />} 
        />
        <Route 
          path='/about' 
          element={ isLoggedIn ? <About/> : <Navigate to='/signup' />} 
        />
        <Route 
          path='/' 
          element={ isLoggedIn ? <Homepage/> : <Navigate to='/signup' />} 
        />
        <Route 
          path='/friends' 
          element={ isLoggedIn ? <Friends/> : <Navigate to='/signup' />} 
        />
        <Route 
          path='/groups' 
          element={ isLoggedIn ? <Groups/> : <Navigate to='/signup' />} 
        />
        <Route 
          path='/recents' 
          element={ isLoggedIn ? <Recents/> : <Navigate to='/signup' />} 
        />
        <Route 
          path='/expenses' 
          element={ isLoggedIn ? <Expenses/> : <Navigate to='/signup' />} 
        />
      
        <Route path='/signup' element={<IsAnon> <SignupPage/> </IsAnon>} />
        <Route path='/login' element={<IsAnon> <LoginPage/> </IsAnon>} />

      </Routes>
    </div>
  );
}

export default App;

{/* <div class="bg-white rounded-md absolute top-44 bottom-8 left-4 right-8 flex flex-row items-center flex items-center justify-between justify-center">

</div> */}