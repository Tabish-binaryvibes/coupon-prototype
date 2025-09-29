export async function apiTrigger(url, options = {}, payload = {}) {
    options.headers = {
        ...options.headers,
        // 'Authorization': `Basic a2hQxd8eH7g5yFDwWl72NYBHyFWuGSWAroHXQuE3Pwc=`,
        'Content-Type': 'application/json',
        'Cookie': 'ASP.NET_SessionId=0ducgubm5a1ryl4zwkfpto0y'
    };
    try {
        const response = await fetch(url, options);
        if (response.status === 401) {
            localStorage.clear();
            // window.location.href = '/login';
        } else {
            return response.json();
        }
    } catch (error) {
        localStorage.clear();
        // window.location.href = '/login';
        console.error('Fetch error:', error);
        throw error;
    }
}