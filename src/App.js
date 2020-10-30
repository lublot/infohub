import logo from './logo.svg';
import './App.css';
import Header from './components/Layout/Header'
import UserProvider from './contexts/UserContext'
import UserSection from './components/Layout/UserSection';
import RepositorySection from './components/Layout/RepositorySection';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <div className="App-container">
          <Header />
          <UserSection></UserSection>
          <RepositorySection></RepositorySection>
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
