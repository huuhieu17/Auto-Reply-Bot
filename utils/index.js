import { Snowflake } from "nodejs-snowflake";
const genSnowFlake = () => {

    const uid = new Snowflake();

    return uid.getUniqueID(); // A 64 bit id is returned

}

export { genSnowFlake }