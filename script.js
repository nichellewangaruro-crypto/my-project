const form = document.getElementById("screening-form");
const resultsSection = document.getElementById("results");
const genderSelect = document.getElementById("gender");
const customGenderGroup = document.getElementById("custom-gender-group");
const customGenderInput = document.getElementById("custom-gender");
const startOverBtn = document.getElementById("start-over");

const conditions = [
  {
    id: "adhd",
    name: "ADHD (Attention-Deficit/Hyperactivity Disorder) — possible",
    keywords: [
      "attention", "hyperactive", "hyperactivity", "impulsive", "impulsivity",
      "fidget", "fidgeting", "distracted", "distraction", "focus", "restless",
      "cannot sit still", "can't sit still", "inattentive", "daydream"
    ],
    explanation:
      "ADHD is a neurodevelopmental condition that affects a child's ability to pay attention, control impulses, and manage activity levels. Children may seem restless, forgetful, or easily distracted, even when they are trying their best.",
    advice:
      "Keep daily routines predictable, break tasks into small steps, and praise effort rather than only results. Reduce distractions during homework, ensure enough sleep, and talk with your child's teacher about classroom support. Seek a pediatrician or child psychiatrist for a formal assessment."
  },
  {
    id: "asd",
    name: "Autism Spectrum Disorder (ASD) — possible",
    keywords: [
      "autism", "autistic", "social", "eye contact", "repetitive", "routine",
      "sensory", "doesn't play", "does not play", "speech delay", "nonverbal",
      "stimming", "friends", "communication difficulty", "restricted interests"
    ],
    explanation:
      "Autism Spectrum Disorder affects how a child communicates, interacts socially, and responds to sensory input. Signs can include difficulty with social cues, strong preference for routines, repetitive behaviours, or delayed speech.",
    advice:
      "Use clear, simple language and visual schedules. Respect your child's need for routine and quiet spaces when overwhelmed. Early intervention services (speech therapy, occupational therapy) can make a significant difference. Contact a developmental paediatrician or autism specialist for evaluation."
  },
  {
    id: "speech",
    name: "Speech and Language Disorder — possible",
    keywords: [
      "speech", "language", "talking", "communication", "stutter", "stammer",
      "doesn't speak", "does not speak", "delayed speech", "pronunciation",
      "vocabulary", "sentence", "mute", "express"
    ],
    explanation:
      "Speech and language disorders affect how a child understands others (receptive language) and how they express themselves (expressive language). A child may have limited vocabulary, difficulty forming sentences, or trouble being understood by peers.",
    advice:
      "Talk and read to your child daily, pause to let them respond, and avoid correcting every mistake — model the right words instead. Reduce background noise during conversations. A speech-language therapist can assess whether therapy is needed. Ask your local hospital about referral services."
  },
  {
    id: "learning",
    name: "Specific Learning Disorder — possible",
    keywords: [
      "reading", "writing", "math", "maths", "dyslexia", "school struggles",
      "learning difficulty", "grades", "homework", "letters", "numbers",
      "spelling", "academic"
    ],
    explanation:
      "Specific Learning Disorders affect how a child acquires academic skills such as reading, writing, or mathematics, despite having normal intelligence and adequate schooling. Difficulties are often noticed once formal schooling begins.",
    advice:
      "Work closely with teachers to identify which subjects are hardest. Use multisensory learning (seeing, hearing, and doing). Celebrate small improvements and avoid comparing your child to siblings or classmates. A psycho-educational assessment can identify specific needs and classroom accommodations."
  },
  {
    id: "intellectual",
    name: "Intellectual Disability — possible",
    keywords: [
      "intellectual", "cognitive", "developmental delay", "learning slowly",
      "milestones", "delayed development", "adaptive", "life skills",
      "understanding concepts", "reasoning"
    ],
    explanation:
      "Intellectual disability involves limitations in intellectual functioning and adaptive behaviour (everyday social and practical skills). It may appear as slower learning across many areas, not just one subject, and difficulty with self-care or social skills for the child's age.",
    advice:
      "Focus on building practical life skills step by step — dressing, hygiene, following instructions. Use patience and repetition. Connect with special education services and community support programmes. A developmental assessment can help determine the level of support your child needs."
  },
  {
    id: "coordination",
    name: "Developmental Coordination Disorder — possible",
    keywords: [
      "clumsy", "coordination", "motor", "handwriting", "balance", "gross motor",
      "fine motor", "catching", "running", "tying shoes", "physical awkward"
    ],
    explanation:
      "Developmental Coordination Disorder (sometimes called dyspraxia) affects a child's motor skills. They may struggle with tasks like handwriting, tying shoelaces, catching a ball, or navigating physical spaces, which can affect confidence and school performance.",
    advice:
      "Encourage physical activities your child enjoys without pressure to compete. Break motor tasks into small, practised steps. Occupational therapy can help improve coordination. Inform teachers so your child can have extra time or alternative ways to complete written work."
  }
];

const unclearCondition = {
  name: "Further assessment recommended",
  explanation:
    "Based on the symptoms you described, we cannot identify a single probable condition with confidence. This does not mean nothing is wrong — your child's experiences are valid and deserve professional attention.",
  advice:
    "Keep a simple diary of symptoms (when they happen, how often, and what seems to trigger them). Share this with your child's teacher and a healthcare provider. Early assessment — even when symptoms are unclear — is the best way to get the right support."
};

const nationalResources = [
  {
    name: "Autism Society of Kenya",
    type: "program",
    program: "Autism awareness, parent support, and referral guidance (serves all counties)"
  },
  {
    name: "Ministry of Health — Mental Health Helpline",
    type: "program",
    program: "Free mental health support and referral information: call 1199"
  }
];

const facilities = {
  "Nairobi": [
    { name: "Kenyatta National Hospital", type: "hospital", program: "Paediatric neurology and psychiatry outpatient clinic" },
    { name: "Aga Khan University Hospital", type: "hospital", program: "Child development and behavioural health services" },
    { name: "Autism Society of Kenya", type: "program", program: "Early intervention, parent training, and school support" },
    { name: "Gertrude's Children's Hospital", type: "hospital", program: "Developmental paediatrics and therapy services" }
  ],
  "Mombasa": [
    { name: "Coast General Teaching & Referral Hospital", type: "hospital", program: "Paediatric outpatient and mental health referrals" },
    { name: "Aga Khan Hospital Mombasa", type: "hospital", program: "Child health and developmental assessments" }
  ],
  "Kisumu": [
    { name: "Jaramogi Oginga Odinga Teaching & Referral Hospital", type: "hospital", program: "Paediatric clinic and referral services" },
    { name: "Kisumu County Referral Hospital", type: "hospital", program: "Child health and community health outreach" }
  ],
  "Uasin Gishu": [
    { name: "Moi Teaching and Referral Hospital (MTRH)", type: "hospital", program: "Paediatric neurology and child psychiatry" },
    { name: "Eldoret County Referral Hospital", type: "hospital", program: "Child health services and therapy referrals" }
  ],
  "Nakuru": [
    { name: "Nakuru Level 5 Hospital", type: "hospital", program: "Paediatric outpatient and mental health unit" },
    { name: "Egerton University Medical Centre", type: "clinic", program: "Child health and developmental screening" }
  ],
  "Kiambu": [
    { name: "Thika Level 5 Hospital", type: "hospital", program: "Paediatric and mental health services" },
    { name: "Kiambu County Referral Hospital", type: "hospital", program: "Child health clinic and therapy referrals" }
  ],
  "Machakos": [
    { name: "Machakos Level 5 Hospital", type: "hospital", program: "Paediatric outpatient services" },
    { name: "Machakos County Referral Hospital", type: "hospital", program: "Community health and child development outreach" }
  ],
  "Kakamega": [
    { name: "Kakamega County General Teaching & Referral Hospital", type: "hospital", program: "Paediatric clinic and referral services" }
  ],
  "Meru": [
    { name: "Meru Teaching and Referral Hospital", type: "hospital", program: "Paediatric and mental health services" }
  ],
  "Nyeri": [
    { name: "Nyeri County Referral Hospital", type: "hospital", program: "Child health and developmental screening" }
  ],
  "Kisii": [
    { name: "Kisii Teaching and Referral Hospital", type: "hospital", program: "Paediatric outpatient and therapy referrals" }
  ],
  "Bungoma": [
    { name: "Bungoma County Referral Hospital", type: "hospital", program: "Paediatric health services" }
  ],
  "Turkana": [
    { name: "Lodwar County Referral Hospital", type: "hospital", program: "Paediatric clinic and community health outreach" }
  ],
  "Garissa": [
    { name: "Garissa County Referral Hospital", type: "hospital", program: "Child health and referral services" }
  ]
};

function getFacilitiesForCounty(county) {
  const countyFacilities = facilities[county] || [];
  const genericEntry = {
    name: `${county} County Referral Hospital`,
    type: "hospital",
    program: "Paediatric outpatient clinic — ask for child development or mental health referral"
  };
  const combined = countyFacilities.length > 0
    ? [...countyFacilities, ...nationalResources]
    : [genericEntry, ...nationalResources];
  return combined;
}

function matchCondition(symptomsText) {
  const text = symptomsText.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

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
    }
  }

  if (!bestMatch || bestScore === 0) {
    return { ...unclearCondition, isUnclear: true };
  }

  return bestMatch;
}

function renderFacilities(county) {
  const list = document.getElementById("facility-list");
  const heading = document.getElementById("resources-heading");
  const items = getFacilitiesForCounty(county);

  heading.textContent = `Resources in ${county} County`;
  list.innerHTML = "";

  if (items.length === 0) {
    list.innerHTML = "<li>No listed resources for this county yet. Please contact your nearest county referral hospital.</li>";
    return;
  }

  for (const facility of items) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${facility.name}</strong> <span class="facility-type">(${facility.type})</span> — ${facility.program}`;
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

  const formData = new FormData(form);
  const symptoms = formData.get("symptoms").trim();
  const age = Number(formData.get("age"));
  const county = formData.get("county");
  const gender = getGenderValue();

  if (age < 3 || age > 16) {
    alert("Please enter an age between 3 and 16.");
    return;
  }

  if (genderSelect.value === "custom" && !customGenderInput.value.trim()) {
    alert("Please specify a custom gender or choose another option.");
    return;
  }

  const result = matchCondition(symptoms);

  document.getElementById("condition-result").textContent = result.name;
  document.getElementById("condition-explanation").textContent = result.explanation;
  document.getElementById("condition-advice").textContent = result.advice;

  renderFacilities(county);

  form.closest(".tool-section").classList.add("hidden");
  resultsSection.classList.remove("hidden");
  resultsSection.scrollIntoView({ behavior: "smooth" });
});

startOverBtn.addEventListener("click", () => {
  form.reset();
  customGenderGroup.classList.add("hidden");
  customGenderInput.required = false;
  resultsSection.classList.add("hidden");
  form.closest(".tool-section").classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});
