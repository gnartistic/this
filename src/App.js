import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import TaskList from './components/TaskList';
import Layout from './components/Layout'



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path='/tasklist' element={<TaskList/>}/>
        </Route>
        </Routes>
    </>
  );
}

export default App;
