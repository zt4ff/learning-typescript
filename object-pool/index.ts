// the reusable object, you can configure more to suit your needs
class Obj {
    private inUse: boolean
    private data: any

    constructor(data = null) {
        this.inUse = false
        this.data = data
    }

    private reset() {
        // useful if you want to perform some cleanup object once it's not freed
    }

    public get isInUse ()  {
        // maybe you have some presettings
        return this.inUse
    }

    public clear() {
        this.reset()
        this.inUse = false
    }
}

class Pool {
    private initialSize: number
    private pool: Array<Obj | undefined>

    constructor( initialSize: number ) {
        this.initialSize = initialSize
        this.pool = Array(initialSize).fill( new Obj())
    }

    public get() {
        for (let i = 0; i < this.initialSize; i++) {
            if (!this.pool[i].isInUse) {
                // this take an item in use and sends it to the back the beginning of the array
                this.pool.unshift(this.pool.splice(i, 0)[0])
                return this.pool[i]
            }
            // rather than adding new item if the item is large, 
            // you can optimize by using queues or linkedlist
        }
    }
}