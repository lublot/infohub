import './App.css';
import Header from './components/Layout/Header'
import UserProvider from './contexts/UserContext'
import UserSection from './components/Layout/UserSection';
import RepositorySection from './components/Layout/RepositorySection';
import RepositoryProvider from './contexts/RepositoryContext';

function App() {
  return (
    <RepositoryProvider>
      <UserProvider>
        <div className="App">
          <div className="App-container">
            <Header />
            <UserSection></UserSection>
            <RepositorySection></RepositorySection>
          </div>
        </div>
      </UserProvider>
    </RepositoryProvider>
  );
}

export default App;
