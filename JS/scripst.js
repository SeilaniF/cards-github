function fetchGitHubUser() {
  const username = document.getElementById("username").value.trim();
  const app = document.getElementById("app");
  app.innerHTML = ""; // limpa o conteúdo anterior

  if (!username) {
    app.innerHTML = "<p style='color:red'>Por favor, digite um nome de usuário.</p>";
    return;
  }

  fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Usuário não encontrado!");
      }
      return response.json();
    })
    .then(user => {
      createUserCard(user);
    })
    .catch(error => {
      app.innerHTML = `<p style="color:red">Erro: ${error.message}</p>`;
    });
}

function createUserCard(user) {
  const app = document.getElementById("app");

  const card = document.createElement("div");
  card.className = "card";

  const avatar = document.createElement("img");
  avatar.src = user.avatar_url;
  avatar.alt = `${user.login}'s avatar`;

  const name = document.createElement("h2");
  name.textContent = user.name || "Sem nome";

  const login = document.createElement("p");
  login.textContent = `@${user.login}`;

  const bio = document.createElement("p");
  bio.className = "bio";
  bio.textContent = user.bio || "Este usuário não possui bio.";

  card.appendChild(avatar);
  card.appendChild(name);
  card.appendChild(login);
  card.appendChild(bio);

  app.appendChild(card);
}
