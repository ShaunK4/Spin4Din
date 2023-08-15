import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/Store";
import RecipeList from "./components/RecipeList";
import AllRecipes from "./components/AllRecipes";
import Navigationbar from "./components/Navbar";
import GroceryList from "./components/GroceryList";
import { LinearTextGradient } from "react-text-gradients-and-animations";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Navigationbar />
        <header className="app-header">
          <h1 className="app-h1">
            <LinearTextGradient
              angle={96}
              colors={["#fffcff", "#cbbacc"]}
              animate={true}
              animateDirection={"horizontal"}
              animateDuration={7}
            >
              Spin4Din
            </LinearTextGradient>
          </h1>
        </header>
        <main className="app-main">
          <Router>
            <Routes>
              <Route path="/" element={<RecipeList />} />
              <Route path="/All" element={<AllRecipes />} />
              <Route path="/GroceryList" element={<GroceryList />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </main>
      </div>
    </Provider>
  );
}

export default App;
