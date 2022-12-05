/* LOGIN FORM */

let switchCtn = document.querySelector("#switch-cnt");
let switchC1 = document.querySelector("#switch-c1");
let switchC2 = document.querySelector("#switch-c2");
let switchCircle = document.querySelectorAll(".switch__circle");
let switchBtn = document.querySelectorAll(".switch-btn");
let aContainer = document.querySelector("#a-container");
let bContainer = document.querySelector("#b-container");
let allButtons = document.querySelectorAll(".submit");

console.log('this is the switch button: '+ switchBtn)
let getButtons = (e) => e.preventDefault()

let changeForm = (e) => {
    console.log('switch activated')
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
    for (var i = 0; i < allButtons.length; i++)
        allButtons[i].addEventListener("click", getButtons );
    for (var i = 0; i < switchBtn.length; i++)
        switchBtn[i].addEventListener("click", changeForm)
}

window.addEventListener("load", mainF);


/* CREATE PROPOSAL FORM TOGGLE */

console.log(document.querySelector('#addProposal'))

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

/* COMMUNITY ID CARD ACCORDION*/

  Array.from(document.getElementsByClassName('communityID')).forEach(item => {
    item.addEventListener('click', toggleAccordion)
    console.log('this is a card: '+ item)
  })

  function toggleAccordion(){
    console.log('you clicked one of the cards')

    this.nextElementSibling.slideToggle(100);
    document.getElementsByClassName('communityStats').not(this.nextElementSibling).slideUp('fast');
  }

/*
Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('trash', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
*/