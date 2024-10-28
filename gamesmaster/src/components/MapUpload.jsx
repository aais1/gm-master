import React, { useCallback, useState } from 'react';
import GridOverlay from './GridOverlay'; // Import your GridOverlay component

const MapUpload = ({ gridSettings }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const containerRef = React.useRef(null);

    const handleFileInputClick = () => {
        document.getElementById('mapUpload').click();
    };

    const handleDrop = useCallback((event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            handleImageUpload(files[0]);
        }
    }, []);

    const handleDragOver = (event) => {
        event.preventDefault();
        containerRef.current.style.border = '4px dashed #df0000';

    };
    const handleDragLeave=(event)=>{
        event.preventDefault();
        containerRef.current.style.border = '1px solid rgb(127 29 29)';
    }

    const handleImageUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageSrc(reader.result);
        };
        reader.readAsDataURL(file);
        containerRef.current.style.border = '1px solid rgb(127 29 29)';
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    return (
        <div className="flex flex-col md:w-full w-[90vw] mx-auto">
            <div 
            ref={containerRef}
                className="flex flex-col min-h-[81vh] items-center justify-center border-red-900 border-[2px] bg-gray-800 rounded-lg p-8 relative" // Make sure this is relative
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                {!imageSrc && (
                    <>
                        <label htmlFor="mapUpload" className="text-3xl font-semibold mb-5">
                            UPLOAD YOUR MAP
                        </label>
                        <input
                            type="file"
                            alt="Upload Image"
                            accept="image/*"
                            hidden
                            id="mapUpload"
                            onChange={handleFileChange}
                        />
                        <button
                            onClick={handleFileInputClick}
                            className="bg-[#df0000] text-white py-2 px-10 text-xl font-semibold rounded-2xl mb-2"
                        >
                            Select your Images
                        </button>
                        <p className="text-gray-400">or drop image here</p>
                    </>
                )}

                {imageSrc && (
                    <>
                        <img
                            src={imageSrc}
                            alt="Uploaded Map"
                            className="absolute inset-0 m-auto z-0" // Center the image and set z-index to 0
                            style={{
                                maxWidth: '100%',
                                maxHeight: '80vh',
                                objectFit: 'contain',
                            }}
                        />
                        <GridOverlay
                            imageSrc={imageSrc}
                            gridSettings={gridSettings}
                            className="absolute inset-0 z-10" // Ensure this is above the image
                        />
                    </>
                )}
            </div>
            <div className="text-right mt-1">
                {imageSrc && (
                    <button
                        onClick={() => {
                            setImageSrc(null); // Clear the image when removing
                        }}
                        className="text-sm underline"
                    >
                        Remove Map
                    </button>
                )}
            </div>
        </div>
    );
};

export default MapUpload;
