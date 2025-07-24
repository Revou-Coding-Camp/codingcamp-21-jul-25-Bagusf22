let todos = [];

function addTodo() {
  const text = document.getElementById("todo-text").value.trim();
  const date = document.getElementById("todo-date").value;

  if (!text || !date) {
    alert("Isi tugas dan tanggalnya dulu ya!");
    return;
  }

  todos.push({ text, date, completed: false });
  document.getElementById("todo-text").value = "";
  document.getElementById("todo-date").value = "";
  renderTodos();
}

function renderTodos(list = todos) {
  const tbody = document.getElementById("todo-list");
  tbody.innerHTML = "";

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="empty">Belum ada tugas</td></tr>`;
    return;
  }

  list.forEach((todo, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="${todo.completed ? 'done' : ''}">${todo.text}</td>
      <td>${todo.date}</td>
      <td>${todo.completed ? '✅ Selesai' : '🕒 Belum'}</td>
      <td>
        <button onclick="toggle(${i})">✔</button>
        <button onclick="remove(${i})">🗑</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function toggle(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function remove(index) {
  todos.splice(index, 1);
  renderTodos();
}

function deleteAll() {
  if (confirm("Yakin mau hapus semua tugas?")) {
    todos = [];
    renderTodos();
  }
}

function filterToday() {
  const today = new Date().toISOString().split("T")[0];
  const filtered = todos.filter(t => t.date === today);
  renderTodos(filtered);
}

// Awal render semua data
renderTodos();
