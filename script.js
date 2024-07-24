import data from "./data.js";
const searchBox = document.querySelector(".search-box");
const displayBox = document.querySelector(".display-box");

const cards = [];

data.map((item) => {
  const newCard = document.createElement("div");
  newCard.setAttribute("class", "card");
  newCard.setAttribute("id", item.id);
  newCard.innerHTML = `<h1>${item.first_name} ${item.last_name}</h1><br><h2>${item.email}</h2>`;
  // newCard.addEventListener("touchend", (e) => {
  //   if (e.target.className !== "btn view-btn") {
  //     const me = e.currentTarget;
  //     if (me.className === "card") {
  //       me.setAttribute("class", "card active");
  //     } else {
  //       me.setAttribute("class", "card");
  //     }
  //     if (me.className === "card active") {
  //       data.map(
  //         (item) =>
  //           (me.innerHTML = `<h1>${item.first_name} ${item.last_name}</h1><h3>id:${item.id}</h3><h2>${item.email}</h2><h3>${item.gender}</h3><div class="view"><button class='btn view-btn'>View</button></div>`)
  //       );
  //       me.innerHTML = `<h1>${item.first_name} ${item.last_name}</h1><h3>id:${item.id}</h3><h2>${item.email}</h2><h3>${item.gender}</h3><div class="view"><button class='btn view-btn'>View</button></div>`;
  //     } else {
  //       data.map(
  //         (item) =>
  //           (me.innerHTML = `<h1>${item.first_name} ${item.last_name}</h1><br><h2>${item.email}</h2>`)
  //       );
  //     }
  //   } else {
  //     console.log(e.target);
  //   }
  // });
  cards.push(newCard);
  displayBox.append(newCard);
});

function debounce(fn, delay) {
  let timeout;
  return (x) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(x);
    }, delay);
  };
}

const updateDisplay = debounce((input) => {
  displayBox.innerHTML = "";
  const result = cards.filter(
    (item) =>
      item.getAttribute("id").includes(input.trim()) ||
      item
        .getElementsByTagName("h1")[0]
        .textContent.toLowerCase()
        .includes(input.toLowerCase().trim()) ||
      item
        .getElementsByTagName("h2")[0]
        .textContent.toLowerCase()
        .includes(input.toLowerCase().trim())
  );
  result.forEach((item) => {
    resetCard(item);
    displayBox.append(item);
  });
  if (input === "") {
    cards.forEach((item) => {
      resetCard(item);
      displayBox.append(item);
    });
  }
}, 500);

function search(e) {
  updateDisplay(e.target.value);
}

function resetCard(target) {
  const me = target;
  const card = data.filter((item) => item.id == me.getAttribute("id"))[0];
  me.className = "card";
  me.innerHTML = `<h1>${card.first_name} ${card.last_name}</h1><br><h2>${card.email}</h2>`;
}

function expandCard(target) {
  const me = target;
  const card = data.filter((item) => item.id == me.getAttribute("id"))[0];
  me.className = "card active";
  me.innerHTML = `<h1>${card.first_name} ${card.last_name}</h1><h3>id:${card.id}</h3><h2>${card.email}</h2><h3>${card.gender}</h3><div class="view"><button class='btn view-btn'>View</button></div>`;
}

function bigCard(target) {
  const me = target;
  const cardData = data.filter(
    (item) =>
      item.id == me.getElementsByClassName("card active")[0].getAttribute("id")
  );
  const { first_name, last_name, id, email, gender } = cardData;
  me.innerHTML = `<div class="profile">
                <h3>First Name:</h3>
                <h1>${first_name}</h1>
                <h3>Last Name:</h3>
                <h1>${last_name}</h1>
                <h3>Gender</h3>
                <h2>${gender}</h2>
                <h3>Id:</h3>
                <h2>${id}</h2>
                <h3>Email:</h3>
                <h2>${email}</h2>
                <h3>about:</h3>
                <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h2>
                <div class="view"><button class='btn back-btn'>Back</button></div>
                </div>`;
}

searchBox.addEventListener("input", search);

cards.forEach((item) => {
  item.addEventListener("touchend", (e) => {
    cards.forEach((item) => resetCard(item));
    expandCard(e.currentTarget);
  });
  item.addEventListener("mouseenter", (e) => {
    cards.forEach((item) => resetCard(item));
    expandCard(e.currentTarget);
  });
  item.addEventListener("mouseleave", (e) => {
    resetCard(e.currentTarget);
  });
});

displayBox.addEventListener("click", (e) => {
  const me = e.currentTarget;
  const meActive = me.getElementsByClassName("card active")[0];
  if (e.target.className === "btn back-btn") {
    displayBox.innerHTML = "";
    cards.forEach((item) => {
      resetCard(item);
      displayBox.append(item);
    });
  }
  if (e.target.className === "btn view-btn") {
    const cardData = data.filter(
      (item) => item.id == meActive.getAttribute("id")
    )[0];
    console.log(cardData);
    const { first_name, last_name, id, email, gender } = cardData;
    me.innerHTML = `<div class="profile">
                <div><h3>First Name: <h1>${first_name}</h1></h3></div>
                <div><h3>Last Name: <h1>${last_name}</h1></h3></div>
                <div><h3>Gender: <h2>${gender}</h2></h3></div>
                <div><h3>Id: <h2>${id}<h2></h3></div>
                <div><h3>Email: <h2>${email}<h2></h3></div>
                <div><h3>about: <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h2></h3>
                <div class="view"><button class='btn back-btn'>Back</button></div>
                </div>`;
  }
});

// displayBox.addEventListener("touchend", (e) => {
//   const me = e.currentTarget;
//   const meActive = me.getElementsByClassName("card active")[0];
//   if (e.target.className === "btn back-btn") {
//     displayBox.innerHTML = "";
//     cards.forEach((item) => {
//       resetCard(item);
//       displayBox.append(item);
//     });
//   }
//   if (e.target.className === "btn view-btn") {
//     const cardData = data.filter(
//       (item) => item.id == meActive.getAttribute("id")
//     )[0];
//     console.log(cardData);
//     const { first_name, last_name, id, email, gender } = cardData;
//     me.innerHTML = `<div class="profile">
//                 <div><h3>First Name: <h1>${first_name}</h1></h3></div>
//                 <div><h3>Last Name: <h1>${last_name}</h1></h3></div>
//                 <div><h3>Gender: <h2>${gender}</h2></h3></div>
//                 <div><h3>Id: <h2>${id}<h2></h3></div>
//                 <div><h3>Email: <h2>${email}<h2></h3></div>
//                 <div><h3>about: <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h2></h3>
//                 <div class="view"><button class='btn back-btn'>Back</button></div>
//                 </div>`;
//   }
// });