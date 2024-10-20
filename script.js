const form = document.querySelector("form")
const baseURL = "https://opentdb.com/api.php"
const Container = document.querySelector(".container")


form.addEventListener("submit",createURl)

function createURl(e){
    Container
    e.preventDefault();
    const formdata = new FormData(form);

    // console.log(value);
    
    const playerData = Object.fromEntries(formdata);
    console.log(playerData);
    const actualURL = `${baseURL}?${getquerystring(playerData)}`;
    
    // console.log(actualURL)
    fetchData(actualURL);
}



function getquerystring(data){
    let querystring ="";
    for (let x in data){
        querystring+= querystring.length===0 ? `${x}=${data[x]}` : `&${x}=${data[x]}`;
    }
    return querystring;
}
 

function fetchData(url){
    console.log(url);
    fetch(url)
    .then((response)=> response.json())
    .then((result)=>  showdata(result.results))
}



function showdata(userdata){
   Container.innerHTML=""

   const newData = userdata.map((obj)=>{
         obj.incorrect_answers.push(obj.correct_answer)
         return obj
   })




   
   const questionwrapper = document.createElement("div")
   questionwrapper.classList.add("questionwrapper")

   newData.forEach((obj) => {
const randomoptions = randomize(obj.incorrect_answers) 

    const question  =document.createElement("p")
    question.classList.add("questions")
    question.innerText= obj.question

    
    const options  =document.createElement("div")
    options.classList.add("options")


    for(let i=0;i<4;i++){
        const option = document.createElement("p")
        option.classList.add("option")
        option.innerText= randomoptions[i]
        options.append(option)
    }
    questionwrapper.append(question,options)
   });
   Container.append(questionwrapper)
}




function randomize(arr) {
    const randomvalue = [];
    for(let i=0;i<arr.length;i++){
        const value = arr[Math.floor(Math.random() * arr.length)] 
        if(randomvalue.includes(value) ) return randomize(arr)
            else  randomvalue.push(value)
}
return randomvalue
}