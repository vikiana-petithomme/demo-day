/*
		Designed by: SELECTO
		Original image: https://dribbble.com/shots/5311359-Diprella-Login
*/

let switchCtn = document.querySelector("#switch-cnt");
let switchC1 = document.querySelector("#switch-c1");
let switchC2 = document.querySelector("#switch-c2");
let switchCircle = document.querySelectorAll(".switch__circle");
let switchBtn = document.querySelectorAll(".switch-btn");
let aContainer = document.querySelector("#a-container");
let bContainer = document.querySelector("#b-container");
let allButtons = document.querySelectorAll(".submit");

let getButtons = (e) => e.preventDefault();

let changeForm = (e) => {
  switchCtn.classList.add("is-gx");
  setTimeout(function () {
    switchCtn.classList.remove("is-gx");
  }, 1500);

  switchCtn.classList.toggle("is-txr");
  switchCircle[0].classList.toggle("is-txr");
  switchCircle[1].classList.toggle("is-txr");

  switchC1.classList.toggle("is-hidden");
  switchC2.classList.toggle("is-hidden");

  aContainer.classList.toggle("is-txl");
  bContainer.classList.toggle("is-txl");
  bContainer.classList.toggle("is-z200");
};

let mainF = (e) => {
  /* for (var i = 0; i < allButtons.length; i++)
        allButtons[i].addEventListener("click", getButtons );*/
  for (var i = 0; i < switchBtn.length; i++)
    switchBtn[i].addEventListener("click", changeForm);
};

window.addEventListener("load", mainF);

/* SORT BY CATEGORY */

let catSelector = document.getElementById("categoryFilter");

window.onload = function () {
  let filterBy = sessionStorage.getItem("showCat");
  catSelector.value = filterBy;
};

catSelector.onchange = (e) => {
  let showCat = catSelector.value;
  if (showCat.includes("&")) {
    let catArray = showCat.split("");

    let index = catArray.indexOf("&");

    catArray[index] = "%26";

    let showCatUrl = catArray.join("");

    sessionStorage.setItem("showCat", showCat);

    window.location.href = `?category=${showCatUrl}`;
  } else {
    sessionStorage.setItem("showCat", showCat);

    window.location.href = `?category=${showCat}`;
  }
};

/* CREATE PROPOSAL FORM TOGGLE */

const addButton = document.querySelector("#addProposal");

addButton.addEventListener("click", createProposal);

function createProposal() {
  const createProposalForm = document.getElementById("createProposal");
  const submittedProposals = document.getElementById("submittedProposals");
  createProposalForm.classList.toggle("hidden");
  submittedProposals.classList.toggle("hidden");
}
/*
 const fileInput = document.getElementById('extraMtrls')

 let fileList = [ ]

 fileInput.addEventListener('change', function(evnt){
  fileList = []
  for(let i=0; i < fileInput.files.length; i++){
    fileList.push(fileInput.files[i])
  }
 })*/

/*fileCatcher.addEventListener('submit', function(evnt){
  console.log(fileList)
  fileList.forEach(function(file)
  {
    sendFile(file)
})
})

sendFile = function(file){
  var formData = new FormData()
  var request = new XHLHttpRequest()

  formData.set('file', file)
  request.open('POST','proposal/createProposal' )
  request.send(formData)
}*/
tinymce.init({
  selector: "textarea#propFull",
  width: "100%",
  resize: false,
  plugins:
    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
  toolbar:
    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
  tinycomments_mode: "embedded",
  tinycomments_author: "Author name",
  mergetags_list: [
    { value: "First.Name", title: "First Name" },
    { value: "Email", title: "Email" },
  ],
  menu: {
    file: {
      title: "File",
      items:
        "newdocument restoredraft | preview | export print | deleteallconversations",
    },
    edit: {
      title: "Edit",
      items: "undo redo | cut copy paste pastetext | selectall | searchreplace",
    },
    view: {
      title: "View",
      items:
        "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments",
    },
    insert: {
      title: "Insert",
      items:
        "image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime",
    },
    format: {
      title: "Format",
      items:
        "bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat",
    },
    tools: {
      title: "Tools",
      items: "spellchecker spellcheckerlanguage | a11ycheck code wordcount",
    },
    table: {
      title: "Table",
      items:
        "inserttable | cell row column | advtablesort | tableprops deletetable",
    },
    help: { title: "Help", items: "help" },
  },
});

// create new category
const createProposalForm = document.getElementById("createProposal");

document
  .getElementById("propImgField")
  .addEventListener("click", openImgFileUpload);

function openImgFileUpload() {
  document.getElementById("imageUpload").click();
}

document
  .getElementById("matrlsField")
  .addEventListener("click", openMtrlsFileUpload);

function openMtrlsFileUpload() {
  document.getElementById("extraMtrls").click();
}

createProposalForm.onchange = (e) => {
  yesnoCheck();
};

function yesnoCheck() {
  if (document.getElementById("category").value === "other") {
    document.getElementById("createCategory").classList.remove("hidden");
  } else {
    document.getElementById("createCategory").classList.add("hidden");
  }
}

// preview proposal thumbnail pic
let setPropImg = document.getElementById("imageUpload");

setPropImg.onchange = (e) => {
  previewFile();
};

let addSupplements = document.getElementById("extraMtrls");

addSupplements.onchange = (e) => {
  var file = addSupplements.files[0];
  var reader = new FileReader();

  reader.onloadend = function () {
    let fileSize = file.size;
    let fileName = file.name;
    let fileType = file.type;
    if (fileSize > 1024 * 1024 * 10) {
      placeErrMsg.style.color = "red";
      placeErrMsg.innerText = `"${fileName}" TOO LARGE. MAX FILE SIZE: 10MB`;
    } else if (
      !(
        fileType === "application/pdf" ||
        fileType === "application/msword" ||
        fileType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        fileType === "image/png" ||
        fileType === "image/jpg" ||
        fileType === "image/jpeg"
      )
    ) {
      placeErrMsg.style.color = "red";
      placeErrMsg.innerText = `CANNOT UPLOAD "${fileName}". ACCEPTED FILE TYPES: png, jpeg, jpg, pdf, doc, or docx`;
    } else {
      placeErrMsg.style.color = "#006400";
      placeErrMsg.innerText = "MAX FILE SIZE: 10MB";
    }
  };
};

function previewFile() {
  var preview = document.querySelector("#propImgPreview");
  var file = document.querySelector("#imageUpload").files[0];
  var reader = new FileReader();
  reader.onloadend = function () {
    preview.src = reader.result;
    let fileSize = file.size;
    let fileName = file.name;
    let fileType = file.type;

    let placeErrMsg = document.getElementById("upldErrMsg");

    if (fileSize > 1024 * 1024 * 10) {
      placeErrMsg.style.color = "red";
      placeErrMsg.innerText = `"${fileName}" IMG TOO LARGE. MAX FILE SIZE: 10MB`;
    } else if (
      !(
        fileType === "image/png" ||
        fileType === "image/jpg" ||
        fileType === "image/jpeg"
      )
    ) {
      placeErrMsg.style.color = "red";
      placeErrMsg.innerText = `CANNOT UPLOAD "${fileName}". ACCEPTED FILE TYPES: png, jpeg, or jpg`;
    } else {
      placeErrMsg.style.color = "#006400";
      placeErrMsg.innerText = "MAX FILE SIZE: 10MB";
    }
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}

// SAVING PROPOSAL DRAFT

// Liking a Proposal

let likeBtns = document.querySelectorAll("#upVote");
for (let i = 0; i < Array.from(likeBtns).length; i++) {
  likeBtns[i].addEventListener("click", function (e) {
    let thisButton = e.target;
    let likedHeart = thisButton.child;
    thisButton.classList.toggle("liked");
    thisButton.classList.toggle("material-symbols-outlined");
    likedHeart.classList.toggle("hidden");
    console.log(likedHeart);
  });
}

function getURL() {
  return window.location.href;
}

getURL();

let currentURL = getURL();

const getTopProposals = document.getElementById("top");
const getNewProposals = document.getElementById("new");

if (currentURL.includes("top")) {
  getTopProposals.classList.add("bold");
  getNewProposals.classList.remove("bold");
} else {
  getTopProposals.classList.remove("bold");
  getNewProposals.classList.add("bold");
}
