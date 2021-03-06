import axios from "axios";

let USER_URL = "http://localhost:3000/user";
const BASE_URL = "";

if (process.env.NODE_ENV !== 'development') {
  USER_URL = '/user'
}


function login(user) {
  return axios
    .post(`${BASE_URL}/login`, user)
    .then(res => {
      sessionStorage.user = JSON.stringify(res.data.user);
      return res.data.user;
    })
    .catch(err => {
      throw new Error("Login Failed");
    });
}

function checkLogin(creds) {
  return new Promise((resolve, reject) => {
    getUsers().then(users => {   //** Has to be done in backend - password shouldn't appear in front! */
      const user = users.find(
        user =>
          user.userName === creds.userName && user.password === creds.password
      );
      if (user) {
            sessionStorage.user = JSON.stringify(user);
            resolve(user)
        }
      else reject("wrong credentials");
    });
  });
}

function register(user) {
  return axios
    .post(USER_URL, user)
    .then(res => console.log(res.data))
    .catch(err => {
      throw new Error("Register Failed");
    });
}

function saveUser(user) {
 
  if (user._id) {
    return axios.put(USER_URL, user)
  } else {
    return axios.post(USER_URL, user);
  }
 
}


function logout() {
  return axios
    .post(`${BASE_URL}/logout`)
    .then(res => {
      delete sessionStorage.user;
    })
    .catch(err => {
      throw new Error("Logout Failed");
    });
}

function emptyUser() {
  return {
    userName: "",
    password: "",
    email:"",
    isTeacher: false,
    isAdmin: false,
    fullName: "",
    desc: "",
    quote: "",
    education: "",
    img: "",
    socialLinks: {facebook:'',twitter:'',whatsapp:''},
    
  };
}

function getUsers() {
  return axios
    .get(USER_URL)
    .then(res => res.data)
    .catch(e => console.log("No Users", e));
}


function deleteUser(userId) {
  return axios.delete(_getUserUrl(userId));
}

function getUserById(userId) {
  return axios.get(_getUserUrl(userId)).then(res => res.data);
}

function _getUserUrl(userId) {
  return `${USER_URL}/${userId}`;
}

export default {
  login,
  register,
  logout,
  getUsers,
  deleteUser,
  emptyUser,
  saveUser,
  getUserById,
  checkLogin
};
