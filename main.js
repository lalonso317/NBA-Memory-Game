$(document).ready(function() {
function shuffle(deck) {
    //   console.log("---> shuffle")
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
    var firstValue = ''
    var secondValue = ''
    var newArray = []
    var attempts = 0
  
  
    // this starts the function to  get cards face down
    function readyDeck(deck) {
        let buttons = ""
        deck = shuffle(deck)
        // this adds a button with the class face-down in the html
        deck.forEach(l => {
          buttons += `<button id="buttons"value="${l.value}"class="face-down">${l.value}</button>`
        })
       //adds the buttons in HTML through jQuery 
        $("#buttons").html(buttons)
      }

  
    
  
    readyDeck(deck)
    // this click gives the card the flip function
    
    // STARTS THE JQUERY FUNTION IN THE APP
    $("#buttons").on("click",'button',function(e) {
      e.preventDefault()
    // THIS is set to the button
    // thisValue is getting the value of the array so the letter or image
      thisValue = $(this).val()
      thisCard = $(this)
   
    //  We want to push the value into the a newArray
      newArray.push($(this))
      $(this).addClass('stay')
      
        
    // this clears the variables used in the comparison
      
   
    // this is the start of the the comparison of the cards
      if(firstValue === ''){
        firstValue = thisValue
        
      }else if(firstValue !== '' && secondValue === ''){
          secondValue = thisValue
          $('#buttons *').prop('disabled', true)
         
        //   if the cards match rmClass face-down and adClass stay
            if(firstValue === secondValue){
                setTimeout(function(){
                newArray[0].addClass('stay')
                newArray[1].addClass('stay')
                firstValue = ''
                secondValue = ''
                newArray = []
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
                    $('#message').html('You gotta try harder than that.') 
                    $('#buttons *').prop('disabled',false)
                
                }, 1000)
            }
        }
    })
})
  
    