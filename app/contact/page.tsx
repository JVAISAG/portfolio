import { Mail, Phone, Linkedin, Github } from "lucide-react";

export default function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "jvaisag@gmail.com",
      href: "mailto:jvaisag@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9061378010",
      href: "tel:+919061378010",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "vaisag-j",
      href: process.env.NEXT_PUBLIC_ADMIN_LINKEDIN,
    },
    {
      icon: Github,
      label: "GitHub",
      value: "jvaisag",
      href: "https://github.com/jvaisag",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-32">
      <div className="mb-12 text-center">
        <span className="text-secondary">root@vj-portfolio</span>:~$ ./connect.sh
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 uppercase text-primary text-shadow-glow">
          ESTABLISH_CONNECTION
        </h2>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="space-y-0 border border-primary border-dashed p-6 bg-background h-fit">
          <p className="text-sm uppercase tracking-widest text-secondary mb-6 text-center">[ AVAILABLE ENDPOINTS ]</p>
          {contactInfo.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.href}
                target="_blank"
                className="flex items-center gap-4 py-4 border-b border-primary border-dashed last:border-0 group hover:inverted transition-none px-2 -mx-2"
              >
                <Icon className="w-5 h-5 text-secondary group-hover:text-black" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary/70 group-hover:text-black">
                    {item.label}
                  </p>
                  <p className="text-primary group-hover:text-black lowercase">
                    {item.value}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
