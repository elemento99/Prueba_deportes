
const formAddDeporte = document.querySelector('#form-add-deporte')
const inputTitle = document.querySelector('#input-title')
const inputPrecio = document.querySelector('#input-precio')
const deporteList = document.querySelector('#deportes-list')


const formUpdateDeporte = document.querySelector('#form-update-deporte')
const inputUpdateDeporte = document.querySelector('#input-update-deporte')
const inputUpdatePrecio = document.querySelector('#input-update-precio')
const inputUpdateId = document.querySelector('#input-update-id')

let idUpdate;


formAddDeporte.addEventListener('submit', async (event) => {
    event.preventDefault()
    const title = inputTitle.value
    const precio = inputPrecio.value

    const res = await fetch(`/deportes/create?title=${title}&precio=${precio}`)
    const data = await res.json()
    console.log(data)
    getDeporte()
})

const getDeporte = async () => {
    const res = await fetch('/deportes')
    const data = await res.json()

    deporteList.innerHTML = ''
    data.forEach(item => {
        deporteList.innerHTML += `
        <li>
        ${item.id} - ${item.title} - ${item.precio}
        <button onclick="deleteDeporte('${item.id}')">Eliminar</button>
        </li>
        <button onclick="formUpdate('${item.id}', '${item.title}', '${item.deporte}')">Actualizar</button>
        `
    })
}
getDeporte()

const deleteDeporte = async (id) => {
    const res = await fetch(`/deportes/delete/${id}`)
    const data = await res.json()
    console.log(data)
    getDeporte()
}



const formUpdate = (id, title, precio) => {
    inputUpdateDeporte.value = title
    inputUpdatePrecio.value = precio
    inputUpdateId.value = id
}

formUpdateDeporte.addEventListener('submit', async (event) => {
    event.preventDefault()
    const title = inputUpdateDeporte.value
    const precio = inputUpdatePrecio.value
    const idUpdate = inputUpdateId.value
    const res = await fetch(`/deportes/update/${idUpdate}?title=${title}&precio=${precio}`)
    const data = await res.json()
    console.log(data)
    getDeporte()
})