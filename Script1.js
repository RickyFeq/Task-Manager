var allUsers = [];

function createAcc() {
  var userObj = {
    fullname: '',
    username: '',
    userpassword: ''
  };
  userObj.fullname = document.getElementById('mName').value;
  userObj.username = document.getElementById('mUsername').value;
  userObj.userpassword = document.getElementById('mPassword').value;

  var users = JSON.parse(localStorage.getItem('All Users'));
  if (users == null) {
    users = [];
  }
  users.push(userObj);
  localStorage.setItem('All Users', JSON.stringify(users));

  if (document.getElementById('mPassword').value.length < 8) {
    alert('Password cannot be less than 8 characters.');
    document.getElementById('mPassword').focus();
  } else {
    $('#exampleModal').modal('hide');
  }
}

function signIn() {
  var users = JSON.parse(localStorage.getItem('All Users'));
  var userName = document.getElementById('fullname2').value;
  var pass = document.getElementById('password2').value;

  var userFound = false;
  var userLogged = '';

  for (var i = 0; i < users.length; i++) {
    if (users[i].username == userName && users[i].userpassword == pass) {
      userFound = true;
      userLogged = users[i];
      localStorage.setItem('User Logged', JSON.stringify(userLogged));
      window.open('taskmanager.html', '_self');
      displayData();
      break;
    } else {
      userFound = false;
      alert('User not found');
    }
  }

  if (userFound == false) {
    alert('Username or password is incorrect.');
  }
}

function addTask() {
  var task = {
    title: '',
    status: 'incomplete'
  };
  var userLogged = JSON.parse(localStorage.getItem('User Logged'));
  var tasks = JSON.parse(localStorage.getItem(userLogged.username));
  if (tasks == null) {
    tasks = [];
  }

  task.title = document.getElementById('taskTitle').value;

  if (task.title == 0) {
    alert('Enter a task');
    tasks.pop(task);
    displayData();
  } else {
    tasks.push(task);
    localStorage.setItem(userLogged.username, JSON.stringify(tasks));
    $('#taskTitle').val('');
    displayData();
  }
}

function displayData() {
  var userLogged = JSON.parse(localStorage.getItem('User Logged'));
  var tasks = JSON.parse(localStorage.getItem(userLogged.username));
  var table = '';

  for (var i = 0; i < tasks.length; i++) {
    table += `<tr>
                  <td>${tasks[i].title}</td>
                  <td>${tasks[i].status}</td>
                  <td>
                  <button class="btn btn-danger" onclick="deleteTask(${i})">Delete</button>
                  <button class="btn btn-success" onclick="editTask(${i}) " data-toggle="modal" data-target="#exampleModal2"">Edit</button>
                  <button class="btn btn-warning"  onclick="switchStatus(${i})">Switch Status</button>
                  </td>
                  </tr>`;
  }
  document.getElementById('display-data').innerHTML = table;
}

window.onload = function () {
  var userLogged = JSON.parse(localStorage.getItem('User Logged'));
  document.getElementById('userUser').innerHTML = userLogged.fullname;
  displayData();
};

function logOut() {
  var userLogged = JSON.parse(localStorage.getItem('User Logged'));
  localStorage.removeItem(userLogged);
  window.open('login.html', '_self');
}

function saveChanges() {
  var userLogged = JSON.parse(localStorage.getItem('User Logged'));
  var tasks = JSON.parse(localStorage.getItem(userLogged.username));
  tasks[$('#index1').val()].title = $('#newTaskName').val();

  localStorage.setItem(userLogged.username, JSON.stringify(tasks));

  displayData();
  $('#newTaskName').val('');
  $('#exampleModal2').modal('hide');
}

function editTask(i) {
  var userLogged = JSON.parse(localStorage.getItem('User Logged'));
  var tasks = JSON.parse(localStorage.getItem(userLogged.username));
  $('#index1').val(i);
  $('#exampleModal2').modal('toggle');
}

function deleteTask(i) {
  var userLogged = JSON.parse(localStorage.getItem('User Logged'));
  var tasks = JSON.parse(localStorage.getItem(userLogged.username));
  tasks.splice(i, 1);
  localStorage.setItem(userLogged.username, JSON.stringify(tasks));
  displayData();
}

function switchStatus(i) {
  var userLogged = JSON.parse(localStorage.getItem('User Logged'));
  var tasks = JSON.parse(localStorage.getItem(userLogged.username));

  if (tasks[i].status == 'incomplete') {
    tasks[i].status = 'complete';
  } else if (tasks[i].status == 'complete') {
    tasks[i].status = 'incomplete';
  }
  localStorage.setItem(userLogged.username, JSON.stringify(tasks));
  displayData();
}

function showCompleted() {
  var userLogged = JSON.parse(localStorage.getItem('User Logged'));
  var tasks = JSON.parse(localStorage.getItem(userLogged.username));
  var table = '';

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].status == 'complete') {
      table += `<tr>
                  <td>${tasks[i].title}</td>
                  <td>${tasks[i].status}</td>
                  <td>
                  <button class="btn btn-danger" onclick="deleteTask(${i})">Delete</button>
                  <button class="btn btn-success"\`onclick="editTask(${JSON.stringify(
                    tasks[i]
                  )})\">Edit</button>
                  <button class="btn btn-warning"  onclick="switchStatus(${i})">Switch Status</button>
                  </td>
                  </tr>`;
    }
    document.getElementById('display-data').innerHTML = table;
  }
}

function deleteCompleted() {
  var userLogged = JSON.parse(localStorage.getItem('User Logged'));
  var tasks = JSON.parse(localStorage.getItem(userLogged.username));
  var tempArr = [];
  console.log(tasks);
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].status == 'incomplete') {
      tempArr.push(tasks[i]);
    }
  }
  localStorage.setItem(userLogged.username, JSON.stringify(tempArr));
  displayData();
}

function showIncompleted() {
  var userLogged = JSON.parse(localStorage.getItem('User Logged'));
  var tasks = JSON.parse(localStorage.getItem(userLogged.username));
  var table = '';

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].status == 'incomplete') {
      table += `<tr>
                  <td>${tasks[i].title}</td>
                  <td>${tasks[i].status}</td>
                  <td>
                  <button class="btn btn-danger" onclick="deleteTask(${i})">Delete</button>
                  <button class="btn btn-success"\`onclick="editTask(${JSON.stringify(
                    tasks[i]
                  )})\">Edit</button>
                  <button class="btn btn-warning"  onclick="switchStatus(${i})">Switch Status</button>
                  </td>
                  </tr>`;
    }
    document.getElementById('display-data').innerHTML = table;
  }
}

function showAll() {
  displayData();
}
