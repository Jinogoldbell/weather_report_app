import "./App.css";
import Weather from "./components/Weather";

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Weather Report</p>
        <h1>Know before you go outside.</h1>
        <p className="subhead">
          Search any city and get its current temperature, conditions, and
          feel in seconds.
        </p>
      </header>

      <main className="app-main">
        <Weather />
      </main>

      <footer className="app-footer">
        <p>
          Data from{" "}
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noreferrer"
          >
            OpenWeatherMap
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
