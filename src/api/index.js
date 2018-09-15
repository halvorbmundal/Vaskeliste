import axios from 'axios';
//const hosturl = 'http://127.0.0.1:5000/';
const hosturl = 'http://209.97.191.116:5000/';

function getConfig() {
  return {
    headers: {
      authorization: localStorage.getItem('id_token')
    }
  };
}

function get(url) {
  return axios.get(url, getConfig());
}

function put(url, params) {
  return axios.put(url, params, getConfig());
}

function post(url, params) {
  return axios.post(url, params, getConfig());
}

function axiosDelete(url) {
  return axios.delete(url, getConfig());
}

export function logIn(username, password) {
  const url = hosturl + 'login';
  return axios.post(url, {
    username: username,
    password: password
  });
}

//TODO add check if username is taken
export function signUp(username, password) {
  const url = hosturl + 'user/sign-up';
  return axios.post(url, {
    username: username,
    password: password
  });
}

export function isLoggedIn() {
  const url = hosturl + 'user/isloggedin';
  return get(url)
    .then(res => res.data)
    .catch(() => false);
}

export function getUser() {
  const url = hosturl + 'user/getuser';
  return get(url);
}

export function joinCollective(collectiveName) {
  const url = hosturl + 'user/addusertocollective';
  return put(url, {
    name: collectiveName
  });
}

//TODO add minimum limit to number of characters
export function createCollective(collectiveName) {
  const url = hosturl + 'collective/create';
  return post(url, {
    name: collectiveName
  });
}

export function getSections() {
  const url = hosturl + 'sections/getSections';
  return get(url);
}

export function setTaskComplete(isComplete, taskId) {
  const url = hosturl + 'tasks/updatetaskcompletion' + taskId;
  return put(url, {
    isComplete: isComplete
  });
}

export function addSection(name) {
  const url = hosturl + 'sections/add';
  return post(url, {
    name
  });
}

export function addTask(name, sectionId) {
  const url = hosturl + 'tasks/addtosection/' + sectionId;
  return post(url, {
    name
  });
}

export function deleteSection(sectionId) {
  const url = hosturl + 'sections/delete/' + sectionId;
  return axiosDelete(url);
}

export function deleteTask(taskId) {
  const url = hosturl + 'tasks/delete/' + taskId;
  return axiosDelete(url);
}

export function getPendingRequests() {
  const url = hosturl + 'user/getpendingrequests';
  return get(url);
}

export function removeRequest(userId) {
  const url = hosturl + 'user/removerequest/' + userId;
  return put(url);
}

export function acceptRequest(userId) {
  const url = hosturl + 'user/acceptrequest/' + userId;
  return put(url);
}

export function getUsersInCollective(collectiveName) {
  const url = hosturl + 'collective/acceptedusers/' + collectiveName;
  return get(url);
}
