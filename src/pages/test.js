import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  // In your React component
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/data");
      const data = await response.json();
      setData(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from SQLite</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
