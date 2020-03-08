const fileBtn = document.getElementById('file')
const userName = document.getElementById('userName')
fileBtn.addEventListener('change', () => {
    const fd = new FormData()
    fd.append('file', fileBtn.files[0])
    fd.append('userName', userName.value)
    fd.append('age', '18')
        //     fetch('http://localhost:3036/upload', {
        //         method: 'POST',
        //         body: fd,
        //         // headers: {
        //         //     'Content-Type': 'multipart/form-data'
        //         // }
        //     }).then(res => {
        //         if (res.ok) {
        //             console.log('success')
        //             return res.json
        //         } else {
        //             console.log('error')
        //         }
        //     }).then(res => {
        //         console.log('res is ', res)
        //     })
        // })
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost:3036/upload', true)
	  // xhr.setRequestHeader("Content-type","multipart/form-data")
    xhr.send(fd)
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('res is ', xhr.responseText)
        }
    }
})