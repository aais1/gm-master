import React from "react";

const SettingsPanel = ({ gridSettings, setGridSettings }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setGridSettings((prev) => ({
            ...prev,
            [name]: name === 'opacity' || name === 'thickness' || name === 'rows' || name === 'columns' ? Number(value) : value,
        }));
    };

    const handleDownload = () => {
        alert('Download functionality is not yet implemented.');
    };

    return (
        <div className="flex flex-col space-y-2 py-8 md:py-0 md:w-full w-[90vw] mx-auto">
            <div className="bg-gray-800 text-black border-red-900 border-[2px] rounded-lg text-center p-2">
                <h3 className="text-2xl font-semibold mb-4 text-white text-center">SETTINGS</h3>
                <div className="flex items-center justify-between mb-4 ">
                    <label className="text-white">Grid Type</label>
                    <select
                        name="gridType"
                        value={gridSettings.gridType}
                        onChange={handleChange}
                        className="bg-white rounded-lg text-center p-1"
                    >
                        <option value="square">Square</option>
                        <option value="hexagonal">Hexagonal</option>
                    </select>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <label className="text-white">Color</label>
                    <input
                        name="color"
                        type="color"
                        value={gridSettings.color}
                        onChange={handleChange}
                        className="h-7 w-[80px]"
                    />
                </div>
                <div className="flex items-center justify-between mb-4">
                    <label className="text-white">Opacity</label>
                    <input
                        name="opacity"
                        type="number"
                        className="w-16 bg-white rounded-lg text-center p-1"
                        value={gridSettings.opacity}
                        min={0}
                        max={100}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center justify-between mb-4">
                    <label className="text-white">Rows</label>
                    <input
                        name="rows"
                        type="number"
                        min="1"
                        value={gridSettings.rows}
                        onChange={handleChange}
                        className="w-16 bg-white rounded-lg text-center p-1"
                    />
                </div>
                <div className="flex items-center justify-between mb-4">
                    <label className="text-white">Columns</label>
                    <input
                        name="columns"
                        type="number"
                        min="1"
                        value={gridSettings.columns}
                        onChange={handleChange}
                        className="w-16 bg-white rounded-lg text-center p-1"
                    />
                </div>
                <div className="flex items-center justify-between mb-4">
                    <label className="text-white">Thickness</label>
                    <input
                        name="thickness"
                        type="number"
                        min="1"
                        value={gridSettings.thickness}
                        onChange={handleChange}
                        className="w-16 bg-white rounded-lg text-center p-1"
                    />
                </div>
            </div>

            <div className="bg-gray-800 border-red-900 border-[2px] rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-white text-center">CREATE & DOWNLOAD</h3>
                <button
                    onClick={handleDownload}
                    className="w-full bg-[#df0000] text-white py-3 px-4 rounded-full text-center"
                >
                    DOWNLOAD MAP →
                </button>
            </div>
        </div>
    );
};

export default SettingsPanel;
