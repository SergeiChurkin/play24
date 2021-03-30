import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddEvent from "./components/Event/AddEvent";
import Landing from "./components/Landing";
import { Provider } from "react-redux";
import store from "./store";
import UpdateEvent from "./components/Event/UpdateEvent";
import ShowEvent from "./components/Event/ShowEvent";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <div className="container">
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addEvent/" component={AddEvent} />
            <Route exact path="/updateEvent/:id" component={UpdateEvent} />
            <Route exact path="/showEvent/:id" component={ShowEvent}/>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
