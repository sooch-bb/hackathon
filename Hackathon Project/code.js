//initialize lists that are pulled from the Bechdel Test data table
//each list holds a single column. The names are self-explanatory
var yearList = getColumn("Bechdel Test", "year");
var idList = getColumn("Bechdel Test", "id");
var titleList = getColumn("Bechdel Test", "title");
var resultList = getColumn("Bechdel Test", "test result");
var ratedList = getColumn("Bechdel Test", "rated");
var plotList = getColumn("Bechdel Test", "plot");
var posterList = getColumn("Bechdel Test", "poster");

//initialize filtered lists
//Purpose of filtered list is to isolate a single year for the dropdown
var filteredYearList = [];
var filteredTitleList = [];
var filteredResultList = [];
var filteredRatedList = [];
var filteredPlotList = [];
var filteredPosterList = [];

//changes the screen to the history page when the first next button is clicked
onEvent("next1", "click", function( ) {
  setScreen("historyScreen");
});

//changes the screen to the movie selecting page when the second next button is clicked
onEvent("next2", "click", function( ) {
  setScreen("quizScreen");
});

//changes the screen to the movie selecting page when the NEW MOVIE button is clicked
//and clears all the elements that should not initially show up and clears any stored data
onEvent("newMovieButton", "click", function( ){
  hideElement("checkAnswer");
  hideElement("opaqueCover");
  hideElement("failButton");
  hideElement("passButton");
  hideElement("quizPopUp");
  hideElement("learnButton");
  setProperty("yearDropdown", "index", 0);
  setProperty("movieDropdown", "options", [null]);
  setScreen("quizScreen");
});

//runs the filter function when a year is selected in the dropdown, resets the movie dropdown
//to be empty, hides all the elements that will show up once the movie is selected
onEvent("yearDropdown", "change", function( ){
  filter();
  setProperty("movieDropdown", "index", 0);
  hideElement("checkAnswer");
  hideElement("opaqueCover");
  hideElement("failButton");
  hideElement("passButton");
  hideElement("quizPopUp");
  hideElement("learnButton");
});

//shows the elements for the quiz (pop-up, pass and fail buttons), but hides the other elements
//in order to reset the quiz if a new movie is chosen without going to screen 4 and learning about 
//the previous movie
onEvent("movieDropdown", "change", function( ){
  showElement("quizPopUp");
  showElement("passButton");
  showElement("failButton");
  hideElement("checkAnswer");
  hideElement("opaqueCover");
  hideElement("learnButton");
});

//runs PASS as a parameter through the passOrFail function when Pass button is clicked
//any time the parameter is represented in the function, PASS is compared to the correct
//result from the data table and will display CORRECT or INCORRECT based on whether it matches or not
onEvent("passButton", "click", function( ) {
  passOrFail("PASS");
});

//runs FAIL as a parameter through the passOrFail function when Fail button is clicked
//any time the parameter is represented in the function, FAIL is compared to the correct
//result from the data table and will display CORRECT or INCORRECT based on whether it matches or not
onEvent("failButton", "click", function( ) {
  passOrFail("FAIL");
});

//when the learn button is clicked, the updateScreen function runs, simultanously changing the screen
//to screen 4 from within the function
onEvent("learnButton", "click", function( ) {
  updateScreen();
});

//filter() - Purpose of Function
//runs in order to fill the movieDropdown with movies that correspond to the year
  //filters the remaining movies that do not correspond to the selected year out of the new filtered list
  //and appends the ones that do
//No Parameters
//Variables in Use: filteredYearList, filteredTitleList, filteredResultList, filteredRatedList,
//filteredPlotList, filteredPosterList, yearList, titleList, resultList, ratedList, plotList, posterList
//Lists in Use: the "filtered" versions/counterparts of the lists initialized from the data table
//design IDs in Use: yearDropdown and movieDropdown
function filter(){
  filteredYearList = ["Select a Year"];
  filteredTitleList = ["Select a Movie"];
  filteredResultList = [" "];
  filteredRatedList = [" "];
  filteredPlotList = [" "];
  filteredPosterList = [" "];
  for (var i = 0; i < idList.length; i++) {
	   	if (getText("yearDropdown") == yearList[i]){
	   	  appendItem(filteredYearList, yearList[i]);
   	  	appendItem(filteredTitleList, titleList[i]);
        appendItem(filteredResultList, resultList[i]);
        appendItem(filteredRatedList, ratedList[i]);
        appendItem(filteredPlotList, plotList[i]);
        appendItem(filteredPosterList, posterList[i]);
	   	}
	 }
	 //the options within the movie dropdown are filled with the movie titles that are now in 
	 //filteredTitleList
	 	setProperty("movieDropdown", "options", filteredTitleList);
	}

//passOrFail() - Purpose of Function
//display whether the user was correct or incorrect when they clicked PASS or FAIL
  //uses an if-statement to either show that the user's answer was correct or incorrect. If the result
  //from the filteredList from the data table matches the user's guess, it will set the text in
  //checkAnswer to CORRECT. Otherwise, it will be INCORRECT.
//Parameters: string {string} - the string represents either pass or fail, which corresponds to either
//"PASS" or "FAIL" from the onEvents above
//Variables in Use: none
//design IDs in Use: checkAnswer, movieDropdown, learnButton  
function passOrFail(string) {
  showElement("opaqueCover");
  showElement("checkAnswer");
  if (filteredResultList[getProperty("movieDropdown", "index")] == string){
    setText("checkAnswer", "CORRECT!");
  }
  else{
    setText("checkAnswer", "INCORRECT! :(");
  }
  showElement("learnButton");
}

//updateScreen() - Purpose of Function
//to provide the user with information about their movie and display on a new screen
  //This function sets the screen to screen 4, where all the information of the movie the user
  //selected in screen 3 will be displayed. Each design id's text will be filled with the 
  //information within the corresponding filtered list using the index from the movie dropdown.
//No parameters
//Variables in Use: none
//design IDs in Use: screen4, movieText, resultText, ratedText, yearText, plotText, posterDisplay, movieDropfown
function updateScreen(){
  setScreen("resultScreen");
  setText("movieText", filteredTitleList[getProperty("movieDropdown", "index")]);
  setText("resultText", filteredResultList[getProperty("movieDropdown", "index")]);
  setText("ratedText", filteredRatedList[getProperty("movieDropdown", "index")]);
  setText("yearText", filteredYearList[getProperty("movieDropdown", "index")]);
  setText("plotText", filteredPlotList[getProperty("movieDropdown", "index")]);
  setProperty("posterDisplay", "image", filteredPosterList[getProperty("movieDropdown", "index")]);
  
}

       