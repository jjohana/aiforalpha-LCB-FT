const allowedUsers = [
  { email: "eric.benhamou@aiforalpha.com", name: "Eric Benhamou", defaultRole: "compliance", isAdmin: true },
  { email: "beatrice.guez@aiforalpha.com", name: "Béatrice Guez", defaultRole: "compliance", isAdmin: true },
  { email: "jean-jacques.ohana@aiforalpha.com", name: "Jean-Jacques Ohana", defaultRole: "compliance", isAdmin: true },
  { email: "ethan.setrouk@aiforalpha.com", name: "Ethan Setrouk", defaultRole: "research", isAdmin: false },
  { email: "chamyl.saadi@aiforalpha.com", name: "Chamyl Saadi", defaultRole: "client", isAdmin: false },
  { email: "thomas.jacquot@aiforalpha.com", name: "Thomas Jacquot", defaultRole: "research", isAdmin: false }
];

const roles = [
  {
    id: "all",
    label: "Tous publics",
    short: "Socle commun",
    detail: "Risque Ai For Alpha, signaux d'alerte, confidentialité, escalade."
  },
  {
    id: "client",
    label: "Onboarding / commercial",
    short: "Client-facing",
    detail: "Dossier minimum, screening, bénéficiaires effectifs, paiements."
  },
  {
    id: "research",
    label: "Recherche / data",
    short: "Recherche",
    detail: "Accès contenus, signaux inhabituels et remontée sans interaction client."
  },
  {
    id: "partner",
    label: "Partenaire / apporteur",
    short: "Partenaire",
    detail: "Supports validés, absence de collecte de fonds, remontée des anomalies."
  },
  {
    id: "compliance",
    label: "Direction / conformité",
    short: "Conformité",
    detail: "Décisions sensibles, TRACFIN, revues, preuves et registre."
  }
];

const modules = [
  {
    id: "model",
    title: "Modèle Ai For Alpha et périmètre LCB-FT",
    audience: "Tous publics",
    lead: "La procédure 2026 est construite pour un modèle B2B institutionnel, sans custody ni maniement de fonds clients. La vigilance porte donc sur la contrepartie, la relation, les accès et les paiements d'honoraires.",
    points: [
      "Ai For Alpha fournit modèles quantitatifs, signaux d'aide à la décision, recherche réservée et allocations advisory à des clients professionnels ou institutionnels.",
      "La société n'exécute pas d'ordres, ne reçoit pas de fonds clients, ne conserve pas d'actifs, ne gère pas les portefeuilles clients et ne fournit pas de réception-transmission d'ordres.",
      "Le dispositif couvre l'identification des contreparties, le screening sanctions/gel/PEP, la transparence de structure lorsque pertinente, la cohérence du payeur, la gestion des alertes et la traçabilité."
    ],
    visual: "scope"
  },
  {
    id: "onboarding",
    title: "Diligences avant ouverture d'accès",
    audience: "Onboarding, commercial, partenaires, conformité",
    lead: "Aucun accès portail/API et aucun contenu réservé ne doivent être ouverts tant que le dossier minimum n'est pas disponible et validé.",
    points: [
      "Identifier l'entité : dénomination, forme juridique, pays, adresse, immatriculation ou équivalent, site institutionnel, LEI ou statut régulé lorsque disponible.",
      "Identifier les signataires et interlocuteurs habilités : nom, fonction, email professionnel, cohérence avec le client et le contrat, pouvoir ou qualité de signature si nécessaire.",
      "Qualifier la relation : type de service, canal de diffusion, pays, intermédiaire ou apporteur, payeur attendu, élément cross-border.",
      "Réaliser le screening, classifier le risque puis décider : standard, complémentaires, renforcées, suspension, refus ou ouverture."
    ],
    visual: "flow"
  },
  {
    id: "ubo",
    title: "Bénéficiaires effectifs et proportionnalité",
    audience: "Onboarding, conformité",
    lead: "La procédure ne cherche pas une information impossible ou non pertinente pour les grands institutionnels. Elle exige une conclusion raisonnable, vérifiable et adaptée au risque.",
    points: [
      "Pour société cotée, banque, assureur, asset manager régulé ou groupe international transparent : documenter le statut, la supervision ou la cotation.",
      "Pour fonds de pension, institution publique ou organisme assimilable : identifier l'entité, le régime juridique, les signataires et l'autorité de supervision ou tutelle.",
      "Pour société non cotée, véhicule privé, holding ou structure multi-juridictionnelle : demander organigramme, bénéficiaires effectifs, justification de structure et revue renforcée selon le risque.",
      "Le refus de documenter une structure opaque déclenche une escalade direction/conformité et peut justifier suspension ou refus."
    ],
    visual: "risk"
  },
  {
    id: "risk",
    title: "Classification faible, modéré, élevé",
    audience: "Client-facing, conformité, direction",
    lead: "La cartographie combine six dimensions : nature du client, géographie, service fourni, canal d'entrée en relation, transparence de la structure et cohérence des paiements.",
    points: [
      "Faible : client régulé/coté ou institutionnel transparent, pays standard, contrat cohérent, payeur contractant, absence d'alerte.",
      "Modéré : structure ou pays nécessitant des pièces ciblées, relation à distance, apporteur, service advisory paramétré, client US institutionnel ou cross-border maîtrisable.",
      "Élevé : structure opaque, pays sensible ou sous sanctions, paiement tiers non expliqué, PEP pertinente, adverse media significatif, refus de documents ou pression pour contourner le processus.",
      "La classification doit être justifiée et reliée à des diligences concrètes, pas être un simple libellé."
    ],
    visual: "risk"
  },
  {
    id: "screening",
    title: "Screening sanctions, gel, PEP, adverse media",
    audience: "Tous publics avec approfondissement client-facing",
    lead: "Le screening est réalisé avant l'entrée en relation, puis lors des revues périodiques ou des déclencheurs d'alerte. La preuve du contrôle doit être conservée.",
    points: [
      "Noms contrôlés a minima : entité cliente, noms commerciaux connus, signataires, représentants habilités, dirigeants pertinents, bénéficiaires effectifs lorsque requis.",
      "Preuve à conserver : date, source ou outil, périmètre des noms contrôlés, résultat et conclusion.",
      "Un faux positif est levé par une courte note expliquant pourquoi la personne contrôlée n'est pas celle visée.",
      "Un match non résolu ou un doute sérieux suspend l'onboarding et déclenche une escalade direction/conformité."
    ],
    visual: "screening"
  },
  {
    id: "payments",
    title: "Paiements, apporteurs et interdits",
    audience: "Commercial, finance, partenaires, conformité",
    lead: "Ai For Alpha ne vérifie pas la source des fonds investis dans les portefeuilles clients, mais contrôle la cohérence des paiements de ses honoraires.",
    points: [
      "Les paiements doivent provenir du client contractant ou d'une entité du même groupe justifiée contractuellement ou administrativement.",
      "Les paiements en espèces sont interdits. Les paiements en crypto-actifs ne sont pas acceptés dans le cadre ordinaire.",
      "Tout tiers payeur non expliqué, juridiction sensible ou compte incohérent est escaladé avant acceptation.",
      "Les partenaires et apporteurs utilisent uniquement les supports validés, ne promettent pas de performance, ne collectent pas de fonds et remontent les anomalies."
    ],
    visual: "payments"
  },
  {
    id: "escalation",
    title: "Escalade, TRACFIN, suivi et preuves",
    audience: "Tous publics avec responsabilité conformité/direction",
    lead: "Tout collaborateur ou représentant qui identifie une anomalie la remonte immédiatement avant poursuite de la relation ou ouverture d'accès supplémentaire.",
    points: [
      "La conformité/direction analyse les faits, rassemble les éléments et documente la décision dans une note d'escalade ou le registre des cas sensibles.",
      "La direction décide : poursuite sans réserve, poursuite avec mesures renforcées, suspension/attente de pièces, refus ou fin de relation.",
      "Le déclarant TRACFIN procède, le cas échéant, à la déclaration. Le client ou prospect ne doit jamais être informé de l'analyse de soupçon ou d'une déclaration éventuelle.",
      "Les fiches KYC, screenings, conclusions bénéficiaires effectifs, notes d'escalade, décisions et preuves de formation sont conservées. La procédure est revue au moins annuellement."
    ],
    visual: "records"
  }
];

const moduleDeepDives = {
  model: {
    objective: "Comprendre pourquoi la LCB-FT d'Ai For Alpha est proportionnée à un modèle B2B institutionnel sans custody, sans exécution d'ordres et sans maniement de fonds clients.",
    reflexes: [
      "Toujours distinguer les fonds investis par le client, hors périmètre opérationnel, et les honoraires facturés par Ai For Alpha, qui doivent être cohérents.",
      "Ne jamais ouvrir d'accès, transmettre de contenu réservé ou diffuser de signaux si le dossier minimum n'est pas validé.",
      "Ramener chaque doute à trois questions simples : qui est la contrepartie, quel service reçoit-elle, quel flux financier Ai For Alpha encaisse-t-elle ?"
    ],
    pitfalls: [
      "Penser qu'un client institutionnel ou régulé dispense de toute diligence.",
      "Appliquer un parcours de banque dépositaire à Ai For Alpha et demander des informations hors finalité.",
      "Confondre absence de custody et absence d'obligation LCB-FT."
    ],
    evidence: [
      "Contrat ou proposition décrivant le service fourni.",
      "Trace du dossier d'identification et du screening.",
      "Conclusion de risque et décision d'ouverture, de suspension ou de refus."
    ],
    scenario: "Un prospect demande un accès API avant signature pour tester les signaux. La bonne conduite est de refuser l'accès opérationnel, qualifier la relation, finaliser les diligences puis seulement ouvrir l'accès si la décision est favorable."
  },
  onboarding: {
    objective: "Savoir constituer le dossier minimum avant toute entrée en relation ou tout accès à un contenu réservé.",
    reflexes: [
      "Identifier l'entité cliente avant d'identifier seulement le signataire : dénomination, forme, pays, adresse et identifiant.",
      "Vérifier que le signataire ou interlocuteur habilité est cohérent avec l'entité, son email professionnel et son rôle.",
      "Qualifier le canal de diffusion, les pays, l'apporteur éventuel, le payeur attendu et l'élément cross-border avant de conclure."
    ],
    pitfalls: [
      "Considérer une facture payée comme une preuve suffisante d'identification.",
      "Reporter le KYC à la revue annuelle après avoir ouvert l'accès.",
      "Laisser l'apporteur porter seul la connaissance client."
    ],
    evidence: [
      "Fiche client ou dossier KYC avec entité, signataires, rôle et pouvoirs utiles.",
      "Trace de screening préalable et classification de risque.",
      "Décision d'ouverture ou de demande de pièces complémentaires."
    ],
    scenario: "Un prospect connu commercialement utilise une adresse personnelle pour signer. La relation ne doit pas être bloquée automatiquement, mais la fonction, l'habilitation et la cohérence avec le client doivent être documentées avant accès."
  },
  ubo: {
    objective: "Appliquer une approche proportionnée des bénéficiaires effectifs, renforcée lorsque la structure crée un doute.",
    reflexes: [
      "Pour les grands institutionnels transparents, documenter le statut régulé, coté, public ou supervisé et conclure raisonnablement.",
      "Pour les holdings, véhicules privés ou structures multi-juridictionnelles, demander organigramme, bénéficiaires effectifs et justification de structure.",
      "Escalader si le client refuse de documenter une structure opaque ou si la chaîne de contrôle reste incohérente."
    ],
    pitfalls: [
      "Demander tous les bénéficiaires d'un fonds de pension ou chaque adhérent d'un organisme public.",
      "Ne rien écrire sous prétexte que l'entité est connue ou réputée.",
      "Classer automatiquement en faible une structure privée simplement parce que le ticket commercial est important."
    ],
    evidence: [
      "Extrait de registre, organigramme, preuve de supervision ou page institutionnelle fiable.",
      "Note de proportionnalité lorsque l'identification détaillée de personnes physiques n'est pas pertinente.",
      "Note d'escalade ou décision de refus si les pièces ne permettent pas de lever le doute."
    ],
    scenario: "Une filiale d'un groupe coté européen n'appelle pas les mêmes diligences qu'une holding privée dans plusieurs juridictions. Le niveau de preuve doit suivre l'opacité réelle, pas seulement le nom commercial."
  },
  risk: {
    objective: "Transformer la classification faible, modéré ou élevé en mesures concrètes, et non en simple score abstrait.",
    reflexes: [
      "Croiser les six dimensions : client, géographie, service, canal, transparence de structure et cohérence des paiements.",
      "Documenter la raison du niveau retenu en une phrase compréhensible par un contrôleur.",
      "Associer chaque niveau à une action : pièces standard, pièces complémentaires, validation direction, revue rapprochée, suspension ou refus."
    ],
    pitfalls: [
      "Classer faible par automatisme parce que le client est institutionnel.",
      "Classer élevé sans analyse alors que les signaux sont maîtrisables et documentés.",
      "Oublier qu'un paiement tiers ou une pression commerciale peut changer le niveau de risque."
    ],
    evidence: [
      "Grille de classification ou note interne datée.",
      "Facteurs retenus et facteurs écartés, avec justification courte.",
      "Validation direction/conformité pour les cas élevés ou sensibles."
    ],
    scenario: "Un client US institutionnel transparent peut être modéré si le cross-border et la relation à distance sont maîtrisés. Il devient plus sensible si s'ajoutent structure opaque, tiers payeur ou pression pour contourner le processus."
  },
  screening: {
    objective: "Réaliser un screening défendable : bon périmètre de noms, preuve datée, conclusion et escalade en cas de doute.",
    reflexes: [
      "Screening avant entrée en relation, puis lors d'une revue ou d'un événement significatif.",
      "Contrôler l'entité, noms commerciaux, signataires, représentants habilités, dirigeants pertinents et bénéficiaires effectifs requis.",
      "Conserver date, source, noms contrôlés, résultat et conclusion, même si le résultat est négatif."
    ],
    pitfalls: [
      "Garder seulement une capture d'écran sans conclusion.",
      "Supprimer un résultat gênant ou changer l'orthographe pour éviter un match.",
      "Demander directement au prospect s'il est sanctionné au lieu d'escalader."
    ],
    evidence: [
      "Export ou capture de l'outil avec date et source.",
      "Liste des noms réellement contrôlés.",
      "Note de faux positif ou note d'escalade en cas de doute non levé."
    ],
    scenario: "Un homonyme apparaît sur une liste. Si la date de naissance, le pays et la fonction ne correspondent pas, il faut documenter le faux positif. Si le doute persiste, l'onboarding est suspendu et escaladé."
  },
  payments: {
    objective: "Contrôler les flux d'honoraires encaissés par Ai For Alpha sans confondre ce contrôle avec les fonds investis par les clients.",
    reflexes: [
      "Vérifier que le payeur correspond au client contractant ou à une entité du même groupe justifiée.",
      "Comparer facture, contrat, banque, pays, devise et montant avant acceptation d'un flux atypique.",
      "Escalader avant encaissement si un tiers payeur, une juridiction sensible ou une incohérence bancaire apparaît."
    ],
    pitfalls: [
      "Accepter un tiers payeur au motif que la facture est réglée.",
      "Modifier le contrat après réception du paiement pour faire disparaître l'anomalie.",
      "Laisser un apporteur collecter un acompte ou recevoir des fonds du prospect."
    ],
    evidence: [
      "Facture, contrat et justificatif du lien avec le payeur lorsqu'il diffère du client.",
      "Trace de l'analyse de cohérence du flux.",
      "Décision d'acceptation, de demande de justification, de suspension ou de refus."
    ],
    scenario: "Si la facture est au nom d'un asset manager mais le paiement arrive d'une société tierce située dans une juridiction sensible, l'encaissement doit être suspendu jusqu'à justification et décision documentée."
  },
  escalation: {
    objective: "Savoir quand remonter, comment documenter, qui décide et quelles preuves conserver pour démontrer le dispositif.",
    reflexes: [
      "Remonter immédiatement toute anomalie avant poursuite, accès supplémentaire ou encaissement sensible.",
      "Garder la confidentialité des analyses de soupçon et ne jamais informer le client d'une déclaration éventuelle.",
      "Tracer la décision : poursuite, mesures renforcées, attente de pièces, suspension, refus ou fin de relation."
    ],
    pitfalls: [
      "Attendre la fin du trimestre ou la revue annuelle pour traiter une alerte.",
      "Confondre alerte et déclaration automatique : une déclaration suppose une analyse documentée.",
      "Conserver seulement un email informel sans faits, pièces, décision ni propriétaire."
    ],
    evidence: [
      "Note d'escalade ou registre des cas sensibles.",
      "Décision de direction/conformité et mesures prises.",
      "Preuves de désignation TRACFIN, formations, présences, attestations, QCM et revues de procédure."
    ],
    scenario: "Une alerte adverse media apparaît pendant l'onboarding. Le bon réflexe est de documenter les faits, suspendre si nécessaire, escalader et garder la confidentialité jusqu'à décision."
  }
};

const questionBank = [
  {
    id: "q-model-1",
    module: "model",
    difficulty: "Socle",
    roles: ["all", "client", "research", "partner", "compliance"],
    prompt: "Un prospect institutionnel demande si Ai For Alpha peut recevoir temporairement les fonds à investir pour simplifier le lancement. Quelle réponse est conforme à la procédure ?",
    choices: [
      "Accepter uniquement si le montant est faible.",
      "Refuser : Ai For Alpha ne reçoit pas de fonds clients et ne conserve pas d'actifs.",
      "Accepter si le prospect est régulé.",
      "Accepter après une déclaration orale du bénéficiaire effectif."
    ],
    answer: 1,
    explanation: "Le dispositif est proportionné au modèle sans custody ni maniement de fonds clients. Recevoir des fonds serait hors périmètre opérationnel."
  },
  {
    id: "q-model-2",
    module: "model",
    difficulty: "Socle",
    roles: ["all", "research", "partner", "client", "compliance"],
    prompt: "Quel est le bon objectif LCB-FT pour Ai For Alpha ?",
    choices: [
      "Reconstituer systématiquement tous les investissements réalisés par les clients.",
      "Identifier les contreparties, comprendre la relation, screener, contrôler le payeur des factures, escalader les alertes et tracer les décisions.",
      "Remplacer les contrôles des clients institutionnels par une simple clause contractuelle.",
      "Déléguer l'intégralité du dispositif à l'apporteur."
    ],
    answer: 1,
    explanation: "La procédure vise un dispositif effectif et proportionné centré sur la relation d'affaires et les preuves."
  },
  {
    id: "q-model-3",
    module: "model",
    difficulty: "Scénario",
    roles: ["all", "research", "partner"],
    prompt: "Un data scientist reçoit directement une demande d'accès à un flux de signaux par une personne non validée dans un dossier client. Que doit-il faire ?",
    choices: [
      "Créer un accès temporaire en lecture seule jusqu'à validation commerciale.",
      "Ne pas ouvrir l'accès et remonter la demande au circuit onboarding/conformité.",
      "Envoyer un extrait de signaux pour qualifier le besoin avant onboarding.",
      "Demander une carte de visite et l'ajouter au dossier sans escalade."
    ],
    answer: 1,
    explanation: "Les profils non client-facing reçoivent une sensibilisation courte : ne pas traiter seuls la relation et remonter les signaux inhabituels."
  },
  {
    id: "q-onboarding-1",
    module: "onboarding",
    difficulty: "Socle",
    roles: ["all", "client", "partner", "compliance"],
    prompt: "À quel moment peut-on ouvrir un accès portail/API ou transmettre une recherche réservée ?",
    choices: [
      "Dès qu'un contrat est en discussion.",
      "Après validation du dossier minimum LCB-FT.",
      "Après le premier paiement, même si le screening n'est pas finalisé.",
      "Lorsqu'un apporteur confirme connaître le prospect."
    ],
    answer: 1,
    explanation: "La procédure interdit l'ouverture d'accès opérationnel tant que le dossier minimum n'est pas disponible et validé."
  },
  {
    id: "q-onboarding-2",
    module: "onboarding",
    difficulty: "Socle",
    roles: ["client", "compliance"],
    prompt: "Laquelle de ces informations fait partie de l'identification minimale d'une personne morale cliente ?",
    choices: [
      "Dénomination, forme juridique, pays, adresse, immatriculation ou identifiant équivalent.",
      "Dénomination et site web uniquement, si le prospect est institutionnel.",
      "Nom du signataire uniquement, car la relation est portée par le contrat.",
      "Première facture payée, car le paiement confirme l'existence du client."
    ],
    answer: 0,
    explanation: "L'identification porte sur l'existence et la cohérence de l'entité, pas sur des données inutiles ou disproportionnées."
  },
  {
    id: "q-onboarding-3",
    module: "onboarding",
    difficulty: "Scénario",
    roles: ["client", "compliance", "partner"],
    prompt: "Un prospect est présenté par un apporteur et souhaite une mise en relation à distance avec diffusion de signaux aux États-Unis. Quel point doit être qualifié ?",
    choices: [
      "Le montant de la facture et le nom du commercial, puis compléter le reste après signature.",
      "Le type de service, le canal, les pays, le rôle de l'apporteur, le payeur attendu et l'élément cross-border.",
      "Le canal de diffusion et le pays uniquement, car l'apporteur prend en charge le reste.",
      "Le statut institutionnel du prospect, qui suffit à neutraliser l'élément cross-border."
    ],
    answer: 1,
    explanation: "La cartographie et l'onboarding tiennent compte du service, du canal, de la géographie, de l'apporteur, du payeur et du cross-border."
  },
  {
    id: "q-onboarding-4",
    module: "onboarding",
    difficulty: "Expert",
    roles: ["client", "compliance"],
    prompt: "Un signataire utilise une adresse personnelle et son pouvoir de signature n'est pas clair. Quelle conduite est la plus robuste ?",
    choices: [
      "Accepter si le domaine personnel est connu.",
      "Identifier sa fonction, vérifier la cohérence avec le client et demander le pouvoir ou la qualité de signature si nécessaire.",
      "Ouvrir l'accès puis demander les preuves lors de la revue annuelle.",
      "Remplacer le signataire par l'apporteur."
    ],
    answer: 1,
    explanation: "La procédure demande d'identifier les signataires et interlocuteurs habilités, avec cohérence email/fonction/contrat et pouvoir si nécessaire."
  },
  {
    id: "q-ubo-1",
    module: "ubo",
    difficulty: "Scénario",
    roles: ["client", "compliance"],
    prompt: "Un asset manager européen régulé, filiale d'un groupe coté transparent, veut contractualiser. Aucun signal défavorable n'apparaît. Quelle approche bénéficiaire effectif est proportionnée ?",
    choices: [
      "Reconstituer toute la chaîne de détention jusqu'à chaque actionnaire final.",
      "Documenter le statut régulé/coté et conclure raisonnablement, sauf alerte, que l'identification détaillée de personnes physiques contrôleuses n'est pas pertinente.",
      "Ne rien documenter car le client est connu.",
      "Classer automatiquement en élevé."
    ],
    answer: 1,
    explanation: "La procédure évite les démarches impossibles ou non pertinentes pour des institutions de grande taille transparentes ou régulées."
  },
  {
    id: "q-ubo-2",
    module: "ubo",
    difficulty: "Scénario",
    roles: ["client", "compliance"],
    prompt: "Une holding privée multi-juridictionnelle refuse de fournir un organigramme et les bénéficiaires effectifs. Quelle décision est conforme ?",
    choices: [
      "Poursuivre avec une vigilance faible.",
      "Escalader direction/conformité et suspendre ou refuser si le doute ne peut pas être levé.",
      "Demander au client de payer depuis un autre compte.",
      "Ignorer la structure car Ai For Alpha ne gère pas les portefeuilles."
    ],
    answer: 1,
    explanation: "Structure opaque et refus de documents sont des facteurs de risque élevé et peuvent justifier suspension ou refus."
  },
  {
    id: "q-ubo-3",
    module: "ubo",
    difficulty: "Socle",
    roles: ["client", "compliance"],
    prompt: "Pour un fonds de pension ou organisme public, quelle diligence est adaptée ?",
    choices: [
      "Identifier l'entité, son régime juridique, les signataires et l'organisme de supervision ou de tutelle.",
      "Demander l'identité de tous les bénéficiaires du régime.",
      "Limiter le dossier au statut public ou assimilé, sans identifier les signataires.",
      "Exiger un justificatif de patrimoine de chaque adhérent."
    ],
    answer: 0,
    explanation: "La procédure prévoit une conclusion proportionnée sur l'absence de bénéficiaire effectif personne physique pertinent, sauf structure atypique."
  },
  {
    id: "q-risk-1",
    module: "risk",
    difficulty: "Socle",
    roles: ["all", "client", "partner", "compliance"],
    prompt: "Quelles sont les six dimensions de la cartographie LCB-FT Ai For Alpha ?",
    choices: [
      "Prix, durée, commercial, facture, devise, pays.",
      "Nature du client, géographie, service, canal d'entrée en relation, transparence de la structure, cohérence des paiements.",
      "Nom, prénom, téléphone, email, signature, contrat.",
      "Montant facturé, date de paiement, marge, pays, devise, banque."
    ],
    answer: 1,
    explanation: "Ces six dimensions permettent d'obtenir un niveau de risque relié aux diligences."
  },
  {
    id: "q-risk-2",
    module: "risk",
    difficulty: "Scénario",
    roles: ["client", "partner", "compliance"],
    prompt: "Quel cas doit être traité comme risque élevé ou au minimum escaladé ?",
    choices: [
      "Client régulé, pays standard, contrat cohérent, payeur contractant.",
      "Structure opaque, pays sensible, paiement tiers non expliqué et pression pour contourner le processus.",
      "Institution publique avec signataire identifié.",
      "Renouvellement sans changement significatif."
    ],
    answer: 1,
    explanation: "Le cumul structure opaque, pays sensible, paiement tiers non expliqué et pression opérationnelle concentre plusieurs facteurs de risque élevé et impose une escalade avant poursuite."
  },
  {
    id: "q-risk-3",
    module: "risk",
    difficulty: "Expert",
    roles: ["client", "compliance"],
    prompt: "Pourquoi une classification LCB-FT ne doit-elle pas rester un simple score abstrait ?",
    choices: [
      "Parce qu'elle doit déclencher des mesures de vigilance concrètes et traçables.",
      "Parce qu'elle doit être envoyée au client.",
      "Parce qu'elle remplace tous les screenings.",
      "Parce qu'elle sert uniquement à fixer le prix."
    ],
    answer: 0,
    explanation: "La procédure relie faible/modéré/élevé aux pièces, validations, notes d'escalade et revues."
  },
  {
    id: "q-risk-4",
    module: "risk",
    difficulty: "Scénario",
    roles: ["client", "compliance"],
    prompt: "Un client US institutionnel est transparent, mais la relation est transfrontalière et à distance. Quel niveau est le plus cohérent avant analyse finale ?",
    choices: [
      "Faible sans autre analyse, car le client est institutionnel.",
      "Modéré si les éléments cross-border sont maîtrisables et documentés.",
      "Élevé par défaut sans regarder les éléments de transparence.",
      "Hors périmètre LCB-FT parce que la relation est transfrontalière."
    ],
    answer: 1,
    explanation: "La procédure cite les clients US institutionnels et configurations transfrontalières maîtrisables parmi les cas modérés."
  },
  {
    id: "q-screening-1",
    module: "screening",
    difficulty: "Socle",
    roles: ["all", "client", "partner", "compliance"],
    prompt: "Quels noms doivent être screenés a minima ?",
    choices: [
      "Le nom commercial et le signataire principal seulement.",
      "L'entité cliente, noms commerciaux connus, signataires, représentants habilités, dirigeants pertinents et bénéficiaires effectifs lorsque requis.",
      "L'entité cliente et le CEO d'Ai For Alpha.",
      "Le payeur de la première facture et les contacts commerciaux."
    ],
    answer: 1,
    explanation: "Le périmètre du screening doit couvrir les noms qui peuvent porter le risque : entité, noms commerciaux, signataires, représentants, dirigeants pertinents et bénéficiaires effectifs lorsque requis."
  },
  {
    id: "q-screening-2",
    module: "screening",
    difficulty: "Scénario",
    roles: ["client", "partner", "compliance"],
    prompt: "Un résultat sanctions ressemble au nom d'un dirigeant, mais la date de naissance et le pays ne correspondent pas. Que faut-il faire ?",
    choices: [
      "Supprimer le résultat sans trace.",
      "Documenter le faux positif par une courte note expliquant pourquoi ce n'est pas la personne visée.",
      "Informer le client qu'il a été détecté sur une liste.",
      "Continuer sans conclusion."
    ],
    answer: 1,
    explanation: "Un faux positif peut être levé, mais seulement par une analyse courte et conservée qui rattache les éléments distinctifs à la personne contrôlée."
  },
  {
    id: "q-screening-3",
    module: "screening",
    difficulty: "Scénario",
    roles: ["all", "client", "partner", "compliance"],
    prompt: "Un match sanctions ne peut pas être levé rapidement. Quelle action est requise ?",
    choices: [
      "Ouvrir l'accès mais bloquer la facturation.",
      "Suspendre l'onboarding et escalader direction/conformité.",
      "Demander au prospect s'il est réellement sanctionné.",
      "Changer l'orthographe du nom dans le dossier."
    ],
    answer: 1,
    explanation: "Un match non résolu ou un doute sérieux impose de suspendre l'entrée en relation ou l'accès opérationnel et d'escalader à la direction/conformité."
  },
  {
    id: "q-screening-4",
    module: "screening",
    difficulty: "Expert",
    roles: ["client", "compliance"],
    prompt: "Après un screening sans alerte, quelle trace est suffisante pour être défendable en contrôle ?",
    choices: [
      "Une mention orale 'screening OK' si le client est connu.",
      "Date, source ou outil, périmètre des noms contrôlés, résultat et conclusion conservée.",
      "Une capture d'écran isolée sans conclusion, car elle prouve qu'une recherche a été faite.",
      "Une note rédigée plus tard sans date de contrôle ni liste des noms contrôlés."
    ],
    answer: 1,
    explanation: "La procédure exige une preuve traçable : date, source/outil, périmètre, résultat et conclusion."
  },
  {
    id: "q-payments-1",
    module: "payments",
    difficulty: "Socle",
    roles: ["all", "client", "partner", "compliance"],
    prompt: "Quelle règle s'applique au paiement des honoraires Ai For Alpha ?",
    choices: [
      "Le paiement doit provenir du client contractant ou d'une entité du même groupe justifiée.",
      "Un tiers peut payer si son lien avec le client est expliqué après encaissement.",
      "Une entité du groupe peut payer sans justification dès lors que le libellé mentionne le client.",
      "Le contrat peut être ajusté après réception pour correspondre au payeur réel."
    ],
    answer: 0,
    explanation: "La cohérence facture, contrat, payeur, banque, pays, devise et montant est centrale."
  },
  {
    id: "q-payments-2",
    module: "payments",
    difficulty: "Scénario",
    roles: ["client", "partner", "compliance"],
    prompt: "La facture est au nom d'un client institutionnel, mais le paiement arrive d'une société tierce non mentionnée, depuis une juridiction sensible. Que faire ?",
    choices: [
      "Accepter si le montant correspond.",
      "Escalader avant acceptation.",
      "Demander au partenaire de recevoir les fonds.",
      "Modifier le contrat pour correspondre au payeur sans analyse."
    ],
    answer: 1,
    explanation: "Tiers payeur non expliqué, juridiction sensible ou compte incohérent sont des alertes à traiter avant acceptation."
  },
  {
    id: "q-payments-3",
    module: "payments",
    difficulty: "Scénario",
    roles: ["partner", "client"],
    prompt: "Un apporteur propose de collecter un acompte auprès du prospect pour accélérer le dossier. Quelle réponse est conforme ?",
    choices: [
      "Accepter si l'apporteur reverse immédiatement les fonds depuis son compte professionnel.",
      "Refuser : les apporteurs ne collectent pas de fonds.",
      "Limiter la collecte par l'apporteur au seul acompte de démarrage.",
      "Faire apparaître l'apporteur comme payeur au contrat sans analyse complémentaire."
    ],
    answer: 1,
    explanation: "Les représentants commerciaux/apporteurs ne collectent pas de fonds et remontent toute anomalie."
  },
  {
    id: "q-payments-4",
    module: "payments",
    difficulty: "Socle",
    roles: ["all", "client", "partner", "compliance"],
    prompt: "Quelle affirmation sur la source des fonds est correcte pour Ai For Alpha ?",
    choices: [
      "Ai For Alpha vérifie systématiquement la source des fonds investis dans les portefeuilles clients.",
      "Ai For Alpha ne vérifie pas ces fonds car elle ne les reçoit ni ne les gère, mais contrôle la cohérence des paiements de ses honoraires.",
      "Ai For Alpha ne contrôle aucun paiement.",
      "Ai For Alpha accepte les espèces si le client est régulé."
    ],
    answer: 1,
    explanation: "La distinction entre fonds investis hors périmètre et paiement des honoraires est explicite dans la procédure."
  },
  {
    id: "q-escalation-1",
    module: "escalation",
    difficulty: "Socle",
    roles: ["all", "client", "research", "partner", "compliance"],
    prompt: "Qui doit remonter une anomalie LCB-FT ?",
    choices: [
      "Les équipes commerciales client-facing, car elles portent la relation.",
      "Tout collaborateur ou représentant qui identifie une anomalie.",
      "La conformité seulement une fois le dossier complet.",
      "Le signataire du contrat, car il représente juridiquement le client."
    ],
    answer: 1,
    explanation: "La procédure impose une remontée immédiate à la fonction conformité/direction."
  },
  {
    id: "q-escalation-2",
    module: "escalation",
    difficulty: "Scénario",
    roles: ["all", "client", "research", "partner", "compliance"],
    prompt: "Une analyse de soupçon est en cours. Quelle conduite respecte la procédure ?",
    choices: [
      "Informer le client qu'une analyse est en cours pour obtenir son explication.",
      "Documenter les faits, escalader à la conformité/direction, maintenir la confidentialité et suspendre tout accès supplémentaire si nécessaire.",
      "Continuer la relation normalement tant qu'aucune déclaration TRACFIN n'a été faite.",
      "Supprimer les échanges sensibles pour éviter de conserver des données inutiles."
    ],
    answer: 1,
    explanation: "La confidentialité des analyses de soupçon et déclarations éventuelles est obligatoire, mais elle n'empêche pas de documenter, escalader et suspendre si nécessaire."
  },
  {
    id: "q-escalation-3",
    module: "escalation",
    difficulty: "Expert",
    roles: ["client", "compliance"],
    prompt: "Après analyse d'une alerte, quelles décisions la direction peut-elle prendre ?",
    choices: [
      "Uniquement poursuivre la relation.",
      "Poursuite sans réserve, poursuite avec mesures renforcées, suspension/attente de pièces, refus ou fin de relation.",
      "Déclaration automatique à TRACFIN dans tous les cas.",
      "Transfert de la décision à l'apporteur."
    ],
    answer: 1,
    explanation: "La procédure prévoit plusieurs issues graduées selon les faits : poursuivre, renforcer, suspendre, attendre des pièces, refuser ou mettre fin à la relation, avec décision documentée."
  },
  {
    id: "q-escalation-4",
    module: "escalation",
    difficulty: "Expert",
    roles: ["compliance"],
    prompt: "Quelles preuves doivent être conservées pour le déclarant/correspondant TRACFIN ?",
    choices: [
      "Décision de désignation, communication aux autorités, accusé ERMES ou équivalent, continuité/remplacement.",
      "Le nom dans l'organigramme et un email interne, sans trace de communication aux autorités.",
      "L'accusé ERMES uniquement, sans décision de désignation ni continuité/remplacement.",
      "Une note dans le registre des prospects refusés, sans registre ou note séparée de désignation."
    ],
    answer: 0,
    explanation: "La procédure prévoit un registre ou une note interne séparée pour ces preuves."
  },
  {
    id: "q-escalation-5",
    module: "escalation",
    difficulty: "Socle",
    roles: ["all", "client", "research", "partner", "compliance"],
    prompt: "Quelles preuves de formation doivent être conservées ?",
    choices: [
      "Supports, feuilles de présence, attestations ou QCM.",
      "L'invitation calendrier et le support, sans preuve des participants formés.",
      "Une attestation globale sans noms, date, périmètre ni support associé.",
      "La liste de diffusion d'un email, sans preuve de présence, attestation ou QCM."
    ],
    answer: 0,
    explanation: "La procédure exige la conservation des supports, présences, attestations ou QCM."
  },
  {
    id: "q-escalation-6",
    module: "escalation",
    difficulty: "Expert",
    roles: ["compliance", "client"],
    prompt: "Quelle fréquence de revue est prévue pour une relation faible risque active ?",
    choices: [
      "À l'occasion d'un renouvellement, d'un changement significatif ou au plus tard tous les 36 mois.",
      "Tous les 24 mois, comme une relation modérée.",
      "Uniquement en cas d'alerte sanctions/PEP, sans échéance maximale.",
      "Au renouvellement contractuel seulement, même si la relation reste active plus de 36 mois."
    ],
    answer: 0,
    explanation: "La procédure prévoit 36 mois au plus tard pour le faible risque, hors déclencheur d'alerte."
  },
  {
    id: "q-escalation-7",
    module: "escalation",
    difficulty: "Expert",
    roles: ["compliance", "client"],
    prompt: "Quelle fréquence de revue est prévue pour une relation risque élevé ?",
    choices: [
      "Revue annuelle minimum et validation direction avant poursuite, extension ou renouvellement.",
      "Tous les 36 mois.",
      "À la prochaine revue contractuelle si aucune nouvelle facture n'est émise.",
      "Après validation initiale seulement, si les paiements restent cohérents."
    ],
    answer: 0,
    explanation: "Le risque élevé impose une revue annuelle minimum et une validation direction."
  },
  {
    id: "q-escalation-8",
    module: "escalation",
    difficulty: "Expert",
    roles: ["compliance"],
    prompt: "Quand la procédure LCB-FT doit-elle être revue ?",
    choices: [
      "Au moins annuellement et sans délai en cas d'évolution significative.",
      "Tous les trois ans, sauf incident majeur.",
      "À la revue annuelle seulement, même en cas d'évolution réglementaire significative.",
      "Après un incident uniquement, sans revue périodique planifiée."
    ],
    answer: 0,
    explanation: "Les évolutions doivent être datées, validées et conservées dans l'historique documentaire."
  }
];

const moduleCourseNotes = {
  model: {
    rule: "Toujours partir du modèle réel d'Ai For Alpha : B2B institutionnel, sans exécution d'ordres, sans custody et sans maniement de fonds clients.",
    correct: "Cette réponse respecte le périmètre LCB-FT applicable à Ai For Alpha et évite de créer une obligation opérationnelle qui ne correspond pas à l'activité.",
    fallback: "Cette option confond le dispositif Ai For Alpha avec un parcours de banque dépositaire, de gestion de portefeuille ou de conseil retail."
  },
  onboarding: {
    rule: "Le verrou opérationnel est simple : pas d'accès portail/API, pas de flux et pas de recherche réservée tant que le dossier minimum n'est pas validé.",
    correct: "Cette réponse protège l'entrée en relation : elle relie l'accès opérationnel à une validation KYC/LCB-FT préalable et traçable.",
    fallback: "Cette option ouvre ou régularise la relation trop tôt. La procédure exige une validation avant l'accès, pas une correction après coup."
  },
  ubo: {
    rule: "L'analyse des bénéficiaires effectifs est proportionnée : conclusion documentée pour les grands institutionnels transparents, diligences renforcées pour les structures privées ou opaques.",
    correct: "Cette réponse applique l'approche par les risques : documenter ce qui est pertinent et demander plus lorsque la structure crée un doute.",
    fallback: "Cette option est soit trop lourde pour un institutionnel transparent, soit trop légère face à une structure opaque."
  },
  risk: {
    rule: "La classification faible, modéré ou élevé doit déclencher des diligences concrètes : pièces, validation, revue, suspension ou refus selon le cas.",
    correct: "Cette réponse relie les facteurs de risque à une décision opérationnelle traçable.",
    fallback: "Cette option réduit la cartographie à une formalité ou ignore un facteur de risque qui doit modifier les diligences."
  },
  screening: {
    rule: "Le screening doit être fait avant l'entrée en relation, sur le bon périmètre de noms, avec preuve datée, source, résultat et conclusion.",
    correct: "Cette réponse conserve la preuve du contrôle et traite correctement les alertes ou faux positifs.",
    fallback: "Cette option fragilise la preuve du contrôle ou contourne l'escalade attendue en cas de doute."
  },
  payments: {
    rule: "Ai For Alpha ne vérifie pas les fonds investis par les clients, mais contrôle strictement la cohérence des paiements de ses honoraires.",
    correct: "Cette réponse distingue bien les fonds clients hors périmètre et les paiements d'honoraires qui doivent être cohérents.",
    fallback: "Cette option accepte un flux de paiement incohérent ou confond le contrôle des honoraires avec la source des fonds investis."
  },
  escalation: {
    rule: "Toute anomalie doit être remontée sans délai, documentée, traitée confidentiellement et conservée dans les registres appropriés.",
    correct: "Cette réponse protège la confidentialité, la traçabilité et la décision de la direction/conformité.",
    fallback: "Cette option casse la chaîne d'escalade, manque de preuve ou risque d'informer le client d'une analyse sensible."
  }
};

const APP_STORAGE_VERSION = 5;
const APP_BUILD = "2026-07-08-certificate-pdf";
const STORAGE_PREFIX = "afa-lcbft-training";
const LEGACY_STATE_PREFIXES = [
  "afa-lcbft-training-v3:",
  "afa-lcbft-training-v2:",
  "afa-lcbft-training-v1:"
];
const MAX_LOCAL_EVENTS = 500;
const MAX_LOCAL_ATTEMPTS = 200;
const MAX_TRACKED_DELTA_MS = 5 * 60 * 1000;
const MAX_QUESTION_TIME_MS = 30 * 60 * 1000;
const QUIZ_TARGET_QUESTIONS = 18;

const stateDefaults = {
  schemaVersion: APP_STORAGE_VERSION,
  appBuild: APP_BUILD,
  role: "all",
  activeModule: "model",
  readModules: [],
  quizOrder: [],
  choiceOrders: {},
  quizIndex: 0,
  answers: [],
  completedAt: null,
  currentAttemptId: null,
  attemptStartedAt: null,
  questionStartedAt: null,
  timing: {
    totalMs: 0,
    moduleMs: {},
    activeSince: null,
    lastSavedAt: null
  },
  stats: {
    firstSeenAt: null,
    lastLoginAt: null,
    loginCount: 0,
    bestScore: 0,
    completedCount: 0
  }
};

let currentUser = null;
let state = createDefaultState("all");
let longRecord = null;
let syncTimer = null;

const els = {
  loginScreen: document.getElementById("loginScreen"),
  appShell: document.getElementById("appShell"),
  loginForm: document.getElementById("loginForm"),
  loginEmail: document.getElementById("loginEmail"),
  loginMessage: document.getElementById("loginMessage"),
  allowedList: document.getElementById("allowedList"),
  currentUserLabel: document.getElementById("currentUserLabel"),
  currentRoleLabel: document.getElementById("currentRoleLabel"),
  roleBand: document.getElementById("roleBand"),
  moduleNav: document.getElementById("moduleNav"),
  moduleKicker: document.getElementById("moduleKicker"),
  moduleTitle: document.getElementById("moduleTitle"),
  moduleAudience: document.getElementById("moduleAudience"),
  moduleLead: document.getElementById("moduleLead"),
  modulePoints: document.getElementById("modulePoints"),
  moduleVisual: document.getElementById("moduleVisual"),
  moduleDeepDive: document.getElementById("moduleDeepDive"),
  markReadBtn: document.getElementById("markReadBtn"),
  nextModuleBtn: document.getElementById("nextModuleBtn"),
  questionCount: document.getElementById("questionCount"),
  difficultyTag: document.getElementById("difficultyTag"),
  questionText: document.getElementById("questionText"),
  answers: document.getElementById("answers"),
  explanation: document.getElementById("explanation"),
  nextQuestionBtn: document.getElementById("nextQuestionBtn"),
  restartQuizBtn: document.getElementById("restartQuizBtn"),
  progressLabel: document.getElementById("progressLabel"),
  scoreLabel: document.getElementById("scoreLabel"),
  progressFill: document.getElementById("progressFill"),
  metricModules: document.getElementById("metricModules"),
  metricAnswered: document.getElementById("metricAnswered"),
  metricCorrect: document.getElementById("metricCorrect"),
  metricTime: document.getElementById("metricTime"),
  metricStatus: document.getElementById("metricStatus"),
  certificate: document.getElementById("certificate"),
  certificateText: document.getElementById("certificateText"),
  adminPanel: document.getElementById("adminPanel"),
  adminRows: document.getElementById("adminRows"),
  refreshAdminBtn: document.getElementById("refreshAdminBtn"),
  exportBtn: document.getElementById("exportBtn"),
  printBtn: document.getElementById("printBtn"),
  logoutBtn: document.getElementById("logoutBtn"),
  toast: document.getElementById("toast")
};

function init() {
  renderAllowedUsers();
  bindEvents();
  bindPersistenceEvents();
  const restored = restoreSession();
  if (restored) showApp();
}

function bindEvents() {
  els.loginForm.addEventListener("submit", event => {
    event.preventDefault();
    login(els.loginEmail.value);
  });

  els.roleBand.addEventListener("click", event => {
    const card = event.target.closest("[data-role]");
    if (card) setRole(card.dataset.role);
  });

  els.moduleNav.addEventListener("click", event => {
    const button = event.target.closest("[data-module]");
    if (!button) return;
    saveState("module_leave", { remote: false });
    state.activeModule = button.dataset.module;
    saveState("module_viewed");
    renderAll();
  });

  els.markReadBtn.addEventListener("click", () => {
    markModuleRead(state.activeModule);
    showToast("Module marqué comme lu.");
  });

  els.nextModuleBtn.addEventListener("click", () => {
    markModuleRead(state.activeModule);
    const index = modules.findIndex(module => module.id === state.activeModule);
    state.activeModule = modules[(index + 1) % modules.length].id;
    saveState("module_next");
    renderAll();
  });

  els.answers.addEventListener("click", event => {
    const answer = event.target.closest("[data-answer]");
    if (!answer || hasAnsweredCurrent()) return;
    submitAnswer(Number(answer.dataset.answer));
  });

  els.nextQuestionBtn.addEventListener("click", () => {
    if (state.quizIndex < state.quizOrder.length - 1) {
      state.quizIndex += 1;
      state.questionStartedAt = new Date().toISOString();
    } else {
      state.completedAt = new Date().toISOString();
      state.questionStartedAt = null;
      showToast(getCompletionMessage());
    }
    saveState("quiz_next");
    renderAll();
  });

  els.restartQuizBtn.addEventListener("click", () => {
    resetQuiz();
    showToast("QCM réinitialisé.");
  });

  els.refreshAdminBtn.addEventListener("click", refreshAdmin);
  els.exportBtn.addEventListener("click", exportCertificatePdf);
  els.printBtn.addEventListener("click", () => window.print());
  els.logoutBtn.addEventListener("click", logout);
}

function bindPersistenceEvents() {
  window.setInterval(() => {
    if (currentUser && !document.hidden) saveState("heartbeat", { remote: false });
  }, 30000);

  document.addEventListener("visibilitychange", () => {
    if (!currentUser) return;
    if (document.hidden) {
      flushProgress("tab_hidden");
    } else {
      resumeActivityClock();
      saveState("tab_visible", { remote: false });
    }
  });

  window.addEventListener("pagehide", () => flushProgress("pagehide"));
  window.addEventListener("beforeunload", () => flushProgress("beforeunload"));
}

function renderAllowedUsers() {
  els.allowedList.innerHTML = allowedUsers.map(user => `<span>${escapeHtml(user.email)}</span>`).join("");
}

async function login(rawEmail) {
  const email = String(rawEmail || "").trim().toLowerCase();
  const user = allowedUsers.find(item => item.email === email);
  if (!user) {
    els.loginMessage.textContent = "Email non autorisé pour ce prototype.";
    return;
  }

  els.loginMessage.textContent = "Connexion...";
  let sessionId = createSessionId();
  let serverMode = false;
  let serverUser = null;

  try {
    const result = await apiPost("/api/login", { email });
    sessionId = result.sessionId || sessionId;
    serverUser = result.user || null;
    serverMode = true;
  } catch {
    serverMode = false;
  }

  currentUser = { ...user, sessionId, serverMode };
  sessionStorage.setItem("afa-lcbft-session", JSON.stringify(currentUser));
  loadState();
  hydrateStateFromServer(serverUser);
  applyAssignedRole();
  ensureQuizOrder();
  ensureQuestionTimer();
  saveState("login");
  showApp();
  showToast(serverMode ? "Connexion enregistrée." : "Connexion locale : serveur de suivi indisponible.");
}

function restoreSession() {
  try {
    const raw = sessionStorage.getItem("afa-lcbft-session");
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    const user = allowedUsers.find(item => item.email === parsed.email);
    if (!user) return false;
    currentUser = { ...user, sessionId: parsed.sessionId, serverMode: parsed.serverMode };
    loadState();
    applyAssignedRole();
    ensureQuizOrder();
    ensureQuestionTimer();
    saveState("session_restored", { remote: false });
    return true;
  } catch {
    return false;
  }
}

function showApp() {
  els.loginScreen.classList.add("is-hidden");
  els.appShell.classList.remove("is-hidden");
  renderAll();
  refreshAdmin();
}

function logout() {
  flushProgress("logout");
  sessionStorage.removeItem("afa-lcbft-session");
  currentUser = null;
  state = createDefaultState("all");
  longRecord = null;
  els.appShell.classList.add("is-hidden");
  els.loginScreen.classList.remove("is-hidden");
  els.loginEmail.value = "";
  els.loginMessage.textContent = "";
}

function createDefaultState(role) {
  const now = new Date().toISOString();
  return {
    ...stateDefaults,
    schemaVersion: APP_STORAGE_VERSION,
    appBuild: APP_BUILD,
    role: role || "all",
    readModules: [],
    quizOrder: [],
    choiceOrders: {},
    answers: [],
    currentAttemptId: createSessionId(),
    attemptStartedAt: now,
    questionStartedAt: now,
    timing: {
      totalMs: 0,
      moduleMs: {},
      activeSince: now,
      lastSavedAt: now
    },
    stats: {
      firstSeenAt: now,
      lastLoginAt: now,
      loginCount: 0,
      bestScore: 0,
      completedCount: 0
    }
  };
}

function stateKey(email = currentUser?.email) {
  return `${STORAGE_PREFIX}:state:${String(email || "").toLowerCase()}`;
}

function recordKey(email = currentUser?.email) {
  return `${STORAGE_PREFIX}:record:${String(email || "").toLowerCase()}`;
}

function legacyStateKeys(email = currentUser?.email) {
  return LEGACY_STATE_PREFIXES.map(prefix => `${prefix}${String(email || "").toLowerCase()}`);
}

function loadState() {
  const initialRole = currentUser?.defaultRole || "all";
  const stored = readJsonStorage(stateKey()) || readLegacyState();
  state = normalizeState(stored, initialRole);
  longRecord = normalizeLongRecord(readJsonStorage(recordKey()));
  migrateLegacyStateIfNeeded(stored);
  registerLoginLocally();
  resumeActivityClock();
}

function readLegacyState() {
  for (const key of legacyStateKeys()) {
    const value = readJsonStorage(key);
    if (value) return { ...value, migratedFromKey: key };
  }
  return null;
}

function migrateLegacyStateIfNeeded(stored) {
  if (!stored?.migratedFromKey) return;
  appendLocalEvent("migration", { fromKey: stored.migratedFromKey, toKey: stateKey() });
  writeJsonStorage(stateKey(), state);
}

function normalizeState(stored, initialRole) {
  const base = createDefaultState(initialRole);
  const merged = stored && typeof stored === "object" ? { ...base, ...stored } : base;
  const timing = stored?.timing && typeof stored.timing === "object" ? stored.timing : {};
  const stats = stored?.stats && typeof stored.stats === "object" ? stored.stats : {};

  merged.schemaVersion = APP_STORAGE_VERSION;
  merged.appBuild = APP_BUILD;
  merged.role = merged.role || initialRole;
  merged.activeModule = modules.some(module => module.id === merged.activeModule) ? merged.activeModule : "model";
  merged.readModules = Array.isArray(merged.readModules) ? merged.readModules.filter(id => modules.some(module => module.id === id)) : [];
  merged.quizOrder = Array.isArray(merged.quizOrder) ? merged.quizOrder : [];
  merged.choiceOrders = merged.choiceOrders && typeof merged.choiceOrders === "object" ? merged.choiceOrders : {};
  merged.quizIndex = Number.isInteger(merged.quizIndex) && merged.quizIndex >= 0 ? merged.quizIndex : 0;
  merged.answers = Array.isArray(merged.answers) ? merged.answers : [];
  merged.currentAttemptId = merged.currentAttemptId || createSessionId();
  merged.attemptStartedAt = merged.attemptStartedAt || new Date().toISOString();
  merged.questionStartedAt = merged.questionStartedAt || new Date().toISOString();
  merged.timing = {
    totalMs: safeNumber(timing.totalMs),
    moduleMs: timing.moduleMs && typeof timing.moduleMs === "object" ? timing.moduleMs : {},
    activeSince: timing.activeSince || new Date().toISOString(),
    lastSavedAt: timing.lastSavedAt || null
  };
  merged.stats = {
    firstSeenAt: stats.firstSeenAt || new Date().toISOString(),
    lastLoginAt: stats.lastLoginAt || null,
    loginCount: safeNumber(stats.loginCount),
    bestScore: safeNumber(stats.bestScore),
    completedCount: safeNumber(stats.completedCount)
  };
  return merged;
}

function normalizeLongRecord(stored) {
  const now = new Date().toISOString();
  const record = stored && typeof stored === "object" ? stored : {};
  return {
    schemaVersion: APP_STORAGE_VERSION,
    appBuild: APP_BUILD,
    email: currentUser.email,
    name: currentUser.name,
    firstSeenAt: record.firstSeenAt || state.stats.firstSeenAt || now,
    lastLoginAt: record.lastLoginAt || null,
    loginCount: safeNumber(record.loginCount),
    totalTimeMs: Math.max(safeNumber(record.totalTimeMs), safeNumber(state.timing?.totalMs)),
    moduleTimeMs: record.moduleTimeMs && typeof record.moduleTimeMs === "object" ? record.moduleTimeMs : { ...(state.timing?.moduleMs || {}) },
    events: Array.isArray(record.events) ? record.events.slice(-MAX_LOCAL_EVENTS) : [],
    attempts: Array.isArray(record.attempts) ? record.attempts.slice(-MAX_LOCAL_ATTEMPTS) : [],
    latestSnapshot: record.latestSnapshot || null,
    lastSavedAt: record.lastSavedAt || null
  };
}

function registerLoginLocally() {
  const now = new Date().toISOString();
  state.stats.firstSeenAt = state.stats.firstSeenAt || now;
  state.stats.lastLoginAt = now;
  state.stats.loginCount = safeNumber(state.stats.loginCount) + 1;
  longRecord.firstSeenAt = longRecord.firstSeenAt || state.stats.firstSeenAt;
  longRecord.lastLoginAt = now;
  longRecord.loginCount = safeNumber(longRecord.loginCount) + 1;
  appendLocalEvent("login", { sessionId: currentUser.sessionId, serverMode: Boolean(currentUser.serverMode) });
}

function hydrateStateFromServer(serverUser) {
  mergeServerRecordMetadata(serverUser);
  const progress = getServerProgressSnapshot(serverUser);
  if (!progress || !shouldUseServerProgress(progress)) return;

  applyServerProgress(progress, serverUser);
  appendLocalEvent("server_restore", {
    savedAt: progress.savedAt || null,
    score: progress.result?.score ?? null,
    answered: progress.result?.answered ?? null,
    modulesRead: progress.result?.modulesRead ?? null
  });
}

function mergeServerRecordMetadata(serverUser) {
  if (!serverUser || !longRecord) return;
  longRecord.loginCount = Math.max(safeNumber(longRecord.loginCount), safeNumber(serverUser.loginCount));
  longRecord.lastLoginAt = newestTimestamp(longRecord.lastLoginAt, serverUser.lastLoginAt) || longRecord.lastLoginAt;
  longRecord.totalTimeMs = Math.max(safeNumber(longRecord.totalTimeMs), safeNumber(serverUser.totalTimeMs));
  longRecord.moduleTimeMs = mergeModuleTimes(longRecord.moduleTimeMs, serverUser.moduleTimeMs);
  longRecord.attempts = mergeAttempts(longRecord.attempts, serverUser.attempts);
  state.stats.bestScore = Math.max(safeNumber(state.stats.bestScore), getBestAttemptScore(serverUser.attempts));
  state.stats.completedCount = Math.max(safeNumber(state.stats.completedCount), countPassedServerAttempts(serverUser));
}

function getServerProgressSnapshot(serverUser) {
  const latest = serverUser?.latestProgress;
  if (latest && (latest.result || latest.answers?.length || latest.readModules?.length)) return latest;

  const attempts = Array.isArray(serverUser?.attempts) ? serverUser.attempts : [];
  const latestAttempt = attempts
    .filter(attempt => attempt?.completedAt)
    .sort((a, b) => getAttemptSavedMs(b) - getAttemptSavedMs(a))[0];

  if (!latestAttempt) return null;
  return {
    savedAt: latestAttempt.savedAt || latestAttempt.completedAt,
    reason: "attempt_restore",
    role: latestAttempt.role || null,
    roleLabel: latestAttempt.roleLabel || null,
    result: {
      passed: Boolean(latestAttempt.passed),
      trainingPassed: Boolean(latestAttempt.trainingPassed),
      qcmPassed: Boolean(latestAttempt.passed),
      modulesComplete: latestAttempt.modulesRead === modules.length,
      score: latestAttempt.score,
      correct: latestAttempt.correct,
      answered: latestAttempt.answered,
      totalQuestions: latestAttempt.totalQuestions,
      modulesRead: latestAttempt.modulesRead,
      totalModules: latestAttempt.totalModules || modules.length,
      completedAt: latestAttempt.completedAt,
      timeSpentMs: latestAttempt.timeSpentMs || serverUser.totalTimeMs || 0,
      moduleTimeMs: serverUser.moduleTimeMs || {},
      attemptTimeMs: latestAttempt.attemptTimeMs || 0
    },
    readModules: latestAttempt.modulesRead === modules.length ? modules.map(module => module.id) : [],
    answers: latestAttempt.answers || [],
    longRecord: {
      latestSnapshot: {
        attemptId: latestAttempt.attemptId,
        savedAt: latestAttempt.savedAt || latestAttempt.completedAt
      }
    }
  };
}

function shouldUseServerProgress(progress) {
  const localPass = getPassStatus();
  const result = progress.result || {};
  const remoteAnswered = Math.max(safeNumber(result.answered), Array.isArray(progress.answers) ? progress.answers.length : 0);
  const remoteModules = Math.max(safeNumber(result.modulesRead), Array.isArray(progress.readModules) ? progress.readModules.length : 0);
  const remoteSavedMs = getProgressSavedMs(progress);
  const localSavedMs = getLocalSavedMs();
  const localHasProgress = Boolean(state.completedAt)
    || localPass.answered > 0
    || state.readModules.length > 0
    || safeNumber(state.timing?.totalMs) > 0;

  if (!localHasProgress) return true;
  if (remoteSavedMs && localSavedMs && remoteSavedMs > localSavedMs + 1000) return true;
  if (result.completedAt && !state.completedAt) return true;
  if (remoteAnswered > localPass.answered) return true;
  if (remoteModules > state.readModules.length && remoteAnswered >= localPass.answered) return true;
  if (safeNumber(result.score) > safeNumber(state.stats?.bestScore) && remoteAnswered >= localPass.answered) return true;
  return false;
}

function applyServerProgress(progress, serverUser) {
  const result = progress.result || {};
  state.role = resolveRole(progress.role || state.role || currentUser.defaultRole);
  const questions = getQuestionsForRole();
  const restoredAnswers = normalizeServerAnswers(progress.answers || [], questions);
  const restoredOrder = buildQuizOrderFromServerAnswers(restoredAnswers, questions, result.totalQuestions);
  const restoredReadModules = normalizeReadModulesFromServer(progress, result);
  const remoteModuleTime = mergeModuleTimes(
    mergeModuleTimes(result.moduleTimeMs, progress.longRecord?.moduleTimeMs),
    serverUser?.moduleTimeMs
  );

  if (restoredOrder.length) state.quizOrder = restoredOrder;
  state.choiceOrders = {};
  state.answers = restoredAnswers;
  state.readModules = restoredReadModules;
  state.completedAt = result.completedAt || state.completedAt || null;
  state.currentAttemptId = progress.longRecord?.latestSnapshot?.attemptId
    || restoredAnswers[0]?.attemptId
    || state.currentAttemptId
    || createSessionId();
  state.attemptStartedAt = getEarliestAnswerStart(restoredAnswers) || state.attemptStartedAt || new Date().toISOString();
  state.questionStartedAt = state.completedAt ? null : new Date().toISOString();
  state.quizIndex = getRestoredQuizIndex(restoredAnswers.length, state.quizOrder.length, state.completedAt);
  state.timing = {
    ...state.timing,
    totalMs: Math.max(
      safeNumber(state.timing?.totalMs),
      safeNumber(result.timeSpentMs),
      safeNumber(progress.longRecord?.totalTimeMs),
      safeNumber(serverUser?.totalTimeMs)
    ),
    moduleMs: mergeModuleTimes(state.timing?.moduleMs, remoteModuleTime),
    activeSince: new Date().toISOString(),
    lastSavedAt: progress.savedAt || state.timing?.lastSavedAt || null
  };
  state.stats.bestScore = Math.max(
    safeNumber(state.stats?.bestScore),
    safeNumber(result.score),
    getBestAttemptScore(serverUser?.attempts)
  );
  state.stats.completedCount = Math.max(safeNumber(state.stats?.completedCount), countPassedServerAttempts(serverUser));

  if (longRecord) {
    longRecord.totalTimeMs = Math.max(safeNumber(longRecord.totalTimeMs), safeNumber(state.timing.totalMs));
    longRecord.moduleTimeMs = mergeModuleTimes(longRecord.moduleTimeMs, state.timing.moduleMs);
    longRecord.latestSnapshot = progress.longRecord?.latestSnapshot || {
      savedAt: progress.savedAt || null,
      score: result.score ?? null,
      answered: result.answered ?? null,
      completedAt: result.completedAt || null
    };
    longRecord.lastSavedAt = progress.savedAt || longRecord.lastSavedAt || null;
  }
}

function normalizeServerAnswers(answers, questions) {
  return answers
    .map(answer => {
      const question = questions.find(item => item.id === answer?.questionId);
      if (!question) return null;
      const selectedIndex = Number.isInteger(answer.answer) ? answer.answer : question.choices.indexOf(answer.answerLabel);
      if (selectedIndex < 0 || selectedIndex >= question.choices.length) return null;
      return {
        ...answer,
        questionId: question.id,
        module: question.module,
        difficulty: question.difficulty,
        prompt: question.prompt,
        answer: selectedIndex,
        answerLabel: question.choices[selectedIndex],
        correctAnswer: question.answer,
        correctLabel: question.choices[question.answer],
        correct: selectedIndex === question.answer
      };
    })
    .filter(Boolean);
}

function buildQuizOrderFromServerAnswers(answers, questions, totalQuestions) {
  const order = [];
  for (const answer of answers) {
    const questionIndex = questions.findIndex(question => question.id === answer.questionId);
    if (questionIndex >= 0 && !order.includes(questionIndex)) order.push(questionIndex);
  }

  const target = Math.max(safeNumber(totalQuestions), order.length);
  const defaultOrder = buildQuizOrder();
  for (const questionIndex of defaultOrder) {
    if (order.length >= target) break;
    if (!order.includes(questionIndex)) order.push(questionIndex);
  }

  return order.length ? order : defaultOrder;
}

function normalizeReadModulesFromServer(progress, result) {
  const validModuleIds = new Set(modules.map(module => module.id));
  const explicitModules = Array.isArray(progress.readModules)
    ? progress.readModules.filter(moduleId => validModuleIds.has(moduleId))
    : [];
  if (explicitModules.length) return Array.from(new Set(explicitModules));
  if (safeNumber(result.modulesRead) >= modules.length) return modules.map(module => module.id);
  return state.readModules;
}

function getRestoredQuizIndex(answeredCount, questionCount, completedAt) {
  if (questionCount <= 0) return 0;
  if (completedAt) return Math.max(0, Math.min(questionCount - 1, answeredCount - 1));
  return Math.max(0, Math.min(questionCount - 1, answeredCount));
}

function resolveRole(roleId) {
  return roles.some(role => role.id === roleId) ? roleId : currentUser?.defaultRole || "all";
}

function getEarliestAnswerStart(answers) {
  return answers
    .map(answer => answer.questionStartedAt || answer.answeredAt)
    .filter(Boolean)
    .sort((a, b) => Date.parse(a) - Date.parse(b))[0] || null;
}

function mergeAttempts(localAttempts = [], serverAttempts = []) {
  const merged = Array.isArray(localAttempts) ? [...localAttempts] : [];
  for (const attempt of Array.isArray(serverAttempts) ? serverAttempts : []) {
    const exists = merged.some(item => item.attemptId === attempt.attemptId || item.completedAt === attempt.completedAt);
    if (!exists) merged.push(attempt);
  }
  return merged.sort((a, b) => getAttemptSavedMs(a) - getAttemptSavedMs(b)).slice(-MAX_LOCAL_ATTEMPTS);
}

function getBestAttemptScore(attempts = []) {
  return (Array.isArray(attempts) ? attempts : []).reduce((best, attempt) => Math.max(best, safeNumber(attempt.score)), 0);
}

function countPassedServerAttempts(serverUser) {
  return (Array.isArray(serverUser?.attempts) ? serverUser.attempts : []).filter(attempt => attempt.passed).length;
}

function newestTimestamp(first, second) {
  const firstMs = Date.parse(first || "");
  const secondMs = Date.parse(second || "");
  if (!Number.isFinite(firstMs)) return Number.isFinite(secondMs) ? second : null;
  if (!Number.isFinite(secondMs)) return first;
  return secondMs > firstMs ? second : first;
}

function getProgressSavedMs(progress) {
  return Math.max(
    dateMs(progress?.savedAt),
    dateMs(progress?.result?.completedAt),
    dateMs(progress?.longRecord?.lastSavedAt),
    dateMs(progress?.longRecord?.latestSnapshot?.savedAt)
  );
}

function getLocalSavedMs() {
  return Math.max(
    dateMs(state?.timing?.lastSavedAt),
    dateMs(state?.completedAt),
    dateMs(longRecord?.lastSavedAt),
    dateMs(longRecord?.latestSnapshot?.savedAt)
  );
}

function getAttemptSavedMs(attempt) {
  return Math.max(dateMs(attempt?.savedAt), dateMs(attempt?.completedAt), dateMs(attempt?.startedAt));
}

function dateMs(value) {
  const parsed = Date.parse(value || "");
  return Number.isFinite(parsed) ? parsed : 0;
}

function saveState(reason, options = {}) {
  if (!currentUser) return;
  updateTrackedTime(reason);
  persistLocalRecord(reason);
  if (options.remote !== false) scheduleSync(reason);
}

function persistLocalRecord(reason) {
  if (!currentUser || !longRecord) return;
  const now = new Date().toISOString();
  const pass = getPassStatus();
  state.schemaVersion = APP_STORAGE_VERSION;
  state.appBuild = APP_BUILD;
  state.timing.lastSavedAt = now;
  state.stats.bestScore = Math.max(safeNumber(state.stats.bestScore), safeNumber(pass.score));

  longRecord.schemaVersion = APP_STORAGE_VERSION;
  longRecord.appBuild = APP_BUILD;
  longRecord.email = currentUser.email;
  longRecord.name = currentUser.name;
  longRecord.totalTimeMs = Math.max(safeNumber(longRecord.totalTimeMs), safeNumber(state.timing.totalMs));
  longRecord.moduleTimeMs = mergeModuleTimes(longRecord.moduleTimeMs, state.timing.moduleMs);
  longRecord.latestSnapshot = buildLocalSnapshot(reason);
  longRecord.lastSavedAt = now;
  recordCompletedAttemptIfNeeded();
  state.stats.completedCount = countPassedAttempts();

  writeJsonStorage(stateKey(), state);
  writeJsonStorage(recordKey(), longRecord);
}

function buildLocalSnapshot(reason) {
  const pass = getPassStatus();
  return {
    savedAt: new Date().toISOString(),
    reason,
    attemptId: state.currentAttemptId,
    role: state.role,
    roleLabel: roles.find(item => item.id === state.role)?.label || state.role,
    score: pass.score,
    correct: pass.correct,
    answered: pass.answered,
    totalQuestions: state.quizOrder.length,
    modulesRead: state.readModules.length,
    totalModules: modules.length,
    passed: pass.passed,
    trainingPassed: pass.trainingPassed,
    qcmPassed: pass.qcmPassed,
    modulesComplete: pass.modulesComplete,
    completedAt: state.completedAt,
    timeSpentMs: safeNumber(state.timing.totalMs),
    timeSpentLabel: formatDuration(state.timing.totalMs)
  };
}

function appendLocalEvent(type, details = {}) {
  if (!longRecord) return;
  longRecord.events = Array.isArray(longRecord.events) ? longRecord.events : [];
  longRecord.events.push({
    type,
    at: new Date().toISOString(),
    appBuild: APP_BUILD,
    ...details
  });
  longRecord.events = longRecord.events.slice(-MAX_LOCAL_EVENTS);
}

function recordCompletedAttemptIfNeeded() {
  if (!state.completedAt || !longRecord) return;
  longRecord.attempts = Array.isArray(longRecord.attempts) ? longRecord.attempts : [];
  const attemptId = state.currentAttemptId || `${currentUser.email}:${state.completedAt}`;
  if (longRecord.attempts.some(attempt => attempt.attemptId === attemptId || attempt.completedAt === state.completedAt)) return;
  const pass = getPassStatus();
  const attempt = {
    attemptId,
    startedAt: state.attemptStartedAt,
    completedAt: state.completedAt,
    role: state.role,
    roleLabel: roles.find(item => item.id === state.role)?.label || state.role,
    score: pass.score,
    correct: pass.correct,
    answered: pass.answered,
    totalQuestions: state.quizOrder.length,
    modulesRead: state.readModules.length,
    totalModules: modules.length,
    passed: pass.passed,
    trainingPassed: pass.trainingPassed,
    timeSpentMs: getAttemptTimeMs(),
    answers: state.answers.filter(Boolean)
  };
  longRecord.attempts.push(attempt);
  longRecord.attempts = longRecord.attempts.slice(-MAX_LOCAL_ATTEMPTS);
  appendLocalEvent("attempt_completed", {
    attemptId,
    score: pass.score,
    correct: pass.correct,
    answered: pass.answered,
    passed: pass.passed,
    trainingPassed: pass.trainingPassed,
    timeSpentMs: attempt.timeSpentMs
  });
}

function resumeActivityClock() {
  if (!state.timing) state.timing = createDefaultState(state.role).timing;
  state.timing.activeSince = new Date().toISOString();
}

function updateTrackedTime(reason) {
  if (!state.timing) state.timing = createDefaultState(state.role).timing;
  const now = Date.now();
  const previous = Date.parse(state.timing.activeSince || "");
  const delta = Number.isFinite(previous) ? Math.max(0, now - previous) : 0;
  const tracked = document.hidden ? 0 : Math.min(delta, MAX_TRACKED_DELTA_MS);

  if (tracked > 0) {
    state.timing.totalMs = safeNumber(state.timing.totalMs) + tracked;
    state.timing.moduleMs = state.timing.moduleMs || {};
    state.timing.moduleMs[state.activeModule] = safeNumber(state.timing.moduleMs[state.activeModule]) + tracked;
    if (longRecord) {
      longRecord.totalTimeMs = safeNumber(longRecord.totalTimeMs) + tracked;
      longRecord.moduleTimeMs = longRecord.moduleTimeMs || {};
      longRecord.moduleTimeMs[state.activeModule] = safeNumber(longRecord.moduleTimeMs[state.activeModule]) + tracked;
    }
  }

  state.timing.activeSince = new Date(now).toISOString();
  if (reason && reason !== "heartbeat") appendLocalEvent(reason, { trackedMs: tracked });
}

function flushProgress(reason) {
  if (!currentUser) return;
  saveState(reason, { remote: false });
  if (currentUser.serverMode && navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify(buildProofPayload(reason))], { type: "application/json" });
    navigator.sendBeacon("/api/progress", blob);
  }
}

function readJsonStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeJsonStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    showToast("Stockage local saturé : téléchargez l'attestation PDF.");
  }
}

function mergeModuleTimes(primary = {}, secondary = {}) {
  const result = { ...primary };
  for (const module of modules) {
    const id = module.id;
    result[id] = Math.max(safeNumber(primary[id]), safeNumber(secondary[id]));
  }
  return result;
}

function countPassedAttempts() {
  return longRecord?.attempts?.filter(attempt => attempt.passed).length || 0;
}

function getAttemptTimeMs() {
  const answeredTime = state.answers
    .filter(Boolean)
    .reduce((sum, answer) => sum + safeNumber(answer.timeToAnswerMs), 0);
  if (answeredTime > 0) return answeredTime;
  const started = Date.parse(state.attemptStartedAt || "");
  const completed = Date.parse(state.completedAt || "");
  return Number.isFinite(started) && Number.isFinite(completed) ? Math.max(0, completed - started) : 0;
}

function safeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : 0;
}

function setRole(roleId) {
  if (state.role === roleId) return;
  saveState("role_leave", { remote: false });
  state.role = roleId;
  state.quizOrder = [];
  state.choiceOrders = {};
  state.quizIndex = 0;
  state.answers = [];
  state.completedAt = null;
  state.stats.bestScore = 0;
  state.currentAttemptId = createSessionId();
  state.attemptStartedAt = new Date().toISOString();
  state.questionStartedAt = state.attemptStartedAt;
  ensureQuizOrder();
  saveState("role_changed");
  renderAll();
  showToast("Parcours mis à jour.");
}

function applyAssignedRole() {
  const assignedRole = resolveRole(currentUser?.defaultRole || state.role);
  if (state.role === assignedRole) return;

  state.role = assignedRole;
  state.quizOrder = [];
  state.choiceOrders = {};
  state.quizIndex = 0;
  state.answers = [];
  state.completedAt = null;
  state.stats.bestScore = 0;
  state.currentAttemptId = createSessionId();
  state.attemptStartedAt = new Date().toISOString();
  state.questionStartedAt = state.attemptStartedAt;
}

function ensureQuizOrder() {
  const validIds = getQuestionsForRole().map((question, index) => index);
  const targetLength = getQuizTargetLength();
  if (state.quizOrder.length === 0 || state.quizOrder.some(index => !validIds.includes(index))) {
    state.quizOrder = buildQuizOrder();
    state.choiceOrders = {};
    state.quizIndex = 0;
    state.answers = [];
    state.completedAt = null;
    state.currentAttemptId = state.currentAttemptId || createSessionId();
    state.attemptStartedAt = state.attemptStartedAt || new Date().toISOString();
    state.questionStartedAt = state.questionStartedAt || state.attemptStartedAt;
  } else if (state.quizOrder.length < targetLength) {
    const answeredCount = state.answers.filter(Boolean).length;
    state.quizOrder = extendQuizOrder(state.quizOrder, targetLength);
    state.completedAt = null;
    state.quizIndex = getRestoredQuizIndex(answeredCount, state.quizOrder.length, null);
    state.questionStartedAt = state.questionStartedAt || new Date().toISOString();
  }
  ensureChoiceOrders();
}

function ensureQuestionTimer() {
  if (state.completedAt || hasAnsweredCurrent()) return;
  state.questionStartedAt = new Date().toISOString();
}

function buildQuizOrder() {
  const questions = getQuestionsForRole();
  const selected = [];
  for (const module of modules) {
    const moduleQuestions = questions
      .map((question, index) => ({ question, index }))
      .filter(item => item.question.module === module.id);
    const preferred = moduleQuestions.filter(item => item.question.roles.includes(state.role));
    const fallback = moduleQuestions.filter(item => !item.question.roles.includes(state.role));
    selected.push(...preferred.slice(0, 2).map(item => item.index));
    if (selected.filter(index => questions[index].module === module.id).length < 2) {
      selected.push(...fallback.slice(0, 2).map(item => item.index));
    }
  }

  const unique = Array.from(new Set(selected));
  const target = getQuizTargetLength();
  for (let index = 0; index < questions.length && unique.length < target; index += 1) {
    if (!unique.includes(index)) unique.push(index);
  }
  return unique.slice(0, target);
}

function getQuizTargetLength() {
  return Math.min(QUIZ_TARGET_QUESTIONS, getQuestionsForRole().length);
}

function extendQuizOrder(existingOrder, targetLength) {
  const questions = getQuestionsForRole();
  const validIds = new Set(questions.map((question, index) => index));
  const order = Array.from(new Set(existingOrder.filter(index => validIds.has(index))));
  const preferred = buildQuizOrder();

  for (const questionIndex of preferred) {
    if (order.length >= targetLength) break;
    if (!order.includes(questionIndex)) order.push(questionIndex);
  }

  for (let index = 0; index < questions.length && order.length < targetLength; index += 1) {
    if (!order.includes(index)) order.push(index);
  }

  return order.slice(0, targetLength);
}

function ensureChoiceOrders() {
  const questions = getQuestionsForRole();
  state.choiceOrders = state.choiceOrders && typeof state.choiceOrders === "object" ? state.choiceOrders : {};
  state.quizOrder.forEach((questionIndex, position) => {
    const question = questions[questionIndex];
    if (!question) return;
    const order = state.choiceOrders[question.id];
    if (!isValidChoiceOrder(question, order)) {
      state.choiceOrders[question.id] = buildChoiceOrder(question, position);
    }
  });
}

function isValidChoiceOrder(question, order) {
  if (!Array.isArray(order) || order.length !== question.choices.length) return false;
  const expected = new Set(question.choices.map((_, index) => index));
  return order.every(index => expected.has(index)) && new Set(order).size === expected.size;
}

function buildChoiceOrder(question, position) {
  const choiceCount = question.choices.length;
  const correctDisplayCycle = [2, 0, 3, 1];
  const seed = hashString(`${state.currentAttemptId || ""}:${question.id}:${position}`);
  const correctDisplayIndex = correctDisplayCycle[(position + seed) % correctDisplayCycle.length] % choiceCount;
  const wrongIndexes = question.choices
    .map((_, index) => index)
    .filter(index => index !== question.answer);
  const shuffledWrong = seededShuffle(wrongIndexes, seed);
  const order = new Array(choiceCount);
  order[correctDisplayIndex] = question.answer;
  let wrongCursor = 0;
  for (let displayIndex = 0; displayIndex < choiceCount; displayIndex += 1) {
    if (order[displayIndex] === undefined) {
      order[displayIndex] = shuffledWrong[wrongCursor];
      wrongCursor += 1;
    }
  }
  return order;
}

function getChoiceOrder(question) {
  const order = state.choiceOrders?.[question.id];
  return isValidChoiceOrder(question, order) ? order : question.choices.map((_, index) => index);
}

function getDisplayIndex(question, originalIndex) {
  return getChoiceOrder(question).indexOf(originalIndex);
}

function getDisplayLetter(question, originalIndex) {
  const displayIndex = getDisplayIndex(question, originalIndex);
  return String.fromCharCode(65 + (displayIndex >= 0 ? displayIndex : originalIndex));
}

function seededShuffle(values, seed) {
  return values
    .map((value, index) => ({ value, sort: hashString(`${seed}:${value}:${index}`) }))
    .sort((a, b) => a.sort - b.sort)
    .map(item => item.value);
}

function hashString(value) {
  let hash = 2166136261;
  const text = String(value);
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function getQuestionsForRole() {
  const primary = questionBank.filter(question => question.roles.includes(state.role) || question.roles.includes("all"));
  if (primary.length >= QUIZ_TARGET_QUESTIONS) return primary;

  const seen = new Set(primary.map(question => question.id));
  const fallback = questionBank.filter(question => !seen.has(question.id));
  return [...primary, ...fallback];
}

function getCurrentQuestion() {
  const questions = getQuestionsForRole();
  return questions[state.quizOrder[state.quizIndex] ?? 0];
}

function renderAll() {
  if (!currentUser) return;
  ensureQuizOrder();
  renderSession();
  renderRoleBand();
  renderModuleNav();
  renderModule();
  renderQuestion();
  renderMetrics();
}

function renderSession() {
  els.currentUserLabel.textContent = `${currentUser.name} (${currentUser.email})`;
  const role = roles.find(item => item.id === state.role);
  els.currentRoleLabel.textContent = role ? role.label : state.role;
}

function renderRoleBand() {
  const role = roles.find(item => item.id === state.role) || roles.find(item => item.id === currentUser.defaultRole) || roles[0];
  els.roleBand.innerHTML = `
    <section class="role-card is-active assigned-role">
      <strong>Parcours obligatoire : ${escapeHtml(role.short)}</strong>
      <span>${escapeHtml(role.label)} · 18 questions · 7 blocs couverts · seuil 80%</span>
    </section>
  `;
}

function renderModuleNav() {
  els.moduleNav.innerHTML = modules.map((module, index) => {
    const active = module.id === state.activeModule ? " is-active" : "";
    const done = state.readModules.includes(module.id) ? " is-done" : "";
    return `
      <button class="module-button${active}${done}" type="button" data-module="${module.id}">
        <span class="module-number">${index + 1}</span>
        <span class="module-name">${escapeHtml(module.title)}</span>
        <span class="module-status" aria-hidden="true"></span>
      </button>
    `;
  }).join("");
}

function renderModule() {
  const module = modules.find(item => item.id === state.activeModule) || modules[0];
  const index = modules.findIndex(item => item.id === module.id);
  els.moduleKicker.textContent = `Module ${index + 1}`;
  els.moduleTitle.textContent = module.title;
  els.moduleAudience.textContent = module.audience;
  els.moduleLead.textContent = module.lead;
  els.modulePoints.innerHTML = module.points.map(point => `<li><span>${escapeHtml(point)}</span></li>`).join("");
  const moduleIsRead = state.readModules.includes(module.id);
  els.markReadBtn.textContent = moduleIsRead ? "Module lu" : "Marquer le module lu";
  els.markReadBtn.classList.toggle("is-read", moduleIsRead);
  els.markReadBtn.setAttribute("aria-pressed", String(moduleIsRead));
  renderVisual(module.visual);
  renderModuleDeepDive(module.id);
}

function renderVisual(type) {
  const visuals = {
    scope: `
      <div class="flow">
        <div class="flow-step"><strong>Inclus</strong><span>Clients/prospects contractuels, accès portail/API, recherche réservée, advisory.</span></div>
        <div class="flow-step"><strong>Contrôlé</strong><span>Identité, relation, sanctions, PEP, payeur, alertes.</span></div>
        <div class="flow-step"><strong>Exclu</strong><span>Fonds investis et actifs des portefeuilles clients.</span></div>
        <div class="flow-step"><strong>Preuve</strong><span>KYC, screening, décisions, formation, revue.</span></div>
      </div>
    `,
    flow: `
      <div class="flow">
        <div class="flow-step"><strong>Identifier</strong><span>Entité, signataires, représentants habilités.</span></div>
        <div class="flow-step"><strong>Qualifier</strong><span>Service, canal, pays, apporteur, payeur attendu.</span></div>
        <div class="flow-step"><strong>Screener</strong><span>Sanctions, gel, PEP, adverse media selon risque.</span></div>
        <div class="flow-step"><strong>Décider</strong><span>Valider, compléter, renforcer, suspendre ou refuser.</span></div>
      </div>
    `,
    risk: `
      <div class="risk-grid">
        <div class="risk-cell"><strong>Faible</strong><span>Institutionnel transparent, régulé/coté, contrat cohérent, payeur attendu.</span></div>
        <div class="risk-cell"><strong>Modéré</strong><span>Distance, apporteur, cross-border maîtrisable, pièces ciblées.</span></div>
        <div class="risk-cell risk-high"><strong>Élevé</strong><span>Opacité, pays sensible, tiers payeur, PEP, adverse media, refus de pièces.</span></div>
      </div>
    `,
    screening: `
      <div class="flow">
        <div class="flow-step"><strong>Noms</strong><span>Client, noms commerciaux, signataires, dirigeants, BE si requis.</span></div>
        <div class="flow-step"><strong>Listes</strong><span>Sanctions, gel des avoirs, PEP, réputation publique.</span></div>
        <div class="flow-step"><strong>Conclusion</strong><span>Négatif, faux positif documenté, doute ou match.</span></div>
        <div class="flow-step"><strong>Escalade</strong><span>Suspension si match non résolu ou doute sérieux.</span></div>
      </div>
    `,
    payments: `
      <div class="flow">
        <div class="flow-step"><strong>Payeur</strong><span>Client contractant ou entité groupe justifiée.</span></div>
        <div class="flow-step"><strong>Interdits</strong><span>Espèces interdites, crypto-actifs hors cadre ordinaire.</span></div>
        <div class="flow-step"><strong>Cohérence</strong><span>Facture, contrat, banque, pays, devise, montant.</span></div>
        <div class="flow-step"><strong>Alerte</strong><span>Tiers non expliqué ou juridiction sensible.</span></div>
      </div>
    `,
    records: `
      <div class="flow">
        <div class="flow-step"><strong>Remonter</strong><span>Anomalie avant poursuite ou accès supplémentaire.</span></div>
        <div class="flow-step"><strong>Analyser</strong><span>Faits, pièces, note d'escalade ou registre.</span></div>
        <div class="flow-step"><strong>Décider</strong><span>Poursuite, renforcement, suspension, refus, fin.</span></div>
        <div class="flow-step"><strong>Conserver</strong><span>KYC, screening, décisions, formation, revues.</span></div>
      </div>
    `
  };
  els.moduleVisual.innerHTML = visuals[type] || visuals.flow;
}

function renderModuleDeepDive(moduleId) {
  const lesson = moduleDeepDives[moduleId];
  if (!lesson) {
    els.moduleDeepDive.innerHTML = "";
    return;
  }

  els.moduleDeepDive.innerHTML = `
    <div class="course-grid">
      <section class="course-card course-card-wide">
        <strong>Objectif opérationnel</strong>
        <p>${escapeHtml(lesson.objective)}</p>
      </section>
      ${renderCourseCard("Réflexes clés", lesson.reflexes)}
      ${renderCourseCard("Pièges fréquents", lesson.pitfalls)}
      ${renderCourseCard("Preuves à conserver", lesson.evidence)}
      <section class="course-card course-card-wide">
        <strong>Mini-cas pratique</strong>
        <p>${escapeHtml(lesson.scenario)}</p>
      </section>
    </div>
  `;
}

function renderCourseCard(title, items) {
  return `
    <section class="course-card">
      <strong>${escapeHtml(title)}</strong>
      <ul>
        ${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </section>
  `;
}

function renderQuestion() {
  const question = getCurrentQuestion();
  const answerRecord = state.answers[state.quizIndex];
  els.questionCount.textContent = `Question ${Math.min(state.quizIndex + 1, state.quizOrder.length)} / ${state.quizOrder.length}`;

  if (!question) {
    els.questionText.textContent = "Aucune question disponible pour ce parcours.";
    els.answers.innerHTML = "";
    els.explanation.classList.remove("is-visible");
    els.nextQuestionBtn.disabled = true;
    els.difficultyTag.textContent = "";
    return;
  }

  els.difficultyTag.textContent = question.difficulty;
  els.questionText.textContent = question.prompt;
  const choiceOrder = getChoiceOrder(question);
  els.answers.innerHTML = choiceOrder.map((originalIndex, displayIndex) => {
    const choice = question.choices[originalIndex];
    let cls = "";
    if (answerRecord) {
      if (originalIndex === question.answer) cls = " is-correct";
      if (originalIndex === answerRecord.answer && originalIndex !== question.answer) cls = " is-wrong";
    }
    const lesson = answerRecord ? buildChoiceLesson(question, choice, originalIndex) : "";
    return `
      <button class="answer${cls}" type="button" data-answer="${originalIndex}">
        <span class="answer-letter">${String.fromCharCode(65 + displayIndex)}</span>
        <span class="answer-copy">
          <span>${escapeHtml(choice)}</span>
          ${lesson ? `<span class="answer-lesson">${escapeHtml(lesson)}</span>` : ""}
        </span>
      </button>
    `;
  }).join("");

  if (answerRecord) {
    els.explanation.innerHTML = buildCourseCorrection(question, answerRecord);
    els.explanation.classList.add("is-visible");
    els.nextQuestionBtn.disabled = false;
    els.nextQuestionBtn.textContent = state.quizIndex === state.quizOrder.length - 1 ? "Terminer le QCM" : "Question suivante";
  } else {
    els.explanation.innerHTML = "";
    els.explanation.classList.remove("is-visible");
    els.nextQuestionBtn.disabled = true;
    els.nextQuestionBtn.textContent = "Question suivante";
  }
}

function buildCourseCorrection(question, answerRecord) {
  const notes = moduleCourseNotes[question.module] || moduleCourseNotes.model;
  const selectedLetter = getDisplayLetter(question, answerRecord.answer);
  const correctLetter = getDisplayLetter(question, question.answer);
  const answerIsCorrect = isAnswerCorrect(answerRecord);
  const status = answerIsCorrect ? "Réponse correcte" : "Réponse à corriger";
  const statusClass = answerIsCorrect ? "is-ok" : "is-ko";

  return `
    <div class="course-correction">
      <div class="course-status ${statusClass}">
        <strong>${status}</strong>
        <span>Votre réponse : ${selectedLetter} · Réponse attendue : ${correctLetter}</span>
      </div>
      <div class="course-block">
        <strong>Pourquoi la bonne réponse est la bonne</strong>
        <p>${escapeHtml(question.explanation)}</p>
      </div>
      <div class="course-block">
        <strong>Règle à retenir</strong>
        <p>${escapeHtml(notes.rule)}</p>
      </div>
      <div class="course-block">
        <strong>Réflexe opérationnel</strong>
        <p>${escapeHtml(notes.correct)}</p>
      </div>
    </div>
  `;
}

function buildChoiceLesson(question, choice, index) {
  if (index === question.answer) {
    return `Bonne réponse : ${correctChoiceReason(question)}`;
  }
  return `Mauvaise réponse : ${wrongChoiceReason(choice, question)}`;
}

function correctChoiceReason(question) {
  const notes = moduleCourseNotes[question.module] || moduleCourseNotes.model;
  return notes.correct;
}

function wrongChoiceReason(choice, question) {
  const text = normalizeForLesson(choice);
  const notes = moduleCourseNotes[question.module] || moduleCourseNotes.model;

  if (text.includes("montant est faible")) return "le montant ne transforme jamais une règle interdite en pratique acceptable ; une anomalie reste une anomalie même sur un petit montant.";
  if (text.includes("prospect est regule") || text.includes("client est regule")) return "un statut régulé peut réduire le risque, mais il ne dispense pas de respecter le périmètre, le screening et la validation préalable.";
  if (text.includes("tous les investissements")) return "Ai For Alpha ne reconstitue pas l'ensemble des investissements des clients : la vigilance porte sur la relation, les contreparties, le screening et les honoraires encaissés.";
  if (text.includes("simple clause contractuelle")) return "une clause contractuelle peut soutenir le dossier, mais elle ne remplace ni l'identification, ni le screening, ni la décision documentée.";
  if (text.includes("declaration orale") || text.includes("oral")) return "une déclaration orale ne remplace pas une preuve conservée ; le dispositif doit être vérifiable en contrôle.";
  if (text.includes("reconstituer toute la chaine") || text.includes("chaque actionnaire")) return "cette approche est disproportionnée pour un grand institutionnel transparent sans alerte ; la procédure demande une conclusion raisonnable documentée.";
  if (text.includes("ne rien documenter") || text.includes("aucun screening") || text.includes("aucune preuve")) return "l'absence de trace est un manquement en soi : la conformité doit pouvoir démontrer ce qui a été contrôlé et décidé.";
  if (text.includes("classer automatiquement")) return "la procédure repose sur une analyse des facteurs de risque ; un automatisme non justifié ne remplace pas la classification documentée.";
  if (text.includes("ignorer") || text.includes("hors perimetre")) return "un sujet peut rester dans le périmètre LCB-FT même si Ai For Alpha ne gère pas les portefeuilles ; la contrepartie et la relation doivent être comprises.";
  if (text.includes("contrat est en discussion")) return "une discussion contractuelle ne vaut pas validation LCB-FT ; l'accès opérationnel attend le dossier minimum validé.";
  if (text.includes("ouvrir") && (text.includes("temporaire") || text.includes("regulier") || text.includes("avant"))) return "ouvrir d'abord et régulariser ensuite inverse le contrôle ; l'accès vient après validation du dossier minimum.";
  if (text.includes("carte de visite")) return "une carte de visite ne qualifie pas la relation, ne prouve pas le pouvoir de signature et ne remplace pas le circuit onboarding/conformité.";
  if (text.includes("premier paiement")) return "le paiement ne valide pas le dossier LCB-FT ; il peut lui-même créer une alerte si le payeur est incohérent.";
  if (text.includes("apporteur confirme") || text.includes("deleguer") || text.includes("decision a l'apporteur")) return "un apporteur peut contribuer à la relation commerciale, mais Ai For Alpha reste responsable de ses obligations et de sa décision.";
  if (text.includes("aucun point specifique") && text.includes("institutionnel")) return "le caractère institutionnel ne dispense pas de qualifier le service, le canal, les pays, l'apporteur et le payeur attendu.";
  if (text.includes("completer le reste apres signature")) return "compléter après signature revient à ouvrir la relation avant d'avoir qualifié les risques essentiels : service, canal, pays, apporteur, payeur et cross-border.";
  if (text.includes("canal de diffusion") && text.includes("l'apporteur prend en charge")) return "l'apporteur ne prend pas en charge les obligations LCB-FT d'Ai For Alpha ; son rôle doit lui-même être qualifié.";
  if (text.includes("statut institutionnel") && text.includes("cross-border")) return "un statut institutionnel aide l'analyse, mais il ne neutralise pas à lui seul une relation à distance et transfrontalière.";
  if (text.includes("uniquement le montant") || text.includes("uniquement le nom") || text.includes("uniquement le ceo") || text.includes("uniquement le payeur")) return "cette option réduit trop le périmètre du contrôle ; la procédure exige plusieurs dimensions et plusieurs noms selon le risque.";
  if (text.includes("signataire principal seulement") || text.includes("entite cliente et le ceo") || text.includes("payeur de la premiere facture")) return "le screening doit couvrir les noms porteurs du risque, pas seulement un contact, le payeur ou une personne interne à Ai For Alpha.";
  if (text.includes("site web uniquement") || text.includes("signataire uniquement")) return "un site web ou un signataire ne suffit pas à identifier une personne morale ; il faut documenter l'entité elle-même et la qualité des représentants.";
  if (text.includes("domaine personnel est connu")) return "un domaine email personnel connu ne prouve pas la fonction, l'habilitation ni la cohérence avec l'entité cliente.";
  if (text.includes("remplacer le signataire par l'apporteur")) return "l'apporteur ne remplace pas un représentant habilité du client ; la qualité de signature doit rester cohérente et documentée.";
  if (text.includes("mot de passe") || text.includes("preferences personnelles")) return "cette information est inutile, intrusive ou hors finalité LCB-FT ; les données collectées doivent être pertinentes et proportionnées.";
  if (text.includes("acces temporaire") || text.includes("envoyer") || text.includes("email personnel")) return "transmettre des contenus ou accès hors circuit validé contourne le verrou d'onboarding et crée une faille de traçabilité.";
  if (text.includes("corriger apres") || text.includes("prochain trimestre") || text.includes("revue annuelle")) return "la revue périodique ne sert pas à réparer un onboarding incomplet ; les points bloquants doivent être traités avant l'accès ou la poursuite.";
  if (text.includes("facture payee")) return "un paiement ne prouve pas à lui seul l'identité ni la cohérence LCB-FT du client ; il peut même être un signal d'alerte si le payeur est incohérent.";
  if (text.includes("vigilance faible")) return "une structure opaque qui refuse les documents ne peut pas rester en vigilance faible ; le doute doit être escaladé.";
  if (text.includes("tous les beneficiaires du regime") || text.includes("patrimoine de chaque adherent")) return "pour un fonds de pension ou organisme public, demander chaque bénéficiaire ou adhérent serait disproportionné ; il faut documenter l'entité, le régime et la supervision.";
  if (text.includes("statut public") && text.includes("sans identifier les signataires")) return "le statut public ou assimilé ne dispense pas d'identifier les signataires et la supervision ou tutelle.";
  if (text.includes("prix, duree") || text.includes("nom, prenom") || text.includes("montant facture")) return "cette liste mélange des informations utiles avec des éléments qui ne couvrent pas les six dimensions de risque prévues par la cartographie.";
  if (text.includes("pays standard") || text.includes("institution publique") || text.includes("renouvellement sans changement")) return "ce cas ne cumule pas les signaux critiques ; le risque élevé vient surtout de l'opacité, de la géographie sensible, du tiers payeur et de la pression.";
  if (text.includes("envoyee au client")) return "la classification est un outil interne de vigilance, pas une information à communiquer au client.";
  if (text.includes("remplace tous les screenings")) return "la classification oriente les diligences, mais elle ne remplace pas le screening sanctions/gel/PEP.";
  if (text.includes("fixer le prix")) return "le prix n'est pas l'objectif de la classification LCB-FT ; elle sert à décider les diligences et validations.";
  if (text.includes("toujours faible") || text.includes("toujours eleve") || text.includes("faible sans autre analyse") || text.includes("eleve par defaut")) return "la qualification doit rester proportionnée : un client institutionnel peut réduire le risque, mais le cross-border et la distance doivent être documentés avant conclusion.";
  if (text.includes("supprimer") || text.includes("changer l'orthographe")) return "effacer ou altérer un signal détruit la preuve ; il faut analyser, documenter et escalader si le doute persiste.";
  if (text.includes("capture") && text.includes("sans conclusion")) return "une capture peut être utile, mais sans conclusion et sans périmètre elle ne démontre pas que le contrôle a été correctement analysé.";
  if (text.includes("plus tard") && text.includes("sans date")) return "une trace reconstituée sans date de contrôle ni noms contrôlés ne permet pas de prouver ce qui a été vérifié au moment utile.";
  if (text.includes("continuer sans conclusion")) return "un résultat ne doit pas rester sans conclusion : il faut décider, documenter et conserver la raison de levée ou d'escalade.";
  if (text.includes("bloquer la facturation")) return "le risque porte sur l'entrée en relation et l'accès opérationnel, pas seulement sur la facturation ; un match non levé impose suspension et escalade.";
  if (text.includes("demander au prospect") || text.includes("demander au client s'il")) return "interroger directement le client sur une alerte sensible peut être inadapté et risquer de révéler l'analyse ; il faut passer par conformité/direction.";
  if (text.includes("informer le client")) return "informer le client d'une analyse de soupçon ou d'une déclaration éventuelle viole la confidentialité attendue.";
  if (text.includes("continuer la relation normalement")) return "l'absence de déclaration formelle à ce stade ne permet pas d'ignorer l'alerte ; il faut gérer le risque pendant l'analyse.";
  if (text.includes("apres encaissement")) return "la justification du payeur doit être analysée avant acceptation ; encaisser d'abord crée un risque de régularisation a posteriori.";
  if (text.includes("sans justification") && text.includes("groupe")) return "une entité du même groupe peut être cohérente, mais le lien et la raison du paiement doivent être justifiés et conservés.";
  if (text.includes("accepter") && (text.includes("tiers") || text.includes("n'importe quel") || text.includes("especes") || text.includes("crypto") || text.includes("montant correspond"))) return "l'encaissement ne doit pas primer sur la cohérence du payeur ; espèces, crypto ordinaires et tiers inexpliqués sont interdits ou à escalader.";
  if (text.includes("modifier le contrat") || text.includes("ajuste") || text.includes("autre compte")) return "adapter les documents pour faire disparaître l'anomalie n'est pas une analyse LCB-FT ; il faut comprendre et justifier le flux réel.";
  if (text.includes("apporteur reverse") || text.includes("seul acompte") || text.includes("collecte par l'apporteur")) return "le problème n'est pas seulement le montant ou la rapidité de reversement : un apporteur ne doit pas collecter les fonds du prospect.";
  if (text.includes("apporteur comme payeur")) return "nommer l'apporteur payeur au contrat ne justifie pas le flux ; cela masque l'anomalie au lieu de l'analyser.";
  if (text.includes("partenaire de recevoir")) return "faire recevoir les fonds par un partenaire déplace l'anomalie sans la résoudre ; le flux d'honoraires doit rester cohérent avec le client contractant.";
  if (text.includes("source des fonds investis")) return "Ai For Alpha ne reçoit ni ne gère ces fonds ; le contrôle pertinent porte sur le client, la relation et le paiement des honoraires.";
  if (text.includes("aucun paiement")) return "même sans custody, Ai For Alpha doit contrôler la cohérence des honoraires qu'elle encaisse.";
  if (text.includes("uniquement la direction") || text.includes("uniquement le client") || text.includes("uniquement l'expert") || text.includes("uniquement les equipes commerciales") || text.includes("uniquement la conformite") || text.includes("uniquement le signataire") || text.includes("equipes commerciales client-facing") || text.includes("conformite seulement") || text.includes("signataire du contrat")) return "la remontée des anomalies est l'affaire de toute personne exposée à un signal, pas seulement d'une fonction unique.";
  if (text.includes("uniquement poursuivre")) return "la direction doit pouvoir choisir une réponse proportionnée : poursuite, mesures renforcées, suspension, refus ou fin de relation.";
  if (text.includes("declaration automatique")) return "une déclaration TRACFIN suppose une analyse documentée ; toute alerte ne devient pas mécaniquement une déclaration.";
  if (text.includes("organigramme") && text.includes("sans trace")) return "l'organigramme ne prouve pas la désignation réglementaire ni sa communication ; il faut conserver les preuves de désignation et de continuité.";
  if (text.includes("accuse ermes uniquement")) return "l'accusé ERMES peut être une preuve utile, mais il ne remplace pas la décision de désignation ni la trace de continuité/remplacement.";
  if (text.includes("prospects refuses")) return "les preuves de désignation TRACFIN doivent rester identifiables dans un registre ou une note séparée, pas noyées dans un registre commercial.";
  if (text.includes("sans preuve des participants") || text.includes("sans noms") || text.includes("liste de diffusion")) return "la formation doit être prouvable : contenu, personnes formées, date, attestation ou score QCM doivent permettre un contrôle.";
  if (text.includes("tous les 24 mois")) return "24 mois correspond à une périodicité plus rapprochée utilisée pour un niveau de risque supérieur ; pour le faible risque, la limite maximale est 36 mois hors déclencheur.";
  if (text.includes("sans echeance maximale")) return "une alerte sanctions/PEP déclenche une revue immédiate, mais elle ne supprime pas l'obligation d'avoir une échéance maximale de revue.";
  if (text.includes("renouvellement contractuel seulement")) return "le renouvellement est bien un déclencheur, mais il n'est pas le seul : un changement significatif ou le seuil maximal de 36 mois imposent aussi une revue.";
  if (text.includes("tous les 36 mois")) return "36 mois correspond au plafond faible risque ; une relation en risque élevé demande une revue annuelle minimum et une validation direction.";
  if (text.includes("prochaine revue contractuelle") || text.includes("validation initiale seulement")) return "un risque élevé impose une revue annuelle minimum et une validation direction ; la cohérence des paiements ou l'absence de nouvelle facture ne suffit pas.";
  if (text.includes("tous les trois ans") || text.includes("revue annuelle seulement") || text.includes("incident uniquement")) return "la procédure doit être revue au moins annuellement et immédiatement si une évolution significative intervient.";
  if (text.includes("tous les mois") || text.includes("tous les 10 ans") || text.includes("jamais") || text.includes("cinq ans")) return "la fréquence doit suivre le niveau de risque et les déclencheurs prévus par la procédure.";
  if (text.includes("invitation calendrier") || text.includes("email generique")) return "ces éléments peuvent aider, mais ils ne prouvent pas seuls le contenu, la présence, le score ou l'appropriation.";

  return notes.fallback;
}

function normalizeForLesson(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function submitAnswer(answer) {
  const question = getCurrentQuestion();
  const correct = answer === question.answer;
  const answeredAt = new Date();
  const selectedDisplayIndex = getDisplayIndex(question, answer);
  const correctDisplayIndex = getDisplayIndex(question, question.answer);
  state.answers[state.quizIndex] = {
    attemptId: state.currentAttemptId,
    questionId: question.id,
    module: question.module,
    difficulty: question.difficulty,
    prompt: question.prompt,
    answer,
    displayAnswer: selectedDisplayIndex,
    answerLetter: getDisplayLetter(question, answer),
    answerLabel: question.choices[answer],
    correctAnswer: question.answer,
    correctDisplayAnswer: correctDisplayIndex,
    correctLetter: getDisplayLetter(question, question.answer),
    correctLabel: question.choices[question.answer],
    correct,
    answeredAt: answeredAt.toISOString(),
    questionStartedAt: state.questionStartedAt,
    timeToAnswerMs: getQuestionElapsedMs(answeredAt)
  };
  saveState("answer_submitted");
  renderQuestion();
  renderMetrics();
}

function getQuestionElapsedMs(answeredAt = new Date()) {
  const started = Date.parse(state.questionStartedAt || "");
  if (!Number.isFinite(started)) return 0;
  return Math.min(Math.max(0, answeredAt.getTime() - started), MAX_QUESTION_TIME_MS);
}

function hasAnsweredCurrent() {
  return Boolean(state.answers[state.quizIndex]);
}

function markModuleRead(moduleId) {
  if (!state.readModules.includes(moduleId)) state.readModules.push(moduleId);
  saveState("module_read");
  renderAll();
}

function resetQuiz() {
  state.currentAttemptId = createSessionId();
  state.attemptStartedAt = new Date().toISOString();
  state.questionStartedAt = state.attemptStartedAt;
  state.quizOrder = buildQuizOrder();
  state.choiceOrders = {};
  ensureChoiceOrders();
  state.quizIndex = 0;
  state.answers = [];
  state.completedAt = null;
  saveState("quiz_reset");
  renderAll();
}

function renderMetrics() {
  const pass = getPassStatus();
  const modulePct = Math.round((state.readModules.length / modules.length) * 100);
  const scorePct = pass.answered ? pass.score : safeNumber(state.stats?.bestScore);
  const overallPct = Math.round((modulePct + scorePct) / 2);

  els.progressLabel.textContent = `${state.readModules.length} / ${modules.length} modules`;
  els.scoreLabel.textContent = `Score QCM : ${scorePct}%`;
  els.progressFill.style.width = `${Math.min(100, overallPct)}%`;
  els.metricModules.textContent = state.readModules.length;
  els.metricAnswered.textContent = pass.answered;
  els.metricCorrect.textContent = pass.correct;
  els.metricTime.textContent = formatDuration(state.timing?.totalMs || 0);
  els.metricStatus.textContent = pass.trainingPassed ? "Validé" : pass.qcmPassed ? "QCM validé" : "À faire";

  if (pass.trainingPassed) {
    const date = new Date(state.completedAt || Date.now()).toLocaleDateString("fr-FR");
    const role = roles.find(item => item.id === state.role)?.label || state.role;
    els.certificateText.textContent = `${currentUser.name} (${currentUser.email}) a validé la sensibilisation LCB-FT Ai For Alpha (${role}) le ${date}, avec ${pass.score}% de bonnes réponses, ${pass.correct}/${pass.answered} réponses correctes, ${state.readModules.length}/${modules.length} modules lus et ${formatDuration(state.timing?.totalMs || 0)} de temps actif.`;
    els.certificate.classList.add("is-visible");
  } else {
    els.certificate.classList.remove("is-visible");
  }
}

function getPassStatus() {
  const answered = state.answers.filter(Boolean);
  const correct = answered.filter(isAnswerCorrect).length;
  const score = answered.length ? Math.round((correct / answered.length) * 100) : 0;
  const quizComplete = answered.length === state.quizOrder.length && state.quizOrder.length > 0;
  const qcmPassed = quizComplete && score >= 80;
  const modulesComplete = state.readModules.length === modules.length;
  const trainingPassed = modulesComplete && qcmPassed;
  return {
    passed: qcmPassed,
    trainingPassed,
    qcmPassed,
    modulesComplete,
    quizComplete,
    score,
    answered: answered.length,
    correct
  };
}

function isAnswerCorrect(answerRecord) {
  if (!answerRecord) return false;
  const question = questionBank.find(item => item.id === answerRecord.questionId);
  if (question && Number.isInteger(answerRecord.answer)) return answerRecord.answer === question.answer;
  if (Number.isInteger(answerRecord.answer) && Number.isInteger(answerRecord.correctAnswer)) {
    return answerRecord.answer === answerRecord.correctAnswer;
  }
  return Boolean(answerRecord.correct);
}

function getCompletionMessage() {
  const pass = getPassStatus();
  if (pass.trainingPassed) return "Formation validée : QCM réussi et modules lus.";
  if (pass.qcmPassed) return "QCM réussi. Marquez tous les modules comme lus pour valider la formation.";
  return `QCM terminé : ${pass.score}%. Recommencez pour atteindre 80%.`;
}

function scheduleSync(reason) {
  window.clearTimeout(syncTimer);
  syncTimer = window.setTimeout(() => syncProgress(reason), 350);
}

async function syncProgress(reason) {
  if (!currentUser) return;
  const payload = buildProofPayload(reason);
  try {
    await apiPost("/api/progress", payload);
    if (currentUser.isAdmin) refreshAdmin();
  } catch {
    // The prototype still works offline; the exported proof remains available.
  }
}

function buildProofPayload(reason) {
  const pass = getPassStatus();
  return {
    reason,
    learner: {
      email: currentUser.email,
      name: currentUser.name,
      role: state.role,
      roleLabel: roles.find(item => item.id === state.role)?.label || state.role,
      sessionId: currentUser.sessionId
    },
    source: {
      document: "24_Procedure_LCBFT_Ai_For_Alpha_2026.docx",
      validationDate: "2026-07-06",
      sharePointSite: "Ai For Alpha Documents / Compliance & Legal"
    },
    storage: {
      schemaVersion: APP_STORAGE_VERSION,
      appBuild: APP_BUILD,
      stateKey: stateKey(),
      recordKey: recordKey(),
      longSaveMode: true
    },
    result: {
      passed: pass.passed,
      trainingPassed: pass.trainingPassed,
      qcmPassed: pass.qcmPassed,
      modulesComplete: pass.modulesComplete,
      score: pass.score,
      correct: pass.correct,
      answered: pass.answered,
      totalQuestions: state.quizOrder.length,
      modulesRead: state.readModules.length,
      totalModules: modules.length,
      completedAt: state.completedAt,
      timeSpentMs: safeNumber(state.timing?.totalMs),
      timeSpentLabel: formatDuration(state.timing?.totalMs || 0),
      moduleTimeMs: state.timing?.moduleMs || {},
      attemptTimeMs: getAttemptTimeMs()
    },
    longRecord: {
      firstSeenAt: longRecord?.firstSeenAt || null,
      lastLoginAt: longRecord?.lastLoginAt || null,
      loginCount: longRecord?.loginCount || 0,
      totalTimeMs: longRecord?.totalTimeMs || 0,
      totalTimeLabel: formatDuration(longRecord?.totalTimeMs || 0),
      moduleTimeMs: longRecord?.moduleTimeMs || {},
      attempts: longRecord?.attempts || [],
      latestSnapshot: longRecord?.latestSnapshot || null
    },
    readModules: state.readModules,
    answers: state.answers.filter(Boolean),
    savedAt: new Date().toISOString()
  };
}

async function refreshAdmin() {
  if (!currentUser?.isAdmin) {
    els.adminPanel.classList.add("is-hidden");
    return;
  }
  els.adminPanel.classList.remove("is-hidden");
  try {
    const params = new URLSearchParams({ email: currentUser.email, sessionId: currentUser.sessionId });
    const data = await apiGet(`/api/admin/records?${params.toString()}`);
    renderAdminRows(data.users || []);
  } catch {
    renderAdminRows(buildLocalAdminFallback());
  }
}

function renderAdminRows(users) {
  if (!users.length) {
    els.adminRows.innerHTML = `<tr><td colspan="8">Aucune donnée de suivi disponible.</td></tr>`;
    return;
  }

  els.adminRows.innerHTML = users.map(user => {
    const latest = user.latestProgress?.result || {};
    const score = Number.isFinite(latest.score) ? `${latest.score}%` : "-";
    const correct = Number.isFinite(latest.correct) && Number.isFinite(latest.answered) ? `${latest.correct}/${latest.answered}` : "-";
    const timeSpent = formatDuration(latest.timeSpentMs || user.totalTimeMs || user.longRecord?.totalTimeMs || 0);
    const modulesText = `${latest.modulesRead || 0}/${latest.totalModules || modules.length}`;
    const status = latest.passed ? "Validé" : "En cours";
    const lastLogin = user.lastLoginAt ? formatDateTime(user.lastLoginAt) : "-";
    return `
      <tr>
        <td><strong>${escapeHtml(user.name)}</strong><br>${escapeHtml(user.email)}</td>
        <td>${escapeHtml(lastLogin)}</td>
        <td>${user.loginCount || 0}</td>
        <td>${score}</td>
        <td>${correct}</td>
        <td>${timeSpent}</td>
        <td>${modulesText}</td>
        <td><span class="status-chip${latest.passed ? " is-ok" : ""}">${status}</span></td>
      </tr>
    `;
  }).join("");
}

function buildLocalAdminFallback() {
  const pass = getPassStatus();
  return [{
    email: currentUser.email,
    name: currentUser.name,
    loginCount: 1,
    lastLoginAt: new Date().toISOString(),
    latestProgress: {
      result: {
        passed: pass.passed,
        score: pass.score,
        correct: pass.correct,
        answered: pass.answered,
        modulesRead: state.readModules.length,
        totalModules: modules.length,
        timeSpentMs: state.timing?.totalMs || 0
      }
    },
    totalTimeMs: longRecord?.totalTimeMs || state.timing?.totalMs || 0
  }];
}

function exportCertificatePdf() {
  saveState("certificate_pdf", { remote: false });
  const pass = getPassStatus();
  if (!pass.trainingPassed) {
    showToast("Attestation PDF disponible après validation complète.");
    return;
  }

  const certificate = buildCertificateData(pass);
  const blob = createCertificatePdfBlob(certificate);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const safeName = currentUser.email.split("@")[0].replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  link.href = url;
  link.download = `attestation-lcbft-${safeName}-${new Date().toISOString().slice(0, 10)}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast("Attestation PDF téléchargée.");
}

function buildCertificateData(pass = getPassStatus()) {
  const role = roles.find(item => item.id === state.role)?.label || state.role;
  const completedAt = state.completedAt || new Date().toISOString();
  const generatedAt = new Date().toISOString();
  return {
    learnerName: currentUser.name,
    learnerEmail: currentUser.email,
    role,
    score: pass.score,
    correct: pass.correct,
    answered: pass.answered,
    totalQuestions: state.quizOrder.length,
    modulesRead: state.readModules.length,
    totalModules: modules.length,
    timeSpent: formatDuration(state.timing?.totalMs || 0),
    completedAt,
    completedDate: formatDateTime(completedAt),
    generatedAt,
    generatedDate: formatDateTime(generatedAt),
    sourceDocument: "Procédure LCB-FT Ai For Alpha 2026",
    sourceDate: "06/07/2026",
    referenceId: buildCertificateReference(completedAt),
    modules: modules.map(module => module.title)
  };
}

function buildCertificateReference(completedAt) {
  const datePart = String(completedAt || new Date().toISOString()).slice(0, 10).replace(/-/g, "");
  const userPart = currentUser.email.split("@")[0].replace(/[^a-z0-9]+/gi, "").slice(0, 12).toUpperCase();
  const attemptPart = String(state.currentAttemptId || "").replace(/[^a-z0-9]/gi, "").slice(0, 8).toUpperCase();
  return `AIFA-LCBFT-${datePart}-${userPart}${attemptPart ? `-${attemptPart}` : ""}`;
}

function createCertificatePdfBlob(certificate) {
  const width = 842;
  const height = 595;
  const content = buildCertificatePdfContent(certificate, width, height);
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R >> >> /Contents 7 0 R >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>",
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
    `<< /Title (${pdfEscapeText("Attestation LCB-FT Ai For Alpha")}) /Author (${pdfEscapeText("Ai For Alpha")}) /Creator (${pdfEscapeText("Ai For Alpha Training Hub")}) >>`
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let index = 1; index <= objects.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info 8 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}

function buildCertificatePdfContent(certificate, width, height) {
  const lines = [];
  const add = command => lines.push(command);
  const fill = color => `${pdfRgb(color)} rg`;
  const stroke = color => `${pdfRgb(color)} RG`;
  const rect = (x, y, w, h, color) => add(`${fill(color)} ${x} ${y} ${w} ${h} re f`);
  const strokeRect = (x, y, w, h, color, lineWidth = 1) => add(`${stroke(color)} ${lineWidth} w ${x} ${y} ${w} ${h} re S`);
  const text = (value, x, y, size, font = "F1", color = "#0D2B42") => {
    add(`BT ${fill(color)} /${font} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${pdfEscapeText(value)}) Tj ET`);
  };
  const wrappedText = (value, x, y, size, maxChars, lineHeight, font = "F1", color = "#0D2B42") => {
    const wrapped = wrapPdfText(value, maxChars);
    wrapped.forEach((line, index) => text(line, x, y - index * lineHeight, size, font, color));
    return y - wrapped.length * lineHeight;
  };

  rect(0, 0, width, height, "#F3F6F8");
  rect(0, 500, width, 95, "#0D2B42");
  rect(42, 526, 54, 42, "#FFFFFF");
  text("AI", 56, 539, 22, "F2", "#0D2B42");
  text("For Alpha", 108, 545, 24, "F2", "#FFFFFF");
  text("LCB-FT Training Hub", 108, 525, 12, "F2", "#EBB75B");
  text(`Référence : ${certificate.referenceId}`, 520, 548, 9, "F1", "#FFFFFF");
  text(`Générée le ${certificate.generatedDate}`, 520, 532, 9, "F1", "#FFFFFF");

  rect(50, 60, 742, 410, "#FFFFFF");
  strokeRect(50, 60, 742, 410, "#D9E2EA", 1);
  rect(50, 462, 742, 8, "#E09003");

  text("ATTESTATION DE SENSIBILISATION LCB-FT", 184, 432, 22, "F2", "#0D2B42");
  text("Ai For Alpha atteste que", 338, 405, 11, "F3", "#494949");
  text(certificate.learnerName, 262, 374, 28, "F2", "#0D2B42");
  text(certificate.learnerEmail, 301, 352, 12, "F1", "#1B5776");

  wrappedText(
    `a validé la formation de sensibilisation LCB-FT Ai For Alpha, parcours ${certificate.role}, conformément à la procédure interne ${certificate.sourceDocument}.`,
    95,
    318,
    12,
    86,
    16,
    "F1",
    "#0D2B42"
  );

  const cards = [
    ["Score QCM", `${certificate.score}%`],
    ["Réponses correctes", `${certificate.correct}/${certificate.answered}`],
    ["Modules lus", `${certificate.modulesRead}/${certificate.totalModules}`],
    ["Temps actif", certificate.timeSpent]
  ];
  cards.forEach((card, index) => {
    const x = 80 + index * 178;
    rect(x, 205, 150, 70, "#F7FAFC");
    strokeRect(x, 205, 150, 70, "#D9E2EA", 0.8);
    text(card[0], x + 14, 252, 10, "F2", "#1B5776");
    text(card[1], x + 14, 225, 22, "F2", "#0D2B42");
  });

  text("Validation", 80, 174, 12, "F2", "#0D2B42");
  text(`Date de validation : ${certificate.completedDate}`, 80, 153, 10, "F1", "#494949");
  text(`Seuil requis : 80% - QCM validé et 7 modules lus`, 80, 137, 10, "F1", "#494949");
  text(`Source : ${certificate.sourceDocument}, validée le ${certificate.sourceDate}`, 80, 121, 10, "F1", "#494949");

  text("Modules couverts", 520, 174, 12, "F2", "#0D2B42");
  certificate.modules.forEach((moduleTitle, index) => {
    const y = 153 - index * 15;
    text(`- ${moduleTitle}`, 520, y, 8.5, "F1", "#494949");
  });

  rect(80, 38, 682, 18, "#0D2B42");
  text("Document interne Ai For Alpha - preuve de formation LCB-FT générée automatiquement", 190, 44, 9, "F2", "#FFFFFF");

  return lines.join("\n");
}

function wrapPdfText(value, maxChars) {
  const words = String(value).split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function pdfRgb(hex) {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16) / 255;
  const g = parseInt(normalized.slice(2, 4), 16) / 255;
  const b = parseInt(normalized.slice(4, 6), 16) / 255;
  return `${pdfNumber(r)} ${pdfNumber(g)} ${pdfNumber(b)}`;
}

function pdfNumber(value) {
  return Number(value).toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
}

function pdfEscapeText(value) {
  const normalized = String(value)
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/\u00A0/g, " ")
    .replace(/\u2022/g, "-")
    .replace(/œ/g, "oe")
    .replace(/Œ/g, "OE");

  let escaped = "";
  for (const char of normalized) {
    const code = char.charCodeAt(0);
    if (char === "(" || char === ")" || char === "\\") {
      escaped += `\\${char}`;
    } else if (code < 32 || code > 126) {
      const byte = code <= 255 ? code : 63;
      escaped += `\\${byte.toString(8).padStart(3, "0")}`;
    } else {
      escaped += char;
    }
  }
  return escaped;
}

async function apiPost(path, payload) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function apiGet(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

function createSessionId() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatDateTime(value) {
  return new Date(value).toLocaleString("fr-FR", {
    dateStyle: "short",
    timeStyle: "short"
  });
}

function formatDuration(value) {
  const totalSeconds = Math.max(0, Math.round(safeNumber(value) / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours} h ${String(minutes).padStart(2, "0")} min`;
  if (minutes > 0) return `${minutes} min ${String(seconds).padStart(2, "0")} s`;
  return `${seconds} s`;
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("is-visible"), 2600);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

init();
