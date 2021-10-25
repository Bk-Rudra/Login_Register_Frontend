export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    return { Authorzation: "Bearer" + user.accessToken }; //for spring boot back-end
  } else {
    return {};
  }
}
