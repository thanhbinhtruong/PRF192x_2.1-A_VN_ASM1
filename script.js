"use strict";
let petArr = [];
let healthyPetArr = [];
let isShowAllPet = true;

const addPet = () => {

  // get data form
  let data = getDataForm();

  // check data if it valid or not
  if (validation(data)) {
    // add data into arr
    petArr.push(data);
    healthyPetArr = petArr.filter((obj) => obj.isHealthy);

    // clear input on ui
    clearInput();

    if (isShowAllPet) {
      renderTableData(petArr);
    } else {
      renderTableData(healthyPetArr);
    }
  }
};

// function show all pets or show only healthy pets /
const showPet = () => {
  let healthyBtn = document.querySelector("#healthy-btn");

  if (healthyBtn.innerHTML.trim() === "Show Healthy Pet") {
    healthyBtn.innerHTML = "Show All Pet";
    isShowAllPet = false;
    renderTableData(healthyPetArr);
  } else {
    healthyBtn.innerHTML = "Show Healthy Pet";
    isShowAllPet = true;
    renderTableData(petArr);
  }
};

const deletePet = (petID) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    const objWithIdIndex = petArr.findIndex((obj) => obj.petID == petID);
    if (objWithIdIndex > -1) {
      petArr.splice(objWithIdIndex, 1);
    }
    healthyPetArr = petArr.filter((obj) => obj.isHealthy);

    if (isShowAllPet) {
      renderTableData(petArr);
    } else {
      renderTableData(healthyPetArr);
    }
  }
};

// Calculate bmi and rerender table
const showBMI = () => {
  for (let i = 0; i < petArr.length; i++) {
    petArr[i].bmi = calculateBMI(
      petArr[i].petType,
      petArr[i].petWeight,
      petArr[i].petLength
    );
  }
  healthyPetArr = petArr.filter((obj) => obj.isHealthy);

  // rerender table after calculate
  if (isShowAllPet) {
    renderTableData(petArr);
  } else {
    renderTableData(healthyPetArr);
  }
};

// Function caculate BMI
const calculateBMI = (type, weight, length) => {
  let rawDogBMI = (weight * 703) / length ** 2;
  let rawCatBMI = (weight * 886) / length ** 2;

  if (type === "Dog") {
    // lam tron 2 chu so thap phan
    return Math.round((rawDogBMI + Number.EPSILON) * 100) / 100;
  } else if (type === "Cat") {
    // lam tron 2 chu so thap phan
    return Math.round((rawCatBMI + Number.EPSILON) * 100) / 100;
  }
};

const clearInput = () => {
  let petID = document.querySelector("#input-id");
  let petName = document.querySelector("#input-name");
  let petAge = document.querySelector("#input-age");
  let petType = document.querySelector("#input-type");
  let petWeight = document.querySelector("#input-weight");
  let petLength = document.querySelector("#input-length");
  let petColor = document.querySelector("#input-color-1");
  let petBreed = document.querySelector("#input-breed");
  let isPetVacinated = document.querySelector("#input-vaccinated");
  let isPetDewormed = document.querySelector("#input-dewormed");
  let isPetSterilized = document.querySelector("#input-sterilized");

  petID.value = "";
  petName.value = "";
  petAge.value = "";
  petType.value = "0";
  petWeight.value = "";
  petLength.value = "";
  petColor.value = "#000000";
  petBreed.value = "0";
  isPetVacinated.checked = false;
  isPetDewormed.checked = false;
  isPetSterilized.checked = false;
};

const renderTableData = (petArr) => {
  let tableBodyEl = document.querySelector("#tbody");

  // Clear table
  tbody.innerHTML = "";

  // Loop all object in petArr, then add into table
  petArr.forEach(function (item) {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${item.petID}</th>
    <td>${item.petName}</td>
    <td>${item.petAge}</td>
    <td>${item.petType}</td>
    <td>${item.petWeight} kg</td>
    <td>${item.petLength} cm</td>
    <td>${item.petBreed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${item.petColor}"></i>
    </td>
    <td><i class="bi ${
      item.isPetVacinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      item.isPetDewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      item.isPetSterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td>${item.bmi ? item.bmi : "?"}</td>
    <td>${item.date}</td>
    <td>
      <button onclick="deletePet(${
        item.petID
      })" type="button" class="btn btn-danger">Delete</button>
    </td>`;
    tableBodyEl.appendChild(row);
  });
};

// Function get data from DATFROM
const getDataForm = () => {
  let petID = document.querySelector("#input-id").value;
  let petName = document.querySelector("#input-name").value;
  let petAge = document.querySelector("#input-age").value;
  let petType = document.querySelector("#input-type").value;
  let petWeight = document.querySelector("#input-weight").value;
  let petLength = document.querySelector("#input-length").value;
  let petColor = document.querySelector("#input-color-1").value;
  let petBreed = document.querySelector("#input-breed").value;
  let isPetVacinated = document.querySelector("#input-vaccinated").checked;
  let isPetDewormed = document.querySelector("#input-dewormed").checked;
  let isPetSterilized = document.querySelector("#input-sterilized").checked;
  let isHealthy = isPetVacinated && isPetDewormed && isPetSterilized;

  const data = {
    petID: petID,
    petName: petName,
    petAge: parseInt(petAge),
    petType: petType,
    petWeight: parseInt(petWeight),
    petLength: parseInt(petLength),
    petColor: petColor,
    petBreed: petBreed,
    isPetVacinated: isPetVacinated,
    isPetDewormed: isPetDewormed,
    isPetSterilized: isPetSterilized,
    isHealthy: isHealthy,
    bmi: null,
    date: moment(new Date()).format("DD-MM-YYYY") ,
  };
  return data;
};

// Function validation Data
const validation = (data) => {
  // Check petID
  const objWithIdIndex = petArr.findIndex((obj) => obj.petID == data.petID);
  if (!data.petID) {
    alert("Please fill out ID");
    return false;
  } else if (objWithIdIndex > -1) {
    alert("ID must be unique!");
    return false;
  }

  // Check petName
  if (!data.petName) {
    alert("Please fill out Name");
    return false;
  }

  // Check petAge
  if (!data.petAge && data.petAge != 0) {
    alert("Please fill out Age");
    return false;
  } else if (parseInt(data.petAge) < 1 || parseInt(data.petAge) > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  }

  // Check petType
  if (data.petType === "0") {
    alert("Please select Type!");
    return false;
  }

  // Check petWeight
  if (!data.petWeight && data.petWeight != 0) {
    alert("Please fill out weight");
    return false;
  } else if (parseInt(data.petWeight) < 1 || parseInt(data.petWeight) > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  }

  // Check petlength
  if (!data.petLength && data.petWeight != 0) {
    alert("Please fill out length");
    return false;
  } else if (parseInt(data.petLength) < 1 || parseInt(data.petLength) > 100) {
    alert("Length must be between 1 and 100!");
    return false;
  }

  // Check petBreed
  if (data.petBreed === "0") {
    alert("Please select Breed!");
    return false;
  }

  return true;
};
