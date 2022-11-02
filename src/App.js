import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
//https://www.youtube.com/watch?v=Flo268xRpV0
function App() {
  const a = 2
  const b = 1
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ul>
          <li>Apple</li>
          <li>Banana</li>
          <li>Kiwi</li>
        </ul>
        <h1 data-testid="mytestid">Hello</h1>
        <span title="sum">{a + b}</span>
      </header> */}
      <Login />
    </div>
  );
}

export default App;
