firebase.initializeApp({
  apiKey: "AIzaSyA6xXc2Ise56jkcaI8YEBQz1H_dfvXQ_Vs",
  authDomain: "ghost-chat-5d4d9.firebaseapp.com",
  projectId: "ghost-chat-5d4d9"
});

const db = firebase.firestore();
let roomRef, userName;

function joinRoom() {
  const name = document.getElementById("name").value.trim();
  const room = document.getElementById("room").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("msg");

  if (!name || !room || !password) {
    alert("Fill all fields");
    return;
  }

  currentUser = name;
  currentRoom = room;

  document.getElementById("chat").classList.remove("hidden");
}


function sendMsg() {
  const text = msg.value.trim();
  if (!text || !roomRef) return;

  roomRef.collection("messages").add({
    name: userName,
    text: text,
    time: firebase.firestore.FieldValue.serverTimestamp()
  });

  msg.value = "";
}

function listenMsg() {
  roomRef.collection("messages")
    .orderBy("time")
    .onSnapshot(snapshot => {
      const box = document.getElementById("messages");
      box.innerHTML = "";

      snapshot.forEach(doc => {
        const m = doc.data();
        box.innerHTML += `<p><b>${m.name}:</b> ${m.text}</p>`;
      });
    });
}
