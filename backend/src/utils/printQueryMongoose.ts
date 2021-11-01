const logQueryMongoose = (err:any, data:any) => {
    if (err) {
      console.log("error:", err);
    } else {
      console.log("data:", data);
    }
  }
export default logQueryMongoose
