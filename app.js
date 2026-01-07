firebase.initializeApp({
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "PASTE.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID"
});

const db = firebase.firestore();
let roomRef, userName;

function joinRoom() {
  userName = name.value.trim();
  const roomName = room.value.trim();
  const pass = password.value.trim();

  if (!userName || !roomName || !pass) {
    alert("Fill all fields");
    return;
  }

  roomRef = db.collection("rooms").doc(roomName);

  roomRef.get().then(doc => {
    if (doc.exists && doc.data().password !== pass) {
      alert("Wrong password");
    } else {
      roomRef.set({ password: pass }, { merge: true });
      document.getElementById("chat").classList.remove("hidden");
      listen();
    }
  });
}

function sendMsg() {
  const text = msg.value.trim();
  if (!text) return;

  roomRef.collection("messages").add({
    name: userName,
    text,
    time: Date.now()
  });

  msg.value = "";
}

function listen() {
  roomRef.collection("messages")
    .orderBy("time")
    .onSnapshot(snap => {
      messages.innerHTML = "";
      snap.forEach(d => {
        messages.innerHTML += `<p><b>${d.data().name}:</b> ${d.data().text}</p>`;
        ping.play();
      });
    });
}
