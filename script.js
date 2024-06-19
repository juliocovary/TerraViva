const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');
const pesquisaInput = document.getElementById('pesquisa');
const excluirTodosBtn = document.getElementById('excluirTodos');
const limparCamposBtn = document.getElementById('limparCampos');

let users = JSON.parse(localStorage.getItem('users')) || [];
renderUserList();

userForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;

  const newUser = {
    id: Date.now(),
    data: new Date().toLocaleDateString(),
    nome,
    email
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  renderUserList();
  userForm.reset(); 
});

userList.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const userId = parseInt(event.target.parentElement.dataset.userId);
    users = users.filter(user => user.id !== userId);
    localStorage.setItem('users', JSON.stringify(users));
    renderUserList();
  }
});

pesquisaInput.addEventListener('input', () => {
  const termoPesquisa = pesquisaInput.value.toLowerCase();
  const usuariosFiltrados = users.filter(user => 
    user.nome.toLowerCase().includes(termoPesquisa) ||
    user.email.toLowerCase().includes(termoPesquisa)
  );
  renderUserList(usuariosFiltrados);
});

excluirTodosBtn.addEventListener('click', () => {
  users = [];
  localStorage.setItem('users', JSON.stringify(users));
  renderUserList();
});

limparCamposBtn.addEventListener('click', () => {
  userForm.reset();
});

function renderUserList(usuarios = users) {
  userList.innerHTML = '';
  usuarios.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `${user.data} - ${user.nome} - ${user.email}`;
    li.dataset.userId = user.id;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    li.appendChild(deleteBtn);
    userList.appendChild(li);
  });
}
