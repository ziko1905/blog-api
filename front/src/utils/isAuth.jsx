import { config } from "../Constants";

export async function isAuth() {
  return await fetch(config.url.BASE_URL + "/logged", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(
        import.meta.env.VITE_TOKEN_ITEM
      )}`,
    },
  })
    .then((response) => {
      if (response.status < 400) return response.json();
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      console.error("Error occurred while fetching user data");
    });
}
