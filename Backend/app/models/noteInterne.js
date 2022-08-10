module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      id:number,
      title : string ,
      content : string,
    },
    
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const noteInterne = mongoose.model("noteInterne", schema);
  return noteInterne;
};