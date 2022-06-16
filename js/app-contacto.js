
const form = document.querySelector("form");
const inputs = document.querySelectorAll(".iContacto");

let bandera = false;

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    inputs.forEach((input)=>{
        (input.value != "" ) ? (bandera = true) : (bandera = false);
    })
    
    if (bandera){
        Swal.fire({
            title: `<strong>¡Gracias por contactarte!</strong>`,
            icon: 'success',
            html:
              `Te responderemos tan pronto como podamos` ,
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
            focusConfirm: false,
            timer: 3000
          });
        form.reset();
    }else{
        
        inputs.forEach((input)=>{
            if(input.value == ""){
                input.classList.add("border", "border-danger")
            }
        })
        alertaInfo("DEBES COMPLETAR TODOS LOS CAMPOS")
    }
})

inputs.forEach((input)=>{
    input.addEventListener("change", ()=>{
        if(input.value != ""){
            input.classList.remove("border", "border-danger")
        }else{
            input.classList.add("border", "border-danger")            
        }
    })
})