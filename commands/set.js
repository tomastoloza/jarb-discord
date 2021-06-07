const fs = require('fs');

//TODO: Create local file
function updateData(userId, reaction) {

    let rawdata = fs.readFileSync('../data.json');
    let data = JSON.parse(rawdata);
    data = JSON.stringify({...data, userId: reaction})
    fs.writeFile("../data.json", data, function (err, result) {
        if (err) console.log(result)
    });

}

// updateData("12345", "🤔")
updateData("42132", "🤔")