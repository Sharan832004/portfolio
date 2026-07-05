import { useState, useEffect } from "react";
import {
  Terminal,
  Cloud,
  Code2,
  Database,
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  Gamepad2,
  GraduationCap,
  Briefcase,
  ChevronRight,
} from "lucide-react";

const palette = {
  void: "#090C11",
  panel: "#10151D",
  panelRaised: "#161C27",
  border: "#212A38",
  borderStrong: "#2E3A4C",
  text: "#DCE3EA",
  muted: "#7A869A",
  mutedDim: "#57647A",
  amber: "#E8A84A",
  amberDim: "#8C6A34",
  cyan: "#5FC2BE",
  cyanDim: "#33635F",
};

const fontImport = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
`;

function useTypedLines(lines, speed = 28, startDelay = 300) {
  const [output, setOutput] = useState([]);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let cancelled = false;
    let lineIdx = 0;
    let charIdx = 0;
    let current = "";
    const buffer = [];
    const timer = setTimeout(function typeChar() {
      if (cancelled) return;
      if (lineIdx >= lines.length) {
        setDone(true);
        return;
      }
      const line = lines[lineIdx];
      if (charIdx < line.text.length) {
        current += line.text[charIdx];
        charIdx += 1;
        setOutput([...buffer, { ...line, text: current }]);
        setTimeout(typeChar, speed);
      } else {
        buffer.push({ ...line, text: current });
        lineIdx += 1;
        charIdx = 0;
        current = "";
        setTimeout(typeChar, line.pause || 150);
      }
    }, startDelay);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { output, done };
}

function SectionLabel({ index, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          color: palette.amber,
        }}
      >
        {index}
      </span>
      <span style={{ height: 1, width: 28, background: palette.borderStrong }} />
      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
          fontSize: 22,
          color: palette.text,
          letterSpacing: "-0.01em",
          margin: 0,
        }}
      >
        {children}
      </h2>
    </div>
  );
}

function Pill({ children, tone = "cyan" }) {
  const color = tone === "cyan" ? palette.cyan : palette.amber;
  const border = tone === "cyan" ? palette.cyanDim : palette.amberDim;
  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        padding: "4px 10px",
        borderRadius: 5,
        border: `1px solid ${border}`,
        color,
        background: "rgba(255,255,255,0.02)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function ServiceCard({ icon: Icon, title, items }) {
  return (
    <div
      style={{
        background: palette.panel,
        border: `1px solid ${palette.border}`,
        borderRadius: 10,
        padding: "20px 20px 22px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <Icon size={17} color={palette.amber} strokeWidth={1.75} />
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: 15,
            color: palette.text,
          }}
        >
          {title}
        </span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {items.map((it) => (
          <Pill key={it}>{it}</Pill>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ name, tagline, description, stack, status }) {
  return (
    <div
      style={{
        background: palette.panel,
        border: `1px solid ${palette.border}`,
        borderRadius: 10,
        padding: "22px 22px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: palette.cyan,
              boxShadow: `0 0 6px ${palette.cyan}`,
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: palette.mutedDim,
              letterSpacing: "0.04em",
            }}
          >
            {status}
          </span>
        </div>
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: 19,
            color: palette.text,
            margin: "0 0 4px",
          }}
        >
          {name}
        </h3>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12.5,
            color: palette.amber,
            margin: 0,
          }}
        >
          {tagline}
        </p>
      </div>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 14,
          lineHeight: 1.65,
          color: palette.muted,
          margin: 0,
        }}
      >
        {description}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "auto" }}>
        {stack.map((s) => (
          <Pill key={s} tone="amber">
            {s}
          </Pill>
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ time, icon: Icon, title, detail, last }) {
  return (
    <div style={{ display: "flex", gap: 18 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: palette.panelRaised,
            border: `1px solid ${palette.borderStrong}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={15} color={palette.cyan} strokeWidth={1.75} />
        </div>
        {!last && <div style={{ flex: 1, width: 1, background: palette.border, marginTop: 4 }} />}
      </div>
      <div style={{ paddingBottom: last ? 0 : 32 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11.5,
            color: palette.mutedDim,
            marginBottom: 4,
            letterSpacing: "0.03em",
          }}
        >
          {time}
        </div>
        <h4
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: 16,
            color: palette.text,
            margin: "0 0 6px",
          }}
        >
          {title}
        </h4>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13.5,
            lineHeight: 1.6,
            color: palette.muted,
            margin: 0,
            maxWidth: 480,
          }}
        >
          {detail}
        </p>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const bootLines = [
    { text: "$ whoami", pause: 260 },
    { text: "Sharan — Cloud & full-stack engineer", pause: 200 },
    { text: "$ cat status.txt", pause: 260 },
    { text: "Incoming @ Wipro COE Elite FY'27, Cloud/AWS track", pause: 200 },
    { text: "$ _", pause: 0 },
  ];
  const { output, done } = useTypedLines(bootLines, 26, 400);
  const [cursorOn, setCursorOn] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setCursorOn((c) => !c), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      style={{
        background: palette.void,
        color: palette.text,
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{fontImport}</style>

      {/* NAV */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "rgba(9,12,17,0.85)",
          backdropFilter: "blur(6px)",
          borderBottom: `1px solid ${palette.border}`,
        }}
      >
        <div
          style={{
            maxWidth: 980,
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              color: palette.amber,
            }}
          >
            sharan<span style={{ color: palette.mutedDim }}>@portfolio</span>
          </span>
          <div style={{ display: "flex", gap: 22 }}>
            {["about", "stack", "projects", "journey", "contact"].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12.5,
                  color: palette.muted,
                  textDecoration: "none",
                }}
              >
                ./{s}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* HERO */}
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "72px 24px 56px" }}>
        <div
          style={{
            background: palette.panel,
            border: `1px solid ${palette.border}`,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 16px",
              borderBottom: `1px solid ${palette.border}`,
              background: palette.panelRaised,
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#E85C4F" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#E8B84A" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#4FC17A" }} />
            <span
              style={{
                marginLeft: 10,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: palette.mutedDim,
              }}
            >
              bash — sharan
            </span>
          </div>
          <div style={{ padding: "28px 26px 30px", minHeight: 150 }}>
            {output.map((line, i) => (
              <div
                key={i}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 15,
                  lineHeight: 1.9,
                  color: line.text.startsWith("$") ? palette.cyan : palette.text,
                }}
              >
                {line.text}
                {done && i === output.length - 1 && (
                  <span style={{ opacity: cursorOn ? 1 : 0, color: palette.cyan }}>▍</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 30 }}>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 42,
              letterSpacing: "-0.02em",
              margin: "0 0 12px",
              color: palette.text,
            }}
          >
            Sharan
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16.5,
              lineHeight: 1.7,
              color: palette.muted,
              maxWidth: 620,
              margin: "0 0 26px",
            }}
          >
            Final-year computer science engineer building full-stack products with Java,
            Spring Boot, React and Flutter — now heading into cloud infrastructure work on
            AWS with Wipro's COE Elite program.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="#projects"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13.5,
                color: palette.void,
                background: palette.amber,
                padding: "10px 18px",
                borderRadius: 7,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              View projects <ChevronRight size={14} />
            </a>
            <a
              href="#contact"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13.5,
                color: palette.text,
                border: `1px solid ${palette.borderStrong}`,
                padding: "10px 18px",
                borderRadius: 7,
                textDecoration: "none",
              }}
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div id="about" style={{ maxWidth: 980, margin: "0 auto", padding: "10px 24px 64px" }}>
        <SectionLabel index="01">About</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 32 }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              lineHeight: 1.85,
              color: palette.muted,
              margin: 0,
            }}
          >
            I'm a Computer Science and Engineering student at Sri Manakula Vinayagar
            Engineering College, graduating in 2026. Most of my work has centred on
            full-stack development — designing backends in Java and Spring Boot, and
            building interfaces in React and Flutter with Firebase behind them. I've
            picked up AWS as my next focus, working toward the Cloud Practitioner and
            Solutions Architect Associate certifications ahead of joining Wipro's Cloud
            engineering track. Outside of code, I spend my downtime in tightly designed
            games like Sekiro and the Assassin's Creed series, and I follow Tamil-dubbed
            anime.
          </p>
          <div
            style={{
              background: palette.panel,
              border: `1px solid ${palette.border}`,
              borderRadius: 10,
              padding: "18px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              height: "fit-content",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <GraduationCap size={16} color={palette.cyan} strokeWidth={1.75} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: palette.muted }}>
                B.Tech CSE, SMVEC · 2026
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Briefcase size={16} color={palette.cyan} strokeWidth={1.75} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: palette.muted }}>
                Incoming, Wipro COE Elite FY'27
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Gamepad2 size={16} color={palette.cyan} strokeWidth={1.75} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: palette.muted }}>
                Sekiro · Assassin's Creed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* STACK */}
      <div id="stack" style={{ maxWidth: 980, margin: "0 auto", padding: "10px 24px 64px" }}>
        <SectionLabel index="02">Stack</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <ServiceCard icon={Code2} title="Languages" items={["Java", "JavaScript", "Dart"]} />
          <ServiceCard
            icon={Terminal}
            title="Frameworks"
            items={["Spring Boot", "React", "Flutter"]}
          />
          <ServiceCard icon={Database} title="Data & backend" items={["Firebase", "REST APIs"]} />
          <ServiceCard icon={Cloud} title="Cloud (in progress)" items={["AWS", "EC2", "S3", "IAM"]} />
          <ServiceCard icon={Code2} title="Tooling" items={["Git", "LaTeX", "Postman"]} />
          <ServiceCard icon={Database} title="Certifications" items={["AWS CCP — in progress", "AWS SAA — planned"]} />
        </div>
      </div>

      {/* PROJECTS */}
      <div id="projects" style={{ maxWidth: 980, margin: "0 auto", padding: "10px 24px 64px" }}>
        <SectionLabel index="03">Projects</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <ProjectCard
            status="deployed — academic project"
            name="RESQUE"
            tagline="Emergency response platform"
            description="A full-stack app aimed at coordinating faster response during emergencies, with a Spring Boot backend and a React front end for real-time updates."
            stack={["Java", "Spring Boot", "React"]}
          />
          <ProjectCard
            status="deployed — academic project"
            name="ROOM4U"
            tagline="Student room-finder"
            description="A Flutter and Firebase app that helps students discover and book nearby rooms and hostels, with live availability synced from Firestore."
            stack={["Flutter", "Firebase"]}
          />
          <ProjectCard
            status="deployed — personal project"
            name="Weather Forecast App"
            tagline="Real-time weather lookup"
            description="A lightweight app that pulls live forecasts from a public weather API and presents them in a clean, minimal interface."
            stack={["Java", "REST API"]}
          />
        </div>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11.5,
            color: palette.mutedDim,
            marginTop: 16,
          }}
        >
          // swap in your real project descriptions and links here
        </p>
      </div>

      {/* JOURNEY */}
      <div id="journey" style={{ maxWidth: 980, margin: "0 auto", padding: "10px 24px 64px" }}>
        <SectionLabel index="04">Journey</SectionLabel>
        <div
          style={{
            background: palette.panel,
            border: `1px solid ${palette.border}`,
            borderRadius: 10,
            padding: "28px 26px",
          }}
        >
          <TimelineItem
            time="2022 — 2026"
            icon={GraduationCap}
            title="B.Tech, Computer Science and Engineering"
            detail="Sri Manakula Vinayagar Engineering College, Puducherry. CGPA 7.99."
          />
          <TimelineItem
            time="2026"
            icon={Briefcase}
            title="Placed — Wipro COE Elite FY'27"
            detail="Selected for the Cloud/AWS engineering track, onboarding around July–August 2026."
          />
          <TimelineItem
            time="ongoing"
            icon={Cloud}
            title="AWS certification roadmap"
            detail="Working through AWS Cloud Practitioner and Solutions Architect Associate material via AWS Skill Builder and Udemy."
            last
          />
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ maxWidth: 980, margin: "0 auto", padding: "10px 24px 90px" }}>
        <SectionLabel index="05">Contact</SectionLabel>
        <div
          style={{
            background: palette.panel,
            border: `1px solid ${palette.border}`,
            borderRadius: 10,
            padding: "30px 28px",
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              color: palette.cyan,
              margin: "0 0 20px",
            }}
          >
            $ contact --send
          </p>
          <div style={{ display: "flex", gap: 26, flexWrap: "wrap" }}>
            <a
              href="mailto:msharanraj527@gmail.com"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: palette.text,
                textDecoration: "none",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
              }}
            >
              <Mail size={16} color={palette.amber} strokeWidth={1.75} />
              msharanraj527@gmail.com
            </a>
            <a
              href="tel:+918248580823"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: palette.text,
                textDecoration: "none",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
              }}
            >
              <Phone size={16} color={palette.amber} strokeWidth={1.75} />
              +91 82485 80823
            </a>
            <a
              href="https://linkedin.com/in/m-sharan-raj"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: palette.text,
                textDecoration: "none",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
              }}
            >
              <Linkedin size={16} color={palette.amber} strokeWidth={1.75} />
              LinkedIn <ExternalLink size={12} color={palette.mutedDim} />
            </a>
            <a
              href="https://github.com/sharanraj"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: palette.text,
                textDecoration: "none",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
              }}
            >
              <Github size={16} color={palette.amber} strokeWidth={1.75} />
              GitHub <ExternalLink size={12} color={palette.mutedDim} />
            </a>
          </div>
        </div>
        <p
          style={{
            textAlign: "center",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11.5,
            color: palette.mutedDim,
            marginTop: 40,
          }}
        >
          built by sharan · 2026
        </p>
      </div>
    </div>
  );
}
