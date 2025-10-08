const activitiesContainer = document.getElementById('activitiesContainer');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

function fetchActivities(query = '') {
    fetch('/api/activities')
        .then(res => res.json())
        .then(data => {
            let activities = data;
            if (query) {
                activities = data.filter(a => a.title.includes(query) || a.description.includes(query));
            }
            renderActivities(activities);
        });
}

function renderActivities(activities) {
    if (!activitiesContainer) return;
    activitiesContainer.innerHTML = '';
    activities.forEach(a => {
        const card = document.createElement('div');
        card.className = 'activity-card';
        card.innerHTML = `
            <h3>${a.title}</h3>
            <p>${a.description}</p>
            <p>Time: ${a.date}</p>
            <p>Location: ${a.location}</p>
            <a href="detail.html?id=${a.id}">View Details <a>
        `;
        activitiesContainer.appendChild(card);
    });
}

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        fetchActivities(query);
    });
}

const detailContainer = document.getElementById('activityDetail');
if (detailContainer) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    fetch(`/api/activities/${id}`)
        .then(res => res.json())
        .then(a => {
            detailContainer.innerHTML = `
                <h2>${a.title}</h2>
                <p>${a.description}</p>
                <p>Time: ${a.date}</p>
                <p>Location: ${a.location}</p>
                <form>
                    <label> Name: <input type="text" required /> </label><br>
                    <label>Email: <input type="email" required></label><br>
                    <button type="submit">Register for the event</button>
                </form>
            `;
        });
}

if (activitiesContainer) fetchActivities();
