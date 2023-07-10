import axios from "axios";

export async function loginUser(email, password) {


    const URL = 'http://localhost:5000/api/auth/login'
    try {
        const response = await axios.post(URL,
            JSON.stringify({
                "email": email,
                "password": password
            }),
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.status == 200) {
            return response;
        }
    }
    catch (error) {
        console.log('Error', error);
    }
}

export async function getAllUser() {
    const URL = 'http://localhost:5000/api/auth/getallusers'
    try {
        const response = await axios.get(URL,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            }
        );

        if (response.status === 200) {
            return response;
        }

    } catch (error) {
        console.log('Error', error);
    }
}


export async function getUserInfo(authToken) {

    const URL = 'http://localhost:5000/api/auth/getuser'

    try {
        const response = await axios.post(URL,
            null,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken
                }
            }
        );
        console.log('GET USERINFO RESPONSE', response);
        if (response.status === 200) {
            return response;
        }

    } catch (error) {
        console.log('Error', error);
    }
}


export async function addUser(name, email, password, role) {


    const URL = 'http://localhost:5000/api/auth/createuser'

    try {
        const response = await axios.post(URL,
            {
                "name": name,
                "email": email,
                "password": password,
                "role": role
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.status === 200) {
            return response;
        }

    } catch (error) {
        console.log('Error', error);
    }
}


//Update User
export async function editUser(id, name, email, password, role) {


    const URL = `http://localhost:5000/api/auth/updateuser/${id}`

    try {
        const response = await axios.put(URL,
            {
                "name": name,
                "email": email,
                "password": password,
                "role": role
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            }
        );

        if (response.status === 200) {

            return response;
        }

    } catch (error) {
        console.log('Error', error);
    }
}


//Delete Task
export async function delete_User(id) {

    const URL = `http://localhost:5000/api/auth/deleteuser/${id}`
    try {
        const response = await axios.delete(URL,

            {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            }
        );

        if (response.status == 200) {

            return response;
        }
    }
    catch (error) {
        console.log('Error', error);
    }
}

