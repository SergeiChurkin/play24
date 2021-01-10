import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddEvent from "./components/Event/AddEvent";
import Landing from "./components/Landing";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Route exact path="/" component={Landing} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/addEvent" component={AddEvent} />
        </div>
      </div>
    </Router>
  );
}

export default App;
