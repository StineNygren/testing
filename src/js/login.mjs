import {
  loginEmail,
  loginPassword,
  baseURL,
  loginSubmit,
} from "./utils/domElements.mjs";

console.log(loginEmail.value);

async function logIn() {
  try {
    const response = await fetch(`${baseURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginEmail.value,
        password: loginPassword.value,
      }),
    });

    const result = await response.json();

    saveData(result);
  } catch (error) {
    console.log(error);
  }
}

function saveData(result) {
  let token = result.accessToken;
  localStorage.setItem("JWT", `Bearer ` + token);
  localStorage.setItem("username", result.name);
  console.log(result.accessToken);
}

loginSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  logIn();
});
