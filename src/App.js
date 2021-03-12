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
  const [file, setFile] = useState(zebra)

  const classifyImg = () => {
    const classifier = ml5.imageClassifier('MobileNet', () => console.log('model loaded'))
    // Make the AI prediction
    classifier.predict(imageRef.current, 3, (err, results) => {
      console.log(results)
      if (results)
        setPrediction(results)
    })
  }

  useEffect(() => {
    classifyImg()
  }, [file])

  const fileSelectHandler = (event) => {
    setPrediction([])
    console.log(event)
    let selectedFile = event.target.files[0]
    console.log('selectedFile', selectedFile)
    let reader = new FileReader()

    reader.onload = function (event) {
      console.log('reader.onload', event)
      imageRef.current.src = event.target.result
    }
    setFile(selectedFile)
    reader.readAsDataURL(selectedFile)
  }

  return (
    <div className='app'>
      <h1>Machine learning App!</h1>
      <p>try uploading your own pictures!</p>
      <br/>
      <input type='file' onChange={fileSelectHandler} />
      <br/>
      <img ref={imageRef} className='candidate-image' src={file} alt=''/>
      <br/>
      <p>ml5's Artifical Intelligence image classifier model thinks this is an image of a...</p>
      <br/>
      {prediction && prediction.length === 0 ? (
        <img className='loading-animation-image' src={loading} alt=''/>
      ) : (
        <ul>
          {prediction.map(({ label, confidence}) => (
            <li key={uuidv4()}>
              <span><b>Label:</b> {label}</span>
              <span><b>Confidence:</b> {confidence.toFixed(5)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
