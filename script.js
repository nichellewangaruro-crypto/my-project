const form = document.getElementById("screening-form");
const resultsSection = document.getElementById("results");
const genderSelect = document.getElementById("gender");
const customGenderGroup = document.getElementById("custom-gender-group");
const customGenderInput = document.getElementById("custom-gender");
const startOverBtn = document.getElementById("start-over");

const symptomsInput = document.getElementById("symptoms");
const symptomsCount = document.getElementById("symptoms-count");
const symptomsError = document.getElementById("symptoms-error");

const MIN_KEYWORD_MATCHES = 1;
const MAX_SYMPTOMS = 11;
const MAX_RESOURCE_DISTANCE_KM = 35;

// Approximate road distances (km) between county centres for nearby pairs.
const COUNTY_DISTANCES = {
  "Kiambu|Nairobi": 22,
  "Kajiado|Nairobi": 32,
  "Kiambu|Murang'a": 28,
  "Kirinyaga|Nyeri": 24,
  "Embu|Meru": 30,
  "Meru|Tharaka-Nithi": 22,
  "Kilifi|Mombasa": 58,
  "Kwale|Mombasa": 28,
  "Kisumu|Siaya": 28,
  "Bungoma|Kakamega": 30,
  "Busia|Bungoma": 35,
  "Kakamega|Vihiga": 22,
  "Laikipia|Nyeri": 35,
  "Baringo|Nakuru": 40,
  "Narok|Nakuru": 70,
  "Machakos|Makueni": 35,
  "Kitui|Machakos": 45,
  "Elgeyo-Marakwet|Uasin Gishu": 30,
  "Nandi|Uasin Gishu": 25,
  "Trans Nzoia|Uasin Gishu": 28,
  "Bomet|Kericho": 30,
  "Homa Bay|Migori": 32,
  "Kisii|Migori": 28,
  "Kisii|Nyamira": 22,
  "Garissa|Wajir": 120,
  "Isiolo|Meru": 55,
  "Marsabit|Samburu": 90
};

const conditions = [
  {
    id: "adhd",
    name: "ADHD (Attention-Deficit/Hyperactivity Disorder) — possible",
    keywords: [
      "attention", "hyperactive", "hyperactivity", "impulsive", "impulsivity",
      "fidget", "fidgeting", "distracted", "distraction", "focus", "restless",
      "cannot sit still", "inattentive", "daydream", "forgetful", "adhd"
    ],
    explanation:
      "ADHD is a neurodevelopmental condition affecting attention, impulse control, and activity levels. A child may struggle to finish tasks, act before thinking, or seem constantly on the move.",
    advice: [
      "Create a fixed daily routine for meals, homework, play, and bedtime so your child knows what to expect.",
      "Break homework and chores into short steps (e.g. 10–15 minutes) with short breaks between.",
      "Reduce distractions during study time — turn off the TV, keep the study area tidy, and use a timer.",
      "Praise effort and small wins, not only perfect results. This builds confidence.",
      "Share your concerns with your child's teacher and ask about seating near the front or extra time on tests.",
      "Ensure your child gets enough sleep and regular physical activity to help manage energy levels.",
      "Book a formal assessment with a paediatrician or child psychiatrist — early support makes a real difference."
    ]
  },
  {
    id: "asd",
    name: "Autism Spectrum Disorder (ASD) — possible",
    keywords: [
      "autism", "autistic", "asd", "social", "eye contact", "repetitive", "routine",
      "sensory", "stimming", "nonverbal", "communication", "friends", "restricted interests",
      "meltdown", "overwhelmed", "does not play", "doesnt play", "alone"
    ],
    explanation:
      "Autism Spectrum Disorder affects social communication, interaction, and how a child responds to sensory input. Signs may include difficulty reading social cues, strong need for routine, repetitive behaviours, or limited interest in peer play.",
    advice: [
      "Use short, clear sentences and give one instruction at a time.",
      "Create a visual daily schedule with pictures so your child can see what happens next.",
      "Prepare your child before changes in routine — even small changes can be stressful.",
      "Notice sensory triggers (loud noise, bright lights, certain textures) and reduce them when possible.",
      "Allow quiet time when your child is overwhelmed; do not force eye contact or hugging.",
      "Encourage strengths and special interests — they can be a bridge to learning and connection.",
      "Seek early intervention: speech therapy, occupational therapy, and parent training programmes help most when started early.",
      "Contact an autism specialist or developmental paediatrician for a full diagnostic assessment."
    ]
  },
  {
    id: "dyslexia",
    name: "Dyslexia (Specific Learning Disorder — Reading) — possible",
    keywords: [
      "dyslexia", "reading", "letters", "spelling", "decode", "phonics",
      "slow reader", "reads slowly", "word", "books", "literacy", "confuses letters"
    ],
    explanation:
      "Dyslexia is a specific learning disorder that mainly affects reading and spelling. A child may read slowly, confuse similar letters (like b and d), or avoid reading even when they are bright in other areas.",
    advice: [
      "Read aloud to your child daily and let them follow along with your finger under the words.",
      "Use audiobooks alongside printed text so your child can hear and see words at the same time.",
      "Choose books with larger print, short chapters, and plenty of pictures to reduce frustration.",
      "Never shame your child for reading struggles — dyslexia is not laziness or low intelligence.",
      "Ask the school for extra time on reading tasks and oral exams where possible.",
      "Use multisensory methods: tracing letters in sand, clapping syllables, or using coloured overlays.",
      "Request a psycho-educational assessment to confirm dyslexia and get a formal learning plan.",
      "Connect with a literacy tutor or learning support teacher trained in structured literacy programmes."
    ]
  },
  {
    id: "dysgraphia",
    name: "Dysgraphia (Specific Learning Disorder — Writing) — possible",
    keywords: [
      "dysgraphia", "writing", "handwriting", "pencil", "copying", "written work",
      "messy writing", "slow writing", "grip", "forms letters poorly"
    ],
    explanation:
      "Dysgraphia is a specific learning disorder that affects writing. A child may have messy or slow handwriting, difficulty forming letters, pain when writing, or trouble organising thoughts on paper.",
    advice: [
      "Allow your child to type assignments when handwriting is not the learning goal.",
      "Use wide-lined paper and pencil grips to make writing more comfortable.",
      "Break writing tasks into planning (talking ideas aloud), drafting, and editing — do not expect all at once.",
      "Practise fine motor skills through play: drawing, clay, threading beads, or cutting with scissors.",
      "Ask teachers to accept oral answers or recorded responses when handwriting is a barrier.",
      "Give extra time for written exams and consider a scribe for important tests.",
      "Seek occupational therapy for hand strength, pencil control, and posture.",
      "Arrange a psycho-educational assessment to document needs for school accommodations."
    ]
  },
  {
    id: "dyscalculia",
    name: "Dyscalculia (Specific Learning Disorder — Mathematics) — possible",
    keywords: [
      "dyscalculia", "math", "maths", "numbers", "counting", "calculations",
      "arithmetic", "times tables", "mathematics", "cannot add", "struggles with numbers"
    ],
    explanation:
      "Dyscalculia is a specific learning disorder that affects understanding of numbers and maths. A child may struggle with counting, telling time, remembering times tables, or understanding place value despite trying hard.",
    advice: [
      "Use real objects (beans, blocks, coins) to teach counting and basic operations before using worksheets.",
      "Teach one maths concept at a time and revisit it often — repetition helps build number sense.",
      "Use number lines, hundred charts, and calculators as supports, not cheats.",
      "Connect maths to daily life: cooking measurements, shopping change, and telling time on a clock.",
      "Avoid timed maths drills that cause anxiety; focus on understanding over speed.",
      "Ask the school for extra time on maths tests and permission to use a calculator when appropriate.",
      "Request a psycho-educational assessment to identify specific maths difficulties.",
      "Work with a tutor who uses hands-on, step-by-step maths instruction rather than rote memorisation."
    ]
  },
  {
    id: "intellectual",
    name: "Intellectual Disability — possible",
    keywords: [
      "intellectual", "cognitive", "developmental delay", "learning slowly",
      "milestones", "delayed development", "adaptive", "life skills",
      "understanding concepts", "reasoning", "intellectual disability"
    ],
    explanation:
      "Intellectual disability involves limitations in intellectual functioning and everyday adaptive skills (self-care, communication, social skills). Difficulties appear across many areas, not just one school subject.",
    advice: [
      "Focus on practical life skills: dressing, bathing, preparing simple meals, and following safety rules.",
      "Use simple language, demonstrations, and repetition — show your child what to do, then let them try.",
      "Celebrate every small step forward; progress may be slow but is still meaningful.",
      "Create a safe, predictable home environment with clear rules and visual reminders.",
      "Enrol your child in special education or an inclusive school with individual learning support.",
      "Connect with other parents through disability support groups — shared experience reduces isolation.",
      "Apply for a disability assessment through your county hospital or NHIF-accredited facility.",
      "Explore community-based rehabilitation (CBR) programmes that teach daily living and social skills."
    ]
  },
  {
    id: "motor",
    name: "Motor Disorder (Developmental Coordination Disorder) — possible",
    keywords: [
      "motor", "coordination", "clumsy", "balance", "gross motor", "fine motor",
      "catching", "running", "tying shoes", "dyspraxia", "trips", "falls",
      "awkward", "physical", "movement"
    ],
    explanation:
      "Motor disorders (including developmental coordination disorder) affect a child's ability to control body movements. A child may be clumsy, struggle with sports, have poor balance, or find fine tasks like buttoning clothes difficult.",
    advice: [
      "Encourage physical play your child enjoys — swimming, dancing, or playground time — without pressure to compete.",
      "Break motor tasks into tiny steps: first hold the ball, then roll it, then throw it gently.",
      "Allow extra time for dressing, eating, and school tasks that need hand coordination.",
      "Ask teachers for alternatives to handwriting-heavy tasks when motor skills are the barrier.",
      "Use occupational therapy to build core strength, hand-eye coordination, and balance.",
      "Provide adaptive tools: velcro shoes, thick pencils, and non-slip mats at home.",
      "Protect your child's self-esteem — avoid comparing them to siblings or classmates physically.",
      "Request a developmental assessment to distinguish motor difficulties from other conditions."
    ]
  }
];

const REGION_MAP = {
  "Nairobi": "Nairobi", "Kiambu": "Nairobi", "Kajiado": "Nairobi", "Machakos": "Nairobi",
  "Murang'a": "Nairobi", "Nyandarua": "Nairobi", "Nyeri": "Nairobi", "Kirinyaga": "Nairobi",
  "Mombasa": "Mombasa", "Kwale": "Mombasa", "Kilifi": "Mombasa", "Lamu": "Mombasa",
  "Tana River": "Mombasa", "Taita-Taveta": "Mombasa",
  "Kisumu": "Kisumu", "Siaya": "Kisumu", "Homa Bay": "Kisumu", "Migori": "Kisumu",
  "Kisii": "Kisumu", "Nyamira": "Kisumu",
  "Kakamega": "Kakamega", "Vihiga": "Kakamega", "Bungoma": "Kakamega", "Busia": "Kakamega",
  "Nakuru": "Nakuru", "Narok": "Nakuru", "Baringo": "Nakuru", "Laikipia": "Nakuru",
  "Uasin Gishu": "Uasin Gishu", "Trans Nzoia": "Uasin Gishu", "Elgeyo-Marakwet": "Uasin Gishu",
  "Nandi": "Uasin Gishu", "Bomet": "Uasin Gishu", "Kericho": "Uasin Gishu",
  "Meru": "Meru", "Tharaka-Nithi": "Meru", "Embu": "Meru",
  "Kitui": "Meru", "Makueni": "Meru",
  "Garissa": "Garissa", "Wajir": "Garissa", "Mandera": "Garissa",
  "Turkana": "Turkana", "West Pokot": "Turkana", "Samburu": "Turkana",
  "Marsabit": "Turkana", "Isiolo": "Turkana"
};

const resourcesByHub = {
  Nairobi: {
    adhd: [
      { name: "Kenyatta National Hospital — Child & Adolescent Mental Health Clinic", type: "hospital", locationCounty: "Nairobi", program: "ADHD assessment, medication review, and behavioural therapy referrals", cost: "KES 500–1,500 consultation (NHIF); therapy KES 1,500/session at KNH" },
      { name: "Gertrude's Children's Hospital — Developmental Paediatrics", type: "hospital", locationCounty: "Nairobi", program: "ADHD diagnostic evaluation and parent coaching", cost: "KES 4,500–7,000 initial consultation; NHIF accepted" },
      { name: "Autism Society of Kenya — Parent Skills Training (ADHD module)", type: "program", locationCounty: "Nairobi", program: "Group parent training on routines, behaviour strategies, and school advocacy for ADHD", cost: "KES 2,000 per 6-week cycle; subsidies available" }
    ],
    asd: [
      { name: "Autism Society of Kenya — Early Intervention Centre, Ngong Road", type: "program", locationCounty: "Nairobi", program: "ASD screening, ABA-informed therapy, speech and OT for young children", cost: "KES 1,500–3,000/session; bursaries for low-income families" },
      { name: "Kenyatta National Hospital — Developmental Paediatrics Unit", type: "hospital", locationCounty: "Nairobi", program: "ASD diagnostic assessment (ADOS-informed) and multidisciplinary referral", cost: "KES 500–1,500 (NHIF subsidised)" },
      { name: "Aga Khan University Hospital — Child Development Centre", type: "hospital", locationCounty: "Nairobi", program: "ASD diagnosis, speech therapy, occupational therapy, and family counselling", cost: "KES 6,000–12,000 assessment; therapy KES 3,500/session" }
    ],
    dyslexia: [
      { name: "Dyslexia Organisation of Kenya — Literacy Support Clinic", type: "clinic", locationCounty: "Nairobi", program: "Structured literacy assessment and one-to-one reading intervention for dyslexia", cost: "KES 3,000 assessment; KES 2,500/session tutoring" },
      { name: "Kenya Institute of Special Education (KISE) — Assessment Centre", type: "program", locationCounty: "Nairobi", program: "Psycho-educational testing and dyslexia-specific learning plans for schools", cost: "KES 1,500–3,000 (government subsidised)" },
      { name: "Gertrude's Children's Hospital — Learning Support Unit", type: "hospital", locationCounty: "Nairobi", program: "Dyslexia screening and referral to specialist literacy tutors", cost: "KES 4,500 consultation; tutoring arranged separately" }
    ],
    dysgraphia: [
      { name: "KISE — Occupational Therapy & Learning Assessment", type: "program", locationCounty: "Nairobi", program: "Handwriting assessment, pencil-grip training, and school accommodation reports for dysgraphia", cost: "KES 1,500–2,500 per session" },
      { name: "Gertrude's Children's Hospital — OT Department", type: "hospital", locationCounty: "Nairobi", program: "Fine motor and handwriting therapy for dysgraphia", cost: "KES 3,500/session; NHIF partial cover" },
      { name: "Dyslexia Organisation of Kenya — Writing Support", type: "clinic", locationCounty: "Nairobi", program: "Assistive technology training (typing tools) and writing strategy coaching", cost: "KES 2,500/session" }
    ],
    dyscalculia: [
      { name: "KISE — Special Education Assessment Centre", type: "program", locationCounty: "Nairobi", program: "Maths learning disability testing and individualised numeracy support plans", cost: "KES 1,500–3,000 assessment" },
      { name: "Gertrude's Children's Hospital — Educational Psychology", type: "hospital", locationCounty: "Nairobi", program: "Dyscalculia screening and referral to specialist maths tutors", cost: "KES 4,500–6,000 assessment" },
      { name: "Nairobi Primary School Special Unit Network (via KISE)", type: "program", locationCounty: "Nairobi", program: "Hands-on numeracy intervention in partner public schools", cost: "Free in participating schools; transport not covered" }
    ],
    intellectual: [
      { name: "KISE — Intellectual Disability Assessment & Placement", type: "program", locationCounty: "Nairobi", program: "Cognitive testing, adaptive skills assessment, and special school placement guidance", cost: "KES 1,500–3,000 (subsidised)" },
      { name: "Kenyatta National Hospital — Paediatric Neurology", type: "hospital", locationCounty: "Nairobi", program: "Medical workup for developmental delay and intellectual disability", cost: "KES 500–1,500 (NHIF)" },
      { name: "Sense International Kenya — CBR Programme", type: "program", locationCounty: "Nairobi", program: "Community-based life skills training for children with intellectual disabilities", cost: "Free; family must cover transport to centre" }
    ],
    motor: [
      { name: "Gertrude's Children's Hospital — Paediatric Physiotherapy & OT", type: "hospital", locationCounty: "Nairobi", program: "Motor coordination assessment and therapy for developmental coordination disorder", cost: "KES 3,500/session; NHIF partial cover" },
      { name: "KISE — Occupational Therapy Unit", type: "program", locationCounty: "Nairobi", program: "Gross and fine motor skills training for school-aged children", cost: "KES 1,500–2,500/session" },
      { name: "Aga Khan University Hospital — Paediatric Rehabilitation", type: "hospital", locationCounty: "Nairobi", program: "Physiotherapy and motor skills programme for coordination difficulties", cost: "KES 4,000–5,500/session" }
    ]
  },
  Mombasa: {
    adhd: [
      { name: "Coast General Teaching & Referral Hospital — Paediatric Psychiatry Clinic", type: "hospital", locationCounty: "Mombasa", program: "ADHD assessment and medication management for Coast region families", cost: "KES 300–800 consultation (NHIF)" },
      { name: "Aga Khan Hospital Mombasa — Child Development Clinic", type: "hospital", locationCounty: "Mombasa", program: "ADHD behavioural assessment and parent management training", cost: "KES 4,000–6,500 consultation" }
    ],
    asd: [
      { name: "Coast General Hospital — Developmental Paediatrics Outreach", type: "hospital", locationCounty: "Mombasa", program: "ASD screening and referral to Nairobi/Kilifi therapy centres", cost: "KES 300–800 (NHIF)" },
      { name: "Kilifi County — Neurodevelopmental Disorders Programme (KEMRI-Wellcome)", type: "program", locationCounty: "Kilifi", program: "ASD research-linked assessment and community follow-up for Coast families", cost: "Free assessment for eligible children; transport from Kwale/Kilifi subsidised" }
    ],
    dyslexia: [
      { name: "Coast Education Centre — Special Needs Unit, Mombasa", type: "clinic", locationCounty: "Mombasa", program: "Dyslexia literacy screening and structured reading support", cost: "KES 1,500–2,500/session" },
      { name: "Aga Khan Hospital Mombasa — Educational Assessment", type: "hospital", locationCounty: "Mombasa", program: "Reading disability testing and school report for accommodations", cost: "KES 5,000–7,000" }
    ],
    dysgraphia: [
      { name: "Coast General Hospital — Occupational Therapy", type: "hospital", locationCounty: "Mombasa", program: "Handwriting and fine motor therapy for dysgraphia", cost: "KES 500–1,200/session (NHIF)" },
      { name: "Coast Education Centre — Writing Support", type: "clinic", locationCounty: "Mombasa", program: "Typing skills and writing accommodation training", cost: "KES 1,500/session" }
    ],
    dyscalculia: [
      { name: "Coast Education Centre — Numeracy Support", type: "clinic", locationCounty: "Mombasa", program: "Hands-on maths intervention for dyscalculia", cost: "KES 1,500–2,000/session" },
      { name: "Aga Khan Hospital Mombasa — Learning Difficulties Clinic", type: "hospital", locationCounty: "Mombasa", program: "Maths disability assessment and tutor referral", cost: "KES 5,000 assessment" }
    ],
    intellectual: [
      { name: "Coast General Hospital — Paediatric Development Clinic", type: "hospital", locationCounty: "Mombasa", program: "Intellectual disability assessment and special school referral", cost: "KES 300–800 (NHIF)" },
      { name: "Mombasa County — Special Needs Education Programme", type: "program", locationCounty: "Mombasa", program: "Life skills and inclusive education support", cost: "Free in public special units" }
    ],
    motor: [
      { name: "Coast General Hospital — Paediatric Physiotherapy", type: "hospital", locationCounty: "Mombasa", program: "Motor coordination and balance therapy", cost: "KES 500–1,200/session (NHIF)" },
      { name: "Aga Khan Hospital Mombasa — Rehabilitation Services", type: "hospital", locationCounty: "Mombasa", program: "OT and physiotherapy for motor disorders", cost: "KES 3,500–4,500/session" }
    ]
  },
  Kisumu: {
    adhd: [
      { name: "Jaramogi Oginga Odinga Teaching & Referral Hospital — Child Mental Health", type: "hospital", locationCounty: "Kisumu", program: "ADHD screening and behavioural therapy referral for Nyanza region", cost: "KES 300–700 (NHIF)" },
      { name: "Kisumu Neurodevelopmental Disorders Programme (KEMRI-Wellcome)", type: "program", locationCounty: "Kisumu", program: "ADHD assessment and parent support groups", cost: "Free for enrolled families in Kisumu, Siaya, Homa Bay" }
    ],
    asd: [
      { name: "KEMRI-Wellcome — Neurodevelopmental Clinic, Kisumu", type: "clinic", locationCounty: "Kisumu", program: "ASD diagnostic assessment and community therapy follow-up", cost: "Free assessment; therapy KES 500–1,000/session subsidised" },
      { name: "JOOTRH — Developmental Paediatrics Unit", type: "hospital", locationCounty: "Kisumu", program: "ASD referral, speech therapy access for Western Kenya", cost: "KES 300–700 (NHIF)" }
    ],
    dyslexia: [
      { name: "Kisumu Special School — Literacy Intervention Unit", type: "program", locationCounty: "Kisumu", program: "Structured reading support for dyslexia in partner schools", cost: "KES 500–1,000/session in public programme" },
      { name: "JOOTRH — Educational Psychology Referral", type: "hospital", locationCounty: "Kisumu", program: "Reading disability assessment and school accommodation letter", cost: "KES 300–700 (NHIF)" }
    ],
    dysgraphia: [
      { name: "JOOTRH — Occupational Therapy Department", type: "hospital", locationCounty: "Kisumu", program: "Handwriting and fine motor therapy for dysgraphia", cost: "KES 300–800/session (NHIF)" },
      { name: "Kisumu Special School — OT & Writing Support", type: "program", locationCounty: "Kisumu", program: "Pencil control training and assistive writing tools", cost: "KES 500–1,000/session" }
    ],
    dyscalculia: [
      { name: "Kisumu Special School — Numeracy Programme", type: "program", locationCounty: "Kisumu", program: "Concrete maths instruction for dyscalculia", cost: "KES 500–1,000/session" },
      { name: "JOOTRH — Learning Difficulties Referral", type: "hospital", locationCounty: "Kisumu", program: "Maths disability screening and tutor linkage", cost: "KES 300–700 (NHIF)" }
    ],
    intellectual: [
      { name: "JOOTRH — Paediatric Neurology & Development", type: "hospital", locationCounty: "Kisumu", program: "Intellectual disability medical assessment and CBR referral", cost: "KES 300–700 (NHIF)" },
      { name: "Kisumu Special School — Life Skills Programme", type: "program", locationCounty: "Kisumu", program: "Daily living skills and vocational preparation", cost: "Free in public special school; small levy for materials" }
    ],
    motor: [
      { name: "JOOTRH — Paediatric Physiotherapy", type: "hospital", locationCounty: "Kisumu", program: "Motor coordination assessment and therapy", cost: "KES 300–800/session (NHIF)" },
      { name: "Kisumu Special School — Motor Skills Group", type: "program", locationCounty: "Kisumu", program: "Balance, coordination, and sports-adapted activities", cost: "KES 500/session" }
    ]
  },
  Nakuru: {
    adhd: [
      { name: "Nakuru Level 5 Hospital — Child & Adolescent Mental Health", type: "hospital", locationCounty: "Nakuru", program: "ADHD assessment and NHIF-covered follow-up for Rift Valley families", cost: "KES 300–800 consultation (NHIF)" },
      { name: "Egerton University Medical Centre — Paediatric Clinic", type: "clinic", locationCounty: "Nakuru", program: "ADHD behavioural screening and parent counselling", cost: "KES 1,500–2,500 consultation" }
    ],
    asd: [
      { name: "Nakuru Level 5 Hospital — Developmental Assessment Clinic", type: "hospital", locationCounty: "Nakuru", program: "ASD screening and referral to Nairobi Autism Society programmes", cost: "KES 300–800 (NHIF)" },
      { name: "Autism Society of Kenya — Nakuru Parent Support Group", type: "program", locationCounty: "Nakuru", program: "Monthly ASD parent training and school advocacy in Nakuru town", cost: "KES 500/month; free for first visit" }
    ],
    dyslexia: [
      { name: "Nakuru County — Special Needs Education Office", type: "program", locationCounty: "Nakuru", program: "Dyslexia screening in public schools and literacy tutor referral", cost: "Free in participating schools" },
      { name: "Egerton University — Educational Assessment Clinic", type: "clinic", locationCounty: "Nakuru", program: "Reading disability testing and learning plan", cost: "KES 2,000–3,500" }
    ],
    dysgraphia: [
      { name: "Nakuru Level 5 Hospital — OT Unit", type: "hospital", locationCounty: "Nakuru", program: "Handwriting therapy and fine motor training", cost: "KES 300–800/session (NHIF)" },
      { name: "Egerton University Medical Centre — OT Referral", type: "clinic", locationCounty: "Nakuru", program: "Dysgraphia assessment and assistive technology advice", cost: "KES 1,500–2,500" }
    ],
    dyscalculia: [
      { name: "Nakuru County — Numeracy Support in Special Units", type: "program", locationCounty: "Nakuru", program: "Hands-on maths intervention for children with dyscalculia", cost: "Free in public special units" },
      { name: "Egerton University — Learning Support Clinic", type: "clinic", locationCounty: "Nakuru", program: "Maths disability assessment", cost: "KES 2,000–3,000" }
    ],
    intellectual: [
      { name: "Nakuru Level 5 Hospital — Paediatric Development Clinic", type: "hospital", locationCounty: "Nakuru", program: "Intellectual disability assessment and special school placement", cost: "KES 300–800 (NHIF)" },
      { name: "Nakuru Special School — CBR Outreach", type: "program", locationCounty: "Nakuru", program: "Life skills training for children with intellectual disabilities in Nakuru & Narok", cost: "Free; transport not covered" }
    ],
    motor: [
      { name: "Nakuru Level 5 Hospital — Physiotherapy Department", type: "hospital", locationCounty: "Nakuru", program: "Motor coordination therapy for school-aged children", cost: "KES 300–800/session (NHIF)" },
      { name: "Egerton University Medical Centre — Rehabilitation", type: "clinic", locationCounty: "Nakuru", program: "OT and motor skills programme", cost: "KES 1,500–2,500/session" }
    ]
  },
  "Uasin Gishu": {
    adhd: [
      { name: "Moi Teaching and Referral Hospital (MTRH) — Child Psychiatry", type: "hospital", locationCounty: "Uasin Gishu", program: "ADHD diagnosis and medication management for North Rift families", cost: "KES 500–1,200 (NHIF)" },
      { name: "Eldoret County Referral Hospital — Paediatric Mental Health", type: "hospital", locationCounty: "Uasin Gishu", program: "ADHD behavioural support and teacher liaison", cost: "KES 300–700 (NHIF)" }
    ],
    asd: [
      { name: "MTRH — Developmental Paediatrics Unit", type: "hospital", locationCounty: "Uasin Gishu", program: "ASD assessment and multidisciplinary therapy referral", cost: "KES 500–1,200 (NHIF)" },
      { name: "Eldoret Autism Parent Network (via MTRH)", type: "program", locationCounty: "Uasin Gishu", program: "ASD parent training and school inclusion support in Uasin Gishu & Nandi", cost: "KES 500/month" }
    ],
    dyslexia: [
      { name: "MTRH — Educational Psychology Referral", type: "hospital", locationCounty: "Uasin Gishu", program: "Dyslexia screening and school accommodation reports", cost: "KES 500–1,200 (NHIF)" },
      { name: "Eldoret Special School — Literacy Programme", type: "program", locationCounty: "Uasin Gishu", program: "Structured reading intervention for dyslexia", cost: "KES 500–1,000/session" }
    ],
    dysgraphia: [
      { name: "MTRH — Occupational Therapy", type: "hospital", locationCounty: "Uasin Gishu", program: "Handwriting and fine motor therapy", cost: "KES 500–1,000/session (NHIF)" },
      { name: "Eldoret Special School — Writing Support Unit", type: "program", locationCounty: "Uasin Gishu", program: "Typing and writing strategy coaching", cost: "KES 500–1,000/session" }
    ],
    dyscalculia: [
      { name: "Eldoret Special School — Numeracy Unit", type: "program", locationCounty: "Uasin Gishu", program: "Concrete maths instruction for dyscalculia", cost: "KES 500–1,000/session" },
      { name: "MTRH — Learning Difficulties Clinic", type: "hospital", locationCounty: "Uasin Gishu", program: "Maths disability assessment", cost: "KES 500–1,200 (NHIF)" }
    ],
    intellectual: [
      { name: "MTRH — Paediatric Neurology", type: "hospital", locationCounty: "Uasin Gishu", program: "Intellectual disability workup and CBR referral", cost: "KES 500–1,200 (NHIF)" },
      { name: "Eldoret Special School — Life Skills & Vocational", type: "program", locationCounty: "Uasin Gishu", program: "Adaptive skills training for intellectual disability", cost: "Free in public special school" }
    ],
    motor: [
      { name: "MTRH — Paediatric Physiotherapy & OT", type: "hospital", locationCounty: "Uasin Gishu", program: "Motor coordination assessment and therapy", cost: "KES 500–1,000/session (NHIF)" },
      { name: "Eldoret County Referral Hospital — Rehabilitation", type: "hospital", locationCounty: "Uasin Gishu", program: "Motor skills group therapy", cost: "KES 300–700/session (NHIF)" }
    ]
  },
  Meru: {
    adhd: [
      { name: "Meru Teaching and Referral Hospital — Child Mental Health", type: "hospital", locationCounty: "Meru", program: "ADHD assessment for Eastern region families", cost: "KES 300–800 (NHIF)" },
      { name: "Meru County — School Health Programme (ADHD screening)", type: "program", locationCounty: "Meru", program: "Teacher-referred ADHD screening in Meru, Embu, Tharaka-Nithi schools", cost: "Free in participating schools" }
    ],
    asd: [
      { name: "Meru Teaching and Referral Hospital — Developmental Clinic", type: "hospital", locationCounty: "Meru", program: "ASD screening and referral to Nairobi intervention centres", cost: "KES 300–800 (NHIF)" },
      { name: "Meru Special School — Autism Support Unit", type: "program", locationCounty: "Meru", program: "ASD-inclusive classroom support and parent workshops", cost: "Free in public special unit" }
    ],
    dyslexia: [
      { name: "Meru County — Special Needs Education Office", type: "program", locationCounty: "Meru", program: "Dyslexia literacy support in Meru, Kitui, Makueni schools", cost: "Free in participating schools" },
      { name: "Meru Teaching and Referral Hospital — Educational Referral", type: "hospital", locationCounty: "Meru", program: "Reading disability assessment", cost: "KES 300–800 (NHIF)" }
    ],
    dysgraphia: [
      { name: "Meru Teaching and Referral Hospital — OT Department", type: "hospital", locationCounty: "Meru", program: "Handwriting therapy for dysgraphia", cost: "KES 300–800/session (NHIF)" },
      { name: "Meru Special School — Fine Motor Programme", type: "program", locationCounty: "Meru", program: "Writing skills and assistive tools training", cost: "KES 300–500/session" }
    ],
    dyscalculia: [
      { name: "Meru Special School — Numeracy Support", type: "program", locationCounty: "Meru", program: "Hands-on maths for dyscalculia in Eastern Kenya schools", cost: "Free in special units" },
      { name: "Meru Teaching and Referral Hospital — Learning Assessment", type: "hospital", locationCounty: "Meru", program: "Maths disability screening", cost: "KES 300–800 (NHIF)" }
    ],
    intellectual: [
      { name: "Meru Teaching and Referral Hospital — Developmental Paediatrics", type: "hospital", locationCounty: "Meru", program: "Intellectual disability assessment and special school placement", cost: "KES 300–800 (NHIF)" },
      { name: "Meru Special School — CBR Programme", type: "program", locationCounty: "Meru", program: "Life skills for children with intellectual disabilities in Meru & Embu", cost: "Free; family covers transport" }
    ],
    motor: [
      { name: "Meru Teaching and Referral Hospital — Physiotherapy", type: "hospital", locationCounty: "Meru", program: "Motor coordination therapy", cost: "KES 300–800/session (NHIF)" },
      { name: "Meru Special School — Motor Skills Group", type: "program", locationCounty: "Meru", program: "Balance and coordination activities", cost: "KES 300–500/session" }
    ]
  },
  Kakamega: {
    adhd: [
      { name: "Kakamega County General Teaching & Referral Hospital — Child Mental Health", type: "hospital", locationCounty: "Kakamega", program: "ADHD screening for Western Kenya families", cost: "KES 300–700 (NHIF)" },
      { name: "Masinde Muliro University — Community Paediatric Clinic", type: "clinic", locationCounty: "Kakamega", program: "ADHD behavioural assessment and parent counselling", cost: "KES 1,000–2,000 consultation" }
    ],
    asd: [
      { name: "Kakamega Referral Hospital — Developmental Assessment", type: "hospital", locationCounty: "Kakamega", program: "ASD screening and Kisumu/Nairobi referral pathway", cost: "KES 300–700 (NHIF)" },
      { name: "Kakamega Special School — Autism Inclusion Unit", type: "program", locationCounty: "Kakamega", program: "ASD classroom support in Bungoma, Vihiga, Busia counties", cost: "Free in public special unit" }
    ],
    dyslexia: [
      { name: "Kakamega County — Special Needs Literacy Programme", type: "program", locationCounty: "Kakamega", program: "Dyslexia reading support in Western Kenya schools", cost: "Free in participating schools" },
      { name: "Masinde Muliro University — Educational Assessment", type: "clinic", locationCounty: "Kakamega", program: "Reading disability testing", cost: "KES 1,500–2,500" }
    ],
    dysgraphia: [
      { name: "Kakamega Referral Hospital — OT Unit", type: "hospital", locationCounty: "Kakamega", program: "Handwriting and fine motor therapy", cost: "KES 300–700/session (NHIF)" },
      { name: "Kakamega Special School — Writing Support", type: "program", locationCounty: "Kakamega", program: "Typing and pencil-grip training", cost: "KES 300–500/session" }
    ],
    dyscalculia: [
      { name: "Kakamega Special School — Numeracy Unit", type: "program", locationCounty: "Kakamega", program: "Concrete maths for dyscalculia", cost: "Free in special units" },
      { name: "Masinde Muliro University — Learning Support Clinic", type: "clinic", locationCounty: "Kakamega", program: "Maths disability assessment", cost: "KES 1,500–2,000" }
    ],
    intellectual: [
      { name: "Kakamega Referral Hospital — Paediatric Development", type: "hospital", locationCounty: "Kakamega", program: "Intellectual disability assessment", cost: "KES 300–700 (NHIF)" },
      { name: "Kakamega Special School — Life Skills Programme", type: "program", locationCounty: "Kakamega", program: "Adaptive skills for intellectual disability in Western region", cost: "Free in public school" }
    ],
    motor: [
      { name: "Kakamega Referral Hospital — Physiotherapy", type: "hospital", locationCounty: "Kakamega", program: "Motor coordination therapy", cost: "KES 300–700/session (NHIF)" },
      { name: "Kakamega Special School — Motor Skills Programme", type: "program", locationCounty: "Kakamega", program: "Balance and coordination training", cost: "KES 300–500/session" }
    ]
  },
  Garissa: {
    adhd: [
      { name: "Garissa County Referral Hospital — Paediatric Clinic", type: "hospital", locationCounty: "Garissa", program: "ADHD screening and NHIF-covered follow-up for North Eastern families", cost: "KES 200–500 (NHIF)" },
      { name: "IRC Garissa — Child Protection & Health Outreach", type: "program", locationCounty: "Garissa", program: "ADHD awareness and referral for Wajir, Mandera, Garissa", cost: "Free for enrolled families" }
    ],
    asd: [
      { name: "Garissa County Referral Hospital — Developmental Screening", type: "hospital", locationCounty: "Garissa", program: "ASD screening and Nairobi tele-referral", cost: "KES 200–500 (NHIF)" },
      { name: "Save the Children — Inclusive Education Garissa", type: "program", locationCounty: "Garissa", program: "ASD-inclusive classroom support in partner schools", cost: "Free in partner schools" }
    ],
    dyslexia: [
      { name: "Garissa County — Special Needs Education Office", type: "program", locationCounty: "Garissa", program: "Dyslexia literacy support in North Eastern schools", cost: "Free in participating schools" },
      { name: "Garissa Referral Hospital — Educational Assessment", type: "hospital", locationCounty: "Garissa", program: "Reading disability screening", cost: "KES 200–500 (NHIF)" }
    ],
    dysgraphia: [
      { name: "Garissa Referral Hospital — OT (visiting specialist)", type: "hospital", locationCounty: "Garissa", program: "Monthly handwriting and fine motor clinic for dysgraphia", cost: "KES 200–500/session (NHIF)" },
      { name: "Garissa Special Unit — Writing Support", type: "program", locationCounty: "Garissa", program: "Assistive writing tools and typing introduction", cost: "Free in public special unit" }
    ],
    dyscalculia: [
      { name: "Garissa Special Unit — Numeracy Programme", type: "program", locationCounty: "Garissa", program: "Hands-on maths for dyscalculia", cost: "Free in special unit" },
      { name: "Garissa Referral Hospital — Learning Assessment", type: "hospital", locationCounty: "Garissa", program: "Maths disability screening", cost: "KES 200–500 (NHIF)" }
    ],
    intellectual: [
      { name: "Garissa Referral Hospital — Developmental Paediatrics", type: "hospital", locationCounty: "Garissa", program: "Intellectual disability assessment for North Eastern region", cost: "KES 200–500 (NHIF)" },
      { name: "IRC — Community Rehabilitation Garissa", type: "program", locationCounty: "Garissa", program: "Life skills for children with intellectual disabilities", cost: "Free for enrolled families" }
    ],
    motor: [
      { name: "Garissa Referral Hospital — Physiotherapy", type: "hospital", locationCounty: "Garissa", program: "Motor coordination therapy", cost: "KES 200–500/session (NHIF)" },
      { name: "Garissa Special Unit — Motor Skills Group", type: "program", locationCounty: "Garissa", program: "Balance and coordination activities", cost: "Free in special unit" }
    ]
  },
  Turkana: {
    adhd: [
      { name: "Lodwar County Referral Hospital — Paediatric Clinic", type: "hospital", locationCounty: "Turkana", program: "ADHD screening for Turkana, West Pokot, Samburu families", cost: "KES 200–400 (NHIF)" },
      { name: "UNICEF Turkana — School Health & Mental Health Outreach", type: "program", locationCounty: "Turkana", program: "ADHD teacher training and child referral in Turkana schools", cost: "Free in partner schools" }
    ],
    asd: [
      { name: "Lodwar Referral Hospital — Developmental Screening", type: "hospital", locationCounty: "Turkana", program: "ASD screening and Nairobi tele-referral", cost: "KES 200–400 (NHIF)" },
      { name: "ACAKORIO — Disability Inclusion Programme, Lodwar", type: "program", locationCounty: "Turkana", program: "ASD parent support and inclusive education in Turkana", cost: "Free; transport support available" }
    ],
    dyslexia: [
      { name: "Lodwar Special Unit — Literacy Programme", type: "program", locationCounty: "Turkana", program: "Structured reading support for dyslexia", cost: "Free in public special unit" },
      { name: "Lodwar Referral Hospital — Educational Referral", type: "hospital", locationCounty: "Turkana", program: "Reading disability screening", cost: "KES 200–400 (NHIF)" }
    ],
    dysgraphia: [
      { name: "Lodwar Referral Hospital — OT Outreach (monthly)", type: "hospital", locationCounty: "Turkana", program: "Handwriting and fine motor clinic", cost: "KES 200–400/session (NHIF)" },
      { name: "Lodwar Special Unit — Writing Support", type: "program", locationCounty: "Turkana", program: "Assistive writing tools training", cost: "Free in special unit" }
    ],
    dyscalculia: [
      { name: "Lodwar Special Unit — Numeracy Programme", type: "program", locationCounty: "Turkana", program: "Concrete maths instruction for dyscalculia", cost: "Free in special unit" },
      { name: "Lodwar Referral Hospital — Learning Assessment", type: "hospital", locationCounty: "Turkana", program: "Maths disability screening", cost: "KES 200–400 (NHIF)" }
    ],
    intellectual: [
      { name: "Lodwar Referral Hospital — Developmental Paediatrics", type: "hospital", locationCounty: "Turkana", program: "Intellectual disability assessment for Northern Kenya", cost: "KES 200–400 (NHIF)" },
      { name: "ACAKORIO — CBR Programme, Lodwar", type: "program", locationCounty: "Turkana", program: "Life skills for children with intellectual disabilities", cost: "Free; includes home visits in Lodwar town" }
    ],
    motor: [
      { name: "Lodwar Referral Hospital — Physiotherapy", type: "hospital", locationCounty: "Turkana", program: "Motor coordination therapy", cost: "KES 200–400/session (NHIF)" },
      { name: "Lodwar Special Unit — Motor Skills Group", type: "program", locationCounty: "Turkana", program: "Balance and coordination activities", cost: "Free in special unit" }
    ]
  }
};

function showSymptomsError(message) {
  symptomsError.textContent = message;
  symptomsError.classList.remove("hidden");
  symptomsInput.setAttribute("aria-invalid", "true");
}

function clearSymptomsError() {
  symptomsError.textContent = "";
  symptomsError.classList.add("hidden");
  symptomsInput.removeAttribute("aria-invalid");
}

function getSelectedSymptoms() {
  return Array.from(symptomsInput.selectedOptions).map(
    (option) => option.value
  );
}

symptomsInput.addEventListener("change", () => {
  const selectedSymptoms = getSelectedSymptoms();

  if (selectedSymptoms.length > MAX_SYMPTOMS) {
    const lastSelected = symptomsInput.selectedOptions[
      symptomsInput.selectedOptions.length - 1
    ];

    lastSelected.selected = false;
    showSymptomsError("Please select no more than 11 symptoms.");
  } else {
    clearSymptomsError();
  }

  symptomsCount.textContent =
    `${getSelectedSymptoms().length} of ${MAX_SYMPTOMS} symptoms selected`;
});

function getDistanceBetweenCounties(fromCounty, toCounty) {
  if (fromCounty === toCounty) {
    return 0;
  }
  const key = [fromCounty, toCounty].sort().join("|");
  return COUNTY_DISTANCES[key] ?? Infinity;
}

function getCountyHops(startCounty, maxHops) {
  const hops = new Map([[startCounty, 0]]);
  const queue = [startCounty];

  while (queue.length > 0) {
    const currentCounty = queue.shift();
    const currentHops = hops.get(currentCounty);

    if (currentHops >= maxHops) {
      continue;
    }

    for (const distanceKey of Object.keys(COUNTY_DISTANCES)) {
      const [firstCounty, secondCounty] = distanceKey.split("|");
      let nextCounty = null;

      if (firstCounty === currentCounty) {
        nextCounty = secondCounty;
      } else if (secondCounty === currentCounty) {
        nextCounty = firstCounty;
      }

      if (nextCounty && !hops.has(nextCounty)) {
        hops.set(nextCounty, currentHops + 1);
        queue.push(nextCounty);
      }
    }
  }

  return hops;
}

function getShortestCountyDistances(startCounty) {
  const distances = new Map([[startCounty, 0]]);
  const unvisited = new Set([startCounty]);

  for (const distanceKey of Object.keys(COUNTY_DISTANCES)) {
    const [firstCounty, secondCounty] = distanceKey.split("|");
    unvisited.add(firstCounty);
    unvisited.add(secondCounty);
  }

  while (unvisited.size > 0) {
    let currentCounty = null;
    let currentDistance = Infinity;

    for (const county of unvisited) {
      const distance = distances.get(county) ?? Infinity;
      if (distance < currentDistance) {
        currentCounty = county;
        currentDistance = distance;
      }
    }

    if (!currentCounty) {
      break;
    }

    unvisited.delete(currentCounty);

    for (const distanceKey of Object.keys(COUNTY_DISTANCES)) {
      const [firstCounty, secondCounty] = distanceKey.split("|");
      let nextCounty = null;

      if (firstCounty === currentCounty) {
        nextCounty = secondCounty;
      } else if (secondCounty === currentCounty) {
        nextCounty = firstCounty;
      }

      if (!nextCounty || !unvisited.has(nextCounty)) {
        continue;
      }

      const routeDistance = currentDistance + COUNTY_DISTANCES[distanceKey];
      if (routeDistance < (distances.get(nextCounty) ?? Infinity)) {
        distances.set(nextCounty, routeDistance);
      }
    }
  }

  return distances;
}

function matchCondition(symptomsText) {
  const text = symptomsText.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;
  let tied = false;

  for (const condition of conditions) {
    let score = 0;
    for (const keyword of condition.keywords) {
      if (text.includes(keyword)) {
        score += 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = condition;
      tied = false;
    } else if (score === bestScore && score > 0 && bestMatch && condition.id !== bestMatch.id) {
      tied = true;
    }
  }

  if (!bestMatch || bestScore < MIN_KEYWORD_MATCHES) {
    return { isUnclear: true };
  }

  if (tied && bestScore === 1) {
    return { isUnclear: true };
  }

  return bestMatch;
}

function getResourcesForCountyAndCondition(county, conditionId) {
  const seen = new Set();
  const allResources = [];
  const countyHops = getCountyHops(county, 2);
  const countyDistances = getShortestCountyDistances(county);

  for (const hubResources of Object.values(resourcesByHub)) {
    for (const resource of hubResources[conditionId] || []) {
      if (!seen.has(resource.name)) {
        seen.add(resource.name);
        allResources.push(resource);
      }
    }
  }

  const locatedResources = allResources
    .map((resource) => {
      const distanceKm = getDistanceBetweenCounties(county, resource.locationCounty);
      const hops = countyHops.get(resource.locationCounty) ?? Infinity;
      const routeDistanceKm = countyDistances.get(resource.locationCounty) ?? Infinity;
      return { ...resource, distanceKm, hops, routeDistanceKm };
    });

  const nearbyResources = locatedResources
    .filter((resource) => resource.distanceKm <= MAX_RESOURCE_DISTANCE_KM)
    .sort((a, b) => a.distanceKm - b.distanceKm);

  const selectedResources = nearbyResources.length > 0
    ? nearbyResources
    : locatedResources
      .filter((resource) => resource.hops > 0 && resource.hops <= 2)
      .sort((a, b) => a.hops - b.hops || a.distanceKm - b.distanceKm);

  const fallbackResources = selectedResources.length > 0
    ? selectedResources
    : locatedResources
      .sort((a, b) => a.routeDistanceKm - b.routeDistanceKm)
      .slice(0, 1);

  return fallbackResources.map((resource) => ({
    ...resource,
    travelNote: resource.distanceKm === 0
      ? `Located in ${county} (within your county).`
      : resource.hops <= 2 && resource.distanceKm > MAX_RESOURCE_DISTANCE_KM
        ? `Located in ${resource.locationCounty}, approximately ${resource.distanceKm} km from ${county}; nearest available referral within two connected counties.`
        : resource.routeDistanceKm < Infinity
          ? `Located in ${resource.locationCounty}, approximately ${resource.routeDistanceKm} km by the nearest county route from ${county}; closest available referral for this condition.`
          : `Located in ${resource.locationCounty}; closest available referral for this condition.`,
    mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${resource.name}, ${resource.locationCounty}, Kenya`)}`
  }));
}

function renderAdvice(adviceItems) {
  const list = document.getElementById("condition-advice");
  list.innerHTML = "";
  for (const item of adviceItems) {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  }
}

function renderFacilities(county, conditionId) {
  const list = document.getElementById("facility-list");
  const heading = document.getElementById("resources-heading");
  const items = getResourcesForCountyAndCondition(county, conditionId);
  const usedFallback = items.some(
    (item) => item.distanceKm > MAX_RESOURCE_DISTANCE_KM
  );

  heading.textContent = usedFallback
    ? `Nearest Resources for This Condition Near ${county} County`
    : `Resources for This Condition Near ${county} County`;
  list.innerHTML = "";

  if (items.length === 0) {
    list.innerHTML = `<li>No hospitals, clinics, or programmes for this condition were found in ${county} County or the next two connected counties. Please contact your county health office for a local referral.</li>`;
    return;
  }

  for (const facility of items) {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${facility.name}</strong>
      <span class="facility-type">(${facility.type})</span><br>
      ${facility.program}<br>
      <span class="facility-cost"><strong>Estimated cost:</strong> ${facility.cost}</span><br>
      <span class="facility-travel">${facility.travelNote}</span><br>
      <span class="facility-links">
        <a href="${facility.mapUrl}" target="_blank" rel="noopener noreferrer">View map and resource details</a>
      </span>
    `;
    list.appendChild(li);
  }
}

function getGenderValue() {
  const selected = genderSelect.value;
  if (selected === "custom") {
    return customGenderInput.value.trim() || "custom";
  }
  return selected;
}

genderSelect.addEventListener("change", () => {
  const isCustom = genderSelect.value === "custom";
  customGenderGroup.classList.toggle("hidden", !isCustom);
  customGenderInput.required = isCustom;
  if (!isCustom) {
    customGenderInput.value = "";
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearSymptomsError();

  const formData = new FormData(form);
  const selectedSymptoms = getSelectedSymptoms();
  const symptoms = selectedSymptoms.join(", ");
  const age = Number(formData.get("age"));
  const county = formData.get("county");

  if (selectedSymptoms.length === 0) {
    showSymptomsError("Please select at least one symptom.");
    symptomsInput.focus();
    return;
  }

  if (selectedSymptoms.length > MAX_SYMPTOMS) {
    showSymptomsError("Please select no more than 11 symptoms.");
    symptomsInput.focus();
    return;
  }

  if (age < 3 || age > 16) {
    alert("Please enter an age between 3 and 16.");
    return;
  }

  if (genderSelect.value === "custom" && !customGenderInput.value.trim()) {
    alert("Please specify a custom gender or choose another option.");
    return;
  }

  const result = matchCondition(symptoms);

  if (result.isUnclear) {
    showSymptomsError(
      "Your symptoms are not clear enough to suggest a probable condition. " +
      "Please re-type them with more detail about what you have noticed — for example: " +
      "trouble paying attention, difficulty making friends, reading struggles, messy handwriting, " +
      "problems with numbers, slow learning in daily tasks, or clumsiness and poor balance."
    );
    symptomsInput.focus();
    return;
  }

  document.getElementById("condition-result").textContent = result.name;
  document.getElementById("condition-explanation").textContent = result.explanation;
  renderAdvice(result.advice);
  renderFacilities(county, result.id);

  form.closest(".tool-section").classList.add("hidden");
  resultsSection.classList.remove("hidden");
  resultsSection.scrollIntoView({ behavior: "smooth" });
});

startOverBtn.addEventListener("click", () => {
  form.reset();
  symptomsCount.textContent = `0 of ${MAX_SYMPTOMS} symptoms selected`;
  clearSymptomsError();
  customGenderGroup.classList.add("hidden");
  customGenderInput.required = false;
  resultsSection.classList.add("hidden");
  form.closest(".tool-section").classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});
