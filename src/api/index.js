import axios from "axios";
const hosturl = "http://localhost:8080/";

function get(url) {
  let config = {
    headers: {
      authorization: localStorage.getItem("id_token")
    }
  };
  return axios.get(url, config);
}

function put(url, params) {
  let config = {
    headers: {
      authorization: localStorage.getItem("id_token")
    }
  };
  return axios.put(url, params, config);
}

function post(url, params) {
  let config = {
    headers: {
      authorization: localStorage.getItem("id_token")
    }
  };
  return axios.post(url, params, config);
}

export function logIn(username, password) {
  const url = hosturl + "login";
  return axios.post(url, {
    username: username,
    password: password
  });
}

//TODO add check if username is taken
export function signUp(username, password) {
  const url = hosturl + "user/sign-up";
  return axios.post(url, {
    username: username,
    password: password
  });
}

export function isLoggedIn() {
  const url = hosturl + "user/isloggedin";
  return get(url)
    .then(res => res.data)
    .catch(() => false);
}

export function getUser() {
  const url = hosturl + "user/getuser";
  return get(url);
}

export function joinCollective(collectiveName) {
  const url = hosturl + "user/addusertocollective";
  return put(url, {
    name: collectiveName
  });
}

//TODO add minimum limit to number of characters
export function createCollective(collectiveName) {
  const url = hosturl + "collective/create";
  return post(url, {
    name: collectiveName
  });
}

export function getSections() {
  const url = hosturl + "sections/getSections";
  return get(url);
}

export function setTaskComplete(isComplete, taskId) {
  const url = hosturl + "task/updatetaskcompletion/" + taskId;
  console.log(taskId);
  console.log(isComplete);
  return put(url, {
    isComplete: isComplete,
  });
}
