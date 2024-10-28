import React from 'react';

const GridOverlay = ({ gridSettings }) => {
    const { gridType, rows, columns, thickness, color, opacity } = gridSettings;

    const style = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // Prevent interaction with the grid overlay
        opacity: opacity / 100, // Convert percentage to decimal
        zIndex: 10, // Ensure it is above the image
    };

    const renderSquareGrid = () => {
        return Array.from({ length: rows }).map((_, rowIndex) =>
            Array.from({ length: columns }).map((_, colIndex) => (
                <rect
                    key={`${rowIndex}-${colIndex}`}
                    x={(100 / columns) * colIndex + '%'}
                    y={(100 / rows) * rowIndex + '%'}
                    width={(100 / columns) + '%'}
                    height={(100 / rows) + '%'}
                    stroke={color}
                    strokeWidth={thickness}
                    fill="none"
                />
            ))
        );
    };

    const renderHexagon = (cx, cy, size) => {
        const angle = (Math.PI / 180) * 60; // 60 degrees
        const points = Array.from({ length: 6 }, (_, i) => {
            const x = cx + size * Math.cos(angle * i);
            const y = cy + size * Math.sin(angle * i);
            return `${x},${y}`;
        }).join(' ');

        return <polygon points={points} stroke={color} strokeWidth={thickness} fill="none" />;
    };

    const renderHexagonalGrid = () => {
        const size = (100 / columns) * 0.5; // Adjust size based on the number of columns
        return Array.from({ length: rows }).map((_, rowIndex) =>
            Array.from({ length: columns }).map((_, colIndex) => {
                // Calculate x and y positions for hexagons
                const xOffset = (size * 1.5) * colIndex + '%'; // Horizontal spacing
                const yOffset = rowIndex % 2 === 0 
                    ? (size * Math.sqrt(3) / 2) * rowIndex + '%'
                    : (size * Math.sqrt(3) / 2) * rowIndex + (size * Math.sqrt(3) / 4) + '%'; // Stagger every second row
                
                return renderHexagon(xOffset, yOffset, size);
            })
        );
    };

    return (
        <div style={style}>
            <svg width="100%" height="100%">
                {gridType === 'square' ? renderSquareGrid() : renderHexagonalGrid()}
            </svg>
        </div>
    );
};

export default GridOverlay;
