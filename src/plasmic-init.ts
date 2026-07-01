// plasmic-init.ts
import { initPlasmicLoader } from '@plasmicapp/loader-nextjs';
import MainPage from '@/components/MainPage';
import ministryImpact from '@/components/ministry-impact';
import { StripeDonationPage as StripeDonationPageV2 } from "@/components/stripe-donation-page-v2"

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "mYwsAuwZ4JBX1m8yGytoC",  // ID of a project you are using
      token: "phqSpmOnAFMf1a3iYfHkE76TvXpddwPn2uToiUcfXOOzLJNCkpkQ91nDpRe8Yh7xxz5VsNn0PHb7FtRcykQ"  // API token for that project
    }
  ],
  preview: process.env.NODE_ENV !== 'production',

});

import { MainPage2 } from "@/components/MainPage2"; // adjust the import path accordingly
import { ModernNewsSection } from '@/components/NewsArticles';
import { OurVisionSection} from "@/components/our-vision-section"
import { FooterSection } from "@/components/footer-section"

import { MinistriesPage } from "@/components/ministries-page"

import { NavigationHeader } from "@/components/navigation-header"
import { AboutPage } from "@/components/about-page"

import { ContactForm } from "@/components/contact-form"

import { VideosPage } from "@/components/videos-page"

import { DonationPage } from "@/components/donation-page"
import GivingPage from "@/components/donate2"

import { MainPageCinematic } from "@/components/main-page-cinematic"

import { StripeDonationPage } from "@/components/stripe-donation-page"

import { NewsletterSignup } from "@/components/newsletter-signup"

import { TransformerBlogPage } from "@/components/transformer-blog-page"

import { TestimonialsSection } from "@/components/testimonials-section"

import { MissionMapPage } from "@/components/MapPage"

import { OtherWaysToGive } from "@/components/otherwaystogive"

import { StaffGrid } from "@/components/staff-grid"

import { StaffCard } from "@/components/staff-card"

import { JoinOurMissionCTA } from '@/components/join-our-mission-cta'

import { SurveyForm } from "@/components/survey-form"

import { BlogPage } from "@/components/blog-page"

import { MinistryPage } from "@/components/ministry-page"

import { News2 } from "@/components/news2"

import { NewsletterHub} from "@/components/newsletterhub"

import { StaffPage } from "@/components/staff-page"

import { TimelinePage } from "@/components/timeline-page"

import { TermsAndConditionsPage} from "@/components/terms-and-conditions-page"

import { NewsletterPost } from "@/components/newsletter-post"

import { NewsPostTemplate } from "@/components/news-post-template"

import { AboutUsPage } from "@/components/about-us"

import { Ministry2} from "@/components/ministry2"

import { StayConnected } from "@/components/StayConnected"

import { RecentPosts } from "@/components/RecentPosts"

import { ArticleNavigation } from "@/components/ArticleNavigation"

import { TestimonialCard } from "@/components/TestimonialCard"

import { PhotoCarousel } from "@/components/photo-carousel"

import { PhotoOverlay } from "@/components/PhotoOverlay"

import { Button } from "@/components/button"

import { IconCard } from "@/components/icongrid"

import { TextSection1 } from "@/components/TextSection1"

import { TestimonialQuote } from "@/components/Testimonialquote"

import { TestimonialSlider} from "@/components/Testimonialslider"

import { IconCardVertical } from "@/components/icon-card-vertical"

import { Article } from "@/components/Article"

import { MinistryVideo } from "@/components/ministry-video"

import { VideosGrid } from "@/components/videos-grid"

import { MinistryFeatures } from "@/components/ministry-features"

import { MinistriesSection } from "@/components/ministries-section"

import { VideoMinistriesSection } from "@/components/video-ministries-section"

PLASMIC.registerComponent(MinistryFeatures, {
  name: "MinistryFeatures",
  displayName: "Ministry Features Section",
  description: "Displays five ministry feature cards with images, icons, and links",
  props: {
    feature1Title: {
      type: "string",
      displayName: "Feature 1 - Title",
      defaultValue: "Mega City Media Campaigns",
    },
    feature1Subtitle: {
      type: "string",
      displayName: "Feature 1 - Subtitle",
      defaultValue: "How do you evangelize to a whole city?",
    },
    feature1Description: {
      type: "string",
      displayName: "Feature 1 - Description",
      defaultValue:
        "Through 30-day Mega City Media Campaigns, GCMM partners with local churches to bring evangelism to an unprecedented scale—saturating cities with the Gospel through TV, radio, billboards, and digital media, fulfilling the Great Commission, one city at a time.",
    },
    feature1Image: {
      type: "imageUrl",
      displayName: "Feature 1 - Image",
      defaultValue: "/city-media-campaign-billboard.jpg",
    },
    feature1Link: {
      type: "string",
      displayName: "Feature 1 - Link",
      defaultValue: "/campaigns",
    },
    feature2Title: {
      type: "string",
      displayName: "Feature 2 - Title",
      defaultValue: "Media Outreach to the 10/40 Window",
    },
    feature2Subtitle: {
      type: "string",
      displayName: "Feature 2 - Subtitle",
      defaultValue: "Reaching Hearts Behind Closed Doors",
    },
    feature2Description: {
      type: "string",
      displayName: "Feature 2 - Description",
      defaultValue:
        "GCMM reaches millions in the Arabic world through satellite TV and social media—broadcasting in 7 languages via 18 satellites. With 1,300 programs produced annually and 200,000 monthly viewer interactions, we provide personal discipleship and partner with underground churches.",
    },
    feature2Image: {
      type: "imageUrl",
      displayName: "Feature 2 - Image",
      defaultValue: "/satellite-dish-broadcasting.jpg",
    },
    feature2Link: {
      type: "string",
      displayName: "Feature 2 - Link",
      defaultValue: "/arabic-ministry",
    },
    feature3Title: {
      type: "string",
      displayName: "Feature 3 - Title",
      defaultValue: "Recovery from Trauma",
    },
    feature3Subtitle: {
      type: "string",
      displayName: "Feature 3 - Subtitle",
      defaultValue: "Restoring Souls in a Wounded Nation",
    },
    feature3Description: {
      type: "string",
      displayName: "Feature 3 - Description",
      defaultValue:
        "GCMM's Christ-centred book, Recovery from Trauma, brings healing through Psalm 23, expert guidance, and real-life stories. Created with Ukrainian Christian psychologists, it offers peace to a hurting nation—meeting spiritual hunger with Gospel hope.",
    },
    feature3Image: {
      type: "imageUrl",
      displayName: "Feature 3 - Image",
      defaultValue: "/healing-book-recovery.jpg",
    },
    feature3Link: {
      type: "string",
      displayName: "Feature 3 - Link",
      defaultValue: "/trauma-recovery",
    },
    feature4Title: {
      type: "string",
      displayName: "Feature 4 - Title",
      defaultValue: "Israel Jewish Ministry",
    },
    feature4Subtitle: {
      type: "string",
      displayName: "Feature 4 - Subtitle",
      defaultValue: "Blessing Israel, Reaching the Jewish People",
    },
    feature4Description: {
      type: "string",
      displayName: "Feature 4 - Description",
      defaultValue:
        "GCMM is committed to blessing Israel and the Jewish people through media outreach, humanitarian aid, and education. We produce media for Jews in Israel and beyond, support refugees and new immigrants, and host healing camps for youth.",
    },
    feature4Image: {
      type: "imageUrl",
      displayName: "Feature 4 - Image",
      defaultValue: "/jerusalem-israel-ministry.jpg",
    },
    feature4Link: {
      type: "string",
      displayName: "Feature 4 - Link",
      defaultValue: "/israel-ministry",
    },
    feature5Title: {
      type: "string",
      displayName: "Feature 5 - Title",
      defaultValue: "Humanitarian Aid to Ukraine",
    },
    feature5Subtitle: {
      type: "string",
      displayName: "Feature 5 - Subtitle",
      defaultValue: "Faith in Action: Serving Ukraine in Its Darkest Hour",
    },
    feature5Description: {
      type: "string",
      displayName: "Feature 5 - Description",
      defaultValue:
        "In war-torn Ukraine, GCMM brings life-saving aid and the love of Christ. We've delivered over 5,000 tons of food, medical supplies, ambulances, and 12,000 wood-burning stoves, working through local churches and 400 chaplains.",
    },
    feature5Image: {
      type: "imageUrl",
      displayName: "Feature 5 - Image",
      defaultValue: "/humanitarian-aid-supplies.jpg",
    },
    feature5Link: {
      type: "string",
      displayName: "Feature 5 - Link",
      defaultValue: "/ukraine-aid",
    },
    cardBgColor: {
      type: "string",
      displayName: "Card Background Color",
      defaultValue: "#ffffff",
      description: "Hex color for feature card background",
    },
    cardBorderColor: {
      type: "string",
      displayName: "Card Border Color",
      defaultValue: "#e5e7eb",
      description: "Hex color for feature card border",
    },
    iconBgColor: {
      type: "string",
      displayName: "Icon Background Color",
      defaultValue: "#f1f5f9",
      description: "Hex color for icon background",
    },
    iconColor: {
      type: "string",
      displayName: "Icon Color",
      defaultValue: "#334155",
      description: "Hex color for icon",
    },
    titleColor: {
      type: "string",
      displayName: "Title Color",
      defaultValue: "#0f172a",
      description: "Hex color for card title",
    },
    subtitleColor: {
      type: "string",
      displayName: "Subtitle Color",
      defaultValue: "#475569",
      description: "Hex color for card subtitle",
    },
    descriptionColor: {
      type: "string",
      displayName: "Description Color",
      defaultValue: "#475569",
      description: "Hex color for card description",
    },
    buttonBorderColor: {
      type: "string",
      displayName: "Button Border Color",
      defaultValue: "#e5e7eb",
      description: "Hex color for button border",
    },
    buttonTextColor: {
      type: "string",
      displayName: "Button Text Color",
      defaultValue: "#000000",
      description: "Hex color for button text",
    },
    buttonHoverBgColor: {
      type: "string",
      displayName: "Button Hover Background Color",
      defaultValue: "#f9fafb",
      description: "Hex color for button background on hover",
    },
    sectionBgColor: {
      type: "string",
      displayName: "Section Background Color",
      defaultValue: "#ffffff",
      description: "Hex color for section background",
    },
    sectionPaddingY: {
      type: "number",
      displayName: "Section Vertical Padding",
      defaultValue: 96,
      description: "Vertical padding for section in pixels (e.g., 64, 96, 128)",
    },
  },
  importPath: "./components/ministry-features",
});

PLASMIC.registerComponent(VideosGrid, {
  name: "VideosGrid",
  displayName: "Videos Grid",
  description: "A standalone video grid component with customizable typography and flexible video items",
  props: {
    sectionTitle: {
      type: "string",
      displayName: "Section Title",
      defaultValue: "More videos from GCM Ministries",
      description: "Main title for the video grid section",
    },
    sectionSubtitle: {
      type: "string",
      displayName: "Section Subtitle",
      defaultValue: "missions outreach",
      description: "Subtitle text below the main title",
    },
    backgroundColor: {
      type: "color",
      displayName: "Background Color",
      defaultValue: "#f8fafc",
      description: "Background color for the section",
    },
    
    // Typography Controls
    titleFontSize: {
      type: "string",
      displayName: "Title Font Size",
      defaultValue: "3.75rem",
      description: "Font size for the section title (e.g., '3.75rem', '60px', '4em')",
    },
    titleFontFamily: {
      type: "string",
      displayName: "Title Font Family",
      defaultValue: "inherit",
      description: "Font family for the section title (e.g., 'Arial', 'Georgia', 'Helvetica')",
    },
    titleColor: {
      type: "color",
      displayName: "Title Color",
      defaultValue: "#0f172a",
      description: "Text color for the section title",
    },
    subtitleFontSize: {
      type: "string",
      displayName: "Subtitle Font Size",
      defaultValue: "1.25rem",
      description: "Font size for the subtitle (e.g., '1.25rem', '20px', '1.5em')",
    },
    subtitleFontFamily: {
      type: "string",
      displayName: "Subtitle Font Family",
      defaultValue: "inherit",
      description: "Font family for the subtitle (e.g., 'Arial', 'Georgia', 'Helvetica')",
    },
    subtitleColor: {
      type: "color",
      displayName: "Subtitle Color",
      defaultValue: "#475569",
      description: "Text color for the subtitle",
    },

    // Video Grid Items
    videoItems: {
      type: "array",
      displayName: "Video Grid Items",
      description: "Add or remove video items to customize the grid",
      itemType: {
        type: "object",
        nameFunc: (item: any) => item.title || "Video Item",
        fields: {
          id: {
            type: "string",
            displayName: "ID",
            defaultValue: "1",
            description: "Unique identifier for the video",
          },
          title: {
            type: "string",
            displayName: "Title",
            defaultValue: "Video Title",
            description: "Title of the video",
          },
          description: {
            type: "string",
            displayName: "Description",
            defaultValue: "Video description goes here",
            description: "Short description of the video",
          },
          videoUrl: {
            type: "string",
            displayName: "Video URL",
            defaultValue: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: "YouTube embed URL",
          },
          duration: {
            type: "string",
            displayName: "Duration",
            defaultValue: "8:32",
            description: "Video duration (e.g., 8:32)",
          },
          views: {
            type: "string",
            displayName: "Views",
            defaultValue: "8,421",
            description: "View count",
          },
          date: {
            type: "string",
            displayName: "Date",
            defaultValue: "Dec 10, 2024",
            description: "Publication date",
          },
          category: {
            type: "string",
            displayName: "Category",
            defaultValue: "Campaigns",
            description: "Video category (e.g., Campaigns, Outreach, Humanitarian)",
          },
        },
      },
      defaultValue: [
        {
          id: "1",
          title: "Mega City Campaigns in Russia",
          description: "Witness the powerful impact of our evangelistic campaigns in major Russian cities.",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          duration: "8:32",
          views: "8,421",
          date: "Dec 10, 2024",
          category: "Campaigns",
        },
        {
          id: "2",
          title: "Ministry to the Jewish People",
          description: "Our dedicated outreach to Jewish communities around the world.",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          duration: "15:18",
          views: "12,156",
          date: "Dec 8, 2024",
          category: "Outreach",
        },
        {
          id: "3",
          title: "Children's Aid Program",
          description: "Providing hope and essential supplies to children in need.",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          duration: "6:45",
          views: "5,892",
          date: "Dec 5, 2024",
          category: "Humanitarian",
        },
      ],
    },
    
    className: {
      type: "string",
      displayName: "CSS Class",
      description: "Additional CSS classes to apply",
    },
  },
  importPath: "./components/videos-grid",
});

PLASMIC.registerComponent(MinistryVideo, {
  name: "MinistryVideo",
  displayName: "Ministry Video",
  description: "A standalone video component with customizable heading, subheading, and video URL",
  props: {
    heading: {
      type: "string",
      defaultValue: "See Our Ministry in Action",
      displayName: "Heading",
      description: "Main heading text above the video",
    },
    subheading: {
      type: "string",
      defaultValue: "Watch how we are reaching communities around the world",
      displayName: "Subheading",
      description: "Subheading text below the main heading",
    },
    videoUrl: {
      type: "string",
      defaultValue: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      displayName: "Video URL",
      description: "YouTube embed URL for the video",
    },
    backgroundColor: {
      type: "color",
      defaultValue: "#1a2332",
      displayName: "Background Color",
      description: "Background color for the video section",
    },
    headingColor: {
      type: "color",
      defaultValue: "#ffffff",
      displayName: "Heading Color",
      description: "Text color for the main heading",
    },
    subheadingColor: {
      type: "color",
      defaultValue: "#e2e8f0",
      displayName: "Subheading Color",
      description: "Text color for the subheading",
    },
    maxWidth: {
      type: "string",
      defaultValue: "800px",
      displayName: "Max Width",
      description: "Maximum width of the video container (e.g., '800px', '100%', '50rem')",
    },
    headingFontSize: {
      type: "string",
      defaultValue: "3rem",
      displayName: "Heading Font Size",
      description: "Font size for the heading (e.g., '3rem', '48px', '2.5em')",
    },
    subheadingFontSize: {
      type: "string",
      defaultValue: "1.25rem",
      displayName: "Subheading Font Size",
      description: "Font size for the subheading (e.g., '1.25rem', '20px', '1.5em')",
    },
    headingFontFamily: {
      type: "string",
      defaultValue: "inherit",
      displayName: "Heading Font Family",
      description: "Font family for the heading (e.g., 'Arial', 'Georgia', 'Helvetica, sans-serif')",
    },
    subheadingFontFamily: {
      type: "string",
      defaultValue: "inherit",
      displayName: "Subheading Font Family",
      description: "Font family for the subheading (e.g., 'Arial', 'Georgia', 'Helvetica, sans-serif')",
    },
    sectionPaddingTop: {
      type: "number",
      defaultValue: 80,
      displayName: "Padding Top (px)",
      description: "Top padding inside the section in pixels",
    },
    sectionPaddingBottom: {
      type: "number",
      defaultValue: 80,
      displayName: "Padding Bottom (px)",
      description: "Bottom padding inside the section in pixels",
    },
    sectionMarginTop: {
      type: "number",
      defaultValue: 0,
      displayName: "Margin Top (px)",
      description: "Top margin outside the section (white gap above) in pixels",
    },
    sectionMarginBottom: {
      type: "number",
      defaultValue: 0,
      displayName: "Margin Bottom (px)",
      description: "Bottom margin outside the section (white gap below) in pixels",
    },
    className: {
      type: "string",
      displayName: "CSS Class",
      description: "Additional CSS classes to apply",
    },
  },
  importPath: "./components/ministry-video",
});

PLASMIC.registerComponent(Article, {
  name: "Article",
  displayName: "Article Text",
  description: "A flexible article/text component with support for bold and italic formatting using markdown-style syntax. Use **text** for bold, *text* for italic, and ***text*** for both.",
  props: {
    className: {
      type: "string",
      displayName: "Class Name",
      description: "Additional CSS classes",
    },

    // Content
    content: {
      type: "string",
      displayName: "Content",
      defaultValue: "This is a sample article with **bold text** and *italic text*. You can also combine ***bold and italic*** formatting.",
      description: "Article text. Use **text** for bold, *text* for italic, ***text*** for both",
    },

    // Typography
    fontSize: {
      type: "string",
      displayName: "Font Size",
      defaultValue: "1.125rem",
      description: "Font size (e.g., 1rem, 1.125rem, 16px, 18px)",
    },
    fontFamily: {
      type: "choice",
      displayName: "Font Family",
      options: [
        "Georgia, serif",
        "Times New Roman, serif",
        "Palatino, serif",
        "Garamond, serif",
        "Bookman, serif",
        "Arial, sans-serif",
        "Helvetica, sans-serif",
        "Verdana, sans-serif",
        "Trebuchet MS, sans-serif",
        "Courier New, monospace",
        "Lucida Console, monospace",
        "inherit",
      ],
      defaultValue: "Georgia, serif",
      description: "Font family for the article text",
    },
    lineHeight: {
      type: "string",
      displayName: "Line Height",
      defaultValue: "1.8",
      description: "Line height for readability (e.g., 1.5, 1.8, 2.0)",
    },
    textColor: {
      type: "string",
      displayName: "Text Color",
      defaultValue: "#1f2937",
      description: "Color of the main text",
    },
    textAlign: {
      type: "choice",
      displayName: "Text Alignment",
      options: ["left", "center", "right", "justify"],
      defaultValue: "left",
      description: "Horizontal alignment of text",
    },

    // Layout
    maxWidth: {
      type: "string",
      displayName: "Max Width",
      defaultValue: "800px",
      description: "Maximum width of the article content (e.g., 600px, 800px, 1000px)",
    },
    paddingX: {
      type: "string",
      displayName: "Horizontal Padding",
      defaultValue: "24px",
      description: "Left and right padding",
    },
    paddingY: {
      type: "string",
      displayName: "Vertical Padding",
      defaultValue: "48px",
      description: "Top and bottom padding",
    },
    backgroundColor: {
      type: "string",
      displayName: "Background Color",
      defaultValue: "transparent",
      description: "Background color of the article section",
    },

    // Bold Styling
    boldFontWeight: {
      type: "string",
      displayName: "Bold Font Weight",
      defaultValue: "700",
      description: "Font weight for bold text (e.g., 600, 700, 800, bold)",
    },
    boldColor: {
      type: "string",
      displayName: "Bold Text Color",
      defaultValue: "",
      description: "Optional: Custom color for bold text (leave empty to use default text color)",
    },

    // Italic Styling
    italicStyle: {
      type: "string",
      displayName: "Italic Font Style",
      defaultValue: "italic",
      description: "Font style for italic text (usually 'italic' or 'oblique')",
    },
    italicColor: {
      type: "string",
      displayName: "Italic Text Color",
      defaultValue: "",
      description: "Optional: Custom color for italic text (leave empty to use default text color)",
    },
  },
  importPath: "./components/Article",
});

PLASMIC.registerComponent(IconCardVertical, {
  name: "IconCardVertical",
  displayName: "Icon Card Vertical",
  description:
    "A responsive card component with icon, title, and description. Mobile: icon above text. Desktop: icon left of text.",
  props: {
    // Content
    iconUrl: {
      type: "imageUrl",
      displayName: "Icon Image",
      description: "Icon or image to display",
    },
    title: {
      type: "string",
      displayName: "Title",
      description: "Card title text",
      defaultValue: "Card Title",
    },
    description: {
      type: "string",
      displayName: "Description",
      description: "Card description text",
      defaultValue: "Card description goes here",
    },

    // Layout & Spacing Section
    iconSize: {
      type: "number",
      displayName: "Icon Size",
      description: "Size of the icon in pixels",
      defaultValue: 48,
      min: 8,
      max: 256,
      step: 4,
    },
    gap: {
      type: "number",
      displayName: "Gap",
      description: "Spacing between icon and content",
      defaultValue: 20,
      min: 0,
      max: 64,
      step: 4,
    },
    padding: {
      type: "string",
      displayName: "Padding",
      description: "Card padding (CSS value)",
      defaultValue: "32px",
    },

    // Icon Styling Section
    showIconBackground: {
      type: "boolean",
      displayName: "Show Icon Background",
      description: "Display background behind icon",
      defaultValue: true,
    },
    iconBackgroundColor: {
      type: "color",
      displayName: "Icon Background Color",
      description: "Background color of icon container",
      defaultValue: "#f0f4ff",
      hidden: (props) => !props.showIconBackground,
    },
    iconColor: {
      type: "color",
      displayName: "Icon Color",
      description: "Color of the icon",
      defaultValue: "#3b82f6",
    },
    iconBorderRadius: {
      type: "string",
      displayName: "Icon Border Radius",
      description: "Border radius of icon container (CSS value)",
      defaultValue: "12px",
      hidden: (props) => !props.showIconBackground,
    },
    iconPadding: {
      type: "string",
      displayName: "Icon Padding",
      description: "Padding inside icon container (CSS value)",
      defaultValue: "16px",
      hidden: (props) => !props.showIconBackground,
    },

    // Text Styling Section
    titleColor: {
      type: "color",
      displayName: "Title Color",
      description: "Color of the title text",
      defaultValue: "#1a1a1a",
    },
    titleSize: {
      type: "string",
      displayName: "Title Size",
      description: "Font size of title (CSS value)",
      defaultValue: "24px",
    },
    titleWeight: {
      type: "choice",
      displayName: "Title Weight",
      description: "Font weight of title",
      options: ["300", "400", "500", "600", "700", "800"],
      defaultValue: "600",
    },
    titleFont: {
      type: "string",
      displayName: "Title Font",
      description: "Font family for title (CSS value)",
      defaultValue: '"Inter", sans-serif',
    },
    descriptionColor: {
      type: "color",
      displayName: "Description Color",
      description: "Color of the description text",
      defaultValue: "#666666",
    },
    descriptionSize: {
      type: "string",
      displayName: "Description Size",
      description: "Font size of description (CSS value)",
      defaultValue: "16px",
    },
    descriptionFont: {
      type: "string",
      displayName: "Description Font",
      description: "Font family for description (CSS value)",
      defaultValue: '"Inter", sans-serif',
    },
    descriptionLineHeight: {
      type: "string",
      displayName: "Description Line Height",
      description: "Line height of description (CSS value)",
      defaultValue: "1.6",
    },

    // Card Styling Section
    backgroundColor: {
      type: "color",
      displayName: "Background Color",
      description: "Card background color",
      defaultValue: "#ffffff",
    },
    borderColor: {
      type: "color",
      displayName: "Border Color",
      description: "Card border color",
      defaultValue: "#e5e7eb",
    },
    borderWidth: {
      type: "string",
      displayName: "Border Width",
      description: "Card border width (CSS value)",
      defaultValue: "1px",
    },
    borderRadius: {
      type: "string",
      displayName: "Border Radius",
      description: "Card border radius (CSS value)",
      defaultValue: "16px",
    },
    boxShadow: {
      type: "string",
      displayName: "Box Shadow",
      description: "Card shadow (CSS value)",
      defaultValue: "0 1px 3px rgba(0, 0, 0, 0.05)",
    },

    // Hover Effects Section
    hoverTransform: {
      type: "string",
      displayName: "Hover Transform",
      description: "Transform on hover (CSS value)",
      defaultValue: "translateY(-4px)",
    },
    hoverShadow: {
      type: "string",
      displayName: "Hover Shadow",
      description: "Shadow on hover (CSS value)",
      defaultValue: "0 12px 24px rgba(0, 0, 0, 0.1)",
    },
    hoverBorderColor: {
      type: "color",
      displayName: "Hover Border Color",
      description: "Border color on hover",
      defaultValue: "#3b82f6",
    },

    // Responsive & Alignment Section
    mobileBreakpoint: {
      type: "number",
      displayName: "Mobile Breakpoint",
      description: "Breakpoint in pixels for desktop layout",
      defaultValue: 768,
      min: 320,
      max: 1920,
      step: 1,
    },
    textAlign: {
      type: "choice",
      displayName: "Text Alignment",
      description: "Alignment of text content",
      options: ["left", "center", "right"],
      defaultValue: "left",
    },

    // Advanced
    className: {
      type: "class",
      displayName: "CSS Class",
      description: "Additional CSS class name",
    },
  },

  // Additional metadata
  importPath: "./IconCardVertical",
  importName: "IconCardVertical",

  // Default styles that work well with Plasmic
  defaultStyles: {
    width: "100%",
    maxWidth: "400px",
  },
});

PLASMIC.registerComponent(TestimonialSlider, {
  name: "TestimonialSlider",
  displayName: "Testimonial Slider",
  description: "Testimonial carousel that displays one quote at a time with navigation arrows and dots. Perfect for showcasing multiple testimonials in a compact space.",
  props: {
    className: {
      type: "class",
      displayName: "CSS Class",
      description: "Custom CSS classes for styling",
    },

    // Content
    testimonials: {
      type: "array",
      displayName: "Testimonials",
      description: "Add, remove, or reorder testimonials. Each testimonial will appear in the slider.",
      section: "Content",
      itemType: {
        type: "object",
        nameFunc: (item: any) => item.name || "New Testimonial",
        fields: {
          quote: {
            type: "string",
            displayName: "Quote",
            defaultValue: "Enter your testimonial quote here.",
            description: "The testimonial text",
          },
          name: {
            type: "string",
            displayName: "Name",
            defaultValue: "Person Name",
            description: "Name of the person giving the testimonial",
          },
          title: {
            type: "string",
            displayName: "Title/Role",
            defaultValue: "Job Title",
            description: "Their job title or role",
          },
          organization: {
            type: "string",
            displayName: "Organization",
            defaultValue: "Organization Name",
            description: "Organization or company name",
          },
          location: {
            type: "string",
            displayName: "Location",
            defaultValue: "City, Country",
            description: "Location badge text (e.g., 'Singapore', 'United States')",
          },
        },
      },
      defaultValue: [
        {
          quote: "Through GCM's media campaigns, we've seen a 300% increase in engagement with our community outreach programs. Their strategic approach to digital ministry has transformed how we connect with people.",
          name: "Sarah Chen",
          title: "Ministry Leader",
          organization: "Hope Church International",
          location: "Singapore",
        },
        {
          quote: "The impact of their work is truly remarkable. We've reached thousands of people who might never have heard our message otherwise.",
          name: "John Smith",
          title: "Pastor",
          organization: "Community Church",
          location: "United States",
        },
        {
          quote: "Working with GCM has been a game-changer for our ministry. Their expertise in digital media is unmatched.",
          name: "Maria Garcia",
          title: "Communications Director",
          organization: "Faith Ministry",
          location: "Spain",
        },
      ],
    },

    // Visibility Controls
    showAttribution: {
      type: "boolean",
      displayName: "Show Attribution Section",
      defaultValue: true,
      description: "Show/hide entire attribution section",
      section: "Visibility",
    },
    showQuoteIcon: {
      type: "boolean",
      displayName: "Show Quote Icon",
      defaultValue: true,
      description: "Show/hide the quote icon",
      section: "Visibility",
    },
    showName: {
      type: "boolean",
      displayName: "Show Name",
      defaultValue: true,
      description: "Show/hide the name",
      section: "Visibility",
    },
    showTitle: {
      type: "boolean",
      displayName: "Show Title",
      defaultValue: true,
      description: "Show/hide the title/role",
      section: "Visibility",
    },
    showOrganization: {
      type: "boolean",
      displayName: "Show Organization",
      defaultValue: true,
      description: "Show/hide the organization",
      section: "Visibility",
    },
    showLocation: {
      type: "boolean",
      displayName: "Show Location",
      defaultValue: true,
      description: "Show/hide the location badge",
      section: "Visibility",
    },

    // Navigation
    showArrows: {
      type: "boolean",
      displayName: "Show Navigation Arrows",
      defaultValue: true,
      description: "Show/hide the left and right navigation arrows",
      section: "Navigation",
    },
    showDots: {
      type: "boolean",
      displayName: "Show Dot Indicators",
      defaultValue: true,
      description: "Show/hide the dot navigation indicators",
      section: "Navigation",
    },
    autoPlay: {
      type: "boolean",
      displayName: "Auto Play",
      defaultValue: false,
      description: "Automatically cycle through testimonials",
      section: "Navigation",
    },
    autoPlayInterval: {
      type: "number",
      displayName: "Auto Play Interval (ms)",
      defaultValue: 5000,
      description: "Time between slides in milliseconds (e.g., 5000 = 5 seconds)",
      section: "Navigation",
    },

    // Read More Button
    showReadMore: {
      type: "boolean",
      displayName: "Show Read More Button",
      defaultValue: false,
      description: "Show/hide the Read More button",
      section: "Read More Button",
    },
    readMoreText: {
      type: "string",
      displayName: "Button Text",
      defaultValue: "Read More",
      description: "Text displayed on the button",
      section: "Read More Button",
      hidden: (props) => !props.showReadMore,
    },
    readMoreUrl: {
      type: "string",
      displayName: "Button URL",
      defaultValue: "#",
      description: "Link URL for the button",
      section: "Read More Button",
      hidden: (props) => !props.showReadMore,
    },
    readMoreOpenInNewTab: {
      type: "boolean",
      displayName: "Open in New Tab",
      defaultValue: false,
      description: "Open link in a new browser tab",
      section: "Read More Button",
      hidden: (props) => !props.showReadMore,
    },
    readMoreFontSize: {
      type: "string",
      displayName: "Button Font Size",
      defaultValue: "1rem",
      description: "e.g., 1rem, 16px, 1em",
      section: "Read More Button",
      hidden: (props) => !props.showReadMore,
    },
    readMoreFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Button Font Weight",
      defaultValue: "normal",
      section: "Read More Button",
      hidden: (props) => !props.showReadMore,
    },
    readMoreBackgroundColor: {
      type: "color",
      displayName: "Button Background Color",
      defaultValue: "#2563eb",
      description: "Background color of the button",
      section: "Read More Button",
      hidden: (props) => !props.showReadMore,
    },
    readMoreTextColor: {
      type: "color",
      displayName: "Button Text Color",
      defaultValue: "#ffffff",
      description: "Text color of the button",
      section: "Read More Button",
      hidden: (props) => !props.showReadMore,
    },
    readMoreHoverBackgroundColor: {
      type: "color",
      displayName: "Button Hover Background",
      defaultValue: "#1e40af",
      description: "Background color when hovering",
      section: "Read More Button",
      hidden: (props) => !props.showReadMore,
    },
    readMoreHoverTextColor: {
      type: "color",
      displayName: "Button Hover Text Color",
      defaultValue: "#ffffff",
      description: "Text color when hovering",
      section: "Read More Button",
      hidden: (props) => !props.showReadMore,
    },

    // Styling
    backgroundColor: {
      type: "color",
      displayName: "Background Color",
      defaultValue: "transparent",
      section: "Colors",
    },
    textColor: {
      type: "color",
      displayName: "Quote Text Color",
      defaultValue: "#1e293b",
      description: "Color for the main quote text",
      section: "Colors",
    },
    accentColor: {
      type: "color",
      displayName: "Accent Color",
      defaultValue: "#2563eb",
      description: "Color for dots (name color is separate below)",
      section: "Colors",
    },
    arrowColor: {
      type: "color",
      displayName: "Arrow Color",
      defaultValue: "#2563eb",
      description: "Color for navigation arrows",
      section: "Colors",
    },
    quoteIconColor: {
      type: "color",
      displayName: "Quote Icon Color",
      defaultValue: "#2563eb",
      description: "Color for the quote icon",
      section: "Colors",
    },
    nameColor: {
      type: "color",
      displayName: "Name Color",
      defaultValue: "#2563eb",
      description: "Color for person's name (e.g., Sarah Chen)",
      section: "Colors - Attribution",
    },
    titleColor: {
      type: "color",
      displayName: "Title Color",
      defaultValue: "#1e293b",
      description: "Color for person's title (e.g., Ministry Leader)",
      section: "Colors - Attribution",
    },
    organizationColor: {
      type: "color",
      displayName: "Organization Color",
      defaultValue: "#64748b",
      description: "Color for organization name (e.g., Hope Church International)",
      section: "Colors - Attribution",
    },
    locationColor: {
      type: "color",
      displayName: "Location Badge Text Color",
      defaultValue: "#ffffff",
      description: "Text color inside the location badge",
      section: "Colors - Attribution",
    },
    locationBadgeColor: {
      type: "color",
      displayName: "Location Badge Background Color",
      defaultValue: "#2563eb",
      description: "Background color of the location badge",
      section: "Colors - Attribution",
    },

    // Typography - Quote
    quoteFont: {
      type: "string",
      displayName: "Quote Font Family",
      defaultValue: "font-sans",
      description: "Tailwind font class (e.g., font-serif, font-sans)",
      section: "Typography - Quote",
    },
    quoteFontSize: {
      type: "string",
      displayName: "Quote Font Size",
      defaultValue: "1.25rem",
      description: "e.g., 1.25rem, 20px, 1.25em",
      section: "Typography - Quote",
    },
    quoteLineHeight: {
      type: "string",
      displayName: "Quote Line Height",
      defaultValue: "1.8",
      description: "e.g., 1.8, 2, 1.5",
      section: "Typography - Quote",
    },
    quoteFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Quote Font Weight",
      defaultValue: "normal",
      section: "Typography - Quote",
    },
    quoteFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Quote Font Style",
      defaultValue: "normal",
      section: "Typography - Quote",
    },

    // Typography - Name
    nameFontSize: {
      type: "string",
      displayName: "Name Font Size",
      defaultValue: "1.125rem",
      description: "e.g., 1.125rem, 18px, 1.125em",
      section: "Typography - Name",
    },
    nameLineHeight: {
      type: "string",
      displayName: "Name Line Height",
      defaultValue: "1.4",
      description: "e.g., 1.4, 1.5, 1.6",
      section: "Typography - Name",
    },
    nameFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Name Font Weight",
      defaultValue: "bold",
      section: "Typography - Name",
    },
    nameFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Name Font Style",
      defaultValue: "normal",
      section: "Typography - Name",
    },

    // Typography - Title
    titleFontSize: {
      type: "string",
      displayName: "Title Font Size",
      defaultValue: "1rem",
      description: "e.g., 1rem, 16px, 1em",
      section: "Typography - Title",
    },
    titleLineHeight: {
      type: "string",
      displayName: "Title Line Height",
      defaultValue: "1.5",
      description: "e.g., 1.5, 1.6, 1.8",
      section: "Typography - Title",
    },
    titleFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Title Font Weight",
      defaultValue: "normal",
      section: "Typography - Title",
    },
    titleFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Title Font Style",
      defaultValue: "normal",
      section: "Typography - Title",
    },

    // Typography - Organization
    organizationFontSize: {
      type: "string",
      displayName: "Organization Font Size",
      defaultValue: "1rem",
      description: "e.g., 1rem, 16px, 1em",
      section: "Typography - Organization",
    },
    organizationLineHeight: {
      type: "string",
      displayName: "Organization Line Height",
      defaultValue: "1.5",
      description: "e.g., 1.5, 1.6, 1.8",
      section: "Typography - Organization",
    },
    organizationFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Organization Font Weight",
      defaultValue: "normal",
      section: "Typography - Organization",
    },
    organizationFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Organization Font Style",
      defaultValue: "normal",
      section: "Typography - Organization",
    },

    // Typography - Location
    locationFontSize: {
      type: "string",
      displayName: "Location Font Size",
      defaultValue: "0.875rem",
      description: "e.g., 0.875rem, 14px, 0.875em",
      section: "Typography - Location",
    },
    locationLineHeight: {
      type: "string",
      displayName: "Location Line Height",
      defaultValue: "1.5",
      description: "e.g., 1.5, 1.6, 1.8",
      section: "Typography - Location",
    },
    locationFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Location Font Weight",
      defaultValue: "normal",
      section: "Typography - Location",
    },
    locationFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Location Font Style",
      defaultValue: "normal",
      section: "Typography - Location",
    },

    // Layout
    alignment: {
      type: "choice",
      options: ["left", "center", "right"],
      displayName: "Text Alignment",
      defaultValue: "left",
      description: "Horizontal alignment of content",
      section: "Layout",
    },
    maxWidth: {
      type: "string",
      displayName: "Max Width",
      defaultValue: "900px",
      description: "Maximum width of content (e.g., 900px, 60rem, 100%)",
      section: "Layout",
    },
    mobileMaxWidth: {
      type: "string",
      displayName: "Mobile Max Width",
      defaultValue: "100%",
      description: "Maximum width on mobile screens (below 768px). Use 100% for full width or a specific value like 95%, 90%, etc.",
      section: "Layout",
    },
    padding: {
      type: "string",
      displayName: "Padding",
      defaultValue: "3rem 1.5rem",
      description: "Padding around content (e.g., 3rem 1.5rem, 48px 24px)",
      section: "Layout",
    },
    mobilePadding: {
      type: "string",
      displayName: "Mobile Padding",
      defaultValue: "2rem 0.5rem",
      description: "Padding on mobile screens (below 768px). Use smaller values like '1rem 0.5rem' for tighter spacing",
      section: "Layout",
    },
  },
  importPath: "./components/TestimonialSlider",
});

PLASMIC.registerComponent(TestimonialQuote, {
  name: "TestimonialQuote",
  displayName: "Testimonial Quote",
  description: "Simple testimonial component focused on the quote with optional attribution details. Each element can be shown/hidden independently.",
  props: {
    className: {
      type: "class",
      displayName: "CSS Class",
      description: "Custom CSS classes for styling",
    },

    // Content
    quote: {
      type: "string",
      displayName: "Quote",
      defaultValue: "Through GCM's media campaigns, we've seen a 300% increase in engagement with our community outreach programs. Their strategic approach to digital ministry has transformed how we connect with people.",
      description: "The testimonial quote text",
      section: "Content",
    },
    name: {
      type: "string",
      displayName: "Name",
      defaultValue: "Sarah Chen",
      description: "Name of the person giving the testimonial",
      section: "Content",
    },
    title: {
      type: "string",
      displayName: "Title/Role",
      defaultValue: "Ministry Leader",
      description: "Job title or role",
      section: "Content",
    },
    organization: {
      type: "string",
      displayName: "Organization",
      defaultValue: "Hope Church International",
      description: "Organization or church name",
      section: "Content",
    },
    location: {
      type: "string",
      displayName: "Location",
      defaultValue: "Singapore",
      description: "Location (city, country)",
      section: "Content",
    },

    // Visibility Controls
    showAttribution: {
      type: "boolean",
      displayName: "Show Attribution Section",
      defaultValue: true,
      description: "Show/hide entire attribution section",
      section: "Visibility",
    },
    showQuoteIcon: {
      type: "boolean",
      displayName: "Show Quote Icon",
      defaultValue: true,
      description: "Show/hide the quote icon",
      section: "Visibility",
    },
    showName: {
      type: "boolean",
      displayName: "Show Name",
      defaultValue: true,
      description: "Show/hide the name",
      section: "Visibility",
    },
    showTitle: {
      type: "boolean",
      displayName: "Show Title",
      defaultValue: true,
      description: "Show/hide the title/role",
      section: "Visibility",
    },
    showOrganization: {
      type: "boolean",
      displayName: "Show Organization",
      defaultValue: true,
      description: "Show/hide the organization",
      section: "Visibility",
    },
    showLocation: {
      type: "boolean",
      displayName: "Show Location",
      defaultValue: true,
      description: "Show/hide the location",
      section: "Visibility",
    },

    // Styling
    backgroundColor: {
      type: "color",
      displayName: "Background Color",
      defaultValue: "transparent",
      section: "Colors",
    },
    textColor: {
      type: "color",
      displayName: "Quote Text Color",
      defaultValue: "#1e293b",
      description: "Color for the main quote text",
      section: "Colors",
    },
    accentColor: {
      type: "color",
      displayName: "Accent Color",
      defaultValue: "#fbbf24",
      description: "Color for quote icon (title color is separate below)",
      section: "Colors",
    },
    nameColor: {
      type: "color",
      displayName: "Name Color",
      defaultValue: "#1e293b",
      description: "Color for person's name (e.g., Sarah Chen)",
      section: "Colors - Attribution",
    },
    titleColor: {
      type: "color",
      displayName: "Title Color",
      defaultValue: "#fbbf24",
      description: "Color for person's title (e.g., Ministry Leader)",
      section: "Colors - Attribution",
    },
    organizationColor: {
      type: "color",
      displayName: "Organization Color",
      defaultValue: "#64748b",
      description: "Color for organization name (e.g., Hope Church International)",
      section: "Colors - Attribution",
    },
    locationColor: {
      type: "color",
      displayName: "Location Color",
      defaultValue: "#94a3b8",
      description: "Color for location (e.g., Singapore)",
      section: "Colors - Attribution",
    },

    // Typography - Quote
    quoteFont: {
      type: "string",
      displayName: "Quote Font Family",
      defaultValue: "font-serif",
      description: "Tailwind font class (e.g., font-serif, font-sans)",
      section: "Typography - Quote",
    },
    quoteFontSize: {
      type: "string",
      displayName: "Quote Font Size",
      defaultValue: "1.125rem",
      description: "e.g., 1.125rem, 18px, 1.125em",
      section: "Typography - Quote",
    },
    quoteLineHeight: {
      type: "string",
      displayName: "Quote Line Height",
      defaultValue: "1.8",
      description: "e.g., 1.8, 2, 1.5",
      section: "Typography - Quote",
    },
    quoteFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Quote Font Weight",
      defaultValue: "normal",
      section: "Typography - Quote",
    },
    quoteFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Quote Font Style",
      defaultValue: "italic",
      section: "Typography - Quote",
    },

    // Typography - Name
    nameFontSize: {
      type: "string",
      displayName: "Name Font Size",
      defaultValue: "1.125rem",
      description: "e.g., 1.125rem, 18px, 1.125em",
      section: "Typography - Name",
    },
    nameLineHeight: {
      type: "string",
      displayName: "Name Line Height",
      defaultValue: "1.4",
      description: "e.g., 1.4, 1.5, 1.6",
      section: "Typography - Name",
    },
    nameFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Name Font Weight",
      defaultValue: "bold",
      section: "Typography - Name",
    },
    nameFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Name Font Style",
      defaultValue: "normal",
      section: "Typography - Name",
    },

    // Typography - Title
    titleFontSize: {
      type: "string",
      displayName: "Title Font Size",
      defaultValue: "1rem",
      description: "e.g., 1rem, 16px, 1em",
      section: "Typography - Title",
    },
    titleLineHeight: {
      type: "string",
      displayName: "Title Line Height",
      defaultValue: "1.5",
      description: "e.g., 1.5, 1.6, 1.8",
      section: "Typography - Title",
    },
    titleFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Title Font Weight",
      defaultValue: "normal",
      section: "Typography - Title",
    },
    titleFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Title Font Style",
      defaultValue: "normal",
      section: "Typography - Title",
    },

    // Typography - Organization
    organizationFontSize: {
      type: "string",
      displayName: "Organization Font Size",
      defaultValue: "1rem",
      description: "e.g., 1rem, 16px, 1em",
      section: "Typography - Organization",
    },
    organizationLineHeight: {
      type: "string",
      displayName: "Organization Line Height",
      defaultValue: "1.5",
      description: "e.g., 1.5, 1.6, 1.8",
      section: "Typography - Organization",
    },
    organizationFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Organization Font Weight",
      defaultValue: "normal",
      section: "Typography - Organization",
    },
    organizationFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Organization Font Style",
      defaultValue: "normal",
      section: "Typography - Organization",
    },

    // Typography - Location
    locationFontSize: {
      type: "string",
      displayName: "Location Font Size",
      defaultValue: "0.875rem",
      description: "e.g., 0.875rem, 14px, 0.875em",
      section: "Typography - Location",
    },
    locationLineHeight: {
      type: "string",
      displayName: "Location Line Height",
      defaultValue: "1.5",
      description: "e.g., 1.5, 1.6, 1.8",
      section: "Typography - Location",
    },
    locationFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Location Font Weight",
      defaultValue: "normal",
      section: "Typography - Location",
    },
    locationFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Location Font Style",
      defaultValue: "normal",
      section: "Typography - Location",
    },

    // Layout
    alignment: {
      type: "choice",
      options: ["left", "center", "right"],
      displayName: "Text Alignment",
      defaultValue: "left",
      description: "Horizontal alignment of content",
      section: "Layout",
    },
    maxWidth: {
      type: "string",
      displayName: "Max Width",
      defaultValue: "800px",
      description: "Maximum width of content (e.g., 800px, 50rem, 100%)",
      section: "Layout",
    },
    padding: {
      type: "string",
      displayName: "Padding",
      defaultValue: "3rem 1.5rem",
      description: "Padding around content (e.g., 3rem 1.5rem, 48px 24px)",
      section: "Layout",
    },
  },
  importPath: "./components/TestimonialQuote",
});

PLASMIC.registerComponent(TextSection1, {
  name: "TextSection1",
  displayName: "Text Section 1",
  description:
    "Flexible text section with optional image, customizable typography (bold/italic), button with text color control, and full styling options",
  props: {
    className: {
      type: "class",
      displayName: "CSS Class",
      description: "Custom CSS classes for styling",
    },

    // Content Props
    heading: {
      type: "string",
      displayName: "Heading",
      defaultValue: "Our Approach",
    },
    body: {
      type: "string",
      displayName: "Body Text",
      defaultValue:
        "Through strategic partnerships with local churches and communities, we create targeted media campaigns that reach people where they are. Our multi-platform approach includes television broadcasts, radio programs, digital content, and community events that work together to share a message of hope and transformation.",
    },

    // Styling Props
    backgroundColor: {
      type: "color",
      displayName: "Background Color",
      defaultValue: "#ffffff",
    },
    textColor: {
      type: "color",
      displayName: "Text Color",
      defaultValue: "#1e293b",
    },
    alignment: {
      type: "choice",
      options: ["left", "center", "right", "justify"],
      displayName: "Text Alignment",
      defaultValue: "left",
    },

    // Image Props
    showImage: {
      type: "boolean",
      displayName: "Show Image",
      defaultValue: false,
    },
    image: {
      type: "imageUrl",
      displayName: "Image",
      defaultValue: "/community-gathering-ministry.jpg",
    },
    imageAlt: {
      type: "string",
      displayName: "Image Alt Text",
      defaultValue: "Ministry approach",
    },

    // Button Props
    showButton: {
      type: "boolean",
      displayName: "Show Button",
      defaultValue: false,
    },
    buttonText: {
      type: "string",
      displayName: "Button Text",
      defaultValue: "Discover Our Method",
    },
    buttonLink: {
      type: "string",
      displayName: "Button Link",
      defaultValue: "#",
    },
    buttonColor: {
      type: "color",
      displayName: "Button Background Color",
      defaultValue: "#1e40af",
    },
    buttonTextColor: {
      type: "color",
      displayName: "Button Text Color",
      defaultValue: "#ffffff",
    },

    // Typography - Heading
    headingFontSize: {
      type: "string",
      displayName: "Heading Font Size",
      defaultValue: "1.875rem",
      description: "e.g., 1.875rem, 30px, 1.875em",
    },
    headingLineHeight: {
      type: "string",
      displayName: "Heading Line Height",
      defaultValue: "1.3",
      description: "e.g., 1.3, 1.5, 2",
    },
    headingFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Heading Font Weight",
      defaultValue: "normal",
    },
    headingFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Heading Font Style",
      defaultValue: "normal",
    },

    // Typography - Body
    bodyFontSize: {
      type: "string",
      displayName: "Body Font Size",
      defaultValue: "1.125rem",
      description: "e.g., 1.125rem, 18px, 1.125em",
    },
    bodyLineHeight: {
      type: "string",
      displayName: "Body Line Height",
      defaultValue: "1.6",
      description: "e.g., 1.6, 1.8, 2",
    },
    bodyFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Body Font Weight",
      defaultValue: "normal",
    },
    bodyFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Body Font Style",
      defaultValue: "normal",
    },

    // Typography - Button
    buttonFontSize: {
      type: "string",
      displayName: "Button Font Size",
      defaultValue: "1rem",
      description: "e.g., 1rem, 16px, 1em",
    },
  },
  importPath: "./components/TextSection1",
});

PLASMIC.registerComponent(Button, {
  name: "Button",
  displayName: "Button",
    description: "A highly customizable button component with extensive styling options",
    props: {
      children: {
        type: "slot",
        defaultValue: "Click me",
        description: "Button text content",
      },
      variant: {
        type: "choice",
        options: [
          { value: "primary", label: "Primary" },
          { value: "secondary", label: "Secondary" },
          { value: "destructive", label: "Destructive" },
          { value: "outline", label: "Outline" },
          { value: "ghost", label: "Ghost" },
          { value: "link", label: "Link" },
          { value: "success", label: "Success" },
          { value: "warning", label: "Warning" },
          { value: "gradient", label: "Gradient" },
          { value: "glassmorphism", label: "Glassmorphism" },
        ],
        defaultValue: "primary",
        description: "Visual style variant of the button",
      },
      size: {
        type: "choice",
        options: [
          { value: "xs", label: "Extra Small" },
          { value: "sm", label: "Small" },
          { value: "md", label: "Medium" },
          { value: "lg", label: "Large" },
          { value: "xl", label: "Extra Large" },
          { value: "icon", label: "Icon Only" },
        ],
        defaultValue: "md",
        description: "Size of the button",
      },
      fullWidth: {
        type: "boolean",
        defaultValue: false,
        description: "Make button full width of container",
      },
      rounded: {
        type: "choice",
        options: [
          { value: "none", label: "None" },
          { value: "sm", label: "Small" },
          { value: "md", label: "Medium" },
          { value: "lg", label: "Large" },
          { value: "xl", label: "Extra Large" },
          { value: "2xl", label: "2X Large" },
          { value: "full", label: "Full (Pill)" },
        ],
        defaultValue: "lg",
        description: "Border radius style",
      },
      shadow: {
        type: "choice",
        options: [
          { value: "none", label: "None" },
          { value: "sm", label: "Small" },
          { value: "md", label: "Medium" },
          { value: "lg", label: "Large" },
          { value: "xl", label: "Extra Large" },
        ],
        defaultValue: "none",
        description: "Shadow intensity",
      },
      elevation: {
        type: "choice",
        options: [
          { value: "none", label: "None" },
          { value: "sm", label: "Small" },
          { value: "md", label: "Medium" },
          { value: "lg", label: "Large" },
        ],
        defaultValue: "none",
        description: "Hover lift/elevation effect",
      },
      loading: {
        type: "boolean",
        defaultValue: false,
        description: "Show loading spinner",
      },
      disabled: {
        type: "boolean",
        defaultValue: false,
        description: "Disable the button",
      },
      href: {
        type: "string",
        description: "URL to navigate to (renders as link instead of button)",
      },
      openInNewTab: {
        type: "boolean",
        defaultValue: false,
        description: "Open link in new tab (only applies when href is set)",
        hidden: (props) => !props.href,
      },
      backgroundColor: {
        type: "color",
        description: "Custom background color (overrides variant)",
      },
      textColor: {
        type: "color",
        description: "Custom text color",
      },
      borderColor: {
        type: "color",
        description: "Custom border color",
      },
      borderWidth: {
        type: "string",
        description: "Custom border width (e.g., '2px', '4px')",
      },
      fontWeight: {
        type: "choice",
        options: [
          { value: "normal", label: "Normal" },
          { value: "medium", label: "Medium" },
          { value: "semibold", label: "Semi Bold" },
          { value: "bold", label: "Bold" },
          { value: "extrabold", label: "Extra Bold" },
        ],
        description: "Font weight",
      },
      letterSpacing: {
        type: "choice",
        options: [
          { value: "tighter", label: "Tighter" },
          { value: "tight", label: "Tight" },
          { value: "normal", label: "Normal" },
          { value: "wide", label: "Wide" },
          { value: "wider", label: "Wider" },
          { value: "widest", label: "Widest" },
        ],
        description: "Letter spacing",
      },
      textTransform: {
        type: "choice",
        options: [
          { value: "none", label: "None" },
          { value: "uppercase", label: "UPPERCASE" },
          { value: "lowercase", label: "lowercase" },
          { value: "capitalize", label: "Capitalize" },
        ],
        description: "Text transformation",
      },
      clickAnimation: {
        type: "choice",
        options: [
          { value: "none", label: "None" },
          { value: "scale", label: "Scale" },
          { value: "pulse", label: "Pulse" },
          { value: "bounce", label: "Bounce" },
        ],
        defaultValue: "none",
        description: "Animation when clicked",
      },
      gradientDirection: {
        type: "choice",
        options: [
          { value: "to-r", label: "Left to Right" },
          { value: "to-l", label: "Right to Left" },
          { value: "to-t", label: "Bottom to Top" },
          { value: "to-b", label: "Top to Bottom" },
          { value: "to-tr", label: "Bottom-Left to Top-Right" },
          { value: "to-tl", label: "Bottom-Right to Top-Left" },
          { value: "to-br", label: "Top-Left to Bottom-Right" },
          { value: "to-bl", label: "Top-Right to Bottom-Left" },
        ],
        defaultValue: "to-r",
        description: "Gradient direction (for gradient variant)",
        hidden: (props) => props.variant !== "gradient",
      },
      gradientColors: {
        type: "array",
        description: "Custom gradient colors (2-4 colors)",
        hidden: (props) => props.variant !== "gradient",
      },
      iconOnly: {
        type: "boolean",
        defaultValue: false,
        description: "Hide text on mobile (icon only mode)",
      },
      tooltip: {
        type: "string",
        description: "Tooltip text on hover",
      },
      onClick: {
        type: "eventHandler",
        argTypes: [{ name: "event", type: "object" }],
        description: "Function called when button is clicked",
      },
      className: {
        type: "class",
        description: "Additional CSS classes",
      },
    },
    importPath: "./Button",
    isDefaultExport: false,
    // Section the props into logical groups in Plasmic Studio
    sections: [
      {
        name: "Basic",
        props: ["children", "variant", "size", "fullWidth", "disabled", "loading"],
      },
      {
        name: "Link/Navigation",
        props: ["href", "openInNewTab"],
      },
      {
        name: "Styling",
        props: [
          "rounded",
          "shadow",
          "elevation",
          "backgroundColor",
          "textColor",
          "borderColor",
          "borderWidth",
        ],
      },
      {
        name: "Typography",
        props: ["fontWeight", "letterSpacing", "textTransform"],
      },
      {
        name: "Gradient (for gradient variant)",
        props: ["gradientDirection", "gradientColors"],
      },
      {
        name: "Interactions",
        props: ["clickAnimation", "tooltip", "onClick"],
      },
      {
        name: "Advanced",
        props: ["iconOnly", "className"],
      },
    ],
  });
  
PLASMIC.registerComponent(IconCard, {
  name: "IconCard",
  displayName: "Icon Card",
  description: "A horizontal card with circular icon/image and heading + text. Use multiple instances for multiple cards.",
  props: {
    imageUrl: {
      type: "imageUrl",
      description: "Image URL for circular icon",
    },
    iconBackgroundColor: {
      type: "color",
      defaultValue: "#2563eb",
      description: "Icon background color (when no image)",
    },
    heading: {
      type: "string",
      defaultValue: "Heading Heading",
      description: "Heading text",
    },
    text: {
      type: "string",
      defaultValue: "Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text",
      description: "Body text",
    },
    headingColor: {
      type: "color",
      defaultValue: "#000000",
      description: "Heading text color",
    },
    textColor: {
      type: "color",
      defaultValue: "#000000",
      description: "Body text color",
    },
    headingAlign: {
      type: "choice",
      options: [
        { value: "left", label: "Left" },
        { value: "center", label: "Center" },
        { value: "right", label: "Right" },
        { value: "justify", label: "Justify" },
      ],
      defaultValue: "left",
      description: "Text alignment for heading",
    },
    textAlign: {
      type: "choice",
      options: [
        { value: "left", label: "Left" },
        { value: "center", label: "Center" },
        { value: "right", label: "Right" },
        { value: "justify", label: "Justify" },
      ],
      defaultValue: "left",
      description: "Text alignment for body text",
    },
    iconSize: {
      type: "choice",
      options: [
        { value: "sm", label: "Small" },
        { value: "md", label: "Medium" },
        { value: "lg", label: "Large" },
        { value: "xl", label: "Extra Large" },
      ],
      defaultValue: "md",
      description: "Size of circular icon/image",
    },
    gap: {
      type: "choice",
      options: [
        { value: "sm", label: "Small" },
        { value: "md", label: "Medium" },
        { value: "lg", label: "Large" },
        { value: "xl", label: "Extra Large" },
      ],
      defaultValue: "lg",
      description: "Gap between icon and text",
    },
    hoverEffect: {
      type: "choice",
      options: [
        { value: "none", label: "None" },
        { value: "lift", label: "Lift Up" },
        { value: "scale", label: "Scale" },
        { value: "glow", label: "Glow/Shadow" },
      ],
      defaultValue: "none",
      description: "Hover effect on card",
    },
    href: {
      type: "string",
      description: "Link URL (makes entire card clickable)",
    },
    openInNewTab: {
      type: "boolean",
      defaultValue: false,
      description: "Open link in new tab",
      hidden: (props) => !props.href,
    },
    className: {
      type: "class",
      description: "Additional CSS classes",
    },
  },
  importPath: "./components/icon-card",
  isDefaultExport: false,
  sections: [
    {
      name: "Content",
      props: ["imageUrl", "heading", "text"],
    },
    {
      name: "Styling",
      props: ["iconBackgroundColor", "headingColor", "textColor", "iconSize", "gap", "headingAlign", "textAlign"],
    },
    {
      name: "Link/Navigation",
      props: ["href", "openInNewTab"],
    },
    {
      name: "Effects",
      props: ["hoverEffect"],
    },
    {
      name: "Advanced",
      props: ["className"],
    },
  ],
});

PLASMIC.registerComponent(PhotoOverlay, {
  name: "PhotoOverlay",
  displayName: "Photo Overlay",
  description: "A hero section with background image, customizable gradient overlay, and text content. Perfect for landing pages, hero sections, or call-to-action areas.",
  props: {
    className: {
      type: "string",
      displayName: "Class Name",
      description: "Additional CSS classes",
    },

    // Content
    backgroundImage: {
      type: "imageUrl",
      displayName: "Background Image",
      defaultValue: "/placeholder.svg?height=600&width=1200",
      description: "Background image for the overlay section",
    },
    title: {
      type: "string",
      displayName: "Title",
      defaultValue: "Discover Our Mission",
      description: "Main heading text",
    },
    subtitle: {
      type: "string",
      displayName: "Subtitle",
      defaultValue: "Making a Difference",
      description: "Small text above the title",
    },
    description: {
      type: "string",
      displayName: "Description",
      defaultValue: "Join us in our journey to create positive change in communities around the world through faith, service, and compassion.",
      description: "Body text description",
    },
    buttonText: {
      type: "string",
      displayName: "Button Text",
      defaultValue: "Learn More",
      description: "Text displayed on the button",
    },
    buttonUrl: {
      type: "string",
      displayName: "Button URL",
      defaultValue: "#",
      description: "Link destination when button is clicked",
    },
    showButton: {
      type: "boolean",
      displayName: "Show Button",
      defaultValue: true,
      description: "Toggle button visibility",
    },

    // Layout Settings
    contentAlignment: {
      type: "choice",
      displayName: "Content Alignment",
      options: ["left", "center", "right"],
      defaultValue: "center",
      description: "Horizontal alignment of content",
    },
    contentVerticalAlignment: {
      type: "choice",
      displayName: "Vertical Alignment",
      options: ["top", "center", "bottom"],
      defaultValue: "center",
      description: "Vertical alignment of content",
    },
    maxContentWidth: {
      type: "string",
      displayName: "Max Content Width",
      defaultValue: "800px",
      description: "Maximum width of content container (e.g., 600px, 800px, 1000px)",
    },
    minHeight: {
      type: "string",
      displayName: "Minimum Height",
      defaultValue: "500px",
      description: "Minimum height of the section (e.g., 400px, 500px, 600px, 100vh)",
    },
    paddingX: {
      type: "string",
      displayName: "Horizontal Padding",
      defaultValue: "24px",
      description: "Left and right padding (e.g., 16px, 24px, 48px)",
    },
    paddingY: {
      type: "string",
      displayName: "Vertical Padding",
      defaultValue: "80px",
      description: "Top and bottom padding (e.g., 40px, 80px, 120px)",
    },

    // Gradient Overlay Settings
    gradientType: {
      type: "choice",
      displayName: "Gradient Type",
      options: ["linear", "radial", "none"],
      defaultValue: "linear",
      description: "Type of gradient overlay",
    },
    gradientDirection: {
      type: "string",
      displayName: "Gradient Direction",
      defaultValue: "to bottom",
      description: "Direction for linear gradient (e.g., 'to bottom', 'to right', '45deg')",
    },
    gradientColor1: {
      type: "string",
      displayName: "Gradient Color 1",
      defaultValue: "rgba(0, 0, 0, 0.7)",
      description: "First gradient color (supports rgba for transparency)",
    },
    gradientColor2: {
      type: "string",
      displayName: "Gradient Color 2",
      defaultValue: "rgba(0, 0, 0, 0.3)",
      description: "Second gradient color (supports rgba for transparency)",
    },
    gradientOpacity: {
      type: "number",
      displayName: "Gradient Opacity",
      defaultValue: 1,
      description: "Overall opacity of gradient (0-1)",
    },

    // Background Image Settings
    backgroundPosition: {
      type: "string",
      displayName: "Background Position",
      defaultValue: "center",
      description: "Position of background image (e.g., center, top, bottom, left)",
    },
    backgroundSize: {
      type: "string",
      displayName: "Background Size",
      defaultValue: "cover",
      description: "Size of background image (e.g., cover, contain, 100%)",
    },
    imageOverlayColor: {
      type: "string",
      displayName: "Image Overlay Color",
      defaultValue: "rgba(0, 0, 0, 0)",
      description: "Solid color overlay on image before gradient (supports rgba)",
    },

    // Title Typography
    titleColor: {
      type: "string",
      displayName: "Title Color",
      defaultValue: "#ffffff",
      description: "Color of the title text",
    },
    titleFontSize: {
      type: "string",
      displayName: "Title Font Size",
      defaultValue: "3rem",
      description: "Font size of title (e.g., 2rem, 3rem, 4rem)",
    },
    titleFontWeight: {
      type: "string",
      displayName: "Title Font Weight",
      defaultValue: "bold",
      description: "Font weight of title (e.g., normal, bold, 600, 700)",
    },
    titleFontFamily: {
      type: "choice",
      displayName: "Title Font Family",
      options: [
        "inherit",
        "Arial, sans-serif",
        "Georgia, serif",
        "Times New Roman, serif",
        "Courier New, monospace",
        "Verdana, sans-serif",
        "Helvetica, sans-serif",
        "Garamond, serif",
        "Palatino, serif",
        "Bookman, serif",
        "Comic Sans MS, cursive",
        "Trebuchet MS, sans-serif",
        "Impact, fantasy",
        "Lucida Console, monospace",
      ],
      defaultValue: "inherit",
      description: "Font family for title",
    },
    titleMarginBottom: {
      type: "string",
      displayName: "Title Margin Bottom",
      defaultValue: "16px",
      description: "Space below title (e.g., 12px, 16px, 24px)",
    },

    // Subtitle Typography
    subtitleColor: {
      type: "string",
      displayName: "Subtitle Color",
      defaultValue: "#f3f4f6",
      description: "Color of the subtitle text",
    },
    subtitleFontSize: {
      type: "string",
      displayName: "Subtitle Font Size",
      defaultValue: "1.25rem",
      description: "Font size of subtitle (e.g., 1rem, 1.25rem, 1.5rem)",
    },
    subtitleFontWeight: {
      type: "string",
      displayName: "Subtitle Font Weight",
      defaultValue: "600",
      description: "Font weight of subtitle",
    },
    subtitleFontFamily: {
      type: "choice",
      displayName: "Subtitle Font Family",
      options: [
        "inherit",
        "Arial, sans-serif",
        "Georgia, serif",
        "Times New Roman, serif",
        "Courier New, monospace",
        "Verdana, sans-serif",
        "Helvetica, sans-serif",
        "Garamond, serif",
        "Palatino, serif",
        "Bookman, serif",
        "Comic Sans MS, cursive",
        "Trebuchet MS, sans-serif",
        "Impact, fantasy",
        "Lucida Console, monospace",
      ],
      defaultValue: "inherit",
      description: "Font family for subtitle",
    },
    subtitleMarginBottom: {
      type: "string",
      displayName: "Subtitle Margin Bottom",
      defaultValue: "24px",
      description: "Space below subtitle",
    },

    // Description Typography
    descriptionColor: {
      type: "string",
      displayName: "Description Color",
      defaultValue: "#e5e7eb",
      description: "Color of the description text",
    },
    descriptionFontSize: {
      type: "string",
      displayName: "Description Font Size",
      defaultValue: "1.125rem",
      description: "Font size of description (e.g., 1rem, 1.125rem, 1.25rem)",
    },
    descriptionFontWeight: {
      type: "string",
      displayName: "Description Font Weight",
      defaultValue: "400",
      description: "Font weight of description",
    },
    descriptionFontFamily: {
      type: "choice",
      displayName: "Description Font Family",
      options: [
        "inherit",
        "Arial, sans-serif",
        "Georgia, serif",
        "Times New Roman, serif",
        "Courier New, monospace",
        "Verdana, sans-serif",
        "Helvetica, sans-serif",
        "Garamond, serif",
        "Palatino, serif",
        "Bookman, serif",
        "Comic Sans MS, cursive",
        "Trebuchet MS, sans-serif",
        "Impact, fantasy",
        "Lucida Console, monospace",
      ],
      defaultValue: "inherit",
      description: "Font family for description",
    },
    descriptionLineHeight: {
      type: "string",
      displayName: "Description Line Height",
      defaultValue: "1.75",
      description: "Line height of description (e.g., 1.5, 1.75, 2)",
    },
    descriptionMarginBottom: {
      type: "string",
      displayName: "Description Margin Bottom",
      defaultValue: "32px",
      description: "Space below description",
    },

    // Button Styling
    buttonBackground: {
      type: "string",
      displayName: "Button Background",
      defaultValue: "#2563eb",
      description: "Background color of button",
    },
    buttonHoverBackground: {
      type: "string",
      displayName: "Button Hover Background",
      defaultValue: "#1d4ed8",
      description: "Background color of button on hover",
    },
    buttonTextColor: {
      type: "string",
      displayName: "Button Text Color",
      defaultValue: "#ffffff",
      description: "Color of button text",
    },
    buttonFontFamily: {
      type: "choice",
      displayName: "Button Font Family",
      options: [
        "inherit",
        "Arial, sans-serif",
        "Georgia, serif",
        "Times New Roman, serif",
        "Courier New, monospace",
        "Verdana, sans-serif",
        "Helvetica, sans-serif",
        "Garamond, serif",
        "Palatino, serif",
        "Bookman, serif",
        "Comic Sans MS, cursive",
        "Trebuchet MS, sans-serif",
        "Impact, fantasy",
        "Lucida Console, monospace",
      ],
      defaultValue: "inherit",
      description: "Font family for button text",
    },
    buttonPaddingX: {
      type: "string",
      displayName: "Button Padding X",
      defaultValue: "32px",
      description: "Horizontal padding of button",
    },
    buttonPaddingY: {
      type: "string",
      displayName: "Button Padding Y",
      defaultValue: "14px",
      description: "Vertical padding of button",
    },
    buttonBorderRadius: {
      type: "string",
      displayName: "Button Border Radius",
      defaultValue: "8px",
      description: "Border radius of button (e.g., 4px, 8px, 9999px)",
    },
    buttonFontSize: {
      type: "string",
      displayName: "Button Font Size",
      defaultValue: "1rem",
      description: "Font size of button text",
    },
    buttonFontWeight: {
      type: "string",
      displayName: "Button Font Weight",
      defaultValue: "600",
      description: "Font weight of button text",
    },

    // Animation
    enableParallax: {
      type: "boolean",
      displayName: "Enable Parallax",
      defaultValue: false,
      description: "Enable parallax scrolling effect on background image",
    },
    parallaxSpeed: {
      type: "number",
      displayName: "Parallax Speed",
      defaultValue: 0.5,
      description: "Speed of parallax effect (0.1 - 1.0)",
    },
  },
  importPath: "./components/PhotoOverlay",
});

PLASMIC.registerComponent(PhotoCarousel, {
  name: "PhotoCarousel",
  displayName: "Photo Carousel",
  description: "A customizable photo carousel with adjustable photo sizes, number of visible photos, navigation arrows, and optional autoplay",
  props: {
    className: {
      type: "string",
      displayName: "Class Name",
      description: "Additional CSS classes",
    },

    // Layout Settings
    photosPerView: {
      type: "number",
      displayName: "Photos Per View",
      defaultValue: 3,
      description: "Number of photos visible at once (default: 3)",
    },
    photoWidth: {
      type: "string",
      displayName: "Photo Width",
      defaultValue: "400px",
      description: "Width of each photo (e.g., 400px, 100%, 30vw)",
    },
    photoHeight: {
      type: "string",
      displayName: "Photo Height",
      defaultValue: "300px",
      description: "Height of each photo (e.g., 300px, 400px, 50vh)",
    },
    gap: {
      type: "string",
      displayName: "Gap Between Photos",
      defaultValue: "24px",
      description: "Space between photos (e.g., 16px, 24px, 32px)",
    },
    borderRadius: {
      type: "string",
      displayName: "Border Radius",
      defaultValue: "12px",
      description: "Border radius for photos (e.g., 0px, 8px, 12px, 50%)",
    },

    // Colors
    backgroundColor: {
      type: "string",
      displayName: "Background Color",
      defaultValue: "#ffffff",
      description: "Section background color",
    },
    arrowColor: {
      type: "string",
      displayName: "Arrow Color",
      defaultValue: "#1f2937",
      description: "Color of navigation arrows",
    },
    arrowHoverColor: {
      type: "string",
      displayName: "Arrow Hover Color",
      defaultValue: "#374151",
      description: "Arrow color on hover",
    },
    arrowBackgroundColor: {
      type: "string",
      displayName: "Arrow Background",
      defaultValue: "#ffffff",
      description: "Background color of arrow buttons",
    },
    arrowBackgroundHoverColor: {
      type: "string",
      displayName: "Arrow Background Hover",
      defaultValue: "#f3f4f6",
      description: "Arrow button background on hover",
    },

    // Arrow Size
    arrowSize: {
      type: "string",
      displayName: "Arrow Button Size",
      defaultValue: "48px",
      description: "Size of arrow buttons (e.g., 40px, 48px, 56px)",
    },
    arrowIconSize: {
      type: "string",
      displayName: "Arrow Icon Size",
      defaultValue: "24px",
      description: "Size of arrow icons (e.g., 20px, 24px, 28px)",
    },

    // Caption Settings
    showCaptions: {
      type: "boolean",
      displayName: "Show Captions",
      defaultValue: true,
      description: "Show photo captions on hover",
    },
    captionColor: {
      type: "string",
      displayName: "Caption Text Color",
      defaultValue: "#1f2937",
      description: "Color of caption text",
    },
    captionBackgroundColor: {
      type: "string",
      displayName: "Caption Background",
      defaultValue: "rgba(255, 255, 255, 0.9)",
      description: "Background color for captions (supports transparency)",
    },

    // Autoplay Settings
    autoplay: {
      type: "boolean",
      displayName: "Enable Autoplay",
      defaultValue: false,
      description: "Automatically cycle through photos",
    },
    autoplayInterval: {
      type: "number",
      displayName: "Autoplay Interval (ms)",
      defaultValue: 3000,
      description: "Time between auto-advances in milliseconds",
    },

    // Spacing
    sectionPaddingY: {
      type: "string",
      displayName: "Section Padding Y",
      defaultValue: "80px",
      description: "Vertical padding for the section",
    },

    // Photos Data
    photos: {
      type: "array",
      displayName: "Photos",
      description: "Add photos to the carousel",
      defaultValue: [
        {
          image: "/placeholder.svg?height=400&width=600",
          alt: "Photo 1",
          caption: "Beautiful landscape",
        },
        {
          image: "/placeholder.svg?height=400&width=600",
          alt: "Photo 2",
          caption: "City skyline",
        },
        {
          image: "/placeholder.svg?height=400&width=600",
          alt: "Photo 3",
          caption: "Mountain view",
        },
        {
          image: "/placeholder.svg?height=400&width=600",
          alt: "Photo 4",
          caption: "Ocean sunset",
        },
        {
          image: "/placeholder.svg?height=400&width=600",
          alt: "Photo 5",
          caption: "Forest path",
        },
      ],
      itemType: {
        type: "object",
        fields: {
          image: {
            type: "imageUrl",
            displayName: "Photo Image",
            description: "Upload or paste image URL",
          },
          alt: {
            type: "string",
            displayName: "Alt Text",
            description: "Alternative text for accessibility",
          },
          caption: {
            type: "string",
            displayName: "Caption",
            description: "Optional caption shown on hover",
          },
        },
      },
    },
  },
  importPath: "./components/PhotoCarousel",
});

PLASMIC.registerComponent(TestimonialCard, {
  name: "TestimonialCard",
  displayName: "Testimonial Card",
  description: "A single testimonial card component that can be used standalone or combined with other elements",
  props: {
    className: {
      type: "class",
      displayName: "Custom CSS Classes",
      description: "Additional CSS classes for custom styling",
    },
    
    // Content
    name: {
      type: "string",
      displayName: "Name",
      defaultValue: "Sarah Chen",
      description: "Name of the person giving the testimonial",
      section: "Content",
    },
    title: {
      type: "string",
      displayName: "Title/Role",
      defaultValue: "Ministry Leader",
      description: "Job title or role of the person",
      section: "Content",
    },
    organization: {
      type: "string",
      displayName: "Organization",
      defaultValue: "Hope Church International",
      description: "Organization or church name",
      section: "Content",
    },
    location: {
      type: "string",
      displayName: "Location",
      defaultValue: "Singapore",
      description: "Location (city, country)",
      section: "Content",
    },
    quote: {
      type: "string",
      displayName: "Quote/Testimonial",
      defaultValue: "Through GCM's media campaigns, we've seen a 300% increase in engagement with our community outreach programs. Their strategic approach to digital ministry has transformed how we connect with people.",
      description: "The testimonial text",
      section: "Content",
    },
    statistic: {
      type: "string",
      displayName: "Statistic Value",
      defaultValue: "300%",
      description: "Featured statistic value (e.g., 300%, 15,000+, 12)",
      section: "Content",
    },
    statisticLabel: {
      type: "string",
      displayName: "Statistic Label",
      defaultValue: "increase in engagement",
      description: "Label describing the statistic",
      section: "Content",
    },
    
    // Visibility
    showQuoteIcon: {
      type: "boolean",
      displayName: "Show Quote Icon",
      defaultValue: true,
      description: "Whether to display the quote icon",
      section: "Visibility",
    },
    showStatistic: {
      type: "boolean",
      displayName: "Show Statistic",
      defaultValue: true,
      description: "Whether to display the statistic box",
      section: "Visibility",
    },
    
    // Colors
    backgroundColor: {
      type: "color",
      displayName: "Background Color",
      defaultValue: "transparent",
      description: "Background color of the container",
      section: "Colors",
    },
    cardBackgroundColor: {
      type: "color",
      displayName: "Card Background Color",
      defaultValue: "#1e293b",
      description: "Background color of the card",
      section: "Colors",
    },
    cardTextColor: {
      type: "color",
      displayName: "Card Quote Text Color",
      defaultValue: "#f1f5f9",
      description: "Text color for the quote text",
      section: "Colors",
    },
    accentColor: {
      type: "color",
      displayName: "Accent Color",
      defaultValue: "#fbbf24",
      description: "Accent color for statistics and highlights",
      section: "Colors",
    },
    borderColor: {
      type: "color",
      displayName: "Border Color",
      defaultValue: "#334155",
      description: "Border color for the card",
      section: "Colors",
    },
    nameColor: {
      type: "color",
      displayName: "Name Color",
      defaultValue: "#ffffff",
      description: "Color for person's name (e.g., Sarah Chen)",
      section: "Colors - Card Details",
    },
    titleColor: {
      type: "color",
      displayName: "Title Color",
      defaultValue: "#fbbf24",
      description: "Color for person's title (e.g., Ministry Leader)",
      section: "Colors - Card Details",
    },
    organizationColor: {
      type: "color",
      displayName: "Organization Color",
      defaultValue: "#94a3b8",
      description: "Color for organization name (e.g., Hope Church International)",
      section: "Colors - Card Details",
    },
    locationColor: {
      type: "color",
      displayName: "Location Color",
      defaultValue: "#64748b",
      description: "Color for location (e.g., Singapore)",
      section: "Colors - Card Details",
    },
    
    // Card Style
    cardStyle: {
      type: "choice",
      displayName: "Card Style",
      options: ["minimal", "bordered", "shadow", "elevated"],
      defaultValue: "elevated",
      description: "Visual style of the card",
      section: "Card Style",
    },
    
    // Typography - Fonts
    bodyFont: {
      type: "choice",
      displayName: "Quote Font Family",
      options: [
        { value: "sans", label: "Sans Serif (System)" },
        { value: "serif", label: "Serif (Georgia)" },
        { value: "mono", label: "Monospace" },
        { value: "inter", label: "Inter" },
        { value: "roboto", label: "Roboto" },
        { value: "open-sans", label: "Open Sans" },
        { value: "lato", label: "Lato" },
        { value: "montserrat", label: "Montserrat" },
        { value: "poppins", label: "Poppins" },
      ],
      defaultValue: "sans",
      description: "Font family for the quote text",
      section: "Typography - Fonts",
    },
    headerFont: {
      type: "choice",
      displayName: "Header Font Family",
      options: [
        { value: "sans", label: "Sans Serif (System)" },
        { value: "serif", label: "Serif (Georgia)" },
        { value: "mono", label: "Monospace" },
        { value: "inter", label: "Inter" },
        { value: "roboto", label: "Roboto" },
        { value: "open-sans", label: "Open Sans" },
        { value: "lato", label: "Lato" },
        { value: "montserrat", label: "Montserrat" },
        { value: "poppins", label: "Poppins" },
        { value: "playfair", label: "Playfair Display" },
        { value: "merriweather", label: "Merriweather" },
      ],
      defaultValue: "sans",
      description: "Font family for headers",
      section: "Typography - Fonts",
    },
    nameFont: {
      type: "choice",
      displayName: "Name Font Family",
      options: [
        { value: "sans", label: "Sans Serif (System)" },
        { value: "serif", label: "Serif (Georgia)" },
        { value: "mono", label: "Monospace" },
        { value: "inter", label: "Inter" },
        { value: "roboto", label: "Roboto" },
        { value: "open-sans", label: "Open Sans" },
        { value: "lato", label: "Lato" },
        { value: "montserrat", label: "Montserrat" },
        { value: "poppins", label: "Poppins" },
        { value: "playfair", label: "Playfair Display" },
        { value: "merriweather", label: "Merriweather" },
      ],
      defaultValue: "sans",
      description: "Font family for person name",
      section: "Typography - Fonts",
    },
    
    // Typography - Sizes
    bodyFontSize: {
      type: "number",
      displayName: "Quote Font Size (px)",
      defaultValue: 16,
      description: "Font size for the quote text in pixels",
      section: "Typography - Sizes",
    },
    cardTitleFontSize: {
      type: "number",
      displayName: "Name Font Size (px)",
      defaultValue: 18,
      description: "Font size for the name in pixels",
      section: "Typography - Sizes",
    },
    statValueFontSize: {
      type: "number",
      displayName: "Stat Value Font Size (px)",
      defaultValue: 36,
      description: "Font size for statistic value in pixels",
      section: "Typography - Sizes",
    },
    statLabelFontSize: {
      type: "number",
      displayName: "Detail Font Size (px)",
      defaultValue: 14,
      description: "Font size for title, organization, location in pixels",
      section: "Typography - Sizes",
    },
    
    // Layout
    maxWidth: {
      type: "string",
      displayName: "Max Width",
      defaultValue: "600px",
      description: "Maximum width of the card (e.g., 600px, 100%, 50rem)",
      section: "Layout",
    },
    centered: {
      type: "boolean",
      displayName: "Center Card",
      defaultValue: true,
      description: "Whether to center the card horizontally",
      section: "Layout",
    },
    
    // Animation
    enableHover: {
      type: "boolean",
      displayName: "Enable Hover Effect",
      defaultValue: true,
      description: "Whether to enable hover scale animation",
      section: "Animation",
    },
  },
  importPath: "./components/testimonial-card",
});

PLASMIC.registerComponent(ArticleNavigation, {
  name: "ArticleNavigation",
  displayName: "Article Navigation",
  description: "Previous/Next article navigation component",
  props: {
    previousPost: {
      type: "object",
      displayName: "Previous Post",
      description: "Previous article configuration",
      defaultValue: {
        title: "Previous Article Title",
        url: "#",
        image: "https://via.placeholder.com/80x80"
      },
      fields: {
        title: {
          type: "string",
          displayName: "Title",
          defaultValue: "Previous Article Title",
        },
        url: {
          type: "string",
          displayName: "URL",
          defaultValue: "#",
        },
        image: {
          type: "imageUrl",
          displayName: "Image",
          description: "Thumbnail image for the article",
        },
      },
    },
    nextPost: {
      type: "object",
      displayName: "Next Post",
      description: "Next article configuration",
      defaultValue: {
        title: "Next Article Title",
        url: "#",
        image: "https://via.placeholder.com/80x80"
      },
      fields: {
        title: {
          type: "string",
          displayName: "Title",
          defaultValue: "Next Article Title",
        },
        url: {
          type: "string",
          displayName: "URL",
          defaultValue: "#",
        },
        image: {
          type: "imageUrl",
          displayName: "Image",
          description: "Thumbnail image for the article",
        },
      },
    },
    previousLabel: {
      type: "string",
      displayName: "Previous Label",
      defaultValue: "Previous Article",
      description: "Label text for previous article link",
    },
    nextLabel: {
      type: "string",
      displayName: "Next Label",
      defaultValue: "Next Article",
      description: "Label text for next article link",
    },
    accentColor: {
      type: "color",
      displayName: "Accent Color",
      defaultValue: "#d97706",
      description: "Color for labels and chevron icons",
    },
    titleColor: {
      type: "color",
      displayName: "Title Color",
      defaultValue: "#0f172a",
      description: "Color for article titles",
    },
    titleHoverColor: {
      type: "color",
      displayName: "Title Hover Color",
      defaultValue: "#3b82f6",
      description: "Color for article titles on hover",
    },
    className: {
      type: "class",
      displayName: "CSS Class",
    },
  },
  importPath: "./ArticleNavigation",
});

PLASMIC.registerComponent(RecentPosts, {
  name: "RecentPosts",
  displayName: "Recent Posts",
  description: "A sidebar or section displaying recent blog posts with customizable styling",
  props: {
    className: {
      type: "string",
      displayName: "Class Name",
      description: "Additional CSS classes",
    },

    title: {
      type: "string",
      displayName: "Section Title",
      defaultValue: "Recent Posts",
    },

    backgroundColor: {
      type: "string",
      displayName: "Background Color",
      defaultValue: "#f9fafb",
      description: "Section background color",
    },
    titleColor: {
      type: "string",
      displayName: "Title Color",
      defaultValue: "#1f2937",
    },
    cardBackgroundColor: {
      type: "string",
      displayName: "Card Background Color",
      defaultValue: "#ffffff",
    },
    cardBorderColor: {
      type: "string",
      displayName: "Card Border Color",
      defaultValue: "#e5e7eb",
    },
    cardHoverBorderColor: {
      type: "string",
      displayName: "Card Hover Border Color",
      defaultValue: "#d1d5db",
    },
    postTitleColor: {
      type: "string",
      displayName: "Post Title Color",
      defaultValue: "#1f2937",
    },
    postTitleHoverColor: {
      type: "string",
      displayName: "Post Title Hover Color",
      defaultValue: "#1e40af",
    },
    metaColor: {
      type: "string",
      displayName: "Meta Info Color",
      defaultValue: "#6b7280",
    },
    categoryBadgeBackground: {
      type: "string",
      displayName: "Category Badge Background",
      defaultValue: "#eff6ff",
    },
    categoryBadgeText: {
      type: "string",
      displayName: "Category Badge Text Color",
      defaultValue: "#1e40af",
    },
    readMoreColor: {
      type: "string",
      displayName: "Read More Link Color",
      defaultValue: "#2563eb",
    },
    readMoreHoverColor: {
      type: "string",
      displayName: "Read More Hover Color",
      defaultValue: "#1d4ed8",
    },

    sectionPaddingY: {
      type: "string",
      displayName: "Section Padding Y",
      defaultValue: "80px",
    },

    posts: {
      type: "array",
      displayName: "Posts",
      description: "Add recent blog posts",
      defaultValue: [
        {
          title: "Understanding Biblical Prophecy",
          image: "/placeholder.svg?height=200&width=300",
          date: "Dec 8, 2024",
          category: "Bible Study",
          url: "/posts/understanding-biblical-prophecy",
        },
        {
          title: "The Power of Prayer",
          image: "/placeholder.svg?height=200&width=300",
          date: "Dec 5, 2024",
          category: "Devotional",
          url: "/posts/power-of-prayer",
        },
        {
          title: "Living in Faith",
          image: "/placeholder.svg?height=200&width=300",
          date: "Dec 1, 2024",
          category: "Inspiration",
          url: "/posts/living-in-faith",
        },
      ],
      itemType: {
        type: "object",
        fields: {
          title: {
            type: "string",
            displayName: "Post Title",
          },
          image: {
            type: "imageUrl",
            displayName: "Post Image",
          },
          date: {
            type: "string",
            displayName: "Publication Date",
          },
          category: {
            type: "string",
            displayName: "Category",
          },
          url: {
            type: "string",
            displayName: "Post URL",
          },
        },
      },
    },
  },
  importPath: "./components/RecentPosts",
});

PLASMIC.registerComponent(StayConnected, {
  name: "StayConnected",
  displayName: "Stay Connected",
  description: "Newsletter signup section with optional name field and customizable styling",
  props: {
    className: {
      type: "string",
      displayName: "Class Name",
      description: "Additional CSS classes",
    },

    title: {
      type: "string",
      displayName: "Title",
      defaultValue: "Stay Connected With Us",
    },
    description: {
      type: "string",
      displayName: "Description",
      defaultValue: "Subscribe to our newsletter and never miss an update on our latest content.",
    },
    
    showNameField: {
      type: "boolean",
      displayName: "Show Name Field",
      defaultValue: true,
      description: "Display the name input field",
    },
    namePlaceholder: {
      type: "string",
      displayName: "Name Placeholder",
      defaultValue: "Enter your name",
      description: "Placeholder text for name field",
    },
    emailPlaceholder: {
      type: "string",
      displayName: "Email Placeholder",
      defaultValue: "Enter your email",
      description: "Placeholder text for email field",
    },
    buttonText: {
      type: "string",
      displayName: "Button Text",
      defaultValue: "Subscribe",
    },

    backgroundColor: {
      type: "string",
      displayName: "Background Color",
      defaultValue: "#ffffff",
      description: "Section background color",
    },
    titleColor: {
      type: "string",
      displayName: "Title Color",
      defaultValue: "#1f2937",
    },
    descriptionColor: {
      type: "string",
      displayName: "Description Color",
      defaultValue: "#4b5563",
    },
    inputBackground: {
      type: "string",
      displayName: "Input Background",
      defaultValue: "#ffffff",
    },
    inputBorderColor: {
      type: "string",
      displayName: "Input Border Color",
      defaultValue: "#e5e7eb",
    },
    inputTextColor: {
      type: "string",
      displayName: "Input Text Color",
      defaultValue: "#1f2937",
    },
    buttonBackground: {
      type: "string",
      displayName: "Button Background",
      defaultValue: "#2563eb",
    },
    buttonHoverBackground: {
      type: "string",
      displayName: "Button Hover Background",
      defaultValue: "#1d4ed8",
    },
    buttonTextColor: {
      type: "string",
      displayName: "Button Text Color",
      defaultValue: "#ffffff",
    },

    sectionPaddingY: {
      type: "string",
      displayName: "Section Padding Y",
      defaultValue: "80px",
    },
  },
  importPath: "./components/StayConnected",
});

PLASMIC.registerComponent(Ministry2, {
  name: "Ministry2",
  displayName: "Ministry 2",
  description:
    "Magazine-style ministry page template with extensive customization including resizable images for all sections. Create 5 unique ministry pages from this template!",
  props: {
    className: {
      type: "class",
      displayName: "CSS Class",
      description: "Custom CSS classes for styling (e.g., full bleed)",
    },

    // Section Visibility Controls
    showHeroSection: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show Hero Section",
    },
    showIntroSection: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show Intro Section",
    },
    showTextSection1: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show Text Section 1",
    },
    showTextSection2: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show Text Section 2",
    },
    showTextSection3: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show Text Section 3",
    },
    showTextSection4: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show Text Section 4",
    },
    showImageGallerySection: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show Image Gallery Section",
    },
    showTestimonialSection: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show Testimonial Section",
    },
    showVideoSection: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show Video Section",
    },

    // Hero Section
    heroImage: {
      type: "imageUrl",
      displayName: "Hero Image",
      defaultValue: "/images/image.png",
    },
    heroImageAlt: {
      type: "string",
      displayName: "Hero Image Alt Text",
      defaultValue: "Ministry impact across cities",
    },
    heroHeight: {
      type: "string",
      displayName: "Hero Height",
      defaultValue: "700px",
      description: "Height of hero section (e.g., 700px, 50vh, 600px)",
    },
    heroOverline: {
      type: "string",
      displayName: "Hero Overline",
      defaultValue: "TRANSFORMING COMMUNITIES",
    },
    heroTitle: {
      type: "string",
      displayName: "Hero Title",
      defaultValue: "Mega City Media Campaigns",
    },
    heroSubtitle: {
      type: "string",
      displayName: "Hero Subtitle",
      defaultValue: "Reaching millions with hope and faith through strategic media outreach",
    },
    heroBackgroundColor: {
      type: "color",
      displayName: "Hero Background Color",
      defaultValue: "#1e293b",
    },
    heroTextColor: {
      type: "color",
      displayName: "Hero Text Color",
      defaultValue: "#ffffff",
    },
    heroOverlineFontSize: {
      type: "string",
      displayName: "Hero Overline Font Size",
      defaultValue: "0.875rem",
      description: "e.g., 0.875rem, 14px, 1em",
    },
    heroTitleFontSize: {
      type: "string",
      displayName: "Hero Title Font Size",
      defaultValue: "3rem",
      description: "e.g., 3rem, 48px, 3em",
    },
    heroSubtitleFontSize: {
      type: "string",
      displayName: "Hero Subtitle Font Size",
      defaultValue: "1.25rem",
      description: "e.g., 1.25rem, 20px, 1.25em",
    },
    heroOverlineLineHeight: {
      type: "string",
      displayName: "Hero Overline Line Height",
      defaultValue: "1.5",
      description: "e.g., 1.5, 1.8, 2",
    },
    heroTitleLineHeight: {
      type: "string",
      displayName: "Hero Title Line Height",
      defaultValue: "1.2",
      description: "e.g., 1.2, 1.5, 2",
    },
    heroSubtitleLineHeight: {
      type: "string",
      displayName: "Hero Subtitle Line Height",
      defaultValue: "1.5",
      description: "e.g., 1.5, 1.8, 2",
    },
    heroOverlineFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Hero Overline Font Weight",
      defaultValue: "bold",
    },
    heroTitleFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Hero Title Font Weight",
      defaultValue: "normal",
    },
    heroSubtitleFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Hero Subtitle Font Weight",
      defaultValue: "normal",
    },
    heroOverlineFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Hero Overline Font Style",
      defaultValue: "normal",
    },
    heroTitleFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Hero Title Font Style",
      defaultValue: "normal",
    },
    heroSubtitleFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Hero Subtitle Font Style",
      defaultValue: "normal",
    },

    // Intro Section (no changes needed - text only section)
    introHeading: {
      type: "string",
      displayName: "Intro Heading",
      defaultValue: "It's all about the Great Commission",
    },
    introText: {
      type: "string",
      displayName: "Intro Text",
      defaultValue: "GCM Ministries has, together with thousands of local churches, conducted",
    },
    introHighlightText: {
      type: "string",
      displayName: "Intro Highlight Text",
      defaultValue: "more than 110 city-wide, high-intensity Mega City Media Campaigns.",
    },
    introBackgroundColor: {
      type: "color",
      displayName: "Intro Background Color",
      defaultValue: "#f8fafc",
    },
    introTextColor: {
      type: "color",
      displayName: "Intro Text Color",
      defaultValue: "#1e293b",
    },
    introAlignment: {
      type: "choice",
      options: ["left", "center", "right", "justify"],
      displayName: "Intro Text Alignment",
      defaultValue: "center",
    },
    introShowButton: {
      type: "boolean",
      displayName: "Intro Show Button",
      defaultValue: false,
    },
    introButtonText: {
      type: "string",
      displayName: "Intro Button Text",
      defaultValue: "Learn More",
    },
    introButtonLink: {
      type: "string",
      displayName: "Intro Button Link",
      defaultValue: "#",
    },
    introButtonColor: {
      type: "color",
      displayName: "Intro Button Color",
      defaultValue: "#1e40af",
    },
    introButtonTextColor: {
      type: "color",
      displayName: "Intro Button Text Color",
      defaultValue: "#ffffff",
    },
    introHeadingFontSize: {
      type: "string",
      displayName: "Intro Heading Font Size",
      defaultValue: "2.25rem",
      description: "e.g., 2.25rem, 36px, 2.25em",
    },
    introTextFontSize: {
      type: "string",
      displayName: "Intro Text Font Size",
      defaultValue: "1.25rem",
      description: "e.g., 1.25rem, 20px, 1.25em",
    },
    introButtonFontSize: {
      type: "string",
      displayName: "Intro Button Font Size",
      defaultValue: "1rem",
      description: "e.g., 1rem, 16px, 1em",
    },
    introHeadingLineHeight: {
      type: "string",
      displayName: "Intro Heading Line Height",
      defaultValue: "1.3",
      description: "e.g., 1.3, 1.5, 2",
    },
    introTextLineHeight: {
      type: "string",
      displayName: "Intro Text Line Height",
      defaultValue: "1.6",
      description: "e.g., 1.6, 1.8, 2",
    },
    introHeadingFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Intro Heading Font Weight",
      defaultValue: "normal",
    },
    introTextFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Intro Text Font Weight",
      defaultValue: "normal",
    },
    introHeadingFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Intro Heading Font Style",
      defaultValue: "normal",
    },
    introTextFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Intro Text Font Style",
      defaultValue: "normal",
    },

    // Text Section 1 with Image Height Control
    textSection1Heading: {
      type: "string",
      displayName: "Text Section 1 Heading",
      defaultValue: "Our Approach",
    },
    textSection1Body: {
      type: "string",
      displayName: "Text Section 1 Body",
      defaultValue:
        "Through strategic partnerships with local churches and communities, we create targeted media campaigns that reach people where they are. Our multi-platform approach includes television broadcasts, radio programs, digital content, and community events that work together to share a message of hope and transformation.",
    },
    textSection1BackgroundColor: {
      type: "color",
      displayName: "Text Section 1 Background Color",
      defaultValue: "#ffffff",
    },
    textSection1TextColor: {
      type: "color",
      displayName: "Text Section 1 Text Color",
      defaultValue: "#1e293b",
    },
    textSection1Alignment: {
      type: "choice",
      options: ["left", "center", "right", "justify"],
      displayName: "Text Section 1 Alignment",
      defaultValue: "left",
    },
    textSection1ShowImage: {
      type: "boolean",
      displayName: "Text Section 1 Show Image",
      defaultValue: false,
    },
    textSection1Image: {
      type: "imageUrl",
      displayName: "Text Section 1 Image",
      defaultValue: "/community-gathering-ministry.jpg",
    },
    textSection1ImageAlt: {
      type: "string",
      displayName: "Text Section 1 Image Alt Text",
      defaultValue: "Ministry approach",
    },
    textSection1ImageHeight: {
      type: "string",
      displayName: "Text Section 1 Image Height",
      defaultValue: "400px",
      description: "Height of image (e.g., 400px, 500px, 30vh)",
    },
    textSection1ShowButton: {
      type: "boolean",
      displayName: "Text Section 1 Show Button",
      defaultValue: false,
    },
    textSection1ButtonText: {
      type: "string",
      displayName: "Text Section 1 Button Text",
      defaultValue: "Discover Our Method",
    },
    textSection1ButtonLink: {
      type: "string",
      displayName: "Text Section 1 Button Link",
      defaultValue: "#",
    },
    textSection1ButtonColor: {
      type: "color",
      displayName: "Text Section 1 Button Color",
      defaultValue: "#1e40af",
    },
    textSection1ButtonTextColor: {
      type: "color",
      displayName: "Text Section 1 Button Text Color",
      defaultValue: "#ffffff",
    },
    textSection1HeadingFontSize: {
      type: "string",
      displayName: "Text Section 1 Heading Font Size",
      defaultValue: "1.875rem",
      description: "e.g., 1.875rem, 30px, 1.875em",
    },
    textSection1BodyFontSize: {
      type: "string",
      displayName: "Text Section 1 Body Font Size",
      defaultValue: "1.125rem",
      description: "e.g., 1.125rem, 18px, 1.125em",
    },
    textSection1ButtonFontSize: {
      type: "string",
      displayName: "Text Section 1 Button Font Size",
      defaultValue: "1rem",
      description: "e.g., 1rem, 16px, 1em",
    },
    textSection1HeadingLineHeight: {
      type: "string",
      displayName: "Text Section 1 Heading Line Height",
      defaultValue: "1.3",
      description: "e.g., 1.3, 1.5, 2",
    },
    textSection1BodyLineHeight: {
      type: "string",
      displayName: "Text Section 1 Body Line Height",
      defaultValue: "1.6",
      description: "e.g., 1.6, 1.8, 2",
    },
    textSection1HeadingFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Text Section 1 Heading Font Weight",
      defaultValue: "normal",
    },
    textSection1BodyFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Text Section 1 Body Font Weight",
      defaultValue: "normal",
    },
    textSection1HeadingFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Text Section 1 Heading Font Style",
      defaultValue: "normal",
    },
    textSection1BodyFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Text Section 1 Body Font Style",
      defaultValue: "normal",
    },

    // Text Section 2 with Image Height Control
    textSection2Heading: {
      type: "string",
      displayName: "Text Section 2 Heading",
      defaultValue: "Global Impact",
    },
    textSection2Body: {
      type: "string",
      displayName: "Text Section 2 Body",
      defaultValue:
        "From the bustling streets of major urban centers to remote communities around the world, our ministry has touched lives across multiple continents. Each campaign is carefully tailored to the cultural context and spiritual needs of the region, ensuring that the message resonates authentically with local populations.",
    },
    textSection2BackgroundColor: {
      type: "color",
      displayName: "Text Section 2 Background Color",
      defaultValue: "#f1f5f9",
    },
    textSection2TextColor: {
      type: "color",
      displayName: "Text Section 2 Text Color",
      defaultValue: "#1e293b",
    },
    textSection2Alignment: {
      type: "choice",
      options: ["left", "center", "right", "justify"],
      displayName: "Text Section 2 Alignment",
      defaultValue: "center",
    },
    textSection2ShowImage: {
      type: "boolean",
      displayName: "Text Section 2 Show Image",
      defaultValue: false,
    },
    textSection2Image: {
      type: "imageUrl",
      displayName: "Text Section 2 Image",
      defaultValue: "/media-campaign-billboard.jpg",
    },
    textSection2ImageAlt: {
      type: "string",
      displayName: "Text Section 2 Image Alt Text",
      defaultValue: "Global impact",
    },
    textSection2ImageHeight: {
      type: "string",
      displayName: "Text Section 2 Image Height",
      defaultValue: "400px",
      description: "Height of image (e.g., 400px, 500px, 30vh)",
    },
    textSection2ShowButton: {
      type: "boolean",
      displayName: "Text Section 2 Show Button",
      defaultValue: false,
    },
    textSection2ButtonText: {
      type: "string",
      displayName: "Text Section 2 Button Text",
      defaultValue: "View Our Reach",
    },
    textSection2ButtonLink: {
      type: "string",
      displayName: "Text Section 2 Button Link",
      defaultValue: "#",
    },
    textSection2ButtonColor: {
      type: "color",
      displayName: "Text Section 2 Button Color",
      defaultValue: "#1e40af",
    },
    textSection2ButtonTextColor: {
      type: "color",
      displayName: "Text Section 2 Button Text Color",
      defaultValue: "#ffffff",
    },
    textSection2HeadingFontSize: {
      type: "string",
      displayName: "Text Section 2 Heading Font Size",
      defaultValue: "1.875rem",
      description: "e.g., 1.875rem, 30px, 1.875em",
    },
    textSection2BodyFontSize: {
      type: "string",
      displayName: "Text Section 2 Body Font Size",
      defaultValue: "1.125rem",
      description: "e.g., 1.125rem, 18px, 1.125em",
    },
    textSection2ButtonFontSize: {
      type: "string",
      displayName: "Text Section 2 Button Font Size",
      defaultValue: "1rem",
      description: "e.g., 1rem, 16px, 1em",
    },
    textSection2HeadingLineHeight: {
      type: "string",
      displayName: "Text Section 2 Heading Line Height",
      defaultValue: "1.3",
      description: "e.g., 1.3, 1.5, 2",
    },
    textSection2BodyLineHeight: {
      type: "string",
      displayName: "Text Section 2 Body Line Height",
      defaultValue: "1.6",
      description: "e.g., 1.6, 1.8, 2",
    },
    textSection2HeadingFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Text Section 2 Heading Font Weight",
      defaultValue: "normal",
    },
    textSection2BodyFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Text Section 2 Body Font Weight",
      defaultValue: "normal",
    },
    textSection2HeadingFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Text Section 2 Heading Font Style",
      defaultValue: "normal",
    },
    textSection2BodyFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Text Section 2 Body Font Style",
      defaultValue: "normal",
    },

    // Text Section 3 with Image Height Control
    textSection3Heading: {
      type: "string",
      displayName: "Text Section 3 Heading",
      defaultValue: "Lasting Change",
    },
    textSection3Body: {
      type: "string",
      displayName: "Text Section 3 Body",
      defaultValue:
        "The true measure of our success is not in numbers alone, but in the transformed lives and strengthened communities we witness. Through follow-up programs and ongoing support, we ensure that the impact of our campaigns continues long after the initial outreach, fostering sustainable spiritual growth and community development.",
    },
    textSection3BackgroundColor: {
      type: "color",
      displayName: "Text Section 3 Background Color",
      defaultValue: "#1e40af",
    },
    textSection3TextColor: {
      type: "color",
      displayName: "Text Section 3 Text Color",
      defaultValue: "#ffffff",
    },
    textSection3Alignment: {
      type: "choice",
      options: ["left", "center", "right", "justify"],
      displayName: "Text Section 3 Alignment",
      defaultValue: "right",
    },
    textSection3ShowImage: {
      type: "boolean",
      displayName: "Text Section 3 Show Image",
      defaultValue: false,
    },
    textSection3Image: {
      type: "imageUrl",
      displayName: "Text Section 3 Image",
      defaultValue: "/broadcasting-studio-equipment.jpg",
    },
    textSection3ImageAlt: {
      type: "string",
      displayName: "Text Section 3 Image Alt Text",
      defaultValue: "Lasting change",
    },
    textSection3ImageHeight: {
      type: "string",
      displayName: "Text Section 3 Image Height",
      defaultValue: "400px",
      description: "Height of image (e.g., 400px, 500px, 30vh)",
    },
    textSection3ShowButton: {
      type: "boolean",
      displayName: "Text Section 3 Show Button",
      defaultValue: false,
    },
    textSection3ButtonText: {
      type: "string",
      displayName: "Text Section 3 Button Text",
      defaultValue: "See the Results",
    },
    textSection3ButtonLink: {
      type: "string",
      displayName: "Text Section 3 Button Link",
      defaultValue: "#",
    },
    textSection3ButtonColor: {
      type: "color",
      displayName: "Text Section 3 Button Color",
      defaultValue: "#ffffff",
    },
    textSection3ButtonTextColor: {
      type: "color",
      displayName: "Text Section 3 Button Text Color",
      defaultValue: "#1e40af",
    },
    textSection3HeadingFontSize: {
      type: "string",
      displayName: "Text Section 3 Heading Font Size",
      defaultValue: "1.875rem",
      description: "e.g., 1.875rem, 30px, 1.875em",
    },
    textSection3BodyFontSize: {
      type: "string",
      displayName: "Text Section 3 Body Font Size",
      defaultValue: "1.125rem",
      description: "e.g., 1.125rem, 18px, 1.125em",
    },
    textSection3ButtonFontSize: {
      type: "string",
      displayName: "Text Section 3 Button Font Size",
      defaultValue: "1rem",
      description: "e.g., 1rem, 16px, 1em",
    },
    textSection3HeadingLineHeight: {
      type: "string",
      displayName: "Text Section 3 Heading Line Height",
      defaultValue: "1.3",
      description: "e.g., 1.3, 1.5, 2",
    },
    textSection3BodyLineHeight: {
      type: "string",
      displayName: "Text Section 3 Body Line Height",
      defaultValue: "1.6",
      description: "e.g., 1.6, 1.8, 2",
    },
    textSection3HeadingFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Text Section 3 Heading Font Weight",
      defaultValue: "normal",
    },
    textSection3BodyFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Text Section 3 Body Font Weight",
      defaultValue: "normal",
    },
    textSection3HeadingFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Text Section 3 Heading Font Style",
      defaultValue: "normal",
    },
    textSection3BodyFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Text Section 3 Body Font Style",
      defaultValue: "normal",
    },

    // Text Section 4 with Image Height Control
    textSection4Heading: {
      type: "string",
      displayName: "Text Section 4 Heading",
      defaultValue: "Looking Forward",
    },
    textSection4Body: {
      type: "string",
      displayName: "Text Section 4 Body",
      defaultValue:
        "As we continue to expand our reach, we remain committed to innovation and excellence in ministry. New technologies and communication platforms provide unprecedented opportunities to share our message with even greater effectiveness, while maintaining the personal touch and cultural sensitivity that have always been hallmarks of our work.",
    },
    textSection4BackgroundColor: {
      type: "color",
      displayName: "Text Section 4 Background Color",
      defaultValue: "#0f172a",
    },
    textSection4TextColor: {
      type: "color",
      displayName: "Text Section 4 Text Color",
      defaultValue: "#ffffff",
    },
    textSection4Alignment: {
      type: "choice",
      options: ["left", "center", "right", "justify"],
      displayName: "Text Section 4 Alignment",
      defaultValue: "center",
    },
    textSection4ShowImage: {
      type: "boolean",
      displayName: "Text Section 4 Show Image",
      defaultValue: false,
    },
    textSection4Image: {
      type: "imageUrl",
      displayName: "Text Section 4 Image",
      defaultValue: "/ministry-leader-portrait.jpg",
    },
    textSection4ImageAlt: {
      type: "string",
      displayName: "Text Section 4 Image Alt Text",
      defaultValue: "Looking forward",
    },
    textSection4ImageHeight: {
      type: "string",
      displayName: "Text Section 4 Image Height",
      defaultValue: "400px",
      description: "Height of image (e.g., 400px, 500px, 30vh)",
    },
    textSection4ShowButton: {
      type: "boolean",
      displayName: "Text Section 4 Show Button",
      defaultValue: false,
    },
    textSection4ButtonText: {
      type: "string",
      displayName: "Text Section 4 Button Text",
      defaultValue: "Join Our Vision",
    },
    textSection4ButtonLink: {
      type: "string",
      displayName: "Text Section 4 Button Link",
      defaultValue: "#",
    },
    textSection4ButtonColor: {
      type: "color",
      displayName: "Text Section 4 Button Color",
      defaultValue: "#fbbf24",
    },
    textSection4ButtonTextColor: {
      type: "color",
      displayName: "Text Section 4 Button Text Color",
      defaultValue: "#0f172a",
    },
    textSection4HeadingFontSize: {
      type: "string",
      displayName: "Text Section 4 Heading Font Size",
      defaultValue: "1.875rem",
      description: "e.g., 1.875rem, 30px, 1.875em",
    },
    textSection4BodyFontSize: {
      type: "string",
      displayName: "Text Section 4 Body Font Size",
      defaultValue: "1.125rem",
      description: "e.g., 1.125rem, 18px, 1.125em",
    },
    textSection4ButtonFontSize: {
      type: "string",
      displayName: "Text Section 4 Button Font Size",
      defaultValue: "1rem",
      description: "e.g., 1rem, 16px, 1em",
    },
    textSection4HeadingLineHeight: {
      type: "string",
      displayName: "Text Section 4 Heading Line Height",
      defaultValue: "1.3",
      description: "e.g., 1.3, 1.5, 2",
    },
    textSection4BodyLineHeight: {
      type: "string",
      displayName: "Text Section 4 Body Line Height",
      defaultValue: "1.6",
      description: "e.g., 1.6, 1.8, 2",
    },
    textSection4HeadingFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Text Section 4 Heading Font Weight",
      defaultValue: "normal",
    },
    textSection4BodyFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Text Section 4 Body Font Weight",
      defaultValue: "normal",
    },
    textSection4HeadingFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Text Section 4 Heading Font Style",
      defaultValue: "normal",
    },
    textSection4BodyFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Text Section 4 Body Font Style",
      defaultValue: "normal",
    },

    // Image Gallery Section with Height Control
    galleryHeading: {
      type: "string",
      displayName: "Gallery Heading",
      defaultValue: "Our Impact in Action",
    },
    galleryImage1: {
      type: "imageUrl",
      displayName: "Gallery Image 1",
      defaultValue: "/media-campaign-billboard.jpg",
    },
    galleryImage2: {
      type: "imageUrl",
      displayName: "Gallery Image 2",
      defaultValue: "/community-gathering-ministry.jpg",
    },
    galleryImage3: {
      type: "imageUrl",
      displayName: "Gallery Image 3",
      defaultValue: "/broadcasting-studio-equipment.jpg",
    },
    galleryImageHeight: {
      type: "string",
      displayName: "Gallery Image Height",
      defaultValue: "500px",
      description: "Height of gallery images (e.g., 500px, 600px, 40vh)",
    },
    galleryBackgroundColor: {
      type: "color",
      displayName: "Gallery Background Color",
      defaultValue: "#f1f5f9",
    },
    galleryHeadingFontSize: {
      type: "string",
      displayName: "Gallery Heading Font Size",
      defaultValue: "2.25rem",
      description: "e.g., 2.25rem, 36px, 2.25em",
    },
    galleryHeadingLineHeight: {
      type: "string",
      displayName: "Gallery Heading Line Height",
      defaultValue: "1.3",
      description: "e.g., 1.3, 1.5, 2",
    },
    galleryHeadingFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Gallery Heading Font Weight",
      defaultValue: "normal",
    },
    galleryHeadingFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Gallery Heading Font Style",
      defaultValue: "normal",
    },

    // Testimonial Section with Image Size Control
    testimonialQuote: {
      type: "string",
      displayName: "Testimonial Quote",
      defaultValue:
        "Through these campaigns, we have seen entire communities transformed by the message of hope and faith.",
    },
    testimonialAuthor: {
      type: "string",
      displayName: "Testimonial Author",
      defaultValue: "John Haukka",
    },
    testimonialRole: {
      type: "string",
      displayName: "Testimonial Role",
      defaultValue: "Ministry Director",
    },
    testimonialImage: {
      type: "imageUrl",
      displayName: "Testimonial Image",
      defaultValue: "/ministry-leader-portrait.jpg",
    },
    testimonialImageSize: {
      type: "string",
      displayName: "Testimonial Image Size",
      defaultValue: "300px",
      description: "Size of circular image (e.g., 300px, 250px, 20vw)",
    },
    testimonialBackgroundColor: {
      type: "color",
      displayName: "Testimonial Background Color",
      defaultValue: "#1e40af",
    },
    testimonialTextColor: {
      type: "color",
      displayName: "Testimonial Text Color",
      defaultValue: "#ffffff",
    },
    testimonialQuoteFontSize: {
      type: "string",
      displayName: "Testimonial Quote Font Size",
      defaultValue: "1.5rem",
      description: "e.g., 1.5rem, 24px, 1.5em",
    },
    testimonialAuthorFontSize: {
      type: "string",
      displayName: "Testimonial Author Font Size",
      defaultValue: "1.125rem",
      description: "e.g., 1.125rem, 18px, 1.125em",
    },
    testimonialRoleFontSize: {
      type: "string",
      displayName: "Testimonial Role Font Size",
      defaultValue: "1rem",
      description: "e.g., 1rem, 16px, 1em",
    },
    testimonialQuoteLineHeight: {
      type: "string",
      displayName: "Testimonial Quote Line Height",
      defaultValue: "1.5",
      description: "e.g., 1.5, 1.8, 2",
    },
    testimonialAuthorLineHeight: {
      type: "string",
      displayName: "Testimonial Author Line Height",
      defaultValue: "1.4",
      description: "e.g., 1.4, 1.6, 2",
    },
    testimonialRoleLineHeight: {
      type: "string",
      displayName: "Testimonial Role Line Height",
      defaultValue: "1.5",
      description: "e.g., 1.5, 1.8, 2",
    },
    testimonialQuoteFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Testimonial Quote Font Weight",
      defaultValue: "normal",
    },
    testimonialAuthorFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Testimonial Author Font Weight",
      defaultValue: "bold",
    },
    testimonialRoleFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Testimonial Role Font Weight",
      defaultValue: "normal",
    },
    testimonialQuoteFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Testimonial Quote Font Style",
      defaultValue: "italic",
    },
    testimonialAuthorFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Testimonial Author Font Style",
      defaultValue: "normal",
    },
    testimonialRoleFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Testimonial Role Font Style",
      defaultValue: "normal",
    },

    // Video Section
    videoHeading: {
      type: "string",
      displayName: "Video Heading",
      defaultValue: "See Our Ministry in Action",
    },
    videoSubheading: {
      type: "string",
      displayName: "Video Subheading",
      defaultValue: "Watch how we are reaching communities around the world",
    },
    videoEmbedUrl: {
      type: "string",
      displayName: "Video Embed URL",
      defaultValue: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    videoBackgroundColor: {
      type: "color",
      displayName: "Video Background Color",
      defaultValue: "#0f172a",
    },
    videoHeadingFontSize: {
      type: "string",
      displayName: "Video Heading Font Size",
      defaultValue: "2.25rem",
      description: "e.g., 2.25rem, 36px, 2.25em",
    },
    videoSubheadingFontSize: {
      type: "string",
      displayName: "Video Subheading Font Size",
      defaultValue: "1.25rem",
      description: "e.g., 1.25rem, 20px, 1.25em",
    },
    videoHeadingLineHeight: {
      type: "string",
      displayName: "Video Heading Line Height",
      defaultValue: "1.3",
      description: "e.g., 1.3, 1.5, 2",
    },
    videoSubheadingLineHeight: {
      type: "string",
      displayName: "Video Subheading Line Height",
      defaultValue: "1.5",
      description: "e.g., 1.5, 1.8, 2",
    },
    videoHeadingFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Video Heading Font Weight",
      defaultValue: "normal",
    },
    videoSubheadingFontWeight: {
      type: "choice",
      options: ["normal", "bold"],
      displayName: "Video Subheading Font Weight",
      defaultValue: "normal",
    },
    videoHeadingFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Video Heading Font Style",
      defaultValue: "normal",
    },
    videoSubheadingFontStyle: {
      type: "choice",
      options: ["normal", "italic"],
      displayName: "Video Subheading Font Style",
      defaultValue: "normal",
    },
    videoSectionPaddingY: {
      type: "number",
      displayName: "Video Section Vertical Padding (px)",
      defaultValue: 80,
      description: "Top and bottom padding inside the video section",
    },
    videoSectionPaddingX: {
      type: "number",
      displayName: "Video Section Horizontal Padding (px)",
      defaultValue: 24,
      description: "Left and right padding inside the video section",
    },
    videoSectionMarginY: {
      type: "number",
      displayName: "Video Section Vertical Margin (px)",
      defaultValue: 0,
      description: "Top and bottom margin OUTSIDE the video section — controls the white gap to adjacent sections",
    },
    videoMaxWidth: {
      type: "string",
      displayName: "Video Content Max Width",
      defaultValue: "56rem",
      description: "Max width of the heading, subheading, and video (e.g. 56rem, 900px, 80%)",
    },
  },
  importPath: "./app/ministry/page",
});

PLASMIC.registerComponent(AboutUsPage, {
    name: "AboutUsPage",
    displayName: "About Us Page",
    description: "Magazine-style About Us page with customizable colors, links, SVG icon support, and all content editable",
    props: {
      className: {
        type: "class",
        displayName: "CSS Class",
        description: "Custom CSS classes for styling",
      },

      // Section Visibility Controls
      showHeroSection: {
        type: "boolean",
        defaultValue: true,
        displayName: "Show Hero Section",
      },
      showStatsSection: {
        type: "boolean",
        defaultValue: true,
        displayName: "Show Stats Section",
      },
      showMissionSection: {
        type: "boolean",
        defaultValue: true,
        displayName: "Show Mission Section",
      },
      showVideoSection: {
        type: "boolean",
        defaultValue: true,
        displayName: "Show Video Section",
      },
      showValuesSection: {
        type: "boolean",
        defaultValue: true,
        displayName: "Show Values Section",
      },
      showTimelineSection: {
        type: "boolean",
        defaultValue: true,
        displayName: "Show Timeline Section",
      },
      showCtaSection: {
        type: "boolean",
        defaultValue: true,
        displayName: "Show CTA Section",
      },

      // Hero Section
      heroSubtitle: {
        type: "string",
        defaultValue: "Since 1978",
        displayName: "Hero Subtitle",
      },
      heroTitle: {
        type: "string",
        defaultValue: "Broadcasting",
        displayName: "Hero Title",
      },
      heroTitleItalicWord: {
        type: "string",
        defaultValue: "hope",
        displayName: "Hero Title Italic Word",
      },
      heroTitleSuffix: {
        type: "string",
        defaultValue: "to the world",
        displayName: "Hero Title Suffix",
      },
      heroDescription: {
        type: "string",
        defaultValue:
          "For over 45 years, Great Commission Media Ministries has been sharing the transformative message of faith across borders and generations.",
        displayName: "Hero Description",
      },

      // Stats Section
      showStat1: {
        type: "boolean",
        defaultValue: true,
        displayName: "Show Stat 1",
        section: "Stats Section",
      },
      stat1Number: {
        type: "string",
        defaultValue: "45+",
        displayName: "Stat 1 Number",
        section: "Stats Section",
        hidden: (props: any) => !props.showStat1,
      },
      stat1Label: {
        type: "string",
        defaultValue: "Years of Ministry",
        displayName: "Stat 1 Label",
        section: "Stats Section",
        hidden: (props: any) => !props.showStat1,
      },
      showStat2: {
        type: "boolean",
        defaultValue: true,
        displayName: "Show Stat 2",
        section: "Stats Section",
      },
      stat2Number: {
        type: "string",
        defaultValue: "180+",
        displayName: "Stat 2 Number",
        section: "Stats Section",
        hidden: (props: any) => !props.showStat2,
      },
      stat2Label: {
        type: "string",
        defaultValue: "Countries Reached",
        displayName: "Stat 2 Label",
        section: "Stats Section",
        hidden: (props: any) => !props.showStat2,
      },
      showStat3: {
        type: "boolean",
        defaultValue: true,
        displayName: "Show Stat 3",
        section: "Stats Section",
      },
      stat3Number: {
        type: "string",
        defaultValue: "25+",
        displayName: "Stat 3 Number",
        section: "Stats Section",
        hidden: (props: any) => !props.showStat3,
      },
      stat3Label: {
        type: "string",
        defaultValue: "Languages",
        displayName: "Stat 3 Label",
        section: "Stats Section",
        hidden: (props: any) => !props.showStat3,
      },
      showStat4: {
        type: "boolean",
        defaultValue: true,
        displayName: "Show Stat 4",
        section: "Stats Section",
      },
      stat4Number: {
        type: "string",
        defaultValue: "∞",
        displayName: "Stat 4 Number",
        section: "Stats Section",
        hidden: (props: any) => !props.showStat4,
      },
      stat4Label: {
        type: "string",
        defaultValue: "Lives Transformed",
        displayName: "Stat 4 Label",
        section: "Stats Section",
        hidden: (props: any) => !props.showStat4,
      },

      // Mission Section
      missionHeading: {
        type: "string",
        defaultValue: "Our mission is to empower believers worldwide",
        displayName: "Mission Heading",
      },
      missionParagraph1: {
        type: "string",
        defaultValue:
          "In 1978, Hannu and Laura Haukka embarked on an extraordinary journey—using shortwave radio broadcasts to reach the isolated communities of the Soviet Union with a message of hope and faith.",
        displayName: "Mission Paragraph 1",
      },
      missionParagraph2: {
        type: "string",
        defaultValue:
          "What began as a small radio ministry has grown into a worldwide multimedia movement, touching lives across continents through television, digital platforms, and community outreach.",
        displayName: "Mission Paragraph 2",
      },
      missionParagraph3: {
        type: "string",
        defaultValue:
          "Today, we continue that legacy with the same passion and purpose: to share God's transformative love with every person, in every nation.",
        displayName: "Mission Paragraph 3",
      },

      // Video Section
      videoHeading: {
        type: "string",
        defaultValue: "Power to change lives",
        displayName: "Video Heading",
      },
      videoDescription: {
        type: "string",
        defaultValue:
          "Through innovative media and authentic storytelling, we create content that speaks to the heart, challenges perspectives, and inspires transformation.",
        displayName: "Video Description",
      },
      videoButtonText: {
        type: "string",
        defaultValue: "Watch Our Story",
        displayName: "Video Button Text",
      },
      videoUrl: {
        type: "string",
        defaultValue: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        displayName: "Video URL",
        description: "YouTube embed URL for the video",
      },
      videoSectionBgColor: {
        type: "color",
        defaultValue: "#1F2D55",
        displayName: "Video Section Background",
        description: "Background color for the video section (Royal Blue)",
      },
      videoButtonBgColor: {
        type: "color",
        defaultValue: "#D4A574",
        displayName: "Video Button Background",
        description: "Background color for the video button",
      },
      videoButtonTextColor: {
        type: "color",
        defaultValue: "#0A0A0A",
        displayName: "Video Button Text",
        description: "Text color for the video button",
      },
      videoButtonLink: {
        type: "string",
        defaultValue: "#",
        displayName: "Video Button Link",
        description: "URL for the video button (e.g., /watch-video or https://...)",
      },

      // Values Section
      valuesHeading: {
        type: "string",
        defaultValue: "What drives us",
        displayName: "Values Heading",
      },
      
      // Value 1
      showValue1: {
        type: "boolean",
        defaultValue: true,
        displayName: "Show Value 1",
        description: "Toggle to show/hide the first value card",
      },
      value1Title: {
        type: "string",
        defaultValue: "Authenticity",
        displayName: "Value 1 Title",
      },
      value1Description: {
        type: "string",
        defaultValue: "We believe in genuine storytelling that resonates with real human experiences and challenges.",
        displayName: "Value 1 Description",
      },
      value1IconType: {
        type: "choice",
        options: ["image", "text"],
        defaultValue: "text",
        displayName: "Value 1 Icon Type",
        description: "Choose between uploading an image/SVG or using text/emoji",
      },
      value1IconImage: {
        type: "imageUrl",
        displayName: "Value 1 Icon (Upload SVG/Image)",
        description: "Upload an SVG or image file for the icon",
        hidden: (props) => props.value1IconType !== "image",
      },
      value1IconText: {
        type: "string",
        defaultValue: "✦",
        displayName: "Value 1 Icon (Text/Emoji)",
        description: "Enter an emoji or text character",
        hidden: (props) => props.value1IconType !== "text",
      },
      
      // Value 2
      showValue2: {
        type: "boolean",
        defaultValue: true,
        displayName: "Show Value 2",
        description: "Toggle to show/hide the second value card",
      },
      value2Title: {
        type: "string",
        defaultValue: "Innovation",
        displayName: "Value 2 Title",
      },
      value2Description: {
        type: "string",
        defaultValue: "Embracing new technologies and creative approaches to share timeless truth in fresh ways.",
        displayName: "Value 2 Description",
      },
      value2IconType: {
        type: "choice",
        options: ["image", "text"],
        defaultValue: "text",
        displayName: "Value 2 Icon Type",
        description: "Choose between uploading an image/SVG or using text/emoji",
      },
      value2IconImage: {
        type: "imageUrl",
        displayName: "Value 2 Icon (Upload SVG/Image)",
        description: "Upload an SVG or image file for the icon",
        hidden: (props) => props.value2IconType !== "image",
      },
      value2IconText: {
        type: "string",
        defaultValue: "◆",
        displayName: "Value 2 Icon (Text/Emoji)",
        description: "Enter an emoji or text character",
        hidden: (props) => props.value2IconType !== "text",
      },
      
      // Value 3
      showValue3: {
        type: "boolean",
        defaultValue: true,
        displayName: "Show Value 3",
        description: "Toggle to show/hide the third value card",
      },
      value3Title: {
        type: "string",
        defaultValue: "Global Impact",
        displayName: "Value 3 Title",
      },
      value3Description: {
        type: "string",
        defaultValue: "Building bridges across cultures and languages to create a worldwide community of faith.",
        displayName: "Value 3 Description",
      },
      value3IconType: {
        type: "choice",
        options: ["image", "text"],
        defaultValue: "text",
        displayName: "Value 3 Icon Type",
        description: "Choose between uploading an image/SVG or using text/emoji",
      },
      value3IconImage: {
        type: "imageUrl",
        displayName: "Value 3 Icon (Upload SVG/Image)",
        description: "Upload an SVG or image file for the icon",
        hidden: (props) => props.value3IconType !== "image",
      },
      value3IconText: {
        type: "string",
        defaultValue: "●",
        displayName: "Value 3 Icon (Text/Emoji)",
        description: "Enter an emoji or text character",
        hidden: (props) => props.value3IconType !== "text",
      },
      
      // Value 4
      showValue4: {
        type: "boolean",
        defaultValue: true,
        displayName: "Show Value 4",
        description: "Toggle to show/hide the fourth value card",
      },
      value4Title: {
        type: "string",
        defaultValue: "Excellence",
        displayName: "Value 4 Title",
      },
      value4Description: {
        type: "string",
        defaultValue:
          "Pursuing the highest quality in everything we create, honoring both our mission and our audience.",
        displayName: "Value 4 Description",
      },
      value4IconType: {
        type: "choice",
        options: ["image", "text"],
        defaultValue: "text",
        displayName: "Value 4 Icon Type",
        description: "Choose between uploading an image/SVG or using text/emoji",
      },
      value4IconImage: {
        type: "imageUrl",
        displayName: "Value 4 Icon (Upload SVG/Image)",
        description: "Upload an SVG or image file for the icon",
        hidden: (props) => props.value4IconType !== "image",
      },
      value4IconText: {
        type: "string",
        defaultValue: "■",
        displayName: "Value 4 Icon (Text/Emoji)",
        description: "Enter an emoji or text character",
        hidden: (props) => props.value4IconType !== "text",
      },
      
      // Value 5
      showValue5: {
        type: "boolean",
        defaultValue: true,
        displayName: "Show Value 5",
        description: "Toggle to show/hide the fifth value card",
      },
      value5Title: {
        type: "string",
        defaultValue: "Compassion",
        displayName: "Value 5 Title",
      },
      value5Description: {
        type: "string",
        defaultValue: "Leading with empathy and understanding, meeting people where they are with grace and truth.",
        displayName: "Value 5 Description",
      },
      value5IconType: {
        type: "choice",
        options: ["image", "text"],
        defaultValue: "text",
        displayName: "Value 5 Icon Type",
        description: "Choose between uploading an image/SVG or using text/emoji",
      },
      value5IconImage: {
        type: "imageUrl",
        displayName: "Value 5 Icon (Upload SVG/Image)",
        description: "Upload an SVG or image file for the icon",
        hidden: (props) => props.value5IconType !== "image",
      },
      value5IconText: {
        type: "string",
        defaultValue: "▲",
        displayName: "Value 5 Icon (Text/Emoji)",
        description: "Enter an emoji or text character",
        hidden: (props) => props.value5IconType !== "text",
      },
      
      // Value 6
      showValue6: {
        type: "boolean",
        defaultValue: true,
        displayName: "Show Value 6",
        description: "Toggle to show/hide the sixth value card",
      },
      value6Title: {
        type: "string",
        defaultValue: "Integrity",
        displayName: "Value 6 Title",
      },
      value6Description: {
        type: "string",
        defaultValue: "Operating with transparency and accountability in all aspects of our ministry and stewardship.",
        displayName: "Value 6 Description",
      },
      value6IconType: {
        type: "choice",
        options: ["image", "text"],
        defaultValue: "text",
        displayName: "Value 6 Icon Type",
        description: "Choose between uploading an image/SVG or using text/emoji",
      },
      value6IconImage: {
        type: "imageUrl",
        displayName: "Value 6 Icon (Upload SVG/Image)",
        description: "Upload an SVG or image file for the icon",
        hidden: (props) => props.value6IconType !== "image",
      },
      value6IconText: {
        type: "string",
        defaultValue: "★",
        displayName: "Value 6 Icon (Text/Emoji)",
        description: "Enter an emoji or text character",
        hidden: (props) => props.value6IconType !== "text",
      },

      // Timeline Section
      timelineHeading: {
        type: "string",
        defaultValue: "Our journey",
        displayName: "Timeline Heading",
      },
      timeline1Year: {
        type: "string",
        defaultValue: "1978",
        displayName: "Timeline 1 Year",
      },
      timeline1Title: {
        type: "string",
        defaultValue: "The Beginning",
        displayName: "Timeline 1 Title",
      },
      timeline1Description: {
        type: "string",
        defaultValue:
          "Hannu and Laura Haukka begin shortwave radio broadcasts to the Soviet Union, sharing hope behind the Iron Curtain.",
        displayName: "Timeline 1 Description",
      },
      timeline2Year: {
        type: "string",
        defaultValue: "1990s",
        displayName: "Timeline 2 Year",
      },
      timeline2Title: {
        type: "string",
        defaultValue: "Digital Expansion",
        displayName: "Timeline 2 Title",
      },
      timeline2Description: {
        type: "string",
        defaultValue:
          "As technology evolves, GCM embraces new platforms, launching television programs and early digital initiatives.",
        displayName: "Timeline 2 Description",
      },
      timeline3Year: {
        type: "string",
        defaultValue: "2000s",
        displayName: "Timeline 3 Year",
      },
      timeline3Title: {
        type: "string",
        defaultValue: "Global Reach",
        displayName: "Timeline 3 Title",
      },
      timeline3Description: {
        type: "string",
        defaultValue: "Ministry expands to over 180 countries with content translated into 25+ languages.",
        displayName: "Timeline 3 Description",
      },
      timeline4Year: {
        type: "string",
        defaultValue: "Today",
        displayName: "Timeline 4 Year",
      },
      timeline4Title: {
        type: "string",
        defaultValue: "Multimedia Movement",
        displayName: "Timeline 4 Title",
      },
      timeline4Description: {
        type: "string",
        defaultValue:
          "A comprehensive digital-first approach combining streaming, social media, and traditional broadcasting to reach every generation.",
        displayName: "Timeline 4 Description",
      },

      // CTA Section
      ctaHeading: {
        type: "string",
        defaultValue: "Join us in changing the world",
        displayName: "CTA Heading",
      },
      ctaDescription: {
        type: "string",
        defaultValue: "Your partnership helps us reach more people with a message that transforms lives.",
        displayName: "CTA Description",
      },
      primaryButtonText: {
        type: "string",
        defaultValue: "Partner With Us",
        displayName: "Primary Button Text",
      },
      secondaryButtonText: {
        type: "string",
        defaultValue: "Contact Our Team",
        displayName: "Secondary Button Text",
      },
      primaryButtonBgColor: {
        type: "color",
        defaultValue: "#D4A574",
        displayName: "Primary Button Background",
        description: "Background color for the primary CTA button",
      },
      primaryButtonTextColor: {
        type: "color",
        defaultValue: "#0A0A0A",
        displayName: "Primary Button Text",
        description: "Text color for the primary button",
      },
      primaryButtonLink: {
        type: "string",
        defaultValue: "#",
        displayName: "Primary Button Link",
        description: "URL for the primary button (e.g., /partner or https://...)",
      },
      secondaryButtonBgColor: {
        type: "color",
        defaultValue: "transparent",
        displayName: "Secondary Button Background",
        description: "Background color for the secondary button",
      },
      secondaryButtonTextColor: {
        type: "color",
        defaultValue: "#ffffff",
        displayName: "Secondary Button Text",
        description: "Text color for the secondary button",
      },
      secondaryButtonBorderColor: {
        type: "color",
        defaultValue: "#ffffff",
        displayName: "Secondary Button Border",
        description: "Border color for the secondary button",
      },
      secondaryButtonLink: {
        type: "string",
        defaultValue: "#",
        displayName: "Secondary Button Link",
        description: "URL for the secondary button (e.g., /contact or https://...)",
      },
    },
    importPath: "./components/about-us-page",
  });

PLASMIC.registerComponent(StaffPage, {
  name: "StaffPage",
  displayName: "Staff Page",
  description: "A staff/team page displaying team members with their roles and bios",
  props: {
    className: {
      type: "class",
      displayName: "Custom Classes",
      description: "CSS classes for full styling control",
    },

    // Header
    sectionTitle: {
      type: "string",
      displayName: "Section Title",
      defaultValue: "Our Team",
      description: "Title for the staff section",
    },
    sectionSubtitle: {
      type: "string",
      displayName: "Section Subtitle",
      defaultValue: "Meet the people behind our mission",
      description: "Subtitle for the staff section",
    },

    // Font Sizes
    titleFontSize: {
      type: "number",
      displayName: "Title Font Size",
      defaultValue: 48,
      description: "Font size for section title in pixels",
    },
    subtitleFontSize: {
      type: "number",
      displayName: "Subtitle Font Size",
      defaultValue: 18,
      description: "Font size for section subtitle in pixels",
    },
    nameFontSize: {
      type: "number",
      displayName: "Name Font Size",
      defaultValue: 20,
      description: "Font size for staff member names in pixels",
    },
    roleFontSize: {
      type: "number",
      displayName: "Role Font Size",
      defaultValue: 14,
      description: "Font size for staff member roles in pixels",
    },
    bioFontSize: {
      type: "number",
      displayName: "Bio Font Size",
      defaultValue: 14,
      description: "Font size for staff member bios in pixels",
    },

    // Staff Members
    staffMembers: {
      type: "array",
      displayName: "Staff Members",
      defaultValue: [
        {
          name: "John Doe",
          role: "Executive Director",
          bio: "Leading our mission with passion and dedication to serve communities worldwide.",
          image: "/placeholder.svg?height=400&width=400",
          links: {
            linkedin: "https://linkedin.com",
          },
        },
        {
          name: "Jane Smith",
          role: "Director of Operations",
          bio: "Overseeing daily operations and ensuring excellence in all our programs.",
          image: "/placeholder.svg?height=400&width=400",
          links: {
            linkedin: "https://linkedin.com",
          },
        },
      ],
      itemType: {
        type: "object",
        fields: {
          name: "string",
          role: "string",
          bio: "string",
          image: "imageUrl",
          links: {
            type: "object",
            fields: {
              github: "string",
              linkedin: "string",
              twitter: "string",
              website: "string",
            },
          },
        },
      },
    },

    // Colors
    backgroundColor: {
      type: "string",
      displayName: "Background Color",
      defaultValue: "#FFFFFF",
      description: "Section background color (hex code)",
    },
    titleColor: {
      type: "string",
      displayName: "Title Color",
      defaultValue: "#1A1A1A",
      description: "Section title color (hex code)",
    },
    subtitleColor: {
      type: "string",
      displayName: "Subtitle Color",
      defaultValue: "#666666",
      description: "Section subtitle color (hex code)",
    },
    cardBackgroundColor: {
      type: "string",
      displayName: "Card Background",
      defaultValue: "#FFFFFF",
      description: "Staff card background color (hex code)",
    },
    cardTextColor: {
      type: "string",
      displayName: "Card Text Color",
      defaultValue: "#1A1A1A",
      description: "Staff card name text color (hex code)",
    },
    cardRoleColor: {
      type: "string",
      displayName: "Card Role Color",
      defaultValue: "#666666",
      description: "Staff card role text color (hex code)",
    },
    cardBioColor: {
      type: "string",
      displayName: "Card Bio Color",
      defaultValue: "#4A4A4A",
      description: "Staff card bio text color (hex code)",
    },
    cardBorderColor: {
      type: "string",
      displayName: "Card Border Color",
      defaultValue: "#E5E5E5",
      description: "Staff card border color (hex code)",
    },
    linkColor: {
      type: "string",
      displayName: "Link Color",
      defaultValue: "#666666",
      description: "Social link color (hex code)",
    },
    linkHoverColor: {
      type: "string",
      displayName: "Link Hover Color",
      defaultValue: "#1A1A1A",
      description: "Social link hover color (hex code)",
    },
  },
  importPath: "./components/staff-page",
});

PLASMIC.registerComponent(TimelinePage, {
  name: "TimelinePage",
  displayName: "Timeline Page",
  description: "A timeline/history page showing ministry story with events and milestones",
  props: {
    className: {
      type: "class",
      displayName: "Custom Classes",
      description: "CSS classes for full styling control",
    },

    // Header
    title: {
      type: "string",
      displayName: "Title",
      defaultValue: "Our Story",
      description: "Title for the timeline section",
    },
    subtitle: {
      type: "string",
      displayName: "Subtitle",
      defaultValue: "A Journey of Faith and Service",
      description: "Subtitle for the timeline section",
    },

    // Timeline Events
    timelineEvents: {
      type: "array",
      displayName: "Timeline Events",
      defaultValue: [
        {
          year: "2010",
          title: "The Beginning",
          description: "Our organization was founded with a vision to make a difference in the world.",
          highlight: true,
          hasImage: false,
        },
        {
          year: "2015",
          title: "Expansion",
          description: "We expanded our reach to serve communities across multiple countries.",
          highlight: false,
          hasImage: false,
        },
        {
          year: "2020",
          title: "Digital Transformation",
          description: "Embracing technology to reach more people and increase our impact.",
          highlight: true,
          hasImage: false,
        },
      ],
      itemType: {
        type: "object",
        fields: {
          year: {
            type: "string",
            displayName: "Year",
            defaultValue: "2024",
          },
          title: {
            type: "string",
            displayName: "Title",
            defaultValue: "New Event",
          },
          description: {
            type: "string",
            displayName: "Description",
            defaultValue: "Add your event description here.",
          },
          highlight: {
            type: "boolean",
            displayName: "Highlight",
            defaultValue: false,
          },
          hasImage: {
            type: "boolean",
            displayName: "Has Image",
            defaultValue: false,
          },
          image: {
            type: "imageUrl",
            displayName: "Image",
            defaultValue: "/placeholder.svg?height=400&width=400",
          },
        },
      },
    },

    // Colors
    backgroundColor: {
      type: "string",
      displayName: "Background Color",
      defaultValue: "#0A0A0A",
      description: "Section background color (hex code)",
    },
    titleColor: {
      type: "string",
      displayName: "Title Color",
      defaultValue: "#FFFFFF",
      description: "Section title color (hex code)",
    },
    subtitleColor: {
      type: "string",
      displayName: "Subtitle Color",
      defaultValue: "#999999",
      description: "Section subtitle color (hex code)",
    },
    lineColor: {
      type: "string",
      displayName: "Line Color",
      defaultValue: "#F59E0B",
      description: "Timeline vertical line color (hex code)",
    },
    accentColor: {
      type: "string",
      displayName: "Accent Color",
      defaultValue: "#F59E0B",
      description: "Timeline accent color for highlights (hex code)",
    },
    yearColor: {
      type: "string",
      displayName: "Year Color",
      defaultValue: "#999999",
      description: "Timeline year text color (hex code)",
    },
    highlightYearColor: {
      type: "string",
      displayName: "Highlight Year Color",
      defaultValue: "#F59E0B",
      description: "Timeline highlighted year color (hex code)",
    },
    eventTitleColor: {
      type: "string",
      displayName: "Event Title Color",
      defaultValue: "#FFFFFF",
      description: "Timeline event title color (hex code)",
    },
    eventDescriptionColor: {
      type: "string",
      displayName: "Event Description Color",
      defaultValue: "#CCCCCC",
      description: "Timeline event description color (hex code)",
    },
    dotColor: {
      type: "string",
      displayName: "Dot Color",
      defaultValue: "#666666",
      description: "Timeline dot color for regular events (hex code)",
    },
    highlightDotColor: {
      type: "string",
      displayName: "Highlight Dot Color",
      defaultValue: "#F59E0B",
      description: "Timeline dot color for highlighted events (hex code)",
    },

    // Animation Control
    enableAnimations: {
      type: "boolean",
      displayName: "Enable Animations",
      defaultValue: true,
      description: "Enable scroll-triggered animations for timeline events",
    },
  },
  importPath: "./components/timeline-page",
});

PLASMIC.registerComponent(News2, {
  name: "News2",
  displayName: "News2",
  description: "A modern news section with unlimited customizable articles, pagination, and individual animations",
  props: {
    className: {
      type: "string",
      displayName: "Class Name",
      description: "Additional CSS classes",
    },

    // Section Content
    sectionTitle: {
      type: "string",
      displayName: "Section Title",
      defaultValue: "The latest",
    },
    useSectionTitleGradient: {
      type: "boolean",
      displayName: "Use Gradient for Section Title",
      defaultValue: true,
      description: "Enable gradient coloring for the section title (when disabled, uses Title Color as solid color)",
    },
    sectionTitleGradientFrom: {
      type: "color",
      displayName: "Section Title Gradient Start",
      defaultValue: "#2563eb",
      description: "Starting color of the section title gradient (only used when gradient is enabled)",
    },
    sectionTitleGradientTo: {
      type: "color",
      displayName: "Section Title Gradient End",
      defaultValue: "#1e293b",
      description: "Ending color of the section title gradient (only used when gradient is enabled)",
    },
    titleColor: {
      type: "color",
      displayName: "Section Title Color",
      defaultValue: "#6b7280",
      description: "Solid color of the section title (used when gradient is disabled)",
    },
    sectionSubtitle: {
      type: "string",
      displayName: "Section Subtitle",
      defaultValue: "News & Articles",
    },
    description: {
      type: "string",
      displayName: "Description",
      defaultValue: "Stay updated with our latest stories and insights from around the world.",
    },

    // Colors
    backgroundColor: {
      type: "color",
      displayName: "Background Color",
      defaultValue: "#eff6ff",
    },
    subtitleColor: {
      type: "color",
      displayName: "Subtitle Color",
      defaultValue: "#2563eb",
    },
    descriptionColor: {
      type: "color",
      displayName: "Description Color",
      defaultValue: "#4b5563",
    },
    cardBackgroundColor: {
      type: "color",
      displayName: "Card Background Color",
      defaultValue: "#ffffff",
    },
    cardBorderColor: {
      type: "color",
      displayName: "Card Border Color",
      defaultValue: "#f3f4f6",
    },
    cardHoverBorderColor: {
      type: "color",
      displayName: "Card Hover Border Color",
      defaultValue: "#e5e7eb",
    },
    titleTextColor: {
      type: "color",
      displayName: "Article Title Color",
      defaultValue: "#111827",
    },
    titleHoverColor: {
      type: "color",
      displayName: "Article Title Hover Color",
      defaultValue: "#2563eb",
    },
    excerptColor: {
      type: "color",
      displayName: "Excerpt Color",
      defaultValue: "#4b5563",
    },
    metaColor: {
      type: "color",
      displayName: "Meta Info Color",
      defaultValue: "#6b7280",
    },
    metaHoverColor: {
      type: "color",
      displayName: "Meta Info Hover Color",
      defaultValue: "#2563eb",
    },
    categoryBadgeBackground: {
      type: "color",
      displayName: "Category Badge Background",
      defaultValue: "#ffffff",
    },
    categoryBadgeText: {
      type: "color",
      displayName: "Category Badge Text Color",
      defaultValue: "#374151",
    },
    readMoreColor: {
      type: "color",
      displayName: "Read More Link Color",
      defaultValue: "#2563eb",
    },
    readMoreHoverColor: {
      type: "color",
      displayName: "Read More Hover Color",
      defaultValue: "#1d4ed8",
    },

    viewMoreButtonText: {
      type: "string",
      displayName: "View More Button Text",
      defaultValue: "View More",
    },
    showViewMoreButton: {
      type: "boolean",
      displayName: "Show View More Button",
      defaultValue: true,
      description: "Show/hide the View More button when there are more articles",
    },
    viewMoreButtonUrl: {
      type: "string",
      displayName: "View More Button URL",
      defaultValue: "",
      description: "URL for the View More button (e.g., /news or /all-articles). Button only appears when URL is provided.",
    },
    useButtonGradient: {
      type: "boolean",
      displayName: "Use Button Gradient",
      defaultValue: false,
      description: "Enable gradient background for button instead of solid color",
    },
    viewMoreButtonBackground: {
      type: "color",
      displayName: "View More Button Background",
      defaultValue: "#2563eb",
      description: "Solid background color (used when gradient is off)",
    },
    viewMoreButtonHoverBackground: {
      type: "color",
      displayName: "View More Button Hover Background",
      defaultValue: "#1d4ed8",
      description: "Solid hover background color (used when gradient is off)",
    },
    viewMoreButtonGradientFrom: {
      type: "color",
      displayName: "Button Gradient From",
      defaultValue: "#2563eb",
      description: "Start color for gradient (used when gradient is on)",
    },
    viewMoreButtonGradientTo: {
      type: "color",
      displayName: "Button Gradient To",
      defaultValue: "#1d4ed8",
      description: "End color for gradient (used when gradient is on)",
    },
    viewMoreButtonHoverGradientFrom: {
      type: "color",
      displayName: "Button Hover Gradient From",
      defaultValue: "#1d4ed8",
      description: "Start color for hover gradient (used when gradient is on)",
    },
    viewMoreButtonHoverGradientTo: {
      type: "color",
      displayName: "Button Hover Gradient To",
      defaultValue: "#1e40af",
      description: "End color for hover gradient (used when gradient is on)",
    },
    viewMoreButtonTextColor: {
      type: "color",
      displayName: "View More Button Text Color",
      defaultValue: "#ffffff",
    },
    viewMoreButtonPaddingX: {
      type: "string",
      displayName: "View More Button Padding X",
      defaultValue: "32px",
      description: "Horizontal padding (e.g., 32px, 24px)",
    },
    viewMoreButtonPaddingY: {
      type: "string",
      displayName: "View More Button Padding Y",
      defaultValue: "12px",
      description: "Vertical padding (e.g., 12px, 16px)",
    },
    viewMoreButtonBorderRadius: {
      type: "string",
      displayName: "View More Button Border Radius",
      defaultValue: "8px",
      description: "Border radius (e.g., 8px, 12px)",
    },

    // Spacing
    sectionPaddingY: {
      type: "string",
      displayName: "Section Padding Y",
      defaultValue: "96px",
      description: "Vertical padding (e.g., 96px, 80px)",
    },
    cardGap: {
      type: "string",
      displayName: "Card Gap",
      defaultValue: "40px",
      description: "Gap between cards (e.g., 40px, 32px)",
    },
    headerMarginBottom: {
      type: "string",
      displayName: "Header Margin Bottom",
      defaultValue: "64px",
      description: "Space below header (e.g., 64px, 48px)",
    },

    // Articles Array
    articles: {
      type: "array",
      displayName: "Articles",
      description: "Add unlimited news articles - newest articles appear first",
      defaultValue: [
        {
          title: "Restoring Souls in a Wounded Nation",
          excerpt: "Discover how communities are finding hope and healing through faith-based initiatives.",
          image: "/placeholder.svg?height=300&width=400",
          date: "Dec 15, 2024",
          readTime: "5 min read",
          category: "Ministry",
          url: "/articles/restoring-souls-wounded-nation",
        },
        {
          title: "When a heart remains with the Maithili people",
          excerpt: "A touching story of dedication and service among the Maithili community.",
          image: "/placeholder.svg?height=300&width=400",
          date: "Dec 12, 2024",
          readTime: "7 min read",
          category: "Missions",
          url: "/articles/heart-remains-maithili-people",
        },
        {
          title: "God is doing something new in Egypt",
          excerpt: "Witnessing transformation and renewal in the heart of the Middle East.",
          image: "/placeholder.svg?height=300&width=400",
          date: "Dec 10, 2024",
          readTime: "6 min read",
          category: "Global",
          url: "/articles/god-doing-something-new-egypt",
        },
      ],
      itemType: {
        type: "object",
        fields: {
          title: {
            type: "string",
            displayName: "Article Title",
            defaultValue: "Article Title",
          },
          excerpt: {
            type: "string",
            displayName: "Article Excerpt",
            defaultValue: "A brief description of the article content.",
          },
          image: {
            type: "imageUrl",
            displayName: "Article Image",
            defaultValue: "/placeholder.svg?height=300&width=400",
          },
          date: {
            type: "string",
            displayName: "Publication Date",
            defaultValue: "Dec 1, 2024",
          },
          readTime: {
            type: "string",
            displayName: "Read Time",
            defaultValue: "5 min read",
          },
          category: {
            type: "string",
            displayName: "Category",
            defaultValue: "News",
          },
          url: {
            type: "string",
            displayName: "Article URL",
            defaultValue: "/articles/article-slug",
          },
        },
      },
    },
  },
  importPath: "./components/modern-news-section",
});

PLASMIC.registerComponent(NewsletterHub, {
  name: "NewsletterHub",
  displayName: "NewsletterHub",
  description: "A modern masonry-style news section with featured articles and pagination",
  props: {
    className: {
      type: "string",
      displayName: "Class Name",
      description: "Additional CSS classes",
    },

    sectionTitle: {
      type: "string",
      displayName: "Section Title",
      defaultValue: "The latest",
    },
    sectionSubtitle: {
      type: "string",
      displayName: "Section Subtitle",
      defaultValue: "News & Articles",
    },
    description: {
      type: "string",
      displayName: "Description",
      defaultValue: "Stay updated with our latest stories and insights from around the world.",
    },

    // Search Bar Settings
    showSearchBar: {
      type: "boolean",
      displayName: "Show Search Bar",
      defaultValue: true,
      description: "Display search bar above category buttons",
    },
    searchBarPlaceholder: {
      type: "string",
      displayName: "Search Bar Placeholder",
      defaultValue: "Search articles and blog posts...",
    },
    searchBarBackground: {
      type: "string",
      displayName: "Search Bar Background",
      defaultValue: "#ffffff",
    },
    searchBarTextColor: {
      type: "string",
      displayName: "Search Bar Text Color",
      defaultValue: "#1f2937",
    },
    searchBarBorderColor: {
      type: "string",
      displayName: "Search Bar Border Color",
      defaultValue: "#e5e7eb",
    },
    searchBarBorderRadius: {
      type: "string",
      displayName: "Search Bar Border Radius",
      defaultValue: "9999px",
    },
    searchBarPadding: {
      type: "string",
      displayName: "Search Bar Padding",
      defaultValue: "12px 24px",
    },
    searchBarFontSize: {
      type: "string",
      displayName: "Search Bar Font Size",
      defaultValue: "1rem",
    },
    searchButtonBackground: {
      type: "string",
      displayName: "Search Button Background",
      defaultValue: "#0ea5e9",
    },
    searchButtonHoverBackground: {
      type: "string",
      displayName: "Search Button Hover Background",
      defaultValue: "#0284c7",
    },
    searchButtonTextColor: {
      type: "string",
      displayName: "Search Button Text Color",
      defaultValue: "#ffffff",
    },
    searchBarMarginBottom: {
      type: "string",
      displayName: "Search Bar Margin Bottom",
      defaultValue: "32px",
    },

    // Clear Button Settings
    clearButtonText: {
      type: "string",
      displayName: "Clear Button Text",
      defaultValue: "Clear",
      description: "Text displayed on the clear button",
    },
    clearButtonBackground: {
      type: "string",
      displayName: "Clear Button Background",
      defaultValue: "#ef4444",
      description: "Background color for the clear button",
    },
    clearButtonHoverBackground: {
      type: "string",
      displayName: "Clear Button Hover Background",
      defaultValue: "#dc2626",
      description: "Hover background color for the clear button",
    },
    clearButtonTextColor: {
      type: "string",
      displayName: "Clear Button Text Color",
      defaultValue: "#ffffff",
      description: "Text color for the clear button",
    },
    clearButtonPadding: {
      type: "string",
      displayName: "Clear Button Padding",
      defaultValue: "12px 24px",
      description: "Padding for the clear button",
    },
    clearButtonBorderRadius: {
      type: "string",
      displayName: "Clear Button Border Radius",
      defaultValue: "9999px",
      description: "Border radius for the clear button",
    },
    clearButtonFontSize: {
      type: "string",
      displayName: "Clear Button Font Size",
      defaultValue: "1rem",
      description: "Font size for the clear button",
    },
    clearButtonFontWeight: {
      type: "string",
      displayName: "Clear Button Font Weight",
      defaultValue: "600",
      description: "Font weight for the clear button",
    },

    // Background Image Settings
    backgroundImage: {
      type: "imageUrl",
      displayName: "Background Image",
      description: "Hero background image (leave empty for no background)",
    },
    backgroundOverlayColor: {
      type: "string",
      displayName: "Background Overlay Color",
      defaultValue: "rgba(0, 0, 0, 0.5)",
      description: "Overlay color with transparency (e.g., rgba(0, 0, 0, 0.5))",
    },
    backgroundPosition: {
      type: "string",
      displayName: "Background Position",
      defaultValue: "center",
      description: "CSS background-position (e.g., center, top, bottom)",
    },
    backgroundSize: {
      type: "string",
      displayName: "Background Size",
      defaultValue: "cover",
      description: "CSS background-size (e.g., cover, contain)",
    },

    backgroundColor: {
      type: "string",
      displayName: "Background Color",
      defaultValue: "#ffffff",
      description: "Hex color code (e.g., #ffffff)",
    },
    titleColor: {
      type: "string",
      displayName: "Title Color",
      defaultValue: "#1f2937",
    },
    subtitleColor: {
      type: "string",
      displayName: "Subtitle Color",
      defaultValue: "#1e3a8a",
    },
    descriptionColor: {
      type: "string",
      displayName: "Description Color",
      defaultValue: "#4b5563",
    },
    cardBackgroundColor: {
      type: "string",
      displayName: "Card Background Color",
      defaultValue: "#ffffff",
    },
    cardBorderColor: {
      type: "string",
      displayName: "Card Border Color",
      defaultValue: "#e5e7eb",
    },
    cardHoverBorderColor: {
      type: "string",
      displayName: "Card Hover Border Color",
      defaultValue: "#d1d5db",
    },
    titleTextColor: {
      type: "string",
      displayName: "Article Title Color",
      defaultValue: "#1e3a8a",
    },
    titleHoverColor: {
      type: "string",
      displayName: "Article Title Hover Color",
      defaultValue: "#1e40af",
    },
    excerptColor: {
      type: "string",
      displayName: "Excerpt Color",
      defaultValue: "#4b5563",
    },
    metaColor: {
      type: "string",
      displayName: "Meta Info Color",
      defaultValue: "#6b7280",
    },
    metaHoverColor: {
      type: "string",
      displayName: "Meta Info Hover Color",
      defaultValue: "#1e3a8a",
    },
    categoryBadgeBackground: {
      type: "string",
      displayName: "Category Badge Background",
      defaultValue: "#ffffff",
    },
    categoryBadgeText: {
      type: "string",
      displayName: "Category Badge Text Color",
      defaultValue: "#1e3a8a",
    },
    readMoreColor: {
      type: "string",
      displayName: "Read More Link Color",
      defaultValue: "#2563eb",
    },
    readMoreHoverColor: {
      type: "string",
      displayName: "Read More Hover Color",
      defaultValue: "#1d4ed8",
    },

    viewMoreButtonText: {
      type: "string",
      displayName: "View More Button Text",
      defaultValue: "View More",
    },
    viewMoreButtonBackground: {
      type: "string",
      displayName: "View More Button Background",
      defaultValue: "#2563eb",
    },
    viewMoreButtonHoverBackground: {
      type: "string",
      displayName: "View More Button Hover Background",
      defaultValue: "#1d4ed8",
    },
    viewMoreButtonTextColor: {
      type: "string",
      displayName: "View More Button Text Color",
      defaultValue: "#ffffff",
    },
    viewMoreButtonPaddingX: {
      type: "string",
      displayName: "View More Button Padding X",
      defaultValue: "32px",
    },
    viewMoreButtonPaddingY: {
      type: "string",
      displayName: "View More Button Padding Y",
      defaultValue: "12px",
    },
    viewMoreButtonBorderRadius: {
      type: "string",
      displayName: "View More Button Border Radius",
      defaultValue: "8px",
    },

    sectionPaddingY: {
      type: "string",
      displayName: "Section Padding Y",
      defaultValue: "80px",
    },
    cardGap: {
      type: "string",
      displayName: "Card Gap",
      defaultValue: "32px",
    },
    headerMarginBottom: {
      type: "string",
      displayName: "Header Margin Bottom",
      defaultValue: "64px",
    },

    // Category Filter Button Settings
    showCategoryButtons: {
      type: "boolean",
      displayName: "Show Category Buttons",
      defaultValue: true,
      description: "Display category filter buttons above articles",
    },
    categoryButtonsBackground: {
      type: "string",
      displayName: "Category Buttons Background",
      defaultValue: "#d4a574",
      description: "Background color for category buttons",
    },
    categoryButtonsHoverBackground: {
      type: "string",
      displayName: "Category Buttons Hover Background",
      defaultValue: "#b8935f",
      description: "Hover background color for category buttons",
    },
    categoryButtonsTextColor: {
      type: "string",
      displayName: "Category Buttons Text Color",
      defaultValue: "#ffffff",
    },
    categoryButtonsFontSize: {
      type: "string",
      displayName: "Category Buttons Font Size",
      defaultValue: "0.875rem",
    },
    categoryButtonsFontWeight: {
      type: "string",
      displayName: "Category Buttons Font Weight",
      defaultValue: "700",
    },
    categoryButtonsPadding: {
      type: "string",
      displayName: "Category Buttons Padding",
      defaultValue: "12px 24px",
      description: "Format: vertical horizontal (e.g., 12px 24px)",
    },
    categoryButtonsBorderRadius: {
      type: "string",
      displayName: "Category Buttons Border Radius",
      defaultValue: "4px",
    },
    categoryButtonsGap: {
      type: "string",
      displayName: "Category Buttons Gap",
      defaultValue: "12px",
      description: "Space between category buttons",
    },
    categoryButtonsMarginBottom: {
      type: "string",
      displayName: "Category Buttons Margin Bottom",
      defaultValue: "48px",
      description: "Space below category buttons",
    },

    // Category 1
    category1Name: {
      type: "string",
      displayName: "Category 1 Name",
      defaultValue: "FEASTS & SPECIAL DAYS",
      description: "Display name for category button 1",
    },
    category1Tag: {
      type: "string",
      displayName: "Category 1 Tag",
      defaultValue: "Feasts",
      description: "Search tag for filtering (e.g., 'Feasts')",
    },

    // Category 2
    category2Name: {
      type: "string",
      displayName: "Category 2 Name",
      defaultValue: "MESSIANIC PERSPECTIVE",
    },
    category2Tag: {
      type: "string",
      displayName: "Category 2 Tag",
      defaultValue: "Messianic",
    },

    // Category 3
    category3Name: {
      type: "string",
      displayName: "Category 3 Name",
      defaultValue: "ARABIC MINISTRY NEWS",
    },
    category3Tag: {
      type: "string",
      displayName: "Category 3 Tag",
      defaultValue: "Arabic",
    },

    // Category 4
    category4Name: {
      type: "string",
      displayName: "Category 4 Name",
      defaultValue: "INSIGHTS FROM HEBREW",
    },
    category4Tag: {
      type: "string",
      displayName: "Category 4 Tag",
      defaultValue: "Hebrew",
    },

    // Category 5
    category5Name: {
      type: "string",
      displayName: "Category 5 Name",
      defaultValue: "JEWISH APOLOGETICS",
    },
    category5Tag: {
      type: "string",
      displayName: "Category 5 Tag",
      defaultValue: "Apologetics",
    },

    // Category 6
    category6Name: {
      type: "string",
      displayName: "Category 6 Name",
      defaultValue: "BIBLE TEACHINGS",
    },
    category6Tag: {
      type: "string",
      displayName: "Category 6 Tag",
      defaultValue: "Bible",
    },

    articles: {
      type: "array",
      displayName: "Articles",
      description: "Add unlimited news articles - featured articles appear larger in masonry layout",
      defaultValue: [
        {
          title: "Restoring Souls in a Wounded Nation",
          excerpt: "Discover how communities are finding hope and healing through faith-based initiatives.",
          image: "/placeholder.svg?height=300&width=400",
          date: "Dec 15, 2024",
          readTime: "5 min read",
          category: "Ministry",
          url: "/articles/restoring-souls-wounded-nation",
        },
        {
          title: "When a heart remains with the Maithili people",
          excerpt: "A touching story of dedication and service among the Maithili community.",
          image: "/placeholder.svg?height=300&width=400",
          date: "Dec 12, 2024",
          readTime: "7 min read",
          category: "Missions",
          url: "/articles/heart-remains-maithili-people",
        },
        {
          title: "God is doing something new in Egypt",
          excerpt: "Witnessing transformation and renewal in the heart of the Middle East.",
          image: "/placeholder.svg?height=300&width=400",
          date: "Dec 10, 2024",
          readTime: "6 min read",
          category: "Global",
          url: "/articles/god-doing-something-new-egypt",
        },
      ],
      itemType: {
        type: "object",
        fields: {
          title: {
            type: "string",
            displayName: "Article Title",
          },
          excerpt: {
            type: "string",
            displayName: "Article Excerpt",
          },
          image: {
            type: "imageUrl",
            displayName: "Article Image",
          },
          date: {
            type: "string",
            displayName: "Publication Date",
          },
          readTime: {
            type: "string",
            displayName: "Read Time",
          },
          category: {
            type: "string",
            displayName: "Category",
          },
          url: {
            type: "string",
            displayName: "Article URL",
          },
        },
      },
    },
  },
  importPath: "./components/news2",
});

PLASMIC.registerComponent(MinistryPage, {
  name: "MinistryPage",
  displayName: "Text Layout Component",
  description: "A customizable ministry page with a hero section. Supports rich text editing with heading formatting.",
  props: {
    className: {
      type: "class",
      displayName: "Custom Classes",
      description: "CSS classes for full styling control",
    },
    // Hero Section - Single Rich Text Slot
    heroContent: {
      type: "richText",
      displayName: "Hero Content",
      defaultValue: "<h1>Youth Ministry</h1><p>Empowering the next generation to live out their faith</p>",
      description:
        "Rich text content for the hero section. Use heading tags (H1-H6) from the dropdown to control text size.",
    },
    heroBackgroundColor: {
      type: "string",
      displayName: "Hero Background Color",
      defaultValue: "#2c3e50",
      description: "Hex color code (e.g., #2c3e50)",
    },
    heroBackgroundImage: {
      type: "imageUrl",
      displayName: "Hero Background Image",
      defaultValue: "/youth-group-gathering-worship.jpg",
    },
    heroOverlayColor: {
      type: "string",
      displayName: "Hero Overlay Color",
      defaultValue: "#000000",
      description: "Hex color code for image overlay (e.g., #000000)",
    },
    heroOverlayOpacity: {
      type: "number",
      displayName: "Hero Overlay Opacity",
      defaultValue: 0.4,
      description: "0 to 1 (0=transparent, 1=opaque)",
    },
    heroHeight: {
      type: "number",
      displayName: "Hero Height (px)",
      defaultValue: 500,
      description: "Minimum height of the hero banner in pixels",
    },
    heroPaddingTop: {
      type: "number",
      displayName: "Hero Padding Top (px)",
      defaultValue: 120,
    },
    heroPaddingBottom: {
      type: "number",
      displayName: "Hero Padding Bottom (px)",
      defaultValue: 120,
    },
    heroTextAlign: {
      type: "choice",
      options: ["left", "center", "right"],
      displayName: "Hero Text Alignment",
      defaultValue: "center",
    },
    // Global Settings
    pageBackgroundColor: {
      type: "string",
      displayName: "Page Background Color",
      defaultValue: "#ffffff",
    },
    maxWidth: {
      type: "number",
      displayName: "Max Content Width (px)",
      defaultValue: 1200,
    },
    fontFamily: {
      type: "string",
      displayName: "Font Family",
      defaultValue: "system-ui, -apple-system, sans-serif",
    },
  },
  importPath: "./components/ministry-page",
});

PLASMIC.registerComponent(BlogPage, {
  name: "BlogPage",
  props: {
    className: {
      type: "string",
      defaultValue: "",
      description: "Additional CSS classes",
    },
    layoutType: {
      type: "choice",
      options: ["hero-top", "hero-bottom", "content-only"],
      defaultValue: "hero-top",
      description: "Overall page layout structure",
    },
    // Hero Section
    showHero: {
      type: "boolean",
      defaultValue: true,
      description: "Show hero section",
    },
    heroImage: {
      type: "imageUrl",
      defaultValue: "/aerial-view-of-mountains-and-village.jpg",
      description: "Hero background image",
      hidden: (props) => !props.showHero,
    },
    heroTitle: {
      type: "string",
      defaultValue: "WHEN A HEART REMAINS WITH THE MAITHILI PEOPLE",
      description: "Hero title text",
      hidden: (props) => !props.showHero,
    },
    heroTitleColor: {
      type: "color",
      defaultValue: "#ffffff",
      description: "Hero title color",
      hidden: (props) => !props.showHero,
    },
    heroTitleSize: {
      type: "choice",
      options: ["small", "medium", "large", "xlarge"],
      defaultValue: "large",
      description: "Hero title size",
      hidden: (props) => !props.showHero,
    },
    heroTitleWeight: {
      type: "choice",
      options: ["normal", "medium", "semibold", "bold", "extrabold"],
      defaultValue: "bold",
      description: "Hero title font weight",
      hidden: (props) => !props.showHero,
    },
    heroTitleTransform: {
      type: "choice",
      options: ["none", "uppercase", "lowercase", "capitalize"],
      defaultValue: "uppercase",
      description: "Hero title text transform",
      hidden: (props) => !props.showHero,
    },
    heroTitleStyle: {
      type: "choice",
      options: ["normal", "italic"],
      defaultValue: "normal",
      description: "Hero title font style",
      hidden: (props) => !props.showHero,
    },
    heroTitleDecoration: {
      type: "choice",
      options: ["none", "underline", "line-through"],
      defaultValue: "none",
      description: "Hero title text decoration",
      hidden: (props) => !props.showHero,
    },
    heroHeight: {
      type: "number",
      defaultValue: 600,
      min: 200,
      max: 1000,
      step: 50,
      description: "Hero section height (px)",
      hidden: (props) => !props.showHero,
    },
    heroOverlayOpacity: {
      type: "number",
      defaultValue: 0.3,
      min: 0,
      max: 1,
      step: 0.1,
      description: "Dark overlay opacity (0-1)",
      hidden: (props) => !props.showHero,
    },
    heroAlignment: {
      type: "choice",
      options: ["left", "center", "right"],
      defaultValue: "center",
      description: "Hero title alignment",
      hidden: (props) => !props.showHero,
    },
    heroBorderRadius: {
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 50,
      step: 2,
      description: "Hero border radius (px)",
      hidden: (props) => !props.showHero,
    },
    heroShadow: {
      type: "choice",
      options: ["none", "small", "medium", "large"],
      defaultValue: "none",
      description: "Hero shadow size",
      hidden: (props) => !props.showHero,
    },
    showContent1: {
      type: "boolean",
      defaultValue: true,
      description: "Show content section 1",
    },
    content1Title: {
      type: "string",
      defaultValue: "",
      description: "Content 1 title (optional)",
      hidden: (props) => !props.showContent1,
    },
    content1TitleColor: {
      type: "color",
      defaultValue: "#1a1a1a",
      description: "Content 1 title color",
      hidden: (props) => !props.showContent1 || !props.content1Title,
    },
    content1TitleSize: {
      type: "choice",
      options: ["small", "medium", "large", "xlarge"],
      defaultValue: "large",
      description: "Content 1 title size",
      hidden: (props) => !props.showContent1 || !props.content1Title,
    },
    content1TitleWeight: {
      type: "choice",
      options: ["normal", "medium", "semibold", "bold", "extrabold"],
      defaultValue: "bold",
      description: "Content 1 title weight",
      hidden: (props) => !props.showContent1 || !props.content1Title,
    },
    content1TitleTransform: {
      type: "choice",
      options: ["none", "uppercase", "lowercase", "capitalize"],
      defaultValue: "none",
      description: "Content 1 title transform",
      hidden: (props) => !props.showContent1 || !props.content1Title,
    },
    content1TitleStyle: {
      type: "choice",
      options: ["normal", "italic"],
      defaultValue: "normal",
      description: "Content 1 title style",
      hidden: (props) => !props.showContent1 || !props.content1Title,
    },
    content1Text: {
      type: "string",
      defaultValue:
        "Pastor Tomi's heart was touched by the Maithili. Ministry had begun with great momentum, only to be stopped, but never forgotten. Now, decades later, God has opened the door once again. The living stories of the Bible are finally being revealed to the Maithili people in their language, through Superbook.",
      description: "Content 1 text",
      hidden: (props) => !props.showContent1,
    },
    content1TextColor: {
      type: "color",
      defaultValue: "#1a1a1a",
      description: "Content 1 text color",
      hidden: (props) => !props.showContent1,
    },
    content1TextSize: {
      type: "choice",
      options: ["small", "medium", "large"],
      defaultValue: "medium",
      description: "Content 1 text size",
      hidden: (props) => !props.showContent1,
    },
    content1TextWeight: {
      type: "choice",
      options: ["normal", "medium", "semibold", "bold"],
      defaultValue: "normal",
      description: "Content 1 text weight",
      hidden: (props) => !props.showContent1,
    },
    content1TextTransform: {
      type: "choice",
      options: ["none", "uppercase", "lowercase", "capitalize"],
      defaultValue: "none",
      description: "Content 1 text transform",
      hidden: (props) => !props.showContent1,
    },
    content1TextStyle: {
      type: "choice",
      options: ["normal", "italic"],
      defaultValue: "normal",
      description: "Content 1 text style",
      hidden: (props) => !props.showContent1,
    },
    content1TextDecoration: {
      type: "choice",
      options: ["none", "underline"],
      defaultValue: "none",
      description: "Content 1 text decoration",
      hidden: (props) => !props.showContent1,
    },
    content1BackgroundColor: {
      type: "color",
      defaultValue: "#ffffff",
      description: "Content 1 background color",
      hidden: (props) => !props.showContent1,
    },
    content1PaddingTop: {
      type: "number",
      defaultValue: 64,
      min: 0,
      max: 200,
      step: 8,
      description: "Content 1 top padding (px)",
      hidden: (props) => !props.showContent1,
    },
    content1PaddingBottom: {
      type: "number",
      defaultValue: 64,
      min: 0,
      max: 200,
      step: 8,
      description: "Content 1 bottom padding (px)",
      hidden: (props) => !props.showContent1,
    },
    content1MaxWidth: {
      type: "choice",
      options: ["narrow", "medium", "wide", "full"],
      defaultValue: "medium",
      description: "Content 1 max width",
      hidden: (props) => !props.showContent1,
    },
    content1Alignment: {
      type: "choice",
      options: ["left", "center", "right"],
      defaultValue: "left",
      description: "Content 1 text alignment",
      hidden: (props) => !props.showContent1,
    },
    showContent2: {
      type: "boolean",
      defaultValue: false,
      description: "Show content section 2",
    },
    content2Title: {
      type: "string",
      defaultValue: "",
      description: "Content 2 title (optional)",
      hidden: (props) => !props.showContent2,
    },
    content2TitleColor: {
      type: "color",
      defaultValue: "#1a1a1a",
      description: "Content 2 title color",
      hidden: (props) => !props.showContent2 || !props.content2Title,
    },
    content2TitleSize: {
      type: "choice",
      options: ["small", "medium", "large", "xlarge"],
      defaultValue: "medium",
      description: "Content 2 title size",
      hidden: (props) => !props.showContent2 || !props.content2Title,
    },
    content2TitleWeight: {
      type: "choice",
      options: ["normal", "medium", "semibold", "bold", "extrabold"],
      defaultValue: "bold",
      description: "Content 2 title weight",
      hidden: (props) => !props.showContent2 || !props.content2Title,
    },
    content2TitleTransform: {
      type: "choice",
      options: ["none", "uppercase", "lowercase", "capitalize"],
      defaultValue: "none",
      description: "Content 2 title transform",
      hidden: (props) => !props.showContent2 || !props.content2Title,
    },
    content2TitleStyle: {
      type: "choice",
      options: ["normal", "italic"],
      defaultValue: "normal",
      description: "Content 2 title style",
      hidden: (props) => !props.showContent2 || !props.content2Title,
    },
    content2Text: {
      type: "string",
      defaultValue: "",
      description: "Content 2 text",
      hidden: (props) => !props.showContent2,
    },
    content2TextColor: {
      type: "color",
      defaultValue: "#1a1a1a",
      description: "Content 2 text color",
      hidden: (props) => !props.showContent2,
    },
    content2TextSize: {
      type: "choice",
      options: ["small", "medium", "large"],
      defaultValue: "medium",
      description: "Content 2 text size",
      hidden: (props) => !props.showContent2,
    },
    content2TextWeight: {
      type: "choice",
      options: ["normal", "medium", "semibold", "bold"],
      defaultValue: "normal",
      description: "Content 2 text weight",
      hidden: (props) => !props.showContent2,
    },
    content2TextTransform: {
      type: "choice",
      options: ["none", "uppercase", "lowercase", "capitalize"],
      defaultValue: "none",
      description: "Content 2 text transform",
      hidden: (props) => !props.showContent2,
    },
    content2TextStyle: {
      type: "choice",
      options: ["normal", "italic"],
      defaultValue: "normal",
      description: "Content 2 text style",
      hidden: (props) => !props.showContent2,
    },
    content2BackgroundColor: {
      type: "color",
      defaultValue: "#f9fafb",
      description: "Content 2 background color",
      hidden: (props) => !props.showContent2,
    },
    content2PaddingTop: {
      type: "number",
      defaultValue: 64,
      min: 0,
      max: 200,
      step: 8,
      description: "Content 2 top padding (px)",
      hidden: (props) => !props.showContent2,
    },
    content2PaddingBottom: {
      type: "number",
      defaultValue: 64,
      min: 0,
      max: 200,
      step: 8,
      description: "Content 2 bottom padding (px)",
      hidden: (props) => !props.showContent2,
    },
    content2MaxWidth: {
      type: "choice",
      options: ["narrow", "medium", "wide", "full"],
      defaultValue: "medium",
      description: "Content 2 max width",
      hidden: (props) => !props.showContent2,
    },
    content2Alignment: {
      type: "choice",
      options: ["left", "center", "right"],
      defaultValue: "left",
      description: "Content 2 text alignment",
      hidden: (props) => !props.showContent2,
    },
    content2Image: {
      type: "imageUrl",
      defaultValue: "",
      description: "Content 2 image (optional)",
      hidden: (props) => !props.showContent2,
    },
    content2ImagePosition: {
      type: "choice",
      options: ["left", "right", "top", "bottom"],
      defaultValue: "right",
      description: "Content 2 image position",
      hidden: (props) => !props.showContent2 || !props.content2Image,
    },
    content2ImageSize: {
      type: "choice",
      options: ["small", "medium", "large"],
      defaultValue: "medium",
      description: "Content 2 image size",
      hidden: (props) => !props.showContent2 || !props.content2Image,
    },
    content2ImageBorderRadius: {
      type: "number",
      defaultValue: 8,
      min: 0,
      max: 50,
      step: 2,
      description: "Content 2 image border radius (px)",
      hidden: (props) => !props.showContent2 || !props.content2Image,
    },
    showContent3: {
      type: "boolean",
      defaultValue: false,
      description: "Show content section 3",
    },
    content3Title: {
      type: "string",
      defaultValue: "",
      description: "Content 3 title (optional)",
      hidden: (props) => !props.showContent3,
    },
    content3TitleColor: {
      type: "color",
      defaultValue: "#1a1a1a",
      description: "Content 3 title color",
      hidden: (props) => !props.showContent3 || !props.content3Title,
    },
    content3TitleSize: {
      type: "choice",
      options: ["small", "medium", "large", "xlarge"],
      defaultValue: "medium",
      description: "Content 3 title size",
      hidden: (props) => !props.showContent3 || !props.content3Title,
    },
    content3TitleWeight: {
      type: "choice",
      options: ["normal", "medium", "semibold", "bold", "extrabold"],
      defaultValue: "bold",
      description: "Content 3 title weight",
      hidden: (props) => !props.showContent3 || !props.content3Title,
    },
    content3Text: {
      type: "string",
      defaultValue: "",
      description: "Content 3 text",
      hidden: (props) => !props.showContent3,
    },
    content3TextColor: {
      type: "color",
      defaultValue: "#1a1a1a",
      description: "Content 3 text color",
      hidden: (props) => !props.showContent3,
    },
    content3TextSize: {
      type: "choice",
      options: ["small", "medium", "large"],
      defaultValue: "medium",
      description: "Content 3 text size",
      hidden: (props) => !props.showContent3,
    },
    content3TextWeight: {
      type: "choice",
      options: ["normal", "medium", "semibold", "bold"],
      defaultValue: "normal",
      description: "Content 3 text weight",
      hidden: (props) => !props.showContent3,
    },
    content3BackgroundColor: {
      type: "color",
      defaultValue: "#ffffff",
      description: "Content 3 background color",
      hidden: (props) => !props.showContent3,
    },
    content3PaddingTop: {
      type: "number",
      defaultValue: 64,
      min: 0,
      max: 200,
      step: 8,
      description: "Content 3 top padding (px)",
      hidden: (props) => !props.showContent3,
    },
    content3PaddingBottom: {
      type: "number",
      defaultValue: 64,
      min: 0,
      max: 200,
      step: 8,
      description: "Content 3 bottom padding (px)",
      hidden: (props) => !props.showContent3,
    },
    content3MaxWidth: {
      type: "choice",
      options: ["narrow", "medium", "wide", "full"],
      defaultValue: "medium",
      description: "Content 3 max width",
      hidden: (props) => !props.showContent3,
    },
    content3Alignment: {
      type: "choice",
      options: ["left", "center", "right"],
      defaultValue: "left",
      description: "Content 3 text alignment",
      hidden: (props) => !props.showContent3,
    },
    showPrimaryButton: {
      type: "boolean",
      defaultValue: false,
      description: "Show primary button",
    },
    primaryButtonText: {
      type: "string",
      defaultValue: "Learn More",
      description: "Primary button text",
      hidden: (props) => !props.showPrimaryButton,
    },
    primaryButtonUrl: {
      type: "string",
      defaultValue: "#",
      description: "Primary button URL",
      hidden: (props) => !props.showPrimaryButton,
    },
    primaryButtonColor: {
      type: "color",
      defaultValue: "#2563eb",
      description: "Primary button background",
      hidden: (props) => !props.showPrimaryButton,
    },
    primaryButtonTextColor: {
      type: "color",
      defaultValue: "#ffffff",
      description: "Primary button text color",
      hidden: (props) => !props.showPrimaryButton,
    },
    primaryButtonSize: {
      type: "choice",
      options: ["small", "medium", "large"],
      defaultValue: "medium",
      description: "Primary button size",
      hidden: (props) => !props.showPrimaryButton,
    },
    primaryButtonBorderRadius: {
      type: "number",
      defaultValue: 6,
      min: 0,
      max: 50,
      step: 2,
      description: "Primary button border radius (px)",
      hidden: (props) => !props.showPrimaryButton,
    },
    showSecondaryButton: {
      type: "boolean",
      defaultValue: false,
      description: "Show secondary button",
    },
    secondaryButtonText: {
      type: "string",
      defaultValue: "Contact Us",
      description: "Secondary button text",
      hidden: (props) => !props.showSecondaryButton,
    },
    secondaryButtonUrl: {
      type: "string",
      defaultValue: "#",
      description: "Secondary button URL",
      hidden: (props) => !props.showSecondaryButton,
    },
    secondaryButtonColor: {
      type: "color",
      defaultValue: "#ffffff",
      description: "Secondary button background",
      hidden: (props) => !props.showSecondaryButton,
    },
    secondaryButtonTextColor: {
      type: "color",
      defaultValue: "#1a1a1a",
      description: "Secondary button text color",
      hidden: (props) => !props.showSecondaryButton,
    },
    secondaryButtonSize: {
      type: "choice",
      options: ["small", "medium", "large"],
      defaultValue: "medium",
      description: "Secondary button size",
      hidden: (props) => !props.showSecondaryButton,
    },
    secondaryButtonBorderRadius: {
      type: "number",
      defaultValue: 6,
      min: 0,
      max: 50,
      step: 2,
      description: "Secondary button border radius (px)",
      hidden: (props) => !props.showSecondaryButton,
    },
    buttonAlignment: {
      type: "choice",
      options: ["left", "center", "right"],
      defaultValue: "left",
      description: "Button alignment",
      hidden: (props) => !props.showPrimaryButton && !props.showSecondaryButton,
    },
    buttonPosition: {
      type: "choice",
      options: ["content1", "content2", "content3", "bottom"],
      defaultValue: "content1",
      description: "Where to display buttons",
      hidden: (props) => !props.showPrimaryButton && !props.showSecondaryButton,
    },
  },
});

PLASMIC.registerComponent(SurveyForm, {
  name: "SurveyForm",
  displayName: "Survey Form",
  description: "A flexible, reusable survey form component with customizable fields, styling, and validation",
  props: {
    className: {
      type: "class",
      displayName: "CSS Class",
      description: "Custom CSS classes for styling in Plasmic",
    },

    // Form Container Styling
    backgroundColor: {
      type: "string",
      displayName: "Background Color",
      defaultValue: "#ffffff",
      description: "Hex color for form background (e.g., #ffffff, #f9fafb)",
    },
    maxWidth: {
      type: "string",
      displayName: "Max Width",
      defaultValue: "600px",
      description: "Maximum width of the form (e.g., 600px, 800px, 100%)",
    },
    padding: {
      type: "string",
      displayName: "Padding",
      defaultValue: "32px",
      description: "Padding around the form (e.g., 24px, 32px, 48px)",
    },
    borderRadius: {
      type: "string",
      displayName: "Border Radius",
      defaultValue: "8px",
      description: "Border radius for the form container (e.g., 6px, 8px, 12px)",
    },

    // Title Section
    showTitle: {
      type: "boolean",
      displayName: "Show Title",
      defaultValue: true,
      description: "Show or hide the form title",
    },
    title: {
      type: "string",
      displayName: "Title",
      defaultValue: "Survey Form",
      description: "Form title text",
      hidden: (props: any) => !props.showTitle,
    },
    titleColor: {
      type: "string",
      displayName: "Title Color",
      defaultValue: "#1f2937",
      description: "Hex color for title text",
      hidden: (props: any) => !props.showTitle,
    },
    titleSize: {
      type: "string",
      displayName: "Title Size",
      defaultValue: "32px",
      description: "Font size for title (e.g., 24px, 32px, 40px)",
      hidden: (props: any) => !props.showTitle,
    },

    // Description Section
    showDescription: {
      type: "boolean",
      displayName: "Show Description",
      defaultValue: true,
      description: "Show or hide the form description",
    },
    description: {
      type: "string",
      displayName: "Description",
      defaultValue: "Please fill out this form with your information.",
      description: "Form description text",
      hidden: (props: any) => !props.showDescription,
    },
    descriptionColor: {
      type: "string",
      displayName: "Description Color",
      defaultValue: "#6b7280",
      description: "Hex color for description text",
      hidden: (props: any) => !props.showDescription,
    },

    // Name Field
    showNameField: {
      type: "boolean",
      displayName: "Show Name Field",
      defaultValue: true,
      description: "Show or hide the name field",
    },
    nameLabel: {
      type: "string",
      displayName: "Name Label",
      defaultValue: "Full Name",
      hidden: (props: any) => !props.showNameField,
    },
    namePlaceholder: {
      type: "string",
      displayName: "Name Placeholder",
      defaultValue: "Enter your full name",
      hidden: (props: any) => !props.showNameField,
    },
    nameRequired: {
      type: "boolean",
      displayName: "Name Required",
      defaultValue: true,
      hidden: (props: any) => !props.showNameField,
    },

    // Email Field
    showEmailField: {
      type: "boolean",
      displayName: "Show Email Field",
      defaultValue: true,
      description: "Show or hide the email field",
    },
    emailLabel: {
      type: "string",
      displayName: "Email Label",
      defaultValue: "Email Address",
      hidden: (props: any) => !props.showEmailField,
    },
    emailPlaceholder: {
      type: "string",
      displayName: "Email Placeholder",
      defaultValue: "Enter your email",
      hidden: (props: any) => !props.showEmailField,
    },
    emailRequired: {
      type: "boolean",
      displayName: "Email Required",
      defaultValue: true,
      hidden: (props: any) => !props.showEmailField,
    },

    // Phone Field
    showPhoneField: {
      type: "boolean",
      displayName: "Show Phone Field",
      defaultValue: true,
      description: "Show or hide the phone field",
    },
    phoneLabel: {
      type: "string",
      displayName: "Phone Label",
      defaultValue: "Phone Number",
      hidden: (props: any) => !props.showPhoneField,
    },
    phonePlaceholder: {
      type: "string",
      displayName: "Phone Placeholder",
      defaultValue: "Enter your phone number",
      hidden: (props: any) => !props.showPhoneField,
    },
    phoneRequired: {
      type: "boolean",
      displayName: "Phone Required",
      defaultValue: false,
      hidden: (props: any) => !props.showPhoneField,
    },

    // Message Field
    showMessageField: {
      type: "boolean",
      displayName: "Show Message Field",
      defaultValue: true,
      description: "Show or hide the message/comments field",
    },
    messageLabel: {
      type: "string",
      displayName: "Message Label",
      defaultValue: "Message",
      hidden: (props: any) => !props.showMessageField,
    },
    messagePlaceholder: {
      type: "string",
      displayName: "Message Placeholder",
      defaultValue: "Enter your message or comments",
      hidden: (props: any) => !props.showMessageField,
    },
    messageRequired: {
      type: "boolean",
      displayName: "Message Required",
      defaultValue: false,
      hidden: (props: any) => !props.showMessageField,
    },
    messageRows: {
      type: "number",
      displayName: "Message Rows",
      defaultValue: 4,
      description: "Number of rows for the message textarea",
      hidden: (props: any) => !props.showMessageField,
    },

    // Dropdown Field
    showDropdownField: {
      type: "boolean",
      displayName: "Show Dropdown Field",
      defaultValue: false,
      description: "Show or hide the dropdown field",
    },
    dropdownLabel: {
      type: "string",
      displayName: "Dropdown Label",
      defaultValue: "Select an Option",
      hidden: (props: any) => !props.showDropdownField,
    },
    dropdownPlaceholder: {
      type: "string",
      displayName: "Dropdown Placeholder",
      defaultValue: "Choose one...",
      hidden: (props: any) => !props.showDropdownField,
    },
    dropdownOptions: {
      type: "string",
      displayName: "Dropdown Options",
      defaultValue: "Option 1,Option 2,Option 3",
      description: "Comma-separated list of dropdown options",
      hidden: (props: any) => !props.showDropdownField,
    },
    dropdownRequired: {
      type: "boolean",
      displayName: "Dropdown Required",
      defaultValue: false,
      hidden: (props: any) => !props.showDropdownField,
    },

    // Checkbox Field
    showCheckboxField: {
      type: "boolean",
      displayName: "Show Checkbox Field",
      defaultValue: false,
      description: "Show or hide the checkbox field",
    },
    checkboxLabel: {
      type: "string",
      displayName: "Checkbox Label",
      defaultValue: "Agreement",
      hidden: (props: any) => !props.showCheckboxField,
    },
    checkboxText: {
      type: "string",
      displayName: "Checkbox Text",
      defaultValue: "I agree to the terms and conditions",
      hidden: (props: any) => !props.showCheckboxField,
    },
    checkboxRequired: {
      type: "boolean",
      displayName: "Checkbox Required",
      defaultValue: false,
      hidden: (props: any) => !props.showCheckboxField,
    },

    // Custom Question 1
    showQuestion1: {
      type: "boolean",
      displayName: "Show Question 1",
      defaultValue: false,
      description: "Show or hide custom question 1",
    },
    question1Label: {
      type: "string",
      displayName: "Question 1 Label",
      defaultValue: "Question 1",
      hidden: (props: any) => !props.showQuestion1,
    },
    question1Type: {
      type: "choice",
      displayName: "Question 1 Type",
      options: ["text", "textarea", "dropdown", "radio"],
      defaultValue: "text",
      description: "Field type for question 1",
      hidden: (props: any) => !props.showQuestion1,
    },
    question1Placeholder: {
      type: "string",
      displayName: "Question 1 Placeholder",
      defaultValue: "Your answer",
      hidden: (props: any) => !props.showQuestion1,
    },
    question1Options: {
      type: "string",
      displayName: "Question 1 Options",
      defaultValue: "Option 1,Option 2,Option 3",
      description: "Comma-separated options for dropdown/radio",
      hidden: (props: any) =>
        !props.showQuestion1 || (props.question1Type !== "dropdown" && props.question1Type !== "radio"),
    },
    question1Required: {
      type: "boolean",
      displayName: "Question 1 Required",
      defaultValue: false,
      hidden: (props: any) => !props.showQuestion1,
    },

    // Custom Question 2
    showQuestion2: {
      type: "boolean",
      displayName: "Show Question 2",
      defaultValue: false,
      description: "Show or hide custom question 2",
    },
    question2Label: {
      type: "string",
      displayName: "Question 2 Label",
      defaultValue: "Question 2",
      hidden: (props: any) => !props.showQuestion2,
    },
    question2Type: {
      type: "choice",
      displayName: "Question 2 Type",
      options: ["text", "textarea", "dropdown", "radio"],
      defaultValue: "text",
      description: "Field type for question 2",
      hidden: (props: any) => !props.showQuestion2,
    },
    question2Placeholder: {
      type: "string",
      displayName: "Question 2 Placeholder",
      defaultValue: "Your answer",
      hidden: (props: any) => !props.showQuestion2,
    },
    question2Options: {
      type: "string",
      displayName: "Question 2 Options",
      defaultValue: "Option 1,Option 2,Option 3",
      description: "Comma-separated options for dropdown/radio",
      hidden: (props: any) =>
        !props.showQuestion2 || (props.question2Type !== "dropdown" && props.question2Type !== "radio"),
    },
    question2Required: {
      type: "boolean",
      displayName: "Question 2 Required",
      defaultValue: false,
      hidden: (props: any) => !props.showQuestion2,
    },

    // Custom Question 3
    showQuestion3: {
      type: "boolean",
      displayName: "Show Question 3",
      defaultValue: false,
      description: "Show or hide custom question 3",
    },
    question3Label: {
      type: "string",
      displayName: "Question 3 Label",
      defaultValue: "Question 3",
      hidden: (props: any) => !props.showQuestion3,
    },
    question3Type: {
      type: "choice",
      displayName: "Question 3 Type",
      options: ["text", "textarea", "dropdown", "radio"],
      defaultValue: "text",
      description: "Field type for question 3",
      hidden: (props: any) => !props.showQuestion3,
    },
    question3Placeholder: {
      type: "string",
      displayName: "Question 3 Placeholder",
      defaultValue: "Your answer",
      hidden: (props: any) => !props.showQuestion3,
    },
    question3Options: {
      type: "string",
      displayName: "Question 3 Options",
      defaultValue: "Option 1,Option 2,Option 3",
      description: "Comma-separated options for dropdown/radio",
      hidden: (props: any) =>
        !props.showQuestion3 || (props.question3Type !== "dropdown" && props.question3Type !== "radio"),
    },
    question3Required: {
      type: "boolean",
      displayName: "Question 3 Required",
      defaultValue: false,
      hidden: (props: any) => !props.showQuestion3,
    },

    // Custom Question 4
    showQuestion4: {
      type: "boolean",
      displayName: "Show Question 4",
      defaultValue: false,
      description: "Show or hide custom question 4",
    },
    question4Label: {
      type: "string",
      displayName: "Question 4 Label",
      defaultValue: "Question 4",
      hidden: (props: any) => !props.showQuestion4,
    },
    question4Type: {
      type: "choice",
      displayName: "Question 4 Type",
      options: ["text", "textarea", "dropdown", "radio"],
      defaultValue: "text",
      description: "Field type for question 4",
      hidden: (props: any) => !props.showQuestion4,
    },
    question4Placeholder: {
      type: "string",
      displayName: "Question 4 Placeholder",
      defaultValue: "Your answer",
      hidden: (props: any) => !props.showQuestion4,
    },
    question4Options: {
      type: "string",
      displayName: "Question 4 Options",
      defaultValue: "Option 1,Option 2,Option 3",
      description: "Comma-separated options for dropdown/radio",
      hidden: (props: any) =>
        !props.showQuestion4 || (props.question4Type !== "dropdown" && props.question4Type !== "radio"),
    },
    question4Required: {
      type: "boolean",
      displayName: "Question 4 Required",
      defaultValue: false,
      hidden: (props: any) => !props.showQuestion4,
    },

    // Custom Question 5
    showQuestion5: {
      type: "boolean",
      displayName: "Show Question 5",
      defaultValue: false,
      description: "Show or hide custom question 5",
    },
    question5Label: {
      type: "string",
      displayName: "Question 5 Label",
      defaultValue: "Question 5",
      hidden: (props: any) => !props.showQuestion5,
    },
    question5Type: {
      type: "choice",
      displayName: "Question 5 Type",
      options: ["text", "textarea", "dropdown", "radio"],
      defaultValue: "text",
      description: "Field type for question 5",
      hidden: (props: any) => !props.showQuestion5,
    },
    question5Placeholder: {
      type: "string",
      displayName: "Question 5 Placeholder",
      defaultValue: "Your answer",
      hidden: (props: any) => !props.showQuestion5,
    },
    question5Options: {
      type: "string",
      displayName: "Question 5 Options",
      defaultValue: "Option 1,Option 2,Option 3",
      description: "Comma-separated options for dropdown/radio",
      hidden: (props: any) =>
        !props.showQuestion5 || (props.question5Type !== "dropdown" && props.question5Type !== "radio"),
    },
    question5Required: {
      type: "boolean",
      displayName: "Question 5 Required",
      defaultValue: false,
      hidden: (props: any) => !props.showQuestion5,
    },

    // Custom Question 6
    showQuestion6: {
      type: "boolean",
      displayName: "Show Question 6",
      defaultValue: false,
      description: "Show or hide custom question 6",
    },
    question6Label: {
      type: "string",
      displayName: "Question 6 Label",
      defaultValue: "Question 6",
      hidden: (props: any) => !props.showQuestion6,
    },
    question6Type: {
      type: "choice",
      displayName: "Question 6 Type",
      options: ["text", "textarea", "dropdown", "radio"],
      defaultValue: "text",
      description: "Field type for question 6",
      hidden: (props: any) => !props.showQuestion6,
    },
    question6Placeholder: {
      type: "string",
      displayName: "Question 6 Placeholder",
      defaultValue: "Your answer",
      hidden: (props: any) => !props.showQuestion6,
    },
    question6Options: {
      type: "string",
      displayName: "Question 6 Options",
      defaultValue: "Option 1,Option 2,Option 3",
      description: "Comma-separated options for dropdown/radio",
      hidden: (props: any) =>
        !props.showQuestion6 || (props.question6Type !== "dropdown" && props.question6Type !== "radio"),
    },
    question6Required: {
      type: "boolean",
      displayName: "Question 6 Required",
      defaultValue: false,
      hidden: (props: any) => !props.showQuestion6,
    },

    // Custom Question 7
    showQuestion7: {
      type: "boolean",
      displayName: "Show Question 7",
      defaultValue: false,
      description: "Show or hide custom question 7",
    },
    question7Label: {
      type: "string",
      displayName: "Question 7 Label",
      defaultValue: "Question 7",
      hidden: (props: any) => !props.showQuestion7,
    },
    question7Type: {
      type: "choice",
      displayName: "Question 7 Type",
      options: ["text", "textarea", "dropdown", "radio"],
      defaultValue: "text",
      description: "Field type for question 7",
      hidden: (props: any) => !props.showQuestion7,
    },
    question7Placeholder: {
      type: "string",
      displayName: "Question 7 Placeholder",
      defaultValue: "Your answer",
      hidden: (props: any) => !props.showQuestion7,
    },
    question7Options: {
      type: "string",
      displayName: "Question 7 Options",
      defaultValue: "Option 1,Option 2,Option 3",
      description: "Comma-separated options for dropdown/radio",
      hidden: (props: any) =>
        !props.showQuestion7 || (props.question7Type !== "dropdown" && props.question7Type !== "radio"),
    },
    question7Required: {
      type: "boolean",
      displayName: "Question 7 Required",
      defaultValue: false,
      hidden: (props: any) => !props.showQuestion7,
    },

    // Custom Question 8
    showQuestion8: {
      type: "boolean",
      displayName: "Show Question 8",
      defaultValue: false,
      description: "Show or hide custom question 8",
    },
    question8Label: {
      type: "string",
      displayName: "Question 8 Label",
      defaultValue: "Question 8",
      hidden: (props: any) => !props.showQuestion8,
    },
    question8Type: {
      type: "choice",
      displayName: "Question 8 Type",
      options: ["text", "textarea", "dropdown", "radio"],
      defaultValue: "text",
      description: "Field type for question 8",
      hidden: (props: any) => !props.showQuestion8,
    },
    question8Placeholder: {
      type: "string",
      displayName: "Question 8 Placeholder",
      defaultValue: "Your answer",
      hidden: (props: any) => !props.showQuestion8,
    },
    question8Options: {
      type: "string",
      displayName: "Question 8 Options",
      defaultValue: "Option 1,Option 2,Option 3",
      description: "Comma-separated options for dropdown/radio",
      hidden: (props: any) =>
        !props.showQuestion8 || (props.question8Type !== "dropdown" && props.question8Type !== "radio"),
    },
    question8Required: {
      type: "boolean",
      displayName: "Question 8 Required",
      defaultValue: false,
      hidden: (props: any) => !props.showQuestion8,
    },

    // Custom Question 9
    showQuestion9: {
      type: "boolean",
      displayName: "Show Question 9",
      defaultValue: false,
      description: "Show or hide custom question 9",
    },
    question9Label: {
      type: "string",
      displayName: "Question 9 Label",
      defaultValue: "Question 9",
      hidden: (props: any) => !props.showQuestion9,
    },
    question9Type: {
      type: "choice",
      displayName: "Question 9 Type",
      options: ["text", "textarea", "dropdown", "radio"],
      defaultValue: "text",
      description: "Field type for question 9",
      hidden: (props: any) => !props.showQuestion9,
    },
    question9Placeholder: {
      type: "string",
      displayName: "Question 9 Placeholder",
      defaultValue: "Your answer",
      hidden: (props: any) => !props.showQuestion9,
    },
    question9Options: {
      type: "string",
      displayName: "Question 9 Options",
      defaultValue: "Option 1,Option 2,Option 3",
      description: "Comma-separated options for dropdown/radio",
      hidden: (props: any) =>
        !props.showQuestion9 || (props.question9Type !== "dropdown" && props.question9Type !== "radio"),
    },
    question9Required: {
      type: "boolean",
      displayName: "Question 9 Required",
      defaultValue: false,
      hidden: (props: any) => !props.showQuestion9,
    },

    // Custom Question 10
    showQuestion10: {
      type: "boolean",
      displayName: "Show Question 10",
      defaultValue: false,
      description: "Show or hide custom question 10",
    },
    question10Label: {
      type: "string",
      displayName: "Question 10 Label",
      defaultValue: "Question 10",
      hidden: (props: any) => !props.showQuestion10,
    },
    question10Type: {
      type: "choice",
      displayName: "Question 10 Type",
      options: ["text", "textarea", "dropdown", "radio"],
      defaultValue: "text",
      description: "Field type for question 10",
      hidden: (props: any) => !props.showQuestion10,
    },
    question10Placeholder: {
      type: "string",
      displayName: "Question 10 Placeholder",
      defaultValue: "Your answer",
      hidden: (props: any) => !props.showQuestion10,
    },
    question10Options: {
      type: "string",
      displayName: "Question 10 Options",
      defaultValue: "Option 1,Option 2,Option 3",
      description: "Comma-separated options for dropdown/radio",
      hidden: (props: any) =>
        !props.showQuestion10 || (props.question10Type !== "dropdown" && props.question10Type !== "radio"),
    },
    question10Required: {
      type: "boolean",
      displayName: "Question 10 Required",
      defaultValue: false,
      hidden: (props: any) => !props.showQuestion10,
    },

    // Field Styling
    labelColor: {
      type: "string",
      displayName: "Label Color",
      defaultValue: "#374151",
      description: "Hex color for field labels",
    },
    labelSize: {
      type: "string",
      displayName: "Label Size",
      defaultValue: "14px",
      description: "Font size for labels (e.g., 12px, 14px, 16px)",
    },
    inputBackgroundColor: {
      type: "string",
      displayName: "Input Background Color",
      defaultValue: "#ffffff",
      description: "Hex color for input field backgrounds",
    },
    inputTextColor: {
      type: "string",
      displayName: "Input Text Color",
      defaultValue: "#1f2937",
      description: "Hex color for input text",
    },
    inputBorderColor: {
      type: "string",
      displayName: "Input Border Color",
      defaultValue: "#d1d5db",
      description: "Hex color for input borders",
    },
    inputBorderRadius: {
      type: "string",
      displayName: "Input Border Radius",
      defaultValue: "6px",
      description: "Border radius for input fields (e.g., 4px, 6px, 8px)",
    },
    inputPadding: {
      type: "string",
      displayName: "Input Padding",
      defaultValue: "12px",
      description: "Padding inside input fields (e.g., 10px, 12px, 16px)",
    },
    fieldSpacing: {
      type: "string",
      displayName: "Field Spacing",
      defaultValue: "20px",
      description: "Spacing between form fields (e.g., 16px, 20px, 24px)",
    },

    // Submit Button
    submitButtonText: {
      type: "string",
      displayName: "Submit Button Text",
      defaultValue: "Submit",
      description: "Text displayed on the submit button",
    },
    submitButtonBackgroundColor: {
      type: "string",
      displayName: "Submit Button Background Color",
      defaultValue: "#2563eb",
      description: "Hex color for submit button background",
    },
    submitButtonTextColor: {
      type: "string",
      displayName: "Submit Button Text Color",
      defaultValue: "#ffffff",
      description: "Hex color for submit button text",
    },
    submitButtonHoverBackgroundColor: {
      type: "string",
      displayName: "Submit Button Hover Background Color",
      defaultValue: "#1d4ed8",
      description: "Hex color for submit button background on hover",
    },
    submitButtonHoverTextColor: {
      type: "string",
      displayName: "Submit Button Hover Text Color",
      defaultValue: "#ffffff",
      description: "Hex color for submit button text on hover",
    },
    submitButtonPadding: {
      type: "string",
      displayName: "Submit Button Padding",
      defaultValue: "12px 32px",
      description: "Padding for submit button (e.g., 10px 24px, 12px 32px)",
    },
    submitButtonBorderRadius: {
      type: "string",
      displayName: "Submit Button Border Radius",
      defaultValue: "6px",
      description: "Border radius for submit button (e.g., 4px, 6px, 8px)",
    },

    // Success/Error Messages
    successMessage: {
      type: "string",
      displayName: "Success Message",
      defaultValue: "Thank you! Your form has been submitted successfully.",
      description: "Message displayed on successful form submission",
    },
    successMessageColor: {
      type: "string",
      displayName: "Success Message Color",
      defaultValue: "#059669",
      description: "Hex color for success message",
    },
    errorMessage: {
      type: "string",
      displayName: "Error Message",
      defaultValue: "Please fill out all required fields.",
      description: "Message displayed when form validation fails",
    },
    errorMessageColor: {
      type: "string",
      displayName: "Error Message Color",
      defaultValue: "#dc2626",
      description: "Hex color for error message",
    },

    // Form Action
    formAction: {
  type: "string",
  displayName: "Form Action URL",
  defaultValue: "/api/survey",  // ← Change this
  description: "URL to submit form data to",
},
    formMethod: {
      type: "string",
      displayName: "Form Method",
      defaultValue: "POST",
      description: "HTTP method for form submission (POST or GET)",
    },
  },
  importPath: "./components/survey-form",
});

// Register the NewsletterSignup component
PLASMIC.registerComponent(NewsletterSignup, {
    name: "NewsletterSignup",
    displayName: "Newsletter Signup",
    description: "A fully customizable newsletter subscription form with Mailchimp integration",
    props: {
      // Color Customization
      primaryColor: {
        type: "color",
        defaultValue: "#1F2D55",
        displayName: "Primary Color",
        description: "Main color for buttons and accents (default: Royal Blue #1F2D55)",
        section: "Colors",
      },
      primaryTextColor: {
        type: "color",
        defaultValue: "#ffffff",
        displayName: "Primary Text Color",
        description: "Text color on primary colored elements",
        section: "Colors",
      },
      headingColor: {
        type: "color",
        defaultValue: "#1e293b",
        displayName: "Heading Color",
        description: "Color for main headings",
        section: "Colors",
      },
      textColor: {
        type: "color",
        defaultValue: "#475569",
        displayName: "Text Color",
        description: "Color for body text",
        section: "Colors",
      },
      brandColor: {
        type: "color",
        defaultValue: "#f59e0b",
        displayName: "Brand Highlight Color",
        description: "Color for brand name highlight",
        section: "Colors",
      },
      inputBgColor: {
        type: "color",
        defaultValue: "#f9fafb",
        displayName: "Input Background",
        description: "Background color for input fields",
        section: "Colors",
      },
      inputBorderColor: {
        type: "color",
        defaultValue: "#d1d5db",
        displayName: "Input Border",
        description: "Border color for input fields",
        section: "Colors",
      },
      inputTextColor: {
        type: "color",
        defaultValue: "#111827",
        displayName: "Input Text Color",
        description: "Text color inside input fields",
        section: "Colors",
      },
      cardBgColor: {
        type: "color",
        defaultValue: "#ffffff",
        displayName: "Card Background",
        description: "Background color for the form card",
        section: "Colors",
      },
      cardBorderColor: {
        type: "color",
        defaultValue: "#e5e7eb",
        displayName: "Card Border",
        description: "Border color for the form card",
        section: "Colors",
      },

      // Main Content Props
      mainTitle: {
        type: "string",
        defaultValue: "Stay Connected with",
        displayName: "Main Title",
        description: "The main heading text",
        section: "Content",
      },
      brandName: {
        type: "string",
        defaultValue: "GCM Ministries",
        displayName: "Brand Name",
        description: "The highlighted brand name",
        section: "Content",
      },
      mainDescription: {
        type: "string",
        defaultValue:
          "Join our newsletter to receive updates on our global ministry work, testimonies from the field, and ways you can be part of spreading the Gospel worldwide.",
        displayName: "Main Description",
        description: "The main description text below the title",
        section: "Content",
      },

      // Form Props
      formTitle: {
        type: "string",
        defaultValue: "Subscribe to Our Newsletter",
        displayName: "Form Title",
        description: "The title inside the form card",
        section: "Form",
      },
      formDescription: {
        type: "string",
        defaultValue: "Get the latest updates from our ministry around the world",
        displayName: "Form Description",
        description: "The description inside the form card",
        section: "Form",
      },
      buttonText: {
        type: "string",
        defaultValue: "Subscribe to Newsletter",
        displayName: "Button Text",
        description: "The text on the submit button",
        section: "Form",
      },

      // Input Placeholders
      firstNamePlaceholder: {
        type: "string",
        defaultValue: "First Name",
        displayName: "First Name Placeholder",
        description: "Placeholder text for the first name input field",
        section: "Form",
      },
      lastNamePlaceholder: {
        type: "string",
        defaultValue: "Last Name",
        displayName: "Last Name Placeholder",
        description: "Placeholder text for the last name input field",
        section: "Form",
      },
      emailPlaceholder: {
        type: "string",
        defaultValue: "name@email.com",
        displayName: "Email Placeholder",
        description: "Placeholder text for the email input field",
        section: "Form",
      },

      // Mailchimp Integration
      mailchimpUrl: {
        type: "string",
        defaultValue:
          "https://GCMM.us4.list-manage.com/subscribe/post?u=318fc9b1880100b326b3ddf87&id=b03a1478c0&f_id=00f81feaf0",
        displayName: "Mailchimp URL",
        description: "The full Mailchimp subscription URL",
        section: "Integration",
      },

      // Success Message Props
      successTitle: {
        type: "string",
        defaultValue: "Thank You!",
        displayName: "Success Title",
        description: "Title shown after successful subscription",
        section: "Success Message",
      },
      successMessage: {
        type: "string",
        defaultValue:
          "Check your email to confirm your subscription. We'll keep you updated on our ministry work and global outreach efforts.",
        displayName: "Success Message",
        description: "Message shown after successful subscription",
        section: "Success Message",
      },

      // Privacy Text
      privacyText: {
        type: "string",
        defaultValue: "We respect your privacy. Unsubscribe at any time.",
        displayName: "Privacy Text",
        description: "Privacy notice text at the bottom",
        section: "Footer",
      },
    },

    // Import path for the component
    importPath: "./components/newsletter-signup",
  });

PLASMIC.registerComponent(TermsAndConditionsPage, {
  name: "TermsAndConditionsPage",
  displayName: "Terms and Conditions Page",
  description: "A dedicated page for displaying terms and conditions, privacy policy, and legal information",
  props: {
    className: {
      type: "class",
      displayName: "CSS Class",
      description: "Custom CSS classes for styling in Plasmic",
    },
    pageTitle: {
      type: "string",
      displayName: "Page Title",
      defaultValue: "Terms and Conditions",
      description: "Main title for the terms page",
    },
    pageSubtitle: {
      type: "string",
      displayName: "Page Subtitle",
      defaultValue: "Legal Information",
      description: "Subtitle for the terms page",
    },

    // Terms Section 1: Terms of Use
    terms1Title: {
      type: "string",
      displayName: "Terms 1: Title",
      defaultValue: "Terms of Use",
    },
    terms1Content: {
      type: "string",
      displayName: "Terms 1: Content",
      defaultValue: "By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law. All sales and donations are final.",
    },

    // Terms Section 2: Disclaimer
    terms2Title: {
      type: "string",
      displayName: "Terms 2: Title",
      defaultValue: "Disclaimer",
    },
    terms2Content: {
      type: "string",
      displayName: "Terms 2: Content",
      defaultValue: "The materials on Great Commission Media Ministries' website are provided \"as is\". Great Commission Media Ministries makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, Great Commission Media Ministries does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet website or otherwise relating to such materials or on any sites linked to this site.",
    },

    // Terms Section 3: Limitation of Liability
    terms3Title: {
      type: "string",
      displayName: "Terms 3: Title",
      defaultValue: "Limitation of Liability",
    },
    terms3Content: {
      type: "string",
      displayName: "Terms 3: Content",
      defaultValue: "In no event shall Great Commission Media Ministries or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption,) arising out of the use or inability to use the materials on Great Commission Media Ministries' Internet site, even if Great Commission Media Ministries or a Great Commission Media Ministries authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties or limitations of liability for consequential or incidental damages, these limitations may not apply to you.",
    },

    // Terms Section 4: Revisions and Errata
    terms4Title: {
      type: "string",
      displayName: "Terms 4: Title",
      defaultValue: "Revisions and Errata",
    },
    terms4Content: {
      type: "string",
      displayName: "Terms 4: Content",
      defaultValue: "The materials appearing on Great Commission Media Ministries' website could include technical, typographical, or photographic errors. Great Commission Media Ministries does not warrant that any of the materials on its website are accurate, complete, or current. Great Commission Media Ministries may make changes to the materials contained on its website at any time without notice. Great Commission Media Ministries does not, however, make any commitment to update the materials.",
    },

    // Terms Section 5: Links
    terms5Title: {
      type: "string",
      displayName: "Terms 5: Title",
      defaultValue: "Links",
    },
    terms5Content: {
      type: "string",
      displayName: "Terms 5: Content",
      defaultValue: "Great Commission Media Ministries has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Great Commission Media Ministries of the site. Use of any such linked website is at the user's own risk.",
    },

    // Terms Section 6: Site Terms of Use Modifications
    terms6Title: {
      type: "string",
      displayName: "Terms 6: Title",
      defaultValue: "Site Terms of Use Modifications",
    },
    terms6Content: {
      type: "string",
      displayName: "Terms 6: Content",
      defaultValue: "Great Commission Media Ministries may revise these terms of use for its website at any time without notice. By using this website and applying for a user account, you are agreeing to be bound by the then-current version of these Terms and Conditions of Use.",
    },

    // Terms Section 7: Governing Law
    terms7Title: {
      type: "string",
      displayName: "Terms 7: Title",
      defaultValue: "Governing Law",
    },
    terms7Content: {
      type: "string",
      displayName: "Terms 7: Content",
      defaultValue: "Any claim relating to Great Commission Media Ministries' website shall be governed by the laws of the Province of British Columbia without regard to its conflict of law provisions. General Terms and Conditions applicable to Use of a Website.",
    },

    // Terms Section 8: Gift Acceptance and Distribution Policy
    terms8Title: {
      type: "string",
      displayName: "Terms 8: Title",
      defaultValue: "Gift Acceptance and Distribution Policy",
    },
    terms8Content: {
      type: "string",
      displayName: "Terms 8: Content",
      defaultValue: "Distribution of funds is confined to GCMM-approved programs and projects. Donors may indicate their program preference for how GCMM will apply their donation, but ultimate authority on the use of resources rests with GCMM. Gifts received and accepted in accordance with GCMM's policies become exclusive property of GCMM and may not be returned under any circumstances.",
    },

    // Terms Section 9: Privacy Policy
    terms9Title: {
      type: "string",
      displayName: "Terms 9: Title",
      defaultValue: "Privacy Policy",
    },
    terms9Content: {
      type: "string",
      displayName: "Terms 9: Content",
      defaultValue: "Your privacy is very important to us. Accordingly, we have developed this Policy in order for you to understand how we collect, use, communicate and disclose, and make use of personal information. The following outlines our privacy policy: Before or at the time of collecting personal information, we will identify the purposes for which the information is being collected. We will collect and use personal information solely with the objective of fulfilling those purposes specified by us and for other compatible purposes, unless we obtain the consent of the individual concerned or as required by law. We will only retain personal information as long as necessary for the fulfillment of those purposes. We will collect personal information by lawful and fair means and, where appropriate, with the knowledge or consent of the individual concerned. Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary for those purposes, should be accurate, complete, and up-to-date. We will protect personal information by reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copying, use, or modification. We will make readily available to constituents information about our policies and practices relating to the management of personal information. We are committed to conducting our ministry in accordance with these principles in order to ensure that the confidentiality of personal information is protected and maintained.",
    },
  },
  importPath: "./components/terms-and-conditions-page",
});

PLASMIC.registerComponent(StripeDonationPage, {
  name: "StripeDonationPage",
  displayName: "Stripe Donation Page",
  description: "A secure donation page with Stripe integration",
  props: {
    // Page Content Props
    donateNowHeading: {
      type: "string",
      displayName: "Donate Now Heading",
      defaultValue: "Donate Now:",
      description: "The main heading text displayed at the top of the donation form",
    },
    generousDonationText: {
      type: "string",
      displayName: "Generous Donation Text",
      defaultValue: "Your most generous donation",
      description: "Text displayed above the donation amount options",
    },
    customAmountPlaceholder: {
      type: "string",
      displayName: "Custom Amount Placeholder",
      defaultValue: "100",
      description: "Placeholder text inside the custom amount input field",
    },
    termsAndConditionsUrl: {
      type: "string",
      displayName: "Terms and Conditions URL",
      defaultValue: "/terms-and-conditions",
      description: "URL link to the terms and conditions page",
    },
    
    // Preset Amounts Section
    presetAmount1: {
      type: "number",
      displayName: "Preset Amount 1",
      defaultValue: 40,
      description: "First preset donation amount (set to 0 to hide)",
      section: "Preset Amounts",
    },
    presetAmount2: {
      type: "number",
      displayName: "Preset Amount 2",
      defaultValue: 70,
      description: "Second preset donation amount (set to 0 to hide)",
      section: "Preset Amounts",
    },
    presetAmount3: {
      type: "number",
      displayName: "Preset Amount 3",
      defaultValue: 200,
      description: "Third preset donation amount (set to 0 to hide)",
      section: "Preset Amounts",
    },
    presetAmount4: {
      type: "number",
      displayName: "Preset Amount 4",
      defaultValue: 400,
      description: "Fourth preset donation amount (set to 0 to hide)",
      section: "Preset Amounts",
    },
    presetAmount5: {
      type: "number",
      displayName: "Preset Amount 5",
      defaultValue: 800,
      description: "Fifth preset donation amount (set to 0 to hide)",
      section: "Preset Amounts",
    },
    presetAmount6: {
      type: "number",
      displayName: "Preset Amount 6",
      defaultValue: 1500,
      description: "Sixth preset donation amount (set to 0 to hide)",
      section: "Preset Amounts",
    },
    
    // Donation Purpose Options
    showGeneralMinistry: {
      type: "boolean",
      displayName: "Show General Ministry",
      defaultValue: true,
      description: "Display General Ministry Support as a donation purpose option",
      section: "Donation Purposes",
    },
    generalMinistryLabel: {
      type: "string",
      displayName: "General Ministry Label",
      defaultValue: "General Ministry Support",
      description: "Custom label for General Ministry option",
      section: "Donation Purposes",
      hidden: (props: any) => !props.showGeneralMinistry,
    },
    showUkraineRelief: {
      type: "boolean",
      displayName: "Show Ukraine Relief",
      defaultValue: true,
      description: "Display Ukraine Relief as a donation purpose option",
      section: "Donation Purposes",
    },
    ukraineReliefLabel: {
      type: "string",
      displayName: "Ukraine Relief Label",
      defaultValue: "Ukraine Relief Efforts",
      description: "Custom label for Ukraine Relief option",
      section: "Donation Purposes",
      hidden: (props: any) => !props.showUkraineRelief,
    },
    showUkraineGospel: {
      type: "boolean",
      displayName: "Show Ukraine Gospel",
      defaultValue: true,
      description: "Display Ukraine Gospel as a donation purpose option",
      section: "Donation Purposes",
    },
    ukraineGospelLabel: {
      type: "string",
      displayName: "Ukraine Gospel Label",
      defaultValue: "Spreading the Gospel in Ukraine",
      description: "Custom label for Ukraine Gospel option",
      section: "Donation Purposes",
      hidden: (props: any) => !props.showUkraineGospel,
    },
    showRadioMinistry: {
      type: "boolean",
      displayName: "Show Radio Ministry",
      defaultValue: true,
      description: "Display Radio Ministry as a donation purpose option",
      section: "Donation Purposes",
    },
    radioMinistryLabel: {
      type: "string",
      displayName: "Radio Ministry Label",
      defaultValue: "Radio Ministry Expansion",
      description: "Custom label for Radio Ministry option",
      section: "Donation Purposes",
      hidden: (props: any) => !props.showRadioMinistry,
    },
    showLiterature: {
      type: "boolean",
      displayName: "Show Literature",
      defaultValue: true,
      description: "Display Literature Distribution as a donation purpose option",
      section: "Donation Purposes",
    },
    literatureLabel: {
      type: "string",
      displayName: "Literature Label",
      defaultValue: "Christian Literature Distribution",
      description: "Custom label for Literature option",
      section: "Donation Purposes",
      hidden: (props: any) => !props.showLiterature,
    },
    showPersecution: {
      type: "boolean",
      displayName: "Show Persecution Support",
      defaultValue: true,
      description: "Display Persecution Support as a donation purpose option",
      section: "Donation Purposes",
    },
    persecutionLabel: {
      type: "string",
      displayName: "Persecution Support Label",
      defaultValue: "Supporting Persecuted Christians",
      description: "Custom label for Persecution Support option",
      section: "Donation Purposes",
      hidden: (props: any) => !props.showPersecution,
    },
    showYouth: {
      type: "boolean",
      displayName: "Show Youth Ministry",
      defaultValue: true,
      description: "Display Youth Ministry as a donation purpose option",
      section: "Donation Purposes",
    },
    youthLabel: {
      type: "string",
      displayName: "Youth Ministry Label",
      defaultValue: "Youth Ministry Programs",
      description: "Custom label for Youth Ministry option",
      section: "Donation Purposes",
      hidden: (props: any) => !props.showYouth,
    },
    showEmergency: {
      type: "boolean",
      displayName: "Show Emergency Relief",
      defaultValue: true,
      description: "Display Emergency Relief as a donation purpose option",
      section: "Donation Purposes",
    },
    emergencyLabel: {
      type: "string",
      displayName: "Emergency Relief Label",
      defaultValue: "Emergency Relief Fund",
      description: "Custom label for Emergency Relief option",
      section: "Donation Purposes",
      hidden: (props: any) => !props.showEmergency,
    },
    
    // Email Banner
    emailBannerUrl: {
      type: "imageUrl",
      displayName: "Email Banner Image",
      defaultValue: "/images/email-banner.png",
      description: "Banner image displayed at the top of confirmation emails. Will be automatically sized to fit email width.",
      section: "Email Settings",
    },
    
    // Email Structure - Line by Line
    emailSubject: {
      type: "string",
      displayName: "Email Subject",
      defaultValue: "Thank you for your donation",
      description: "Subject line for donor confirmation emails",
      section: "Email Settings",
    },
    emailGreeting: {
      type: "string",
      displayName: "Email Greeting (Line 1)",
      defaultValue: "Dear [Donor Name],",
      description: "Opening greeting - [Donor Name] will be replaced with actual name",
      section: "Email Content",
    },
    emailLine2: {
      type: "string",
      displayName: "Line 2 - Thank You Message",
      defaultValue: "Thank you for your generous donation of [$xx] for [Donation field].",
      description: "[$xx] = amount, [Donation field] = purpose",
      section: "Email Content",
    },
    emailLine3: {
      type: "string",
      displayName: "Line 3 - Impact Statement",
      defaultValue: "Your support is helping provide urgent aid to families affected by the war with food and life-saving wood-burning stoves that bring warmth, dignity, and strength in the harsh winter, along with medical supplies and ambulances.",
      description: "Description of how the donation helps",
      section: "Email Content",
    },
    emailLine4: {
      type: "string",
      displayName: "Line 4 - Feedback Request",
      defaultValue: "If you're willing, could you tell us how you first heard about GCMM or UkraineAid? A quick reply—\"TV,\" \"magazine,\" \"friend,\" \"online,\" etc.—helps us understand what's reaching people and helps us reach more families in need. Please reply to this email or write to info@gcmm.ca.",
      description: "Request for donor feedback",
      section: "Email Content",
    },
    emailLine5: {
      type: "string",
      displayName: "Line 5 - Information Links",
      defaultValue: "For GCMM information, please visit gcmm.ca. For Ukraine updates and Ukraine-focused giving, visit UkraineAidToday.ca. You can also follow us on social media @GreatCommissionMediaMinistries.",
      description: "Website and social media information",
      section: "Email Content",
    },
    emailLine6: {
      type: "string",
      displayName: "Line 6 - Closing Thank You",
      defaultValue: "Thank you again for standing with the people of Ukraine this Christmas.",
      description: "Final thank you message",
      section: "Email Content",
    },
    emailSignatureName: {
      type: "string",
      displayName: "Line 7 - Signature Name",
      defaultValue: "Dr. Hannu Haukka",
      description: "Name of person signing the email",
      section: "Email Content",
    },
    emailSignatureTitle: {
      type: "string",
      displayName: "Line 8 - Signature Title",
      defaultValue: "CEO, Great Commission Media Ministries (GCMM)",
      description: "Title/position of person signing",
      section: "Email Content",
    },
    emailLine9: {
      type: "string",
      displayName: "Line 9 - Tax Receipt Notice",
      defaultValue: "Your official tax receipt for your total year's giving will be mailed to the address you provided on or before February 28.",
      description: "Tax receipt information",
      section: "Email Content",
    },
    emailLine10: {
      type: "string",
      displayName: "Line 10 - Contact for Assistance",
      defaultValue: "For assistance or questions about your donation, please email info@gcmm.ca or call 1-877-674-5630.",
      description: "Contact information for questions",
      section: "Email Content",
    },
    emailLine11: {
      type: "string",
      displayName: "Line 11 - Organization Description",
      defaultValue: "UkraineAid is the humanitarian outreach of Great Commission Media Ministries (GCMM), a registered Canadian charity (No. 12345 6789 RR0001), serving in Ukraine for over 35 years.",
      description: "Organization description and charity number",
      section: "Email Content",
    },
    
    // Organization Information Props
    organizationName: {
      type: "string",
      displayName: "Organization Name",
      defaultValue: "Great Commission Media Ministries",
      description: "Your organization's full name",
      section: "Organization Info",
    },
    organizationPhone: {
      type: "string",
      displayName: "Organization Phone",
      defaultValue: "1-877-674-5630",
      description: "Contact phone number",
      section: "Organization Info",
    },
    organizationEmail: {
      type: "string",
      displayName: "Organization Email",
      defaultValue: "info@gcmm.ca",
      description: "Contact email address",
      section: "Organization Info",
    },
    organizationAddress: {
      type: "string",
      displayName: "Organization Address",
      defaultValue: "PO Box 14006, Abbotsford, BC V2T 0B4",
      description: "Mailing address",
      section: "Organization Info",
    },
    organizationCharityNumber: {
      type: "string",
      displayName: "Charity Registration Number",
      defaultValue: "12345 6789 RR0001",
      description: "Official charity registration number",
      section: "Organization Info",
    },
    
    // Notification Email Settings
    notificationEmailRecipient: {
      type: "string",
      displayName: "Notification Email Recipient",
      defaultValue: "info@gcmm.ca",
      description: "Email address to receive donation notifications",
      section: "Notification Settings",
    },
    
    // Purpose-Specific Variations (Optional Overrides)
    // These allow you to customize the email content for specific donation types
    purposeMessageGeneral: {
      type: "string",
      displayName: "General Ministry - Line 3 Override",
      defaultValue: "",
      description: "Optional: Custom impact statement for General Ministry Support donations (leave blank to use default Line 3)",
      section: "Purpose-Specific Content",
    },
    purposeMessageUkraineRelief: {
      type: "string",
      displayName: "Ukraine Relief - Line 3 Override",
      defaultValue: "",
      description: "Optional: Custom impact statement for Ukraine Relief donations (leave blank to use default Line 3)",
      section: "Purpose-Specific Content",
    },
    purposeMessageUkraineGospel: {
      type: "string",
      displayName: "Ukraine Gospel - Line 3 Override",
      defaultValue: "",
      description: "Optional: Custom impact statement for Ukraine Gospel donations (leave blank to use default Line 3)",
      section: "Purpose-Specific Content",
    },
    purposeMessageRadioMinistry: {
      type: "string",
      displayName: "Radio Ministry - Line 3 Override",
      defaultValue: "",
      description: "Optional: Custom impact statement for Radio Ministry donations (leave blank to use default Line 3)",
      section: "Purpose-Specific Content",
    },
    purposeMessageLiterature: {
      type: "string",
      displayName: "Literature - Line 3 Override",
      defaultValue: "",
      description: "Optional: Custom impact statement for Literature Distribution donations (leave blank to use default Line 3)",
      section: "Purpose-Specific Content",
    },
    purposeMessagePersecution: {
      type: "string",
      displayName: "Persecution - Line 3 Override",
      defaultValue: "",
      description: "Optional: Custom impact statement for Persecuted Christians donations (leave blank to use default Line 3)",
      section: "Purpose-Specific Content",
    },
    purposeMessageYouth: {
      type: "string",
      displayName: "Youth Ministry - Line 3 Override",
      defaultValue: "",
      description: "Optional: Custom impact statement for Youth Ministry donations (leave blank to use default Line 3)",
      section: "Purpose-Specific Content",
    },
    purposeMessageEmergency: {
      type: "string",
      displayName: "Emergency Relief - Line 3 Override",
      defaultValue: "",
      description: "Optional: Custom impact statement for Emergency Relief donations (leave blank to use default Line 3)",
      section: "Purpose-Specific Content",
    },
    // Purpose-specific Line 4 overrides
    purposeLine4General: { type: "string", displayName: "General - Line 4 Override", defaultValue: "", description: "Custom feedback text for General donations", section: "Purpose-Specific Content" },
    purposeLine4UkraineRelief: { type: "string", displayName: "UkraineAid - Line 4 Override", defaultValue: "", description: "Custom feedback text for UkraineAid donations", section: "Purpose-Specific Content" },
    purposeLine4UkraineGospel: { type: "string", displayName: "Ukraine Gospel - Line 4 Override", defaultValue: "", description: "Custom feedback text for Ukraine Gospel donations", section: "Purpose-Specific Content" },
    purposeLine4RadioMinistry: { type: "string", displayName: "MCMC - Line 4 Override", defaultValue: "", description: "Custom feedback text for Mega City Media Campaign donations", section: "Purpose-Specific Content" },
    purposeLine4Literature: { type: "string", displayName: "Literature - Line 4 Override", defaultValue: "", description: "Custom feedback text for Literature donations", section: "Purpose-Specific Content" },
    purposeLine4Persecution: { type: "string", displayName: "Persecution - Line 4 Override", defaultValue: "", description: "Custom feedback text for Persecution donations", section: "Purpose-Specific Content" },
    purposeLine4Youth: { type: "string", displayName: "Youth - Line 4 Override", defaultValue: "", description: "Custom feedback text for Youth Ministry donations", section: "Purpose-Specific Content" },
    purposeLine4Emergency: { type: "string", displayName: "Emergency - Line 4 Override", defaultValue: "", description: "Custom feedback text for Emergency Relief donations", section: "Purpose-Specific Content" },
    // Purpose-specific Closing overrides
    purposeClosingGeneral: { type: "string", displayName: "General - Closing Override", defaultValue: "", description: "Custom closing for General donations", section: "Purpose-Specific Content" },
    purposeClosingUkraineRelief: { type: "string", displayName: "UkraineAid - Closing Override", defaultValue: "", description: "Custom closing for UkraineAid donations", section: "Purpose-Specific Content" },
    purposeClosingUkraineGospel: { type: "string", displayName: "Ukraine Gospel - Closing Override", defaultValue: "", description: "Custom closing for Ukraine Gospel donations", section: "Purpose-Specific Content" },
    purposeClosingRadioMinistry: { type: "string", displayName: "MCMC - Closing Override", defaultValue: "", description: "Custom closing for Mega City Media Campaign donations", section: "Purpose-Specific Content" },
    purposeClosingLiterature: { type: "string", displayName: "Literature - Closing Override", defaultValue: "", description: "Custom closing for Literature donations", section: "Purpose-Specific Content" },
    purposeClosingPersecution: { type: "string", displayName: "Persecution - Closing Override", defaultValue: "", description: "Custom closing for Persecution donations", section: "Purpose-Specific Content" },
    purposeClosingYouth: { type: "string", displayName: "Youth - Closing Override", defaultValue: "", description: "Custom closing for Youth Ministry donations", section: "Purpose-Specific Content" },
    purposeClosingEmergency: { type: "string", displayName: "Emergency - Closing Override", defaultValue: "", description: "Custom closing for Emergency Relief donations", section: "Purpose-Specific Content" },
    // Purpose-specific Signature Name overrides
    purposeSignatureNameGeneral: { type: "string", displayName: "General - Signature Name Override", defaultValue: "", description: "Custom signature name for General donations", section: "Purpose-Specific Content" },
    purposeSignatureNameUkraineRelief: { type: "string", displayName: "UkraineAid - Signature Name Override", defaultValue: "", description: "Custom signature name for UkraineAid donations", section: "Purpose-Specific Content" },
    purposeSignatureNameUkraineGospel: { type: "string", displayName: "Ukraine Gospel - Signature Name Override", defaultValue: "", description: "Custom signature name for Ukraine Gospel donations", section: "Purpose-Specific Content" },
    purposeSignatureNameRadioMinistry: { type: "string", displayName: "MCMC - Signature Name Override", defaultValue: "", description: "Custom signature name for Mega City Media Campaign donations", section: "Purpose-Specific Content" },
    purposeSignatureNameLiterature: { type: "string", displayName: "Literature - Signature Name Override", defaultValue: "", description: "Custom signature name for Literature donations", section: "Purpose-Specific Content" },
    purposeSignatureNamePersecution: { type: "string", displayName: "Persecution - Signature Name Override", defaultValue: "", description: "Custom signature name for Persecution donations", section: "Purpose-Specific Content" },
    purposeSignatureNameYouth: { type: "string", displayName: "Youth - Signature Name Override", defaultValue: "", description: "Custom signature name for Youth Ministry donations", section: "Purpose-Specific Content" },
    purposeSignatureNameEmergency: { type: "string", displayName: "Emergency - Signature Name Override", defaultValue: "", description: "Custom signature name for Emergency Relief donations", section: "Purpose-Specific Content" },
    // Purpose-specific Signature Title overrides
    purposeSignatureTitleGeneral: { type: "string", displayName: "General - Signature Title Override", defaultValue: "", description: "Custom signature title for General donations", section: "Purpose-Specific Content" },
    purposeSignatureTitleUkraineRelief: { type: "string", displayName: "UkraineAid - Signature Title Override", defaultValue: "", description: "Custom signature title for UkraineAid donations", section: "Purpose-Specific Content" },
    purposeSignatureTitleUkraineGospel: { type: "string", displayName: "Ukraine Gospel - Signature Title Override", defaultValue: "", description: "Custom signature title for Ukraine Gospel donations", section: "Purpose-Specific Content" },
    purposeSignatureTitleRadioMinistry: { type: "string", displayName: "MCMC - Signature Title Override", defaultValue: "", description: "Custom signature title for Mega City Media Campaign donations", section: "Purpose-Specific Content" },
    purposeSignatureTitleLiterature: { type: "string", displayName: "Literature - Signature Title Override", defaultValue: "", description: "Custom signature title for Literature donations", section: "Purpose-Specific Content" },
    purposeSignatureTitlePersecution: { type: "string", displayName: "Persecution - Signature Title Override", defaultValue: "", description: "Custom signature title for Persecution donations", section: "Purpose-Specific Content" },
    purposeSignatureTitleYouth: { type: "string", displayName: "Youth - Signature Title Override", defaultValue: "", description: "Custom signature title for Youth Ministry donations", section: "Purpose-Specific Content" },
    purposeSignatureTitleEmergency: { type: "string", displayName: "Emergency - Signature Title Override", defaultValue: "", description: "Custom signature title for Emergency Relief donations", section: "Purpose-Specific Content" },

    // Location Notice
    showLocationNotice: {
      type: "boolean",
      displayName: "Show Location Notice",
      defaultValue: true,
      description: "Show a banner to US visitors directing them to the US donation page",
      section: "Location Notice",
    },
    locationNoticeTitle: {
      type: "string",
      displayName: "Notice Title",
      defaultValue: "Are you donating from the United States?",
      description: "Title text for the location notice banner",
      section: "Location Notice",
      hidden: (props: any) => !props.showLocationNotice,
    },
    locationNoticeText: {
      type: "string",
      displayName: "Notice Text",
      defaultValue: "GCMM is a registered Canadian charity. If you're a US donor looking for a tax-deductible option, please use our US donation partner page instead.",
      description: "Body text for the location notice banner",
      section: "Location Notice",
      hidden: (props: any) => !props.showLocationNotice,
    },
    usDonationUrl: {
      type: "string",
      displayName: "US Donation URL",
      defaultValue: "https://donate.gcmm.ca/us",
      description: "URL for the US donation partner page",
      section: "Location Notice",
      hidden: (props: any) => !props.showLocationNotice,
    },
    caDonationUrl: {
      type: "string",
      displayName: "Canada Donation URL",
      defaultValue: "",
      description: "Optional: URL for the Canada donation page (shown to non-US visitors). When set, a notice will also appear for visitors detected as being outside Canada.",
      section: "Location Notice",
      hidden: (props: any) => !props.showLocationNotice,
    },
  },
  importPath: "./stripe-donation-page",
});


PLASMIC.registerComponent(MainPageCinematic, {
  name: "MainPageCinematic",
  displayName: "Cinematic Main Page",
  description: "A cinematic homepage with full-screen video background and elegant overlay content",
  props: {
    heroTitle: {
      type: "string",
      displayName: "Hero Title",
      defaultValue: "45 Years of Global",
      description: "First part of the main hero title",
    },
    heroHighlight: {
      type: "string",
      displayName: "Hero Highlight",
      defaultValue: "Ministry Commitment",
      description: "Highlighted part of the hero title",
    },
    heroSubtitle: {
      type: "string",
      displayName: "Hero Subtitle",
      defaultValue:
        "GCM Ministries partners with indigenous churches worldwide to share the Gospel through strategic media campaigns and compassionate outreach.",
      description: "Subtitle text below the main hero title",
    },
    videoUrl: {
      type: "string",
      displayName: "Background Video (MP4, YouTube, or Vimeo URL)",
      defaultValue: "/clip_1080p.mp4",
      description:
        "MP4 file path (e.g. /clip_1080p.mp4), YouTube URL (e.g. https://youtu.be/XXXX), or Vimeo URL (e.g. https://vimeo.com/123456789). Videos will loop automatically.",
    },
    videoPosterUrl: {
      type: "string",
      displayName: "Video Poster URL",
      defaultValue: "/images/skdimore.jpeg",
      description: "URL to the video poster image (used when an MP4 file is provided).",
    },
    heroOverlayColor: {
      type: "string",
      displayName: "Hero Overlay Color",
      defaultValue: "#00000066",
      description: "Hex color with opacity for video overlay (e.g., #00000066, #1e3a8a80)",
    },
    heroTitleColor: {
      type: "string",
      displayName: "Hero Title Color",
      defaultValue: "#ffffff",
      description: "Hex color for hero title text",
    },
    heroSubtitleColor: {
      type: "string",
      displayName: "Hero Subtitle Color",
      defaultValue: "#e5e5e5",
      description: "Hex color for hero subtitle text",
    },
    button1Text: {
      type: "string",
      displayName: "Button 1 Text",
      defaultValue: "Watch Our Story",
      description: "Text displayed on the first button",
    },
    button1Link: {
      type: "string",
      displayName: "Button 1 Link",
      defaultValue: "/videos",
      description: "URL for the first button",
    },
    button1BgColor: {
      type: "string",
      displayName: "Button 1 Background Color",
      defaultValue: "#ffffff",
      description: "Hex color for first button background",
    },
    button1TextColor: {
      type: "string",
      displayName: "Button 1 Text Color",
      defaultValue: "#000000",
      description: "Hex color for first button text",
    },
    button1HoverBgColor: {
      type: "string",
      displayName: "Button 1 Hover Background Color",
      defaultValue: "#e5e5e5",
      description: "Hex color for first button background on hover",
    },
    button2Text: {
      type: "string",
      displayName: "Button 2 Text",
      defaultValue: "Explore Ministries",
      description: "Text displayed on the second button",
    },
    button2Link: {
      type: "string",
      displayName: "Button 2 Link",
      defaultValue: "/ministries",
      description: "URL for the second button",
    },
    button2BorderColor: {
      type: "string",
      displayName: "Button 2 Border Color",
      defaultValue: "#ffffff80",
      description: "Hex color for second button border",
    },
    button2TextColor: {
      type: "string",
      displayName: "Button 2 Text Color",
      defaultValue: "#ffffff",
      description: "Hex color for second button text",
    },
    button2HoverBgColor: {
      type: "string",
      displayName: "Button 2 Hover Background Color",
      defaultValue: "#ffffff",
      description: "Hex color for second button background on hover",
    },
    button2HoverTextColor: {
      type: "string",
      displayName: "Button 2 Hover Text Color",
      defaultValue: "#000000",
      description: "Hex color for second button text on hover",
    },
    button3Text: {
      type: "string",
      displayName: "Button 3 Text",
      defaultValue: "Sign Up for Our Newsletter",
      description: "Text displayed on the third button",
    },
    button3Link: {
      type: "string",
      displayName: "Button 3 Link",
      defaultValue: "/signup",
      description: "URL for the third button",
    },
    button3BorderColor: {
      type: "string",
      displayName: "Button 3 Border Color",
      defaultValue: "#ffffff80",
      description: "Hex color for third button border",
    },
    button3TextColor: {
      type: "string",
      displayName: "Button 3 Text Color",
      defaultValue: "#ffffff",
      description: "Hex color for third button text",
    },
    button3HoverBgColor: {
      type: "string",
      displayName: "Button 3 Hover Background Color",
      defaultValue: "#ffffff",
      description: "Hex color for third button background on hover",
    },
    button3HoverTextColor: {
      type: "string",
      displayName: "Button 3 Hover Text Color",
      defaultValue: "#000000",
      description: "Hex color for third button text on hover",
    },
    stat1: {
      type: "number",
      displayName: "Statistic 1 (People Reached)",
      defaultValue: 450,
      description: "First statistic number (People Reached in millions)",
    },
    stat2: {
      type: "number",
      displayName: "Statistic 2 (City Campaigns)",
      defaultValue: 112,
      description: "Second statistic number (City Campaigns)",
    },
    stat3: {
      type: "number",
      displayName: "Statistic 3 (Countries)",
      defaultValue: 100,
      description: "Third statistic number (Countries Served)",
    },
    stat1Label: {
      type: "string",
      displayName: "Statistic 1 Label",
      defaultValue: "People Reached",
      description: "Label text below Statistic 1",
    },
    stat1Suffix: {
      type: "string",
      displayName: "Statistic 1 Suffix",
      defaultValue: "M+",
      description: "Suffix appended to Statistic 1 number (e.g. M+, +, %)",
    },
    stat2Label: {
      type: "string",
      displayName: "Statistic 2 Label",
      defaultValue: "City Campaigns",
      description: "Label text below Statistic 2",
    },
    stat2Suffix: {
      type: "string",
      displayName: "Statistic 2 Suffix",
      defaultValue: "+",
      description: "Suffix appended to Statistic 2 number (e.g. M+, +, %)",
    },
    stat3Label: {
      type: "string",
      displayName: "Statistic 3 Label",
      defaultValue: "Countries Served",
      description: "Label text below Statistic 3",
    },
    stat3Suffix: {
      type: "string",
      displayName: "Statistic 3 Suffix",
      defaultValue: "+",
      description: "Suffix appended to Statistic 3 number (e.g. M+, +, %)",
    },
    statsTextColor: {
      type: "string",
      displayName: "Stats Text Color",
      defaultValue: "#ffffff",
      description: "Hex color for statistics numbers",
    },
    statsLabelColor: {
      type: "string",
      displayName: "Stats Label Color",
      defaultValue: "#ffffffb3",
      description: "Hex color for statistics labels",
    },
    statsBottomSpacingMobile: {
      type: "number",
      displayName: "Stats Bottom Spacing (Mobile)",
      defaultValue: 64,
      description: "Bottom spacing for stats section on mobile in pixels (e.g., 32, 64, 96)",
    },
    featureCardBgColor: {
      type: "string",
      displayName: "Feature Card Background Color",
      defaultValue: "#ffffff",
      description: "Hex color for feature card background",
    },
    featureCardBorderColor: {
      type: "string",
      displayName: "Feature Card Border Color",
      defaultValue: "#e5e7eb",
      description: "Hex color for feature card border",
    },
    featureCardIconBgColor: {
      type: "string",
      displayName: "Feature Card Icon Background Color",
      defaultValue: "#f1f5f9",
      description: "Hex color for feature card icon background",
    },
    featureCardIconColor: {
      type: "string",
      displayName: "Feature Card Icon Color",
      defaultValue: "#334155",
      description: "Hex color for feature card icon",
    },
    featureCardTitleColor: {
      type: "string",
      displayName: "Feature Card Title Color",
      defaultValue: "#0f172a",
      description: "Hex color for feature card title",
    },
    featureCardSubtitleColor: {
      type: "string",
      displayName: "Feature Card Subtitle Color",
      defaultValue: "#475569",
      description: "Hex color for feature card subtitle",
    },
    featureCardDescriptionColor: {
      type: "string",
      displayName: "Feature Card Description Color",
      defaultValue: "#475569",
      description: "Hex color for feature card description",
    },
    featureCardButtonBorderColor: {
      type: "string",
      displayName: "Feature Card Button Border Color",
      defaultValue: "#e5e7eb",
      description: "Hex color for feature card button border",
    },
    featureCardButtonTextColor: {
      type: "string",
      displayName: "Feature Card Button Text Color",
      defaultValue: "#000000",
      description: "Hex color for feature card button text",
    },
    featureCardButtonHoverBgColor: {
      type: "string",
      displayName: "Feature Card Button Hover Background Color",
      defaultValue: "#f9fafb",
      description: "Hex color for feature card button background on hover",
    },
    contentSectionBgColor: {
      type: "string",
      displayName: "Content Section Background Color",
      defaultValue: "#ffffff",
      description: "Hex color for content section background",
    },
    contentSectionPaddingY: {
      type: "number",
      displayName: "Content Section Vertical Padding",
      defaultValue: 96,
      description: "Vertical padding for content section in pixels (e.g., 64, 96, 128)",
    },
    feature1Title: {
      type: "string",
      displayName: "Feature 1 - Title",
      defaultValue: "Mega City Media Campaigns",
    },
    feature1Subtitle: {
      type: "string",
      displayName: "Feature 1 - Subtitle",
      defaultValue: "How do you evangelize to a whole city?",
    },
    feature1Description: {
      type: "string",
      displayName: "Feature 1 - Description",
      defaultValue:
        "Through 30-day Mega City Media Campaigns, GCMM partners with local churches to bring evangelism to an unprecedented scale—saturating cities with the Gospel through TV, radio, billboards, and digital media, fulfilling the Great Commission, one city at a time.",
    },
    feature1Image: {
      type: "imageUrl",
      displayName: "Feature 1 - Image",
      defaultValue: "/city-media-campaign-billboard.jpg",
    },
    feature1Link: {
      type: "string",
      displayName: "Feature 1 - Link",
      defaultValue: "/campaigns",
    },
    feature2Title: {
      type: "string",
      displayName: "Feature 2 - Title",
      defaultValue: "Media Outreach to the 10/40 Window",
    },
    feature2Subtitle: {
      type: "string",
      displayName: "Feature 2 - Subtitle",
      defaultValue: "Reaching Hearts Behind Closed Doors",
    },
    feature2Description: {
      type: "string",
      displayName: "Feature 2 - Description",
      defaultValue:
        "GCMM reaches millions in the Arabic world through satellite TV and social media—broadcasting in 7 languages via 18 satellites. With 1,300 programs produced annually and 200,000 monthly viewer interactions, we provide personal discipleship and partner with underground churches.",
    },
    feature2Image: {
      type: "imageUrl",
      displayName: "Feature 2 - Image",
      defaultValue: "/satellite-dish-broadcasting.jpg",
    },
    feature2Link: {
      type: "string",
      displayName: "Feature 2 - Link",
      defaultValue: "/arabic-ministry",
    },
    feature3Title: {
      type: "string",
      displayName: "Feature 3 - Title",
      defaultValue: "Recovery from Trauma",
    },
    feature3Subtitle: {
      type: "string",
      displayName: "Feature 3 - Subtitle",
      defaultValue: "Restoring Souls in a Wounded Nation",
    },
    feature3Description: {
      type: "string",
      displayName: "Feature 3 - Description",
      defaultValue:
        "GCMM's Christ-centred book, Recovery from Trauma, brings healing through Psalm 23, expert guidance, and real-life stories. Created with Ukrainian Christian psychologists, it offers peace to a hurting nation—meeting spiritual hunger with Gospel hope.",
    },
    feature3Image: {
      type: "imageUrl",
      displayName: "Feature 3 - Image",
      defaultValue: "/healing-book-recovery.jpg",
    },
    feature3Link: {
      type: "string",
      displayName: "Feature 3 - Link",
      defaultValue: "/trauma-recovery",
    },
    feature4Title: {
      type: "string",
      displayName: "Feature 4 - Title",
      defaultValue: "Israel Jewish Ministry",
    },
    feature4Subtitle: {
      type: "string",
      displayName: "Feature 4 - Subtitle",
      defaultValue: "Blessing Israel, Reaching the Jewish People",
    },
    feature4Description: {
      type: "string",
      displayName: "Feature 4 - Description",
      defaultValue:
        "GCMM is committed to blessing Israel and the Jewish people through media outreach, humanitarian aid, and education. We produce media for Jews in Israel and beyond, support refugees and new immigrants, and host healing camps for youth.",
    },
    feature4Image: {
      type: "imageUrl",
      displayName: "Feature 4 - Image",
      defaultValue: "/jerusalem-israel-ministry.jpg",
    },
    feature4Link: {
      type: "string",
      displayName: "Feature 4 - Link",
      defaultValue: "/israel-ministry",
    },
    feature5Title: {
      type: "string",
      displayName: "Feature 5 - Title",
      defaultValue: "Humanitarian Aid to Ukraine",
    },
    feature5Subtitle: {
      type: "string",
      displayName: "Feature 5 - Subtitle",
      defaultValue: "Faith in Action: Serving Ukraine in Its Darkest Hour",
    },
    feature5Description: {
      type: "string",
      displayName: "Feature 5 - Description",
      defaultValue:
        "In war-torn Ukraine, GCMM brings life-saving aid and the love of Christ. We've delivered over 5,000 tons of food, medical supplies, ambulances, and 12,000 wood-burning stoves, working through local churches and 400 chaplains.",
    },
    feature5Image: {
      type: "imageUrl",
      displayName: "Feature 5 - Image",
      defaultValue: "/humanitarian-aid-supplies.jpg",
    },
    feature5Link: {
      type: "string",
      displayName: "Feature 5 - Link",
      defaultValue: "/ukraine-aid",
    },
  },
  importPath: "./components/main-page-cinematic",
});

PLASMIC.registerComponent(JoinOurMissionCTA, {
  name: "JoinOurMissionCTA",
  displayName: "Join Our Mission CTA",
  description: "A newsletter signup section for joining the mission with customizable colors and content",
  props: {
    className: {
      type: "class",
      displayName: "CSS Class",
      description: "Custom CSS classes for styling in Plasmic",
    },

    // Colors
    backgroundColor: {
      type: "string",
      displayName: "Background Color",
      defaultValue: "#0f172a",
      description: "Hex color for section background (e.g., #0f172a, #1e293b)",
    },
    titleColor: {
      type: "string",
      displayName: "Title Color",
      defaultValue: "#ffffff",
      description: "Hex color for title text",
    },
    highlightColor: {
      type: "string",
      displayName: "Highlight Color",
      defaultValue: "#ffffff",
      description: "Hex color for highlighted title text",
    },
    descriptionColor: {
      type: "string",
      displayName: "Description Color",
      defaultValue: "#e2e8f0",
      description: "Hex color for description text",
    },

    inputBgColor: {
      type: "string",
      displayName: "Input Background Color",
      defaultValue: "#1e293b",
      description: "Hex color for input field backgrounds",
    },
    inputBorderColor: {
      type: "string",
      displayName: "Input Border Color",
      defaultValue: "#334155",
      description: "Hex color for input field borders",
    },
    inputTextColor: {
      type: "string",
      displayName: "Input Text Color",
      defaultValue: "#ffffff",
      description: "Hex color for input field text",
    },
    inputPlaceholderColor: {
      type: "string",
      displayName: "Input Placeholder Color",
      defaultValue: "#94a3b8",
      description: "Hex color for input field placeholder text",
    },
    labelColor: {
      type: "string",
      displayName: "Label Color",
      defaultValue: "#e2e8f0",
      description: "Hex color for form labels",
    },

    buttonBgColor: {
      type: "string",
      displayName: "Button Background Color",
      defaultValue: "#ffffff",
      description: "Hex color for button background",
    },
    buttonTextColor: {
      type: "string",
      displayName: "Button Text Color",
      defaultValue: "#000000",
      description: "Hex color for button text",
    },
    buttonHoverBgColor: {
      type: "string",
      displayName: "Button Hover Background Color",
      defaultValue: "#e5e5e5",
      description: "Hex color for button background on hover",
    },

    // Spacing & Layout
    paddingY: {
      type: "number",
      displayName: "Vertical Padding",
      defaultValue: 96,
      description: "Vertical padding for the section in pixels (e.g., 64, 96, 128)",
    },
    paddingX: {
      type: "number",
      displayName: "Horizontal Padding",
      defaultValue: 24,
      description: "Horizontal padding for the section in pixels (e.g., 16, 24, 32)",
    },
    maxWidth: {
      type: "string",
      displayName: "Max Width",
      defaultValue: "640px",
      description: "Maximum width of content container (e.g., 640px, 768px, 1024px)",
    },
    fullBleed: {
      type: "boolean",
      displayName: "Full Bleed",
      defaultValue: false,
      description: "Enable full bleed layout (extends to edges)",
    },

    ctaTitle: {
      type: "string",
      displayName: "CTA Title",
      defaultValue: "Join Our",
      description: "First part of the CTA title",
    },
    ctaHighlight: {
      type: "string",
      displayName: "CTA Highlight",
      defaultValue: "Mission",
      description: "Highlighted part of the CTA title",
    },
    ctaDescription: {
      type: "string",
      displayName: "CTA Description",
      defaultValue:
        "Subscribe to our newsletter to receive updates on our global ministry work, testimonies from the field, and ways you can be part of spreading the Gospel worldwide.",
      description: "Description text for the newsletter signup",
    },

    firstNameLabel: {
      type: "string",
      displayName: "First Name Label",
      defaultValue: "First Name",
      description: "Label for first name field",
    },
    firstNamePlaceholder: {
      type: "string",
      displayName: "First Name Placeholder",
      defaultValue: "John",
      description: "Placeholder for first name field",
    },
    lastNameLabel: {
      type: "string",
      displayName: "Last Name Label",
      defaultValue: "Last Name",
      description: "Label for last name field",
    },
    lastNamePlaceholder: {
      type: "string",
      displayName: "Last Name Placeholder",
      defaultValue: "Doe",
      description: "Placeholder for last name field",
    },
    emailLabel: {
      type: "string",
      displayName: "Email Label",
      defaultValue: "Email Address",
      description: "Label for email field",
    },
    emailPlaceholder: {
      type: "string",
      displayName: "Email Placeholder",
      defaultValue: "john@example.com",
      description: "Placeholder for email field",
    },

    buttonText: {
      type: "string",
      displayName: "Button Text",
      defaultValue: "Subscribe to Newsletter",
      description: "Text for the submit button",
    },
    buttonSubmittingText: {
      type: "string",
      displayName: "Button Submitting Text",
      defaultValue: "Subscribing...",
      description: "Text shown while submitting",
    },

    successTitle: {
      type: "string",
      displayName: "Success Title",
      defaultValue: "Thank You!",
      description: "Title shown after successful submission",
    },
    successMessage: {
      type: "string",
      displayName: "Success Message",
      defaultValue:
        "Check your email to confirm your subscription. We'll keep you updated on our ministry work and global outreach efforts.",
      description: "Message shown after successful submission",
    },

    privacyText: {
      type: "string",
      displayName: "Privacy Text",
      defaultValue: "We respect your privacy. Unsubscribe at any time.",
      description: "Privacy notice text below form",
    },
    mailchimpUrl: {
      type: "string",
      displayName: "Mailchimp Form URL",
      defaultValue:
        "https://GCMM.us4.list-manage.com/subscribe/post?u=318fc9b1880100b326b3ddf87&amp;id=b03a1478c0&amp;f_id=00f81feaf0",
      description: "Your Mailchimp form submission URL",
    },
  },
  importPath: "./components/join-our-mission-cta",
});


PLASMIC.registerComponent(OtherWaysToGive, {
  name: "OtherWaysToGive",
  displayName: "Other Ways to Give",
  description:
    "An infographic-style donation section displaying five giving methods with icons and expandable information",
  props: {
    className: {
      type: "class",
      displayName: "CSS Class",
      description: "Custom CSS classes for styling in Plasmic",
    },

    // Header
    showHeader: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show Header",
    },
    headerText: {
      type: "string",
      defaultValue: "OTHER WAYS TO GIVE",
      displayName: "Header Text",
      hidden: (props: any) => !props.showHeader,
    },
    headerTextColor: {
      type: "string",
      defaultValue: "#1e40af",
      displayName: "Header Text Color",
      description: "Hex color for main header text",
      hidden: (props: any) => !props.showHeader,
    },
    headerAccentColor: {
      type: "string",
      defaultValue: "#1e3a8a",
      displayName: "Header Accent Color",
      description: "Hex color for 'OTHER' text",
      hidden: (props: any) => !props.showHeader,
    },

    showEtransferMethod: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show E-Transfer Method",
    },
    etransferLabel: {
      type: "string",
      defaultValue: "E-TRANSFER",
      displayName: "E-Transfer Label",
      hidden: (props: any) => !props.showEtransferMethod,
    },
    etransferInfo: {
      type: "string",
      defaultValue: "Send your e-transfer to donations@organization.org. Please include your full name and mailing address in the message for your tax receipt.",
      displayName: "E-Transfer Information",
      hidden: (props: any) => !props.showEtransferMethod,
    },
    etransferIconColor: {
      type: "string",
      defaultValue: "#8b7355",
      displayName: "E-Transfer Icon Color",
      description: "Hex color for E-Transfer icon",
      hidden: (props: any) => !props.showEtransferMethod,
    },

    showChequeMethod: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show Cheque Method",
    },
    chequeLabel: {
      type: "string",
      defaultValue: "CHEQUE",
      displayName: "Cheque Label",
      hidden: (props: any) => !props.showChequeMethod,
    },
    chequeInfo: {
      type: "string",
      defaultValue: "Make your cheque payable to 'Organization Name' and mail it to the address below. Please include your contact information for a tax receipt.",
      displayName: "Cheque Information",
      hidden: (props: any) => !props.showChequeMethod,
    },
    chequeIconColor: {
      type: "string",
      defaultValue: "#8b7355",
      displayName: "Cheque Icon Color",
      description: "Hex color for Cheque icon",
      hidden: (props: any) => !props.showChequeMethod,
    },

    showPhoneMethod: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show Phone Method",
    },
    phoneLabel: {
      type: "string",
      defaultValue: "PHONE",
      displayName: "Phone Label",
      hidden: (props: any) => !props.showPhoneMethod,
    },
    phoneInfo: {
      type: "string",
      defaultValue: "Call us at 1-800-XXX-XXXX to make a donation over the phone. Our team is available Monday to Friday, 9 AM to 5 PM EST.",
      displayName: "Phone Information",
      hidden: (props: any) => !props.showPhoneMethod,
    },
    phoneIconColor: {
      type: "string",
      defaultValue: "#8b7355",
      displayName: "Phone Icon Color",
      description: "Hex color for Phone icon",
      hidden: (props: any) => !props.showPhoneMethod,
    },

    showCreditCardMethod: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show Credit Card Method",
    },
    creditCardLabel: {
      type: "string",
      defaultValue: "CREDIT CARD",
      displayName: "Credit Card Label",
      hidden: (props: any) => !props.showCreditCardMethod,
    },
    creditCardInfo: {
      type: "string",
      defaultValue: "Donate securely online using your credit card. Visit our website or call us to make your donation.",
      displayName: "Credit Card Information",
      hidden: (props: any) => !props.showCreditCardMethod,
    },
    creditCardIconColor: {
      type: "string",
      defaultValue: "#8b7355",
      displayName: "Credit Card Icon Color",
      description: "Hex color for Credit Card icon",
      hidden: (props: any) => !props.showCreditCardMethod,
    },

    // Estate Method (unchanged)
    showEstateMethod: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show Estate Giving Method",
    },
    estateLabel: {
      type: "string",
      defaultValue: "ESTATE GIVING",
      displayName: "Estate Giving Label",
      hidden: (props: any) => !props.showEstateMethod,
    },
    estateInfo: {
      type: "string",
      defaultValue: "Leave a lasting legacy by including us in your will or estate plan. Contact us to discuss planned giving options.",
      displayName: "Estate Giving Information",
      hidden: (props: any) => !props.showEstateMethod,
    },
    estateIconColor: {
      type: "string",
      defaultValue: "#8b7355",
      displayName: "Estate Giving Icon Color",
      description: "Hex color for Estate Giving icon",
      hidden: (props: any) => !props.showEstateMethod,
    },

    // Tax Info
    showTaxInfo: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show Tax Information",
    },
    taxInfoText: {
      type: "string",
      defaultValue: "CANADIAN REGISTRATION #: 85012 1203 RR0001",
      displayName: "Tax Information Text",
      hidden: (props: any) => !props.showTaxInfo,
    },
    taxInfoTextColor: {
      type: "string",
      defaultValue: "#a78759",
      displayName: "Tax Info Text Color",
      description: "Hex color for tax information text",
      hidden: (props: any) => !props.showTaxInfo,
    },

    // Canada Address Card
    showCanadaCard: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show Canada Address Card",
    },
    canadaCardTitle: {
      type: "string",
      defaultValue: "CANADIAN DONATIONS",
      displayName: "Canada Card Title",
      hidden: (props: any) => !props.showCanadaCard,
    },
    canadaCardAddress: {
      type: "string",
      defaultValue: "456 Maple Avenue\nSuite 200\nToronto, ON M5H 2N2\nCanada",
      displayName: "Canada Card Address",
      description: "Use \\n for line breaks",
      hidden: (props: any) => !props.showCanadaCard,
    },
    canadaCardBackgroundColor: {
      type: "string",
      defaultValue: "#ffffff",
      displayName: "Canada Card Background Color",
      description: "Hex color for Canada card background",
      hidden: (props: any) => !props.showCanadaCard,
    },
    canadaCardTextColor: {
      type: "string",
      defaultValue: "#000000",
      displayName: "Canada Card Text Color",
      description: "Hex color for Canada card text",
      hidden: (props: any) => !props.showCanadaCard,
    },
    canadaCardBorderColor: {
      type: "string",
      defaultValue: "#e5e7eb",
      displayName: "Canada Card Border Color",
      description: "Hex color for Canada card border",
      hidden: (props: any) => !props.showCanadaCard,
    },
    canadaCardCheckColor: {
      type: "string",
      defaultValue: "#3b82f6",
      displayName: "Canada Card Check Icon Color",
      description: "Hex color for Canada card check icon",
      hidden: (props: any) => !props.showCanadaCard,
    },

    // Card Styling
    cardBackgroundColor: {
      type: "string",
      defaultValue: "#ffffff",
      displayName: "Method Card Background Color",
      description: "Hex color for donation method card background",
    },
    cardHoverBackgroundColor: {
      type: "string",
      defaultValue: "#f9fafb",
      displayName: "Method Card Hover Background Color",
      description: "Hex color for card background on hover",
    },
    cardTextColor: {
      type: "string",
      defaultValue: "#000000",
      displayName: "Method Card Text Color",
      description: "Hex color for card text",
    },
    cardBorderColor: {
      type: "string",
      defaultValue: "#e5e7eb",
      displayName: "Method Card Border Color",
      description: "Hex color for card border",
    },
    cardIconSize: {
      type: "number",
      defaultValue: 48,
      displayName: "Card Icon Size",
      description: "Size of icons in pixels",
    },
  },
  importPath: "./components/other-ways-to-give",
});

// Register StaffGrid component
PLASMIC.registerComponent(StaffGrid, {
  name: "StaffGrid",
  description: "A grid layout to display multiple staff members",
  props: {
    members: {
      type: "array",
      description: "Array of staff members",
      defaultValue: [
        {
          name: "Jane Smith",
          role: "Product Manager",
          bio: "Leading product strategy and user experience design.",
          image: "/professional-woman-portrait.png",
          links: {
            linkedin: "https://linkedin.com",
          },
        },
        {
          name: "Mike Johnson",
          role: "Designer",
          bio: "Creating beautiful and functional user interfaces.",
          image: "/professional-man-portrait.png",
          links: {
            linkedin: "https://linkedin.com",
            website: "https://example.com",
          },
        },
      ],
      itemType: {
        type: "object",
        fields: {
          name: "string",
          role: "string",
          bio: "string",
          image: "imageUrl",
          links: {
            type: "object",
            fields: {
              github: "string",
              linkedin: "string",
              twitter: "string",
              website: "string",
            },
          },
        },
      },
    },
    className: {
      type: "class",
      description: "Additional CSS classes",
    },
  },
});

PLASMIC.registerComponent(VideosPage, {
    name: "VideosPage",
    displayName: "Videos Page",
    description: "A professional videos showcase page with a flexible grid of video items that can be added or removed",
    props: {
      pageTitle: {
        type: "string",
        displayName: "Page Title",
        defaultValue: "TV & Video",
        description: "Main page title",
      },
      pageSubtitle: {
        type: "string",
        displayName: "Page Subtitle",
        defaultValue: "A general overview of Great Commission Media Ministries.",
        description: "Subtitle describing the video content",
      },
      moreVideosTitle: {
        type: "string",
        displayName: "More Videos Title",
        defaultValue: "More videos from GCM Ministries",
        description: "Title for the additional videos section",
      },
      moreVideosSubtitle: {
        type: "string",
        displayName: "More Videos Subtitle",
        defaultValue: "missions outreach",
        description: "Subtitle for the additional videos section",
      },

      // Featured Video Props
      featuredVideoTitle: {
        type: "string",
        displayName: "Featured Video Title",
        defaultValue: "Great Commission Media Ministries Overview",
        description: "Title of the main featured video",
      },
      featuredVideoDescription: {
        type: "string",
        displayName: "Featured Video Description",
        defaultValue:
          "Discover how GCM Ministries is reaching nations through strategic media campaigns and compassionate outreach across the globe.",
        description: "Description of the featured video",
      },
      featuredVideoUrl: {
        type: "string",
        displayName: "Featured Video URL",
        defaultValue: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        description: "YouTube embed URL for the featured video",
      },
      featuredVideoDuration: {
        type: "string",
        displayName: "Featured Video Duration",
        defaultValue: "12:45",
        description: "Duration of the featured video",
      },
      featuredVideoViews: {
        type: "string",
        displayName: "Featured Video Views",
        defaultValue: "15,234",
        description: "View count for the featured video",
      },
      featuredVideoDate: {
        type: "string",
        displayName: "Featured Video Date",
        defaultValue: "Dec 15, 2024",
        description: "Publication date of the featured video",
      },

      // Video Grid Items - Now an array that can be added to or removed from
      videoItems: {
        type: "array",
        displayName: "Video Grid Items",
        description: "Add or remove video items to customize the grid",
        itemType: {
          type: "object",
          nameFunc: (item: any) => item.title || "Video Item",
          fields: {
            id: {
              type: "string",
              displayName: "ID",
              defaultValue: "1",
              description: "Unique identifier for the video",
            },
            title: {
              type: "string",
              displayName: "Title",
              defaultValue: "Video Title",
              description: "Title of the video",
            },
            description: {
              type: "string",
              displayName: "Description",
              defaultValue: "Video description goes here",
              description: "Short description of the video",
            },
            videoUrl: {
              type: "string",
              displayName: "Video URL",
              defaultValue: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              description: "YouTube embed URL",
            },
            duration: {
              type: "string",
              displayName: "Duration",
              defaultValue: "8:32",
              description: "Video duration (e.g., 8:32)",
            },
            views: {
              type: "string",
              displayName: "Views",
              defaultValue: "8,421",
              description: "View count",
            },
            date: {
              type: "string",
              displayName: "Date",
              defaultValue: "Dec 10, 2024",
              description: "Publication date",
            },
            category: {
              type: "string",
              displayName: "Category",
              defaultValue: "Campaigns",
              description: "Video category (e.g., Campaigns, Outreach, Humanitarian)",
            },
          },
        },
        defaultValue: [
          {
            id: "1",
            title: "Mega City Campaigns in Russia",
            description: "Witness the powerful impact of our evangelistic campaigns in major Russian cities.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "8:32",
            views: "8,421",
            date: "Dec 10, 2024",
            category: "Campaigns",
          },
          {
            id: "2",
            title: "Ministry to the Jewish People",
            description: "Our dedicated outreach to Jewish communities around the world.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "15:18",
            views: "12,156",
            date: "Dec 8, 2024",
            category: "Outreach",
          },
          {
            id: "3",
            title: "Children's Aid Program",
            description: "Providing hope and essential supplies to children in need.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "6:45",
            views: "5,892",
            date: "Dec 5, 2024",
            category: "Humanitarian",
          },
          {
            id: "4",
            title: "Islamic World Outreach",
            description: "Reaching 1.4 billion Muslims with the Gospel message.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "11:22",
            views: "9,734",
            date: "Dec 3, 2024",
            category: "Missions",
          },
          {
            id: "5",
            title: "Training Indigenous Workers",
            description: "Equipping local leaders to reach their own communities.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "9:15",
            views: "6,543",
            date: "Nov 28, 2024",
            category: "Training",
          },
          {
            id: "6",
            title: "Media Production Behind the Scenes",
            description: "See how we create content in 40 different languages.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "7:38",
            views: "4,321",
            date: "Nov 25, 2024",
            category: "Production",
          },
        ],
      },
    },
    importPath: "./components/videos-page",
  });

// Register the Contact Form component
PLASMIC.registerComponent(ContactForm, {
  name: "ContactForm",
  displayName: "Contact Form",
  description: "A professional contact form with Nodemailer integration and elegant styling",
  props: {
    title: {
      type: "string",
      displayName: "Title",
      defaultValue: "Get in Touch",
      description: "Main heading for the contact section",
    },
    subtitle: {
      type: "string",
      displayName: "Subtitle",
      defaultValue: "Call, write or use the form below to contact us. We'd love to hear from you!",
      description: "Subtitle text below the main heading",
    },
    phone: {
      type: "string",
      displayName: "Phone Number",
      defaultValue: "(877) 244-7618",
      description: "Contact phone number",
    },
    email: {
      type: "string",
      displayName: "Email Address",
      defaultValue: "liz@gcmministries.com",
      description: "Contact email address",
    },
    address: {
      type: "string",
      displayName: "Address",
      defaultValue: "PO Box 16418, St. Paul, MN 55116",
      description: "Physical address",
    },
  },
  importPath: "./contact-form",
})

// Register the Timeline About Page component
PLASMIC.registerComponent(AboutPage, {
  name: "AboutPage",
  displayName: "About Page",
  description: "A unified about page with staff section and timeline story section",
  props: {
    // Styling Control
    className: {
      type: "class",
      displayName: "Custom Classes",
      description: "CSS classes for full styling control",
    },

    // Staff Section - Header
    staffSectionTitle: {
      type: "string",
      displayName: "Staff Section Title",
      defaultValue: "Our Team",
      description: "Title for the staff section",
    },
    staffSectionSubtitle: {
      type: "string",
      displayName: "Staff Section Subtitle",
      defaultValue: "Meet the people behind our mission",
      description: "Subtitle for the staff section",
    },

    // Staff Section - Members
    staffMembers: {
      type: "array",
      displayName: "Staff Members",
      defaultValue: [
        {
          name: "John Doe",
          role: "Executive Director",
          bio: "Leading our mission with passion and dedication to serve communities worldwide.",
          image: "/placeholder.svg?height=400&width=400",
          links: {
            linkedin: "https://linkedin.com",
          },
        },
        {
          name: "Jane Smith",
          role: "Director of Operations",
          bio: "Overseeing daily operations and ensuring excellence in all our programs.",
          image: "/placeholder.svg?height=400&width=400",
          links: {
            linkedin: "https://linkedin.com",
          },
        },
      ],
      itemType: {
        type: "object",
        fields: {
          name: "string",
          role: "string",
          bio: "string",
          image: "imageUrl",
          links: {
            type: "object",
            fields: {
              github: "string",
              linkedin: "string",
              twitter: "string",
              website: "string",
            },
          },
        },
      },
    },

    // Staff Section - Colors
    staffBackgroundColor: {
      type: "string",
      displayName: "Staff Background Color",
      defaultValue: "#FFFFFF",
      description: "Staff section background color (hex code)",
    },
    staffTitleColor: {
      type: "string",
      displayName: "Staff Title Color",
      defaultValue: "#1A1A1A",
      description: "Staff section title color (hex code)",
    },
    staffSubtitleColor: {
      type: "string",
      displayName: "Staff Subtitle Color",
      defaultValue: "#666666",
      description: "Staff section subtitle color (hex code)",
    },
    staffCardBackgroundColor: {
      type: "string",
      displayName: "Staff Card Background",
      defaultValue: "#FFFFFF",
      description: "Staff card background color (hex code)",
    },
    staffCardTextColor: {
      type: "string",
      displayName: "Staff Card Text Color",
      defaultValue: "#1A1A1A",
      description: "Staff card name text color (hex code)",
    },
    staffCardRoleColor: {
      type: "string",
      displayName: "Staff Card Role Color",
      defaultValue: "#666666",
      description: "Staff card role text color (hex code)",
    },
    staffCardBioColor: {
      type: "string",
      displayName: "Staff Card Bio Color",
      defaultValue: "#4A4A4A",
      description: "Staff card bio text color (hex code)",
    },
    staffCardBorderColor: {
      type: "string",
      displayName: "Staff Card Border Color",
      defaultValue: "#E5E5E5",
      description: "Staff card border color (hex code)",
    },
    staffLinkColor: {
      type: "string",
      displayName: "Staff Link Color",
      defaultValue: "#666666",
      description: "Staff social link color (hex code)",
    },
    staffLinkHoverColor: {
      type: "string",
      displayName: "Staff Link Hover Color",
      defaultValue: "#1A1A1A",
      description: "Staff social link hover color (hex code)",
    },

    // Timeline Section - Header
    timelineTitle: {
      type: "string",
      displayName: "Timeline Title",
      defaultValue: "Our Story",
      description: "Title for the timeline section",
    },
    timelineSubtitle: {
      type: "string",
      displayName: "Timeline Subtitle",
      defaultValue: "A Journey of Faith and Service",
      description: "Subtitle for the timeline section",
    },

    // Timeline Section - Events
    timelineEvents: {
      type: "array",
      displayName: "Timeline Events",
      defaultValue: [
        {
          year: "2010",
          title: "The Beginning",
          description: "Our organization was founded with a vision to make a difference in the world.",
          highlight: true,
          hasImage: false,
        },
        {
          year: "2015",
          title: "Expansion",
          description: "We expanded our reach to serve communities across multiple countries.",
          highlight: false,
          hasImage: false,
        },
        {
          year: "2020",
          title: "Digital Transformation",
          description: "Embracing technology to reach more people and increase our impact.",
          highlight: true,
          hasImage: false,
        },
      ],
      itemType: {
        type: "object",
        fields: {
          year: {
            type: "string",
            displayName: "Year",
            defaultValue: "2024",
          },
          title: {
            type: "string",
            displayName: "Title",
            defaultValue: "New Event",
          },
          description: {
            type: "string",
            displayName: "Description",
            defaultValue: "Add your event description here.",
          },
          highlight: {
            type: "boolean",
            displayName: "Highlight",
            defaultValue: false,
          },
          hasImage: {
            type: "boolean",
            displayName: "Has Image",
            defaultValue: false,
          },
          image: {
            type: "imageUrl",
            displayName: "Image",
            defaultValue: "/placeholder.svg?height=400&width=400",
          },
        },
      },
    },

    // Timeline Section - Colors
    timelineBackgroundColor: {
      type: "string",
      displayName: "Timeline Background Color",
      defaultValue: "#0A0A0A",
      description: "Timeline section background color (hex code)",
    },
    timelineTitleColor: {
      type: "string",
      displayName: "Timeline Title Color",
      defaultValue: "#FFFFFF",
      description: "Timeline section title color (hex code)",
    },
    timelineSubtitleColor: {
      type: "string",
      displayName: "Timeline Subtitle Color",
      defaultValue: "#999999",
      description: "Timeline section subtitle color (hex code)",
    },
    timelineLineColor: {
      type: "string",
      displayName: "Timeline Line Color",
      defaultValue: "#F59E0B",
      description: "Timeline vertical line color (hex code)",
    },
    timelineAccentColor: {
      type: "string",
      displayName: "Timeline Accent Color",
      defaultValue: "#F59E0B",
      description: "Timeline accent color for highlights (hex code)",
    },
    timelineYearColor: {
      type: "string",
      displayName: "Timeline Year Color",
      defaultValue: "#999999",
      description: "Timeline year text color (hex code)",
    },
    timelineHighlightYearColor: {
      type: "string",
      displayName: "Timeline Highlight Year Color",
      defaultValue: "#F59E0B",
      description: "Timeline highlighted year color (hex code)",
    },
    timelineEventTitleColor: {
      type: "string",
      displayName: "Timeline Event Title Color",
      defaultValue: "#FFFFFF",
      description: "Timeline event title color (hex code)",
    },
    timelineEventDescriptionColor: {
      type: "string",
      displayName: "Timeline Event Description Color",
      defaultValue: "#CCCCCC",
      description: "Timeline event description color (hex code)",
    },
    timelineDotColor: {
      type: "string",
      displayName: "Timeline Dot Color",
      defaultValue: "#666666",
      description: "Timeline dot color for regular events (hex code)",
    },
    timelineHighlightDotColor: {
      type: "string",
      displayName: "Timeline Highlight Dot Color",
      defaultValue: "#F59E0B",
      description: "Timeline dot color for highlighted events (hex code)",
    },

    // Animation Control
    enableAnimations: {
      type: "boolean",
      displayName: "Enable Animations",
      defaultValue: true,
      description: "Enable scroll-triggered animations for timeline events",
    },
  },
  importPath: "./components/about-page",
});

// Register the Navigation Header component
PLASMIC.registerComponent(NavigationHeader, {
  name: "NavigationHeader",
  displayName: "Navigation Header",
  description: "A responsive navigation header with dropdown menus for ministry website",
  props: {
    className: {
      type: "class",
      displayName: "CSS Class",
      description: "Custom CSS classes for styling in Plasmic",
    },

    // Logo Configuration
    logoSrc: {
      type: "string",
      defaultValue: "/logo.png",
      displayName: "Logo Source",
      description: "URL or path to the logo image",
    },
    logoAlt: {
      type: "string",
      defaultValue: "GCM Logo",
      displayName: "Logo Alt Text",
      description: "Alternative text for the logo",
    },
    logoWidth: {
      type: "number",
      defaultValue: 120,
      displayName: "Logo Width",
      description: "Width of the logo in pixels",
    },
    logoHeight: {
      type: "number",
      defaultValue: 40,
      displayName: "Logo Height",
      description: "Height of the logo in pixels",
    },

    homeUrl: {
      type: "string",
      defaultValue: "/",
      displayName: "Home URL",
      description: "URL for the Home navigation link",
    },
    newsUrl: {
      type: "string",
      defaultValue: "/news",
      displayName: "News URL",
      description: "URL for the News navigation link",
    },
    contactUrl: {
      type: "string",
      defaultValue: "/contact",
      displayName: "Contact URL",
      description: "URL for the Contact navigation link",
    },
    videosUrl: {
      type: "string",
      defaultValue: "/videos",
      displayName: "Videos URL",
      description: "URL for the Videos navigation link",
    },

    // Navigation Visibility
    showHome: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show Home",
    },
    showWhoWeAre: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show 'Who we are'",
    },
    showWhatWeDo: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show 'What we do'",
    },
    showGetInvolved: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show 'Get involved'",
    },
    showNews: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show News",
    },
    showContact: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show Contact",
    },
    showVideos: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show Videos",
    },

    // Who we are Dropdown - now with URL control
    whoWeAreDropdownItems: {
      type: "object",
      defaultValue: [
        { label: "About", url: "/about" },
        { label: "History", url: "/history" },
        { label: "Team", url: "/team" },
      ],
      displayName: "Who we are - Dropdown Items",
      description: "Array of menu items with URLs for Who we are dropdown",
    },

    // What we do Dropdown - now with URL control
    whatWeDoDropdownItems: {
      type: "object",
      defaultValue: [
        { label: "Mega City Media Campaign", url: "/mega-city-media-campaign" },
        { label: "Media Outreach to the 10/40 Window", url: "/media-outreach-10-40-window" },
        { label: "Recovery from Trauma", url: "/recovery-from-trauma" },
        { label: "Israel Jewish Ministry", url: "/israel-jewish-ministry" },
        { label: "Humanitarian Aid to Ukraine", url: "/humanitarian-aid-ukraine" },
      ],
      displayName: "What we do - Dropdown Items",
      description: "Array of menu items with URLs for What we do dropdown",
    },

    // Get involved Dropdown - now with URL control
    getInvolvedDropdownItems: {
      type: "object",
      defaultValue: [
        { label: "Pray", url: "/pray" },
        { label: "Donate", url: "/donate-involved" },
        { label: "News & Stories (Newsletter hub)", url: "/news-stories" },
        { label: "Newsletter sign-up", url: "/newsletter-signup" },
        { label: "Contact us", url: "/contact-us" },
      ],
      displayName: "Get involved - Dropdown Items",
      description: "Array of menu items with URLs for Get involved dropdown",
    },

    // Search
    showSearch: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show Search",
      description: "Whether to display the search button and search bar",
    },
    searchPlaceholder: {
      type: "string",
      defaultValue: "Search articles...",
      displayName: "Search Placeholder",
      description: "Placeholder text for the search input",
    },

    // Donate Button
    showDonateButton: {
      type: "boolean",
      defaultValue: true,
      displayName: "Show Donate Button",
    },
    donateText: {
      type: "string",
      defaultValue: "Donate",
      displayName: "Donate Button Text",
    },
    donateUrl: {
      type: "string",
      defaultValue: "/donate",
      displayName: "Donate Button URL",
      description: "URL for the Donate button",
    },

    // Colors
    headerBackgroundColor: {
      type: "string",
      defaultValue: "#000000",
      displayName: "Header Background Color",
      description: "Hex color for header background",
    },
    textColor: {
      type: "string",
      defaultValue: "#f3f4f6",
      displayName: "Text Color",
      description: "Hex color for navigation text",
    },
    hoverTextColor: {
      type: "string",
      defaultValue: "#1e3a8a",
      displayName: "Hover Text Color",
      description: "Hex color for navigation text on hover",
    },
    buttonBackgroundColor: {
      type: "string",
      defaultValue: "#1e3a8a",
      displayName: "Button Background Color",
      description: "Hex color for donate button background",
    },
    buttonHoverColor: {
      type: "string",
      defaultValue: "#1e40af",
      displayName: "Button Hover Color",
      description: "Hex color for donate button on hover",
    },
    buttonTextColor: {
      type: "string",
      defaultValue: "#ffffff",
      displayName: "Button Text Color",
      description: "Hex color for donate button text",
    },

    // Spacing & Typography
    navItemSpacing: {
      type: "number",
      defaultValue: 40,
      displayName: "Nav Item Spacing",
      description: "Horizontal spacing between navigation items in pixels",
    },
    navItemPaddingX: {
      type: "number",
      defaultValue: 28,
      displayName: "Nav Item Horizontal Padding",
      description: "Horizontal padding for navigation items in pixels",
    },
    navItemPaddingY: {
      type: "number",
      defaultValue: 10,
      displayName: "Nav Item Vertical Padding",
      description: "Vertical padding for navigation items in pixels",
    },
    fontFamily: {
      type: "string",
      defaultValue: "font-sans",
      displayName: "Font Family",
      description: "Tailwind CSS font family class",
    },
    fontSize: {
      type: "string",
      defaultValue: "text-sm",
      displayName: "Font Size",
      description: "Tailwind CSS font size class",
    },
    fontWeight: {
      type: "string",
      defaultValue: "font-medium",
      displayName: "Font Weight",
      description: "Tailwind CSS font weight class",
    },
  },
  importPath: "./components/navigation-header",
});

// Register the Ministries Page component
PLASMIC.registerComponent(MinistriesPage, {
  name: "MinistriesPage",
  displayName: "Ministries Page",
  description: "A comprehensive ministries page showcasing global outreach and impact",
  props: {
    // Hero Section
    heroTitle: {
      type: "string",
      displayName: "Hero Title",
      defaultValue: "Our Global",
    },
    heroSubtitle: {
      type: "string",
      displayName: "Hero Subtitle",
      defaultValue: "Ministries",
    },
    heroDescription: {
      type: "string",
      displayName: "Hero Description",
      defaultValue: "Reaching nations through strategic media campaigns and compassionate outreach across the globe",
    },

    // Feature Cards - Five Ministry Types
    feature1Title: {
      type: "string",
      displayName: "Feature 1 Title",
      defaultValue: "Mega City Media Campaigns",
    },
    feature1Subtitle: {
      type: "string",
      displayName: "Feature 1 Subtitle",
      defaultValue: "How do you evangelize to a whole city?",
    },
    feature1Description: {
      type: "string",
      displayName: "Feature 1 Description",
      defaultValue: "Through 30-day Mega City Media Campaigns, GCMM partners with local churches to bring evangelism to an unprecedented scale—saturating cities with the Gospel through TV, radio, billboards, and digital media.",
    },
    feature1Image: {
      type: "imageUrl",
      displayName: "Feature 1 Image",
      defaultValue: "/city-media-campaign-billboard.jpg",
    },
    feature1Link: {
      type: "string",
      displayName: "Feature 1 Link",
      defaultValue: "/campaigns",
    },

    feature2Title: {
      type: "string",
      displayName: "Feature 2 Title",
      defaultValue: "Media Outreach to the 10/40 Window",
    },
    feature2Subtitle: {
      type: "string",
      displayName: "Feature 2 Subtitle",
      defaultValue: "Reaching Hearts Behind Closed Doors",
    },
    feature2Description: {
      type: "string",
      displayName: "Feature 2 Description",
      defaultValue: "GCMM reaches millions in the Arabic world through satellite TV and social media—broadcasting in 7 languages via 18 satellites.",
    },
    feature2Image: {
      type: "imageUrl",
      displayName: "Feature 2 Image",
      defaultValue: "/satellite-dish-broadcasting.jpg",
    },
    feature2Link: {
      type: "string",
      displayName: "Feature 2 Link",
      defaultValue: "/arabic-ministry",
    },

    feature3Title: {
      type: "string",
      displayName: "Feature 3 Title",
      defaultValue: "Recovery from Trauma",
    },
    feature3Subtitle: {
      type: "string",
      displayName: "Feature 3 Subtitle",
      defaultValue: "Restoring Souls in a Wounded Nation",
    },
    feature3Description: {
      type: "string",
      displayName: "Feature 3 Description",
      defaultValue: "GCMM's Christ-centred book brings healing through Psalm 23, expert guidance, and real-life stories created with Ukrainian Christian psychologists.",
    },
    feature3Image: {
      type: "imageUrl",
      displayName: "Feature 3 Image",
      defaultValue: "/healing-book-recovery.jpg",
    },
    feature3Link: {
      type: "string",
      displayName: "Feature 3 Link",
      defaultValue: "/trauma-recovery",
    },

    feature4Title: {
      type: "string",
      displayName: "Feature 4 Title",
      defaultValue: "Israel Jewish Ministry",
    },
    feature4Subtitle: {
      type: "string",
      displayName: "Feature 4 Subtitle",
      defaultValue: "Blessing Israel, Reaching the Jewish People",
    },
    feature4Description: {
      type: "string",
      displayName: "Feature 4 Description",
      defaultValue: "GCMM is committed to blessing Israel and the Jewish people through media outreach, humanitarian aid, and education.",
    },
    feature4Image: {
      type: "imageUrl",
      displayName: "Feature 4 Image",
      defaultValue: "/jerusalem-israel-ministry.jpg",
    },
    feature4Link: {
      type: "string",
      displayName: "Feature 4 Link",
      defaultValue: "/israel-ministry",
    },

    feature5Title: {
      type: "string",
      displayName: "Feature 5 Title",
      defaultValue: "Humanitarian Aid to Ukraine",
    },
    feature5Subtitle: {
      type: "string",
      displayName: "Feature 5 Subtitle",
      defaultValue: "Faith in Action: Serving Ukraine in Its Darkest Hour",
    },
    feature5Description: {
      type: "string",
      displayName: "Feature 5 Description",
      defaultValue: "In war-torn Ukraine, GCMM brings life-saving aid and the love of Christ, delivering essential supplies and working through local churches.",
    },
    feature5Image: {
      type: "imageUrl",
      displayName: "Feature 5 Image",
      defaultValue: "/humanitarian-aid-supplies.jpg",
    },
    feature5Link: {
      type: "string",
      displayName: "Feature 5 Link",
      defaultValue: "/ukraine-aid",
    },

    // Mega City Campaigns Section
    campaignsTitle: {
      type: "string",
      displayName: "Campaigns Title",
      defaultValue: "Mega City Campaigns",
    },
    campaignsDescription: {
      type: "string",
      displayName: "Campaigns Description",
      defaultValue: "Highly effective month-long evangelistic mega-city campaigns spear-headed by GCM Ministries have taken place in Russia, Central Asia, India, Nepal, the Middle East, Cuba, South America, and even Israel.",
    },
    campaignsImage: {
      type: "imageUrl",
      displayName: "Campaigns Image",
      defaultValue: "/placeholder.svg?height=400&width=600",
    },

    // Jewish Ministry Section
    jewishTitle: {
      type: "string",
      displayName: "Jewish Ministry Title",
      defaultValue: "Ministry to the Jewish People",
    },
    jewishSubtitle: {
      type: "string",
      displayName: "Jewish Ministry Subtitle",
      defaultValue: "Preaching the Gospel to the Jews is first and foremost",
    },
    jewishDescription1: {
      type: "string",
      displayName: "Jewish Description 1",
      defaultValue: "Each day of the year is a new opportunity that we want to use for the Kingdom of God.",
    },
    jewishDescription2: {
      type: "string",
      displayName: "Jewish Description 2",
      defaultValue: 'The Bible speaks of "hearing of wars and rumors of wars". This should not alarm us, but encourage us to preach the Gospel.',
    },
    jewishDescription3: {
      type: "string",
      displayName: "Jewish Description 3",
      defaultValue: "The GCMM Israel ministry department's main goal is to share the Gospel with Jews worldwide through media production.",
    },
    jewishImage: {
      type: "imageUrl",
      displayName: "Jewish Ministry Image",
      defaultValue: "/placeholder.svg?height=400&width=600",
    },

    // Children's Aid Section
    childrenTitle: {
      type: "string",
      displayName: "Children's Aid Title",
      defaultValue: "Poverty Aid to Children",
    },
    childrenDescription: {
      type: "string",
      displayName: "Children's Description",
      defaultValue: "GCM Ministries delivers clothing essentials, hygiene products, food, and the gospel message to children suffering in areas where evangelistic media campaigns are held.",
    },
    childrenImage: {
      type: "imageUrl",
      displayName: "Children's Aid Image",
      defaultValue: "/placeholder.svg?height=400&width=600",
    },

    // Islamic World Section
    islamicTitle: {
      type: "string",
      displayName: "Islamic Ministry Title",
      defaultValue: "The Arab and Islamic World",
    },
    islamicSubtitle: {
      type: "string",
      displayName: "Islamic Ministry Subtitle",
      defaultValue: "The Challenges of Reaching 1.4 Billion Muslims",
    },
    islamicDescription1: {
      type: "string",
      displayName: "Islamic Description 1",
      defaultValue: "There are about 1.4 billion Muslims in the World. That is approximately 21% of the world's population.",
    },
    islamicDescription2: {
      type: "string",
      displayName: "Islamic Description 2",
      defaultValue: "The largest Islamic area is located between the 10 and 40-degree parallels known as the 10/40 Window.",
    },
    islamicDescription3: {
      type: "string",
      displayName: "Islamic Description 3",
      defaultValue: "We want to facilitate disciple-making movements in every Arab and Muslim country for Gospel growth.",
    },
    islamicDescription4: {
      type: "string",
      displayName: "Islamic Description 4",
      defaultValue: "GCM Ministries uses all means possible including TV, Radio, Internet, and humanitarian aid to reach the Arab and Islamic world.",
    },
    islamicImage: {
      type: "imageUrl",
      displayName: "Islamic Ministry Image",
      defaultValue: "/placeholder.svg?height=400&width=600",
    },

    // Feature Card Styling
    featureCardBgColor: {
      type: "string",
      displayName: "Feature Card Background",
      defaultValue: "#ffffff",
    },
    featureCardBorderColor: {
      type: "string",
      displayName: "Feature Card Border",
      defaultValue: "#e5e7eb",
    },
    featureCardIconBgColor: {
      type: "string",
      displayName: "Feature Card Icon Background",
      defaultValue: "#f1f5f9",
    },
    featureCardIconColor: {
      type: "string",
      displayName: "Feature Card Icon Color",
      defaultValue: "#334155",
    },
    featureCardTitleColor: {
      type: "string",
      displayName: "Feature Card Title Color",
      defaultValue: "#0f172a",
    },
    featureCardSubtitleColor: {
      type: "string",
      displayName: "Feature Card Subtitle Color",
      defaultValue: "#475569",
    },
    featureCardDescriptionColor: {
      type: "string",
      displayName: "Feature Card Description Color",
      defaultValue: "#475569",
    },
    featureCardButtonBorderColor: {
      type: "string",
      displayName: "Feature Card Button Border",
      defaultValue: "#e5e7eb",
    },
    featureCardButtonTextColor: {
      type: "string",
      displayName: "Feature Card Button Text",
      defaultValue: "#000000",
    },
    featureCardButtonHoverBgColor: {
      type: "string",
      displayName: "Feature Card Button Hover Background",
      defaultValue: "#f9fafb",
    },
  },
  importPath: "./components/ministries-page",
});

// Register the Footer Section component
PLASMIC.registerComponent(FooterSection, {
  name: "FooterSection",
  displayName: "Footer Section",
  description: "A modern footer with social links and action buttons, fully customizable with hex colors",
  props: {
    // Content
    slogan: {
      type: "string",
      displayName: "Slogan",
      defaultValue: "All Nations. All Media. This Generation.",
      description: "The main slogan text",
    },
    copyrightText: {
      type: "string",
      displayName: "Copyright Text",
      defaultValue: "© 2025 Great Commission Media Ministries.",
      description: "The copyright text displayed in the bottom section",
    },
    charityText: {
      type: "string",
      displayName: "Charity Registration Text",
      defaultValue: "Canadian Registered Charity: 82864 9467 RR0001",
      description: "The charity registration information text",
    },
    giveButtonText: {
      type: "string",
      displayName: "Give Button Text",
      defaultValue: "GIVE NOW",
      description: "Text displayed on the Give button",
    },
    contactButtonText: {
      type: "string",
      displayName: "Contact Button Text",
      defaultValue: "CONTACT US",
      description: "Text displayed on the Contact Us button",
    },

    // Social Media Links
    facebookUrl: {
      type: "string",
      displayName: "Facebook URL",
      defaultValue: "https://facebook.com",
      description: "Link to Facebook page",
    },
    instagramUrl: {
      type: "string",
      displayName: "Instagram URL",
      defaultValue: "https://instagram.com",
      description: "Link to Instagram page",
    },
    youtubeUrl: {
      type: "string",
      displayName: "YouTube URL",
      defaultValue: "https://youtube.com",
      description: "Link to YouTube channel",
    },

    // Action Button Links
    giveUrl: {
      type: "string",
      displayName: "Give Button URL",
      defaultValue: "#",
      description: "Link for the Give button",
    },
    contactUrl: {
      type: "string",
      displayName: "Contact Button URL",
      defaultValue: "#",
      description: "Link for the Contact Us button",
    },

    // Designer Information
    designerName: {
      type: "string",
      displayName: "Designer Name",
      defaultValue: "Winston MacCabe.",
      description: "The designer's name (will be hyperlinked)",
    },
    designerUrl: {
      type: "string",
      displayName: "Designer URL",
      defaultValue: "https://winstonmaccabe.com",
      description: "URL to the designer's portfolio",
    },

    // Background Colors
    footerBackgroundColor: {
      type: "string",
      displayName: "Footer Background Color",
      defaultValue: "#1e293b",
      description: "Hex color for footer background (e.g., #1e293b, #1f2937)",
    },
    designerBackgroundColor: {
      type: "string",
      displayName: "Designer Section Background Color",
      defaultValue: "#000000",
      description: "Hex color for designer section background (e.g., #000000, #111827)",
    },

    // Text Colors
    sloganTextColor: {
      type: "string",
      displayName: "Slogan Text Color",
      defaultValue: "#facc15",
      description: "Hex color for slogan text (e.g., #facc15, #ffffff)",
    },
    copyrightTextColor: {
      type: "string",
      displayName: "Copyright Text Color",
      defaultValue: "#ffffff",
      description: "Hex color for copyright text (e.g., #ffffff, #d1d5db)",
    },
    charityTextColor: {
      type: "string",
      displayName: "Charity Text Color",
      defaultValue: "#ffffff",
      description: "Hex color for charity registration text (e.g., #ffffff, #d1d5db)",
    },
    designerTextColor: {
      type: "string",
      displayName: "Designer Text Color",
      defaultValue: "#ffffff",
      description: "Hex color for designer section text (e.g., #ffffff, #d1d5db)",
    },

    // Social Icon Colors
    socialIconColor: {
      type: "string",
      displayName: "Social Icon Color",
      defaultValue: "#ffffff",
      description: "Hex color for social media icons (e.g., #ffffff, #d1d5db)",
    },
    socialIconHoverColor: {
      type: "string",
      displayName: "Social Icon Hover Color",
      defaultValue: "#facc15",
      description: "Hex color for social media icons on hover (e.g., #facc15, #3b82f6)",
    },
    socialIconSize: {
      type: "number",
      displayName: "Social Icon Size",
      defaultValue: 24,
      description: "Size of social media icons in pixels (e.g., 20, 24, 28)",
    },

    // Give Button Colors
    giveButtonBackgroundColor: {
      type: "string",
      displayName: "Give Button Background Color",
      defaultValue: "#ca8a04",
      description: "Hex color for give button background (e.g., #ca8a04, #eab308)",
    },
    giveButtonHoverBackgroundColor: {
      type: "string",
      displayName: "Give Button Hover Background Color",
      defaultValue: "#a16207",
      description: "Hex color for give button background on hover (e.g., #a16207, #ca8a04)",
    },
    giveButtonTextColor: {
      type: "string",
      displayName: "Give Button Text Color",
      defaultValue: "#000000",
      description: "Hex color for give button text (e.g., #000000, #ffffff)",
    },

    // Contact Button Colors
    contactButtonBorderColor: {
      type: "string",
      displayName: "Contact Button Border Color",
      defaultValue: "#ffffff",
      description: "Hex color for contact button border (e.g., #ffffff, #d1d5db)",
    },
    contactButtonTextColor: {
      type: "string",
      displayName: "Contact Button Text Color",
      defaultValue: "#ffffff",
      description: "Hex color for contact button text (e.g., #ffffff, #d1d5db)",
    },
    contactButtonHoverBackgroundColor: {
      type: "string",
      displayName: "Contact Button Hover Background Color",
      defaultValue: "#ffffff",
      description: "Hex color for contact button background on hover (e.g., #ffffff, #f3f4f6)",
    },
    contactButtonHoverTextColor: {
      type: "string",
      displayName: "Contact Button Hover Text Color",
      defaultValue: "#1e293b",
      description: "Hex color for contact button text on hover (e.g., #1e293b, #000000)",
    },

    // Designer Link Colors
    designerLinkColor: {
      type: "string",
      displayName: "Designer Link Color",
      defaultValue: "#facc15",
      description: "Hex color for designer link (e.g., #facc15, #3b82f6)",
    },
    designerLinkHoverColor: {
      type: "string",
      displayName: "Designer Link Hover Color",
      defaultValue: "#fde047",
      description: "Hex color for designer link on hover (e.g., #fde047, #60a5fa)",
    },

    // Divider Colors
    dividerColor: {
      type: "string",
      displayName: "Divider Color",
      defaultValue: "#4b5563",
      description: "Hex color for horizontal divider line (e.g., #4b5563, #374151)",
    },
    separatorColor: {
      type: "string",
      displayName: "Separator Color",
      defaultValue: "#9ca3af",
      description: "Hex color for text separator (e.g., #9ca3af, #6b7280)",
    },

    // Spacing Controls
    mainFooterPaddingY: {
      type: "string",
      displayName: "Main Footer Vertical Padding",
      defaultValue: "24px",
      description: "Vertical padding for main footer section (e.g., 16px, 24px, 32px)",
    },
    socialIconGap: {
      type: "string",
      displayName: "Social Icon Gap",
      defaultValue: "32px",
      description: "Gap between social media icons (e.g., 24px, 32px, 40px)",
    },
    buttonGap: {
      type: "string",
      displayName: "Button Gap",
      defaultValue: "16px",
      description: "Gap between action buttons (e.g., 12px, 16px, 20px)",
    },
    copyrightSectionPaddingY: {
      type: "string",
      displayName: "Copyright Section Vertical Padding",
      defaultValue: "16px",
      description: "Vertical padding for copyright section (e.g., 12px, 16px, 20px)",
    },
    designerSectionPaddingY: {
      type: "string",
      displayName: "Designer Section Vertical Padding",
      defaultValue: "8px",
      description: "Vertical padding for designer section (e.g., 6px, 8px, 12px)",
    },
  },
  importPath: "./components/footer-section",
});



PLASMIC.registerComponent(ModernNewsSection, {
  name: "ModernNewsSection",
  displayName: "Modern News Section",
  description: "A modern news section with fully customizable articles and styling",
  props: {
    className: {
      type: "string",
      displayName: "Class Name",
      description: "Additional CSS classes",
    },

    // Section Content
    sectionTitle: {
      type: "string",
      displayName: "Section Title",
      defaultValue: "The latest",
    },
    sectionSubtitle: {
      type: "string",
      displayName: "Section Subtitle",
      defaultValue: "News & Articles",
    },
    description: {
      type: "string",
      displayName: "Description",
      defaultValue: "Stay updated with our latest stories and insights from around the world.",
    },

    // Colors
    backgroundColor: {
      type: "string",
      displayName: "Background Color",
      defaultValue: "#eff6ff",
    },
    titleColor: {
      type: "string",
      displayName: "Title Color",
      defaultValue: "#6b7280",
    },
    subtitleColor: {
      type: "string",
      displayName: "Subtitle Color",
      defaultValue: "#2563eb",
    },
    descriptionColor: {
      type: "string",
      displayName: "Description Color",
      defaultValue: "#4b5563",
    },
    cardBackgroundColor: {
      type: "string",
      displayName: "Card Background Color",
      defaultValue: "#ffffff",
    },
    cardBorderColor: {
      type: "string",
      displayName: "Card Border Color",
      defaultValue: "#f3f4f6",
    },
    cardHoverBorderColor: {
      type: "string",
      displayName: "Card Hover Border Color",
      defaultValue: "#e5e7eb",
    },
    titleTextColor: {
      type: "string",
      displayName: "Article Title Color",
      defaultValue: "#111827",
    },
    titleHoverColor: {
      type: "string",
      displayName: "Article Title Hover Color",
      defaultValue: "#2563eb",
    },
    excerptColor: {
      type: "string",
      displayName: "Excerpt Color",
      defaultValue: "#4b5563",
    },
    metaColor: {
      type: "string",
      displayName: "Meta Info Color",
      defaultValue: "#6b7280",
    },
    metaHoverColor: {
      type: "string",
      displayName: "Meta Info Hover Color",
      defaultValue: "#2563eb",
    },
    categoryBadgeBackground: {
      type: "string",
      displayName: "Category Badge Background",
      defaultValue: "#ffffff",
    },
    categoryBadgeText: {
      type: "string",
      displayName: "Category Badge Text Color",
      defaultValue: "#374151",
    },
    readMoreColor: {
      type: "string",
      displayName: "Read More Link Color",
      defaultValue: "#2563eb",
    },
    readMoreHoverColor: {
      type: "string",
      displayName: "Read More Hover Color",
      defaultValue: "#1d4ed8",
    },
    buttonGradientFrom: {
      type: "string",
      displayName: "Button Gradient From",
      defaultValue: "#2563eb",
    },
    buttonGradientTo: {
      type: "string",
      displayName: "Button Gradient To",
      defaultValue: "#1e293b",
    },
    buttonHoverGradientFrom: {
      type: "string",
      displayName: "Button Hover Gradient From",
      defaultValue: "#1d4ed8",
    },
    buttonHoverGradientTo: {
      type: "string",
      displayName: "Button Hover Gradient To",
      defaultValue: "#7c3aed",
    },

    // Spacing
    sectionPaddingY: {
      type: "string",
      displayName: "Section Padding Y",
      defaultValue: "96px",
    },
    cardGap: {
      type: "string",
      displayName: "Card Gap",
      defaultValue: "40px",
    },
    headerMarginBottom: {
      type: "string",
      displayName: "Header Margin Bottom",
      defaultValue: "64px",
    },

    // Article 1
    showArticle1: {
      type: "boolean",
      displayName: "Show Article 1",
      defaultValue: true,
    },
    article1Image: {
      type: "imageUrl",
      displayName: "Article 1 Image",
      defaultValue: "/placeholder.svg?height=300&width=400",
      hidden: (props: any) => !props.showArticle1,
    },
    article1Title: {
      type: "string",
      displayName: "Article 1 Title",
      defaultValue: "Restoring Souls in a Wounded Nation",
      hidden: (props: any) => !props.showArticle1,
    },
    article1Excerpt: {
      type: "string",
      displayName: "Article 1 Excerpt",
      defaultValue: "Discover how communities are finding hope and healing through faith-based initiatives.",
      hidden: (props: any) => !props.showArticle1,
    },
    article1Date: {
      type: "string",
      displayName: "Article 1 Date",
      defaultValue: "Dec 15, 2024",
      hidden: (props: any) => !props.showArticle1,
    },
    article1ReadTime: {
      type: "string",
      displayName: "Article 1 Read Time",
      defaultValue: "5 min read",
      hidden: (props: any) => !props.showArticle1,
    },
    article1Category: {
      type: "string",
      displayName: "Article 1 Category",
      defaultValue: "Ministry",
      hidden: (props: any) => !props.showArticle1,
    },
    article1Url: {
      type: "string",
      displayName: "Article 1 URL",
      defaultValue: "/articles/restoring-souls-wounded-nation",
      hidden: (props: any) => !props.showArticle1,
    },

    // Article 2
    showArticle2: {
      type: "boolean",
      displayName: "Show Article 2",
      defaultValue: true,
    },
    article2Image: {
      type: "imageUrl",
      displayName: "Article 2 Image",
      defaultValue: "/placeholder.svg?height=300&width=400",
      hidden: (props: any) => !props.showArticle2,
    },
    article2Title: {
      type: "string",
      displayName: "Article 2 Title",
      defaultValue: "When a heart remains with the Maithili people",
      hidden: (props: any) => !props.showArticle2,
    },
    article2Excerpt: {
      type: "string",
      displayName: "Article 2 Excerpt",
      defaultValue: "A touching story of dedication and service among the Maithili community.",
      hidden: (props: any) => !props.showArticle2,
    },
    article2Date: {
      type: "string",
      displayName: "Article 2 Date",
      defaultValue: "Dec 12, 2024",
      hidden: (props: any) => !props.showArticle2,
    },
    article2ReadTime: {
      type: "string",
      displayName: "Article 2 Read Time",
      defaultValue: "7 min read",
      hidden: (props: any) => !props.showArticle2,
    },
    article2Category: {
      type: "string",
      displayName: "Article 2 Category",
      defaultValue: "Missions",
      hidden: (props: any) => !props.showArticle2,
    },
    article2Url: {
      type: "string",
      displayName: "Article 2 URL",
      defaultValue: "/articles/heart-remains-maithili-people",
      hidden: (props: any) => !props.showArticle2,
    },

    // Article 3
    showArticle3: {
      type: "boolean",
      displayName: "Show Article 3",
      defaultValue: true,
    },
    article3Image: {
      type: "imageUrl",
      displayName: "Article 3 Image",
      defaultValue: "/placeholder.svg?height=300&width=400",
      hidden: (props: any) => !props.showArticle3,
    },
    article3Title: {
      type: "string",
      displayName: "Article 3 Title",
      defaultValue: "God is doing something new in Egypt",
      hidden: (props: any) => !props.showArticle3,
    },
    article3Excerpt: {
      type: "string",
      displayName: "Article 3 Excerpt",
      defaultValue: "Witnessing transformation and renewal in the heart of the Middle East.",
      hidden: (props: any) => !props.showArticle3,
    },
    article3Date: {
      type: "string",
      displayName: "Article 3 Date",
      defaultValue: "Dec 10, 2024",
      hidden: (props: any) => !props.showArticle3,
    },
    article3ReadTime: {
      type: "string",
      displayName: "Article 3 Read Time",
      defaultValue: "6 min read",
      hidden: (props: any) => !props.showArticle3,
    },
    article3Category: {
      type: "string",
      displayName: "Article 3 Category",
      defaultValue: "Global",
      hidden: (props: any) => !props.showArticle3,
    },
    article3Url: {
      type: "string",
      displayName: "Article 3 URL",
      defaultValue: "/articles/god-doing-something-new-egypt",
      hidden: (props: any) => !props.showArticle3,
    },

    // Article 4
    showArticle4: {
      type: "boolean",
      displayName: "Show Article 4",
      defaultValue: true,
    },
    article4Image: {
      type: "imageUrl",
      displayName: "Article 4 Image",
      defaultValue: "/placeholder.svg?height=300&width=400",
      hidden: (props: any) => !props.showArticle4,
    },
    article4Title: {
      type: "string",
      displayName: "Article 4 Title",
      defaultValue: "War Does Not Stop the Gospel",
      hidden: (props: any) => !props.showArticle4,
    },
    article4Excerpt: {
      type: "string",
      displayName: "Article 4 Excerpt",
      defaultValue: "How faith continues to flourish even in the midst of conflict and uncertainty.",
      hidden: (props: any) => !props.showArticle4,
    },
    article4Date: {
      type: "string",
      displayName: "Article 4 Date",
      defaultValue: "Dec 8, 2024",
      hidden: (props: any) => !props.showArticle4,
    },
    article4ReadTime: {
      type: "string",
      displayName: "Article 4 Read Time",
      defaultValue: "8 min read",
      hidden: (props: any) => !props.showArticle4,
    },
    article4Category: {
      type: "string",
      displayName: "Article 4 Category",
      defaultValue: "Testimony",
      hidden: (props: any) => !props.showArticle4,
    },
    article4Url: {
      type: "string",
      displayName: "Article 4 URL",
      defaultValue: "/articles/war-does-not-stop-gospel",
      hidden: (props: any) => !props.showArticle4,
    },

    // Article 5
    showArticle5: {
      type: "boolean",
      displayName: "Show Article 5",
      defaultValue: true,
    },
    article5Image: {
      type: "imageUrl",
      displayName: "Article 5 Image",
      defaultValue: "/placeholder.svg?height=300&width=400",
      hidden: (props: any) => !props.showArticle5,
    },
    article5Title: {
      type: "string",
      displayName: "Article 5 Title",
      defaultValue: "Encounters with the Messiah in Israel",
      hidden: (props: any) => !props.showArticle5,
    },
    article5Excerpt: {
      type: "string",
      displayName: "Article 5 Excerpt",
      defaultValue: "Personal stories of spiritual encounters in the Holy Land.",
      hidden: (props: any) => !props.showArticle5,
    },
    article5Date: {
      type: "string",
      displayName: "Article 5 Date",
      defaultValue: "Dec 5, 2024",
      hidden: (props: any) => !props.showArticle5,
    },
    article5ReadTime: {
      type: "string",
      displayName: "Article 5 Read Time",
      defaultValue: "4 min read",
      hidden: (props: any) => !props.showArticle5,
    },
    article5Category: {
      type: "string",
      displayName: "Article 5 Category",
      defaultValue: "Israel",
      hidden: (props: any) => !props.showArticle5,
    },
    article5Url: {
      type: "string",
      displayName: "Article 5 URL",
      defaultValue: "/articles/encounters-messiah-israel",
      hidden: (props: any) => !props.showArticle5,
    },

    // Article 6
    showArticle6: {
      type: "boolean",
      displayName: "Show Article 6",
      defaultValue: true,
    },
    article6Image: {
      type: "imageUrl",
      displayName: "Article 6 Image",
      defaultValue: "/placeholder.svg?height=300&width=400",
      hidden: (props: any) => !props.showArticle6,
    },
    article6Title: {
      type: "string",
      displayName: "Article 6 Title",
      defaultValue: "See the impact of THE GOSPEL IN MONGOLIA",
      hidden: (props: any) => !props.showArticle6,
    },
    article6Excerpt: {
      type: "string",
      displayName: "Article 6 Excerpt",
      defaultValue: "Exploring the growing influence of faith in Mongolia's remote communities.",
      hidden: (props: any) => !props.showArticle6,
    },
    article6Date: {
      type: "string",
      displayName: "Article 6 Date",
      defaultValue: "Dec 3, 2024",
      hidden: (props: any) => !props.showArticle6,
    },
    article6ReadTime: {
      type: "string",
      displayName: "Article 6 Read Time",
      defaultValue: "9 min read",
      hidden: (props: any) => !props.showArticle6,
    },
    article6Category: {
      type: "string",
      displayName: "Article 6 Category",
      defaultValue: "Asia",
      hidden: (props: any) => !props.showArticle6,
    },
    article6Url: {
      type: "string",
      displayName: "Article 6 URL",
      defaultValue: "/articles/gospel-impact-mongolia",
      hidden: (props: any) => !props.showArticle6,
    },

    // View All Button
    showViewAllButton: {
      type: "boolean",
      displayName: "Show View All Button",
      defaultValue: true,
    },
    viewAllUrl: {
      type: "string",
      displayName: "View All URL",
      defaultValue: "/news",
      hidden: (props: any) => !props.showViewAllButton,
    },
    viewAllText: {
      type: "string",
      displayName: "View All Button Text",
      defaultValue: "View All Articles",
      hidden: (props: any) => !props.showViewAllButton,
    },
    viewAllButtonTextColor: {
      type: "string",
      displayName: "View All Button Text Color",
      defaultValue: "#ffffff",
      hidden: (props: any) => !props.showViewAllButton,
    },
    viewAllButtonBackgroundColor: {
      type: "string",
      displayName: "View All Button Background",
      defaultValue: "#2563eb",
      hidden: (props: any) => !props.showViewAllButton,
    },
    viewAllButtonHoverBackgroundColor: {
      type: "string",
      displayName: "View All Button Hover Background",
      defaultValue: "#1d4ed8",
      hidden: (props: any) => !props.showViewAllButton,
    },
  },
  importPath: "./components/modern-news-section",
});


PLASMIC.registerComponent(OurVisionSection, {
  name: "OurVisionSection",
  displayName: "Our Vision Section",
  description:
    "A professional vision section with scroll animations, intro video, and mission content - fully customizable",
  props: {
    // Section Header
    sectionTitle: {
      type: "string",
      displayName: "Section Title",
      defaultValue: "What is Great Commission Media Ministries?",
      description: "The main section title",
    },
    sectionTitleFontWeight: {
      type: "choice",
      displayName: "Section Title Font Weight",
      options: ["light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      defaultValue: "light",
      description: "Font weight for the main section title",
    },
    sectionTitleColor: {
      type: "color",
      displayName: "Section Title Color",
      defaultValue: "#6b7280",
      description: "Solid color of the main section title (used when gradient is disabled)",
    },
    useGradientForTitle: {
      type: "boolean",
      displayName: "Use Gradient for Title",
      defaultValue: false,
      description: "Enable gradient coloring for the section title",
    },
    sectionTitleColorFrom: {
      type: "color",
      displayName: "Section Title Gradient Start",
      defaultValue: "#2563eb",
      description: "Starting color of the section title gradient (only used when gradient is enabled)",
    },
    sectionTitleColorTo: {
      type: "color",
      displayName: "Section Title Gradient End",
      defaultValue: "#1e293b",
      description: "Ending color of the section title gradient (only used when gradient is enabled)",
    },
    sectionSubtitle: {
      type: "string",
      displayName: "Section Subtitle",
      defaultValue: "",
      description: "Optional subtitle shown under the main title",
    },
    sectionSubtitleFontWeight: {
      type: "choice",
      displayName: "Section Subtitle Font Weight",
      options: ["light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      defaultValue: "black",
      description: "Font weight for the section subtitle",
    },
    subtitleColorFrom: {
      type: "color",
      displayName: "Subtitle Gradient Start",
      defaultValue: "#2563eb",
      description: "Starting color of the subtitle gradient",
    },
    subtitleColorTo: {
      type: "color",
      displayName: "Subtitle Gradient End",
      defaultValue: "#1e293b",
      description: "Ending color of the subtitle gradient",
    },
    useGradientForSubtitle: {
      type: "boolean",
      displayName: "Use Gradient for Subtitle",
      defaultValue: true,
      description: "Enable gradient coloring for the subtitle (when disabled, uses Subtitle Gradient Start as solid color)",
    },
    backgroundColor: {
      type: "color",
      displayName: "Section Background Color",
      defaultValue: "#eff6ff",
      description: "Background color of the entire section",
    },

    // Intro Section
    introLabel: {
      type: "string",
      displayName: "Intro Label",
      defaultValue: "Who We Are",
      description: "Small label above the intro heading",
    },
    introLabelColor: {
      type: "color",
      displayName: "Intro Label Color",
      defaultValue: "#6b7280",
      description: "Color of the intro label",
    },
    introHeading: {
      type: "string",
      displayName: "Intro Heading",
      defaultValue: "Great Commission Media Ministries",
      description: "Main heading in the intro block",
    },
    introHeadingColor: {
      type: "color",
      displayName: "Intro Heading Color",
      defaultValue: "#111827",
      description: "Color of the intro heading",
    },
    introHeadingFontWeight: {
      type: "choice",
      displayName: "Intro Heading Font Weight",
      options: ["light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      defaultValue: "black",
      description: "Font weight for intro heading",
    },
    introText: {
      type: "string",
      displayName: "Intro Text",
      defaultValue:
        "Great Commission Media Ministries uses high‑impact media campaigns to share the message of Jesus in major cities around the world, partnering with local churches to follow up with those who respond.",
      description: "Body text in the intro block",
    },
    introTextColor: {
      type: "color",
      displayName: "Intro Text Color",
      defaultValue: "#4b5563",
      description: "Color of the intro body text",
    },
    introVideoThumbnail: {
      type: "imageUrl",
      displayName: "Intro Video Thumbnail",
      defaultValue: "/images/gcm-intro-thumbnail.jpg",
      description: "Image used as the video thumbnail",
    },
    introVideoUrl: {
      type: "string",
      displayName: "Intro Video URL",
      defaultValue: "https://vimeo.com/XXXXXXXX",
      description: "Video URL — supports Vimeo (https://vimeo.com/123456) and YouTube (https://youtube.com/watch?v=... or https://youtu.be/...)",
    },

    // Learn More Button
    learnMoreText: {
      type: "string",
      displayName: "Learn More Button Text",
      defaultValue: "Learn more",
      description: "Text for the learn more link",
    },
    learnMoreColor: {
      type: "color",
      displayName: "Learn More Color",
      defaultValue: "#1d4ed8",
      description: "Color of the learn more link",
    },
    learnMoreHoverColor: {
      type: "color",
      displayName: "Learn More Hover Color",
      defaultValue: "#1e40af",
      description: "Hover color of the learn more link",
    },
    learnMoreUrl: {
      type: "string",
      displayName: "Learn More URL",
      defaultValue: "/about",
      description: "URL for the learn more link",
    },

    // Play Button
    playButtonColor: {
      type: "color",
      displayName: "Play Button Color",
      defaultValue: "#1d4ed8",
      description: "Color of the play button triangle",
    },
    playButtonBackgroundColor: {
      type: "color",
      displayName: "Play Button Background",
      defaultValue: "#ffffff",
      description: "Background color of the play button circle",
    },

    // Cards
    cardBackgroundColor: {
      type: "color",
      displayName: "Card Background Color",
      defaultValue: "#ffffff",
      description: "Background color of all cards",
    },
    cardBorderColor: {
      type: "color",
      displayName: "Card Border Color",
      defaultValue: "#f3f4f6",
      description: "Border color of cards",
    },
    cardHoverBorderColor: {
      type: "color",
      displayName: "Card Hover Border Color",
      defaultValue: "#bfdbfe",
      description: "Border color when hovering over cards",
    },

    // Mission Card
    missionTitle: {
      type: "string",
      displayName: "Mission Title",
      defaultValue: "Our Purpose",
      description: "Title for the mission card",
    },
    missionTitleColor: {
      type: "color",
      displayName: "Mission Title Color",
      defaultValue: "#111827",
      description: "Color of the mission title",
    },
    missionTitleFontWeight: {
      type: "choice",
      displayName: "Mission Title Font Weight",
      options: ["light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      defaultValue: "black",
      description: "Font weight for mission title",
    },
    missionText: {
      type: "string",
      displayName: "Mission Text",
      defaultValue:
        "The purpose of Great Commission Media Ministries is to conduct high-impact Mega City Media Saturation Campaigns in cities with the message that God gives the power to change.",
      description: "The mission statement text",
    },
    missionTextColor: {
      type: "color",
      displayName: "Mission Text Color",
      defaultValue: "#4b5563",
      description: "Color of the mission text",
    },
    missionDotColorFrom: {
      type: "color",
      displayName: "Mission Dot Gradient Start",
      defaultValue: "#2563eb",
      description: "Starting color of the mission dot gradient",
    },
    missionDotColorTo: {
      type: "color",
      displayName: "Mission Dot Gradient End",
      defaultValue: "#1e293b",
      description: "Ending color of the mission dot gradient",
    },
    missionLineColorFrom: {
      type: "color",
      displayName: "Mission Line Gradient Start",
      defaultValue: "#2563eb",
      description: "Starting color of the mission line gradient",
    },
    missionLineColorTo: {
      type: "color",
      displayName: "Mission Line Gradient End",
      defaultValue: "#1e293b",
      description: "Ending color of the mission line gradient",
    },

    // Passion Card
    passionTitle: {
      type: "string",
      displayName: "Passion Title",
      defaultValue: "Our Passion",
      description: "Title for the passion card",
    },
    passionTitleColor: {
      type: "color",
      displayName: "Passion Title Color",
      defaultValue: "#111827",
      description: "Color of the passion title",
    },
    passionTitleFontWeight: {
      type: "choice",
      displayName: "Passion Title Font Weight",
      options: ["light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      defaultValue: "black",
      description: "Font weight for passion title",
    },
    passionText: {
      type: "string",
      displayName: "Passion Text",
      defaultValue:
        "Partnering together with local indigenous churches to lift up Jesus in cities so everyone has the opportunity to respond resulting in changed lives.",
      description: "The passion statement text",
    },
    passionTextColor: {
      type: "color",
      displayName: "Passion Text Color",
      defaultValue: "#4b5563",
      description: "Color of the passion text",
    },
    passionDotColorFrom: {
      type: "color",
      displayName: "Passion Dot Gradient Start",
      defaultValue: "#2563eb",
      description: "Starting color of the passion dot gradient",
    },
    passionDotColorTo: {
      type: "color",
      displayName: "Passion Dot Gradient End",
      defaultValue: "#1e293b",
      description: "Ending color of the passion dot gradient",
    },
    passionLineColorFrom: {
      type: "color",
      displayName: "Passion Line Gradient Start",
      defaultValue: "#2563eb",
      description: "Starting color of the passion line gradient",
    },
    passionLineColorTo: {
      type: "color",
      displayName: "Passion Line Gradient End",
      defaultValue: "#1e293b",
      description: "Ending color of the passion line gradient",
    },

    // Bottom Quote
    showBottomQuote: {
      type: "boolean",
      displayName: "Show Bottom Quote",
      defaultValue: true,
      description: "Toggle to show or hide the bottom quote section",
    },
    bottomQuote: {
      type: "string",
      displayName: "Bottom Quote (Editable)",
      defaultValue: "Transforming cities, one heart at a time, through the power of media and the message of hope.",
      description: "The inspirational quote at the bottom - FULLY EDITABLE",
    },
    bottomQuoteColor: {
      type: "color",
      displayName: "Bottom Quote Color",
      defaultValue: "#374151",
      description: "Color of the bottom quote text",
    },
    bottomQuoteBackgroundColor: {
      type: "color",
      displayName: "Bottom Quote Background",
      defaultValue: "#ffffff",
      description: "Background color of the quote box",
    },
    bottomQuoteLineColorFrom: {
      type: "color",
      displayName: "Bottom Quote Line Gradient Start",
      defaultValue: "#2563eb",
      description: "Starting color of the quote line gradient",
    },
    bottomQuoteLineColorTo: {
      type: "color",
      displayName: "Bottom Quote Line Gradient End",
      defaultValue: "#1e293b",
      description: "Ending color of the quote line gradient",
    },
  },
  importPath: "./our-vision-section",
});

PLASMIC.registerComponent(MissionMapPage, {
  name: "MissionMapPage",
  displayName: "Mission Map Page",
  description:
    "An interactive world map showing countries where GCM Ministries operates with GPS pointer markers representing different ministry types. Features editable legend colors and names, visibility controls, and support for multiple ministry types per country.",
  props: {
    // Header content
    title: {
      type: "string",
      displayName: "Title",
      defaultValue: "The world is our mission field.",
      description: "Main title displayed above the map",
    },
    subtitle: {
      type: "string",
      displayName: "Subtitle",
      defaultValue: "Explore countries where our mission work is active and learn about the communities we serve around the globe.",
      description: "Description text below the title",
    },

    // Title color
    titleColor: {
      type: "color",
      displayName: "Title Color",
      defaultValue: "#ffffff",
      description: "Solid color for the title text (used when gradient is disabled)",
    },
    useTitleGradient: {
      type: "boolean",
      displayName: "Use Gradient",
      defaultValue: false,
      description: "Toggle between gradient text and solid color for the title",
    },
    titleGradientFrom: {
      type: "color",
      displayName: "Gradient Start Color",
      defaultValue: "#2563eb",
      description: "Start color for the title gradient (left/top)",
      hidden: (props: any) => !props.useTitleGradient,
    },
    titleGradientTo: {
      type: "color",
      displayName: "Gradient End Color",
      defaultValue: "#1e293b",
      description: "End color for the title gradient (right/bottom)",
      hidden: (props: any) => !props.useTitleGradient,
    },

    // City data (cities within countries for multiple ministry pins)
    cityDataJson: {
      type: "string",
      displayName: "City Data (JSON)",
      defaultValue: "",
      description:
        'JSON string overriding city-level pins. Format: {"countryId": [{"name":"City","coordinates":[lng,lat],"ministryType":"type"}]}. Leave empty for defaults.',
    },

    // Map styling
    backgroundColor: {
      type: "string",
      displayName: "Background Color",
      defaultValue: "transparent",
      description: "Background color of the map",
    },
    mapBackgroundColor: {
      type: "string",
      displayName: "Map Background Color",
      defaultValue: "#0f172a",
      description: "Background color for the map container",
    },
    mapLandColor: {
      type: "string",
      displayName: "Map Land Color",
      defaultValue: "#1e293b",
      description: "Fill color for countries on the map",
    },
    mapBorderColor: {
      type: "string",
      displayName: "Map Border Color",
      defaultValue: "#475569",
      description: "Border color for countries on the map",
    },
    textColor: {
      type: "string",
      displayName: "Text Color",
      defaultValue: "#ffffff",
      description: "Color for text elements such as title and description",
    },

    // Ministry Type 1: Multiple Ministries
    multipleministriesColor: {
      type: "string",
      displayName: "Multiple Ministries Color",
      defaultValue: "#2e7d32",
      description: "Hex color for Multiple Ministries pins",
    },
    multipleministriesName: {
      type: "string",
      displayName: "Multiple Ministries Name",
      defaultValue: "Multiple Ministries",
      description: "Custom name for Multiple Ministries type",
    },
    showMultipleMinistries: {
      type: "boolean",
      displayName: "Show Multiple Ministries",
      defaultValue: true,
      description: "Show or hide Multiple Ministries pins on the map",
    },
    multipleministriesUrl: {
      type: "string",
      displayName: "Multiple Ministries URL",
      defaultValue: "",
      description: "URL link for Multiple Ministries legend item (optional)",
    },

    // Ministry Type 2: Mega City Media Campaign
    megaCityMediaCampaignColor: {
      type: "string",
      displayName: "Mega City Media Campaign Color",
      defaultValue: "#0a6c93",
      description: "Hex color for Mega City Media Campaign pins",
    },
    megaCityMediaCampaignName: {
      type: "string",
      displayName: "Mega City Media Campaign Name",
      defaultValue: "Mega City Media Campaign",
      description: "Custom name for Mega City Media Campaign type",
    },
    showMegaCityMediaCampaign: {
      type: "boolean",
      displayName: "Show Mega City Media Campaign",
      defaultValue: true,
      description: "Show or hide Mega City Media Campaign pins on the map",
    },
    megaCityMediaCampaignUrl: {
      type: "string",
      displayName: "Mega City Media Campaign URL",
      defaultValue: "",
      description: "URL link for Mega City Media Campaign legend item (optional)",
    },

    // Ministry Type 3: 10/40 Window Media Outreach
    window1040MediaOutreachColor: {
      type: "string",
      displayName: "10/40 Window Media Outreach Color",
      defaultValue: "#4b2c63",
      description: "Hex color for 10/40 Window Media Outreach pins",
    },
    window1040MediaOutreachName: {
      type: "string",
      displayName: "10/40 Window Media Outreach Name",
      defaultValue: "10/40 Window Media Outreach",
      description: "Custom name for 10/40 Window Media Outreach type",
    },
    showWindow1040MediaOutreach: {
      type: "boolean",
      displayName: "Show 10/40 Window Media Outreach",
      defaultValue: true,
      description: "Show or hide 10/40 Window Media Outreach pins on the map",
    },
    window1040MediaOutreachUrl: {
      type: "string",
      displayName: "10/40 Window Media Outreach URL",
      defaultValue: "",
      description: "URL link for 10/40 Window Media Outreach legend item (optional)",
    },

    // Ministry Type 4: Ukraine Aid
    ukraineAidColor: {
      type: "string",
      displayName: "Ukraine Aid Color",
      defaultValue: "#f1a100",
      description: "Hex color for Ukraine Aid pins",
    },
    ukraineAidName: {
      type: "string",
      displayName: "Ukraine Aid Name",
      defaultValue: "Ukraine Aid",
      description: "Custom name for Ukraine Aid type",
    },
    showUkraineAid: {
      type: "boolean",
      displayName: "Show Ukraine Aid",
      defaultValue: true,
      description: "Show or hide Ukraine Aid pins on the map",
    },
    ukraineAidUrl: {
      type: "string",
      displayName: "Ukraine Aid URL",
      defaultValue: "",
      description: "URL link for Ukraine Aid legend item (optional)",
    },

    // Ministry Type 5: Trauma Recovery
    traumaRecoveryColor: {
      type: "string",
      displayName: "Trauma Recovery Color",
      defaultValue: "#b51625",
      description: "Hex color for Trauma Recovery pins",
    },
    traumaRecoveryName: {
      type: "string",
      displayName: "Trauma Recovery Name",
      defaultValue: "Trauma Recovery",
      description: "Custom name for Trauma Recovery type",
    },
    showTraumaRecovery: {
      type: "boolean",
      displayName: "Show Trauma Recovery",
      defaultValue: true,
      description: "Show or hide Trauma Recovery pins on the map",
    },
    traumaRecoveryUrl: {
      type: "string",
      displayName: "Trauma Recovery URL",
      defaultValue: "",
      description: "URL link for Trauma Recovery legend item (optional)",
    },

    // Ministry Type 6: Jewish Ministry
    jewishMinistryColor: {
      type: "string",
      displayName: "Jewish Ministry Color",
      defaultValue: "#0f006f",
      description: "Hex color for Jewish Ministry pins",
    },
    jewishMinistryName: {
      type: "string",
      displayName: "Jewish Ministry Name",
      defaultValue: "Jewish Ministry",
      description: "Custom name for Jewish Ministry type",
    },
    showJewishMinistry: {
      type: "boolean",
      displayName: "Show Jewish Ministry",
      defaultValue: true,
      description: "Show or hide Jewish Ministry pins on the map",
    },
    jewishMinistryUrl: {
      type: "string",
      displayName: "Jewish Ministry URL",
      defaultValue: "",
      description: "URL link for Jewish Ministry legend item (optional)",
    },

    // Ministry Type 7: Social Media Outreach
    socialMediaOutreachColor: {
      type: "string",
      displayName: "Social Media Outreach Color",
      defaultValue: "#ba0273",
      description: "Hex color for Social Media Outreach pins",
    },
    socialMediaOutreachName: {
      type: "string",
      displayName: "Social Media Outreach Name",
      defaultValue: "Social Media Outreach",
      description: "Custom name for Social Media Outreach type",
    },
    showSocialMediaOutreach: {
      type: "boolean",
      displayName: "Show Social Media Outreach",
      defaultValue: true,
      description: "Show or hide Social Media Outreach pins on the map",
    },
    socialMediaOutreachUrl: {
      type: "string",
      displayName: "Social Media Outreach URL",
      defaultValue: "",
      description: "URL link for Social Media Outreach legend item (optional)",
    },

    // Ministry Type 8: Media Outreach
    mediaOutreachColor: {
      type: "string",
      displayName: "Media Outreach Color",
      defaultValue: "#d32f2f",
      description: "Hex color for Media Outreach pins",
    },
    mediaOutreachName: {
      type: "string",
      displayName: "Media Outreach Name",
      defaultValue: "Media Outreach",
      description: "Custom name for Media Outreach type",
    },
    showMediaOutreach: {
      type: "boolean",
      displayName: "Show Media Outreach",
      defaultValue: true,
      description: "Show or hide Media Outreach pins on the map",
    },
    mediaOutreachUrl: {
      type: "string",
      displayName: "Media Outreach URL",
      defaultValue: "",
      description: "URL link for Media Outreach legend item (optional)",
    },

    // Popup settings
    popupVerticalOffset: {
      type: "number",
      displayName: "Popup Vertical Position (%)",
      defaultValue: 35,
      description: "Vertical position of popup as percentage from top (e.g., 20, 35, 50)",
    },
    popupBackgroundColor: {
      type: "string",
      displayName: "Popup Background Color",
      defaultValue: "#1e293b",
      description: "Background color for country info popup",
    },
    popupTextColor: {
      type: "string",
      displayName: "Popup Text Color",
      defaultValue: "#ffffff",
      description: "Text color for country info popup",
    },
    popupMinistryLinksJson: {
      type: "string",
      displayName: "Popup Ministry Links (JSON)",
      defaultValue: "",
      description: "Ministry links shown in popup badges for all countries. JSON array of { label, url } objects. Example: [{ \"label\": \"Mega City Media Campaigns\", \"url\": \"/megacitymediacampaigns\" }]",
    },










    // Israel
    showIsrael: {
      type: "boolean",
      displayName: "Show Israel",
      defaultValue: true,
    },
    israelName: {
      type: "string",
      displayName: "Israel - Name",
      defaultValue: "Israel",
    },
    israelPopulation: {
      type: "string",
      displayName: "Israel - Population",
      defaultValue: "9.5M",
    },
    israelChristianPercent: {
      type: "string",
      displayName: "Israel - Christian %",
      defaultValue: "2%",
    },
    israelImage: {
      type: "imageUrl",
      displayName: "Israel - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    israelMinistryTypes: {
      type: "object",
      displayName: "Israel - Ministry Types",
      defaultValue: ["jewish"],
      description: 'Array of ministry types (e.g., ["jewish", "media"])',
    },
    israelLearnMoreUrl: {
      type: "string",
      displayName: "Israel - Learn More URL",
      defaultValue: "",
      description: "URL for the Learn More button (leave empty to hide button)",
    },
showWesternSahara: {
  type: "boolean",
  displayName: "Show Western Sahara",
  defaultValue: true,
  description: "Show or hide Western Sahara pin on the map",
},
westernSaharaName: {
  type: "string",
  displayName: "Western Sahara - Name",
  defaultValue: "Western Sahara",
},
westernSaharaPopulation: {
  type: "string",
  displayName: "Western Sahara - Population",
  defaultValue: "652K",
},
westernSaharaChristianPercent: {
  type: "string",
  displayName: "Western Sahara - Christian %",
  defaultValue: "<0.1%",
},
westernSaharaImage: {
  type: "imageUrl",
  displayName: "Western Sahara - Image",
  defaultValue: "/placeholder.svg?height=200&width=300",
},
westernSaharaMinistryTypes: {
  type: "object",
  displayName: "Western Sahara - Ministry Types",
  defaultValue: ["window1040"],
  description: 'Array of ministry types (e.g., ["window1040", "social"])',
},
westernSaharaLearnMoreUrl: {
  type: "string",
  displayName: "Western Sahara - Learn More URL",
  defaultValue: "",
  description: "URL for the Learn More button (leave empty to hide button)",
},

    showUkraine: {
      type: "boolean",
      displayName: "Show Ukraine",
      defaultValue: true,
    },
    ukraineName: {
      type: "string",
      displayName: "Ukraine - Name",
      defaultValue: "Ukraine",
    },
    ukrainePopulation: {
      type: "string",
      displayName: "Ukraine - Population",
      defaultValue: "41M",
    },
    ukraineChristianPercent: {
      type: "string",
      displayName: "Ukraine - Christian %",
      defaultValue: "87%",
    },
    ukraineImage: {
      type: "imageUrl",
      displayName: "Ukraine - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    ukraineMinistryTypes: {
      type: "object",
      displayName: "Ukraine - Ministry Types",
      defaultValue: ["media", "humanitarian"],
    },
    ukraineLearnMoreUrl: {
      type: "string",
      displayName: "Ukraine - Learn More URL",
      defaultValue: "",
    },

    showMoldova: {
      type: "boolean",
      displayName: "Show Moldova",
      defaultValue: true,
    },
    moldovaName: {
      type: "string",
      displayName: "Moldova - Name",
      defaultValue: "Moldova",
    },
    moldovaPopulation: {
      type: "string",
      displayName: "Moldova - Population",
      defaultValue: "2.5M",
    },
    moldovaChristianPercent: {
      type: "string",
      displayName: "Moldova - Christian %",
      defaultValue: "95%",
    },
    moldovaImage: {
      type: "imageUrl",
      displayName: "Moldova - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    moldovaMinistryTypes: {
      type: "object",
      displayName: "Moldova - Ministry Types",
      defaultValue: ["megacity"],
    },
    moldovaLearnMoreUrl: {
      type: "string",
      displayName: "Moldova - Learn More URL",
      defaultValue: "",
    },

    // India
    showIndia: {
      type: "boolean",
      displayName: "Show India",
      defaultValue: true,
    },
    indiaName: {
      type: "string",
      displayName: "India - Name",
      defaultValue: "India",
    },
    indiaPopulation: {
      type: "string",
      displayName: "India - Population",
      defaultValue: "1.4B",
    },
    indiaChristianPercent: {
      type: "string",
      displayName: "India - Christian %",
      defaultValue: "2.3%",
    },
    indiaImage: {
      type: "imageUrl",
      displayName: "India - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    indiaMinistryTypes: {
      type: "object",
      displayName: "India - Ministry Types",
      defaultValue: ["media"],
    },
    indiaLearnMoreUrl: {
      type: "string",
      displayName: "India - Learn More URL",
      defaultValue: "",
    },

    // Philippines
    showPhilippines: {
      type: "boolean",
      displayName: "Show Philippines",
      defaultValue: true,
    },
    philippinesName: {
      type: "string",
      displayName: "Philippines - Name",
      defaultValue: "Philippines",
    },
    philippinesPopulation: {
      type: "string",
      displayName: "Philippines - Population",
      defaultValue: "113M",
    },
    philippinesChristianPercent: {
      type: "string",
      displayName: "Philippines - Christian %",
      defaultValue: "93%",
    },
    philippinesImage: {
      type: "imageUrl",
      displayName: "Philippines - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    philippinesMinistryTypes: {
      type: "object",
      displayName: "Philippines - Ministry Types",
      defaultValue: ["media"],
    },
    philippinesLearnMoreUrl: {
      type: "string",
      displayName: "Philippines - Learn More URL",
      defaultValue: "",
    },

    // Brazil
    showBrazil: {
      type: "boolean",
      displayName: "Show Brazil",
      defaultValue: true,
    },
    brazilName: {
      type: "string",
      displayName: "Brazil - Name",
      defaultValue: "Brazil",
    },
    brazilPopulation: {
      type: "string",
      displayName: "Brazil - Population",
      defaultValue: "215M",
    },
    brazilChristianPercent: {
      type: "string",
      displayName: "Brazil - Christian %",
      defaultValue: "88%",
    },
    brazilImage: {
      type: "imageUrl",
      displayName: "Brazil - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    brazilMinistryTypes: {
      type: "object",
      displayName: "Brazil - Ministry Types",
      defaultValue: ["media"],
    },
    brazilLearnMoreUrl: {
      type: "string",
      displayName: "Brazil - Learn More URL",
      defaultValue: "",
    },

    // Nigeria
    showNigeria: {
      type: "boolean",
      displayName: "Show Nigeria",
      defaultValue: true,
    },
    nigeriaName: {
      type: "string",
      displayName: "Nigeria - Name",
      defaultValue: "Nigeria",
    },
    nigeriaPopulation: {
      type: "string",
      displayName: "Nigeria - Population",
      defaultValue: "218M",
    },
    nigeriaChristianPercent: {
      type: "string",
      displayName: "Nigeria - Christian %",
      defaultValue: "49%",
    },
    nigeriaImage: {
      type: "imageUrl",
      displayName: "Nigeria - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    nigeriaMinistryTypes: {
      type: "object",
      displayName: "Nigeria - Ministry Types",
      defaultValue: ["media"],
    },
    nigeriaLearnMoreUrl: {
      type: "string",
      displayName: "Nigeria - Learn More URL",
      defaultValue: "",
    },

    // Ethiopia
    showEthiopia: {
      type: "boolean",
      displayName: "Show Ethiopia",
      defaultValue: true,
    },
    ethiopiaName: {
      type: "string",
      displayName: "Ethiopia - Name",
      defaultValue: "Ethiopia",
    },
    ethiopiaPopulation: {
      type: "string",
      displayName: "Ethiopia - Population",
      defaultValue: "120M",
    },
    ethiopiaChristianPercent: {
      type: "string",
      displayName: "Ethiopia - Christian %",
      defaultValue: "64%",
    },
    ethiopiaImage: {
      type: "imageUrl",
      displayName: "Ethiopia - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    ethiopiaMinistryTypes: {
      type: "object",
      displayName: "Ethiopia - Ministry Types",
      defaultValue: ["media"],
    },
    ethiopiaLearnMoreUrl: {
      type: "string",
      displayName: "Ethiopia - Learn More URL",
      defaultValue: "",
    },

    // Mexico
    showMexico: {
      type: "boolean",
      displayName: "Show Mexico",
      defaultValue: true,
    },
    mexicoName: {
      type: "string",
      displayName: "Mexico - Name",
      defaultValue: "Mexico",
    },
    mexicoPopulation: {
      type: "string",
      displayName: "Mexico - Population",
      defaultValue: "128M",
    },
    mexicoChristianPercent: {
      type: "string",
      displayName: "Mexico - Christian %",
      defaultValue: "95%",
    },
    mexicoImage: {
      type: "imageUrl",
      displayName: "Mexico - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    mexicoMinistryTypes: {
      type: "object",
      displayName: "Mexico - Ministry Types",
      defaultValue: ["media"],
    },
    mexicoLearnMoreUrl: {
      type: "string",
      displayName: "Mexico - Learn More URL",
      defaultValue: "",
    },

    // Kenya
    showKenya: {
      type: "boolean",
      displayName: "Show Kenya",
      defaultValue: true,
    },
    kenyaName: {
      type: "string",
      displayName: "Kenya - Name",
      defaultValue: "Kenya",
    },
    kenyaPopulation: {
      type: "string",
      displayName: "Kenya - Population",
      defaultValue: "54M",
    },
    kenyaChristianPercent: {
      type: "string",
      displayName: "Kenya - Christian %",
      defaultValue: "85%",
    },
    kenyaImage: {
      type: "imageUrl",
      displayName: "Kenya - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    kenyaMinistryTypes: {
      type: "object",
      displayName: "Kenya - Ministry Types",
      defaultValue: ["media"],
    },
    kenyaLearnMoreUrl: {
      type: "string",
      displayName: "Kenya - Learn More URL",
      defaultValue: "",
    },

    // Colombia
    showColombia: {
      type: "boolean",
      displayName: "Show Colombia",
      defaultValue: true,
    },
    colombiaName: {
      type: "string",
      displayName: "Colombia - Name",
      defaultValue: "Colombia",
    },
    colombiaPopulation: {
      type: "string",
      displayName: "Colombia - Population",
      defaultValue: "51M",
    },
    colombiaChristianPercent: {
      type: "string",
      displayName: "Colombia - Christian %",
      defaultValue: "92%",
    },
    colombiaImage: {
      type: "imageUrl",
      displayName: "Colombia - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    colombiaMinistryTypes: {
      type: "object",
      displayName: "Colombia - Ministry Types",
      defaultValue: ["media"],
    },
    colombiaLearnMoreUrl: {
      type: "string",
      displayName: "Colombia - Learn More URL",
      defaultValue: "",
    },

    // Peru
    showPeru: {
      type: "boolean",
      displayName: "Show Peru",
      defaultValue: true,
    },
    peruName: {
      type: "string",
      displayName: "Peru - Name",
      defaultValue: "Peru",
    },
    peruPopulation: {
      type: "string",
      displayName: "Peru - Population",
      defaultValue: "33M",
    },
    peruChristianPercent: {
      type: "string",
      displayName: "Peru - Christian %",
      defaultValue: "94%",
    },
    peruImage: {
      type: "imageUrl",
      displayName: "Peru - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    peruMinistryTypes: {
      type: "object",
      displayName: "Peru - Ministry Types",
      defaultValue: ["media"],
    },
    peruLearnMoreUrl: {
      type: "string",
      displayName: "Peru - Learn More URL",
      defaultValue: "",
    },

    // Ghana
    showGhana: {
      type: "boolean",
      displayName: "Show Ghana",
      defaultValue: true,
    },
    ghanaName: {
      type: "string",
      displayName: "Ghana - Name",
      defaultValue: "Ghana",
    },
    ghanaPopulation: {
      type: "string",
      displayName: "Ghana - Population",
      defaultValue: "32M",
    },
    ghanaChristianPercent: {
      type: "string",
      displayName: "Ghana - Christian %",
      defaultValue: "71%",
    },
    ghanaImage: {
      type: "imageUrl",
      displayName: "Ghana - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    ghanaMinistryTypes: {
      type: "object",
      displayName: "Ghana - Ministry Types",
      defaultValue: ["media"],
    },
    ghanaLearnMoreUrl: {
      type: "string",
      displayName: "Ghana - Learn More URL",
      defaultValue: "",
    },

    // Uganda
    showUganda: {
      type: "boolean",
      displayName: "Show Uganda",
      defaultValue: true,
    },
    ugandaName: {
      type: "string",
      displayName: "Uganda - Name",
      defaultValue: "Uganda",
    },
    ugandaPopulation: {
      type: "string",
      displayName: "Uganda - Population",
      defaultValue: "47M",
    },
    ugandaChristianPercent: {
      type: "string",
      displayName: "Uganda - Christian %",
      defaultValue: "84%",
    },
    ugandaImage: {
      type: "imageUrl",
      displayName: "Uganda - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    ugandaMinistryTypes: {
      type: "object",
      displayName: "Uganda - Ministry Types",
      defaultValue: ["media"],
    },
    ugandaLearnMoreUrl: {
      type: "string",
      displayName: "Uganda - Learn More URL",
      defaultValue: "",
    },

    // Tanzania
    showTanzania: {
      type: "boolean",
      displayName: "Show Tanzania",
      defaultValue: true,
    },
    tanzaniaName: {
      type: "string",
      displayName: "Tanzania - Name",
      defaultValue: "Tanzania",
    },
    tanzaniaPopulation: {
      type: "string",
      displayName: "Tanzania - Population",
      defaultValue: "63M",
    },
    tanzaniaChristianPercent: {
      type: "string",
      displayName: "Tanzania - Christian %",
      defaultValue: "61%",
    },
    tanzaniaImage: {
      type: "imageUrl",
      displayName: "Tanzania - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    tanzaniaMinistryTypes: {
      type: "object",
      displayName: "Tanzania - Ministry Types",
      defaultValue: ["media"],
    },
    tanzaniaLearnMoreUrl: {
      type: "string",
      displayName: "Tanzania - Learn More URL",
      defaultValue: "",
    },

    // Rwanda
    showRwanda: {
      type: "boolean",
      displayName: "Show Rwanda",
      defaultValue: true,
    },
    rwandaName: {
      type: "string",
      displayName: "Rwanda - Name",
      defaultValue: "Rwanda",
    },
    rwandaPopulation: {
      type: "string",
      displayName: "Rwanda - Population",
      defaultValue: "13M",
    },
    rwandaChristianPercent: {
      type: "string",
      displayName: "Rwanda - Christian %",
      defaultValue: "93%",
    },
    rwandaImage: {
      type: "imageUrl",
      displayName: "Rwanda - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    rwandaMinistryTypes: {
      type: "object",
      displayName: "Rwanda - Ministry Types",
      defaultValue: ["trauma"],
    },
    rwandaLearnMoreUrl: {
      type: "string",
      displayName: "Rwanda - Learn More URL",
      defaultValue: "",
    },

    // Zambia
    showZambia: {
      type: "boolean",
      displayName: "Show Zambia",
      defaultValue: true,
    },
    zambiaName: {
      type: "string",
      displayName: "Zambia - Name",
      defaultValue: "Zambia",
    },
    zambiaPopulation: {
      type: "string",
      displayName: "Zambia - Population",
      defaultValue: "19M",
    },
    zambiaChristianPercent: {
      type: "string",
      displayName: "Zambia - Christian %",
      defaultValue: "95%",
    },
    zambiaImage: {
      type: "imageUrl",
      displayName: "Zambia - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    zambiaMinistryTypes: {
      type: "object",
      displayName: "Zambia - Ministry Types",
      defaultValue: ["media"],
    },
    zambiaLearnMoreUrl: {
      type: "string",
      displayName: "Zambia - Learn More URL",
      defaultValue: "",
    },

    // Malawi
    showMalawi: {
      type: "boolean",
      displayName: "Show Malawi",
      defaultValue: true,
    },
    malawiName: {
      type: "string",
      displayName: "Malawi - Name",
      defaultValue: "Malawi",
    },
    malawiPopulation: {
      type: "string",
      displayName: "Malawi - Population",
      defaultValue: "20M",
    },
    malawiChristianPercent: {
      type: "string",
      displayName: "Malawi - Christian %",
      defaultValue: "82%",
    },
    malawiImage: {
      type: "imageUrl",
      displayName: "Malawi - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    malawiMinistryTypes: {
      type: "object",
      displayName: "Malawi - Ministry Types",
      defaultValue: ["media"],
    },
    malawiLearnMoreUrl: {
      type: "string",
      displayName: "Malawi - Learn More URL",
      defaultValue: "",
    },

    // Guatemala
    showGuatemala: {
      type: "boolean",
      displayName: "Show Guatemala",
      defaultValue: true,
    },
    guatemalaName: {
      type: "string",
      displayName: "Guatemala - Name",
      defaultValue: "Guatemala",
    },
    guatemalaPopulation: {
      type: "string",
      displayName: "Guatemala - Population",
      defaultValue: "18M",
    },
    guatemalaChristianPercent: {
      type: "string",
      displayName: "Guatemala - Christian %",
      defaultValue: "95%",
    },
    guatemalaImage: {
      type: "imageUrl",
      displayName: "Guatemala - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    guatemalaMinistryTypes: {
      type: "object",
      displayName: "Guatemala - Ministry Types",
      defaultValue: ["media"],
    },
    guatemalaLearnMoreUrl: {
      type: "string",
      displayName: "Guatemala - Learn More URL",
      defaultValue: "",
    },

    // Honduras
    showHonduras: {
      type: "boolean",
      displayName: "Show Honduras",
      defaultValue: true,
    },
    hondurasName: {
      type: "string",
      displayName: "Honduras - Name",
      defaultValue: "Honduras",
    },
    hondurasPopulation: {
      type: "string",
      displayName: "Honduras - Population",
      defaultValue: "10M",
    },
    hondurasChristianPercent: {
      type: "string",
      displayName: "Honduras - Christian %",
      defaultValue: "97%",
    },
    hondurasImage: {
      type: "imageUrl",
      displayName: "Honduras - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    hondurasMinistryTypes: {
      type: "object",
      displayName: "Honduras - Ministry Types",
      defaultValue: ["media"],
    },
    hondurasLearnMoreUrl: {
      type: "string",
      displayName: "Honduras - Learn More URL",
      defaultValue: "",
    },

    // El Salvador
    showElSalvador: {
      type: "boolean",
      displayName: "Show El Salvador",
      defaultValue: true,
    },
    elSalvadorName: {
      type: "string",
      displayName: "El Salvador - Name",
      defaultValue: "El Salvador",
    },
    elSalvadorPopulation: {
      type: "string",
      displayName: "El Salvador - Population",
      defaultValue: "6.5M",
    },
    elSalvadorChristianPercent: {
      type: "string",
      displayName: "El Salvador - Christian %",
      defaultValue: "88%",
    },
    elSalvadorImage: {
      type: "imageUrl",
      displayName: "El Salvador - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    elSalvadorMinistryTypes: {
      type: "object",
      displayName: "El Salvador - Ministry Types",
      defaultValue: ["media"],
    },
    elSalvadorLearnMoreUrl: {
      type: "string",
      displayName: "El Salvador - Learn More URL",
      defaultValue: "",
    },

    // Haiti
    showHaiti: {
      type: "boolean",
      displayName: "Show Haiti",
      defaultValue: true,
    },
    haitiName: {
      type: "string",
      displayName: "Haiti - Name",
      defaultValue: "Haiti",
    },
    haitiPopulation: {
      type: "string",
      displayName: "Haiti - Population",
      defaultValue: "11.5M",
    },
    haitiChristianPercent: {
      type: "string",
      displayName: "Haiti - Christian %",
      defaultValue: "87%",
    },
    haitiImage: {
      type: "imageUrl",
      displayName: "Haiti - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    haitiMinistryTypes: {
      type: "object",
      displayName: "Haiti - Ministry Types",
      defaultValue: ["humanitarian"],
    },
    haitiLearnMoreUrl: {
      type: "string",
      displayName: "Haiti - Learn More URL",
      defaultValue: "",
    },

    // China
    showChina: {
      type: "boolean",
      displayName: "Show China",
      defaultValue: false,
    },
    chinaName: {
      type: "string",
      displayName: "China - Name",
      defaultValue: "China",
    },
    chinaPopulation: {
      type: "string",
      displayName: "China - Population",
      defaultValue: "1.4B",
    },
    chinaChristianPercent: {
      type: "string",
      displayName: "China - Christian %",
      defaultValue: "5%",
    },
    chinaImage: {
      type: "imageUrl",
      displayName: "China - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    chinaMinistryTypes: {
      type: "object",
      displayName: "China - Ministry Types",
      defaultValue: ["future"],
    },
    chinaLearnMoreUrl: {
      type: "string",
      displayName: "China - Learn More URL",
      defaultValue: "",
    },

    // Indonesia
    showIndonesia: {
      type: "boolean",
      displayName: "Show Indonesia",
      defaultValue: false,
    },
    indonesiaName: {
      type: "string",
      displayName: "Indonesia - Name",
      defaultValue: "Indonesia",
    },
    indonesiaPopulation: {
      type: "string",
      displayName: "Indonesia - Population",
      defaultValue: "275M",
    },
    indonesiaChristianPercent: {
      type: "string",
      displayName: "Indonesia - Christian %",
      defaultValue: "10%",
    },
    indonesiaImage: {
      type: "imageUrl",
      displayName: "Indonesia - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    indonesiaMinistryTypes: {
      type: "object",
      displayName: "Indonesia - Ministry Types",
      defaultValue: ["future"],
    },
    indonesiaLearnMoreUrl: {
      type: "string",
      displayName: "Indonesia - Learn More URL",
      defaultValue: "",
    },

    // Pakistan
    showPakistan: {
      type: "boolean",
      displayName: "Show Pakistan",
      defaultValue: false,
    },
    pakistanName: {
      type: "string",
      displayName: "Pakistan - Name",
      defaultValue: "Pakistan",
    },
    pakistanPopulation: {
      type: "string",
      displayName: "Pakistan - Population",
      defaultValue: "231M",
    },
    pakistanChristianPercent: {
      type: "string",
      displayName: "Pakistan - Christian %",
      defaultValue: "2%",
    },
    pakistanImage: {
      type: "imageUrl",
      displayName: "Pakistan - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    pakistanMinistryTypes: {
      type: "object",
      displayName: "Pakistan - Ministry Types",
      defaultValue: ["future"],
    },
    pakistanLearnMoreUrl: {
      type: "string",
      displayName: "Pakistan - Learn More URL",
      defaultValue: "",
    },

    // Bangladesh
    showBangladesh: {
      type: "boolean",
      displayName: "Show Bangladesh",
      defaultValue: false,
    },
    bangladeshName: {
      type: "string",
      displayName: "Bangladesh - Name",
      defaultValue: "Bangladesh",
    },
    bangladeshPopulation: {
      type: "string",
      displayName: "Bangladesh - Population",
      defaultValue: "169M",
    },
    bangladeshChristianPercent: {
      type: "string",
      displayName: "Bangladesh - Christian %",
      defaultValue: "0.5%",
    },
    bangladeshImage: {
      type: "imageUrl",
      displayName: "Bangladesh - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    bangladeshMinistryTypes: {
      type: "object",
      displayName: "Bangladesh - Ministry Types",
      defaultValue: ["future"],
    },
    bangladeshLearnMoreUrl: {
      type: "string",
      displayName: "Bangladesh - Learn More URL",
      defaultValue: "",
    },

    // Japan
    showJapan: {
      type: "boolean",
      displayName: "Show Japan",
      defaultValue: false,
    },
    japanName: {
      type: "string",
      displayName: "Japan - Name",
      defaultValue: "Japan",
    },
    japanPopulation: {
      type: "string",
      displayName: "Japan - Population",
      defaultValue: "125M",
    },
    japanChristianPercent: {
      type: "string",
      displayName: "Japan - Christian %",
      defaultValue: "1%",
    },
    japanImage: {
      type: "imageUrl",
      displayName: "Japan - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    japanMinistryTypes: {
      type: "object",
      displayName: "Japan - Ministry Types",
      defaultValue: ["future"],
    },
    japanLearnMoreUrl: {
      type: "string",
      displayName: "Japan - Learn More URL",
      defaultValue: "",
    },

    // Vietnam
    showVietnam: {
      type: "boolean",
      displayName: "Show Vietnam",
      defaultValue: false,
    },
    vietnamName: {
      type: "string",
      displayName: "Vietnam - Name",
      defaultValue: "Vietnam",
    },
    vietnamPopulation: {
      type: "string",
      displayName: "Vietnam - Population",
      defaultValue: "98M",
    },
    vietnamChristianPercent: {
      type: "string",
      displayName: "Vietnam - Christian %",
      defaultValue: "8%",
    },
    vietnamImage: {
      type: "imageUrl",
      displayName: "Vietnam - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    vietnamMinistryTypes: {
      type: "object",
      displayName: "Vietnam - Ministry Types",
      defaultValue: ["future"],
    },
    vietnamLearnMoreUrl: {
      type: "string",
      displayName: "Vietnam - Learn More URL",
      defaultValue: "",
    },

    // Thailand
    showThailand: {
      type: "boolean",
      displayName: "Show Thailand",
      defaultValue: false,
    },
    thailandName: {
      type: "string",
      displayName: "Thailand - Name",
      defaultValue: "Thailand",
    },
    thailandPopulation: {
      type: "string",
      displayName: "Thailand - Population",
      defaultValue: "70M",
    },
    thailandChristianPercent: {
      type: "string",
      displayName: "Thailand - Christian %",
      defaultValue: "1%",
    },
    thailandImage: {
      type: "imageUrl",
      displayName: "Thailand - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    thailandMinistryTypes: {
      type: "object",
      displayName: "Thailand - Ministry Types",
      defaultValue: ["future"],
    },
    thailandLearnMoreUrl: {
      type: "string",
      displayName: "Thailand - Learn More URL",
      defaultValue: "",
    },

    // Myanmar
    showMyanmar: {
      type: "boolean",
      displayName: "Show Myanmar",
      defaultValue: false,
    },
    myanmarName: {
      type: "string",
      displayName: "Myanmar - Name",
      defaultValue: "Myanmar",
    },
    myanmarPopulation: {
      type: "string",
      displayName: "Myanmar - Population",
      defaultValue: "54M",
    },
    myanmarChristianPercent: {
      type: "string",
      displayName: "Myanmar - Christian %",
      defaultValue: "6%",
    },
    myanmarImage: {
      type: "imageUrl",
      displayName: "Myanmar - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    myanmarMinistryTypes: {
      type: "object",
      displayName: "Myanmar - Ministry Types",
      defaultValue: ["future"],
    },
    myanmarLearnMoreUrl: {
      type: "string",
      displayName: "Myanmar - Learn More URL",
      defaultValue: "",
    },

    // South Korea
    showSouthKorea: {
      type: "boolean",
      displayName: "Show South Korea",
      defaultValue: false,
    },
    southKoreaName: {
      type: "string",
      displayName: "South Korea - Name",
      defaultValue: "South Korea",
    },
    southKoreaPopulation: {
      type: "string",
      displayName: "South Korea - Population",
      defaultValue: "52M",
    },
    southKoreaChristianPercent: {
      type: "string",
      displayName: "South Korea - Christian %",
      defaultValue: "29%",
    },
    southKoreaImage: {
      type: "imageUrl",
      displayName: "South Korea - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    southKoreaMinistryTypes: {
      type: "object",
      displayName: "South Korea - Ministry Types",
      defaultValue: ["future"],
    },
    southKoreaLearnMoreUrl: {
      type: "string",
      displayName: "South Korea - Learn More URL",
      defaultValue: "",
    },

    // Guyana
showGuyana: {
  type: "boolean",
  displayName: "Show Guyana",
  defaultValue: false,
},
guyanaName: {
  type: "string",
  displayName: "Guyana - Name",
  defaultValue: "Guyana",
},
guyanaPopulation: {
  type: "string",
  displayName: "Guyana - Population",
  defaultValue: "0.8M",
},
guyanaChristianPercent: {
  type: "string",
  displayName: "Guyana - Christian %",
  defaultValue: "57%",
},
guyanaImage: {
  type: "imageUrl",
  displayName: "Guyana - Image",
  defaultValue: "/placeholder.svg?height=200&width=300",
},
guyanaMinistryTypes: {
  type: "object",
  displayName: "Guyana - Ministry Types",
  defaultValue: ["future"],
},
guyanaLearnMoreUrl: {
  type: "string",
  displayName: "Guyana - Learn More URL",
  defaultValue: "",
},

    // Suriname
showSuriname: {
  type: "boolean",
  displayName: "Show Suriname",
  defaultValue: false,
},
surinameName: {
  type: "string",
  displayName: "Suriname - Name",
  defaultValue: "Suriname",
},
surinamePopulation: {
  type: "string",
  displayName: "Suriname - Population",
  defaultValue: "0.6M",
},
surinameChristianPercent: {
  type: "string",
  displayName: "Suriname - Christian %",
  defaultValue: "48%",
},
surinameImage: {
  type: "imageUrl",
  displayName: "Suriname - Image",
  defaultValue: "/placeholder.svg?height=200&width=300",
},
surinameMinistryTypes: {
  type: "object",
  displayName: "Suriname - Ministry Types",
  defaultValue: ["future"],
},
surinameLearnMoreUrl: {
  type: "string",
  displayName: "Suriname - Learn More URL",
  defaultValue: "",
},


    // Afghanistan
    showAfghanistan: {
      type: "boolean",
      displayName: "Show Afghanistan",
      defaultValue: false,
    },
    afghanistanName: {
      type: "string",
      displayName: "Afghanistan - Name",
      defaultValue: "Afghanistan",
    },
    afghanistanPopulation: {
      type: "string",
      displayName: "Afghanistan - Population",
      defaultValue: "40M",
    },
    afghanistanChristianPercent: {
      type: "string",
      displayName: "Afghanistan - Christian %",
      defaultValue: "0.01%",
    },
    afghanistanImage: {
      type: "imageUrl",
      displayName: "Afghanistan - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    afghanistanMinistryTypes: {
      type: "object",
      displayName: "Afghanistan - Ministry Types",
      defaultValue: ["future"],
    },
    afghanistanLearnMoreUrl: {
      type: "string",
      displayName: "Afghanistan - Learn More URL",
      defaultValue: "",
    },

    // Iraq
    showIraq: {
      type: "boolean",
      displayName: "Show Iraq",
      defaultValue: false,
    },
    iraqName: {
      type: "string",
      displayName: "Iraq - Name",
      defaultValue: "Iraq",
    },
    iraqPopulation: {
      type: "string",
      displayName: "Iraq - Population",
      defaultValue: "42M",
    },
    iraqChristianPercent: {
      type: "string",
      displayName: "Iraq - Christian %",
      defaultValue: "1%",
    },
    iraqImage: {
      type: "imageUrl",
      displayName: "Iraq - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    iraqMinistryTypes: {
      type: "object",
      displayName: "Iraq - Ministry Types",
      defaultValue: ["arabic"],
    },
    iraqLearnMoreUrl: {
      type: "string",
      displayName: "Iraq - Learn More URL",
      defaultValue: "",
    },

    // Syria
    showSyria: {
      type: "boolean",
      displayName: "Show Syria",
      defaultValue: false,
    },
    syriaName: {
      type: "string",
      displayName: "Syria - Name",
      defaultValue: "Syria",
    },
    syriaPopulation: {
      type: "string",
      displayName: "Syria - Population",
      defaultValue: "19M",
    },
    syriaChristianPercent: {
      type: "string",
      displayName: "Syria - Christian %",
      defaultValue: "5%",
    },
    syriaImage: {
      type: "imageUrl",
      displayName: "Syria - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    syriaMinistryTypes: {
      type: "object",
      displayName: "Syria - Ministry Types",
      defaultValue: ["arabic"],
    },
    syriaLearnMoreUrl: {
      type: "string",
      displayName: "Syria - Learn More URL",
      defaultValue: "",
    },

    // Yemen
    showYemen: {
      type: "boolean",
      displayName: "Show Yemen",
      defaultValue: false,
    },
    yemenName: {
      type: "string",
      displayName: "Yemen - Name",
      defaultValue: "Yemen",
    },
    yemenPopulation: {
      type: "string",
      displayName: "Yemen - Population",
      defaultValue: "31M",
    },
    yemenChristianPercent: {
      type: "string",
      displayName: "Yemen - Christian %",
      defaultValue: "0.01%",
    },
    yemenImage: {
      type: "imageUrl",
      displayName: "Yemen - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    yemenMinistryTypes: {
      type: "object",
      displayName: "Yemen - Ministry Types",
      defaultValue: ["arabic"],
    },
    yemenLearnMoreUrl: {
      type: "string",
      displayName: "Yemen - Learn More URL",
      defaultValue: "",
    },

    // Saudi Arabia
    showSaudiArabia: {
      type: "boolean",
      displayName: "Show Saudi Arabia",
      defaultValue: false,
    },
    saudiArabiaName: {
      type: "string",
      displayName: "Saudi Arabia - Name",
      defaultValue: "Saudi Arabia",
    },
    saudiArabiaPopulation: {
      type: "string",
      displayName: "Saudi Arabia - Population",
      defaultValue: "35M",
    },
    saudiArabiaChristianPercent: {
      type: "string",
      displayName: "Saudi Arabia - Christian %",
      defaultValue: "4%",
    },
    saudiArabiaImage: {
      type: "imageUrl",
      displayName: "Saudi Arabia - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    saudiArabiaMinistryTypes: {
      type: "object",
      displayName: "Saudi Arabia - Ministry Types",
      defaultValue: ["arabic"],
    },
    saudiArabiaLearnMoreUrl: {
      type: "string",
      displayName: "Saudi Arabia - Learn More URL",
      defaultValue: "",
    },

    // Iran
    showIran: {
      type: "boolean",
      displayName: "Show Iran",
      defaultValue: false,
    },
    iranName: {
      type: "string",
      displayName: "Iran - Name",
      defaultValue: "Iran",
    },
    iranPopulation: {
      type: "string",
      displayName: "Iran - Population",
      defaultValue: "87M",
    },
    iranChristianPercent: {
      type: "string",
      displayName: "Iran - Christian %",
      defaultValue: "0.5%",
    },
    iranImage: {
      type: "imageUrl",
      displayName: "Iran - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    iranMinistryTypes: {
      type: "object",
      displayName: "Iran - Ministry Types",
      defaultValue: ["arabic"],
    },
    iranLearnMoreUrl: {
      type: "string",
      displayName: "Iran - Learn More URL",
      defaultValue: "",
    },

    // Turkey
    showTurkey: {
      type: "boolean",
      displayName: "Show Turkey",
      defaultValue: false,
    },
    turkeyName: {
      type: "string",
      displayName: "Turkey - Name",
      defaultValue: "Turkey",
    },
    turkeyPopulation: {
      type: "string",
      displayName: "Turkey - Population",
      defaultValue: "85M",
    },
    turkeyChristianPercent: {
      type: "string",
      displayName: "Turkey - Christian %",
      defaultValue: "0.2%",
    },
    turkeyImage: {
      type: "imageUrl",
      displayName: "Turkey - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    turkeyMinistryTypes: {
      type: "object",
      displayName: "Turkey - Ministry Types",
      defaultValue: ["future"],
    },
    turkeyLearnMoreUrl: {
      type: "string",
      displayName: "Turkey - Learn More URL",
      defaultValue: "",
    },

    // Egypt
    showEgypt: {
      type: "boolean",
      displayName: "Show Egypt",
      defaultValue: false,
    },
    egyptName: {
      type: "string",
      displayName: "Egypt - Name",
      defaultValue: "Egypt",
    },
    egyptPopulation: {
      type: "string",
      displayName: "Egypt - Population",
      defaultValue: "106M",
    },
    egyptChristianPercent: {
      type: "string",
      displayName: "Egypt - Christian %",
      defaultValue: "10%",
    },
    egyptImage: {
      type: "imageUrl",
      displayName: "Egypt - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    egyptMinistryTypes: {
      type: "object",
      displayName: "Egypt - Ministry Types",
      defaultValue: ["arabic"],
    },
    egyptLearnMoreUrl: {
      type: "string",
      displayName: "Egypt - Learn More URL",
      defaultValue: "",
    },

    // South Africa
    showSouthAfrica: {
      type: "boolean",
      displayName: "Show South Africa",
      defaultValue: false,
    },
    southAfricaName: {
      type: "string",
      displayName: "South Africa - Name",
      defaultValue: "South Africa",
    },
    southAfricaPopulation: {
      type: "string",
      displayName: "South Africa - Population",
      defaultValue: "60M",
    },
    southAfricaChristianPercent: {
      type: "string",
      displayName: "South Africa - Christian %",
      defaultValue: "86%",
    },
    southAfricaImage: {
      type: "imageUrl",
      displayName: "South Africa - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    southAfricaMinistryTypes: {
      type: "object",
      displayName: "South Africa - Ministry Types",
      defaultValue: ["future"],
    },
    southAfricaLearnMoreUrl: {
      type: "string",
      displayName: "South Africa - Learn More URL",
      defaultValue: "",
    },

    // Algeria
    showAlgeria: {
      type: "boolean",
      displayName: "Show Algeria",
      defaultValue: false,
    },
    algeriaName: {
      type: "string",
      displayName: "Algeria - Name",
      defaultValue: "Algeria",
    },
    algeriaPopulation: {
      type: "string",
      displayName: "Algeria - Population",
      defaultValue: "45M",
    },
    algeriaChristianPercent: {
      type: "string",
      displayName: "Algeria - Christian %",
      defaultValue: "0.2%",
    },
    algeriaImage: {
      type: "imageUrl",
      displayName: "Algeria - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    algeriaMinistryTypes: {
      type: "object",
      displayName: "Algeria - Ministry Types",
      defaultValue: ["arabic"],
    },
    algeriaLearnMoreUrl: {
      type: "string",
      displayName: "Algeria - Learn More URL",
      defaultValue: "",
    },

    // Morocco
    showMorocco: {
      type: "boolean",
      displayName: "Show Morocco",
      defaultValue: false,
    },
    moroccoName: {
      type: "string",
      displayName: "Morocco - Name",
      defaultValue: "Morocco",
    },
    moroccoPopulation: {
      type: "string",
      displayName: "Morocco - Population",
      defaultValue: "37M",
    },
    moroccoChristianPercent: {
      type: "string",
      displayName: "Morocco - Christian %",
      defaultValue: "0.1%",
    },
    moroccoImage: {
      type: "imageUrl",
      displayName: "Morocco - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    moroccoMinistryTypes: {
      type: "object",
      displayName: "Morocco - Ministry Types",
      defaultValue: ["arabic"],
    },
    moroccoLearnMoreUrl: {
      type: "string",
      displayName: "Morocco - Learn More URL",
      defaultValue: "",
    },

    // Sudan
    showSudan: {
      type: "boolean",
      displayName: "Show Sudan",
      defaultValue: false,
    },
    sudanName: {
      type: "string",
      displayName: "Sudan - Name",
      defaultValue: "Sudan",
    },
    sudanPopulation: {
      type: "string",
      displayName: "Sudan - Population",
      defaultValue: "45M",
    },
    sudanChristianPercent: {
      type: "string",
      displayName: "Sudan - Christian %",
      defaultValue: "5%",
    },
    sudanImage: {
      type: "imageUrl",
      displayName: "Sudan - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    sudanMinistryTypes: {
      type: "object",
      displayName: "Sudan - Ministry Types",
      defaultValue: ["arabic"],
    },
    sudanLearnMoreUrl: {
      type: "string",
      displayName: "Sudan - Learn More URL",
      defaultValue: "",
    },

    // Cameroon
    showCameroon: {
      type: "boolean",
      displayName: "Show Cameroon",
      defaultValue: false,
    },
    cameroonName: {
      type: "string",
      displayName: "Cameroon - Name",
      defaultValue: "Cameroon",
    },
    cameroonPopulation: {
      type: "string",
      displayName: "Cameroon - Population",
      defaultValue: "28M",
    },
    cameroonChristianPercent: {
      type: "string",
      displayName: "Cameroon - Christian %",
      defaultValue: "70%",
    },
    cameroonImage: {
      type: "imageUrl",
      displayName: "Cameroon - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    cameroonMinistryTypes: {
      type: "object",
      displayName: "Cameroon - Ministry Types",
      defaultValue: ["future"],
    },
    cameroonLearnMoreUrl: {
      type: "string",
      displayName: "Cameroon - Learn More URL",
      defaultValue: "",
    },

    // Mozambique
    showMozambique: {
      type: "boolean",
      displayName: "Show Mozambique",
      defaultValue: false,
    },
    mozambiqueName: {
      type: "string",
      displayName: "Mozambique - Name",
      defaultValue: "Mozambique",
    },
    mozambiquePopulation: {
      type: "string",
      displayName: "Mozambique - Population",
      defaultValue: "32M",
    },
    mozambiqueChristianPercent: {
      type: "string",
      displayName: "Mozambique - Christian %",
      defaultValue: "56%",
    },
    mozambiqueImage: {
      type: "imageUrl",
      displayName: "Mozambique - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    mozambiqueMinistryTypes: {
      type: "object",
      displayName: "Mozambique - Ministry Types",
      defaultValue: ["future"],
    },
    mozambiqueLearnMoreUrl: {
      type: "string",
      displayName: "Mozambique - Learn More URL",
      defaultValue: "",
    },

    // Madagascar
    showMadagascar: {
      type: "boolean",
      displayName: "Show Madagascar",
      defaultValue: false,
    },
    madagascarName: {
      type: "string",
      displayName: "Madagascar - Name",
      defaultValue: "Madagascar",
    },
    madagascarPopulation: {
      type: "string",
      displayName: "Madagascar - Population",
      defaultValue: "29M",
    },
    madagascarChristianPercent: {
      type: "string",
      displayName: "Madagascar - Christian %",
      defaultValue: "85%",
    },
    madagascarImage: {
      type: "imageUrl",
      displayName: "Madagascar - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    madagascarMinistryTypes: {
      type: "object",
      displayName: "Madagascar - Ministry Types",
      defaultValue: ["future"],
    },
    madagascarLearnMoreUrl: {
      type: "string",
      displayName: "Madagascar - Learn More URL",
      defaultValue: "",
    },

    // Angola
    showAngola: {
      type: "boolean",
      displayName: "Show Angola",
      defaultValue: false,
    },
    angolaName: {
      type: "string",
      displayName: "Angola - Name",
      defaultValue: "Angola",
    },
    angolaPopulation: {
      type: "string",
      displayName: "Angola - Population",
      defaultValue: "34M",
    },
    angolaChristianPercent: {
      type: "string",
      displayName: "Angola - Christian %",
      defaultValue: "95%",
    },
    angolaImage: {
      type: "imageUrl",
      displayName: "Angola - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    angolaMinistryTypes: {
      type: "object",
      displayName: "Angola - Ministry Types",
      defaultValue: ["future"],
    },
    angolaLearnMoreUrl: {
      type: "string",
      displayName: "Angola - Learn More URL",
      defaultValue: "",
    },

    // Zimbabwe
    showZimbabwe: {
      type: "boolean",
      displayName: "Show Zimbabwe",
      defaultValue: false,
    },
    zimbabweName: {
      type: "string",
      displayName: "Zimbabwe - Name",
      defaultValue: "Zimbabwe",
    },
    zimbabwePopulation: {
      type: "string",
      displayName: "Zimbabwe - Population",
      defaultValue: "15M",
    },
    zimbabweChristianPercent: {
      type: "string",
      displayName: "Zimbabwe - Christian %",
      defaultValue: "87%",
    },
    zimbabweImage: {
      type: "imageUrl",
      displayName: "Zimbabwe - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    zimbabweMinistryTypes: {
      type: "object",
      displayName: "Zimbabwe - Ministry Types",
      defaultValue: ["future"],
    },
    zimbabweLearnMoreUrl: {
      type: "string",
      displayName: "Zimbabwe - Learn More URL",
      defaultValue: "",
    },

    // Mali
    showMali: {
      type: "boolean",
      displayName: "Show Mali",
      defaultValue: false,
    },
    maliName: {
      type: "string",
      displayName: "Mali - Name",
      defaultValue: "Mali",
    },
    maliPopulation: {
      type: "string",
      displayName: "Mali - Population",
      defaultValue: "21M",
    },
    maliChristianPercent: {
      type: "string",
      displayName: "Mali - Christian %",
      defaultValue: "3%",
    },
    maliImage: {
      type: "imageUrl",
      displayName: "Mali - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    maliMinistryTypes: {
      type: "object",
      displayName: "Mali - Ministry Types",
      defaultValue: ["future"],
    },
    maliLearnMoreUrl: {
      type: "string",
      displayName: "Mali - Learn More URL",
      defaultValue: "",
    },

    // Burkina Faso
    showBurkinaFaso: {
      type: "boolean",
      displayName: "Show Burkina Faso",
      defaultValue: false,
    },
    burkinaFasoName: {
      type: "string",
      displayName: "Burkina Faso - Name",
      defaultValue: "Burkina Faso",
    },
    burkinaFasoPopulation: {
      type: "string",
      displayName: "Burkina Faso - Population",
      defaultValue: "22M",
    },
    burkinaFasoChristianPercent: {
      type: "string",
      displayName: "Burkina Faso - Christian %",
      defaultValue: "23%",
    },
    burkinaFasoImage: {
      type: "imageUrl",
      displayName: "Burkina Faso - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    burkinaFasoMinistryTypes: {
      type: "object",
      displayName: "Burkina Faso - Ministry Types",
      defaultValue: ["future"],
    },
    burkinaFasoLearnMoreUrl: {
      type: "string",
      displayName: "Burkina Faso - Learn More URL",
      defaultValue: "",
    },

    // Senegal
    showSenegal: {
      type: "boolean",
      displayName: "Show Senegal",
      defaultValue: false,
    },
    senegalName: {
      type: "string",
      displayName: "Senegal - Name",
      defaultValue: "Senegal",
    },
    senegalPopulation: {
      type: "string",
      displayName: "Senegal - Population",
      defaultValue: "17M",
    },
    senegalChristianPercent: {
      type: "string",
      displayName: "Senegal - Christian %",
      defaultValue: "5%",
    },
    senegalImage: {
      type: "imageUrl",
      displayName: "Senegal - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    senegalMinistryTypes: {
      type: "object",
      displayName: "Senegal - Ministry Types",
      defaultValue: ["future"],
    },
    senegalLearnMoreUrl: {
      type: "string",
      displayName: "Senegal - Learn More URL",
      defaultValue: "",
    },

    // Chad
    showChad: {
      type: "boolean",
      displayName: "Show Chad",
      defaultValue: false,
    },
    chadName: {
      type: "string",
      displayName: "Chad - Name",
      defaultValue: "Chad",
    },
    chadPopulation: {
      type: "string",
      displayName: "Chad - Population",
      defaultValue: "17M",
    },
    chadChristianPercent: {
      type: "string",
      displayName: "Chad - Christian %",
      defaultValue: "40%",
    },
    chadImage: {
      type: "imageUrl",
      displayName: "Chad - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    chadMinistryTypes: {
      type: "object",
      displayName: "Chad - Ministry Types",
      defaultValue: ["future"],
    },
    chadLearnMoreUrl: {
      type: "string",
      displayName: "Chad - Learn More URL",
      defaultValue: "",
    },

    // Somalia
    showSomalia: {
      type: "boolean",
      displayName: "Show Somalia",
      defaultValue: false,
    },
    somaliaName: {
      type: "string",
      displayName: "Somalia - Name",
      defaultValue: "Somalia",
    },
    somaliaPopulation: {
      type: "string",
      displayName: "Somalia - Population",
      defaultValue: "16M",
    },
    somaliaChristianPercent: {
      type: "string",
      displayName: "Somalia - Christian %",
      defaultValue: "0.01%",
    },
    somaliaImage: {
      type: "imageUrl",
      displayName: "Somalia - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    somaliaMinistryTypes: {
      type: "object",
      displayName: "Somalia - Ministry Types",
      defaultValue: ["future"],
    },
    somaliaLearnMoreUrl: {
      type: "string",
      displayName: "Somalia - Learn More URL",
      defaultValue: "",
    },

    // Argentina
    showArgentina: {
      type: "boolean",
      displayName: "Show Argentina",
      defaultValue: false,
    },
    argentinaName: {
      type: "string",
      displayName: "Argentina - Name",
      defaultValue: "Argentina",
    },
    argentinaPopulation: {
      type: "string",
      displayName: "Argentina - Population",
      defaultValue: "46M",
    },
    argentinaChristianPercent: {
      type: "string",
      displayName: "Argentina - Christian %",
      defaultValue: "92%",
    },
    argentinaImage: {
      type: "imageUrl",
      displayName: "Argentina - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    argentinaMinistryTypes: {
      type: "object",
      displayName: "Argentina - Ministry Types",
      defaultValue: ["future"],
    },
    argentinaLearnMoreUrl: {
      type: "string",
      displayName: "Argentina - Learn More URL",
      defaultValue: "",
    },

    // Venezuela
    showVenezuela: {
      type: "boolean",
      displayName: "Show Venezuela",
      defaultValue: false,
    },
    venezuelaName: {
      type: "string",
      displayName: "Venezuela - Name",
      defaultValue: "Venezuela",
    },
    venezuelaPopulation: {
      type: "string",
      displayName: "Venezuela - Population",
      defaultValue: "28M",
    },
    venezuelaChristianPercent: {
      type: "string",
      displayName: "Venezuela - Christian %",
      defaultValue: "96%",
    },
    venezuelaImage: {
      type: "imageUrl",
      displayName: "Venezuela - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    venezuelaMinistryTypes: {
      type: "object",
      displayName: "Venezuela - Ministry Types",
      defaultValue: ["future"],
    },
    venezuelaLearnMoreUrl: {
      type: "string",
      displayName: "Venezuela - Learn More URL",
      defaultValue: "",
    },

    // Chile
    showChile: {
      type: "boolean",
      displayName: "Show Chile",
      defaultValue: false,
    },
    chileName: {
      type: "string",
      displayName: "Chile - Name",
      defaultValue: "Chile",
    },
    chilePopulation: {
      type: "string",
      displayName: "Chile - Population",
      defaultValue: "19M",
    },
    chileChristianPercent: {
      type: "string",
      displayName: "Chile - Christian %",
      defaultValue: "88%",
    },
    chileImage: {
      type: "imageUrl",
      displayName: "Chile - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    chileMinistryTypes: {
      type: "object",
      displayName: "Chile - Ministry Types",
      defaultValue: ["future"],
    },
    chileLearnMoreUrl: {
      type: "string",
      displayName: "Chile - Learn More URL",
      defaultValue: "",
    },

    // Ecuador
    showEcuador: {
      type: "boolean",
      displayName: "Show Ecuador",
      defaultValue: false,
    },
    ecuadorName: {
      type: "string",
      displayName: "Ecuador - Name",
      defaultValue: "Ecuador",
    },
    ecuadorPopulation: {
      type: "string",
      displayName: "Ecuador - Population",
      defaultValue: "18M",
    },
    ecuadorChristianPercent: {
      type: "string",
      displayName: "Ecuador - Christian %",
      defaultValue: "94%",
    },
    ecuadorImage: {
      type: "imageUrl",
      displayName: "Ecuador - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    ecuadorMinistryTypes: {
      type: "object",
      displayName: "Ecuador - Ministry Types",
      defaultValue: ["future"],
    },
    ecuadorLearnMoreUrl: {
      type: "string",
      displayName: "Ecuador - Learn More URL",
      defaultValue: "",
    },

    // Bolivia
    showBolivia: {
      type: "boolean",
      displayName: "Show Bolivia",
      defaultValue: false,
    },
    boliviaName: {
      type: "string",
      displayName: "Bolivia - Name",
      defaultValue: "Bolivia",
    },
    boliviaPopulation: {
      type: "string",
      displayName: "Bolivia - Population",
      defaultValue: "12M",
    },
    boliviaChristianPercent: {
      type: "string",
      displayName: "Bolivia - Christian %",
      defaultValue: "96%",
    },
    boliviaImage: {
      type: "imageUrl",
      displayName: "Bolivia - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    boliviaMinistryTypes: {
      type: "object",
      displayName: "Bolivia - Ministry Types",
      defaultValue: ["future"],
    },
    boliviaLearnMoreUrl: {
      type: "string",
      displayName: "Bolivia - Learn More URL",
      defaultValue: "",
    },

    // Paraguay
    showParaguay: {
      type: "boolean",
      displayName: "Show Paraguay",
      defaultValue: false,
    },
    paraguayName: {
      type: "string",
      displayName: "Paraguay - Name",
      defaultValue: "Paraguay",
    },
    paraguayPopulation: {
      type: "string",
      displayName: "Paraguay - Population",
      defaultValue: "7M",
    },
    paraguayChristianPercent: {
      type: "string",
      displayName: "Paraguay - Christian %",
      defaultValue: "96%",
    },
    paraguayImage: {
      type: "imageUrl",
      displayName: "Paraguay - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    paraguayMinistryTypes: {
      type: "object",
      displayName: "Paraguay - Ministry Types",
      defaultValue: ["future"],
    },
    paraguayLearnMoreUrl: {
      type: "string",
      displayName: "Paraguay - Learn More URL",
      defaultValue: "",
    },

    // Uruguay
    showUruguay: {
      type: "boolean",
      displayName: "Show Uruguay",
      defaultValue: false,
    },
    uruguayName: {
      type: "string",
      displayName: "Uruguay - Name",
      defaultValue: "Uruguay",
    },
    uruguayPopulation: {
      type: "string",
      displayName: "Uruguay - Population",
      defaultValue: "3.5M",
    },
    uruguayChristianPercent: {
      type: "string",
      displayName: "Uruguay - Christian %",
      defaultValue: "58%",
    },
    uruguayImage: {
      type: "imageUrl",
      displayName: "Uruguay - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    uruguayMinistryTypes: {
      type: "object",
      displayName: "Uruguay - Ministry Types",
      defaultValue: ["future"],
    },
    uruguayLearnMoreUrl: {
      type: "string",
      displayName: "Uruguay - Learn More URL",
      defaultValue: "",
    },

    // Nicaragua
    showNicaragua: {
      type: "boolean",
      displayName: "Show Nicaragua",
      defaultValue: false,
    },
    nicaraguaName: {
      type: "string",
      displayName: "Nicaragua - Name",
      defaultValue: "Nicaragua",
    },
    nicaraguaPopulation: {
      type: "string",
      displayName: "Nicaragua - Population",
      defaultValue: "6.8M",
    },
    nicaraguaChristianPercent: {
      type: "string",
      displayName: "Nicaragua - Christian %",
      defaultValue: "95%",
    },
    nicaraguaImage: {
      type: "imageUrl",
      displayName: "Nicaragua - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    nicaraguaMinistryTypes: {
      type: "object",
      displayName: "Nicaragua - Ministry Types",
      defaultValue: ["future"],
    },
    nicaraguaLearnMoreUrl: {
      type: "string",
      displayName: "Nicaragua - Learn More URL",
      defaultValue: "",
    },

    // Costa Rica
    showCostaRica: {
      type: "boolean",
      displayName: "Show Costa Rica",
      defaultValue: false,
    },
    costaRicaName: {
      type: "string",
      displayName: "Costa Rica - Name",
      defaultValue: "Costa Rica",
    },
    costaRicaPopulation: {
      type: "string",
      displayName: "Costa Rica - Population",
      defaultValue: "5.2M",
    },
    costaRicaChristianPercent: {
      type: "string",
      displayName: "Costa Rica - Christian %",
      defaultValue: "90%",
    },
    costaRicaImage: {
      type: "imageUrl",
      displayName: "Costa Rica - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    costaRicaMinistryTypes: {
      type: "object",
      displayName: "Costa Rica - Ministry Types",
      defaultValue: ["future"],
    },
    costaRicaLearnMoreUrl: {
      type: "string",
      displayName: "Costa Rica - Learn More URL",
      defaultValue: "",
    },

    // Panama
    showPanama: {
      type: "boolean",
      displayName: "Show Panama",
      defaultValue: false,
    },
    panamaName: {
      type: "string",
      displayName: "Panama - Name",
      defaultValue: "Panama",
    },
    panamaPopulation: {
      type: "string",
      displayName: "Panama - Population",
      defaultValue: "4.4M",
    },
    panamaChristianPercent: {
      type: "string",
      displayName: "Panama - Christian %",
      defaultValue: "93%",
    },
    panamaImage: {
      type: "imageUrl",
      displayName: "Panama - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    panamaMinistryTypes: {
      type: "object",
      displayName: "Panama - Ministry Types",
      defaultValue: ["future"],
    },
    panamaLearnMoreUrl: {
      type: "string",
      displayName: "Panama - Learn More URL",
      defaultValue: "",
    },

    // Dominican Republic
    showDominicanRepublic: {
      type: "boolean",
      displayName: "Show Dominican Republic",
      defaultValue: false,
    },
    dominicanRepublicName: {
      type: "string",
      displayName: "Dominican Republic - Name",
      defaultValue: "Dominican Republic",
    },
    dominicanRepublicPopulation: {
      type: "string",
      displayName: "Dominican Republic - Population",
      defaultValue: "11M",
    },
    dominicanRepublicChristianPercent: {
      type: "string",
      displayName: "Dominican Republic - Christian %",
      defaultValue: "88%",
    },
    dominicanRepublicImage: {
      type: "imageUrl",
      displayName: "Dominican Republic - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    dominicanRepublicMinistryTypes: {
      type: "object",
      displayName: "Dominican Republic - Ministry Types",
      defaultValue: ["future"],
    },
    dominicanRepublicLearnMoreUrl: {
      type: "string",
      displayName: "Dominican Republic - Learn More URL",
      defaultValue: "",
    },

    // Cuba
    showCuba: {
      type: "boolean",
      displayName: "Show Cuba",
      defaultValue: false,
    },
    cubaName: {
      type: "string",
      displayName: "Cuba - Name",
      defaultValue: "Cuba",
    },
    cubaPopulation: {
      type: "string",
      displayName: "Cuba - Population",
      defaultValue: "11M",
    },
    cubaChristianPercent: {
      type: "string",
      displayName: "Cuba - Christian %",
      defaultValue: "60%",
    },
    cubaImage: {
      type: "imageUrl",
      displayName: "Cuba - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    cubaMinistryTypes: {
      type: "object",
      displayName: "Cuba - Ministry Types",
      defaultValue: ["future"],
    },
    cubaLearnMoreUrl: {
      type: "string",
      displayName: "Cuba - Learn More URL",
      defaultValue: "",
    },

    // Jamaica
    showJamaica: {
      type: "boolean",
      displayName: "Show Jamaica",
      defaultValue: false,
    },
    jamaicaName: {
      type: "string",
      displayName: "Jamaica - Name",
      defaultValue: "Jamaica",
    },
    jamaicaPopulation: {
      type: "string",
      displayName: "Jamaica - Population",
      defaultValue: "3M",
    },
    jamaicaChristianPercent: {
      type: "string",
      displayName: "Jamaica - Christian %",
      defaultValue: "77%",
    },
    jamaicaImage: {
      type: "imageUrl",
      displayName: "Jamaica - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    jamaicaMinistryTypes: {
      type: "object",
      displayName: "Jamaica - Ministry Types",
      defaultValue: ["future"],
    },
    jamaicaLearnMoreUrl: {
      type: "string",
      displayName: "Jamaica - Learn More URL",
      defaultValue: "",
    },

    // Trinidad and Tobago
    showTrinidadAndTobago: {
      type: "boolean",
      displayName: "Show Trinidad and Tobago",
      defaultValue: false,
    },
    trinidadAndTobagoName: {
      type: "string",
      displayName: "Trinidad and Tobago - Name",
      defaultValue: "Trinidad and Tobago",
    },
    trinidadAndTobagoPopulation: {
      type: "string",
      displayName: "Trinidad and Tobago - Population",
      defaultValue: "1.5M",
    },
    trinidadAndTobagoChristianPercent: {
      type: "string",
      displayName: "Trinidad and Tobago - Christian %",
      defaultValue: "65%",
    },
    trinidadAndTobagoImage: {
      type: "imageUrl",
      displayName: "Trinidad and Tobago - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    trinidadAndTobagoMinistryTypes: {
      type: "object",
      displayName: "Trinidad and Tobago - Ministry Types",
      defaultValue: ["future"],
    },
    trinidadAndTobagoLearnMoreUrl: {
      type: "string",
      displayName: "Trinidad and Tobago - Learn More URL",
      defaultValue: "",
    },

    // Russia
    showRussia: {
      type: "boolean",
      displayName: "Show Russia",
      defaultValue: false,
    },
    russiaName: {
      type: "string",
      displayName: "Russia - Name",
      defaultValue: "Russia",
    },
    russiaPopulation: {
      type: "string",
      displayName: "Russia - Population",
      defaultValue: "144M",
    },
    russiaChristianPercent: {
      type: "string",
      displayName: "Russia - Christian %",
      defaultValue: "73%",
    },
    russiaImage: {
      type: "imageUrl",
      displayName: "Russia - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    russiaMinistryTypes: {
      type: "object",
      displayName: "Russia - Ministry Types",
      defaultValue: ["future"],
    },
    russiaLearnMoreUrl: {
      type: "string",
      displayName: "Russia - Learn More URL",
      defaultValue: "",
    },

    // Poland
    showPoland: {
      type: "boolean",
      displayName: "Show Poland",
      defaultValue: false,
    },
    polandName: {
      type: "string",
      displayName: "Poland - Name",
      defaultValue: "Poland",
    },
    polandPopulation: {
      type: "string",
      displayName: "Poland - Population",
      defaultValue: "38M",
    },
    polandChristianPercent: {
      type: "string",
      displayName: "Poland - Christian %",
      defaultValue: "92%",
    },
    polandImage: {
      type: "imageUrl",
      displayName: "Poland - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    polandMinistryTypes: {
      type: "object",
      displayName: "Poland - Ministry Types",
      defaultValue: ["future"],
    },
    polandLearnMoreUrl: {
      type: "string",
      displayName: "Poland - Learn More URL",
      defaultValue: "",
    },

    // Romania
    showRomania: {
      type: "boolean",
      displayName: "Show Romania",
      defaultValue: false,
    },
    romaniaName: {
      type: "string",
      displayName: "Romania - Name",
      defaultValue: "Romania",
    },
    romaniaPopulation: {
      type: "string",
      displayName: "Romania - Population",
      defaultValue: "19M",
    },
    romaniaChristianPercent: {
      type: "string",
      displayName: "Romania - Christian %",
      defaultValue: "99%",
    },
    romaniaImage: {
      type: "imageUrl",
      displayName: "Romania - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    romaniaMinistryTypes: {
      type: "object",
      displayName: "Romania - Ministry Types",
      defaultValue: ["future"],
    },
    romaniaLearnMoreUrl: {
      type: "string",
      displayName: "Romania - Learn More URL",
      defaultValue: "",
    },

    // Czech Republic
    showCzechRepublic: {
      type: "boolean",
      displayName: "Show Czech Republic",
      defaultValue: false,
    },
    czechRepublicName: {
      type: "string",
      displayName: "Czech Republic - Name",
      defaultValue: "Czech Republic",
    },
    czechRepublicPopulation: {
      type: "string",
      displayName: "Czech Republic - Population",
      defaultValue: "10.5M",
    },
    czechRepublicChristianPercent: {
      type: "string",
      displayName: "Czech Republic - Christian %",
      defaultValue: "21%",
    },
    czechRepublicImage: {
      type: "imageUrl",
      displayName: "Czech Republic - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    czechRepublicMinistryTypes: {
      type: "object",
      displayName: "Czech Republic - Ministry Types",
      defaultValue: ["future"],
    },
    czechRepublicLearnMoreUrl: {
      type: "string",
      displayName: "Czech Republic - Learn More URL",
      defaultValue: "",
    },

    // Hungary
    showHungary: {
      type: "boolean",
      displayName: "Show Hungary",
      defaultValue: false,
    },
    hungaryName: {
      type: "string",
      displayName: "Hungary - Name",
      defaultValue: "Hungary",
    },
    hungaryPopulation: {
      type: "string",
      displayName: "Hungary - Population",
      defaultValue: "9.7M",
    },
    hungaryChristianPercent: {
      type: "string",
      displayName: "Hungary - Christian %",
      defaultValue: "67%",
    },
    hungaryImage: {
      type: "imageUrl",
      displayName: "Hungary - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    hungaryMinistryTypes: {
      type: "object",
      displayName: "Hungary - Ministry Types",
      defaultValue: ["future"],
    },
    hungaryLearnMoreUrl: {
      type: "string",
      displayName: "Hungary - Learn More URL",
      defaultValue: "",
    },

    // Belarus
    showBelarus: {
      type: "boolean",
      displayName: "Show Belarus",
      defaultValue: false,
    },
    belarusName: {
      type: "string",
      displayName: "Belarus - Name",
      defaultValue: "Belarus",
    },
    belarusPopulation: {
      type: "string",
      displayName: "Belarus - Population",
      defaultValue: "9.4M",
    },
    belarusChristianPercent: {
      type: "string",
      displayName: "Belarus - Christian %",
      defaultValue: "73%",
    },
    belarusImage: {
      type: "imageUrl",
      displayName: "Belarus - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    belarusMinistryTypes: {
      type: "object",
      displayName: "Belarus - Ministry Types",
      defaultValue: ["future"],
    },
    belarusLearnMoreUrl: {
      type: "string",
      displayName: "Belarus - Learn More URL",
      defaultValue: "",
    },

    // Bulgaria
    showBulgaria: {
      type: "boolean",
      displayName: "Show Bulgaria",
      defaultValue: false,
    },
    bulgariaName: {
      type: "string",
      displayName: "Bulgaria - Name",
      defaultValue: "Bulgaria",
    },
    bulgariaPopulation: {
      type: "string",
      displayName: "Bulgaria - Population",
      defaultValue: "6.9M",
    },
    bulgariaChristianPercent: {
      type: "string",
      displayName: "Bulgaria - Christian %",
      defaultValue: "82%",
    },
    bulgariaImage: {
      type: "imageUrl",
      displayName: "Bulgaria - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    bulgariaMinistryTypes: {
      type: "object",
      displayName: "Bulgaria - Ministry Types",
      defaultValue: ["future"],
    },
    bulgariaLearnMoreUrl: {
      type: "string",
      displayName: "Bulgaria - Learn More URL",
      defaultValue: "",
    },

    // Serbia
    showSerbia: {
      type: "boolean",
      displayName: "Show Serbia",
      defaultValue: false,
    },
    serbiaName: {
      type: "string",
      displayName: "Serbia - Name",
      defaultValue: "Serbia",
    },
    serbiaPopulation: {
      type: "string",
      displayName: "Serbia - Population",
      defaultValue: "6.9M",
    },
    serbiaChristianPercent: {
      type: "string",
      displayName: "Serbia - Christian %",
      defaultValue: "91%",
    },
    serbiaImage: {
      type: "imageUrl",
      displayName: "Serbia - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    serbiaMinistryTypes: {
      type: "object",
      displayName: "Serbia - Ministry Types",
      defaultValue: ["future"],
    },
    serbiaLearnMoreUrl: {
      type: "string",
      displayName: "Serbia - Learn More URL",
      defaultValue: "",
    },

    // Austria
    showAustria: {
      type: "boolean",
      displayName: "Show Austria",
      defaultValue: false,
    },
    austriaName: {
      type: "string",
      displayName: "Austria - Name",
      defaultValue: "Austria",
    },
    austriaPopulation: {
      type: "string",
      displayName: "Austria - Population",
      defaultValue: "9M",
    },
    austriaChristianPercent: {
      type: "string",
      displayName: "Austria - Christian %",
      defaultValue: "73%",
    },
    austriaImage: {
      type: "imageUrl",
      displayName: "Austria - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    austriaMinistryTypes: {
      type: "object",
      displayName: "Austria - Ministry Types",
      defaultValue: ["future"],
    },
    austriaLearnMoreUrl: {
      type: "string",
      displayName: "Austria - Learn More URL",
      defaultValue: "",
    },

    // Switzerland
    showSwitzerland: {
      type: "boolean",
      displayName: "Show Switzerland",
      defaultValue: false,
    },
    switzerlandName: {
      type: "string",
      displayName: "Switzerland - Name",
      defaultValue: "Switzerland",
    },
    switzerlandPopulation: {
      type: "string",
      displayName: "Switzerland - Population",
      defaultValue: "8.7M",
    },
    switzerlandChristianPercent: {
      type: "string",
      displayName: "Switzerland - Christian %",
      defaultValue: "67%",
    },
    switzerlandImage: {
      type: "imageUrl",
      displayName: "Switzerland - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    switzerlandMinistryTypes: {
      type: "object",
      displayName: "Switzerland - Ministry Types",
      defaultValue: ["future"],
    },
    switzerlandLearnMoreUrl: {
      type: "string",
      displayName: "Switzerland - Learn More URL",
      defaultValue: "",
    },

    // Netherlands
    showNetherlands: {
      type: "boolean",
      displayName: "Show Netherlands",
      defaultValue: false,
    },
    netherlandsName: {
      type: "string",
      displayName: "Netherlands - Name",
      defaultValue: "Netherlands",
    },
    netherlandsPopulation: {
      type: "string",
      displayName: "Netherlands - Population",
      defaultValue: "17.5M",
    },
    netherlandsChristianPercent: {
      type: "string",
      displayName: "Netherlands - Christian %",
      defaultValue: "43%",
    },
    netherlandsImage: {
      type: "imageUrl",
      displayName: "Netherlands - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    netherlandsMinistryTypes: {
      type: "object",
      displayName: "Netherlands - Ministry Types",
      defaultValue: ["future"],
    },
    netherlandsLearnMoreUrl: {
      type: "string",
      displayName: "Netherlands - Learn More URL",
      defaultValue: "",
    },

    // Belgium
    showBelgium: {
      type: "boolean",
      displayName: "Show Belgium",
      defaultValue: false,
    },
    belgiumName: {
      type: "string",
      displayName: "Belgium - Name",
      defaultValue: "Belgium",
    },
    belgiumPopulation: {
      type: "string",
      displayName: "Belgium - Population",
      defaultValue: "11.6M",
    },
    belgiumChristianPercent: {
      type: "string",
      displayName: "Belgium - Christian %",
      defaultValue: "60%",
    },
    belgiumImage: {
      type: "imageUrl",
      displayName: "Belgium - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    belgiumMinistryTypes: {
      type: "object",
      displayName: "Belgium - Ministry Types",
      defaultValue: ["future"],
    },
    belgiumLearnMoreUrl: {
      type: "string",
      displayName: "Belgium - Learn More URL",
      defaultValue: "",
    },

    // Greece
    showGreece: {
      type: "boolean",
      displayName: "Show Greece",
      defaultValue: false,
    },
    greeceName: {
      type: "string",
      displayName: "Greece - Name",
      defaultValue: "Greece",
    },
    greecePopulation: {
      type: "string",
      displayName: "Greece - Population",
      defaultValue: "10.7M",
    },
    greeceChristianPercent: {
      type: "string",
      displayName: "Greece - Christian %",
      defaultValue: "98%",
    },
    greeceImage: {
      type: "imageUrl",
      displayName: "Greece - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    greeceMinistryTypes: {
      type: "object",
      displayName: "Greece - Ministry Types",
      defaultValue: ["future"],
    },
    greeceLearnMoreUrl: {
      type: "string",
      displayName: "Greece - Learn More URL",
      defaultValue: "",
    },

    // Portugal
    showPortugal: {
      type: "boolean",
      displayName: "Show Portugal",
      defaultValue: false,
    },
    portugalName: {
      type: "string",
      displayName: "Portugal - Name",
      defaultValue: "Portugal",
    },
    portugalPopulation: {
      type: "string",
      displayName: "Portugal - Population",
      defaultValue: "10.3M",
    },
    portugalChristianPercent: {
      type: "string",
      displayName: "Portugal - Christian %",
      defaultValue: "84%",
    },
    portugalImage: {
      type: "imageUrl",
      displayName: "Portugal - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    portugalMinistryTypes: {
      type: "object",
      displayName: "Portugal - Ministry Types",
      defaultValue: ["future"],
    },
    portugalLearnMoreUrl: {
      type: "string",
      displayName: "Portugal - Learn More URL",
      defaultValue: "",
    },

    // Sweden
    showSweden: {
      type: "boolean",
      displayName: "Show Sweden",
      defaultValue: false,
    },
    swedenName: {
      type: "string",
      displayName: "Sweden - Name",
      defaultValue: "Sweden",
    },
    swedenPopulation: {
      type: "string",
      displayName: "Sweden - Population",
      defaultValue: "10.5M",
    },
    swedenChristianPercent: {
      type: "string",
      displayName: "Sweden - Christian %",
      defaultValue: "63%",
    },
    swedenImage: {
      type: "imageUrl",
      displayName: "Sweden - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    swedenMinistryTypes: {
      type: "object",
      displayName: "Sweden - Ministry Types",
      defaultValue: ["future"],
    },
    swedenLearnMoreUrl: {
      type: "string",
      displayName: "Sweden - Learn More URL",
      defaultValue: "",
    },

    // Norway
    showNorway: {
      type: "boolean",
      displayName: "Show Norway",
      defaultValue: false,
    },
    norwayName: {
      type: "string",
      displayName: "Norway - Name",
      defaultValue: "Norway",
    },
    norwayPopulation: {
      type: "string",
      displayName: "Norway - Population",
      defaultValue: "5.5M",
    },
    norwayChristianPercent: {
      type: "string",
      displayName: "Norway - Christian %",
      defaultValue: "82%",
    },
    norwayImage: {
      type: "imageUrl",
      displayName: "Norway - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    norwayMinistryTypes: {
      type: "object",
      displayName: "Norway - Ministry Types",
      defaultValue: ["future"],
    },
    norwayLearnMoreUrl: {
      type: "string",
      displayName: "Norway - Learn More URL",
      defaultValue: "",
    },

    // Denmark
    showDenmark: {
      type: "boolean",
      displayName: "Show Denmark",
      defaultValue: false,
    },
    denmarkName: {
      type: "string",
      displayName: "Denmark - Name",
      defaultValue: "Denmark",
    },
    denmarkPopulation: {
      type: "string",
      displayName: "Denmark - Population",
      defaultValue: "5.9M",
    },
    denmarkChristianPercent: {
      type: "string",
      displayName: "Denmark - Christian %",
      defaultValue: "75%",
    },
    denmarkImage: {
      type: "imageUrl",
      displayName: "Denmark - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    denmarkMinistryTypes: {
      type: "object",
      displayName: "Denmark - Ministry Types",
      defaultValue: ["future"],
    },
    denmarkLearnMoreUrl: {
      type: "string",
      displayName: "Denmark - Learn More URL",
      defaultValue: "",
    },

    // Finland
    showFinland: {
      type: "boolean",
      displayName: "Show Finland",
      defaultValue: false,
    },
    finlandName: {
      type: "string",
      displayName: "Finland - Name",
      defaultValue: "Finland",
    },
    finlandPopulation: {
      type: "string",
      displayName: "Finland - Population",
      defaultValue: "5.5M",
    },
    finlandChristianPercent: {
      type: "string",
      displayName: "Finland - Christian %",
      defaultValue: "70%",
    },
    finlandImage: {
      type: "imageUrl",
      displayName: "Finland - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    finlandMinistryTypes: {
      type: "object",
      displayName: "Finland - Ministry Types",
      defaultValue: ["future"],
    },
    finlandLearnMoreUrl: {
      type: "string",
      displayName: "Finland - Learn More URL",
      defaultValue: "",
    },

    // Ireland
    showIreland: {
      type: "boolean",
      displayName: "Show Ireland",
      defaultValue: false,
    },
    irelandName: {
      type: "string",
      displayName: "Ireland - Name",
      defaultValue: "Ireland",
    },
    irelandPopulation: {
      type: "string",
      displayName: "Ireland - Population",
      defaultValue: "5M",
    },
    irelandChristianPercent: {
      type: "string",
      displayName: "Ireland - Christian %",
      defaultValue: "78%",
    },
    irelandImage: {
      type: "imageUrl",
      displayName: "Ireland - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    irelandMinistryTypes: {
      type: "object",
      displayName: "Ireland - Ministry Types",
      defaultValue: ["future"],
    },
    irelandLearnMoreUrl: {
      type: "string",
      displayName: "Ireland - Learn More URL",
      defaultValue: "",
    },

    // New Zealand
    showNewZealand: {
      type: "boolean",
      displayName: "Show New Zealand",
      defaultValue: false,
    },
    newZealandName: {
      type: "string",
      displayName: "New Zealand - Name",
      defaultValue: "New Zealand",
    },
    newZealandPopulation: {
      type: "string",
      displayName: "New Zealand - Population",
      defaultValue: "5.1M",
    },
    newZealandChristianPercent: {
      type: "string",
      displayName: "New Zealand - Christian %",
      defaultValue: "37%",
    },
    newZealandImage: {
      type: "imageUrl",
      displayName: "New Zealand - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    newZealandMinistryTypes: {
      type: "object",
      displayName: "New Zealand - Ministry Types",
      defaultValue: ["future"],
    },
    newZealandLearnMoreUrl: {
      type: "string",
      displayName: "New Zealand - Learn More URL",
      defaultValue: "",
    },

    // Australia
    showAustralia: {
      type: "boolean",
      displayName: "Show Australia",
      defaultValue: false,
    },
    australiaName: {
      type: "string",
      displayName: "Australia - Name",
      defaultValue: "Australia",
    },
    australiaPopulation: {
      type: "string",
      displayName: "Australia - Population",
      defaultValue: "26M",
    },
    australiaChristianPercent: {
      type: "string",
      displayName: "Australia - Christian %",
      defaultValue: "44%",
    },
    australiaImage: {
      type: "imageUrl",
      displayName: "Australia - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    australiaMinistryTypes: {
      type: "object",
      displayName: "Australia - Ministry Types",
      defaultValue: ["future"],
    },
    australiaLearnMoreUrl: {
      type: "string",
      displayName: "Australia - Learn More URL",
      defaultValue: "",
    },

    // Papua New Guinea
    showPapuaNewGuinea: {
      type: "boolean",
      displayName: "Show Papua New Guinea",
      defaultValue: false,
    },
    papuaNewGuineaName: {
      type: "string",
      displayName: "Papua New Guinea - Name",
      defaultValue: "Papua New Guinea",
    },
    papuaNewGuineaPopulation: {
      type: "string",
      displayName: "Papua New Guinea - Population",
      defaultValue: "9.1M",
    },
    papuaNewGuineaChristianPercent: {
      type: "string",
      displayName: "Papua New Guinea - Christian %",
      defaultValue: "96%",
    },
    papuaNewGuineaImage: {
      type: "imageUrl",
      displayName: "Papua New Guinea - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    papuaNewGuineaMinistryTypes: {
      type: "object",
      displayName: "Papua New Guinea - Ministry Types",
      defaultValue: ["future"],
    },
    papuaNewGuineaLearnMoreUrl: {
      type: "string",
      displayName: "Papua New Guinea - Learn More URL",
      defaultValue: "",
    },

    // Fiji
    showFiji: {
      type: "boolean",
      displayName: "Show Fiji",
      defaultValue: false,
    },
    fijiName: {
      type: "string",
      displayName: "Fiji - Name",
      defaultValue: "Fiji",
    },
    fijiPopulation: {
      type: "string",
      displayName: "Fiji - Population",
      defaultValue: "0.9M",
    },
    fijiChristianPercent: {
      type: "string",
      displayName: "Fiji - Christian %",
      defaultValue: "64%",
    },
    fijiImage: {
      type: "imageUrl",
      displayName: "Fiji - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    fijiMinistryTypes: {
      type: "object",
      displayName: "Fiji - Ministry Types",
      defaultValue: ["future"],
    },
    fijiLearnMoreUrl: {
      type: "string",
      displayName: "Fiji - Learn More URL",
      defaultValue: "",
    },

    // Malaysia
    showMalaysia: {
      type: "boolean",
      displayName: "Show Malaysia",
      defaultValue: false,
    },
    malaysiaName: {
      type: "string",
      displayName: "Malaysia - Name",
      defaultValue: "Malaysia",
    },
    malaysiaPopulation: {
      type: "string",
      displayName: "Malaysia - Population",
      defaultValue: "33M",
    },
    malaysiaChristianPercent: {
      type: "string",
      displayName: "Malaysia - Christian %",
      defaultValue: "9%",
    },
    malaysiaImage: {
      type: "imageUrl",
      displayName: "Malaysia - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    malaysiaMinistryTypes: {
      type: "object",
      displayName: "Malaysia - Ministry Types",
      defaultValue: ["future"],
    },
    malaysiaLearnMoreUrl: {
      type: "string",
      displayName: "Malaysia - Learn More URL",
      defaultValue: "",
    },

    // Singapore
    showSingapore: {
      type: "boolean",
      displayName: "Show Singapore",
      defaultValue: false,
    },
    singaporeName: {
      type: "string",
      displayName: "Singapore - Name",
      defaultValue: "Singapore",
    },
    singaporePopulation: {
      type: "string",
      displayName: "Singapore - Population",
      defaultValue: "5.9M",
    },
    singaporeChristianPercent: {
      type: "string",
      displayName: "Singapore - Christian %",
      defaultValue: "19%",
    },
    singaporeImage: {
      type: "imageUrl",
      displayName: "Singapore - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    singaporeMinistryTypes: {
      type: "object",
      displayName: "Singapore - Ministry Types",
      defaultValue: ["future"],
    },
    singaporeLearnMoreUrl: {
      type: "string",
      displayName: "Singapore - Learn More URL",
      defaultValue: "",
    },

    // Cambodia
    showCambodia: {
      type: "boolean",
      displayName: "Show Cambodia",
      defaultValue: false,
    },
    cambodiaName: {
      type: "string",
      displayName: "Cambodia - Name",
      defaultValue: "Cambodia",
    },
    cambodiaPopulation: {
      type: "string",
      displayName: "Cambodia - Population",
      defaultValue: "17M",
    },
    cambodiaChristianPercent: {
      type: "string",
      displayName: "Cambodia - Christian %",
      defaultValue: "2%",
    },
    cambodiaImage: {
      type: "imageUrl",
      displayName: "Cambodia - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    cambodiaMinistryTypes: {
      type: "object",
      displayName: "Cambodia - Ministry Types",
      defaultValue: ["future"],
    },
    cambodiaLearnMoreUrl: {
      type: "string",
      displayName: "Cambodia - Learn More URL",
      defaultValue: "",
    },

    // Laos
    showLaos: {
      type: "boolean",
      displayName: "Show Laos",
      defaultValue: false,
    },
    laosName: {
      type: "string",
      displayName: "Laos - Name",
      defaultValue: "Laos",
    },
    laosPopulation: {
      type: "string",
      displayName: "Laos - Population",
      defaultValue: "7.5M",
    },
    laosChristianPercent: {
      type: "string",
      displayName: "Laos - Christian %",
      defaultValue: "2%",
    },
    laosImage: {
      type: "imageUrl",
      displayName: "Laos - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    laosMinistryTypes: {
      type: "object",
      displayName: "Laos - Ministry Types",
      defaultValue: ["future"],
    },
    laosLearnMoreUrl: {
      type: "string",
      displayName: "Laos - Learn More URL",
      defaultValue: "",
    },

    // Mongolia
    showMongolia: {
      type: "boolean",
      displayName: "Show Mongolia",
      defaultValue: false,
    },
    mongoliaName: {
      type: "string",
      displayName: "Mongolia - Name",
      defaultValue: "Mongolia",
    },
    mongoliaPopulation: {
      type: "string",
      displayName: "Mongolia - Population",
      defaultValue: "3.4M",
    },
    mongoliaChristianPercent: {
      type: "string",
      displayName: "Mongolia - Christian %",
      defaultValue: "2%",
    },
    mongoliaImage: {
      type: "imageUrl",
      displayName: "Mongolia - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    mongoliaMinistryTypes: {
      type: "object",
      displayName: "Mongolia - Ministry Types",
      defaultValue: ["future"],
    },
    mongoliaLearnMoreUrl: {
      type: "string",
      displayName: "Mongolia - Learn More URL",
      defaultValue: "",
    },

    // Mongolia
    showPalestine: {
      type: "boolean",
      displayName: "Show Palestinian Territories",
      defaultValue: false,
    },
    palestineName: {
      type: "string",
      displayName: "Palestinian Territories - Name",
      defaultValue: "Palestinian Territories",
    },
    palestinePopulation: {
      type: "string",
      displayName: "Palestinian Territories - Population",
      defaultValue: "3.4M",
    },
    palestineChristianPercent: {
      type: "string",
      displayName: "Palestinian Territories - Christian %",
      defaultValue: "2%",
    },
    palestineImage: {
      type: "imageUrl",
      displayName: "Palestinian Territories - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    palestineMinistryTypes: {
      type: "object",
      displayName: "Palestinian Territories - Ministry Types",
      defaultValue: ["future"],
    },
    palestineLearnMoreUrl: {
      type: "string",
      displayName: "Palestinain Territories - Learn More URL",
      defaultValue: "",
    },

    // Nepal
    showNepal: {
      type: "boolean",
      displayName: "Show Nepal",
      defaultValue: false,
    },
    nepalName: {
      type: "string",
      displayName: "Nepal - Name",
      defaultValue: "Nepal",
    },
    nepalPopulation: {
      type: "string",
      displayName: "Nepal - Population",
      defaultValue: "30M",
    },
    nepalChristianPercent: {
      type: "string",
      displayName: "Nepal - Christian %",
      defaultValue: "1.4%",
    },
    nepalImage: {
      type: "imageUrl",
      displayName: "Nepal - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    nepalMinistryTypes: {
      type: "object",
      displayName: "Nepal - Ministry Types",
      defaultValue: ["future"],
    },
    nepalLearnMoreUrl: {
      type: "string",
      displayName: "Nepal - Learn More URL",
      defaultValue: "",
    },

    // Sri Lanka
    showSriLanka: {
      type: "boolean",
      displayName: "Show Sri Lanka",
      defaultValue: false,
    },
    sriLankaName: {
      type: "string",
      displayName: "Sri Lanka - Name",
      defaultValue: "Sri Lanka",
    },
    sriLankaPopulation: {
      type: "string",
      displayName: "Sri Lanka - Population",
      defaultValue: "22M",
    },
    sriLankaChristianPercent: {
      type: "string",
      displayName: "Sri Lanka - Christian %",
      defaultValue: "7%",
    },
    sriLankaImage: {
      type: "imageUrl",
      displayName: "Sri Lanka - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    sriLankaMinistryTypes: {
      type: "object",
      displayName: "Sri Lanka - Ministry Types",
      defaultValue: ["future"],
    },
    sriLankaLearnMoreUrl: {
      type: "string",
      displayName: "Sri Lanka - Learn More URL",
      defaultValue: "",
    },

    // Kazakhstan
    showKazakhstan: {
      type: "boolean",
      displayName: "Show Kazakhstan",
      defaultValue: false,
    },
    kazakhstanName: {
      type: "string",
      displayName: "Kazakhstan - Name",
      defaultValue: "Kazakhstan",
    },
    kazakhstanPopulation: {
      type: "string",
      displayName: "Kazakhstan - Population",
      defaultValue: "19M",
    },
    kazakhstanChristianPercent: {
      type: "string",
      displayName: "Kazakhstan - Christian %",
      defaultValue: "26%",
    },
    kazakhstanImage: {
      type: "imageUrl",
      displayName: "Kazakhstan - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    kazakhstanMinistryTypes: {
      type: "object",
      displayName: "Kazakhstan - Ministry Types",
      defaultValue: ["future"],
    },
    kazakhstanLearnMoreUrl: {
      type: "string",
      displayName: "Kazakhstan - Learn More URL",
      defaultValue: "",
    },

    // Uzbekistan
    showUzbekistan: {
      type: "boolean",
      displayName: "Show Uzbekistan",
      defaultValue: false,
    },
    uzbekistanName: {
      type: "string",
      displayName: "Uzbekistan - Name",
      defaultValue: "Uzbekistan",
    },
    uzbekistanPopulation: {
      type: "string",
      displayName: "Uzbekistan - Population",
      defaultValue: "34M",
    },
    uzbekistanChristianPercent: {
      type: "string",
      displayName: "Uzbekistan - Christian %",
      defaultValue: "2%",
    },
    uzbekistanImage: {
      type: "imageUrl",
      displayName: "Uzbekistan - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    uzbekistanMinistryTypes: {
      type: "object",
      displayName: "Uzbekistan - Ministry Types",
      defaultValue: ["future"],
    },
    uzbekistanLearnMoreUrl: {
      type: "string",
      displayName: "Uzbekistan - Learn More URL",
      defaultValue: "",
    },

    // Tajikistan
    showTajikistan: {
      type: "boolean",
      displayName: "Show Tajikistan",
      defaultValue: false,
    },
    tajikistanName: {
      type: "string",
      displayName: "Tajikistan - Name",
      defaultValue: "Tajikistan",
    },
    tajikistanPopulation: {
      type: "string",
      displayName: "Tajikistan - Population",
      defaultValue: "9.8M",
    },
    tajikistanChristianPercent: {
      type: "string",
      displayName: "Tajikistan - Christian %",
      defaultValue: "1%",
    },
    tajikistanImage: {
      type: "imageUrl",
      displayName: "Tajikistan - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    tajikistanMinistryTypes: {
      type: "object",
      displayName: "Tajikistan - Ministry Types",
      defaultValue: ["future"],
    },
    tajikistanLearnMoreUrl: {
      type: "string",
      displayName: "Tajikistan - Learn More URL",
      defaultValue: "",
    },

    // Kyrgyzstan
    showKyrgyzstan: {
      type: "boolean",
      displayName: "Show Kyrgyzstan",
      defaultValue: false,
    },
    kyrgyzstanName: {
      type: "string",
      displayName: "Kyrgyzstan - Name",
      defaultValue: "Kyrgyzstan",
    },
    kyrgyzstanPopulation: {
      type: "string",
      displayName: "Kyrgyzstan - Population",
      defaultValue: "6.7M",
    },
    kyrgyzstanChristianPercent: {
      type: "string",
      displayName: "Kyrgyzstan - Christian %",
      defaultValue: "11%",
    },
    kyrgyzstanImage: {
      type: "imageUrl",
      displayName: "Kyrgyzstan - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    kyrgyzstanMinistryTypes: {
      type: "object",
      displayName: "Kyrgyzstan - Ministry Types",
      defaultValue: ["future"],
    },
    kyrgyzstanLearnMoreUrl: {
      type: "string",
      displayName: "Kyrgyzstan - Learn More URL",
      defaultValue: "",
    },

    // Turkmenistan
    showTurkmenistan: {
      type: "boolean",
      displayName: "Show Turkmenistan",
      defaultValue: false,
    },
    turkmenistanName: {
      type: "string",
      displayName: "Turkmenistan - Name",
      defaultValue: "Turkmenistan",
    },
    turkmenistanPopulation: {
      type: "string",
      displayName: "Turkmenistan - Population",
      defaultValue: "6.2M",
    },
    turkmenistanChristianPercent: {
      type: "string",
      displayName: "Turkmenistan - Christian %",
      defaultValue: "9%",
    },
    turkmenistanImage: {
      type: "imageUrl",
      displayName: "Turkmenistan - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    turkmenistanMinistryTypes: {
      type: "object",
      displayName: "Turkmenistan - Ministry Types",
      defaultValue: ["future"],
    },
    turkmenistanLearnMoreUrl: {
      type: "string",
      displayName: "Turkmenistan - Learn More URL",
      defaultValue: "",
    },

    // Azerbaijan
    showAzerbaijan: {
      type: "boolean",
      displayName: "Show Azerbaijan",
      defaultValue: false,
    },
    azerbaijanName: {
      type: "string",
      displayName: "Azerbaijan - Name",
      defaultValue: "Azerbaijan",
    },
    azerbaijanPopulation: {
      type: "string",
      displayName: "Azerbaijan - Population",
      defaultValue: "10M",
    },
    azerbaijanChristianPercent: {
      type: "string",
      displayName: "Azerbaijan - Christian %",
      defaultValue: "3%",
    },
    azerbaijanImage: {
      type: "imageUrl",
      displayName: "Azerbaijan - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    azerbaijanMinistryTypes: {
      type: "object",
      displayName: "Azerbaijan - Ministry Types",
      defaultValue: ["future"],
    },
    azerbaijanLearnMoreUrl: {
      type: "string",
      displayName: "Azerbaijan - Learn More URL",
      defaultValue: "",
    },

    // Georgia
    showGeorgia: {
      type: "boolean",
      displayName: "Show Georgia",
      defaultValue: false,
    },
    georgiaName: {
      type: "string",
      displayName: "Georgia - Name",
      defaultValue: "Georgia",
    },
    georgiaPopulation: {
      type: "string",
      displayName: "Georgia - Population",
      defaultValue: "3.7M",
    },
    georgiaChristianPercent: {
      type: "string",
      displayName: "Georgia - Christian %",
      defaultValue: "88%",
    },
    georgiaImage: {
      type: "imageUrl",
      displayName: "Georgia - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    georgiaMinistryTypes: {
      type: "object",
      displayName: "Georgia - Ministry Types",
      defaultValue: ["future"],
    },
    georgiaLearnMoreUrl: {
      type: "string",
      displayName: "Georgia - Learn More URL",
      defaultValue: "",
    },

    // Armenia
    showArmenia: {
      type: "boolean",
      displayName: "Show Armenia",
      defaultValue: false,
    },
    armeniaName: {
      type: "string",
      displayName: "Armenia - Name",
      defaultValue: "Armenia",
    },
    armeniaPopulation: {
      type: "string",
      displayName: "Armenia - Population",
      defaultValue: "3M",
    },
    armeniaChristianPercent: {
      type: "string",
      displayName: "Armenia - Christian %",
      defaultValue: "95%",
    },
    armeniaImage: {
      type: "imageUrl",
      displayName: "Armenia - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    armeniaMinistryTypes: {
      type: "object",
      displayName: "Armenia - Ministry Types",
      defaultValue: ["future"],
    },
    armeniaLearnMoreUrl: {
      type: "string",
      displayName: "Armenia - Learn More URL",
      defaultValue: "",
    },

    // Jordan
    showJordan: {
      type: "boolean",
      displayName: "Show Jordan",
      defaultValue: false,
    },
    jordanName: {
      type: "string",
      displayName: "Jordan - Name",
      defaultValue: "Jordan",
    },
    jordanPopulation: {
      type: "string",
      displayName: "Jordan - Population",
      defaultValue: "10.3M",
    },
    jordanChristianPercent: {
      type: "string",
      displayName: "Jordan - Christian %",
      defaultValue: "2%",
    },
    jordanImage: {
      type: "imageUrl",
      displayName: "Jordan - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    jordanMinistryTypes: {
      type: "object",
      displayName: "Jordan - Ministry Types",
      defaultValue: ["arabic"],
    },
    jordanLearnMoreUrl: {
      type: "string",
      displayName: "Jordan - Learn More URL",
      defaultValue: "",
    },

    // Lebanon
    showLebanon: {
      type: "boolean",
      displayName: "Show Lebanon",
      defaultValue: false,
    },
    lebanonName: {
      type: "string",
      displayName: "Lebanon - Name",
      defaultValue: "Lebanon",
    },
    lebanonPopulation: {
      type: "string",
      displayName: "Lebanon - Population",
      defaultValue: "6.8M",
    },
    lebanonChristianPercent: {
      type: "string",
      displayName: "Lebanon - Christian %",
      defaultValue: "33%",
    },
    lebanonImage: {
      type: "imageUrl",
      displayName: "Lebanon - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    lebanonMinistryTypes: {
      type: "object",
      displayName: "Lebanon - Ministry Types",
      defaultValue: ["arabic"],
    },
    lebanonLearnMoreUrl: {
      type: "string",
      displayName: "Lebanon - Learn More URL",
      defaultValue: "",
    },

    // Oman
    showOman: {
      type: "boolean",
      displayName: "Show Oman",
      defaultValue: false,
    },
    omanName: {
      type: "string",
      displayName: "Oman - Name",
      defaultValue: "Oman",
    },
    omanPopulation: {
      type: "string",
      displayName: "Oman - Population",
      defaultValue: "5.2M",
    },
    omanChristianPercent: {
      type: "string",
      displayName: "Oman - Christian %",
      defaultValue: "3%",
    },
    omanImage: {
      type: "imageUrl",
      displayName: "Oman - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    omanMinistryTypes: {
      type: "object",
      displayName: "Oman - Ministry Types",
      defaultValue: ["arabic"],
    },
    omanLearnMoreUrl: {
      type: "string",
      displayName: "Oman - Learn More URL",
      defaultValue: "",
    },

    // Kuwait
    showKuwait: {
      type: "boolean",
      displayName: "Show Kuwait",
      defaultValue: false,
    },
    kuwaitName: {
      type: "string",
      displayName: "Kuwait - Name",
      defaultValue: "Kuwait",
    },
    kuwaitPopulation: {
      type: "string",
      displayName: "Kuwait - Population",
      defaultValue: "4.3M",
    },
    kuwaitChristianPercent: {
      type: "string",
      displayName: "Kuwait - Christian %",
      defaultValue: "18%",
    },
    kuwaitImage: {
      type: "imageUrl",
      displayName: "Kuwait - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    kuwaitMinistryTypes: {
      type: "object",
      displayName: "Kuwait - Ministry Types",
      defaultValue: ["arabic"],
    },
    kuwaitLearnMoreUrl: {
      type: "string",
      displayName: "Kuwait - Learn More URL",
      defaultValue: "",
    },

    // Qatar
    showQatar: {
      type: "boolean",
      displayName: "Show Qatar",
      defaultValue: false,
    },
    qatarName: {
      type: "string",
      displayName: "Qatar - Name",
      defaultValue: "Qatar",
    },
    qatarPopulation: {
      type: "string",
      displayName: "Qatar - Population",
      defaultValue: "2.9M",
    },
    qatarChristianPercent: {
      type: "string",
      displayName: "Qatar - Christian %",
      defaultValue: "14%",
    },
    qatarImage: {
      type: "imageUrl",
      displayName: "Qatar - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    qatarMinistryTypes: {
      type: "object",
      displayName: "Qatar - Ministry Types",
      defaultValue: ["arabic"],
    },
    qatarLearnMoreUrl: {
      type: "string",
      displayName: "Qatar - Learn More URL",
      defaultValue: "",
    },

    // UAE
    showUAE: {
      type: "boolean",
      displayName: "Show UAE",
      defaultValue: false,
    },
    uaeName: {
      type: "string",
      displayName: "UAE - Name",
      defaultValue: "United Arab Emirates",
    },
    uaePopulation: {
      type: "string",
      displayName: "UAE - Population",
      defaultValue: "10M",
    },
    uaeChristianPercent: {
      type: "string",
      displayName: "UAE - Christian %",
      defaultValue: "13%",
    },
    uaeImage: {
      type: "imageUrl",
      displayName: "UAE - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    uaeMinistryTypes: {
      type: "object",
      displayName: "UAE - Ministry Types",
      defaultValue: ["arabic"],
    },
    uaeLearnMoreUrl: {
      type: "string",
      displayName: "UAE - Learn More URL",
      defaultValue: "",
    },

    // Bahrain
    showBahrain: {
      type: "boolean",
      displayName: "Show Bahrain",
      defaultValue: false,
    },
    bahrainName: {
      type: "string",
      displayName: "Bahrain - Name",
      defaultValue: "Bahrain",
    },
    bahrainPopulation: {
      type: "string",
      displayName: "Bahrain - Population",
      defaultValue: "1.5M",
    },
    bahrainChristianPercent: {
      type: "string",
      displayName: "Bahrain - Christian %",
      defaultValue: "14%",
    },
    bahrainImage: {
      type: "imageUrl",
      displayName: "Bahrain - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    bahrainMinistryTypes: {
      type: "object",
      displayName: "Bahrain - Ministry Types",
      defaultValue: ["arabic"],
    },
    bahrainLearnMoreUrl: {
      type: "string",
      displayName: "Bahrain - Learn More URL",
      defaultValue: "",
    },

    // Libya
    showLibya: {
      type: "boolean",
      displayName: "Show Libya",
      defaultValue: false,
    },
    libyaName: {
      type: "string",
      displayName: "Libya - Name",
      defaultValue: "Libya",
    },
    libyaPopulation: {
      type: "string",
      displayName: "Libya - Population",
      defaultValue: "7M",
    },
    libyaChristianPercent: {
      type: "string",
      displayName: "Libya - Christian %",
      defaultValue: "3%",
    },
    libyaImage: {
      type: "imageUrl",
      displayName: "Libya - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    libyaMinistryTypes: {
      type: "object",
      displayName: "Libya - Ministry Types",
      defaultValue: ["arabic"],
    },
    libyaLearnMoreUrl: {
      type: "string",
      displayName: "Libya - Learn More URL",
      defaultValue: "",
    },

    // Tunisia
    showTunisia: {
      type: "boolean",
      displayName: "Show Tunisia",
      defaultValue: false,
    },
    tunisiaName: {
      type: "string",
      displayName: "Tunisia - Name",
      defaultValue: "Tunisia",
    },
    tunisiaPopulation: {
      type: "string",
      displayName: "Tunisia - Population",
      defaultValue: "12M",
    },
    tunisiaChristianPercent: {
      type: "string",
      displayName: "Tunisia - Christian %",
      defaultValue: "0.2%",
    },
    tunisiaImage: {
      type: "imageUrl",
      displayName: "Tunisia - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    tunisiaMinistryTypes: {
      type: "object",
      displayName: "Tunisia - Ministry Types",
      defaultValue: ["arabic"],
    },
    tunisiaLearnMoreUrl: {
      type: "string",
      displayName: "Tunisia - Learn More URL",
      defaultValue: "",
    },

    // Mauritania
    showMauritania: {
      type: "boolean",
      displayName: "Show Mauritania",
      defaultValue: false,
    },
    mauritaniaName: {
      type: "string",
      displayName: "Mauritania - Name",
      defaultValue: "Mauritania",
    },
    mauritaniaPopulation: {
      type: "string",
      displayName: "Mauritania - Population",
      defaultValue: "4.8M",
    },
    mauritaniaChristianPercent: {
      type: "string",
      displayName: "Mauritania - Christian %",
      defaultValue: "0.3%",
    },
    mauritaniaImage: {
      type: "imageUrl",
      displayName: "Mauritania - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    mauritaniaMinistryTypes: {
      type: "object",
      displayName: "Mauritania - Ministry Types",
      defaultValue: ["future"],
    },
    mauritaniaLearnMoreUrl: {
      type: "string",
      displayName: "Mauritania - Learn More URL",
      defaultValue: "",
    },

    // Niger
    showNiger: {
      type: "boolean",
      displayName: "Show Niger",
      defaultValue: false,
    },
    nigerName: {
      type: "string",
      displayName: "Niger - Name",
      defaultValue: "Niger",
    },
    nigerPopulation: {
      type: "string",
      displayName: "Niger - Population",
      defaultValue: "25M",
    },
    nigerChristianPercent: {
      type: "string",
      displayName: "Niger - Christian %",
      defaultValue: "1%",
    },
    nigerImage: {
      type: "imageUrl",
      displayName: "Niger - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    nigerMinistryTypes: {
      type: "object",
      displayName: "Niger - Ministry Types",
      defaultValue: ["future"],
    },
    nigerLearnMoreUrl: {
      type: "string",
      displayName: "Niger - Learn More URL",
      defaultValue: "",
    },

    // Benin
    showBenin: {
      type: "boolean",
      displayName: "Show Benin",
      defaultValue: false,
    },
    beninName: {
      type: "string",
      displayName: "Benin - Name",
      defaultValue: "Benin",
    },
    beninPopulation: {
      type: "string",
      displayName: "Benin - Population",
      defaultValue: "13M",
    },
    beninChristianPercent: {
      type: "string",
      displayName: "Benin - Christian %",
      defaultValue: "48%",
    },
    beninImage: {
      type: "imageUrl",
      displayName: "Benin - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    beninMinistryTypes: {
      type: "object",
      displayName: "Benin - Ministry Types",
      defaultValue: ["future"],
    },
    beninLearnMoreUrl: {
      type: "string",
      displayName: "Benin - Learn More URL",
      defaultValue: "",
    },

    // Togo
    showTogo: {
      type: "boolean",
      displayName: "Show Togo",
      defaultValue: false,
    },
    togoName: {
      type: "string",
      displayName: "Togo - Name",
      defaultValue: "Togo",
    },
    togoPopulation: {
      type: "string",
      displayName: "Togo - Population",
      defaultValue: "8.6M",
    },
    togoChristianPercent: {
      type: "string",
      displayName: "Togo - Christian %",
      defaultValue: "43%",
    },
    togoImage: {
      type: "imageUrl",
      displayName: "Togo - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    togoMinistryTypes: {
      type: "object",
      displayName: "Togo - Ministry Types",
      defaultValue: ["future"],
    },
    togoLearnMoreUrl: {
      type: "string",
      displayName: "Togo - Learn More URL",
      defaultValue: "",
    },

    // Sierra Leone
    showSierraLeone: {
      type: "boolean",
      displayName: "Show Sierra Leone",
      defaultValue: false,
    },
    sierraLeoneName: {
      type: "string",
      displayName: "Sierra Leone - Name",
      defaultValue: "Sierra Leone",
    },
    sierraLeonePopulation: {
      type: "string",
      displayName: "Sierra Leone - Population",
      defaultValue: "8.4M",
    },
    sierraLeoneChristianPercent: {
      type: "string",
      displayName: "Sierra Leone - Christian %",
      defaultValue: "21%",
    },
    sierraLeoneImage: {
      type: "imageUrl",
      displayName: "Sierra Leone - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    sierraLeoneMinistryTypes: {
      type: "object",
      displayName: "Sierra Leone - Ministry Types",
      defaultValue: ["future"],
    },
    sierraLeoneLearnMoreUrl: {
      type: "string",
      displayName: "Sierra Leone - Learn More URL",
      defaultValue: "",
    },

    // Liberia
    showLiberia: {
      type: "boolean",
      displayName: "Show Liberia",
      defaultValue: false,
    },
    liberiaName: {
      type: "string",
      displayName: "Liberia - Name",
      defaultValue: "Liberia",
    },
    liberiaPopulation: {
      type: "string",
      displayName: "Liberia - Population",
      defaultValue: "5.2M",
    },
    liberiaChristianPercent: {
      type: "string",
      displayName: "Liberia - Christian %",
      defaultValue: "86%",
    },
    liberiaImage: {
      type: "imageUrl",
      displayName: "Liberia - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    liberiaMinistryTypes: {
      type: "object",
      displayName: "Liberia - Ministry Types",
      defaultValue: ["future"],
    },
    liberiaLearnMoreUrl: {
      type: "string",
      displayName: "Liberia - Learn More URL",
      defaultValue: "",
    },

    // Guinea
    showGuinea: {
      type: "boolean",
      displayName: "Show Guinea",
      defaultValue: false,
    },
    guineaName: {
      type: "string",
      displayName: "Guinea - Name",
      defaultValue: "Guinea",
    },
    guineaPopulation: {
      type: "string",
      displayName: "Guinea - Population",
      defaultValue: "13.5M",
    },
    guineaChristianPercent: {
      type: "string",
      displayName: "Guinea - Christian %",
      defaultValue: "10%",
    },
    guineaImage: {
      type: "imageUrl",
      displayName: "Guinea - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    guineaMinistryTypes: {
      type: "object",
      displayName: "Guinea - Ministry Types",
      defaultValue: ["future"],
    },
    guineaLearnMoreUrl: {
      type: "string",
      displayName: "Guinea - Learn More URL",
      defaultValue: "",
    },

    // Ivory Coast
    showIvoryCoast: {
      type: "boolean",
      displayName: "Show Ivory Coast",
      defaultValue: false,
    },
    ivoryCoastName: {
      type: "string",
      displayName: "Ivory Coast - Name",
      defaultValue: "Ivory Coast",
    },
    ivoryCoastPopulation: {
      type: "string",
      displayName: "Ivory Coast - Population",
      defaultValue: "27M",
    },
    ivoryCoastChristianPercent: {
      type: "string",
      displayName: "Ivory Coast - Christian %",
      defaultValue: "44%",
    },
    ivoryCoastImage: {
      type: "imageUrl",
      displayName: "Ivory Coast - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    ivoryCoastMinistryTypes: {
      type: "object",
      displayName: "Ivory Coast - Ministry Types",
      defaultValue: ["future"],
    },
    ivoryCoastLearnMoreUrl: {
      type: "string",
      displayName: "Ivory Coast - Learn More URL",
      defaultValue: "",
    },

    // Gambia
    showGambia: {
      type: "boolean",
      displayName: "Show Gambia",
      defaultValue: false,
    },
    gambiaName: {
      type: "string",
      displayName: "Gambia - Name",
      defaultValue: "Gambia",
    },
    gambiaPopulation: {
      type: "string",
      displayName: "Gambia - Population",
      defaultValue: "2.5M",
    },
    gambiaChristianPercent: {
      type: "string",
      displayName: "Gambia - Christian %",
      defaultValue: "9%",
    },
    gambiaImage: {
      type: "imageUrl",
      displayName: "Gambia - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    gambiaMinistryTypes: {
      type: "object",
      displayName: "Gambia - Ministry Types",
      defaultValue: ["future"],
    },
    gambiaLearnMoreUrl: {
      type: "string",
      displayName: "Gambia - Learn More URL",
      defaultValue: "",
    },

    // Guinea-Bissau
    showGuineaBissau: {
      type: "boolean",
      displayName: "Show Guinea-Bissau",
      defaultValue: false,
    },
    guineaBissauName: {
      type: "string",
      displayName: "Guinea-Bissau - Name",
      defaultValue: "Guinea-Bissau",
    },
    guineaBissauPopulation: {
      type: "string",
      displayName: "Guinea-Bissau - Population",
      defaultValue: "2M",
    },
    guineaBissauChristianPercent: {
      type: "string",
      displayName: "Guinea-Bissau - Christian %",
      defaultValue: "19%",
    },
    guineaBissauImage: {
      type: "imageUrl",
      displayName: "Guinea-Bissau - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    guineaBissauMinistryTypes: {
      type: "object",
      displayName: "Guinea-Bissau - Ministry Types",
      defaultValue: ["future"],
    },
    guineaBissauLearnMoreUrl: {
      type: "string",
      displayName: "Guinea-Bissau - Learn More URL",
      defaultValue: "",
    },

    // Equatorial Guinea
    showEquatorialGuinea: {
      type: "boolean",
      displayName: "Show Equatorial Guinea",
      defaultValue: false,
    },
    equatorialGuineaName: {
      type: "string",
      displayName: "Equatorial Guinea - Name",
      defaultValue: "Equatorial Guinea",
    },
    equatorialGuineaPopulation: {
      type: "string",
      displayName: "Equatorial Guinea - Population",
      defaultValue: "1.5M",
    },
    equatorialGuineaChristianPercent: {
      type: "string",
      displayName: "Equatorial Guinea - Christian %",
      defaultValue: "88%",
    },
    equatorialGuineaImage: {
      type: "imageUrl",
      displayName: "Equatorial Guinea - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    equatorialGuineaMinistryTypes: {
      type: "object",
      displayName: "Equatorial Guinea - Ministry Types",
      defaultValue: ["future"],
    },
    equatorialGuineaLearnMoreUrl: {
      type: "string",
      displayName: "Equatorial Guinea - Learn More URL",
      defaultValue: "",
    },

    // Gabon
    showGabon: {
      type: "boolean",
      displayName: "Show Gabon",
      defaultValue: false,
    },
    gabonName: {
      type: "string",
      displayName: "Gabon - Name",
      defaultValue: "Gabon",
    },
    gabonPopulation: {
      type: "string",
      displayName: "Gabon - Population",
      defaultValue: "2.3M",
    },
    gabonChristianPercent: {
      type: "string",
      displayName: "Gabon - Christian %",
      defaultValue: "76%",
    },
    gabonImage: {
      type: "imageUrl",
      displayName: "Gabon - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    gabonMinistryTypes: {
      type: "object",
      displayName: "Gabon - Ministry Types",
      defaultValue: ["future"],
    },
    gabonLearnMoreUrl: {
      type: "string",
      displayName: "Gabon - Learn More URL",
      defaultValue: "",
    },

    // Congo
    showCongo: {
      type: "boolean",
      displayName: "Show Congo",
      defaultValue: false,
    },
    congoName: {
      type: "string",
      displayName: "Congo - Name",
      defaultValue: "Republic of Congo",
    },
    congoPopulation: {
      type: "string",
      displayName: "Congo - Population",
      defaultValue: "5.8M",
    },
    congoChristianPercent: {
      type: "string",
      displayName: "Congo - Christian %",
      defaultValue: "85%",
    },
    congoImage: {
      type: "imageUrl",
      displayName: "Congo - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    congoMinistryTypes: {
      type: "object",
      displayName: "Congo - Ministry Types",
      defaultValue: ["future"],
    },
    congoLearnMoreUrl: {
      type: "string",
      displayName: "Congo - Learn More URL",
      defaultValue: "",
    },

    // DRC
    showDRC: {
      type: "boolean",
      displayName: "Show DRC",
      defaultValue: false,
    },
    drcName: {
      type: "string",
      displayName: "DRC - Name",
      defaultValue: "Democratic Republic of Congo",
    },
    drcPopulation: {
      type: "string",
      displayName: "DRC - Population",
      defaultValue: "95M",
    },
    drcChristianPercent: {
      type: "string",
      displayName: "DRC - Christian %",
      defaultValue: "95%",
    },
    drcImage: {
      type: "imageUrl",
      displayName: "DRC - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    drcMinistryTypes: {
      type: "object",
      displayName: "DRC - Ministry Types",
      defaultValue: ["future"],
    },
    drcLearnMoreUrl: {
      type: "string",
      displayName: "DRC - Learn More URL",
      defaultValue: "",
    },

    // CAR
    showCAR: {
      type: "boolean",
      displayName: "Show CAR",
      defaultValue: false,
    },
    carName: {
      type: "string",
      displayName: "CAR - Name",
      defaultValue: "Central African Republic",
    },
    carPopulation: {
      type: "string",
      displayName: "CAR - Population",
      defaultValue: "5.5M",
    },
    carChristianPercent: {
      type: "string",
      displayName: "CAR - Christian %",
      defaultValue: "89%",
    },
    carImage: {
      type: "imageUrl",
      displayName: "CAR - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    carMinistryTypes: {
      type: "object",
      displayName: "CAR - Ministry Types",
      defaultValue: ["future"],
    },
    carLearnMoreUrl: {
      type: "string",
      displayName: "CAR - Learn More URL",
      defaultValue: "",
    },

    // South Sudan
    showSouthSudan: {
      type: "boolean",
      displayName: "Show South Sudan",
      defaultValue: false,
    },
    southSudanName: {
      type: "string",
      displayName: "South Sudan - Name",
      defaultValue: "South Sudan",
    },
    southSudanPopulation: {
      type: "string",
      displayName: "South Sudan - Population",
      defaultValue: "11M",
    },
    southSudanChristianPercent: {
      type: "string",
      displayName: "South Sudan - Christian %",
      defaultValue: "60%",
    },
    southSudanImage: {
      type: "imageUrl",
      displayName: "South Sudan - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    southSudanMinistryTypes: {
      type: "object",
      displayName: "South Sudan - Ministry Types",
      defaultValue: ["future"],
    },
    southSudanLearnMoreUrl: {
      type: "string",
      displayName: "South Sudan - Learn More URL",
      defaultValue: "",
    },

    // Eritrea
    showEritrea: {
      type: "boolean",
      displayName: "Show Eritrea",
      defaultValue: false,
    },
    eritreaName: {
      type: "string",
      displayName: "Eritrea - Name",
      defaultValue: "Eritrea",
    },
    eritreaPopulation: {
      type: "string",
      displayName: "Eritrea - Population",
      defaultValue: "3.6M",
    },
    eritreaChristianPercent: {
      type: "string",
      displayName: "Eritrea - Christian %",
      defaultValue: "63%",
    },
    eritreaImage: {
      type: "imageUrl",
      displayName: "Eritrea - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    eritreaMinistryTypes: {
      type: "object",
      displayName: "Eritrea - Ministry Types",
      defaultValue: ["future"],
    },
    eritreaLearnMoreUrl: {
      type: "string",
      displayName: "Eritrea - Learn More URL",
      defaultValue: "",
    },

    // Djibouti
    showDjibouti: {
      type: "boolean",
      displayName: "Show Djibouti",
      defaultValue: false,
    },
    djiboutiName: {
      type: "string",
      displayName: "Djibouti - Name",
      defaultValue: "Djibouti",
    },
    djiboutiPopulation: {
      type: "string",
      displayName: "Djibouti - Population",
      defaultValue: "1M",
    },
    djiboutiChristianPercent: {
      type: "string",
      displayName: "Djibouti - Christian %",
      defaultValue: "2%",
    },
    djiboutiImage: {
      type: "imageUrl",
      displayName: "Djibouti - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    djiboutiMinistryTypes: {
      type: "object",
      displayName: "Djibouti - Ministry Types",
      defaultValue: ["future"],
    },
    djiboutiLearnMoreUrl: {
      type: "string",
      displayName: "Djibouti - Learn More URL",
      defaultValue: "",
    },

    // Burundi
    showBurundi: {
      type: "boolean",
      displayName: "Show Burundi",
      defaultValue: false,
    },
    burundiName: {
      type: "string",
      displayName: "Burundi - Name",
      defaultValue: "Burundi",
    },
    burundiPopulation: {
      type: "string",
      displayName: "Burundi - Population",
      defaultValue: "12M",
    },
    burundiChristianPercent: {
      type: "string",
      displayName: "Burundi - Christian %",
      defaultValue: "93%",
    },
    burundiImage: {
      type: "imageUrl",
      displayName: "Burundi - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    burundiMinistryTypes: {
      type: "object",
      displayName: "Burundi - Ministry Types",
      defaultValue: ["future"],
    },
    burundiLearnMoreUrl: {
      type: "string",
      displayName: "Burundi - Learn More URL",
      defaultValue: "",
    },

    // Botswana
    showBotswana: {
      type: "boolean",
      displayName: "Show Botswana",
      defaultValue: false,
    },
    botswanaName: {
      type: "string",
      displayName: "Botswana - Name",
      defaultValue: "Botswana",
    },
    botswanaPopulation: {
      type: "string",
      displayName: "Botswana - Population",
      defaultValue: "2.4M",
    },
    botswanaChristianPercent: {
      type: "string",
      displayName: "Botswana - Christian %",
      defaultValue: "79%",
    },
    botswanaImage: {
      type: "imageUrl",
      displayName: "Botswana - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    botswanaMinistryTypes: {
      type: "object",
      displayName: "Botswana - Ministry Types",
      defaultValue: ["future"],
    },
    botswanaLearnMoreUrl: {
      type: "string",
      displayName: "Botswana - Learn More URL",
      defaultValue: "",
    },

    // Namibia
    showNamibia: {
      type: "boolean",
      displayName: "Show Namibia",
      defaultValue: false,
    },
    namibiaName: {
      type: "string",
      displayName: "Namibia - Name",
      defaultValue: "Namibia",
    },
    namibiaPopulation: {
      type: "string",
      displayName: "Namibia - Population",
      defaultValue: "2.6M",
    },
    namibiaChristianPercent: {
      type: "string",
      displayName: "Namibia - Christian %",
      defaultValue: "97%",
    },
    namibiaImage: {
      type: "imageUrl",
      displayName: "Namibia - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    namibiaMinistryTypes: {
      type: "object",
      displayName: "Namibia - Ministry Types",
      defaultValue: ["future"],
    },
    namibiaLearnMoreUrl: {
      type: "string",
      displayName: "Namibia - Learn More URL",
      defaultValue: "",
    },

    // Lesotho
    showLesotho: {
      type: "boolean",
      displayName: "Show Lesotho",
      defaultValue: false,
    },
    lesothoName: {
      type: "string",
      displayName: "Lesotho - Name",
      defaultValue: "Lesotho",
    },
    lesothoPopulation: {
      type: "string",
      displayName: "Lesotho - Population",
      defaultValue: "2.2M",
    },
    lesothoChristianPercent: {
      type: "string",
      displayName: "Lesotho - Christian %",
      defaultValue: "96%",
    },
    lesothoImage: {
      type: "imageUrl",
      displayName: "Lesotho - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    lesothoMinistryTypes: {
      type: "object",
      displayName: "Lesotho - Ministry Types",
      defaultValue: ["future"],
    },
    lesothoLearnMoreUrl: {
      type: "string",
      displayName: "Lesotho - Learn More URL",
      defaultValue: "",
    },

    // Eswatini
    showEswatini: {
      type: "boolean",
      displayName: "Show Eswatini",
      defaultValue: false,
    },
    eswatiniName: {
      type: "string",
      displayName: "Eswatini - Name",
      defaultValue: "Eswatini",
    },
    eswatiniPopulation: {
      type: "string",
      displayName: "Eswatini - Population",
      defaultValue: "1.2M",
    },
    eswatiniChristianPercent: {
      type: "string",
      displayName: "Eswatini - Christian %",
      defaultValue: "88%",
    },
    eswatiniImage: {
      type: "imageUrl",
      displayName: "Eswatini - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    eswatiniMinistryTypes: {
      type: "object",
      displayName: "Eswatini - Ministry Types",
      defaultValue: ["future"],
    },
    eswatiniLearnMoreUrl: {
      type: "string",
      displayName: "Eswatini - Learn More URL",
      defaultValue: "",
    },

    // Mauritius
    showMauritius: {
      type: "boolean",
      displayName: "Show Mauritius",
      defaultValue: false,
    },
    mauritiusName: {
      type: "string",
      displayName: "Mauritius - Name",
      defaultValue: "Mauritius",
    },
    mauritiusPopulation: {
      type: "string",
      displayName: "Mauritius - Population",
      defaultValue: "1.3M",
    },
    mauritiusChristianPercent: {
      type: "string",
      displayName: "Mauritius - Christian %",
      defaultValue: "32%",
    },
    mauritiusImage: {
      type: "imageUrl",
      displayName: "Mauritius - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    mauritiusMinistryTypes: {
      type: "object",
      displayName: "Mauritius - Ministry Types",
      defaultValue: ["future"],
    },
    mauritiusLearnMoreUrl: {
      type: "string",
      displayName: "Mauritius - Learn More URL",
      defaultValue: "",
    },

    // Comoros
    showComoros: {
      type: "boolean",
      displayName: "Show Comoros",
      defaultValue: false,
    },
    comorosName: {
      type: "string",
      displayName: "Comoros - Name",
      defaultValue: "Comoros",
    },
    comorosPopulation: {
      type: "string",
      displayName: "Comoros - Population",
      defaultValue: "0.9M",
    },
    comorosChristianPercent: {
      type: "string",
      displayName: "Comoros - Christian %",
      defaultValue: "1%",
    },
    comorosImage: {
      type: "imageUrl",
      displayName: "Comoros - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    comorosMinistryTypes: {
      type: "object",
      displayName: "Comoros - Ministry Types",
      defaultValue: ["future"],
    },
    comorosLearnMoreUrl: {
      type: "string",
      displayName: "Comoros - Learn More URL",
      defaultValue: "",
    },

    // Cape Verde
    showCapeVerde: {
      type: "boolean",
      displayName: "Show Cape Verde",
      defaultValue: false,
    },
    capeVerdeName: {
      type: "string",
      displayName: "Cape Verde - Name",
      defaultValue: "Cape Verde",
    },
    capeVerdePopulation: {
      type: "string",
      displayName: "Cape Verde - Population",
      defaultValue: "0.6M",
    },
    capeVerdeChristianPercent: {
      type: "string",
      displayName: "Cape Verde - Christian %",
      defaultValue: "89%",
    },
    capeVerdeImage: {
      type: "imageUrl",
      displayName: "Cape Verde - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    capeVerdeMinistryTypes: {
      type: "object",
      displayName: "Cape Verde - Ministry Types",
      defaultValue: ["future"],
    },
    capeVerdeLearnMoreUrl: {
      type: "string",
      displayName: "Cape Verde - Learn More URL",
      defaultValue: "",
    },

    // Sao Tome and Principe
    showSaoTomeAndPrincipe: {
      type: "boolean",
      displayName: "Show Sao Tome and Principe",
      defaultValue: false,
    },
    saoTomeAndPrincipeName: {
      type: "string",
      displayName: "Sao Tome and Principe - Name",
      defaultValue: "Sao Tome and Principe",
    },
    saoTomeAndPrincipePopulation: {
      type: "string",
      displayName: "Sao Tome and Principe - Population",
      defaultValue: "0.2M",
    },
    saoTomeAndPrincipeChristianPercent: {
      type: "string",
      displayName: "Sao Tome and Principe - Christian %",
      defaultValue: "82%",
    },
    saoTomeAndPrincipeImage: {
      type: "imageUrl",
      displayName: "Sao Tome and Principe - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    saoTomeAndPrincipeMinistryTypes: {
      type: "object",
      displayName: "Sao Tome and Principe - Ministry Types",
      defaultValue: ["future"],
    },
    saoTomeAndPrincipeLearnMoreUrl: {
      type: "string",
      displayName: "Sao Tome and Principe - Learn More URL",
      defaultValue: "",
    },

    // Seychelles
    showSeychelles: {
      type: "boolean",
      displayName: "Show Seychelles",
      defaultValue: false,
    },
    seychellesName: {
      type: "string",
      displayName: "Seychelles - Name",
      defaultValue: "Seychelles",
    },
    seychellesPopulation: {
      type: "string",
      displayName: "Seychelles - Population",
      defaultValue: "0.1M",
    },
    seychellesChristianPercent: {
      type: "string",
      displayName: "Seychelles - Christian %",
      defaultValue: "94%",
    },
    seychellesImage: {
      type: "imageUrl",
      displayName: "Seychelles - Image",
      defaultValue: "/placeholder.svg?height=200&width=300",
    },
    seychellesMinistryTypes: {
      type: "object",
      displayName: "Seychelles - Ministry Types",
      defaultValue: ["future"],
    },
    seychellesLearnMoreUrl: {
      type: "string",
      displayName: "Seychelles - Learn More URL",
      defaultValue: "",
    },
  },
  importPath: "./components/mission-map-page",
});


// Register the Testimonials Section component
PLASMIC.registerComponent(TestimonialsSection, {
  name: "TestimonialsSection",
  description: "A highly customizable testimonials and impact stories section for ministry organizations",
  props: {
    className: {
      type: "class",
      displayName: "Custom CSS Classes",
      description: "Additional CSS classes for custom styling and full bleed layouts",
    },
    
    // Layout Configuration
    layout: {
      type: "choice",
      displayName: "Layout Style",
      options: ["grid", "carousel", "masonry", "featured"],
      defaultValue: "grid",
      description: "Choose the layout style for testimonials display",
      section: "Layout",
    },
    columns: {
      type: "choice",
      displayName: "Grid Columns",
      options: [1, 2, 3, 4],
      defaultValue: 2,
      description: "Number of columns in grid layout",
      section: "Layout",
    },
    
    // Section Visibility
    showHeader: {
      type: "boolean",
      displayName: "Show Header Section",
      defaultValue: true,
      description: "Whether to display the header section with title and description",
      section: "Visibility",
    },
    showStats: {
      type: "boolean",
      displayName: "Show Statistics",
      defaultValue: true,
      description: "Whether to display the impact statistics section",
      section: "Visibility",
    },
    showCTA: {
      type: "boolean",
      displayName: "Show Call-to-Action",
      defaultValue: true,
      description: "Whether to display the call-to-action section at the bottom",
      section: "Visibility",
    },
    
    // Header Content
    headerTitle: {
      type: "string",
      displayName: "Header Title",
      defaultValue: "Stories of Impact",
      description: "Main title for the testimonials section",
      section: "Header Content",
    },
    headerSubtitle: {
      type: "string",
      displayName: "Header Subtitle",
      defaultValue: "Transforming Communities Worldwide",
      description: "Subtitle text displayed below the main title",
      section: "Header Content",
    },
    headerDescription: {
      type: "string",
      displayName: "Header Description",
      defaultValue: "See how Great Commission Media Ministries is partnering with local churches and organizations to share the Gospel through strategic media campaigns and compassionate outreach.",
      description: "Detailed description text for the header section",
      section: "Header Content",
    },
    
    stats: {
      type: "object",
      displayName: "Statistics Data",
      defaultValue: [
        { value: "45+", label: "Countries Reached" },
        { value: "2M+", label: "Lives Impacted" },
        { value: "500+", label: "Partner Churches" },
        { value: "25", label: "Years of Ministry" },
      ],
      description: "Array of statistics with value and label properties",
      section: "Statistics",
    },
    
    // Call-to-Action Content
    ctaTitle: {
      type: "string",
      displayName: "CTA Title",
      defaultValue: "Ready to Make an Impact?",
      description: "Title for the call-to-action section",
      section: "Call to Action",
    },
    ctaDescription: {
      type: "string",
      displayName: "CTA Description",
      defaultValue: "Join thousands of ministry leaders who are transforming their communities through strategic media ministry.",
      description: "Description text for the call-to-action section",
      section: "Call to Action",
    },
    ctaButtonText: {
      type: "string",
      displayName: "CTA Button Text",
      defaultValue: "Partner With Us",
      description: "Text displayed on the call-to-action button",
      section: "Call to Action",
    },
    ctaButtonUrl: {
      type: "string",
      displayName: "CTA Button URL",
      defaultValue: "#contact",
      description: "URL for the call-to-action button link",
      section: "Call to Action",
    },
    
    // Testimonies
    showTestimony1: {
      type: "boolean",
      displayName: "Show Testimony 1",
      defaultValue: true,
      section: "Testimony 1",
    },
    testimony1Name: {
      type: "string",
      displayName: "Name",
      defaultValue: "Sarah Chen",
      section: "Testimony 1",
      hidden: (props: any) => !props.showTestimony1,
    },
    testimony1Title: {
      type: "string",
      displayName: "Title",
      defaultValue: "Ministry Leader",
      section: "Testimony 1",
      hidden: (props: any) => !props.showTestimony1,
    },
    testimony1Organization: {
      type: "string",
      displayName: "Organization",
      defaultValue: "Hope Church International",
      section: "Testimony 1",
      hidden: (props: any) => !props.showTestimony1,
    },
    testimony1Location: {
      type: "string",
      displayName: "Location",
      defaultValue: "Singapore",
      section: "Testimony 1",
      hidden: (props: any) => !props.showTestimony1,
    },
    testimony1Quote: {
      type: "string",
      displayName: "Quote",
      defaultValue: "Through GCM's media campaigns, we've seen a 300% increase in engagement with our community outreach programs. Their strategic approach to digital ministry has transformed how we connect with people.",
      section: "Testimony 1",
      hidden: (props: any) => !props.showTestimony1,
    },
    testimony1Statistic: {
      type: "string",
      displayName: "Statistic",
      defaultValue: "300%",
      section: "Testimony 1",
      hidden: (props: any) => !props.showTestimony1,
    },
    testimony1StatisticLabel: {
      type: "string",
      displayName: "Statistic Label",
      defaultValue: "increase in engagement",
      section: "Testimony 1",
      hidden: (props: any) => !props.showTestimony1,
    },

    showTestimony2: {
      type: "boolean",
      displayName: "Show Testimony 2",
      defaultValue: true,
      section: "Testimony 2",
    },
    testimony2Name: {
      type: "string",
      displayName: "Name",
      defaultValue: "Pastor Michael Rodriguez",
      section: "Testimony 2",
      hidden: (props: any) => !props.showTestimony2,
    },
    testimony2Title: {
      type: "string",
      displayName: "Title",
      defaultValue: "Senior Pastor",
      section: "Testimony 2",
      hidden: (props: any) => !props.showTestimony2,
    },
    testimony2Organization: {
      type: "string",
      displayName: "Organization",
      defaultValue: "Nueva Vida Church",
      section: "Testimony 2",
      hidden: (props: any) => !props.showTestimony2,
    },
    testimony2Location: {
      type: "string",
      displayName: "Location",
      defaultValue: "Mexico City, Mexico",
      section: "Testimony 2",
      hidden: (props: any) => !props.showTestimony2,
    },
    testimony2Quote: {
      type: "string",
      displayName: "Quote",
      defaultValue: "The impact has been incredible. What once took months of planning now happens in weeks, and our message reaches thousands more people across Latin America.",
      section: "Testimony 2",
      hidden: (props: any) => !props.showTestimony2,
    },
    testimony2Statistic: {
      type: "string",
      displayName: "Statistic",
      defaultValue: "15,000+",
      section: "Testimony 2",
      hidden: (props: any) => !props.showTestimony2,
    },
    testimony2StatisticLabel: {
      type: "string",
      displayName: "Statistic Label",
      defaultValue: "people reached monthly",
      section: "Testimony 2",
      hidden: (props: any) => !props.showTestimony2,
    },

    showTestimony3: {
      type: "boolean",
      displayName: "Show Testimony 3",
      defaultValue: true,
      section: "Testimony 3",
    },
    testimony3Name: {
      type: "string",
      displayName: "Name",
      defaultValue: "Dr. Amara Okafor",
      section: "Testimony 3",
      hidden: (props: any) => !props.showTestimony3,
    },
    testimony3Title: {
      type: "string",
      displayName: "Title",
      defaultValue: "Director of Missions",
      section: "Testimony 3",
      hidden: (props: any) => !props.showTestimony3,
    },
    testimony3Organization: {
      type: "string",
      displayName: "Organization",
      defaultValue: "African Gospel Network",
      section: "Testimony 3",
      hidden: (props: any) => !props.showTestimony3,
    },
    testimony3Location: {
      type: "string",
      displayName: "Location",
      defaultValue: "Lagos, Nigeria",
      section: "Testimony 3",
      hidden: (props: any) => !props.showTestimony3,
    },
    testimony3Quote: {
      type: "string",
      displayName: "Quote",
      defaultValue: "GCM's culturally sensitive approach to media ministry has helped us share the Gospel effectively across 12 African nations. The results speak for themselves.",
      section: "Testimony 3",
      hidden: (props: any) => !props.showTestimony3,
    },
    testimony3Statistic: {
      type: "string",
      displayName: "Statistic",
      defaultValue: "12",
      section: "Testimony 3",
      hidden: (props: any) => !props.showTestimony3,
    },
    testimony3StatisticLabel: {
      type: "string",
      displayName: "Statistic Label",
      defaultValue: "nations impacted",
      section: "Testimony 3",
      hidden: (props: any) => !props.showTestimony3,
    },

    showTestimony4: {
      type: "boolean",
      displayName: "Show Testimony 4",
      defaultValue: true,
      section: "Testimony 4",
    },
    testimony4Name: {
      type: "string",
      displayName: "Name",
      defaultValue: "Rev. James Thompson",
      section: "Testimony 4",
      hidden: (props: any) => !props.showTestimony4,
    },
    testimony4Title: {
      type: "string",
      displayName: "Title",
      defaultValue: "Missionary",
      section: "Testimony 4",
      hidden: (props: any) => !props.showTestimony4,
    },
    testimony4Organization: {
      type: "string",
      displayName: "Organization",
      defaultValue: "Global Harvest Ministry",
      section: "Testimony 4",
      hidden: (props: any) => !props.showTestimony4,
    },
    testimony4Location: {
      type: "string",
      displayName: "Location",
      defaultValue: "Mumbai, India",
      section: "Testimony 4",
      hidden: (props: any) => !props.showTestimony4,
    },
    testimony4Quote: {
      type: "string",
      displayName: "Quote",
      defaultValue: "The training and resources provided have equipped our local teams to create compelling content that resonates with our communities. We've seen unprecedented growth.",
      section: "Testimony 4",
      hidden: (props: any) => !props.showTestimony4,
    },
    testimony4Statistic: {
      type: "string",
      displayName: "Statistic",
      defaultValue: "85%",
      section: "Testimony 4",
      hidden: (props: any) => !props.showTestimony4,
    },
    testimony4StatisticLabel: {
      type: "string",
      displayName: "Statistic Label",
      defaultValue: "growth in local participation",
      section: "Testimony 4",
      hidden: (props: any) => !props.showTestimony4,
    },
    
    // Colors
    backgroundColor: {
      type: "color",
      displayName: "Background Color",
      defaultValue: "#0f172a",
      description: "Color for section background",
      section: "Colors",
    },
    headerTextColor: {
      type: "color",
      displayName: "Header Text Color",
      defaultValue: "#ffffff",
      description: "Color for header text",
      section: "Colors",
    },
    cardBackgroundColor: {
      type: "color",
      displayName: "Card Background Color",
      defaultValue: "#1e293b",
      description: "Color for testimonial card background",
      section: "Colors",
    },
    cardTextColor: {
      type: "color",
      displayName: "Card Quote Text Color",
      defaultValue: "#f1f5f9",
      description: "Color for testimonial quote text",
      section: "Colors",
    },
    accentColor: {
      type: "color",
      displayName: "Accent Color",
      defaultValue: "#fbbf24",
      description: "Color for accent elements like statistics",
      section: "Colors",
    },
    borderColor: {
      type: "color",
      displayName: "Border Color",
      defaultValue: "#334155",
      description: "Color for card borders",
      section: "Colors",
    },
    nameColor: {
      type: "color",
      displayName: "Name Color",
      defaultValue: "#ffffff",
      description: "Color for person's name (e.g., Sarah Chen)",
      section: "Colors - Card Details",
    },
    titleColor: {
      type: "color",
      displayName: "Title Color",
      defaultValue: "#fbbf24",
      description: "Color for person's title (e.g., Ministry Leader)",
      section: "Colors - Card Details",
    },
    organizationColor: {
      type: "color",
      displayName: "Organization Color",
      defaultValue: "#94a3b8",
      description: "Color for organization name (e.g., Hope Church International)",
      section: "Colors - Card Details",
    },
    locationColor: {
      type: "color",
      displayName: "Location Color",
      defaultValue: "#64748b",
      description: "Color for location (e.g., Singapore)",
      section: "Colors - Card Details",
    },
    
    // Typography - Fonts
    headerFont: {
      type: "choice",
      displayName: "Header Font Family",
      options: [
        { value: "sans", label: "Sans Serif (System)" },
        { value: "serif", label: "Serif (Georgia)" },
        { value: "mono", label: "Monospace" },
        { value: "inter", label: "Inter" },
        { value: "roboto", label: "Roboto" },
        { value: "open-sans", label: "Open Sans" },
        { value: "lato", label: "Lato" },
        { value: "montserrat", label: "Montserrat" },
        { value: "poppins", label: "Poppins" },
        { value: "playfair", label: "Playfair Display" },
        { value: "merriweather", label: "Merriweather" },
      ],
      defaultValue: "sans",
      description: "Font family for headers",
      section: "Typography - Fonts",
    },
    bodyFont: {
      type: "choice",
      displayName: "Body Font Family",
      options: [
        { value: "sans", label: "Sans Serif (System)" },
        { value: "serif", label: "Serif (Georgia)" },
        { value: "mono", label: "Monospace" },
        { value: "inter", label: "Inter" },
        { value: "roboto", label: "Roboto" },
        { value: "open-sans", label: "Open Sans" },
        { value: "lato", label: "Lato" },
        { value: "montserrat", label: "Montserrat" },
        { value: "poppins", label: "Poppins" },
      ],
      defaultValue: "sans",
      description: "Font family for body text and quotes",
      section: "Typography - Fonts",
    },
    nameFont: {
      type: "choice",
      displayName: "Name Font Family",
      options: [
        { value: "sans", label: "Sans Serif (System)" },
        { value: "serif", label: "Serif (Georgia)" },
        { value: "mono", label: "Monospace" },
        { value: "inter", label: "Inter" },
        { value: "roboto", label: "Roboto" },
        { value: "open-sans", label: "Open Sans" },
        { value: "lato", label: "Lato" },
        { value: "montserrat", label: "Montserrat" },
        { value: "poppins", label: "Poppins" },
        { value: "playfair", label: "Playfair Display" },
        { value: "merriweather", label: "Merriweather" },
      ],
      defaultValue: "sans",
      description: "Font family for person names on cards",
      section: "Typography - Fonts",
    },
    
    // Typography - Sizes
    headerFontSize: {
      type: "number",
      displayName: "Header Font Size (px)",
      defaultValue: 48,
      description: "Font size for main header in pixels",
      section: "Typography - Sizes",
    },
    subtitleFontSize: {
      type: "number",
      displayName: "Subtitle Font Size (px)",
      defaultValue: 20,
      description: "Font size for subtitle text in pixels",
      section: "Typography - Sizes",
    },
    bodyFontSize: {
      type: "number",
      displayName: "Body Font Size (px)",
      defaultValue: 16,
      description: "Font size for body text in pixels",
      section: "Typography - Sizes",
    },
    cardTitleFontSize: {
      type: "number",
      displayName: "Card Name Font Size (px)",
      defaultValue: 18,
      description: "Font size for testimonial card names in pixels",
      section: "Typography - Sizes",
    },
    statValueFontSize: {
      type: "number",
      displayName: "Stat Value Font Size (px)",
      defaultValue: 36,
      description: "Font size for statistic values in pixels",
      section: "Typography - Sizes",
    },
    statLabelFontSize: {
      type: "number",
      displayName: "Stat Label Font Size (px)",
      defaultValue: 14,
      description: "Font size for statistic labels in pixels",
      section: "Typography - Sizes",
    },
    
    // Visual Elements
    showQuoteIcon: {
      type: "boolean",
      displayName: "Show Quote Icons",
      defaultValue: true,
      description: "Whether to display quote icons on testimonial cards",
      section: "Visual Elements",
    },
    showStatistics: {
      type: "boolean",
      displayName: "Show Individual Statistics",
      defaultValue: true,
      description: "Whether to display individual statistics on testimonial cards",
      section: "Visual Elements",
    },
    
    // Card Styling
    cardStyle: {
      type: "choice",
      displayName: "Card Style",
      options: ["minimal", "bordered", "shadow", "elevated"],
      defaultValue: "elevated",
      description: "Visual style for testimonial cards",
      section: "Card Style",
    },
    
    // Animation & Interaction
    enableHover: {
      type: "boolean",
      displayName: "Enable Hover Effects",
      defaultValue: true,
      description: "Whether to enable hover animations on cards",
      section: "Animation",
    },
    animationDelay: {
      type: "number",
      displayName: "Animation Delay (ms)",
      defaultValue: 0,
      description: "Delay before animations start in milliseconds",
      section: "Animation",
    },
  },
  importPath: "./components/testimonials-section",
});

PLASMIC.registerComponent(MinistriesSection, {
  name: "MinistriesSection",
  displayName: "Ministries Section",
  description: "Five ministry feature cards in a row with image, icon, title, description, and Learn More button",
  props: {
    sectionBgColor: {
      type: "string",
      displayName: "Section Background Color",
      defaultValue: "#ffffff",
    },
    sectionPaddingY: {
      type: "number",
      displayName: "Section Vertical Padding",
      defaultValue: 96,
    },
    card1Image: {
      type: "imageUrl",
      displayName: "Card 1 - Image",
      defaultValue: "/city-media-campaign-billboard.jpg",
    },
    card1Title: {
      type: "string",
      displayName: "Card 1 - Title",
      defaultValue: "Mega City Media Campaigns",
    },
    card1Description: {
      type: "string",
      displayName: "Card 1 - Description",
      defaultValue: "Help an entire city encounter the message of Christ.",
    },
    card1Link: {
      type: "string",
      displayName: "Card 1 - Learn More Link",
      defaultValue: "/megacitymediacampaigns",
    },
    card2Image: {
      type: "imageUrl",
      displayName: "Card 2 - Image",
      defaultValue: "/satellite-dish-broadcasting.jpg",
    },
    card2Title: {
      type: "string",
      displayName: "Card 2 - Title",
      defaultValue: "Satellite Media Outreach in the 10/40 Window",
    },
    card2Description: {
      type: "string",
      displayName: "Card 2 - Description",
      defaultValue: "Bring Gospel to seekers beyond ordinary access.",
    },
    card2Link: {
      type: "string",
      displayName: "Card 2 - Learn More Link",
      defaultValue: "/satellitemediaoutreach",
    },
    card3Image: {
      type: "imageUrl",
      displayName: "Card 3 - Image",
      defaultValue: "/humanitarian-aid-supplies.jpg",
    },
    card3Title: {
      type: "string",
      displayName: "Card 3 - Title",
      defaultValue: "Media Outreach in Ukraine",
    },
    card3Description: {
      type: "string",
      displayName: "Card 3 - Description",
      defaultValue: "Bring Gospel & trauma resources to people living through the war.",
    },
    card3Link: {
      type: "string",
      displayName: "Card 3 - Learn More Link",
      defaultValue: "/mediaoutreach",
    },
    card4Image: {
      type: "imageUrl",
      displayName: "Card 4 - Image",
      defaultValue: "/jerusalem-israel-ministry.jpg",
    },
    card4Title: {
      type: "string",
      displayName: "Card 4 - Title",
      defaultValue: "Jewish Ministry",
    },
    card4Description: {
      type: "string",
      displayName: "Card 4 - Description",
      defaultValue: "Bless the people of Israel through trauma resources, media, and compassionate care.",
    },
    card4Link: {
      type: "string",
      displayName: "Card 4 - Learn More Link",
      defaultValue: "/jewishministry",
    },
    card5Image: {
      type: "imageUrl",
      displayName: "Card 5 - Image",
      defaultValue: "/ukraine-aid-stoves.jpg",
    },
    card5Title: {
      type: "string",
      displayName: "Card 5 - Title",
      defaultValue: "UkraineAid",
    },
    card5Description: {
      type: "string",
      displayName: "Card 5 - Description",
      defaultValue: "Help families survive the realities of war with wood-burning stoves, medical supplies, and food.",
    },
    card5Link: {
      type: "string",
      displayName: "Card 5 - Learn More Link",
      defaultValue: "/ukraineaid",
    },
    cardBgColor: {
      type: "string",
      displayName: "Card Background Color",
      defaultValue: "#ffffff",
    },
    cardBorderColor: {
      type: "string",
      displayName: "Card Border Color",
      defaultValue: "#e5e7eb",
    },
    cardBorderRadius: {
      type: "string",
      displayName: "Card Border Radius",
      defaultValue: "0.5rem",
    },
    cardShadow: {
      type: "string",
      displayName: "Card Shadow",
      defaultValue: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    },
    cardHoverShadow: {
      type: "string",
      displayName: "Card Hover Shadow",
      defaultValue: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
    imageHeight: {
      type: "number",
      displayName: "Image Height (px)",
      defaultValue: 192,
    },
    showIcon: {
      type: "boolean",
      displayName: "Show Icon",
      defaultValue: true,
    },
    iconBgColor: {
      type: "string",
      displayName: "Icon Background Color",
      defaultValue: "#f1f5f9",
    },
    iconColor: {
      type: "string",
      displayName: "Icon Color",
      defaultValue: "#334155",
    },
    titleColor: {
      type: "string",
      displayName: "Title Color",
      defaultValue: "#0f172a",
    },
    titleSize: {
      type: "string",
      displayName: "Title Font Size",
      defaultValue: "18px",
    },
    descriptionColor: {
      type: "string",
      displayName: "Description Color",
      defaultValue: "#475569",
    },
    descriptionSize: {
      type: "string",
      displayName: "Description Font Size",
      defaultValue: "14px",
    },
    buttonBorderColor: {
      type: "string",
      displayName: "Button Border Color",
      defaultValue: "#e5e7eb",
    },
    buttonTextColor: {
      type: "string",
      displayName: "Button Text Color",
      defaultValue: "#000000",
    },
    buttonHoverBgColor: {
      type: "string",
      displayName: "Button Hover Background Color",
      defaultValue: "#f9fafb",
    },
    buttonLabel: {
      type: "string",
      displayName: "Button Label",
      defaultValue: "Learn More",
    },
  },
  importPath: "./components/ministries-section",
});

PLASMIC.registerComponent(VideoMinistriesSection, {
  name: "VideoMinistriesSection",
  displayName: "Video Ministries Section",
  description: "Two-column section with text (eyebrow, title, description, CTA) on the left and video on the right",
  props: {
    showEyebrow: {
      type: "boolean",
      displayName: "Show Eyebrow Label",
      defaultValue: true,
    },
    eyebrow: {
      type: "string",
      displayName: "Eyebrow Label",
      defaultValue: "WHO WE ARE",
    },
    eyebrowColor: {
      type: "string",
      displayName: "Eyebrow Color",
      defaultValue: "#475569",
    },
    title: {
      type: "string",
      displayName: "Title",
      defaultValue: "Great Commission Media Ministries",
    },
    titleColor: {
      type: "string",
      displayName: "Title Color",
      defaultValue: "#1e3a8a",
    },
    titleSize: {
      type: "string",
      displayName: "Title Font Size",
      defaultValue: "32px",
    },
    description: {
      type: "string",
      displayName: "Description (use blank lines for paragraphs)",
      defaultValue:
        "The Great Commission is not limited by borders, language barriers, censorship, distance, or fear.\n\nIn many places, people cannot easily walk into a church, meet a pastor, or ask questions about Jesus openly. But a broadcast can enter a home. A digital message can reach a phone. A printed resource can be read in secret. A trained follow-up worker can pray, listen, and help someone take the next step.\n\nGCMM exists to help the Gospel reach people who are often beyond the reach of traditional mission — and to connect that message with personal care, discipleship, and local witness.",
    },
    descriptionColor: {
      type: "string",
      displayName: "Description Color",
      defaultValue: "#1f2937",
    },
    descriptionSize: {
      type: "string",
      displayName: "Description Font Size",
      defaultValue: "16px",
    },
    ctaText: {
      type: "string",
      displayName: "CTA Text",
      defaultValue: "Learn more",
    },
    ctaUrl: {
      type: "string",
      displayName: "CTA URL",
      defaultValue: "",
    },
    ctaStyle: {
      type: "choice",
      displayName: "CTA Style",
      options: ["link", "button"],
      defaultValue: "link",
    },
    buttonBgColor: {
      type: "string",
      displayName: "Button Background Color",
      defaultValue: "#f59e0b",
    },
    buttonTextColor: {
      type: "string",
      displayName: "Button Text Color",
      defaultValue: "#ffffff",
    },
    buttonHoverBgColor: {
      type: "string",
      displayName: "Button Hover Background Color",
      defaultValue: "#d97706",
    },
    linkColor: {
      type: "string",
      displayName: "Link Color",
      defaultValue: "#1e3a8a",
    },
    linkUnderlineColor: {
      type: "string",
      displayName: "Link Underline Color",
      defaultValue: "#1e3a8a",
    },
    videoUrl: {
      type: "string",
      displayName: "Video URL (MP4 path, YouTube URL, or Vimeo URL)",
      defaultValue: "",
    },
    videoPosterUrl: {
      type: "imageUrl",
      displayName: "Video Poster Image",
      defaultValue: "/placeholder.svg",
    },
    videoAspectRatio: {
      type: "string",
      displayName: "Video Aspect Ratio (e.g. 16/9, 4/3, 1/1)",
      defaultValue: "16/9",
    },
    backgroundColor: {
      type: "string",
      displayName: "Section Background Color",
      defaultValue: "#f3f4f6",
    },
    textColor: {
      type: "string",
      displayName: "Section Text Color",
      defaultValue: "#1f2937",
    },
    sectionPaddingY: {
      type: "number",
      displayName: "Section Vertical Padding",
      defaultValue: 96,
    },
    reverseOnMobile: {
      type: "boolean",
      displayName: "Reverse Column Order on Mobile",
      defaultValue: false,
    },
  },
  importPath: "./components/video-ministries-section",
});


PLASMIC.registerComponent(StripeDonationPageV2, {
  name: "StripeDonationPageV2",
  displayName: "Stripe Donation Page (v2 — Campaigns)",
  description:
    "Rebuilt donation page. Campaigns are now a single reorderable array (like Photo Carousel) instead of ~100 separate fields — add, remove, and drag-reorder campaigns freely, with no code changes needed.",
  props: {
    donateNowHeading: {
      type: "string",
      displayName: "Donate Now Heading",
      defaultValue: "Donate Now:",
      section: "Page Content",
    },
    generousDonationText: {
      type: "string",
      displayName: "Generous Donation Text",
      defaultValue: "Your most generous donation",
      section: "Page Content",
    },
    customAmountPlaceholder: {
      type: "string",
      displayName: "Custom Amount Placeholder",
      defaultValue: "100",
      section: "Page Content",
    },
    termsAndConditionsUrl: {
      type: "string",
      displayName: "Terms and Conditions URL",
      defaultValue: "/terms-and-conditions",
      section: "Page Content",
    },
    matchingBannerText: {
      type: "string",
      displayName: "Matching Campaign Banner Text",
      defaultValue: "🎉 This campaign is being matched — your gift will go twice as far!",
      section: "Page Content",
    },
    presetAmount1: { type: "number", displayName: "Preset Amount 1", defaultValue: 40, section: "Preset Amounts" },
    presetAmount2: { type: "number", displayName: "Preset Amount 2", defaultValue: 70, section: "Preset Amounts" },
    presetAmount3: { type: "number", displayName: "Preset Amount 3", defaultValue: 200, section: "Preset Amounts" },
    presetAmount4: { type: "number", displayName: "Preset Amount 4", defaultValue: 400, section: "Preset Amounts" },
    presetAmount5: { type: "number", displayName: "Preset Amount 5", defaultValue: 800, section: "Preset Amounts" },
    presetAmount6: { type: "number", displayName: "Preset Amount 6", defaultValue: 1500, section: "Preset Amounts" },
    campaigns: {
      type: "array",
      displayName: "Campaigns",
      description:
        "Each campaign is fully self-contained: name, banner, and email text. Drag to reorder which one shows first. Add a new campaign any time — no code changes needed.",
      section: "Campaigns",
      itemType: {
        type: "object",
        nameFunc: (item: any) => item.name || "New Campaign",
        fields: {
          name: {
            type: "string",
            displayName: "Campaign Name",
            defaultValue: "New Campaign",
          },
          bannerUrl: {
            type: "imageUrl",
            displayName: "Confirmation Email Banner",
          },
          emailBodyOneTime: {
            type: "string",
            displayName: "Email Body — One-Time Gift",
            defaultValue:
              "Thank you for your gift of {amount} toward {campaignName}. Your generosity is helping us reach people around the world with practical support and the message of hope.",
            description:
              "Merge tags: {donorName}, {amount}, {campaignName}, {matchedAmount}. Signature is added automatically.",
          },
          emailBodyMonthly: {
            type: "string",
            displayName: "Email Body — Monthly Gift",
            defaultValue:
              "Thank you for your generous monthly gift of {amount} toward {campaignName}. Your recurring support helps us plan ahead and make a lasting difference every month.",
          },
          isMatching: {
            type: "boolean",
            displayName: "Matching Campaign?",
            defaultValue: false,
          },
          matchMultiplier: {
            type: "number",
            displayName: "Match Multiplier",
            defaultValue: 2,
            hidden: (item: any) => !item.isMatching,
          },
        },
      },
      defaultValue: [
        {
          name: "Where Most Needed",
          bannerUrl: "/images/email-banner.png",
          emailBodyOneTime:
            "Thank you for your gift of {amount} toward {campaignName}. Your generosity is helping us reach people around the world with practical support and the message of hope.",
          emailBodyMonthly:
            "Thank you for your generous monthly gift of {amount} toward {campaignName}. Your recurring support helps us plan ahead and make a lasting difference every month.",
          isMatching: false,
          matchMultiplier: 2,
        },
      ],
    },
    organizationName: {
      type: "string",
      displayName: "Organization Name",
      defaultValue: "Great Commission Media Ministries",
      section: "Organization Info",
    },
    organizationPhone: {
      type: "string",
      displayName: "Organization Phone",
      defaultValue: "1-877-674-5630",
      section: "Organization Info",
    },
    organizationEmail: {
      type: "string",
      displayName: "Organization Email",
      defaultValue: "info@gcmm.ca",
      section: "Organization Info",
    },
    organizationAddress: {
      type: "string",
      displayName: "Organization Address",
      defaultValue: "PO Box 14006, Abbotsford, BC V2T 0B4",
      section: "Organization Info",
    },
    organizationCharityNumber: {
      type: "string",
      displayName: "Charity Registration Number",
      defaultValue: "82864 9467 RR0001",
      section: "Organization Info",
    },
    signatureName: {
      type: "string",
      displayName: "Signature Name",
      defaultValue: "Dr. Hannu Haukka",
      section: "Signature",
    },
    signatureTitle: {
      type: "string",
      displayName: "Signature Title",
      defaultValue: "CEO, Great Commission Media Ministries (GCMM)",
      section: "Signature",
    },
    emailSubject: {
      type: "string",
      displayName: "Email Subject",
      defaultValue: "Thank you for your donation",
      section: "Email Settings",
    },
    notificationEmailRecipient: {
      type: "string",
      displayName: "Notification Email Recipient",
      defaultValue: "info@gcmm.ca",
      section: "Email Settings",
    },
    showLocationNotice: {
      type: "boolean",
      displayName: "Show Location Notice",
      defaultValue: true,
      section: "Location Notice",
    },
    locationNoticeTitle: {
      type: "string",
      displayName: "Notice Title",
      defaultValue: "Are you donating from the United States?",
      section: "Location Notice",
      hidden: (props: any) => !props.showLocationNotice,
    },
    locationNoticeText: {
      type: "string",
      displayName: "Notice Text",
      defaultValue:
        "GCMM is a registered Canadian charity. If you're a US donor looking for a tax-deductible option, please use our US donation partner page instead.",
      section: "Location Notice",
      hidden: (props: any) => !props.showLocationNotice,
    },
    usDonationUrl: {
      type: "string",
      displayName: "US Donation URL",
      defaultValue: "https://donate.gcmm.ca/us",
      section: "Location Notice",
      hidden: (props: any) => !props.showLocationNotice,
    },
  },
  importPath: "./components/stripe-donation-page-v2",
})

