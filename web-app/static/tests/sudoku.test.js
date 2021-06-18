import Time from "../time.js"

describe ("test converting seconds into MM:SS fromat", function (){
    it ("check converting 100 seconds into MM:SS fromat", function (){
        const result = Time.timeConversion (100) 
        console.log(result)
        if (result != "01:40") {
            throw ("Time did not format correct")
        }
    })
})

