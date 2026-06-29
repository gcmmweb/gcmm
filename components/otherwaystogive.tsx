"use client"

import { useState } from "react"
import { Building2, FileText, Phone, CreditCard, Gift, X } from 'lucide-react'

interface OtherWaysToGiveProps {
  className?: string
  showHeader?: boolean
  headerText?: string
  headerTextColor?: string
  headerAccentColor?: string

  showEtransferMethod?: boolean
  etransferLabel?: string
  etransferInfo?: string
  etransferIconColor?: string

  showChequeMethod?: boolean
  chequeLabel?: string
  chequeInfo?: string
  chequeIconColor?: string

  showPhoneMethod?: boolean
  phoneLabel?: string
  phoneInfo?: string
  phoneIconColor?: string

  showCreditCardMethod?: boolean
  creditCardLabel?: string
  creditCardInfo?: string
  creditCardIconColor?: string

  showEstateMethod?: boolean
  estateLabel?: string
  estateInfo?: string
  estateIconColor?: string

  // Tax Info
  showTaxInfo?: boolean
  taxInfoText?: string
  taxInfoTextColor?: string

  // Canada Address Card
  showCanadaCard?: boolean
  canadaCardTitle?: string
  canadaCardAddress?: string
  canadaCardBackgroundColor?: string
  canadaCardTextColor?: string
  canadaCardBorderColor?: string
  canadaCardCheckColor?: string

  // Card styling
  cardBackgroundColor?: string
  cardHoverBackgroundColor?: string
  cardTextColor?: string
  cardBorderColor?: string
  cardIconSize?: number
}

export function OtherWaysToGive({
  className = "",
  showHeader = true,
  headerText = "OTHER WAYS TO GIVE",
  headerTextColor = "#1e40af",
  headerAccentColor = "#1e3a8a",

  showEtransferMethod = true,
  etransferLabel = "E-TRANSFER",
  etransferInfo = "Send your e-transfer to donations@organization.org. Please include your full name and mailing address in the message for your tax receipt.",
  etransferIconColor = "#8b7355",

  showChequeMethod = true,
  chequeLabel = "CHEQUE",
  chequeInfo = "Make your cheque payable to 'Organization Name' and mail it to the address below. Please include your contact information for a tax receipt.",
  chequeIconColor = "#8b7355",

  showPhoneMethod = true,
  phoneLabel = "PHONE",
  phoneInfo = "Call us at 1-800-XXX-XXXX to make a donation over the phone. Our team is available Monday-Friday, 9am-5pm EST.",
  phoneIconColor = "#8b7355",

  showCreditCardMethod = true,
  creditCardLabel = "CREDIT CARD",
  creditCardInfo = "Donate securely online using your credit card. Visit our donation portal to make a one-time or recurring gift.",
  creditCardIconColor = "#8b7355",

  showEstateMethod = true,
  estateLabel = "ESTATE GIVING",
  estateInfo = "Leave a lasting legacy by including us in your will or estate plan. Contact us to discuss planned giving options.",
  estateIconColor = "#8b7355",

  showTaxInfo = true,
  taxInfoText = "CANADIAN REGISTRATION #: 85012 1203 RR0001",
  taxInfoTextColor = "#a78759",

  showCanadaCard = true,
  canadaCardTitle = "CANADIAN DONATIONS",
  canadaCardAddress = "456 Maple Avenue\nSuite 200\nToronto, ON M5H 2N2\nCanada",
  canadaCardBackgroundColor = "#ffffff",
  canadaCardTextColor = "#000000",
  canadaCardBorderColor = "#e5e7eb",
  canadaCardCheckColor = "#3b82f6",

  cardBackgroundColor = "#ffffff",
  cardHoverBackgroundColor = "#f9fafb",
  cardTextColor = "#000000",
  cardBorderColor = "#e5e7eb",
  cardIconSize = 48,
}: OtherWaysToGiveProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  const methods = [
    {
      id: "etransfer",
      label: etransferLabel,
      info: etransferInfo,
      icon: Building2,
      iconColor: etransferIconColor,
      show: showEtransferMethod,
    },
    {
      id: "cheque",
      label: chequeLabel,
      info: chequeInfo,
      icon: FileText,
      iconColor: chequeIconColor,
      show: showChequeMethod,
    },
    {
      id: "phone",
      label: phoneLabel,
      info: phoneInfo,
      icon: Phone,
      iconColor: phoneIconColor,
      show: showPhoneMethod,
    },
    {
      id: "creditcard",
      label: creditCardLabel,
      info: creditCardInfo,
      icon: CreditCard,
      iconColor: creditCardIconColor,
      show: showCreditCardMethod,
    },
    {
      id: "estate",
      label: estateLabel,
      info: estateInfo,
      icon: Gift,
      iconColor: estateIconColor,
      show: showEstateMethod,
    },
  ]

  const visibleMethods = methods.filter((m) => m.show)

  const handleCardClick = (methodId: string) => {
    setSelectedMethod(selectedMethod === methodId ? null : methodId)
  }

  const handleModalClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedMethod(null)
  }

  const handleModalBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedMethod(null)
    }
  }

  return (
    <div
      className={`w-full py-16 px-4 bg-white text-slate-900 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {showHeader && (
          <h2 className="text-4xl font-bold text-center mb-16">
            <span style={{ color: headerAccentColor }}>OTHER</span>{" "}
            <span style={{ color: headerTextColor }}>WAYS TO GIVE</span>
          </h2>
        )}

        {/* Infographic Grid */}
        <div className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {visibleMethods.map((method) => {
              const IconComponent = method.icon
              const isSelected = selectedMethod === method.id
              return (
                <div key={method.id}>
                  <div
                    className="flex flex-col items-center text-center cursor-pointer transition-transform hover:scale-105"
                    onClick={() => handleCardClick(method.id)}
                  >
                    <div
                      className="w-24 h-24 rounded-lg flex items-center justify-center mb-4 border transition-colors"
                      style={{
                        backgroundColor: isSelected ? cardHoverBackgroundColor : cardBackgroundColor,
                        borderColor: cardBorderColor,
                        borderWidth: "1px",
                      }}
                    >
                      <IconComponent size={cardIconSize} style={{ color: method.iconColor }} />
                    </div>
                    <h3
                      className="text-lg font-bold uppercase tracking-tight"
                      style={{ color: cardTextColor }}
                    >
                      {method.label}
                    </h3>
                  </div>

                  {isSelected && (
                    <div
                      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                      onClick={handleModalBackdropClick}
                    >
                      <div
                        className="bg-white rounded-lg p-8 max-w-md w-full relative shadow-lg"
                        style={{ color: cardTextColor }}
                      >
                        <button
                          onClick={handleModalClose}
                          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                          aria-label="Close modal"
                        >
                          <X size={24} />
                        </button>
                        <div className="flex justify-center mb-4">
                          <div
                            className="w-16 h-16 rounded-lg flex items-center justify-center border"
                            style={{
                              backgroundColor: cardBackgroundColor,
                              borderColor: cardBorderColor,
                              borderWidth: "1px",
                            }}
                          >
                            <IconComponent size={32} style={{ color: method.iconColor }} />
                          </div>
                        </div>
                        <h4 className="text-2xl font-bold text-center mb-4 uppercase">
                          {method.label}
                        </h4>
                        <p className="text-center leading-relaxed">{method.info}</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Vertical divider line under methods */}
          <div className="h-px bg-gray-300 mt-12" />
        </div>

        {/* Tax Information */}
        {showTaxInfo && (
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-wide font-semibold" style={{ color: taxInfoTextColor }}>
              {taxInfoText}
            </p>
          </div>
        )}

        {/* Canada Address Card */}
        {showCanadaCard && (
          <div className="max-w-md mx-auto">
            <div
              className="rounded-lg p-6 border"
              style={{
                backgroundColor: canadaCardBackgroundColor,
                borderColor: canadaCardBorderColor,
              }}
            >
              <div className="flex items-start gap-3 mb-4">
                <Building2 className="w-5 h-5 mt-1" style={{ color: canadaCardCheckColor }} />
                <h3 className="text-lg font-semibold" style={{ color: canadaCardTextColor }}>
                  {canadaCardTitle}
                </h3>
              </div>
              <p className="whitespace-pre-line leading-relaxed" style={{ color: canadaCardTextColor }}>
                {canadaCardAddress}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
