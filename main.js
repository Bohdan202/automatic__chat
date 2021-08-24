function setTimer (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

getMessage = async () => {
    let response = await fetch('https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1');   
    if (response.ok) {
        return response.json();
    } else return new Error('Error');
}


createMessage = (user) => {
    getMessage().then(resultMessages => {
        const chat = document.querySelector('.chat-area');
        let message = document.createElement('div');
        message.innerHTML = `<img src="${user.avatar}"><span class="username">${user.firstName + ' ' + user.lastName}</span><span class="user-age">Age: ${user.age}</span><span class="user-text">${resultMessages}</span>`
        message.classList.add('user-message');
        chat.appendChild(message);
    })
}


getUser = async () => {
    let response = await fetch('https://randomuser.me/api');

    if (response.ok) {
        return response.json();
    } else return new Error('Error');
}

createUser = (end) => {

    getUser().then(resultUsers => {

        let userInfo = {
            'avatar': resultUsers.results[0].picture.medium,
            'firstName': resultUsers.results[0].name.first,
            'lastName': resultUsers.results[0].name.last,
            'age': resultUsers.results[0].dob.age,
            'city': resultUsers.results[0].location.city,
            'phoneNumber': resultUsers.results[0].cell,
        };

        const users = document.querySelector('.user-area');
        let user = document.createElement('div');
        user.innerHTML = `<img src="${userInfo.avatar}"><span class="username">${userInfo.firstName + ' ' + userInfo.lastName}</span><span class="user-city">City: ${userInfo.city}</span><span class="user-phone">Phone: ${userInfo.phoneNumber}</span>`
        user.classList.add('user');
        users.appendChild(user);
        end(userInfo);
        
    });

}


sendMessage = (userInfo) => {

    setInterval(() => {
        createMessage(userInfo);
    }, setTimer (5000, 10000));
}


document.querySelector('.user-area__button').addEventListener('click', () => {
    createUser(sendMessage);
})
 









