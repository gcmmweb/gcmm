"use client"

import type React from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Mail, Heart } from "lucide-react"

// One entry per ministry campaign (mcmc, ukraineaid, israel-jewish-ministry,
// satellite-10-40-window, etc). campaignId must match whatever identifier
// is already being passed through Stripe metadata / the donation form today.
export interface ThankYouCampaignContent {
  campaignId: string
  headline: string
  photoUrl: string
  accentColor: string // hex, e.g. "#1D9E75"
}

export interface DonationThankYouProps {
  className?: string
  campaigns: ThankYouCampaignContent[]
  defaultHeadline?: string
  defaultPhotoUrl?: string
  defaultAccentColor?: string
  newsletterUrl?: string
}

const FALLBACK_HEADLINE = "Your generosity is already at work."
const FALLBACK_PHOTO = "/images/thank-you-default.jpg"
const FALLBACK_COLOR = "#1D9E75"

export default function DonationThankYou({
  className,
  campaigns = [],
  defaultHeadline = FALLBACK_HEADLINE,
  defaultPhotoUrl = FALLBACK_PHOTO,
  defaultAccentColor = FALLBACK_COLOR,
  newsletterUrl = "/newsletters",
}: DonationThankYouProps) {
  const searchParams = useSearchParams()

  // These come from the URL, e.g. /thank-you?campaign=ukraineaid&amount=50&frequency=monthly&name=Junita
  const campaignId = searchParams?.get("campaign") ?? ""
  const amount = searchParams?.get("amount") ?? ""
  const frequency = searchParams?.get("frequency") ?? ""
  const donorName = searchParams?.get("name") ?? ""

  const matched = campaigns.find(
  (c) => c.campaignId && c.campaignId.toLowerCase() === campaignId.toLowerCase()
)

  const headline = matched?.headline || defaultHeadline
  const photoUrl = matched?.photoUrl || defaultPhotoUrl
  const accentColor = matched?.accentColor || defaultAccentColor

  const formattedAmount = amount
    ? new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
      }).format(Number(amount))
    : null

  const frequencyLabel =
    frequency === "monthly" ? "Monthly" : frequency === "one-time" ? "One-time" : null

  return (
    // Outer section: className comes from Plasmic, so Studio's width/stretch/
    // background controls actually reach this element (full-bleed friendly).
    <div className={className} style={styles.section}>
      {/* Inner content: fixed reading width, always centered, regardless of
          how wide the outer section is set to in Plasmic. */}
      <div style={styles.wrapper}>
        <div style={styles.iconCircle(accentColor)}>
          <CheckCircle size={28} color={accentColor} />
        </div>

        <h1 style={styles.heading}>Thank you{donorName ? `, ${donorName}` : ""}</h1>
        <p style={styles.subheading}>{headline}</p>

        {(formattedAmount || frequencyLabel || campaignId) && (
          <div style={styles.summaryCard}>
            {formattedAmount && (
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Amount</span>
                <span style={styles.summaryValue}>{formattedAmount}</span>
              </div>
            )}
            {frequencyLabel && (
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Frequency</span>
                <span style={styles.summaryValue}>{frequencyLabel}</span>
              </div>
            )}
            {campaignId && (
              <div style={styles.summaryRowLast}>
                <span style={styles.summaryLabel}>Campaign</span>
                <span style={styles.summaryValue}>{matched?.campaignId ?? campaignId}</span>
              </div>
            )}
          </div>
        )}

        <div style={styles.photoWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photoUrl} alt="" style={styles.photo} />
        </div>

        <div style={styles.noticeBox}>
          <Mail size={18} color="#5F5E5A" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={styles.noticeText}>
            A confirmation email with your official tax receipt is on its way to your inbox.
          </p>
        </div>

        <div style={styles.ctaRow}>
          <a href={newsletterUrl} style={styles.ctaButton}>
            <Heart size={16} style={{ marginRight: 6, verticalAlign: -2 }} />
            Subscribe to updates
          </a>
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, any> = {
  section: {
    width: "100%",
  },
  wrapper: {
    maxWidth: 560,
    margin: "0 auto",
    padding: "2rem 1.5rem",
    textAlign: "center",
  },
  iconCircle: (color: string) => ({
    width: 56,
    height: 56,
    borderRadius: "50%",
    backgroundColor: `${color}1A`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1rem",
  }),
  heading: {
    fontSize: 26,
    fontWeight: 600,
    margin: "0 0 8px",
  },
  subheading: {
    fontSize: 16,
    color: "#5F5E5A",
    maxWidth: 440,
    margin: "0 auto 1.5rem",
  },
  summaryCard: {
    border: "1px solid #E5E3DA",
    borderRadius: 12,
    padding: "1.1rem 1.25rem",
    textAlign: "left",
    marginBottom: "1.25rem",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryRowLast: {
    display: "flex",
    justifyContent: "space-between",
  },
  summaryLabel: {
    fontSize: 13,
    color: "#888780",
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: 500,
  },
  photoWrap: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: "1.25rem",
    aspectRatio: "16/7",
    backgroundColor: "#F1EFE8",
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  noticeBox: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    textAlign: "left",
    border: "1px solid #E5E3DA",
    borderRadius: 8,
    padding: "0.85rem 1rem",
    marginBottom: "1.5rem",
  },
  noticeText: {
    fontSize: 13,
    color: "#5F5E5A",
    margin: 0,
  },
  ctaRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  ctaButton: {
    flex: 1,
    minWidth: 160,
    border: "1px solid #B4B2A9",
    borderRadius: 8,
    padding: "10px 16px",
    fontSize: 14,
    background: "transparent",
    cursor: "pointer",
    textDecoration: "none",
    color: "inherit",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
}
