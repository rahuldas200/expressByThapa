// Game Constants & Variables
let inputDir = {x:0, y:0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const music = new Audio('music/alex-productions-epic-cinematic-trailer-elite.mp3');
const board = document.querySelector(".board");
const scoreBox = document.querySelector(".Score");
const hiscoreBox = document.querySelector(".HighScore");
const gameOver = document.querySelector(".Over");
let score = 0;
const speed = 5;
let lastPaintTime = 0;
let snakeArr =[
    {x :13 , y :15}
];
food = {x:5 , y:9};
// gameOver.style.opacity = "0";

// Game Functions

function main(ctime){ 
    window.requestAnimationFrame(main);
    
    

    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }


    lastPaintTime = ctime;

    gameEngine();



}

function isCollide(snake){
    // if you bump into yourself
    for(let i = 1; i< snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
            
            
        }
    }
    //if you bump wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
        
    }

    return false;
    

}



function gameEngine(){
    //part 1 :updating the snake array

        if(isCollide(snakeArr)){
            
            console.log("opacity check");
            gameOverSound.play();
            music.pause();
            inputDir = {x:0 , y:0};
            // alert("Game Over.press any key to play again !");
            score = 0;
            scoreBox.innerHTML = "Score: " +score;
            snakeArr = [{x:13, y:15}];
            music.play();
            score = 0;
            

        }
        
        


        //if you have eaten the food ,incriment the snake and regenerate the food
        if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
            foodSound.play();
            score += 1;
            if(score > hiscoreval){
                hiscoreval = score;
                localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                hiscoreBox.innerHTML = "High Score: " + hiscoreval;
            }
            scoreBox.innerHTML = "Score: " + score;
            snakeArr.unshift({ x: snakeArr[0].x + inputDir.x ,
                 y:snakeArr[0].y + inputDir.y});
            
            let a = 2;
            let b = 16;

            let c =  Math.round(a + (b - a) * Math.random()); 
            let d =  Math.round(a + (b-a)*Math.random()) ;
            
            for(let i=1; i<snakeArr.length;i++){
                if(snakeArr[i].x === c || snakeArr[i].y === d){
                    c =  Math.round(a + (b - a) * Math.random()); 
                    d =  Math.round(a + (b-a)*Math.random()) ;
                    food = {x:c ,y:d};
                    console.log("call hoeache");

                    
                }
                else{
                    food = {x:c ,y:d};
                    console.log("aa");
                }
            }
            
            
        }

        //mave the snake
        for( let i = snakeArr.length - 2; i>=0; i--){
            snakeArr[i+1] = {...snakeArr[i]};
        }

        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;

     

    //part 2 : Display the snake and food

    //Display the snak
    board.innerHTML = "";
    snakeArr.forEach((e ,index) =>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
       
        if(index === 0){
            snakeElement.classList.add("head");
        }
        else  snakeElement.classList.add("snake");

        board.appendChild(snakeElement);


    }) 

    //Display the food

    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

    
 
    
    

}

//main logic starts here
music.play();
let hiscore = localStorage.getItem("hiScore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore" , JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "hiScore: "+hiscore;
}


window.requestAnimationFrame(main);

window.addEventListener('keydown',e =>{
    
    
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("arrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
         
        case "ArrowDown":
            console.log("arrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("arrowleft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("arrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});
