const views = {
  dashboard: {
    title:"Tableau de bord",
    render:()=>`
      <div class="page-head"><div><div class="eyebrow">Vue générale</div><h1>Tableau de bord</h1><p>Pilotage central du Camp de District 3 en 1.</p></div><div class="actions"><button class="btn">Exporter</button><button class="btn primary" data-action="publish">+ Nouvelle publication</button></div></div>
      <div class="stats">
        ${stat("Participants","1 245","↗ 12,4 %","♙")}
        ${stat("Tickets utilisés","876","↗ 8,2 %","▣")}
        ${stat("À valider","37","À traiter","!")}
        ${stat("Matchs programmés","24","Cette édition","⚽")}
      </div>
      <div class="dashboard-grid">
        <section class="panel"><div class="panel-head"><h2>Activité récente</h2><span>Dernières opérations</span></div><div class="activity">
          ${activity("Nouvelle inscription","Un participant vient de finaliser sa préinscription.","Il y a 8 min")}
          ${activity("Publication","Une actualité a été publiée dans le fil.","Il y a 21 min")}
          ${activity("Feuille de match","Le résultat d’un match a été enregistré.","Il y a 46 min")}
          ${activity("Partenaire","Un nouveau partenaire a été ajouté.","Il y a 1 h")}
        </div></section>
        <section class="panel"><div class="panel-head"><h2>Prochains matchs</h2><span>Voir tout</span></div><div class="match-list">
          ${match("30 OCT.","16:00","Équipe A","Équipe B")}
          ${match("31 OCT.","10:00","Équipe C","Équipe D")}
          ${match("31 OCT.","16:00","Équipe E","Équipe F")}
        </div></section>
      </div>
      <div class="quick">
        <button data-view="participants"><strong>Ajouter un participant</strong><span>Consulter ou gérer les inscriptions</span></button>
        <button data-action="publish"><strong>Publier une actualité</strong><span>Créer une publication pour le fil</span></button>
        <button data-view="matches"><strong>Créer une feuille de match</strong><span>Préparer une rencontre</span></button>
      </div>`,
  },
  participants:{title:"Participants",render:()=>tablePage("Participants","Gérer les participants, leurs districts, pass et statuts.",["Nom","Email","District","Pass","Statut"],["Jean Kouassi","Aïcha Traoré","Koffi N’Guessan"])},
  tickets:{title:"Tickets",render:()=>tablePage("Tickets","Suivre les numéros 0001 à 1000 et leur attribution.",["Ticket","District","Participant","Statut"],["0001","0002","0136"])},
  news:{title:"Fil d’actualité",render:()=>emptyPage("Fil d’actualité","Créez et gérez les publications visibles par les participants.")},
  matches:{title:"Feuilles de match",render:()=>emptyPage("Feuilles de match","Créez les rencontres, renseignez les équipes, scores et événements.")},
  sponsors:{title:"Sponsors",render:()=>emptyPage("Sponsors","Gérez les sponsors qui accompagnent le Camp.")},
  partners:{title:"Partenaires",render:()=>emptyPage("Partenaires","Gérez les partenaires du Camp.")},
  program:{title:"Programme",render:()=>emptyPage("Programme","Gérez les activités, horaires, lieux et responsables.")},
  speakers:{title:"Intervenants",render:()=>emptyPage("Intervenants","Gérez les intervenants et leurs présentations.")},
  gallery:{title:"Galerie",render:()=>emptyPage("Galerie","Ajoutez et organisez les photos du Camp.")},
  notifications:{title:"Notifications",render:()=>emptyPage("Notifications","Envoyez des notifications générales ou ciblées.")},
  settings:{title:"Paramètres",render:()=>emptyPage("Paramètres","Configurez les informations générales du Camp.")}
};

function stat(label,value,trend,icon){return `<article class="stat"><div class="stat-top"><span>${label}</span><div class="stat-icon">${icon}</div></div><strong>${value}</strong><span class="trend">${trend}</span></article>`}
function activity(title,text,time){return `<div class="activity-row"><div class="dot"></div><div><strong>${title}</strong><span>${text}</span><span>${time}</span></div></div>`}
function match(date,time,a,b){return `<div class="match"><small>${date} · ${time}</small><div class="teams"><span>${a}</span><span>—</span><span>${b}</span></div></div>`}
function tablePage(title,desc,headers,rows){return `<div class="page-head"><div><div class="eyebrow">Gestion</div><h1>${title}</h1><p>${desc}</p></div><div class="actions"><button class="btn">Exporter</button><button class="btn primary">+ Ajouter</button></div></div><div class="panel"><div class="toolbar"><input class="input" placeholder="Rechercher..."><select class="input"><option>Tous les districts</option><option>DP</option><option>DD</option></select><select class="input"><option>Tous les statuts</option><option>Confirmé</option><option>À valider</option></select></div><div class="table-wrap"><table class="table"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map((r,i)=>`<tr>${headers.map((h,j)=>`<td>${j===0?r:(j===headers.length-1?'<span class="badge">Confirmé</span>':j===1&&title==="Tickets"?(i%2?"DD":"DP"):(j===1?"participant@exemple.com":"—"))}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>`}
function emptyPage(title,desc){return `<div class="page-head"><div><div class="eyebrow">Gestion</div><h1>${title}</h1><p>${desc}</p></div><div class="actions"><button class="btn primary">+ Ajouter</button></div></div><section class="panel empty"><strong>Module prêt à être connecté à Supabase</strong><span>La structure du Dashboard est en place. Ce module sera relié aux données réelles lors de son intégration.</span></section>`}

const content=document.getElementById("content"), pageTitle=document.getElementById("pageTitle"), sidebar=document.getElementById("sidebar");
function navigate(view){const v=views[view]||views.dashboard;content.innerHTML=v.render();pageTitle.textContent=v.title;document.querySelectorAll(".nav-item[data-view]").forEach(b=>b.classList.toggle("active",b.dataset.view===view));sidebar.classList.remove("open");bindContent()}
function bindContent(){document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>navigate(b.dataset.view));document.querySelectorAll("[data-action='publish']").forEach(b=>b.onclick=()=>navigate("news"))}
document.querySelectorAll(".nav-item[data-view]").forEach(b=>b.onclick=()=>navigate(b.dataset.view));
document.getElementById("mobileMenu").onclick=()=>sidebar.classList.toggle("open");
document.getElementById("logoutBtn").onclick=()=>{if(confirm("Voulez-vous vraiment vous déconnecter ?")) alert("La déconnexion Supabase sera branchée ici.");};
navigate("dashboard");