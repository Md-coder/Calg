// loading

$(window).load(function () {
  $(".preloader").delay(5000).fadeOut("slow");
  $("#overlayer").delay(5000).fadeOut("slow");
});

// generating the current year
document.getElementById("year").innerHTML = new Date().getFullYear();

// declaring every variables needed;

const firstName = document.getElementById("fnName"),
  courseNo = document.getElementById("courses"),
  courseNo2 = document.getElementById("courses2"),
  submit = document.getElementById("submit"),
  submit1 = document.getElementById("submit1"),
  submit2 = document.getElementById("submit2"),
  calculate = document.getElementById("calculate"),
  nameResult = document.getElementById("nameRes"),
  tablebody = document.getElementById("table-body"),
  // tablebody2 = document.getElementById("table-body2"),
  calculate2 = document.getElementById("calculate2");

let gradeResult = document.getElementById("gradeRes");
// Ui classes
class UI {
  // create new tables
  newTable() {
    let courses = parseInt(courseNo.value);
    let name = firstName.value;

    // validate
    if (isNaN(courses) || name === "" || courses > 15 || courses === 0) {
      // show error
      const ui = new UI();
      // ui.showError("Please fill in your name and course no.");
      ui.showError(firstName, "please fill in your first name");
      ui.showError(courseNo, "Please make input between 1 and 15");
    } else {
      // iterate and create the table
      for (let i = 1; i <= courses; i++) {
        //   let table = document.querySelector(".table");
        let tableBody = document.getElementById("table-body");

        // creating tr,th and td element
        let tr = document.createElement("tr"),
          th = document.createElement("th"),
          td1 = document.createElement("td"),
          td2 = document.createElement("td"),
          td3 = document.createElement("td");

        th.innerHTML = `${i}`;
        th.scope = "row";
        // creating input1
        let input = document.createElement("input"),
          inputId = `input${i}`;
        let input1 = document.createElement("input");
        input1.type = "text";
        input1.id = inputId;
        // append to td1
        td1.appendChild(input1);

        // creating input2
        let input2 = document.createElement("input");
        input2.type = "number";
        input2.id = `unit${i}`;
        // append to td2
        td2.appendChild(input2);

        // creating input3
        let input3 = input;
        input3.type = "text";
        input3.id = `grade${i}`;
        // append to td3
        td3.appendChild(input3);

        // append to tr
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        // append to table body
        tableBody.appendChild(tr);

        // disble form field
        UI.disabled();
      }
    }
  }
  // create new table for second semester
  newTable2() {
    let courses2 = parseInt(courseNo2.value);
    //  let name = firstName.value;

    // validate
    if (isNaN(courses2) || courses2 > 15 || courses2 === 0) {
      // show error
      const ui = new UI();
      ui.showError(courseNo2, "please make input between 1 and 15");

      // ui.showError("Please fill in your name and course no.");
    } else {
      // iterate and create the table
      for (let i = 1; i <= courses2; i++) {
        //   let table = document.querySelector(".table");
        let tableBody2 = document.getElementById("table-body2");

        // creating tr,th and td element
        let tr = document.createElement("tr"),
          th = document.createElement("th"),
          td1 = document.createElement("td"),
          td2 = document.createElement("td"),
          td3 = document.createElement("td");

        th.innerHTML = `${i}`;
        th.scope = "row";
        // creating input1
        let input = document.createElement("input"),
          inputId = `input${i}`;
        let input1 = document.createElement("input");
        input1.type = "text";
        input1.id = inputId;
        // append to td1
        td1.appendChild(input1);

        // creating input2
        let input2 = document.createElement("input");
        input2.type = "number";
        input2.id = `unit${i}`;
        // append to td2
        td2.appendChild(input2);

        // creating input3
        let input3 = input;
        input3.type = "text";
        input3.id = `grade${i}`;
        // append to td3
        td3.appendChild(input3);

        // append to tr
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        // append to table body
        tableBody2.appendChild(tr);
      }
    }
  }

  //   disabling method
  static disabled() {
    firstName.disabled = true;
    courseNo.disabled = true;
    submit.disabled = true;
  }

  //   disabling method 2
  static disabled2() {
    courseNo2.disabled = true;
    submit2.disabled = true;
  }

  static accumulation(grade, unit) {
    switch (grade) {
      case "A":
        return 5 * unit;
        break;

      case "B":
        return 4 * unit;
        break;
      case "C":
        return 3 * unit;
        break;
      case "D":
        return 2 * unit;
        break;
      case "E":
        return 1 * unit;
        break;
      case "F":
        return 0 * unit;
        break;
      default:
        return 0 * unit;
    }
  }

  // showResult() {
  //   // display result on the result page
  //   nameResult.innerHTML = localStorage.getItem("name");
  //   gradeResult.innerHTML = localStorage.getItem("cGPA");
  // }
  showError(name, error) {
    // selecting input element
    const formControl = name.parentElement;
    formControl.classList.add("error");
    // get the error message class
    const errorMesage = formControl.querySelector(".error-message");
    errorMesage.innerHTML = error;
    errorMesage.style.display = "block";
    // adding error class to the couse input
  }

  //   clear Error
  // clearError(name) {
  //   const formControl = name.parentElement;
  //   formControl.querySelector(".error-message").remove();
  //   //  window.location.reload();
  // }
  // calculate cgpa
  calculateCGPA() {
    let tableBody = tablebody;
    const ui = new UI();

    let accumulatedScr = 0,
      sumUnit = 0,
      cGPA = 0,
      count = tableBody.rows.length;

    for (let i = 1; i <= count; i++) {
      let unit = parseInt(document.getElementById(`unit${i}`).value);
      let grade = document.getElementById(`grade${i}`).value.toUpperCase();

      if (isNaN(unit) || unit === "" || grade === "") {
        ui.showError("Please fill in details correctly");
      } else {
        accumulatedScr += UI.accumulation(grade, unit);
        sumUnit += Math.floor(unit);
      }
    }

    cGPA = (accumulatedScr / sumUnit).toFixed(2);
    console.log(cGPA);

    // verify cGPA
    if (cGPA === "" || cGPA === 0 || isNaN(cGPA)) {
      ui.showError(calculate, "oops! something is wrong with your input fields");

      // setTimeout(ui.clearError(calculate), 3000);
    } else {
    }

    localStorage.setItem("cGPA", cGPA);
    localStorage.setItem("name", firstName.value);

    // window.location.href = "result.html";
  }
  calculateCGPA2() {
    let tableBody = document.getElementById("table-body2");
    const ui = new UI();

    let accumulatedScr = 0,
      sumUnit = 0,
      cGPA2 = 0,
      count = tableBody.rows.length;

    for (let i = 1; i <= count; i++) {
      let unit = parseInt(document.getElementById(`unit${i}`).value);
      let grade = document.getElementById(`grade${i}`).value.toUpperCase();

      if (isNaN(unit) || unit === "" || grade === "") {
        ui.showError("Please fill in details correctly");
      } else {
        accumulatedScr += UI.accumulation(grade, unit);
        sumUnit += Math.floor(unit);
      }
    }

    cGPA2 = (accumulatedScr / sumUnit).toFixed(2);
    console.log(cGPA2);

    // verify cGPA
    if (cGPA2 === "" || cGPA2 === 0 || isNaN(cGPA2)) {
      ui.showError(calculate, "oops! something is wrong with your input fields");

      // setTimeout(ui.clearError(calculate), 3000);
    } else {
    }

    localStorage.setItem("cGPA2", cGPA2);

    // window.location.href = "result.html";
  }
}

//   constant variables

submit.addEventListener("click", function (e) {
  let ui = new UI();
  ui.newTable();
  // UI.disabled();
  e.preventDefault();
});

//second semester button
submit2.addEventListener("click", function (e) {
  let ui = new UI();
  ui.newTable2();
  UI.disabled2();
  e.preventDefault();
});

// second semester calculation
calculate2.addEventListener("click", function () {
  let ui = new UI();
  ui.calculateCGPA();
  tablebody.remove();
  ui.calculateCGPA2();
  window.location.href = "result.html";
});
