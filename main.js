$(document).ready(function() {
    $('#losingScreen').hide()
    $('#winningScreen').hide()
    function runNewgame(){
    $('#introScreen').on('click','button',function(){
       newGame()
       $('#introScreen').hide(1000)
    })
    
}
runNewgame()

// The shuffle for the deck
function shuffle(deck) {
    let currentIndex = deck.length
    let temporaryValue
    let randomIndex
    const newArray = deck.slice()
    // While there remains elements to shuffle...
    while (currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      // Swap it with the current element.
      temporaryValue = newArray[currentIndex]
      newArray[currentIndex] = newArray[randomIndex]
      newArray[randomIndex] = temporaryValue
    }
    return newArray
  }
    //Global Variables  
    var attempts = '20'
    var firstValue = ''
    var secondValue = ''
    var newArray = []
    var matchedCards = []
    console.log(attempts)
    
  
    // this starts the function to  get cards face down
    function readyDeck(deck) {
        let teams = ""
        deck = shuffle(deck)
        // this adds a button with the class face-down in the html
        deck.forEach(l => {
            teams += `<div id="buttons" value="${l.value}" value="
            ${l.number}" class="wholecard"> 
             <span class="facematch card">
             <img class="logos" class="${l.value}" src="${l.main}"/>
             </span>
             <span class="backmatch card">
             <img class="nba" src="./nbaimages/NBA.png" />
             </span>
          </div>`
        })
       //adds the buttons in HTML through jQuery 
        $("#buttons").html(teams)
       
      }

    readyDeck(deck)

    
    // These two functions are called when you win or lose
    // They have a passive section however once you click on the button it refreshes the page, restarting the game
    function wrongRestart(){
        clearInterval(interval)
        $('#buttons *').prop('disabled',true)
        $('#losingScreen').show(2000)
        $('#losingScreen').on('click','button',function(){
            $("#losingScreen").hide(1000)
            window.location.reload()
            return
    })
    }
    function correctRestart(){
        clearInterval(interval)
        $('#buttons *').prop('disabled',false)
        $('#winningScreen').show(1000)
        $('#winningScreen').on('click','button',function(){
            $("#winningScreen").hide(1000), window.location.reload()
            return
        }) 
    }
    

    // /////////////////////////////// //
    // STARTS THE GAME FUNTION IN THE APP
    function newGame(){
    //   we call the timing function within the main function
    var sec = 0;
    function pad ( val ) { return val > 9 ? val : "0" + val ;}
    var interval = setInterval( function time(){
        $("#seconds").html(pad(++sec%60));
        $("#minutes").html(pad(parseInt(sec/60,10)))
        return ;
    }, 1000);
    $("#buttons").on("click",'div',function(e) {
      e.preventDefault()
   
    // THIS is set to the button
    // thisValue is getting the value of the array which is the letter
    //  We want to push the value into the a newArray in order to compare
     // and its the start of the the comparison of the cards
      thisValue = $(this).attr('value')
      thisCard = $(this)
      newArray.push($(this))
      $(this).addClass('stay')
      
      
    
    //   IF ELSE statements
      if(firstValue ===  ''){
        firstValue = thisValue
        console.log(firstValue)

      }else if(firstValue !==  '' && secondValue ===  ''){
          secondValue = thisValue
          console.log(secondValue)
          $('#buttons *').prop('disabled', true)
          
         
        //   if the cards match addClass stay so they remain flipped
            if(firstValue === secondValue){
                setTimeout(function(){
                // we assign the class of stay so they remain flipped and then push into a matchedCards array so they are able accumulate and then can be later compared
                newArray[0].addClass("stay")
                matchedCards.push(firstValue)
                newArray[1].addClass('stay')
                matchedCards.push(secondValue)
                // we clear the variables
                firstValue = ''
                secondValue = ''
                newArray = []
                attempts = attempts
                //this checks if the 2 mentioned arrays match and then run the function
                if(matchedCards.length == deck.length){
                  correctRestart()
                  return
                }
                // Updates the remaining guesses
                $("#guess").html(`Guesses Remaining: ${attempts}`)
                $('#message').html('Awesome keep going!') 
                $('#buttons *').prop('disabled',false)
        
                },1000)  
            }else if(firstValue !== secondValue){
                setTimeout(function(){
                newArray[0].removeClass('stay')
                newArray[1].removeClass('stay')
                firstValue = ''
                secondValue = ''
                newArray = []
                attempts --
                if(attempts == ''){
                    wrongRestart()
                    return 
                }
                $("#guess").html(`Guesses Remaining: ${attempts}`)
                $('#message').html('You gotta try harder than that.') 
                $('#buttons *').prop('disabled',false)
                
                }, 1000)
            }
        }
    })
}
})
  
    