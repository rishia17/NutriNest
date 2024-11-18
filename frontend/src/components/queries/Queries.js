import React, { useState } from 'react';
import './Queries.css';
import { marked } from 'marked';
import { GoogleGenerativeAI } from '@google/generative-ai';
import SpeechToText from '../speechtotext/SpeechToText'; // Import the SpeechToText component

const Queries = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const result = await model.generateContent(query);
      const formattedResponse = marked(result.response.text());

      setResponses(prevResponses => [
        ...prevResponses,
        { query, response: formattedResponse }
      ]);

      setQuery(''); // Clear the input field after submission
    } catch (error) {
      console.error('Error:', error);
      setResponses(prevResponses => [
        ...prevResponses,
        { query, response: 'An error occurred. Please try again later.' }
      ]);
      setQuery(''); // Clear the input field even on error
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="queriesContainer container">
      <h2 className="m-2 p-2 mainhelp">Ask a Question</h2>
     
      <form onSubmit={handleSubmit} className="queriesForm w-100">
        <div className="d-flex gap-4 w-100">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Enter your query here"
            className="w-100 queriesInput form-control"
          />
          <button type="submit" className="queriesButton btn btn-primary">
            Submit
          </button>
        </div>
        
      </form>
      <div className='m-2'>
      <SpeechToText setQuery={setQuery} /> {/* Include SpeechToText component */}
      </div>
      <div className="queriesResponse">
        {responses.map((item, index) => (
          <div key={index} className="responseItem mb-4">
            <h4 className="responseQuery" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
              Query: {item.query}
            </h4>
            <div 
              dangerouslySetInnerHTML={{ __html: item.response }} 
              style={{ textAlign: 'left' }} 
            />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Queries;
