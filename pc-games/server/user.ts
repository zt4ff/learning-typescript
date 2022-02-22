// generate a suite of random colors and usernames
type User = {
    username: string,
    color: string,
    isSelected?: boolean
}

class RandomUser  {

    color: string
    username: string

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
        const random = Math.floor(Math.random() * users.length)
        if (!users[random].isSelected) {
            users[random].isSelected = true
            return users[random]
        } else {
            return this.getRandomUser(users)
        }
    }

    constructor() {
        const {username, color} = this.getRandomUser(RandomUser.usrarray)
        this.username = username
        this.color = color
    }
}

export {RandomUser}
