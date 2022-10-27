



export function capitalize (name){
  return `${name[0].toUpperCase()}${name.slice(1)}`
}

export function idCreator(change = false, sections = 4, characters = 4) {
  let code = ""
  const leterCode = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "X", "Y", "Z", "W", "R"]

  for (let x = 0; x < sections; x++) {
    for (let i = 0; i < characters; i++) {
      if (change) {
        code += Math.round(Math.random() * 9)
      } else { code += leterCode[Math.round(Math.random() * (leterCode.length - 1))] }
    }
    change = !change
    code.length < (characters * sections + sections - 1) && (code += "-")
  }

  return code
}

idCreator(true)

export function alfabeticOrder(array, action = "A_Z") {
  array.sort((a, b) => {
    if (a.name === b.name) {
      return 0;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 1;
  });

  if (action === "A_Z") { return array } else return array.reverse()
}


export function scoresOrder(array, action = "score-Asc") {

  if (array.length <= 1) return array

  let left = []
  let right = []
  let pybot = array[0]


  for (let i = 1; i < array.length; i++) {
    array[i].healthScore < pybot.healthScore ? left.push(array[i]) : right.push(array[i])
  }
  return action === "score-Asc"
    ?
    [].concat(scoresOrder(left), pybot, scoresOrder(right))
    :
    [].concat(scoresOrder(left), pybot, scoresOrder(right)).reverse()

}

 export function orderData (array, action){
  switch (action) {
    case "A_Z":
      return alfabeticOrder(array, action)
    
    case"Z_A":
      return alfabeticOrder(array, action)

    case "score-Asc":
      return scoresOrder(array, action)
  
    case "score-Desc":
      return scoresOrder(array, action)

    default: return [...array]
  }

}

export function searchRecipes(recipes, search){
  
  return recipes.filter((r)=> r.name.toLowerCase().includes(search.toLowerCase()))
}

export function dietsFiltred(recipes, value){
  return value === "all-Diets" ? recipes : 
  recipes.filter( e => typeof e.Diets[0] === "string"? e.Diets.includes(value) : e.Diets.find(e => e.name === value))
}


export function itsCreated(array, action){

  if(action === "Not_Created"){
  return array.filter(d  => !d.itsCreated)}

  else if (action === "Created"){
    return array.filter(d => d.itsCreated)
  }

  else {return array}

}


//validations

export   function validations(input) {
  let error = {}
  if (input.name) {
      if (!/^[A-Za-z? ]{3,}$/g.test(input.name)) {
          error.name = "⚠️ Min 3 characters without symbols or numbers."
      }
  }
  if (input.summary) {
      if (!/.{10,}/g.test(input.summary)) {
          error.summary = "⚠️ Min 10 characters."
      }
  }

  if (input.image) {
      if (!/^https?\:\/\/[a-zA-Z\S]*$/g.test(input.image)) {
          error.image = '⚠️ La url debe contener "https://"'
      }
  }


  return error

}




export const getLengthOfObject = (obj) => { 
  let lengthOfObject = Object.keys(obj).length; 
  return lengthOfObject
}


