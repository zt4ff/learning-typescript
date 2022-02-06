type Animal = "dog" | "cat" | "lion"


function dosomething(animal: Animal) {
    switch (animal) {
        case "cat":
            return "cat"
        case "dog":
            return "dog"
        case "lion":
            return "lion"
        default:
            const _exh: never =  animal
    }
}

const ani = dosomething("cat")
console.log(ani)