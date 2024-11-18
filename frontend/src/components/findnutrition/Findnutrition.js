import React, { useState } from 'react';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import Base64 from 'base64-js';
import MarkdownIt from 'markdown-it';
import './Findnutrition.css';
import nutri from './nutrition.jpg';
import { CiGlass } from 'react-icons/ci';

const API_KEY = process.env.REACT_APP_API_KEY;


function Findnutrition() {
  const [output, setOutput] = useState('Awaiting generation...');
  const [image, setImage] = useState(null);
  const [foodName,setFoodName]=useState('')
  const [furl,setFurl]=useState('');
  const md = new MarkdownIt();

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(URL.createObjectURL(file));
    }
  };

  const getFirstWord=(text) => {
    return text.split(' ')[0];
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setOutput('Generating...');

    try {
      // Convert image to Base64
      const response = await fetch(image);
      const buffer = await response.arrayBuffer();
      let imageBase64 = Base64.fromByteArray(new Uint8Array(buffer));

      // Prepare prompt contents
      const contents = [
        {
          role: 'user',
          parts: [
            { inline_data: { mime_type: 'image/jpeg', data: imageBase64 } },
            { text: "Provide the example ingredients and nutritional value (proteins, carbohydrates, vitamins, calcium, fat) for the food in the image. Display the food name at the start, do not mention the values are approximate." },
          ],
        },
      ];

      // Call the Google Gemini API
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
        ],
      });

      const result = await model.generateContentStream({ contents });

      // Process the response stream and render Markdown
      let bufferArray = [];
      for await (let response of result.stream) {
        bufferArray.push(response.text());
        const fullOutput = bufferArray.join('');
        setFurl(getFirstWord(fullOutput))
        setOutput(md.render(fullOutput));

        // Extract food name (first word of the response)

      }

    } catch (error) {
      setOutput('Error: ' + error.message);
    }
  };

  return (
    <div className="App d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light text-dark">
      <header className="App-header text-center p-4 shadow rounded bg-white" style={{ maxWidth: "500px", width: "90%" }}>
        <img
          src={nutri}
          className="mb-3"
          alt="nutrition"
          style={{ height: "80px" }}
        />
        <h1 className="display-6 text-success mb-4">NUTRI_NEST</h1>
        <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
          <div
            className="drop-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('file-upload').click()}
          >
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
              style={{ display: 'none' }}
            />
            {image ? (
              <img src={image} alt="Uploaded" className="uploaded-image" />
            ) : (
              <p>Drag & drop an image here or click to upload</p>
            )}
          </div>
          <button type="submit" className="btn btn-success w-50 fw-bold mt-4">
            Generate
          </button>
        </form>
        <div>
          <a href={furl}>Link to know more about your food</a>
        </div>
        <div
          className="output mt-4 p-3 bg-light rounded text-muted"
          dangerouslySetInnerHTML={{ __html: output }}
          style={{ width: "100%", fontSize: "0.9rem" }}
        />
      </header>
    </div>
  );

}

export default Findnutrition