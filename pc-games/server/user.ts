// generate a suite of random colors and usernames
type User = {
    username: string,
    color: string,
    isSelected?: boolean
}

class RandomUser  {
    color: string
    username: string
    private rannum: number

    static usrarray: Array<User> = [
        {
            username: "Drak Cooler",
            color: "rgb(255, 37, 37)",
            isSelected: false
        },
        {
            username: "Hipo Nun",
            color: "rgb(255, 37, 255)",
            isSelected: false
        },
        {
            username: "Blue Fang",
            color: "rgb(88, 255, 37)",
            isSelected: false
        },
        {
            username: "Ken Nerdy",
            color: "rgb(219, 37, 255)",
            isSelected: false
        },
        {
            username: "Master Lee",
            color: "rgb(255, 37, 128)",
            isSelected: false
        },
    ]

    // this is a dangorous function looping though selected user biswis
    // probably fix this later
    private getRandomUser(users: Array<User>):User {
        if (!users[this.rannum].isSelected) {
            users[this.rannum].isSelected = true
            return users[this.rannum]
        } else {
            return this.getRandomUser(users)
        }
    }
    
    constructor() {
        this.rannum = Math.floor(Math.random() * RandomUser.usrarray.length)
        const {username, color } =  this.getRandomUser(RandomUser.usrarray)
        this.username = username
        this.color = color
    }

    deselectUser() {
        RandomUser.usrarray[this.rannum].isSelected = false
    }
}

export {RandomUser, User}
