export function fetchMembers() {
  return fetch("https://api.github.com/orgs/emberjs/members", {
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    // response is a promise and not an actual data
    // need to return this response.json so we can
    // unwrap the promise chain with another .then
    return response.json();
  });
}

export function fetchDetails(url) {
  return fetch(url, {
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

export function fetchRepos(url) {
  return fetch(url, {
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

export function saveMember(data) {
  return fetch(`/api/members`, {
    method: "POST",
    body: JSON.stringify(data), // back end will run JSON.parse
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

export function fetchFollowing() {
  return fetch("/api/members").then((response) => {
    return response.json();
  });
}

export function removeFollowing(id) {
  return fetch(`/api/members/${id}`, {
    method: "DELETE",
  });
}
