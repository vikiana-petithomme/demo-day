//PROFILE PAGE 

  // PROFILE AVATAR UPLOAD


  const uploadNewAvatar = document.getElementById('OpenImgUpload')

  uploadNewAvatar.addEventListener('click', allowUpload)

  function allowUpload(){

    var changeProfile = document.getElementById('imgupload');

    changeProfile.onchange = e => { 

      // getting a hold of the file reference
      var file = e.target.files[0]; 

      // setting up the reader
      var reader = new FileReader();
      reader.readAsText(file,'UTF-8');

      // here we tell the reader what to do when it's done reading...
      reader.onload = readerEvent => {
          var content = readerEvent.target.result; // this is the content!
          console.log( content );
      }
      previewFile()
    }
    
    changeProfile.click();
    
    function previewFile() {
      var preview = document.querySelector('#avatar');
      var file    = document.querySelector('#imgupload').files[0];
      var reader  = new FileReader();
    
      reader.onloadend = function () {
        preview.src = reader.result;
      }
    
      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = "";
      }
    }
  }

  // edit Profile Information

  let editButton = document.getElementsByClassName('fa-pen')
  console.log(editButton)
  Array.from(editButton).forEach(btn => {
    console.log(btn)

    btn.addEventListener('click', allowProfileEdit)
  })

  function allowProfileEdit(e){
    console.log('you made it')
    let pencil = e.target 
    pencil.classList.add('hidden')
    let fieldID = pencil.parentElement.getAttribute('id')
    console.log(fieldID)
    let userID = document.getElementById('avatar').parentElement.parentElement.getAttribute('id')
    if(fieldID === 'userBio'){
        location.href = `/users/updateUser/resetUserBio/${userID}?_method=PUT`;
    } else if(fieldID === 'userLoc'){
      location.href = `/users/updateUser/resetLocation/${userID}?_method=PUT`;
      console.log('redirect')
    } else if(fieldID === 'sharedWebsite'){
      location.href = `/users/updateUser/resetSharedSite/${userID}?_method=PUT`;

    }
  }

  /* CHANGE PASSWORD*/
  let newP=document.getElementById("newPassword").value;
  let confirmP =document.getElementById("confirmPassword").value;

  newP.onchange = e => {
    newP=document.getElementById("newPassword").value;
    confirmP =document.getElementById("confirmPassword").value;
    checkForm()
  }
  confirmP.onchange = e => {
    newP=document.getElementById("newPassword").value;
    confirmP =document.getElementById("confirmPassword").value;
    checkForm()
  }
  function checkForm()
   {
    newP = document.getElementById("newPassword").value;
    confirmP = document.getElementById("confirmPassword").value;
    let oldP=document.getElementById("oldPassword").value;

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

  /* COMMUNITY ID CARD ACCORDION*/
    (function ($) {
      'use strict';
    $('.communityID').on("click", function () {
          $(this).next().slideToggle(100);
          $('.communityStats').not($(this).next()).slideUp();

      });
    }(jQuery));
 // PROFILE PAGE NAV

 const profileNav = document.querySelector('.profNav.profile')

 profileNav.addEventListener('click', showProfileContent)

 let userIDCard = document.querySelector('.userIDCard')
 let editProfile = document.querySelector('.editProfile')
 let myProposals = document.querySelector('.myProposals')
 let likedProposals = document.querySelector('.likedProposals')
 


 function showProfileContent(){
     profileNavItems[0].classList.add('showContent')
     profileNavItems[1].classList.remove('showContent')
     //profileNavItems[2].classList.remove('showContent')
     userIDCard.classList.remove('hidden')
     editProfile.classList.remove('hidden')
     myProposals.classList.add('hidden')
     likedProposals.classList.add('hidden')
     //accordion.classList.add('hidden')
     //createCommunity.classList.add('hidden')
 }


 const proposalNav = document.querySelector('.profNav.proposals')

 proposalNav.addEventListener('click', showProposalContent)

 function showProposalContent(){
   profileNavItems[0].classList.remove('showContent')
   profileNavItems[1].classList.remove('showContent')
   //profileNavItems[2].classList.add('showContent')
   myProposals.classList.remove('hidden')
   likedProposals.classList.remove('hidden')
   userIDCard.classList.add('hidden')
   editProfile.classList.add('hidden')
  // accordion.classList.add('hidden')
  // createCommunity.classList.add('hidden')
 }

 let profileNavigationItems = document.getElementsByClassName('profNav')
 let profileNavItems = Array.from(profileNavigationItems)
 profileNavItems.forEach(item => {
   if( profileNavItems.indexOf(item) === 0){
     
   } else if (profileNavItems.indexOf(profileNavItems) === 1){
     
   } else if (profileNavItems.indexOf(profileNavItems) === 2){
     
   }
 })

   