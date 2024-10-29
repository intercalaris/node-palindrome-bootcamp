document.querySelector('#button').addEventListener('click', makeReq)

function makeReq(){

    const word = document.querySelector("#palindrome-input").value;
  
    fetch(`/api?word=${word}`)
      .then(response => response.json())
      .then((data) => {
          console.log(data);
          if (data['isPalindrome'] === true) {
              document.querySelector("#positive").classList.remove("hidden");
              document.querySelector("#negative").classList.add("hidden");
          } else {
              document.querySelector("#negative").classList.remove("hidden");
              document.querySelector("#positive").classList.add("hidden");
          }
      });
  
  }