const backend = 'https://willingunhealthycoins.liampenny5.repl.co'; // replace with your actual Replit URL
const socket = io(backend);

function signup() {
  fetch(`${backend}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: user.value, password: pass.value })
  }).then(r => r.text()).then(alert);
}

function login() {
  fetch(`${backend}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: user.value, password: pass.value })
  }).then(r => {
    if (r.ok) alert('Logged in!');
    else alert('Login failed');
  });
}

function send() {
  socket.emit('chat message', `${user.value}: ${msg.value}`);
  msg.value = '';
}

socket.on('chat message', msg => {
  const li = document.createElement('li');
  li.textContent = msg;
  messages.appendChild(li);
});

// Fetch and show chat history
fetch(`${backend}/messages`)
  .then(r => r.json())
  .then(data => {
    data.forEach(msg => {
      const li = document.createElement('li');
      li.textContent = msg;
      messages.appendChild(li);
    });
  });
