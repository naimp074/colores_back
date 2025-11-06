import mongoose from "mongoose";

try {
  mongoose.connect(process.env.MONGODB).then(() => {
    console.info("Conexion con BD exitosa");
  });
} catch (err) {
  console.error(err);
}

export default mongoose;

