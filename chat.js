const backend = 'https://willingunhealthycoins.liampenny5.repl.co'; // your Replit URL
const socket = io(backend);

let loggedInUser = null;

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
    if (r.ok) {
      alert('✅ Logged in!');
      loggedInUser = user.value;
      // Show chat UI
      chatArea.style.display = 'block';
      loginArea.style.display = 'none';
      loadMessages();
    } else {
      alert('❌ Login failed');
    }
  }).catch(() => alert('❌ Network error'));
}

function send() {
  if (!loggedInUser) {
    alert('Please login first!');
    return;
  }
  if (msg.value.trim() === '') return;
  socket.emit('chat message', `${loggedInUser}: ${msg.value.trim()}`);
  msg.value = '';
}

socket.on('chat message', msg => {
  if (!loggedInUser) return; // ignore messages if not logged in
  const li = document.createElement('li');
  li.textContent = msg;
  messages.appendChild(li);
});

function loadMessages() {
  fetch(`${backend}/messages`)
    .then(r => r.json())
    .then(data => {
      messages.innerHTML = ''; // clear old messages
      data.forEach(msg => {
        const li = document.createElement('li');
        li.textContent = msg;
        messages.appendChild(li);
      });
    });
}
