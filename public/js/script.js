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

let getButtons = (e) => e.preventDefault()

let changeForm = (e) => {
   console
    switchCtn.classList.add("is-gx");
    setTimeout(function(){
        switchCtn.classList.remove("is-gx");
    }, 1500)

    switchCtn.classList.toggle("is-txr");
    switchCircle[0].classList.toggle("is-txr");
    switchCircle[1].classList.toggle("is-txr");

    switchC1.classList.toggle("is-hidden");
    switchC2.classList.toggle("is-hidden");
    aContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-z200");
}

let mainF = (e) => {
   /* for (var i = 0; i < allButtons.length; i++)
        allButtons[i].addEventListener("click", getButtons );*/
    for (var i = 0; i < switchBtn.length; i++)
        switchBtn[i].addEventListener("click", changeForm)
}

  window.addEventListener("load", mainF);
 
/* CREATE PROPOSAL FORM TOGGLE */

 console.log()

 const addButton = document.querySelector('#addProposal')

 console.log(addButton)

 addButton.addEventListener('click', createProposal)

 function createProposal(){
   console.log('hi')
   const createProposalForm = document.getElementById('createProposal')
   const submittedProposals = document.getElementById('submittedProposals')
   createProposalForm.classList.toggle('hidden')
   submittedProposals.classList.toggle('hidden')

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

// preview proposal thumbnail pic
let setPropImg =  document.getElementById('imageUpload')

setPropImg.onchange = e => {
  previewFile()
} 


let addSupplements =  document.getElementById('extraMtrls')

addSupplements.onchange = e => {
  var file    = addSupplements.files[0];
  var reader  = new FileReader();

  reader.onloadend = function () {
    let fileSize = (file.size)
    let fileName = (file.name)
    let fileType = (file.type)
      if (fileSize > (1024 * 1024 * 10)){
        placeErrMsg.style.color = 'red'
        placeErrMsg.innerText= `"${fileName}" TOO LARGE. MAX FILE SIZE: 10MB`
      } else if (!(
        fileType === 'application/pdf' ||
        fileType === 'application/msword' ||
        fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        fileType === 'image/png' ||
        fileType === 'image/jpg' ||
        fileType === 'image/jpeg')){
          placeErrMsg.style.color = 'red'
          placeErrMsg.innerText= `CANNOT UPLOAD "${fileName}". ACCEPTED FILE TYPES: png, jpeg, jpg, pdf, doc, or docx`
      } else {
        placeErrMsg.style.color = '#006400'
        placeErrMsg.innerText= 'MAX FILE SIZE: 10MB'
      }
} 
}


function previewFile() {
  var preview = document.querySelector('#propImgPreview');
  var file    = document.querySelector('#imageUpload').files[0];
  var reader  = new FileReader();
  reader.onloadend = function () {
    preview.src = reader.result;
      let fileSize = (file.size)
      let fileName = (file.name)
      let fileType = (file.type)

      let placeErrMsg = document.getElementById('upldErrMsg')

      if (fileSize > (1024 * 1024 * 10)){
  
        placeErrMsg.style.color = 'red'
        placeErrMsg.innerText= `"${fileName}" IMG TOO LARGE. MAX FILE SIZE: 10MB`
        
      } else if (!(
        fileType === 'image/png' ||
        fileType === 'image/jpg' ||
        fileType === 'image/jpeg')){
          placeErrMsg.style.color = 'red'
          placeErrMsg.innerText= `CANNOT UPLOAD "${fileName}". ACCEPTED FILE TYPES: png, jpeg, or jpg`
      } else {
        placeErrMsg.style.color = '#006400'
        placeErrMsg.innerText= 'MAX FILE SIZE: 10MB'
      }
    
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}