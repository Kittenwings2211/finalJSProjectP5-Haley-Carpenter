//Original code. DO NOT TOUCH!!!!!!!!!
let story = {
    chapterOne: {
        scene1_1: {
            pagesArray: [
                //Index 0
                {
                    //Type: what type of page it is
                    type: "dialogue",
                    //Text: where the dialogue goes
                    text: "Filler text page 1-1",
                }, 

                //Index 1
                {
                    type: "dialogue", 
                    text: "Filler text page 1-2",
                }, 

                //Index 2
                {
                    type: "dialogue", 
                    text: "Filler text page 1-3",
                },  

                //Index 3
                {
                    type: "choice",
                    text: "Which option will you choose?",
                    choiceOptions: [ 
                        //Index 0
                        {
                            text: "filler",
                            selected: true,
                            //nextScene: The selected scene from the user input
                            nextScene: "scene2_1"
                        },

                        //Index 1
                        {
                            text: "secondFiller",
                            selected: false,
                            nextScene: "scene2_2"
                        }
                    ]
                }
            ]
        },

        scene2_1: {
            pagesArray: [
                {
                    type: "dialogue",
                    text: "Filler text page 2",
                }, 

                {
                    type: "dialogue", 
                    text: "Filler text page 2",
                }, 

                {
                    type: "dialogue", 
                    text: "Filler text page 2",
                },  

                {
                    type: "choice",
                    text: "Which option will you choose?",
                    choiceOptions: [ 
                        {
                            text: "filler",
                            selected: true,
                            nextScene: "scene3_1"
                        },

                        {
                            text: "secondFiller",
                            selected: false,
                            nextScene: "scene3_2"
                        }
                    ]
                }
            ]
        },
                    
        scene2_2: {
            pagesArray: [
                {
                    type: "dialogue",
                    text: "Filler text page 3",
                }, 

                {
                    type: "dialogue", 
                    text: "Filler text page 3",
                }, 

                {
                    type: "dialogue", 
                    text: "Filler text page 3",
                },  

                {
                    type: "choice",
                    text: "Which option will you choose?",
                    choiceOptions: [ 
                        {
                            text: "filler",
                            selected: true,
                            nextScene: "scene3_1"
                        },

                        {
                            text: "secondFiller",
                            selected: false,
                            nextScene: "scene3_2"
                        }
                    ]
                }
            ]
        },

    }
}

let pagesArray = [];

//The "save file"
let gameState = {
    currentChapter: null,
    currentScene: null,
    currentPage: null,
    currentPageIndex: null,
    currentChoice: null,
    choiceOptions: 0,
    //currentPageDone: false,
}

let choiceSelection;

let display;

function setup() {
    createCanvas(1000, 800);
    choiceSelection = new ChoiceSelection();
    gameState.currentChapter = "chapterOne";
    gameState.currentScene = story[gameState.currentChapter] ["scene1_1"];
    gameState.currentPage = gameState.currentScene.pagesArray [0];
    gameState.currentPageIndex = 0;
    display = new Display();
}

let backgroundImage; // Declare a variable to store the background image

// function preload() {
//     // Load the background image in the preload function
//     backgroundImage = loadImage("https://lostinanime.com/wp-content/uploads/2018/11/Tsurune-03-01.jpg");
// }

function draw() {
    // Show the text UI at the bottom 25% of the screen
    background(0);
    display.show(gameState.currentPage)
    choiceSelection.show();
}

function nextPage() {
    gameState.currentPageIndex += 1;
    gameState.currentPage = gameState.pagesArray[currentPageIndex];
}

function nextScenePage() {
    if (nextScene === "scene2_1"){
        gameState.currentChapter = scene2_1;
    } else {
        gameState.currentChapter = scene2_2;
    }
}

function keyPressed() {
// Update selected option based on arrow keys
    if (gameState.currentPage.type === "dialogue"){
        // if (keyCode === UP_ARROW) {
        //     choiceOptions = (choiceOptions - 1 + pagesArray.length) % pagesArray.length;
        // } else if (keyCode === DOWN_ARROW) {
        //     choiceOptions = (choiceOption + 1) % pagesArray.length;
        //}

        if (keyCode === ENTER) {
            if (gameState.currentPage.type === "dialogue"){
                //Goes to the next slide of the scene
                nextPage();
            }else if (gameState.currentPage.type === "choice"){
                //Progress scene function: look at current selected option and look at the "nextScene" property and load the appropriate scene.
                nextScenePage();
            }
                    
            //Conditional Logic: In dialogue page = progress to next page
            //Conditional Logic: In choices page = selects user choice
        }
    }
}

function mouseClicked(){
    if (gameState.currentPage.type === "dialogue"){
        gameState.currentPageIndex += 1;
        gameState.currentPage = gameState.currentScene.pagesArray[gameState.currentPageIndex]
    }
}

class Display {
    //Displaying dialogue text
    constructor() {
        this.width = width; 
        this.height = height * 0.75;
        this.x = 0;
        this.y = 0; 
    }

    show(page){

        fill(80);
        rect(this.x, this.y, this.width, this.height);
        
        fill(0);
        text(page.text, this.x + 50, this.y + 50, this.width - 80, this.height - 80);
    }
}

class ChoiceSelection {
    constructor() {
        this.width = width;
        this.height = height * 0.25;
        this.x = 0;
        this.y = height * 0.75;
    }
            
    show() {
        // Draw the background for the text area
        fill(255);
        rect(this.x, this.y, this.width, this.height);
        
        if(gameState.currentPage.type === "dialogue"){
            // Display dialogue text
            fill(0);
            textSize(16);
            text("Click to progress", this.x + 20, this.y + 20, this.width - 40, this.height - 40);
        } 

        if(gameState.currentPage.type === "choice"){
            // Display response options
            for (let i = 0; i < gameState.currentPage.choiceOptions.length; i++) {
                textSize(16);
                fill(i === nextScene ? 'red' : 'black');
                text(choiceOptions[i], this.x + 20, this.y + 100 + i * 30);
            }
        }


    }
}
