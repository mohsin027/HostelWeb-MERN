import Swal from 'sweetalert2'
const mySwal = {
    confirm: function(message){
        return Swal.fire({
            title: 'Are you sure?',
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3B71CA',
            cancelButtonColor: '#DC4C64',
            
            confirmButtonText: 'Yes'
          })
    },
    success: function(message){
        Swal.fire(
            'Done',
            message,
            'success'
          )
    },
    error: function(message){
        Swal.fire(
            'Failed',
            message,
            'error'
          )
    },
}

export default mySwal
