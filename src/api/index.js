const hosturl = "http://localhost:8080/";

export function logIn(username, password) {
  const url = hosturl + "login";
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });
}
export function signUp(username, password) {
  const url = hosturl + "sign-up";
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  }).then(res => res.json());
}

/*function get(url) {
  return fetch(url, {
    method "GET",
    headers:{
      Accept: "application/json",
      "Content-Type": "application/json"

    }
  })

}*/
