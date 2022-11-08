//const trash = document.getElementsByClassName("fa-trash-o")

const addButton = document.getElementById('addProposal')

addButton.addEventListener('click', createProposal)

function createProposal(){
  console.log('hi')
  const createProposal = document.getElementById('createProposal')

  console.log(createProposal)
  createProposal.classList.toggle('hide')
}

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
