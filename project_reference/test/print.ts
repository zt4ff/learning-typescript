import assert from "assert"
import message from "@src/dist/message"

function test() {
    try {   
        assert.equal(message(), "Kayode")
        console.log(`success: ${message()} == "Kayode"`)
    } catch (err) {
        console.log(`failure: ${message()} !== "Kayode"`)
    }
}

test()