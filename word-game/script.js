const letters = document.querySelectorAll('.scoreboard-letter');
const loadingDiv = document.querySelector('.info-bar');
const ANSWER_LENGTH = 5;
const ROUNDS = 6

console.log(letters);

 async function init() {
    let currentGuess = '';
    let currentRow = 0;
    let isLoading = true


    const res = await fetch("https://words.dev-apis.com/word-of-the-day");
    const resObj = await res.json();
    const word = resObj.word.toUpperCase();
    const wordParts = word.split("");
    let done = false;
    setLoading(false)
    isLoading = false



    console.log(word)

    function addLetter (letter) {
        if (currentGuess.length < ANSWER_LENGTH) {
            //add letterto the end
            currentGuess += letter
        } else {
            //replace the last
            currentGuess = currentGuess.substring(0, currentGuess.length -1) + letter;
        }

        letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText = letter;
    }


    async function commit() {
        if (currentGuess.length !== ANSWER_LENGTH) {
            //hechi
            return;
        }

        isLoading = true;   
        setLoading(true);
        const res = await fetch("https://words.dev-apis.com/validate-word" , {
            method : "POST",
            body: JSON.stringify({word : currentGuess})
        })
        const resObj = await res.json();
        const validWord = resObj.validWord;

        isLoading = false;
        setLoading(false);
        if(!validWord) {
            markInValidWord();
            return;
        }

       




        
        // TODO validate the word
        // TODO do all the making as 'correct' 'colse' or 'wrong'
        
        const guessParts = currentGuess.split("");
        const map = makeMap(wordParts)
        console.log(map);
        
        for (let i = 0; i< ANSWER_LENGTH; i++) {
            //mark as correct
            if(guessParts[i] === wordParts[i]) {
                letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
                map[guessParts[i]]--
            }
        }
        
        for (let i = 0; i< ANSWER_LENGTH; i++) {
            //mark as correct
            if(guessParts[i] === wordParts[i]) {
                //hechi
            } else if(wordParts.includes(guessParts[i]) && map[guessParts[i]] > 0 ) {
                letters[currentRow * ANSWER_LENGTH + i].classList.add("close")
                map[guessParts[i]]--
            } else {
                letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong")
            }
        }
        
        
        
        // TODO did they win or lose?
        
        currentRow++
        
        if (currentGuess === word) { 
            //win
            alert('you win');
            document.querySelector('.brand').classList.add('winner');
            done = true
            return;
        } else if(currentRow === ROUNDS) {
            alert(`you lose the word was ${word} `)
            done = true
        }
        currentGuess = ''       
    }
    function backspace() {
        currentGuess = currentGuess.substring(0, currentGuess.length - 1);
        letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = "";
    
    }
    
    function markInValidWord () {

        for (let i = 0; i < ANSWER_LENGTH; i++) {
            letters[currentRow * ANSWER_LENGTH + i].classList.remove("invalid");

            setTimeout(function () {
                letters[currentRow * ANSWER_LENGTH + i].classList.add("invalid");

            }, 10)

        }
    }

    document.addEventListener('keydown', function handelKeyPress(event) {
       if( done || isLoading) {
        //hechi
        return;
       }
       
       
        const action = event.key



        
        console.log(action);

        if (action === 'Enter') {
            commit();
        }else if (action === 'Backspace') {
            backspace();
        } else if (isLetter(action)) {
            addLetter(action.toUpperCase())
        } else {
            //hechi
        }
    });
 }




 function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }

  function setLoading(isLoading) { 
    loadingDiv.classList.toggle('show', isLoading);
  }

  function makeMap (array) {
    const obj ={};
    for(let i=0; i < array.length; i++) {
        const letter = array[i]
        if (obj[letter]) {
            obj[letter]++;
        } else {
            obj[letter] = 1
        }
         
    }
     
    return obj
  }


 init();