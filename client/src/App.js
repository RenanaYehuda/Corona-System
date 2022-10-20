import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home'
import CreateUser from './components/CreateUser';
import User from './components/User';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/create-user' element={<CreateUser />} />
        <Route path='/user/:id' element={<User />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
