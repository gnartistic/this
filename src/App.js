import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Todo from './components/Todo';



function App ()
{
  return (
    <>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/todo' element={<Todo />} />
      </Routes>
    </>
  );
}

export default App;
