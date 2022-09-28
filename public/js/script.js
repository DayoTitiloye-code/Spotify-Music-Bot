'use strict'
// Setup Speech Recognition

// https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/interimResults
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition()

recognition.lang = 'en-GB'
recognition.interimResults = false
recognition.maxAlternatives = 1

const outputYou = document.querySelector('.output-you')
document.querySelector('.playlist').style.visibility = 'hidden'

// Add event listener - start recognition

document.querySelector('button').addEventListener('click', () => {
  recognition.start()
})

//https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
recognition.addEventListener('speechstart', () => {
  console.log('Speech has been detected.')
})

recognition.addEventListener('result', (e) => {
  console.log('Result has been detected.')

  // Obtain text from result
  //https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionEvent/results

  let last = e.results.length - 1

  outputYou.textContent = text
  console.log('Speech recognition confidence: ' + e.results[0][0].confidence)

  let text = e.results[last][0].transcript
  // Call emotion detection API
  const getEmotion = fetch(
    'https://emotion-detection-api-c7aaatrzsq-ew.a.run.app/predict?text=' + text
  )

  getEmotion
    .then((response) => response.json())
    .then((data) => {
      // Log the emotion
      const emotion = data['label']
      console.log('Emotion: ' + emotion)

      const score = data['score']
      console.log('Emotion score: ' + score)

      // Display playlists
      switch (emotion) {
        case 'joy':
          document.querySelector('.playlist').src =
            'https://open.spotify.com/embed/playlist/66F0QrPzMPE9zCj8S1JZ1q?utm_source=generator&theme=0'
          break
        case 'love':
          document.querySelector('.playlist').src =
            'https://open.spotify.com/embed/playlist/64v2LytooaaE1b5ogu0uMo?utm_source=generator&theme=0'
          break
      }

      document.querySelector('.playlist').style.visibility = 'visible'
    })
    .catch((error) => {
      console.error(error)
    })
})

recognition.addEventListener('speechend', () => {
  recognition.stop()
})

recognition.addEventListener('error', (e) => {
  console.log('Error: ' + e.error)
})
