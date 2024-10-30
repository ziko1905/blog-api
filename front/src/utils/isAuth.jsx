import { config } from "../Constants";

export async function isAuth(callBack) {
  return await fetch(config.url.BASE_URL + "/logged", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("ziko1909-app-token")}`,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      if (response) {
        callBack(response);
      }
    })
    .catch(() => {
      console.error("Error occurred while fetching user data");
    });
}