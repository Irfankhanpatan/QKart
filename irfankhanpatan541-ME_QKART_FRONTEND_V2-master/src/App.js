import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import Login from "./components/Login"
import { Switch,Route,Router } from "react-router-dom";
import Products  from "./components/Products";



export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    <Switch>
   <div className="App">
          
          <Route exact path="/register" component={Register} /> 
          {/* <Route exact path="/login" component={Login} />  */}
          <Route exact path="/login"> <Login /> </Route>
          <Route exact path="/" component={Products} /> 
    </div>
    </Switch>
  );
}

export default App;
