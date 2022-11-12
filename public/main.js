/*const trash = document.getElementsByClassName("fa-trash-o")*/

alert('hello world')

const addButton = document.querySelector('#addProposal')

console.log(addButton)

addButton.addEventListener('click', createProposal)

function createProposal(){
  console.log('hi')
  const createProposalForm = document.getElementById('createProposal')
  createProposalForm.classList.toggle('hidden')
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