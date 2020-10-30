import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import UserProvider from './contexts/UserContext'

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Header/>
      </div>
    </UserProvider>
  );
}

export default App;
