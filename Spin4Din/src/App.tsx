import RecipeList from "./components/RecipeList";

function App() {
  return (
    <div className="app">
      <header>
        <h1>Spin4Din</h1>
      </header>
      <main>
        <RecipeList />
        {/* Recipe display component and other content will fo here */}
      </main>
    </div>
  );
}

export default App;
