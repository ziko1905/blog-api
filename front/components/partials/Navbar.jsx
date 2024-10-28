import { useEffect, useState } from "react";
import { config } from "../../Constants";

function Navbar() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(config.url.BASE_URL + "/posts", { mode: "cors" })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((response) => {
        console.log(response);
      });
  });

  return (
    <>
      <nav>This is user: {user}</nav>
    </>
  );
}

export default Navbar;
