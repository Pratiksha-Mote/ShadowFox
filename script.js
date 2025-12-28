// Unified Mumbai Indians Fan Hub Script
const el = id => document.getElementById(id);

// Complete Data
const DATA = {
    schedule: [
        { opponent: 'CSK', date: '2025-03-20', time: '7:30 PM', venue: 'Wankhede Stadium', result: 'Won by 6 wickets' },
        { opponent: 'RCB', date: '2025-03-25', time: '7:30 PM', venue: 'M. Chinnaswamy Stadium', result: 'Lost by 4 runs' },
        { opponent: 'KKR', date: '2025-04-02', time: '7:30 PM', venue: 'Eden Gardens', result: 'Won by 24 runs' },
        { opponent: 'DC', date: '2025-04-08', time: '7:30 PM', venue: 'Wankhede Stadium', result: 'Won by 7 wickets' },
        { opponent: 'PBKS', date: '2025-04-12', time: '7:30 PM', venue: 'PCA Stadium', result: 'Won by 9 runs' },
        { opponent: 'SRH', date: '2025-04-18', time: '7:30 PM', venue: 'Rajiv Gandhi Stadium', result: 'Lost by 31 runs' },
        { opponent: 'RR', date: '2025-04-22', time: '7:30 PM', venue: 'Wankhede Stadium', result: 'Won by 6 wickets' },
        { opponent: 'GT', date: '2025-04-28', time: '7:30 PM', venue: 'Narendra Modi Stadium', result: 'Lost by 3 runs' },
        { opponent: 'LSG', date: '2025-05-02', time: '7:30 PM', venue: 'Ekana Stadium', result: 'Won by 18 runs' },
        { opponent: 'CSK', date: '2025-05-08', time: '7:30 PM', venue: 'MA Chidambaram Stadium', result: 'Won by 20 runs' },
        { opponent: 'RCB', date: '2025-05-12', time: '7:30 PM', venue: 'Wankhede Stadium', result: null },
        { opponent: 'KKR', date: '2025-05-18', time: '7:30 PM', venue: 'Wankhede Stadium', result: null },
        { opponent: 'DC', date: '2025-05-22', time: '7:30 PM', venue: 'Arun Jaitley Stadium', result: null },
        { opponent: 'PBKS', date: '2025-05-28', time: '7:30 PM', venue: 'Wankhede Stadium', result: null }
    ],
    players: [
        { name: 'Rohit Sharma', runs: 485, wickets: 0, role: 'Captain' },
        { name: 'Ishan Kishan', runs: 320, wickets: 0, role: 'Wicket-keeper' },
        { name: 'Suryakumar Yadav', runs: 412, wickets: 0, role: 'Batsman' },
        { name: 'Hardik Pandya', runs: 285, wickets: 12, role: 'All-rounder' },
        { name: 'Tim David', runs: 198, wickets: 2, role: 'All-rounder' },
        { name: 'Jasprit Bumrah', runs: 15, wickets: 18, role: 'Fast Bowler' },
        { name: 'Trent Boult', runs: 8, wickets: 15, role: 'Fast Bowler' },
        { name: 'Piyush Chawla', runs: 12, wickets: 8, role: 'Spinner' }
    ],
    news: [
        { title: 'MI Qualifies for Playoffs', date: '2025-05-20', excerpt: 'Mumbai Indians secure playoff spot with crucial win against RR.' },
        { title: 'Rohit Sharma Hits Century', date: '2025-05-15', excerpt: 'Captain leads from front with magnificent 102* against PBKS.' },
        { title: 'Bumrah Takes Hat-trick', date: '2025-05-10', excerpt: 'Jasprit Bumrah destroys DC batting lineup with stunning hat-trick.' },
        { title: 'New Signing Announced', date: '2025-04-28', excerpt: 'MI announces surprise mid-season signing to strengthen squad.' }
    ],
    poll: {
        question: 'Who should be MI Player of the Season?',
        options: [
            { name: 'Rohit Sharma', votes: 45 },
            { name: 'Jasprit Bumrah', votes: 38 },
            { name: 'Hardik Pandya', votes: 32 },
            { name: 'Suryakumar Yadav', votes: 28 }
        ]
    }
};

// Schedule Functions
function renderSchedule() {
    const list = el('schedule-list');
    if (!list) return;
    
    const opponents = [...new Set(DATA.schedule.map(s => s.opponent))];
    const filter = el('filter-opponent');
    
    if (filter) {
        filter.innerHTML = '<option value="all">All Teams</option>';
        opponents.forEach(o => {
            const opt = document.createElement('option');
            opt.value = o;
            opt.textContent = o;
            filter.appendChild(opt);
        });
        filter.addEventListener('change', () => drawSchedule(filter.value));
    }
    
    drawSchedule();
}

function drawSchedule(filterVal = 'all') {
    const list = el('schedule-list');
    if (!list) return;
    
    list.innerHTML = '';
    DATA.schedule.forEach(s => {
        if (filterVal !== 'all' && s.opponent !== filterVal) return;
        
        const item = document.createElement('div');
        item.className = 'col-md-6 mb-3';
        item.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <h5 class="mb-1">MI vs ${s.opponent}</h5>
                        <span class="badge ${s.result ? (s.result.includes('Won') ? 'bg-success' : 'bg-danger') : 'bg-warning text-dark'}">${s.result || 'Upcoming'}</span>
                    </div>
                    <p class="mb-1">${s.date} • ${s.time}</p>
                    <small class="text-muted">${s.venue}</small>
                </div>
            </div>
        `;
        list.appendChild(item);
    });
}

// Home Page Functions
function renderHome() {
    loadNews();
    loadUpcomingMatch();
    loadTopPlayers();
    renderPoll('poll-area');
}

function loadNews() {
    const container = el('home-news');
    if (!container) return;
    
    container.innerHTML = DATA.news.slice(0, 3).map(news => `
        <div class="border-bottom pb-2 mb-2">
            <h6>${news.title}</h6>
            <small class="text-muted">${news.date}</small>
            <p class="mb-0">${news.excerpt}</p>
        </div>
    `).join('');
}

function loadUpcomingMatch() {
    const container = el('home-upcoming');
    if (!container) return;
    
    const upcoming = DATA.schedule.find(s => !s.result);
    if (upcoming) {
        container.innerHTML = `
            <div class="text-center p-3 bg-light rounded">
                <h5>MI vs ${upcoming.opponent}</h5>
                <p class="mb-1">${upcoming.date} at ${upcoming.time}</p>
                <small class="text-muted">${upcoming.venue}</small>
            </div>
        `;
    }
}

function loadTopPlayers() {
    const container = el('home-top-players');
    if (!container) return;
    
    const topPlayers = DATA.players.slice(0, 4);
    container.innerHTML = topPlayers.map(player => `
        <li class="d-flex justify-content-between align-items-center py-1">
            <div>
                <strong>${player.name}</strong><br>
                <small class="text-muted">${player.role}</small>
            </div>
            <small>${player.runs} runs</small>
        </li>
    `).join('');
}

// Stats Functions
function renderStats() {
    if (!el('top-runs')) return;
    
    const topRuns = [...DATA.players].sort((a, b) => b.runs - a.runs).slice(0, 5);
    const topWickets = [...DATA.players].sort((a, b) => b.wickets - a.wickets).slice(0, 5);
    
    const runsList = el('top-runs');
    runsList.innerHTML = '';
    topRuns.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `${p.name} — ${p.runs} runs`;
        runsList.appendChild(li);
    });
    
    const wicketsList = el('top-wickets');
    wicketsList.innerHTML = '';
    topWickets.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `${p.name} — ${p.wickets} wickets`;
        wicketsList.appendChild(li);
    });
}

// News Functions
function renderNews() {
    const list = el('news-list');
    if (!list) return;
    
    DATA.news.forEach(n => {
        const article = document.createElement('div');
        article.className = 'card mb-3 p-3';
        article.innerHTML = `
            <h5>${n.title}</h5>
            <small class="text-muted">${n.date}</small>
            <p>${n.excerpt}</p>
        `;
        list.appendChild(article);
    });
}

// Poll Functions
function renderPoll(containerId) {
    const container = el(containerId);
    if (!container) return;
    
    const poll = DATA.poll;
    const saved = JSON.parse(localStorage.getItem('mi_poll_votes') || '{}');
    
    let html = `<div class="mb-2"><strong>${poll.question}</strong></div>`;
    poll.options.forEach((opt, idx) => {
        html += `
            <div class="d-flex align-items-center mb-2">
                <button class="btn btn-outline-primary btn-sm me-2" data-idx="${idx}">Vote</button>
                <div>${opt.name} <small class="text-muted">(${saved[opt.name] || opt.votes} votes)</small></div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    container.querySelectorAll('button[data-idx]').forEach(b => {
        b.addEventListener('click', () => {
            const idx = b.getAttribute('data-idx');
            const opt = poll.options[idx];
            const votes = JSON.parse(localStorage.getItem('mi_poll_votes') || '{}');
            votes[opt.name] = (votes[opt.name] || opt.votes) + 1;
            localStorage.setItem('mi_poll_votes', JSON.stringify(votes));
            renderPoll(containerId);
        });
    });
}

// Subscribe Functions
function setupSubscribe() {
    const form = el('subscribe-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = el('sub-email').value.trim();
        const msg = el('sub-msg');
        
        if (!email || !email.includes('@')) {
            msg.textContent = 'Enter a valid email.';
            msg.className = 'text-danger small';
            return;
        }
        
        msg.textContent = 'Subscribed successfully!';
        msg.className = 'text-success small';
        form.reset();
    });
}

// Utility Functions
function renderPlayers() {
    // Players page is static HTML, no JS needed
}

function initYear() {
    const yearElements = document.querySelectorAll('[id^="year"]');
    yearElements.forEach(el => el.textContent = new Date().getFullYear());
}

// Forum Functions
function renderForum() {
    const form = el('forum-form');
    const discussions = el('forum-discussions');
    const totalCount = el('total-discussions');
    
    if (!form) return;
    
    let forumData = JSON.parse(localStorage.getItem('mi_forum') || '[]');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = el('topic-title').value.trim();
        const message = el('topic-message').value.trim();
        
        if (title && message) {
            const newTopic = {
                id: Date.now(),
                title,
                message,
                author: 'MI Fan',
                date: new Date().toLocaleDateString(),
                replies: Math.floor(Math.random() * 10)
            };
            
            forumData.unshift(newTopic);
            localStorage.setItem('mi_forum', JSON.stringify(forumData));
            form.reset();
            displayDiscussions();
        }
    });
    
    function displayDiscussions() {
        if (!discussions) return;
        
        discussions.innerHTML = forumData.map(topic => `
            <div class="card mb-3">
                <div class="card-body">
                    <h6>${topic.title}</h6>
                    <p class="text-muted small">By ${topic.author} on ${topic.date}</p>
                    <p>${topic.message}</p>
                    <small class="text-muted">${topic.replies} replies</small>
                </div>
            </div>
        `).join('');
        
        if (totalCount) totalCount.textContent = forumData.length;
    }
    
    displayDiscussions();
}

// Live Updates Functions
function renderLive() {
    const updates = el('live-updates');
    if (!updates) return;
    
    setInterval(() => {
        const time = new Date().toLocaleTimeString();
        const newUpdate = `<div class="mb-2"><small class="text-muted">${time}</small> - Live: Match in progress...</div>`;
        updates.innerHTML = newUpdate + updates.innerHTML;
        
        if (updates.children.length > 10) {
            updates.removeChild(updates.children[updates.children.length - 1]);
        }
    }, 30000);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initYear();
    renderHome();
    renderSchedule();
    renderStats();
    renderNews();
    renderForum();
    renderLive();
    setupSubscribe();
});