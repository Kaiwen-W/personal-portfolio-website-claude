/* ==================================================================
 *  EDIT EVERYTHING ABOUT YOU IN THIS FILE
 * ==================================================================
 *  Posts and projects are NOT here — they are Markdown files in
 *  `src/posts/` and `src/projects/`. This file holds the bio and the
 *  CV-style entries only.
 *
 *  Any text string below accepts inline Markdown:
 *    [links](https://...), [in-page links](#posts), **bold**, *italic*,
 *    `code`.
 *  Caveat: avoid a [link]() inside an entry's `org` or a social
 *  `label` — that text already sits inside a clickable element.
 * ================================================================== */

export const profile = {
  name: "Kaiwen Wang",
  subtitle: "Incoming 2nd Year CS & Maths Student at University of Edinburgh",
  bio: "Currently the President of [CompSoc](https://comp-soc.com) and ambassador at [JetBrains](https://www.jetbrains.com/). Previously NLP researcher at [Edinburgh University](https://elm.edina.ac.uk/). Interested in NLP and AI/ML as a whole as well as competitive programming.",
  socials: [
    { label: "Now", href: "#/now", external: false },
    { label: "GitHub", href: "https://github.com/Kaiwen-W", external: true },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/wangkaiwen",
      external: true,
    },
    {
      label: "Email",
      href: "mailto:kaiwen.wang.uk@gmail.com",
      external: false,
    },
  ],
};

export const experience = [
  {
    org: "University of Edinburgh",
    role: "ELM Research Intern",
    period: "Jun 2026 - Aug 2026",
    details: {
      location: "Edinburgh, UK · Full-time",
      summary:
        "[ELM](https://elm.edina.ac.uk/) (Edinburgh Language Model) is The University of Edinburgh's own generative AI platform. Today it serves 6000+ users with over 50000 daily prompts. There I researched evaluation methods for LLMs and LLM moderation models. ",
      highlights: [
        "Replaced incumbent LLM guard, increasing F1 (46% to 77%) while running ∼2.5x faster at half the VRAM. I proved moderation verdicts track policy via a 44-run strict/permissive steerability test.",
        "Onboarded Qwen onto by developing a Python evaluation framework over 7 social and geopolitical bias benchmarks and against 4 comparison models. Produced a report which shaped how Qwen was deployed by staff.",
        "Enabled staff to vet any future model with zero code change by engineering a pluggable model-runner over local and cloud backends, and cut full benchmark runtime by 65% with seeded stratified subsampling",
        "Formalised a cross-lingual consistency score (cosine similarity + BERTScore) to quantify answer inconsistency on multi-lingual prompts",
        "Evaluated open-source NotebookLM-class platforms and integrated one into ELM, plus a technical report on maths rendering defects in the Angular frontend.",
      ],
    },
  },
  {
    org: "CENSIS",
    role: "Intern",
    period: "April 2022",
    details: {
      location: "Glasgow, UK · Full-time",
      summary:
        "CENSIS is Scotland's innovation centre for sensing, imaging, and IoT. I worked on computer vision and PCB design. Completed in S5 of Secondary School.",
      highlights: [
        "Designed ultra-low-power MCU-based temperature and humidity sensor PCB with Altium Designer, including ERC-checked schematics, hand-routed GND traces and a bottom layer GND plane, delivering production prototypes costing only £0.38.",
        "Built zero-shot SAM pipeline for medical image segmentation with multi-mask outputs, eliminating custom annotation needs.",
      ],
    },
  },
];

export const education = [
  {
    org: "University of Edinburgh",
    role: "BSc (Hons) Computer Science & Mathematics — 90% Average",
    period: "Expected 2029",
    details: {
      location: "Edinburgh, UK",
      summary: "Four-year honours degree at the best place in the world.",
      highlights: [
        "Courses: Introduction to Audio Machine Learning, OOP, Functional Programming & Logic, Linear Algebra, and Real Analysis.",
        "Societies (outside of CompSoc and our SIGs): University's Badminton Team (4th out of 6) and [EUTIC](https://www.eutic.org.uk/) Quant.",
      ],
    },
  },
  {
    org: "Jordanhill School",
    role: "High School — 4A1s at Advanced Higher, 6A1s at Higher",
    period: "2019 - 2025",
    details: {
      location: "Glasgow, UK",
      summary: "Where I first fell in love with coding.",
      highlights: [
        "House Captain in S5, co-organising weekly club, led a team of students in organising and delivering house events, and trained as a Mentor in Violence Protection, delivering lessons to classes.",
        "Winner of National WoSPEG Physics Competition, 5 x Gold in UKMT and Scottish Maths Challenges",
        "First in Year for Advanced Higher Computing Science, National 5 Mathematics and Chemistry, 6 x Merit Prizes for Academic Excellence",
        "Runner-Up in Young Musician of the Year competition for classical guitar, guitarist and bassist in various bands",
      ],
    },
  },
];

export const leadership = [
  {
    org: "CompSoc - Edinburgh University Tech Society",
    role: "President",
    period: "Apr 2026 - Present",
    details: {
      location: "University of Edinburgh",
      summary:
        "CompSoc is Scotland's largest tech society with 2,700+ members, 100+ industry talks, workshops, and socials and 12 Special Interest Groups each focusing on a different part of CS. ",
      highlights: [
        "Led a 27-person committee while securing a £140,000 budget (a 20% increase YOY) supported by 13 sponsors",
        "Co-organising HackTheBurgh, Scotland’s largest hackathon with an expected 300 attendees and £15,000 of prizes",
        "Organised 10 introductory events aimed at first-years, gathering feedback and improving engagement by 30%",
        "Previously first year representative where I acted as a liaison for 400 first years, and co-organised events such as HackTheBurgh, InfBall and STMUs. ",
      ],
    },
  },
  {
    org: "JetBrains",
    role: "Campus Ambassador",
    period: "May 2026 - Present",
    details: {
      location: "University of Edinburgh",
      summary:
        "Lead of university relations across Scotland, coordinating events across 5 universities, with 60 - 120 attendees at each event.",
      highlights: [],
    },
  },
  {
    org: "Google Developer Groups Glasgow",
    role: "Organiser",
    period: "Nov 2024 - Present",
    details: {
      location: "Glasgow",
      summary: "Organising cool meetups pre-University.",
      highlights: [
        "Organised technical meetups, curating speakers from top tech companies, serving a community of 200+ developers",
        "Delivered technical presentations on reinforcement learning at multiple events, engaging audiences of 80+ attendees",
      ],
    },
  },
];

/* the three timeline blocks, in order, each with its own accent colour */
export const timelineSections = [
  { num: "01", label: "Experience", accent: "#FF3F5C", items: experience },
  { num: "02", label: "Education", accent: "#3142F0", items: education },
  { num: "03", label: "Leadership", accent: "#5B3BF0", items: leadership },
];

/* section list for the sticky rail navigation */
export const navItems = [
  { id: "experience", num: "01", label: "Experience" },
  { id: "education", num: "02", label: "Education" },
  { id: "leadership", num: "03", label: "Leadership" },
  { id: "projects", num: "04", label: "Projects" },
  { id: "posts", num: "05", label: "Posts" },
];

/* accent colours cycled through the post-list icons */
export const ICON_TINTS = ["#FF3F5C", "#3142F0", "#5B3BF0", "#FFA0B4"];
