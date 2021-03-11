import { useRef, useEffect, useState } from 'react'
import './App.css';
import * as ml5 from 'ml5'
import { v4 as uuidv4 } from 'uuid';
import loading from './loading.gif'
import tiger from './tiger.jpg';
import zebra from './zebra.jpg';
import parrot from './parrot.jpg';

function App() {
  const imageRef = useRef()
  const [prediction, setPrediction] = useState([])

  const classifyImg = () => {
    const classifier = ml5.imageClassifier('MobileNet', () => console.log('model loaded'))

    // Make the AI prediction
    classifier.predict(imageRef.current, 5, (err, results) => {
      console.log(results)
      setPrediction(results)
    })
  }

  useEffect(() => {
    classifyImg()
  }, [])

  return (
    <div className='app'>
      <h1>Machine learning App!</h1>

      <input type='file'/>
      <br/>
      <img ref={imageRef} className='candidate-image' src={zebra} alt='' crossOrigin='anonymous'/>
      <br/>
      <p>ml5's Artifical Intelligence image classifier model thinks this is an image of a...</p>
      <br/>

      {prediction.length === 0 ? (
        <img className='loading-animation-image' src={loading} alt=''/>
      ) : (
        <ul>
          {prediction.map(p => (
            <li key={uuidv4()}>
              <span><b>Label:</b> {p.label}</span>
              <span><b>Confidence:</b> {p.confidence.toFixed(5)}%</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
