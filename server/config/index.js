const fs = require('fs');

let configData = null;
let configFile = `${__dirname}/../config.json`;
// let configFile = `${__dirname}/../.env.json`;


const get = (section) => {  
    if(configData === null) { 
        let data = fs.readFileSync(configFile); 
        configData = JSON.parse(data); 
    };

    if(configData[section]){ 
        return configData[section] 
    };

    return null;
};

module.exports = { get };