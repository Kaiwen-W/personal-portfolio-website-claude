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
  name: "Alex Rivera",
  subtitle: "Software engineer based in Edinburgh, UK",
  bio: "I build small tools that make everyday things feel a little more delightful — usually somewhere between hardware, interfaces and the people who use them. Most of it ends up on [GitHub](https://github.com/yourhandle).",
  socials: [
    { label: "Now", href: "#/now", external: false },
    { label: "Twitter", href: "https://twitter.com/yourhandle", external: true },
    { label: "GitHub", href: "https://github.com/yourhandle", external: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle", external: true },
    { label: "Email", href: "mailto:you@example.com", external: false },
  ],
};

export const experience = [
  {
    org: "Lumen Labs",
    role: "Software Engineer",
    period: "Sept 2025",
    details: {
      location: "Edinburgh, UK · Full-time",
      summary:
        "On the platform team, building internal tooling and developer-facing APIs used across the company.",
      highlights: [
        "Shipped a build service that cut average deploy times by ~40%.",
        "Owned the migration to a shared design-system component library.",
        "Mentor incoming interns and run weekly frontend office hours.",
      ],
    },
  },
  {
    org: "Cobalt",
    role: "Software Engineering Intern",
    period: "Summer 2024",
    details: {
      location: "London, UK · Internship",
      summary:
        "Joined the payments squad for a 12-week internship focused on reliability and observability.",
      highlights: [
        "Built an automated reconciliation dashboard adopted by the ops team.",
        "Added end-to-end tests covering the three highest-traffic flows.",
      ],
    },
  },
  {
    org: "Helio",
    role: "Software Engineering Intern",
    period: "Summer 2022",
    details: {
      location: "Remote · Internship",
      summary:
        "First industry internship, working across the mobile app codebase.",
      highlights: [
        "Implemented offline caching for the activity feed.",
        "Closed 30+ issues from the public bug tracker.",
      ],
    },
  },
];

export const education = [
  {
    org: "University of Edinburgh",
    role: "BSc (Hons) Computer Science — First Class",
    period: "2021–2025",
    details: {
      location: "Edinburgh, UK",
      summary:
        "Four-year honours degree focused on systems, machine learning and human-computer interaction.",
      highlights: [
        "Dissertation on peer-feedback tooling, later adapted into a paper.",
        "Class representative for two consecutive years.",
        "Coursework: Distributed Systems, Computer Vision, HCI.",
      ],
    },
  },
  {
    org: "KTH Royal Institute of Technology",
    role: "Exchange semester · Computer Science",
    period: "Spring 2024",
    details: {
      location: "Stockholm, Sweden",
      summary:
        "One-semester exchange taking advanced courses not offered at home.",
      highlights: [
        "Studied Embedded Systems and Interaction Design.",
        "Built a capstone project with a four-person international team.",
      ],
    },
  },
];

export const leadership = [
  {
    org: "Build Circle",
    role: "Founder & President",
    period: "2023–2025",
    details: {
      location: "University of Edinburgh",
      summary:
        "Founded and ran a society for students working on side projects.",
      highlights: [
        "Grew the community to 120+ active members.",
        "Organised fortnightly demo nights and an end-of-year showcase.",
        "Secured sponsorship covering venue and prize costs.",
      ],
    },
  },
  {
    org: "Hack the Burgh",
    role: "Organising Committee",
    period: "2023–2024",
    details: {
      location: "University of Edinburgh",
      summary: "Helped run one of Scotland's largest student hackathons.",
      highlights: [
        "Led logistics for 300+ attendees across the weekend.",
        "Coordinated mentors and judging over 12 sponsor tracks.",
      ],
    },
  },
  {
    org: "Edinburgh CompSoc",
    role: "Student Mentor",
    period: "2022–2023",
    details: {
      location: "University of Edinburgh",
      summary:
        "Mentored first-year students through the transition into the CS programme.",
      highlights: [
        "Ran weekly drop-in sessions on coursework and tooling.",
        "Paired with 8 mentees across the academic year.",
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
