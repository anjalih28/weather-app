window.addEventListener("load", () => {
  console.log("Client side js");

  const weatherForm = document.getElementById("weather-form");

  weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const address = document.getElementById("address-input").value;

    fetch(`http://localhost:3000/weather?address=${address}`).then(
      (response) => {
        response.json().then((data) => {
          document.getElementById("error").textContent = "";
          document.getElementById("message").textContent = "";

          let text = "";
          if (data.error) {
            text = data.error;
            document.getElementById("error").textContent = text;

            return;
          }

          text = `It is ${data.temperature} in ${data.place} but feels like 
            ${data.feelslike}`;
          document.getElementById("message").textContent = text;
        });
      }
    );
  });
});
