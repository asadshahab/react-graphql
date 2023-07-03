import './App.css';
import Customers from './pages/customers';
import CreateLink from './components/create-customer';
import GetCustomer from './components/get-customer';

function App() {
  return (
    <div className="App">
      {/* < Customers />
      < CreateCustomer/> */}
      {/* < GetCustomer /> */}
      <CreateLink />
    </div>
  );
}

export default App;
