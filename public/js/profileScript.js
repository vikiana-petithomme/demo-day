//PROFILE PAGE

// PROFILE AVATAR UPLOAD

const uploadNewAvatar = document.getElementById("OpenImgUpload");

uploadNewAvatar.addEventListener("click", allowUpload);

function allowUpload() {
  var changeProfile = document.getElementById("imgupload");

  changeProfile.onchange = (e) => {
    // getting a hold of the file reference
    var file = e.target.files[0];

    // setting up the reader
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    // here we tell the reader what to do when it's done reading...
    reader.onload = (readerEvent) => {
      var content = readerEvent.target.result; // this is the content!
      console.log(content);
    };
    previewFile();
  };

  changeProfile.click();

  function previewFile() {
    var preview = document.querySelector("#avatar");
    var file = document.querySelector("#imgupload").files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  }
}

// edit Profile Information
let editProfileSubmit = document.getElementById("editProfBtn");
let editProfileLabel = document.getElementById("finishProfLabel");
let editProfSection = editProfileLabel.parentElement;

console.log(editProfSection.children);
if (
  editProfSection.children[1] === editProfileSubmit ||
  editProfSection.children[0] === editProfileSubmit
) {
  console.log(editProfSection.children[0] === editProfileSubmit);
  editProfileLabel.classList.add("hidden");
}
if (editProfSection.children[1] === editProfileSubmit) {
  console.log(editProfSection.children[1] === editProfileSubmit);
  editProfileSubmit.classList.add("hidden");
} else {
  editProfileSubmit.classList.remove("hidden");
}
if (editProfSection.children.length <= 2) {
  editProfSection.classList.add("hidden");
} else {
  editProfSection.classList.remove("hidden");
}

/* CHANGE PASSWORD
  

  document.getElementById('newPWForm').onchange = e => {
    let newP=document.getElementById("newPassword").value;
    let confirmP =document.getElementById("confirmPassword").value;
    let oldP=document.getElementById("oldPassword").value;
    checkForm()

    function checkForm(){

    if(oldP!=""&&newP!=""&&confirmP!="")
    {
      if(oldP!=newP)
      {
        if(newP==confirmP)
         {
          return true;
         }
         else
          {
            alert("Confirm password is not same as you new password.");
            return false;
          }
      }
      else
     {
      alert(" This Is Your Old Password,Please Provide A New Password");
      return false;
     }
    }
    else
    {
     alert("All Fields Are Required");
     return false;
    }
}
  }
  
  */
/* COMMUNITY ID CARD ACCORDION*/
(function ($) {
  "use strict";
  $(".communityID").on("click", function () {
    $(this).next().slideToggle(100);
    $(".communityStats").not($(this).next()).slideUp();
  });
})(jQuery);
// PROFILE PAGE NAV

const profileNav = document.querySelector(".profNav.profile");

profileNav.addEventListener("click", showProfileContent);

let userIDCard = document.querySelector(".userIDCard");
let editProfile = document.querySelector(".editProfile");
let myProposals = document.querySelector(".myProposals");
let likedProposals = document.querySelector(".likedProposals");

let profileNavigationItems = document.getElementsByClassName("profNav");
let profileNavItems = Array.from(profileNavigationItems);

function showProfileContent() {
  profileNavItems[0].classList.add("showContent");
  profileNavItems[1].classList.remove("showContent");
  //profileNavItems[2].classList.remove('showContent')
  userIDCard.classList.remove("hidden");
  editProfile.classList.remove("hidden");
  myProposals.classList.add("hidden");
  likedProposals.classList.add("hidden");
  //accordion.classList.add('hidden')
  //createCommunity.classList.add('hidden')
}

const proposalNav = document.querySelector(".profNav.proposals");

proposalNav.addEventListener("click", showProposalContent);

function showProposalContent() {
  profileNavItems[0].classList.remove("showContent");
  profileNavItems[1].classList.add("showContent");
  //profileNavItems[2].classList.add('showContent')
  myProposals.classList.remove("hidden");
  likedProposals.classList.remove("hidden");
  userIDCard.classList.add("hidden");
  editProfile.classList.add("hidden");
  // accordion.classList.add('hidden')
  // createCommunity.classList.add('hidden')
}

//submit edit profile forms using one button

const editProfBtn = document.getElementById("editProfBtn");
editProfBtn.addEventListener("click", submitForms);

function submitForms(e) {
  console.log("trying to submit forms");
  let button = e.target;
  console.log(button);
  let section = button.parentElement;
  console.log(section);
  let newLocation = document.getElementById("newLocation");
  let newSite = document.getElementById("newSite");
  let newBio = document.getElementById("newBio");
  let locationInput = document.getElementById("location");
  let siteInput = document.getElementById("userWeb");
  let bioInput = document.getElementById("bioText");

  if (locationInput?.value.length > 0) {
    newLocation.submit();
    console.log("submitted new location");
  }
  if (siteInput?.value.length > 0) {
    newSite.submit();
    console.log("submitted new site");
  }
  if (bioInput?.value.length > 0) {
    newBio.submit();
    console.log("submitted new bio");
  }
}
