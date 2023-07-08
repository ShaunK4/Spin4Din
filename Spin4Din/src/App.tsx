import RecipeList from "./components/RecipeList";
import { LinearTextGradient } from "react-text-gradients-and-animations";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-h1">
          <LinearTextGradient
            angle={96}
            colors={["#fffcff", "#cbbacc"]}
            animate={true}
            animateDirection={"horizontal"}
            animateDuration={9}
          >
            Spin4Din
          </LinearTextGradient>
        </h1>
      </header>
      <main className="app-main">
        <RecipeList />
        {/* Recipe display component and other content will go here */}
      </main>
    </div>
  );
}

export default App;
