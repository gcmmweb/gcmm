"use client"

import type React from "react"
import { useEffect, useState } from "react"
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

// What the donation form leaves in this browser tab (session storage) right
// after a successful gift. It never appears in the web address.
interface DonationRecord {
  tx: string // Stripe payment ID — used so one gift is only counted once
  campaignId: string
  campaignName: string
  amount: number
  frequency: string
  name: string
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
  // Read the gift details the donation form left in this tab. Done in an
  // effect (not during render) so the server and browser HTML always match.
  const [record, setRecord] = useState<DonationRecord | null>(null)
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("gcmm_donation")
      if (raw) setRecord(JSON.parse(raw))
    } catch {
      // Storage unavailable or unreadable: just show the generic page.
    }
  }, [])

  // Display values: the donation record when present; otherwise the old URL
  // parameters (kept so old links / Studio preview still render). URL
  // parameters are display-only — they are NEVER used for analytics.
  const campaignId = record?.campaignId ?? searchParams?.get("campaign") ?? ""
  const amount = record ? String(record.amount || "") : searchParams?.get("amount") ?? ""
  const frequency = record?.frequency ?? searchParams?.get("frequency") ?? ""
  const donorName = record?.name ?? searchParams?.get("name") ?? ""

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

  // Sends ONE standard GA4 "purchase" event per gift. Why this shape:
  //  - Google Analytics loads lazily (after the page is idle), so we WAIT for
  //    it (up to ~20s) instead of checking once and giving up.
  //  - Only a real donation record from the form triggers it (a typed-in or
  //    shared URL can't create fake donations).
  //  - transaction_id (the Stripe payment ID) + a saved "already sent" flag
  //    mean refreshing or revisiting the page never counts the gift twice.
  //  - "purchase" with value + currency is what makes GA4 show dollar totals.
  useEffect(() => {
    if (!record || !record.tx || !(Number(record.amount) > 0)) return
    const trackedKey = `gcmm_tracked_${record.tx}`
    try {
      if (window.localStorage.getItem(trackedKey)) return
    } catch {
      // Storage blocked: carry on; transaction_id still protects against repeats in GA4.
    }

    let tries = 0
    const timer = window.setInterval(() => {
      const gtag = (window as any).gtag
      if (typeof gtag === "function") {
        window.clearInterval(timer)
        try {
          if (window.localStorage.getItem(trackedKey)) return
          window.localStorage.setItem(trackedKey, "1")
        } catch {
          // ignore
        }
        const value = Number(record.amount)
        const id = record.campaignId || "general"
        gtag("event", "purchase", {
          transaction_id: record.tx,
          value,
          currency: "CAD",
          items: [
            {
              item_id: id,
              item_name: record.campaignName || id,
              price: value,
              quantity: 1,
            },
          ],
          campaign_id: id,
          frequency: record.frequency || "unknown",
        })
      } else if (++tries > 80) {
        window.clearInterval(timer)
      }
    }, 250)
    return () => window.clearInterval(timer)
  }, [record])

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

        {(formattedAmount || frequencyLabel) && (
          <div style={styles.summaryCard}>
            {formattedAmount && (
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Amount</span>
                <span style={styles.summaryValue}>{formattedAmount}</span>
              </div>
            )}
            {frequencyLabel && (
              <div style={styles.summaryRowLast}>
                <span style={styles.summaryLabel}>Frequency</span>
                <span style={styles.summaryValue}>{frequencyLabel}</span>
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
            A donation acknowledgement email is on its way to your inbox.
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
