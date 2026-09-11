const menu=document.querySelector('.menu');
const sidebar=document.querySelector('#sidebar');
const links=[...document.querySelectorAll('nav a')];
function closeMenu(){sidebar.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');}
menu.addEventListener('click',()=>{const open=sidebar.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
links.forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();menu.focus();}});
document.addEventListener('click',e=>{if(!sidebar.contains(e.target)&&!menu.contains(e.target))closeMenu();});
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(link=>{const active=link.hash==='#'+entry.target.id;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -60% 0px',threshold:0});
document.querySelectorAll('main>section').forEach(section=>observer.observe(section));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button));});let count=0;document.querySelectorAll('.project').forEach(project=>{project.hidden=button.dataset.filter!=='all'&&!project.dataset.category.split(' ').includes(button.dataset.filter);if(!project.hidden)count++;});document.querySelector('#filter-status').textContent=count+' projects shown';}));
document.querySelector('#year').textContent=new Date().getFullYear();
