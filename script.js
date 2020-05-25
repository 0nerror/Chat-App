const socket = io('http://192.168.1.2:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name?')
homeMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    awayMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    awayMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
    awayMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    homeMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function homeMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.setAttribute('class', 'talk-bubble-home tri-right border round btm-left-in')
    const newId = uuidv4()
    messageElement.setAttribute('id', newId)
    messageContainer.append(messageElement)
    const lineBreak = document.createElement("br")
    messageContainer.append(lineBreak)

    const textContainer = document.getElementById(newId)
    const textElement = document.createElement('div')
    textElement.setAttribute('class', 'talktext')
    textElement.innerText = message
    textContainer.append(textElement)
}

function awayMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.setAttribute('class', 'talk-bubble-away tri-right border round btm-right-in away-message')
    const newId = uuidv4()
    messageElement.setAttribute('id', newId)
    messageContainer.append(messageElement)
    const lineBreak = document.createElement("br")
    messageContainer.append(lineBreak)

    const textContainer = document.getElementById(newId)
    const textElement = document.createElement('div')
    textElement.setAttribute('class', 'talktext')
    textElement.innerText = message
    textContainer.append(textElement)
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }