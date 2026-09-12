import { MapPin, Mail, GraduationCap, Terminal } from "lucide-react";

export default function About() {
  const timeline = [
    {
      year: "2023 - 2027",
      title: "B.Tech CSE (Cybersecurity)",
      place: "IIIT Kottayam",
      description:
        "Focused on cybersecurity, network security, and secure software development.",
    },
    {
      year: "2023",
      title: "Started Development Journey",
      place: "Self-taught",
      description: "Began learning web development and programming fundamentals.",
    },
  ];

  const interests = [
    "Cybersecurity Research",
    "Full Stack Development",
    "Building Real-time Applications",
    "Secure System Design",
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-32">
      <div className="mb-12">
        <span className="text-secondary">root@vj-portfolio</span>:~$ whoami
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 uppercase text-primary text-shadow-glow">
          VAISAG J
        </h2>
      </div>

      <div className="border border-primary border-dashed p-6 mb-16 bg-background">
        <p className="text-sm text-primary/80 leading-relaxed mb-6 lowercase">
          &gt; I am a passionate developer from Palakkad, Kerala, specializing in
          cybersecurity and full-stack development. Currently pursuing my B.Tech in
          Computer Science with a focus on Cybersecurity at IIIT Kottayam. I love
          building secure, performant applications that make a difference.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-secondary" />
            <span className="text-primary/60 uppercase">LOCATION:</span>
            <span>Palakkad, Kerala</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-secondary" />
            <span className="text-primary/60 uppercase">EMAIL:</span>
            <span>jvaisag@gmail.com</span>
          </div>
          <div className="flex items-center gap-3">
            <GraduationCap className="w-4 h-4 text-secondary" />
            <span className="text-primary/60 uppercase">EDUCATION:</span>
            <span>IIIT Kottayam</span>
          </div>
          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-secondary" />
            <span className="text-primary/60 uppercase">EXPERIENCE:</span>
            <span>3+ Years</span>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <div className="mb-6">
          <span className="text-secondary">root@vj-portfolio</span>:~$ cat /var/log/timeline.log
        </div>
        <div className="border border-primary p-6 bg-background space-y-6">
          {timeline.map((item, index) => (
            <div key={index} className="border-b border-primary border-dashed pb-6 last:border-0 last:pb-0">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                <span className="text-secondary font-bold tracking-widest">[{item.year}]</span>
                <span className="uppercase font-bold text-primary">{item.title}</span>
                <span className="text-[10px] border border-primary px-1">OK</span>
              </div>
              <div className="pl-0 md:pl-[120px] text-sm text-primary/70">
                <p className="uppercase mb-1">&gt; LOC: {item.place}</p>
                <p className="lowercase">&gt; MSG: {item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-6">
          <span className="text-secondary">root@vj-portfolio</span>:~$ ls -l ./interests/
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {interests.map((interest, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 border border-primary hover:inverted group transition-none cursor-default"
            >
              <span className="text-secondary group-hover:text-black">-rw-r--r--</span>
              <span className="uppercase text-sm group-hover:text-black">{interest.replace(/ /g, '_').toLowerCase()}.sh</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
