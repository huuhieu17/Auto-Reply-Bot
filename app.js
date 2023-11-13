
import initWeb from "./modules/web/index.js";
import { initMongodb } from "./config/mongodbConnect.js";
import initBot from "./modules/bot/index.js";


function initApp (){
    // init mongodb
    initMongodb();

    initBot();

    return {initWeb}
}


export default initApp