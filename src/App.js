import './App.css';
import Header from './components/Layout/Header'
import UserProvider from './contexts/UserInfoContext'
import AppBody from './components/Layout/AppBody';

import PaginationProvider from './contexts/PaginationContext';

function App () {
  return (
    <PaginationProvider>
      <UserProvider>
        <div className="App">
          <div className="App-container">
            <Header />
            <AppBody/>
          </div>
        </div>
      </UserProvider>
    </PaginationProvider>
  );
}

export default App;
