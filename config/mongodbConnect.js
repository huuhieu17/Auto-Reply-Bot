import mongoose  from "mongoose";

export function initMongodb() {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.info("Kết nối cơ sở dữ liệu thành công")
    }).catch((err) => {
        console.info("Kết nối cơ sở dữ liệu thất bại")
        console.error(err);
    })
}

