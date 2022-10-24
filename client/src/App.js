import './App.css';
import { Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import Home from './components/Home';
import CreateUser from './components/CreateUser';
import User from './components/User';
import Corona from './components/Corona';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/create-user' element={<CreateUser />} />
          <Route path='/user/:id' element={<User />} />
          <Route path='/corona/:id' element={<Corona />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
