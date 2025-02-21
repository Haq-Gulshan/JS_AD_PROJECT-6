const WebsideMain = document.querySelector("#Web-Site");
const imageSection = document.querySelector("#Image");

// API URL for å hente usersdata
const apiURL = "https://jsonplaceholder.typicode.com/users";

// API URL for å hente random dog images med parameter
const dogAPIURL = "https://random.dog/woof.json";

let users;
//ved brukt av asynchronous
async function apiFunction() {
  const response = await fetch(apiURL);

  if (!response.ok) {
    console.error("API request failed with status:", response.status);
    return;
  }

  const usersJson = await response.json();

  users = usersJson.map((user) => {
    return {
      nameCompany: user.company.name,
      name: user.name,
      address: user.address.street,
      city: user.address.city,
      phone: user.phone,
      email: user.email,
    };
  });

  render(users);
  // console.log(users);
}
apiFunction();

function render(users) {
  users.forEach((user) => {
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("container");
    //name
    const nameElem = document.createElement("h2");
    nameElem.classList.add("name");
    nameElem.textContent = user.name;
    //Company Name
    const companyNameElem = document.createElement("p");
    companyNameElem.classList.add("nameCompany");
    companyNameElem.textContent = `Company Name: ${user.nameCompany}`;
    //Adresse
    const addressElem = document.createElement("p");
    addressElem.classList.add("address");
    addressElem.textContent = `Address: ${user.address}`;
    //City
    const cityElem = document.createElement("p");
    cityElem.classList.add("city");
    cityElem.textContent = `City: ${user.city}`;
    //Email
    const emailElem = document.createElement("p");
    emailElem.classList.add("email");
    emailElem.textContent = `Email: ${user.email}`;
    //Phone
    const phElem = document.createElement("p");
    phElem.classList.add("phone");
    phElem.textContent = `Phone: ${user.phone}`;

    //append
    infoDiv.append(
      nameElem,
      companyNameElem,
      addressElem,
      cityElem,
      emailElem,
      phElem
    );
    WebsideMain.append(infoDiv);
  });
}

fetchDogImage();

async function fetchDogImage() {
  // legge para for specific bilder
  const urlWithParams = `${dogAPIURL}?`;

  try {
    const response = await fetch(urlWithParams);
    const data = await response.json();
    displayDogImage(data);
  } catch (error) {
    console.error("Error dog image:", error);
  }
}

// for å vise hund bilder
function displayDogImage(data) {
  const dogImage = document.createElement("img");
  dogImage.src = data.url;
  dogImage.classList.add("Dogs-Image");
  imageSection.append(dogImage);
}
