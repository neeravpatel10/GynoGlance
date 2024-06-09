import React, { useState } from 'react';
import axios from 'axios';
import './ImageUpload.css';
import Navbar from '../Nav/TopNavbar';

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState(null);

    const handleFileChange = (event) => {
        console.log("File selected:", event.target.files[0]);
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            console.log("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            console.log("Sending request to backend");
            const response = await axios.post('http://127.0.0.1:8000/api/predict/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                responseType: 'blob'
            });

            console.log("Received response from backend", response);
            const imageBlob = response.data;
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setPrediction(imageObjectURL);
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="image-upload-container">
                <h1>Image Prediction</h1>
                <form className="image-upload-form" onSubmit={handleSubmit} method="POST">
                    <input type="file" onChange={handleFileChange} accept="image/*" />
                    <button type="submit">Predict</button>
                </form>
                {prediction && (
                    <div className="prediction-result">
                        <h2>Prediction Result:</h2>
                        <img src={prediction} alt="Prediction Result" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
