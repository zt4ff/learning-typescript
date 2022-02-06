class express {
    cl: string
    constructor() {
        this.cl = "class"
    }   
}

namespace express {
    export class Router {
        ns: string
        constructor() {
            this.ns = "namespace"
        }
    }
}


const ss = new express.Router()
console.log(ss.ns)

const as = new express()
console.log(as.cl)
