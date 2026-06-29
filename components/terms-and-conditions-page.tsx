"use client"

interface TermsSection {
  title: string
  content: string
}

export function TermsAndConditionsPage({
  className,
  pageTitle = "Terms and Conditions",
  pageSubtitle = "Legal Information",
  
  // Terms Section 1: Terms of Use
  terms1Title = "Terms of Use",
  terms1Content = "By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law. All sales and donations are final.",
  
  // Terms Section 2: Disclaimer
  terms2Title = "Disclaimer",
  terms2Content = "The materials on Great Commission Media Ministries' website are provided \"as is\". Great Commission Media Ministries makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, Great Commission Media Ministries does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet website or otherwise relating to such materials or on any sites linked to this site.",
  
  // Terms Section 3: Limitation of Liability
  terms3Title = "Limitation of Liability",
  terms3Content = "In no event shall Great Commission Media Ministries or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption,) arising out of the use or inability to use the materials on Great Commission Media Ministries' Internet site, even if Great Commission Media Ministries or a Great Commission Media Ministries authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties or limitations of liability for consequential or incidental damages, these limitations may not apply to you.",
  
  // Terms Section 4: Revisions and Errata
  terms4Title = "Revisions and Errata",
  terms4Content = "The materials appearing on Great Commission Media Ministries' website could include technical, typographical, or photographic errors. Great Commission Media Ministries does not warrant that any of the materials on its website are accurate, complete, or current. Great Commission Media Ministries may make changes to the materials contained on its website at any time without notice. Great Commission Media Ministries does not, however, make any commitment to update the materials.",
  
  // Terms Section 5: Links
  terms5Title = "Links",
  terms5Content = "Great Commission Media Ministries has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Great Commission Media Ministries of the site. Use of any such linked website is at the user's own risk.",
  
  // Terms Section 6: Site Terms of Use Modifications
  terms6Title = "Site Terms of Use Modifications",
  terms6Content = "Great Commission Media Ministries may revise these terms of use for its website at any time without notice. By using this website and applying for a user account, you are agreeing to be bound by the then-current version of these Terms and Conditions of Use.",
  
  // Terms Section 7: Governing Law
  terms7Title = "Governing Law",
  terms7Content = "Any claim relating to Great Commission Media Ministries' website shall be governed by the laws of the Province of British Columbia without regard to its conflict of law provisions. General Terms and Conditions applicable to Use of a Website.",
  
  // Terms Section 8: Gift Acceptance and Distribution Policy
  terms8Title = "Gift Acceptance and Distribution Policy",
  terms8Content = "Distribution of funds is confined to GCMM-approved programs and projects. Donors may indicate their program preference for how GCMM will apply their donation, but ultimate authority on the use of resources rests with GCMM. Gifts received and accepted in accordance with GCMM's policies become exclusive property of GCMM and may not be returned under any circumstances.",
  
  // Terms Section 9: Privacy Policy
  terms9Title = "Privacy Policy",
  terms9Content = "Your privacy is very important to us. Accordingly, we have developed this Policy in order for you to understand how we collect, use, communicate and disclose, and make use of personal information. The following outlines our privacy policy: Before or at the time of collecting personal information, we will identify the purposes for which the information is being collected. We will collect and use personal information solely with the objective of fulfilling those purposes specified by us and for other compatible purposes, unless we obtain the consent of the individual concerned or as required by law. We will only retain personal information as long as necessary for the fulfillment of those purposes. We will collect personal information by lawful and fair means and, where appropriate, with the knowledge or consent of the individual concerned. Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary for those purposes, should be accurate, complete, and up-to-date. We will protect personal information by reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copying, use, or modification. We will make readily available to constituents information about our policies and practices relating to the management of personal information. We are committed to conducting our ministry in accordance with these principles in order to ensure that the confidentiality of personal information is protected and maintained.",
}: {
  className?: string
  pageTitle?: string
  pageSubtitle?: string
  
  terms1Title?: string
  terms1Content?: string
  
  terms2Title?: string
  terms2Content?: string
  
  terms3Title?: string
  terms3Content?: string
  
  terms4Title?: string
  terms4Content?: string
  
  terms5Title?: string
  terms5Content?: string
  
  terms6Title?: string
  terms6Content?: string
  
  terms7Title?: string
  terms7Content?: string
  
  terms8Title?: string
  terms8Content?: string
  
  terms9Title?: string
  terms9Content?: string
}) {
  const termsSections: TermsSection[] = [
    { title: terms1Title, content: terms1Content },
    { title: terms2Title, content: terms2Content },
    { title: terms3Title, content: terms3Content },
    { title: terms4Title, content: terms4Content },
    { title: terms5Title, content: terms5Content },
    { title: terms6Title, content: terms6Content },
    { title: terms7Title, content: terms7Content },
    { title: terms8Title, content: terms8Content },
    { title: terms9Title, content: terms9Content },
  ]

  return (
    <main className={`overflow-hidden font-light ${className || ""}`}>
      <section className="py-32 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-8 lg:px-12 max-w-5xl">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-center">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mb-8"></div>
              <h1 className="text-5xl lg:text-6xl font-light text-slate-900 mb-4 leading-tight tracking-tight">
                {pageTitle}
              </h1>
              <p className="text-slate-500 text-sm tracking-widest uppercase">{pageSubtitle}</p>
            </div>

            <div className="space-y-10">
              {termsSections.map((section, index) => (
                <div
                  key={index}
                  className="border-l-4 border-blue-200 pl-6 py-2 hover:border-blue-400 transition-colors duration-200"
                >
                  <h2 className="text-xl font-semibold text-slate-900 mb-3 tracking-tight">{section.title}</h2>
                  <p className="text-slate-600 leading-relaxed font-light text-base">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}