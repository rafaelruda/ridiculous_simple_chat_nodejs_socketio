let username;

function startPoint() {
  const thisValue = prompt("Informe o nome do usuário");

  if (thisValue.length > 0) {
    username = thisValue;

    const socket = io("http://localhost:3000/");

    const messages = document.getElementById("messages");
    const form = document.getElementById("form");
    const input = document.getElementById("input");

    form.addEventListener("submit", function (e) {
      console.log("form");
      e.preventDefault();
      if (input.value) {
        socket.emit("chat message", { username, message: input.value });
        input.value = "";
      }
    });

    socket.on("chat message", function (msg) {
      const { username, message } = msg;
      const item = document.createElement("li");
      item.textContent = `${username}: ${message}`;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });
  } else {
    startPoint();
  }
}

startPoint();
