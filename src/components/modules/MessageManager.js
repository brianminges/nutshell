const remoteURL = "http://localhost:8088"

export const getMessagesById = () => {

}

export const getAllMessages = () => {
    return fetch (`${remoteURL}/Messages`)
    .then(res => res.json)

}

export const saveMessage = (newMessage) => {
    return fetch (`${remoteURL}/Messages`,  {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMessage)
    }).then(response => response.json())
}