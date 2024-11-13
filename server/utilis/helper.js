const Document  = require("../Model/DocumentModel");
const findorcreateDocumnet = async(id)=>{
    console.log(id);
    
    const defaultValue = "";
  if(id == null) return;

  const document = await Document.findById(id);
  if(document ) return document;
  return document = await  Document.create({_id:id,data:defaultValue});
}

module.exports = findorcreateDocumnet;