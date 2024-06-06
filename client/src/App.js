import React from 'react';
import './App.css';
import RowDisplay from './RowDisplay';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h4>Excel Rows Viewer</h4>
            </header>
            <main>
                <RowDisplay />
            </main>
        </div>
    );
}

export default App;
