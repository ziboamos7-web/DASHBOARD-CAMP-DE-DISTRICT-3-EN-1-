const views={
 dashboard:{title:"Tableau de bord",render:()=>`
  <div class="welcome"><div class="welcome-copy"><div class="eyebrow">Administration · Camp 2026</div><h2>Bonjour, Administrateur 👋</h2><p>Voici l’état actuel de votre plateforme et les opérations à surveiller.</p></div><div class="welcome-meta"><div class="live-chip"><b>●</b> Système opérationnel</div><div class="live-chip">Garango · 2026</div></div></div>
  <div class="page-head"><div><div class="eyebrow">Vue générale</div><h1>Tableau de bord</h1><p>Pilotez l’ensemble du Camp depuis un seul espace.</p></div><div class="actions"><button class="btn">Exporter</button><button class="btn orange" data-action="publish">+ Nouvelle publication</button></div></div>
  <div class="stats">${stat("Participants","1 245","↗ 12,4 %","♙")}${stat("Tickets utilisés","876","↗ 8,2 %","▣")}${stat("À valider","37","À traiter","!")}${stat("Matchs programmés","24","Cette édition","⚽")}</div>
  <div class="dashboard-grid">
   <section class="panel"><div class="panel-head"><h2>Activité récente</h2><button>Voir le journal →</button></div><div class="activity">
    ${activity("♙","Nouvelle inscription","Un participant vient de finaliser sa préinscription.","Il y a 8 min")}
    ${activity("▤","Publication","Une actualité a été publiée dans le fil.","Il y a 21 min")}
    ${activity("⚽","Feuille de match","Le résultat d’un match a été enregistré.","Il y a 46 min")}
    ${activity("◇","Partenaire","Un nouveau partenaire a été ajouté.","Il y a 1 h")}
   </div></section>
   <section class="panel"><div class="panel-head"><h2>Prochains matchs</h2><button data-view="matches">Voir tout →</button></div><div class="match-list">
    ${match("30 OCT.","16:00","Équipe A","Équipe B","À venir")}${match("31 OCT.","10:00","Équipe C","Équipe D","À venir")}${match("31 OCT.","16:00","Équipe E","Équipe F","À venir")}
   </div><div class="status-card"><div class="status-dot"></div><div><strong>Services en ligne</strong><span>Supabase · authentification · stockage</span></div></div></section>
  </div>
  <div class="quick">
   ${quick("♙","Ajouter un participant","Consulter ou gérer les inscriptions","participants")}
   ${quick("▤","Publier une actualité","Créer une publication pour le fil","news")}
   ${quick("⚽","Créer une feuille de match","Préparer une rencontre","matches")}
   ${quick("✦","Ajouter un sponsor","Mettre en avant un partenaire","sponsors")}
  </div>`},
 participants:{title:"Participants",render:()=>tablePage("Participants","Gérer les participants, leurs districts, pass et statuts.",["Nom","Email","District","Pass","Statut"],["Jean Kouassi","Aïcha Traoré","Koffi N’Guessan"])},
 tickets:{title:"Tickets",render:()=>tablePage("Tickets","Suivre les numéros 0001 à 1000 et leur attribution.",["Ticket","District","Participant","Statut"],["0001","0002","0136"])},
 news:{title:"Fil d’actualité",render:()=>emptyPage("Fil d’actualité","Créez et gérez les publications visibles par les participants.","▤")},
 matches:{title:"Feuilles de match",render:()=>emptyPage("Feuilles de match","Créez les rencontres, renseignez les équipes, scores et événements.","⚽")},
 sponsors:{title:"Sponsors",render:()=>emptyPage("Sponsors","Gérez les sponsors qui accompagnent le Camp.","✦")},
 partners:{title:"Partenaires",render:()=>emptyPage("Partenaires","Gérez les partenaires du Camp.","◇")},
 program:{title:"Programme",render:()=>emptyPage("Programme","Gérez les activités, horaires, lieux et responsables.","◷")},
 speakers:{title:"Intervenants",render:()=>emptyPage("Intervenants","Gérez les intervenants et leurs présentations.","♟")},
 gallery:{title:"Galerie",render:()=>emptyPage("Galerie","Ajoutez et organisez les photos du Camp.","▧")},
 notifications:{title:"Notifications",render:()=>emptyPage("Notifications","Envoyez des notifications générales ou ciblées.","♢")},
 settings:{title:"Paramètres",render:()=>emptyPage("Paramètres","Configurez les informations générales du Camp.","⚙")}
};
function stat(label,value,trend,icon){return `<article class="stat"><div class="stat-top"><span>${label}</span><div class="stat-icon">${icon}</div></div><strong>${value}</strong><span class="trend ${trend==='À traiter'?'neutral':''}">${trend}</span></article>`}
function activity(icon,title,text,time){return `<div class="activity-row"><div class="activity-icon">${icon}</div><div><strong>${title}</strong><span>${text}</span></div><span class="activity-time">${time}</span></div>`}
function match(date,time,a,b,status){return `<div class="match"><div class="match-meta"><span>${date} · ${time}</span><span class="match-status">${status}</span></div><div class="teams"><span>${a}</span><span class="score">VS</span><span>${b}</span></div></div>`}
function quick(icon,title,text,view){return `<button data-view="${view}"><div class="quick-icon">${icon}</div><strong>${title}</strong><span>${text}</span></button>`}
function tablePage(title,desc,headers,rows){return `<div class="page-head"><div><div class="eyebrow">Gestion</div><h1>${title}</h1><p>${desc}</p></div><div class="actions"><button class="btn">Exporter</button><button class="btn orange">+ Ajouter</button></div></div><div class="panel"><div class="toolbar"><input class="input" placeholder="Rechercher..."><select class="input"><option>Tous les districts</option><option>DP</option><option>DD</option></select><select class="input"><option>Tous les statuts</option><option>Confirmé</option><option>À valider</option></select></div><div class="table-wrap"><table class="table"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map((r,i)=>`<tr>${headers.map((h,j)=>`<td>${j===0?r:(j===headers.length-1?'<span class="badge">Confirmé</span>':j===1&&title==="Tickets"?(i%2?"DD":"DP"):(j===1?"participant@exemple.com":"—"))}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>`}
function emptyPage(title,desc,icon){return `<div class="page-head"><div><div class="eyebrow">Gestion</div><h1>${title}</h1><p>${desc}</p></div><div class="actions"><button class="btn orange">+ Ajouter</button></div></div><section class="panel empty"><div class="empty-mark">${icon}</div><strong>Module prêt à être connecté à Supabase</strong><span>La structure du Dashboard est en place. Ce module sera relié aux données réelles lors de son intégration.</span></section>`}
const content=document.getElementById("content"),pageTitle=document.getElementById("pageTitle"),sidebar=document.getElementById("sidebar");
function navigate(view){const v=views[view]||views.dashboard;content.innerHTML=v.render();pageTitle.textContent=v.title;document.querySelectorAll(".nav-item[data-view]").forEach(b=>b.classList.toggle("active",b.dataset.view===view));sidebar.classList.remove("open");bindContent()}
function bindContent(){document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>navigate(b.dataset.view));document.querySelectorAll("[data-action='publish']").forEach(b=>b.onclick=()=>navigate("news"))}
document.querySelectorAll(".nav-item[data-view]").forEach(b=>b.onclick=()=>navigate(b.dataset.view));document.getElementById("mobileMenu").onclick=()=>sidebar.classList.toggle("open");document.getElementById("logoutBtn").onclick=()=>{if(confirm("Voulez-vous vraiment vous déconnecter ?")) alert("La déconnexion Supabase sera branchée ici.")};navigate("dashboard");
