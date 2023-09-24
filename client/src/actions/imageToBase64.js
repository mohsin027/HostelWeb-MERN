export const isValidFileUploaded=(file)=>{
    const validExtensions = ['png','jpeg','jpg']
    const fileExtension = file.type.split('/')[1]
    return validExtensions.includes(fileExtension)
  }


export const ImageTOBase=(file, cb)=>{
  const reader= new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend=()=>{
    cb(reader.result)
  }
}

