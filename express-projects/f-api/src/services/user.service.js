/* services/user.service.js */
const { saveData } = require("../repositories/user.repository");



const getName = (user)=>{
    let map = new Map(Object.entries(user));
    if(map.size>0){
        if(map.has("name")){
            return map.get("name");
        }else{
            let data="";
            for (const value of map.values()) {
                data+=` ${value}`;
            }
            return data;
        }
    }else{
        throw new Error("Empty body");
    }
}

const saveName = (user) => {
    const value = getName(user);
    if (value) {
      return saveData(value);
    } else {
      return null;
    }
  };
  

module.exports={
    getName,
    saveName
};