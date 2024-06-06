import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RowDisplay.css';

const RowDisplay = () => {
    const [rowIndex, setRowIndex] = useState(1);
    const [rowData, setRowData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRowData(rowIndex);
    }, [rowIndex]);

    const fetchRowData = async (index) => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/row?index=${index}`);
            setRowData(response.data);
            setError(null);  // Reset any previous error
            setLoading(false);
        } catch (error) {
            console.error('Error fetching row data:', error);
            setError('Failed to fetch data.');
            setLoading(false);
        }
    };

    const handlePrev = () => {
        setRowIndex((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const handleNext = () => {
        setRowIndex((prev) => prev + 1);
    };

    const handleJump = (event) => {
        const newIndex = parseInt(event.target.value, 10);
        if (!isNaN(newIndex)) {
            setRowIndex(newIndex);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div>
                <button onClick={handlePrev}>Previous</button>
                <button onClick={handleNext}>Next</button>
                <input
                    type="number"
                    value={rowIndex}
                    onChange={handleJump}
                    min="1"
                />
            </div>
            <div>
                <p>Column A: {rowData.A}</p>
                <p>Column B: {rowData.B}</p>
                <p>Column D: {rowData.D}</p>
                <p>Column E: {rowData.E}</p>
                {rowData.G && (
                    <img
                        src={rowData.G}
                        alt="Row"
                        className="row-image"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'fallback-image-url.jpg'; // Fallback image
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default RowDisplay;
