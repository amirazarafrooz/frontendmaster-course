const timesToRepeat = 10;
const character = "❤️"
let answer = ""


for (let i = 0; i < timesToRepeat; i++) {
    answer += character
}

console.log(answer)

//or

console.log("".padStart(timesToRepeat,character));