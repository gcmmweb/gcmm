import { StaffGrid } from "@/components/staff-grid"
import type { StaffMember } from "@/components/staff-card"

const staffMembers: StaffMember[] = [
  {
    name: "Sarah Chen",
    role: "Chief Executive Officer",
    bio: "Sarah leads our company with over 15 years of experience in technology and business strategy. She is passionate about building innovative products that make a difference.",
    image: "/professional-ceo-portrait.png",
    links: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Michael Rodriguez",
    role: "Chief Technology Officer",
    bio: "Michael oversees our technical vision and engineering teams. With a background in distributed systems and AI, he drives our product innovation forward.",
    image: "/professional-cto-portrait.png",
    links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Emily Watson",
    role: "Head of Design",
    bio: "Emily crafts beautiful and intuitive user experiences. She believes great design is invisible and focuses on creating products that users love.",
    image: "/professional-woman-designer.png",
    links: {
      linkedin: "https://linkedin.com",
      website: "https://example.com",
    },
  },
  {
    name: "David Kim",
    role: "VP of Engineering",
    bio: "David leads our engineering organization with a focus on building scalable systems. He has a passion for mentoring engineers and fostering technical excellence.",
    image: "/professional-engineer.png",
    links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Jessica Martinez",
    role: "Head of Marketing",
    bio: "Jessica drives our brand strategy and customer engagement. She specializes in growth marketing and building authentic connections with our community.",
    image: "/professional-woman-marketing-portrait.png",
    links: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Alex Thompson",
    role: "Head of Product",
    bio: "Alex shapes our product roadmap and ensures we are building what customers need. With a user-first mindset, they bridge the gap between vision and execution.",
    image: "/professional-person-product-manager-portrait.jpg",
    links: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
]

export default function StaffPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">Meet Our Team</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We are a diverse group of passionate individuals dedicated to building exceptional products and creating
            meaningful impact.
          </p>
        </div>
        <StaffGrid members={staffMembers} />
      </div>
    </main>
  )
}
