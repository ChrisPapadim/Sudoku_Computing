import Time from "./time.js"

//Load Boards
const easy = [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
  ];
  const medium = [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
  ];
  const hard = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
  ];

  // create variables 
  var timer;
  var timeRemaining;
  var lives;
  var selectedNum;
  var selectedTile;
  var disableSelect;

  window.onload = function () {
      //Run startgame function when button is clicked
      id("start-btn").addEventListener("click", startGame);
      //Add event listener to each number in  number container 
      for (let i = 0; i < id("number-container").children.length; i++) {
          id("number-container").children[i].addEventListener("click", function() {
              //If selecting is not disabled 
              if (!disableSelect) {
                  //If number is already selected
                  if (this.classList.contains("selected")) {
                      //Then remove selection
                      this.classList.remove("selected");
                      selectedNum = null;
                  } else {
                      //Deselect all other numbers
                      for (let i = 0; i < 9; i++) {
                          id("number-container").children[i].classList.remove("selected");
                      }
                      //Select it and update selectedNum Variable
                      this.classList.add("selected");
                      selectedNum = this;
                      updateMove();
                  }
              }
          });
      }
  }

  function startGame() {
      //Choose board difficulty
      let board;
      if (id("diff-1").checked) board = easy[0];
      else if (id("diff-2").checked) board = medium[0];
      else board = hard[0];
      //Set lives to 3 and enable selecting numbers and tiles
      lives = 3;
      disableSelect = false;
      id("lives").textContent = "Lives Remaining: 3";
      //Creates board based on difficulty 
      generateBoard(board);
      //Start the timer
      startTimer();
      //Set theme based on input
      if (id("theme-1").checked) {
          qs("body").classList.remove("dark");
      } else {
          qs("body").classList.add("dark");
      }
      //Show number container 
      id("number-container").classList.remove("hidden");
  }

  function startTimer() {
      //Set timer remaining based on input
      if(id("time-1").checked) timeRemaining = 180;
      else if (id("time-2").checked) timeRemaining = 300;
      else timeRemaining = 600;
      //Set timer for first second
      timer = setInterval(function() {
        timeRemaining --;
        //If no time remaining, end the game
        if (timeRemaining === 0) endGame();
        id("timer").textContent = Time.timeConversion(timeRemaining);
      }, 1000);
  }

 

  function generateBoard(board) {
  //Clear previous boards
  clearPrevious();
  //Let used to increament tiles ids
  let idCount = 0;
  //Create 81 tiles
  for (let i =0; i < 81; i++) {
      //Create a new paragrapf element
      let tile = document.createElement("p");
      //If the tile is not supposed to be blank
      if (board.charAt(i) != "-") {
          //Set tile text to correct number
          tile.textContent = board.charAt(i);
      } else {
          //Add click event listener to tile 
          tile.addEventListener("click", function() {
              //If selecting is not disabled
              if (disableSelect) {
                 //If the tile is already selected
                 if (tile.classList.contains("selected")) {
                     //Then remove selection
                     tile.classList.remove("selected");
                     selectedTile = null;
                 } else {
                     //Deselect all other tiles
                     for (let i = 0; i < 81; i++) {
                         qsa(".tile")[i].classList.remove("selected");
                     }
                     //Add selection and update variable
                     tile.classList.add("selected");
                     selectedTile = tile;
                     updateMove();
                 }
              }
          });
      }
      //Asign tile id 
      tile.id = idCount;
      //Increment for the next tile
      idCount ++;
      //Add tile class to all tiles
      tile.classList.add("tile");
      if ((tile.id > 17 && tile.id < 27) || (tile.id > 44 & tile.id < 54)) {
          tile.classList.add("bottomBorder");
      }
      if ((tile.id + 1) % 9 == 3 || (tile.id + 1) % 9 == 6) {
        tile.classList.add("rightBorder");
      }
      //Add tiles to the board
      id("board").appendChild(tile);
    }
  }

  function updateMove() {
      //If a tile and a number are selected
      if (selectedTile && selectedNum) {
          //Set the tile to the correct number
          selectedTile.textContent = selectedNum.textContent;
          //If the number matches the corresponding number in  the solution key
          if (checkCorrect(selectedTile)) {
            //Deselect the tile
            selectedTile.classList.remove("selected");
            selectedNum.classList.remove("selected");
            //Clear the selected variables
            selectedNum = null;
            selectedTile = null;
            //Check if board is completed 
            if (checkDone()) {
                endGame();
            }
            //If the number does not match solution key 
          } else {
              //Disable selecting new numbers for 1 second
              disableSelect = true;
              //Make the tile turn red
              selectedTile.classList.add("incorrect");
              //Run in 1 second
              setTimeout(function() {
                  //Subtract lives by one
                  lives --;
                  //If no lives left end the game
                  if (lives === 0) {
                       endGame();
                  } else {
                      //If lives is not equal to 0
                      //Update lives to text
                      id("lives").textContent = "Lives Remaining: " + lives;
                      //Renable selecting numbers and tiles
                      disableSelect = false;
                  }
                  //Restore tile color and remove selected from both
                  selectedTile.classList.remove("incorrect");
                  selectedTile.classList.remove("selected");
                  selectedNum.classList.remove("selected");
                  //Clear the tiles text and clear selected variables
                  selectedTile.textContent = "";
                  selectedTile = null;
                  selectedNum = null;
              }, 1000);
          }
      }
  }

  function checkDone() {
      let tiles = qsa(".tile");
      for (let i = 0; i < tile.length; i++) {
          if (tiles.textContent === "") return false;
      }
      return true;
  }

  function endGame() {
      //Disable moves and stop the timer 
      disableSelect = true;
      clearTimeout(timer);
      //Display win or loss message
      if (lives === 0 || timeRemaining === 0) {
          id("lives").textContent = "You Loose!";
      } else {
          id("lives").textContent = "You Win!";
      }
  }

  function checkCorrect(tile) {
      //Set solution based on difficulty selection
      let solution;
      if (id("diff-1").checked) solution = easy[1];
      else if (id("diff-2").checked) solution = medium[1];
      else solution = hard[1];
      //if tile's number is equal to solution's number 
      if (solution.charAt(tile.id) === tile.textContent) return true;
      else return false;
  }

  function clearPrevious() {
      //Acces all of the tiles
      let tiles = qsa(".tile");
      //Remove each tile
      for (let i = 0; i <tiles.length; i++) {
          tiles[i].remove();
      }
      //If there is a timer clear it
      if (timer) clearTimeout(timer);
      //Deselect any numbers
      for (let i = 0; i < id("number-container").children.length; i++) {
          id("number-container").children[i].classList.remove("selected");
      }
      //Clear selected variables
      selectedTile = null;
      selectedNum = null;
  }

  //Helper Functions
  function id(id) {
      return document.getElementById(id);
  }

  function qs(selector) {
      return document.querySelector(selector);
  }

  function qsa(selector) {
      return document.querySelectorAll(selector);
  }

 
