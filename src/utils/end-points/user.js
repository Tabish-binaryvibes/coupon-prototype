import { apiTrigger } from '../interceptor';
import { BASE_URL } from '../../libs/constants.jsx';




export async function updateUser(id, payload) {
    const options = {
        method: 'PUT',
        headers: {},
        body: payload,
    };

    try {
        const response = await apiTrigger(BASE_URL + `user/${id}`, options);
        return response;
    } catch (error) {
        console.error('User update error:', error);
        throw error;
    }
}

export async function getSingleUser(id) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try {
        const response = await apiTrigger(BASE_URL + `user/${id}`, options);
        return response;
    } catch (error) {
        console.error('User retrieval error:', error);
        throw error;
    }
}


export async function get_Users({ pageNo, filterValues, sortBy, orderBy, from, to }) {
    const queryParams = new URLSearchParams();
    if (pageNo != null && pageNo !== '') queryParams.append('page', pageNo);
    if (sortBy != null && sortBy !== '' && orderBy != null && orderBy !== '') {
        queryParams.append('sortBy', sortBy);
        queryParams.append('orderBy', orderBy);
    }
    if (orderBy != null && orderBy !== '')
        if (from != null && from !== '' && from != undefined) queryParams.append('from', from);
    if (to != null && to !== '' && to != undefined) queryParams.append('to', to);

    for (const key in filterValues) {
        if (filterValues.hasOwnProperty(key)) {
            queryParams.append(key, filterValues[key]);
        }
    }
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await apiTrigger(`${BASE_URL}user?${queryParams.toString()}&limit=10`, options);
        return response;
    } catch (error) {
        console.error('User retrieval error:', error);
        throw error;
    }
}
export async function getAMSMembers(pageSize, pageNo) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await apiTrigger(`${BASE_URL}members?pageSize=${pageSize}&offset=${pageNo}`, options);
        return response;
    } catch (error) {
        console.error('User retrieval error:', error);
        throw error;
    }
}
export async function getAMSMembersById(id) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await apiTrigger(`${BASE_URL}customers/${id}`, options);
        return response;
    } catch (error) {
        console.error('User retrieval error:', error);
        throw error;
    }
}

export async function getCummulativeUsers() {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await apiTrigger(BASE_URL + 'user', options);
        return response;
    } catch (error) {
        console.error('Company retrieval error:', error);
        throw error;
    }
}

export async function getAMSCustomers() {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await apiTrigger(`${BASE_URL}companies`, options);
        return response;
    } catch (error) {
        console.error('User retrieval error:', error);
        throw error;
    }
}

export async function updateAMSMemberById(payload, id) {

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    };

    try {
        const response = await apiTrigger(`${BASE_URL}members/${id}`, options);
        return response;
    } catch (error) {
        console.error('User retrieval error:', error);
        throw error;
    }
}

export async function getAMSCustomersById(id) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await apiTrigger(`${BASE_URL}members/${id}`, options);
        return response;
    } catch (error) {
        console.error('User retrieval error:', error);
        throw error;
    }
}
export async function getMemberByUniqueId(id) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await apiTrigger(`${BASE_URL}members/member-by-id/${id}`, options);
        return response;
    } catch (error) {
        console.error('User retrieval error:', error);
        throw error;
    }
}

export async function getAMSCustomersByName(name) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await apiTrigger(`${BASE_URL}members?parentName=${name}`, options);
        return response;
    } catch (error) {
        console.error('User retrieval error:', error);
        throw error;
    }
}

export async function syncUsersData() {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // body: ""
    };

    try {
        const response = await apiTrigger(`${BASE_URL}members/sync`, options);
        return response;
    } catch (error) {
        console.error('User retrieval error:', error);
        throw error;
    }
}