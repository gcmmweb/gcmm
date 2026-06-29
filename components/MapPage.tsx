"use client"

import { useEffect, useMemo, useState } from "react"
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps"
import { motion, AnimatePresence } from "framer-motion"

const normalizeColor = (color: string): string => {
  const trimmed = color.trim()
  if (!trimmed) return "#000000"
  if (trimmed.startsWith("#") || trimmed.startsWith("rgb") || trimmed.startsWith("hsl")) return trimmed
  if (/^[0-9a-fA-F]{3,8}$/.test(trimmed)) return `#${trimmed}`
  return trimmed
}

// Using Visionscarto world atlas which specifically includes Crimea as part of Ukraine
const geoUrl = "https://gisco-services.ec.europa.eu/distribution/v2/countries/geojson/CNTR_RG_60M_2020_4326.geojson"

interface MissionMapProps {
  className?: string
  title?: string
  subtitle?: string
  backgroundColor?: string
  textColor?: string
  mapBackgroundColor?: string
  mapLandColor?: string
  mapBorderColor?: string
  titleColor?: string
  titleGradientFrom?: string
  titleGradientTo?: string
  useTitleGradient?: boolean

  // Ministry props
  multipleministriesColor?: string
  megaCityMediaCampaignColor?: string
  window1040MediaOutreachColor?: string
  ukraineAidColor?: string
  traumaRecoveryColor?: string
  jewishMinistryColor?: string
  socialMediaOutreachColor?: string

  showMultipleMinistries?: boolean
  showMegaCityMediaCampaign?: boolean
  showWindow1040MediaOutreach?: boolean
  showUkraineAid?: boolean
  showTraumaRecovery?: boolean
  showJewishMinistry?: boolean
  showSocialMediaOutreach?: boolean

  multipleministriesName?: string
  megaCityMediaCampaignName?: string
  window1040MediaOutreachName?: string
  ukraineAidName?: string
  traumaRecoveryName?: string
  jewishMinistryName?: string
  socialMediaOutreachName?: string

  // Ministry URLs
  multipleministriesUrl?: string
  megaCityMediaCampaignUrl?: string
  window1040MediaOutreachUrl?: string
  ukraineAidUrl?: string
  traumaRecoveryUrl?: string
  jewishMinistryUrl?: string
  socialMediaOutreachUrl?: string

  // Popup settings
  popupVerticalOffset?: number
  popupBackgroundColor?: string
  popupTextColor?: string

  // Ministry links shown in popup badges (JSON array)
  // Format: [{ "label": "Mega City Media Campaigns", "url": "/megacitymediacampaigns" }]
  popupMinistryLinksJson?: string

  // Country visibility and data - Original 21 countries (visible by default)
  showIsrael?: boolean
  israelName?: string
  israelPopulation?: string
  israelChristianPercent?: string
  israelImage?: string
  israelMinistryTypes?: string[]
  israelLearnMoreUrl?: string

    showWesternSahara?: boolean
  westernSaharaName?: string
  westernSaharaPopulation?: string
  westernSaharaChristianPercent?: string
  westernSaharaImage?: string
  westernSaharaMinistryTypes?: string[]
  westernSaharaLearnMoreUrl?: string

  showUkraine?: boolean
  ukraineName?: string
  ukrainePopulation?: string
  ukraineChristianPercent?: string
  ukraineImage?: string
  ukraineMinistryTypes?: string[]
  ukraineLearnMoreUrl?: string

  showMoldova?: boolean
  moldovaName?: string
  moldovaPopulation?: string
  moldovaChristianPercent?: string
  moldovaImage?: string
  moldovaMinistryTypes?: string[]
  moldovaLearnMoreUrl?: string

  showIndia?: boolean
  indiaName?: string
  indiaPopulation?: string
  indiaChristianPercent?: string
  indiaImage?: string
  indiaMinistryTypes?: string[]
  indiaLearnMoreUrl?: string

  showPhilippines?: boolean
  philippinesName?: string
  philippinesPopulation?: string
  philippinesChristianPercent?: string
  philippinesImage?: string
  philippinesMinistryTypes?: string[]
  philippinesLearnMoreUrl?: string

  showBrazil?: boolean
  brazilName?: string
  brazilPopulation?: string
  brazilChristianPercent?: string
  brazilImage?: string
  brazilMinistryTypes?: string[]
  brazilLearnMoreUrl?: string

  showNigeria?: boolean
  nigeriaName?: string
  nigeriaPopulation?: string
  nigeriaChristianPercent?: string
  nigeriaImage?: string
  nigeriaMinistryTypes?: string[]
  nigeriaLearnMoreUrl?: string

  showEthiopia?: boolean
  ethiopiaName?: string
  ethiopiaPopulation?: string
  ethiopiaChristianPercent?: string
  ethiopiaImage?: string
  ethiopiaMinistryTypes?: string[]
  ethiopiaLearnMoreUrl?: string

  showMexico?: boolean
  mexicoName?: string
  mexicoPopulation?: string
  mexicoChristianPercent?: string
  mexicoImage?: string
  mexicoMinistryTypes?: string[]
  mexicoLearnMoreUrl?: string

  showKenya?: boolean
  kenyaName?: string
  kenyaPopulation?: string
  kenyaChristianPercent?: string
  kenyaImage?: string
  kenyaMinistryTypes?: string[]
  kenyaLearnMoreUrl?: string

  showColombia?: boolean
  colombiaName?: string
  colombiaPopulation?: string
  colombiaChristianPercent?: string
  colombiaImage?: string
  colombiaMinistryTypes?: string[]
  colombiaLearnMoreUrl?: string

  showPeru?: boolean
  peruName?: string
  peruPopulation?: string
  peruChristianPercent?: string
  peruImage?: string
  peruMinistryTypes?: string[]
  peruLearnMoreUrl?: string

  showGhana?: boolean
  ghanaName?: string
  ghanaPopulation?: string
  ghanaChristianPercent?: string
  ghanaImage?: string
  ghanaMinistryTypes?: string[]
  ghanaLearnMoreUrl?: string

  showUganda?: boolean
  ugandaName?: string
  ugandaPopulation?: string
  ugandaChristianPercent?: string
  ugandaImage?: string
  ugandaMinistryTypes?: string[]
  ugandaLearnMoreUrl?: string

  showTanzania?: boolean
  tanzaniaName?: string
  tanzaniaPopulation?: string
  tanzaniaChristianPercent?: string
  tanzaniaImage?: string
  tanzaniaMinistryTypes?: string[]
  tanzaniaLearnMoreUrl?: string

  showRwanda?: boolean
  rwandaName?: string
  rwandaPopulation?: string
  rwandaChristianPercent?: string
  rwandaImage?: string
  rwandaMinistryTypes?: string[]
  rwandaLearnMoreUrl?: string

  showZambia?: boolean
  zambiaName?: string
  zambiaPopulation?: string
  zambiaChristianPercent?: string
  zambiaImage?: string
  zambiaMinistryTypes?: string[]
  zambiaLearnMoreUrl?: string

  showMalawi?: boolean
  malawiName?: string
  malawiPopulation?: string
  malawiChristianPercent?: string
  malawiImage?: string
  malawiMinistryTypes?: string[]
  malawiLearnMoreUrl?: string

  showGuatemala?: string
  guatemalaName?: string
  guatemalaPopulation?: string
  guatemalaChristianPercent?: string
  guatemalaImage?: string
  guatemalaMinistryTypes?: string[]
  guatemalaLearnMoreUrl?: string

  showHonduras?: boolean
  hondurasName?: string
  hondurasPopulation?: string
  hondurasChristianPercent?: string
  hondurasImage?: string
  hondurasMinistryTypes?: string[]
  hondurasLearnMoreUrl?: string

  showElSalvador?: boolean
  elSalvadorName?: string
  elSalvadorPopulation?: string
  elSalvadorChristianPercent?: string
  elSalvadorImage?: string
  elSalvadorMinistryTypes?: string[]
  elSalvadorLearnMoreUrl?: string

  showHaiti?: boolean
  haitiName?: string
  haitiPopulation?: string
  haitiChristianPercent?: string
  haitiImage?: string
  haitiMinistryTypes?: string[]
  haitiLearnMoreUrl?: string

  // Additional countries (hidden by default)
  showChina?: boolean
  chinaName?: string
  chinaPopulation?: string
  chinaChristianPercent?: string
  chinaImage?: string
  chinaMinistryTypes?: string[]
  chinaLearnMoreUrl?: string

  showIndonesia?: boolean
  indonesiaName?: string
  indonesiaPopulation?: string
  indonesiaChristianPercent?: string
  indonesiaImage?: string
  indonesiaMinistryTypes?: string[]
  indonesiaLearnMoreUrl?: string

  showPakistan?: boolean
  pakistanName?: string
  pakistanPopulation?: string
  pakistanChristianPercent?: string
  pakistanImage?: string
  pakistanMinistryTypes?: string[]
  pakistanLearnMoreUrl?: string

  showBangladesh?: boolean
  bangladeshName?: string
  bangladeshPopulation?: string
  bangladeshChristianPercent?: string
  bangladeshImage?: string
  bangladeshMinistryTypes?: string[]
  bangladeshLearnMoreUrl?: string

  showJapan?: boolean
  japanName?: string
  japanPopulation?: string
  japanChristianPercent?: string
  japanImage?: string
  japanMinistryTypes?: string[]
  japanLearnMoreUrl?: string

  showVietnam?: boolean
  vietnamName?: string
  vietnamPopulation?: string
  vietnamChristianPercent?: string
  vietnamImage?: string
  vietnamMinistryTypes?: string[]
  vietnamLearnMoreUrl?: string

  showThailand?: boolean
  thailandName?: string
  thailandPopulation?: string
  thailandChristianPercent?: string
  thailandImage?: string
  thailandMinistryTypes?: string[]
  thailandLearnMoreUrl?: string

  showMyanmar?: boolean
  myanmarName?: string
  myanmarPopulation?: string
  myanmarChristianPercent?: string
  myanmarImage?: string
  myanmarMinistryTypes?: string[]
  myanmarLearnMoreUrl?: string

  showSouthKorea?: boolean
  southKoreaName?: string
  southKoreaPopulation?: string
  southKoreaChristianPercent?: string
  southKoreaImage?: string
  southKoreaMinistryTypes?: string[]
  southKoreaLearnMoreUrl?: string

  showAfghanistan?: boolean
  afghanistanName?: string
  afghanistanPopulation?: string
  afghanistanChristianPercent?: string
  afghanistanImage?: string
  afghanistanMinistryTypes?: string[]
  afghanistanLearnMoreUrl?: string

  showIraq?: boolean
  iraqName?: string
  iraqPopulation?: string
  iraqChristianPercent?: string
  iraqImage?: string
  iraqMinistryTypes?: string[]
  iraqLearnMoreUrl?: string

  showSyria?: boolean
  syriaName?: string
  syriaPopulation?: string
  syriaChristianPercent?: string
  syriaImage?: string
  syriaMinistryTypes?: string[]
  syriaLearnMoreUrl?: string

  showYemen?: boolean
  yemenName?: string
  yemenPopulation?: string
  yemenChristianPercent?: string
  yemenImage?: string
  yemenMinistryTypes?: string[]
  yemenLearnMoreUrl?: string

  showSaudiArabia?: boolean
  saudiArabiaName?: string
  saudiArabiaPopulation?: string
  saudiArabiaChristianPercent?: string
  saudiArabiaImage?: string
  saudiArabiaMinistryTypes?: string[]
  saudiArabiaLearnMoreUrl?: string

  showIran?: boolean
  iranName?: string
  iranPopulation?: string
  iranChristianPercent?: string
  iranImage?: string
  iranMinistryTypes?: string[]
  iranLearnMoreUrl?: string

  showTurkey?: boolean
  turkeyName?: string
  turkeyPopulation?: string
  turkeyChristianPercent?: string
  turkeyImage?: string
  turkeyMinistryTypes?: string[]
  turkeyLearnMoreUrl?: string

  showEgypt?: boolean
  egyptName?: string
  egyptPopulation?: string
  egyptChristianPercent?: string
  egyptImage?: string
  egyptMinistryTypes?: string[]
  egyptLearnMoreUrl?: string

  showSouthAfrica?: boolean
  southAfricaName?: string
  southAfricaPopulation?: string
  southAfricaChristianPercent?: string
  southAfricaImage?: string
  southAfricaMinistryTypes?: string[]
  southAfricaLearnMoreUrl?: string

  showAlgeria?: boolean
  algeriaName?: string
  algeriaPopulation?: string
  algeriaChristianPercent?: string
  algeriaImage?: string
  algeriaMinistryTypes?: string[]
  algeriaLearnMoreUrl?: string

  showMorocco?: boolean
  moroccoName?: string
  moroccoPopulation?: string
  moroccoChristianPercent?: string
  moroccoImage?: string
  moroccoMinistryTypes?: string[]
  moroccoLearnMoreUrl?: string

  showSudan?: boolean
  sudanName?: string
  sudanPopulation?: string
  sudanChristianPercent?: string
  sudanImage?: string
  sudanMinistryTypes?: string[]
  sudanLearnMoreUrl?: string

  showCameroon?: boolean
  cameroonName?: string
  cameroonPopulation?: string
  cameroonChristianPercent?: string
  cameroonImage?: string
  cameroonMinistryTypes?: string[]
  cameroonLearnMoreUrl?: string

  showMozambique?: boolean
  mozambiqueName?: string
  mozambiquePopulation?: string
  mozambiqueChristianPercent?: string
  mozambiqueImage?: string
  mozambiqueMinistryTypes?: string[]
  mozambiqueLearnMoreUrl?: string

  showMadagascar?: boolean
  madagascarName?: string
  madagascarPopulation?: string
  madagascarChristianPercent?: string
  madagascarImage?: string
  madagascarMinistryTypes?: string[]
  madagascarLearnMoreUrl?: string

  showAngola?: boolean
  angolaName?: string
  angolaPopulation?: string
  angolaChristianPercent?: string
  angolaImage?: string
  angolaMinistryTypes?: string[]
  angolaLearnMoreUrl?: string

  showZimbabwe?: boolean
  zimbabweName?: string
  zimbabwePopulation?: string
  zimbabweChristianPercent?: string
  zimbabweImage?: string
  zimbabweMinistryTypes?: string[]
  zimbabweLearnMoreUrl?: string

  showMali?: boolean
  maliName?: string
  maliPopulation?: string
  maliChristianPercent?: string
  maliImage?: string
  maliMinistryTypes?: string[]
  maliLearnMoreUrl?: string

  showBurkinaFaso?: boolean
  burkinaFasoName?: string
  burkinaFasoPopulation?: string
  burkinaFasoChristianPercent?: string
  burkinaFasoImage?: string
  burkinaFasoMinistryTypes?: string[]
  burkinaFasoLearnMoreUrl?: string

  showSenegal?: boolean
  senegalName?: string
  senegalPopulation?: string
  senegalChristianPercent?: string
  senegalImage?: string
  senegalMinistryTypes?: string[]
  senegalLearnMoreUrl?: string

  showChad?: boolean
  chadName?: string
  chadPopulation?: string
  chadChristianPercent?: string
  chadImage?: string
  chadMinistryTypes?: string[]
  chadLearnMoreUrl?: string

  showSomalia?: boolean
  somaliaName?: string
  somaliaPopulation?: string
  somaliaChristianPercent?: string
  somaliaImage?: string
  somaliaMinistryTypes?: string[]
  somaliaLearnMoreUrl?: string

  showArgentina?: boolean
  argentinaName?: string
  argentinaPopulation?: string
  argentinaChristianPercent?: string
  argentinaImage?: string
  argentinaMinistryTypes?: string[]
  argentinaLearnMoreUrl?: string

  showVenezuela?: boolean
  venezuelaName?: string
  venezuelaPopulation?: string
  venezuelaChristianPercent?: string
  venezuelaImage?: string
  venezuelaMinistryTypes?: string[]
  venezuelaLearnMoreUrl?: string

  showChile?: boolean
  chileName?: string
  chilePopulation?: string
  chileChristianPercent?: string
  chileImage?: string
  chileMinistryTypes?: string[]
  chileLearnMoreUrl?: string

  showEcuador?: boolean
  ecuadorName?: string
  ecuadorPopulation?: string
  ecuadorChristianPercent?: string
  ecuadorImage?: string
  ecuadorMinistryTypes?: string[]
  ecuadorLearnMoreUrl?: string

  showBolivia?: boolean
  boliviaName?: string
  boliviaPopulation?: string
  boliviaChristianPercent?: string
  boliviaImage?: string
  boliviaMinistryTypes?: string[]
  boliviaLearnMoreUrl?: string

    // Palestine
  showPalestine?: boolean
  palestineName?: string
  palestinePopulation?: string
  palestineChristianPercent?: string
  palestineImage?: string
  palestineMinistryTypes?: string[]
  palestineLearnMoreUrl?: string


  // Guyana
  showGuyana?: boolean
  guyanaName?: string
  guyanaPopulation?: string
  guyanaChristianPercent?: string
  guyanaImage?: string
  guyanaMinistryTypes?: string[]
  guyanaLearnMoreUrl?: string

    // Suriname
  showSuriname?: boolean
  surinameName?: string
  surinamePopulation?: string
  surinameChristianPercent?: string
  surinameImage?: string
  surinameMinistryTypes?: string[]
  surinameLearnMoreUrl?: string

  showParaguay?: boolean
  paraguayName?: string
  paraguayPopulation?: string
  paraguayChristianPercent?: string
  paraguayImage?: string
  paraguayMinistryTypes?: string[]
  paraguayLearnMoreUrl?: string

  showUruguay?: boolean
  uruguayName?: string
  uruguayPopulation?: string
  uruguayChristianPercent?: string
  uruguayImage?: string
  uruguayMinistryTypes?: string[]
  uruguayLearnMoreUrl?: string

  showNicaragua?: boolean
  nicaraguaName?: string
  nicaraguaPopulation?: string
  nicaraguaChristianPercent?: string
  nicaraguaImage?: string
  nicaraguaMinistryTypes?: string[]
  nicaraguaLearnMoreUrl?: string

  showCostaRica?: boolean
  costaRicaName?: string
  costaRicaPopulation?: string
  costaRicaChristianPercent?: string
  costaRicaImage?: string
  costaRicaMinistryTypes?: string[]
  costaRicaLearnMoreUrl?: string

  showPanama?: boolean
  panamaName?: string
  panamaPopulation?: string
  panamaChristianPercent?: string
  panamaImage?: string
  panamaMinistryTypes?: string[]
  panamaLearnMoreUrl?: string

  showDominicanRepublic?: boolean
  dominicanRepublicName?: string
  dominicanRepublicPopulation?: string
  dominicanRepublicChristianPercent?: string
  dominicanRepublicImage?: string
  dominicanRepublicMinistryTypes?: string[]
  dominicanRepublicLearnMoreUrl?: string

  showCuba?: boolean
  cubaName?: string
  cubaPopulation?: string
  cubaChristianPercent?: string
  cubaImage?: string
  cubaMinistryTypes?: string[]
  cubaLearnMoreUrl?: string

  showJamaica?: boolean
  jamaicaName?: string
  jamaicaPopulation?: string
  jamaicaChristianPercent?: string
  jamaicaImage?: string
  jamaicaMinistryTypes?: string[]
  jamaicaLearnMoreUrl?: string

  showTrinidadAndTobago?: boolean
  trinidadAndTobagoName?: string
  trinidadAndTobagoPopulation?: string
  trinidadAndTobagoChristianPercent?: string
  trinidadAndTobagoImage?: string
  trinidadAndTobagoMinistryTypes?: string[]
  trinidadAndTobagoLearnMoreUrl?: string

  showRussia?: boolean
  russiaName?: string
  russiaPopulation?: string
  russiaChristianPercent?: string
  russiaImage?: string
  russiaMinistryTypes?: string[]
  russiaLearnMoreUrl?: string

  showPoland?: boolean
  polandName?: string
  polandPopulation?: string
  polandChristianPercent?: string
  polandImage?: string
  polandMinistryTypes?: string[]
  polandLearnMoreUrl?: string

  showRomania?: boolean
  romaniaName?: string
  romaniaPopulation?: string
  romaniaChristianPercent?: string
  romaniaImage?: string
  romaniaMinistryTypes?: string[]
  romaniaLearnMoreUrl?: string

  showCzechRepublic?: boolean
  czechRepublicName?: string
  czechRepublicPopulation?: string
  czechRepublicChristianPercent?: string
  czechRepublicImage?: string
  czechRepublicMinistryTypes?: string[]
  czechRepublicLearnMoreUrl?: string

  showHungary?: boolean
  hungaryName?: string
  hungaryPopulation?: string
  hungaryChristianPercent?: string
  hungaryImage?: string
  hungaryMinistryTypes?: string[]
  hungaryLearnMoreUrl?: string

  showBelarus?: boolean
  belarusName?: string
  belarusPopulation?: string
  belarusChristianPercent?: string
  belarusImage?: string
  belarusMinistryTypes?: string[]
  belarusLearnMoreUrl?: string

  showBulgaria?: boolean
  bulgariaName?: string
  bulgariaPopulation?: string
  bulgariaChristianPercent?: string
  bulgariaImage?: string
  bulgariaMinistryTypes?: string[]
  bulgariaLearnMoreUrl?: string

  showSerbia?: boolean
  serbiaName?: string
  serbiaPopulation?: string
  serbiaChristianPercent?: string
  serbiaImage?: string
  serbiaMinistryTypes?: string[]
  serbiaLearnMoreUrl?: string

  showAustria?: boolean
  austriaName?: string
  austriaPopulation?: string
  austriaChristianPercent?: string
  austriaImage?: string
  austriaMinistryTypes?: string[]
  austriaLearnMoreUrl?: string

  showSwitzerland?: boolean
  switzerlandName?: string
  switzerlandPopulation?: string
  switzerlandChristianPercent?: string
  switzerlandImage?: string
  switzerlandMinistryTypes?: string[]
  switzerlandLearnMoreUrl?: string

  showNetherlands?: boolean
  netherlandsName?: string
  netherlandsPopulation?: string
  netherlandsChristianPercent?: string
  netherlandsImage?: string
  netherlandsMinistryTypes?: string[]
  netherlandsLearnMoreUrl?: string

  showBelgium?: boolean
  belgiumName?: string
  belgiumPopulation?: string
  belgiumChristianPercent?: string
  belgiumImage?: string
  belgiumMinistryTypes?: string[]
  belgiumLearnMoreUrl?: string

  showGreece?: boolean
  greeceName?: string
  greecePopulation?: string
  greeceChristianPercent?: string
  greeceImage?: string
  greeceMinistryTypes?: string[]
  greeceLearnMoreUrl?: string

  showPortugal?: boolean
  portugalName?: string
  portugalPopulation?: string
  portugalChristianPercent?: string
  portugalImage?: string
  portugalMinistryTypes?: string[]
  portugalLearnMoreUrl?: string

  showSweden?: boolean
  swedenName?: string
  swedenPopulation?: string
  swedenChristianPercent?: string
  swedenImage?: string
  swedenMinistryTypes?: string[]
  swedenLearnMoreUrl?: string

  showNorway?: boolean
  norwayName?: string
  norwayPopulation?: string
  norwayChristianPercent?: string
  norwayImage?: string
  norwayMinistryTypes?: string[]
  norwayLearnMoreUrl?: string

  showDenmark?: boolean
  denmarkName?: string
  denmarkPopulation?: string
  denmarkChristianPercent?: string
  denmarkImage?: string
  denmarkMinistryTypes?: string[]
  denmarkLearnMoreUrl?: string

  showFinland?: boolean
  finlandName?: string
  finlandPopulation?: string
  finlandChristianPercent?: string
  finlandImage?: string
  finlandMinistryTypes?: string[]
  finlandLearnMoreUrl?: string

  showIreland?: boolean
  irelandName?: string
  irelandPopulation?: string
  irelandChristianPercent?: string
  irelandImage?: string
  irelandMinistryTypes?: string[]
  irelandLearnMoreUrl?: string

  showNewZealand?: boolean
  newZealandName?: string
  newZealandPopulation?: string
  newZealandChristianPercent?: string
  newZealandImage?: string
  newZealandMinistryTypes?: string[]
  newZealandLearnMoreUrl?: string

  showAustralia?: boolean
  australiaName?: string
  australiaPopulation?: string
  australiaChristianPercent?: string
  australiaImage?: string
  australiaMinistryTypes?: string[]
  australiaLearnMoreUrl?: string

  showPapuaNewGuinea?: boolean
  papuaNewGuineaName?: string
  papuaNewGuineaPopulation?: string
  papuaNewGuineaChristianPercent?: string
  papuaNewGuineaImage?: string
  papuaNewGuineaMinistryTypes?: string[]
  papuaNewGuineaLearnMoreUrl?: string

  showFiji?: boolean
  fijiName?: string
  fijiPopulation?: string
  fijiChristianPercent?: string
  fijiImage?: string
  fijiMinistryTypes?: string[]
  fijiLearnMoreUrl?: string

  showMalaysia?: boolean
  malaysiaName?: string
  malaysiaPopulation?: string
  malaysiaChristianPercent?: string
  malaysiaImage?: string
  malaysiaMinistryTypes?: string[]
  malaysiaLearnMoreUrl?: string

  showSingapore?: boolean
  singaporeName?: string
  singaporePopulation?: string
  singaporeChristianPercent?: string
  singaporeImage?: string
  singaporeMinistryTypes?: string[]
  singaporeLearnMoreUrl?: string

  showCambodia?: boolean
  cambodiaName?: string
  cambodiaPopulation?: string
  cambodiaChristianPercent?: string
  cambodiaImage?: string
  cambodiaMinistryTypes?: string[]
  cambodiaLearnMoreUrl?: string

  showLaos?: boolean
  laosName?: string
  laosPopulation?: string
  laosChristianPercent?: string
  laosImage?: string
  laosMinistryTypes?: string[]
  laosLearnMoreUrl?: string

  showMongolia?: boolean
  mongoliaName?: string
  mongoliaPopulation?: string
  mongoliaChristianPercent?: string
  mongoliaImage?: string
  mongoliaMinistryTypes?: string[]
  mongoliaLearnMoreUrl?: string

  showNepal?: boolean
  nepalName?: string
  nepalPopulation?: string
  nepalChristianPercent?: string
  nepalImage?: string
  nepalMinistryTypes?: string[]
  nepalLearnMoreUrl?: string

  showSriLanka?: boolean
  sriLankaName?: string
  sriLankaPopulation?: string
  sriLankaChristianPercent?: string
  sriLankaImage?: string
  sriLankaMinistryTypes?: string[]
  sriLankaLearnMoreUrl?: string

  showKazakhstan?: boolean
  kazakhstanName?: string
  kazakhstanPopulation?: string
  kazakhstanChristianPercent?: string
  kazakhstanImage?: string
  kazakhstanMinistryTypes?: string[]
  kazakhstanLearnMoreUrl?: string

  showUzbekistan?: boolean
  uzbekistanName?: string
  uzbekistanPopulation?: string
  uzbekistanChristianPercent?: string
  uzbekistanImage?: string
  uzbekistanMinistryTypes?: string[]
  uzbekistanLearnMoreUrl?: string

  showTajikistan?: boolean
  tajikistanName?: string
  tajikistanPopulation?: string
  tajikistanChristianPercent?: string
  tajikistanImage?: string
  tajikistanMinistryTypes?: string[]
  tajikistanLearnMoreUrl?: string

  showKyrgyzstan?: boolean
  kyrgyzstanName?: string
  kyrgyzstanPopulation?: string
  kyrgyzstanChristianPercent?: string
  kyrgyzstanImage?: string
  kyrgyzstanMinistryTypes?: string[]
  kyrgyzstanLearnMoreUrl?: string

  showTurkmenistan?: boolean
  turkmenistanName?: string
  turkmenistanPopulation?: string
  turkmenistanChristianPercent?: string
  turkmenistanImage?: string
  turkmenistanMinistryTypes?: string[]
  turkmenistanLearnMoreUrl?: string

  showAzerbaijan?: boolean
  azerbaijanName?: string
  azerbaijanPopulation?: string
  azerbaijanChristianPercent?: string
  azerbaijanImage?: string
  azerbaijanMinistryTypes?: string[]
  azerbaijanLearnMoreUrl?: string

  showGeorgia?: boolean
  georgiaName?: string
  georgiaPopulation?: string
  georgiaChristianPercent?: string
  georgiaImage?: string
  georgiaMinistryTypes?: string[]
  georgiaLearnMoreUrl?: string

  showArmenia?: boolean
  armeniaName?: string
  armeniaPopulation?: string
  armeniaChristianPercent?: string
  armeniaImage?: string
  armeniaMinistryTypes?: string[]
  armeniaLearnMoreUrl?: string

  showJordan?: boolean
  jordanName?: string
  jordanPopulation?: string
  jordanChristianPercent?: string
  jordanImage?: string
  jordanMinistryTypes?: string[]
  jordanLearnMoreUrl?: string

  showLebanon?: boolean
  lebanonName?: string
  lebanonPopulation?: string
  lebanonChristianPercent?: string
  lebanonImage?: string
  lebanonMinistryTypes?: string[]
  lebanonLearnMoreUrl?: string

  showOman?: boolean
  omanName?: string
  omanPopulation?: string
  omanChristianPercent?: string
  omanImage?: string
  omanMinistryTypes?: string[]
  omanLearnMoreUrl?: string

  showKuwait?: boolean
  kuwaitName?: string
  kuwaitPopulation?: string
  kuwaitChristianPercent?: string
  kuwaitImage?: string
  kuwaitMinistryTypes?: string[]
  kuwaitLearnMoreUrl?: string

  showQatar?: boolean
  qatarName?: string
  qatarPopulation?: string
  qatarChristianPercent?: string
  qatarImage?: string
  qatarMinistryTypes?: string[]
  qatarLearnMoreUrl?: string

  showUAE?: boolean
  uaeName?: string
  uaePopulation?: string
  uaeChristianPercent?: string
  uaeImage?: string
  uaeMinistryTypes?: string[]
  uaeLearnMoreUrl?: string

  showBahrain?: boolean
  bahrainName?: string
  bahrainPopulation?: string
  bahrainChristianPercent?: string
  bahrainImage?: string
  bahrainMinistryTypes?: string[]
  bahrainLearnMoreUrl?: string

  showLibya?: boolean
  libyaName?: string
  libyaPopulation?: string
  libyaChristianPercent?: string
  libyaImage?: string
  libyaMinistryTypes?: string[]
  libyaLearnMoreUrl?: string

  showTunisia?: boolean
  tunisiaName?: string
  tunisiaPopulation?: string
  tunisiaChristianPercent?: string
  tunisiaImage?: string
  tunisiaMinistryTypes?: string[]
  tunisiaLearnMoreUrl?: string

  showMauritania?: boolean
  mauritaniaName?: string
  mauritaniaPopulation?: string
  mauritaniaChristianPercent?: string
  mauritaniaImage?: string
  mauritaniaMinistryTypes?: string[]
  mauritaniaLearnMoreUrl?: string

  showNiger?: boolean
  nigerName?: string
  nigerPopulation?: string
  nigerChristianPercent?: string
  nigerImage?: string
  nigerMinistryTypes?: string[]
  nigerLearnMoreUrl?: string

  showBenin?: boolean
  beninName?: string
  beninPopulation?: string
  beninChristianPercent?: string
  beninImage?: string
  beninMinistryTypes?: string[]
  beninLearnMoreUrl?: string

  showTogo?: boolean
  togoName?: string
  togoPopulation?: string
  togoChristianPercent?: string
  togoImage?: string
  togoMinistryTypes?: string[]
  togoLearnMoreUrl?: string

  showSierraLeone?: boolean
  sierraLeoneName?: string
  sierraLeonePopulation?: string
  sierraLeoneChristianPercent?: string
  sierraLeoneImage?: string
  sierraLeoneMinistryTypes?: string[]
  sierraLeoneLearnMoreUrl?: string

  showLiberia?: boolean
  liberiaName?: string
  liberiaPopulation?: string
  liberiaChristianPercent?: string
  liberiaImage?: string
  liberiaMinistryTypes?: string[]
  liberiaLearnMoreUrl?: string

  showGuinea?: boolean
  guineaName?: string
  guineaPopulation?: string
  guineaChristianPercent?: string
  guineaImage?: string
  guineaMinistryTypes?: string[]
  guineaLearnMoreUrl?: string

  showIvoryCoast?: boolean
  ivoryCoastName?: string
  ivoryCoastPopulation?: string
  ivoryCoastChristianPercent?: string
  ivoryCoastImage?: string
  ivoryCoastMinistryTypes?: string[]
  ivoryCoastLearnMoreUrl?: string

  showGambia?: boolean
  gambiaName?: string
  gambiaPopulation?: string
  gambiaChristianPercent?: string
  gambiaImage?: string
  gambiaMinistryTypes?: string[]
  gambiaLearnMoreUrl?: string

  showGuineaBissau?: boolean
  guineaBissauName?: string
  guineaBissauPopulation?: string
  guineaBissauChristianPercent?: string
  guineaBissauImage?: string
  guineaBissauMinistryTypes?: string[]
  guineaBissauLearnMoreUrl?: string

  showEquatorialGuinea?: boolean
  equatorialGuineaName?: string
  equatorialGuineaPopulation?: string
  equatorialGuineaChristianPercent?: string
  equatorialGuineaImage?: string
  equatorialGuineaMinistryTypes?: string[]
  equatorialGuineaLearnMoreUrl?: string

  showGabon?: boolean
  gabonName?: string
  gabonPopulation?: string
  gabonChristianPercent?: string
  gabonImage?: string
  gabonMinistryTypes?: string[]
  gabonLearnMoreUrl?: string

  showCongo?: boolean
  congoName?: string
  congoPopulation?: string
  congoChristianPercent?: string
  congoImage?: string
  congoMinistryTypes?: string[]
  congoLearnMoreUrl?: string

  showDRC?: boolean
  drcName?: string
  drcPopulation?: string
  drcChristianPercent?: string
  drcImage?: string
  drcMinistryTypes?: string[]
  drcLearnMoreUrl?: string

  showCAR?: boolean
  carName?: string
  carPopulation?: string
  carChristianPercent?: string
  carImage?: string
  carMinistryTypes?: string[]
  carLearnMoreUrl?: string

  showSouthSudan?: boolean
  southSudanName?: string
  southSudanPopulation?: string
  southSudanChristianPercent?: string
  southSudanImage?: string
  southSudanMinistryTypes?: string[]
  southSudanLearnMoreUrl?: string

  showEritrea?: boolean
  eritreaName?: string
  eritreaPopulation?: string
  eritreaChristianPercent?: string
  eritreaImage?: string
  eritreaMinistryTypes?: string[]
  eritreaLearnMoreUrl?: string

  showDjibouti?: boolean
  djiboutiName?: string
  djiboutiPopulation?: string
  djiboutiChristianPercent?: string
  djiboutiImage?: string
  djiboutiMinistryTypes?: string[]
  djiboutiLearnMoreUrl?: string

  showBurundi?: boolean
  burundiName?: string
  burundiPopulation?: string
  burundiChristianPercent?: string
  burundiImage?: string
  burundiMinistryTypes?: string[]
  burundiLearnMoreUrl?: string

  showBotswana?: boolean
  botswanaName?: string
  botswanaPopulation?: string
  botswanaChristianPercent?: string
  botswanaImage?: string
  botswanaMinistryTypes?: string[]
  botswanaLearnMoreUrl?: string

  showNamibia?: boolean
  namibiaName?: string
  namibiaPopulation?: string
  namibiaChristianPercent?: string
  namibiaImage?: string
  namibiaMinistryTypes?: string[]
  namibiaLearnMoreUrl?: string

  showLesotho?: boolean
  lesothoName?: string
  lesothoPopulation?: string
  lesothoChristianPercent?: string
  lesothoImage?: string
  lesothoMinistryTypes?: string[]
  lesothoLearnMoreUrl?: string

  showEswatini?: boolean
  eswatiniName?: string
  eswatiniPopulation?: string
  eswatiniChristianPercent?: string
  eswatiniImage?: string
  eswatiniMinistryTypes?: string[]
  eswatiniLearnMoreUrl?: string

  showMauritius?: boolean
  mauritiusName?: string
  mauritiusPopulation?: string
  mauritiusChristianPercent?: string
  mauritiusImage?: string
  mauritiusMinistryTypes?: string[]
  mauritiusLearnMoreUrl?: string

  showComoros?: boolean
  comorosName?: string
  comorosPopulation?: string
  comorosChristianPercent?: string
  comorosImage?: string
  comorosMinistryTypes?: string[]
  comorosLearnMoreUrl?: string

  showCapeVerde?: boolean
  capeVerdeName?: string
  capeVerdePopulation?: string
  capeVerdeChristianPercent?: string
  capeVerdeImage?: string
  capeVerdeMinistryTypes?: string[]
  capeVerdeLearnMoreUrl?: string

  showSaoTomeAndPrincipe?: boolean
  saoTomeAndPrincipeName?: string
  saoTomeAndPrincipePopulation?: string
  saoTomeAndPrincipeChristianPercent?: string
  saoTomeAndPrincipeImage?: string
  saoTomeAndPrincipeMinistryTypes?: string[]
  saoTomeAndPrincipeLearnMoreUrl?: string

  showSeychelles?: boolean
  seychellesName?: string
  seychellesPopulation?: string
  seychellesChristianPercent?: string
  seychellesImage?: string
  seychellesMinistryTypes?: string[]
  seychellesLearnMoreUrl?: string
}

export function MissionMapPage({
  className,
  title = "Our Global Mission Field",
  subtitle = "Explore countries where our mission work is active or planned",
  backgroundColor = "transparent",
  textColor = "#ffffff",
  mapBackgroundColor = "#0f172a",
  mapLandColor = "#1e293b",
  mapBorderColor = "#475569",
  titleColor = "#ffffff",
    titleGradientFrom = "#2563eb",
  titleGradientTo = "#1e293b",
  useTitleGradient = false,

  multipleministriesColor = "#2e7d32",
  megaCityMediaCampaignColor = "#0a6c93",
  window1040MediaOutreachColor = "#4b2c63",
  ukraineAidColor = "#f1a100",
  traumaRecoveryColor = "#b51625",
  jewishMinistryColor = "#0f006f",
  socialMediaOutreachColor = "#ba0273",
  mediaOutreachColor = "#d32f2f",

  showMultipleMinistries = true,
  showMegaCityMediaCampaign = true,
  showWindow1040MediaOutreach = true,
  showUkraineAid = true,
  showTraumaRecovery = true,
  showJewishMinistry = true,
  showSocialMediaOutreach = true,
  showMediaOutreach = true,

  multipleministriesName = "Multiple Ministries",
  megaCityMediaCampaignName = "Mega City Media Campaign",
  window1040MediaOutreachName = "10/40 Window Media Outreach",
  ukraineAidName = "Ukraine Aid",
  traumaRecoveryName = "Trauma Recovery",
  jewishMinistryName = "Jewish Ministry",
  socialMediaOutreachName = "Social Media Outreach",
  mediaOutreachName = "Media Outreach",

  multipleministriesUrl = "",
  megaCityMediaCampaignUrl = "",
  window1040MediaOutreachUrl = "",
  ukraineAidUrl = "",
  traumaRecoveryUrl = "",
  jewishMinistryUrl = "",
  socialMediaOutreachUrl = "",
  mediaOutreachUrl = "",

  popupVerticalOffset = 35,
  popupBackgroundColor = "#1e293b",
  popupTextColor = "#ffffff",

  // Ministry links shown in popup badges (JSON array)
  popupMinistryLinksJson = "",

  // City data as JSON string (overrides hardcoded CITY_DATA when set)
  cityDataJson = "",

  // Original 21 countries (visible by default)
  showIsrael = true,
  israelName = "Israel",
  israelPopulation = "9.5M",
  israelChristianPercent = "2%",
  israelImage = "/placeholder.svg?height=200&width=300",
  israelMinistryTypes = ["jewish"],
  israelLearnMoreUrl = "",

    showWesternSahara = true,
  westernSaharaName = "Western Sahara",
  westernSaharaPopulation = "652K",
  westernSaharaChristianPercent = "<0.1%",
  westernSaharaImage = "/placeholder.svg?height=200&width=300",
  westernSaharaMinistryTypes = ["window1040"],
  westernSaharaLearnMoreUrl = "",

  showUkraine = true,
  ukraineName = "Ukraine",
  ukrainePopulation = "41M",
  ukraineChristianPercent = "87%",
  ukraineImage = "/placeholder.svg?height=200&width=300",
  ukraineMinistryTypes = ["media", "mediaoutreach", "humanitarian"],
  ukraineLearnMoreUrl = "",

  showMoldova = true,
  moldovaName = "Moldova",
  moldovaPopulation = "2.5M",
  moldovaChristianPercent = "95%",
  moldovaImage = "/placeholder.svg?height=200&width=300",
  moldovaMinistryTypes = ["megacity"],
  moldovaLearnMoreUrl = "",

  showIndia = true,
  indiaName = "India",
  indiaPopulation = "1.4B",
  indiaChristianPercent = "2.3%",
  indiaImage = "/placeholder.svg?height=200&width=300",
  indiaMinistryTypes = ["media"],
  indiaLearnMoreUrl = "",

  showPhilippines = true,
  philippinesName = "Philippines",
  philippinesPopulation = "113M",
  philippinesChristianPercent = "93%",
  philippinesImage = "/placeholder.svg?height=200&width=300",
  philippinesMinistryTypes = ["media"],
  philippinesLearnMoreUrl = "",

  showBrazil = true,
  brazilName = "Brazil",
  brazilPopulation = "215M",
  brazilChristianPercent = "88%",
  brazilImage = "/placeholder.svg?height=200&width=300",
  brazilMinistryTypes = ["media"],
  brazilLearnMoreUrl = "",

  showNigeria = true,
  nigeriaName = "Nigeria",
  nigeriaPopulation = "218M",
  nigeriaChristianPercent = "49%",
  nigeriaImage = "/placeholder.svg?height=200&width=300",
  nigeriaMinistryTypes = ["media"],
  nigeriaLearnMoreUrl = "",

  showEthiopia = true,
  ethiopiaName = "Ethiopia",
  ethiopiaPopulation = "120M",
  ethiopiaChristianPercent = "64%",
  ethiopiaImage = "/placeholder.svg?height=200&width=300",
  ethiopiaMinistryTypes = ["media"],
  ethiopiaLearnMoreUrl = "",

  showMexico = true,
  mexicoName = "Mexico",
  mexicoPopulation = "128M",
  mexicoChristianPercent = "95%",
  mexicoImage = "/placeholder.svg?height=200&width=300",
  mexicoMinistryTypes = ["media"],
  mexicoLearnMoreUrl = "",

  showKenya = true,
  kenyaName = "Kenya",
  kenyaPopulation = "54M",
  kenyaChristianPercent = "85%",
  kenyaImage = "/placeholder.svg?height=200&width=300",
  kenyaMinistryTypes = ["media"],
  kenyaLearnMoreUrl = "",

  showColombia = true,
  colombiaName = "Colombia",
  colombiaPopulation = "51M",
  colombiaChristianPercent = "92%",
  colombiaImage = "/placeholder.svg?height=200&width=300",
  colombiaMinistryTypes = ["media"],
  colombiaLearnMoreUrl = "",

  showPeru = true,
  peruName = "Peru",
  peruPopulation = "33M",
  peruChristianPercent = "94%",
  peruImage = "/placeholder.svg?height=200&width=300",
  peruMinistryTypes = ["media"],
  peruLearnMoreUrl = "",

  showGhana = true,
  ghanaName = "Ghana",
  ghanaPopulation = "32M",
  ghanaChristianPercent = "71%",
  ghanaImage = "/placeholder.svg?height=200&width=300",
  ghanaMinistryTypes = ["media"],
  ghanaLearnMoreUrl = "",

  showUganda = true,
  ugandaName = "Uganda",
  ugandaPopulation = "47M",
  ugandaChristianPercent = "84%",
  ugandaImage = "/placeholder.svg?height=200&width=300",
  ugandaMinistryTypes = ["media"],
  ugandaLearnMoreUrl = "",

  showTanzania = true,
  tanzaniaName = "Tanzania",
  tanzaniaPopulation = "63M",
  tanzaniaChristianPercent = "61%",
  tanzaniaImage = "/placeholder.svg?height=200&width=300",
  tanzaniaMinistryTypes = ["media"],
  tanzaniaLearnMoreUrl = "",

  showRwanda = true,
  rwandaName = "Rwanda",
  rwandaPopulation = "13M",
  rwandaChristianPercent = "93%",
  rwandaImage = "/placeholder.svg?height=200&width=300",
  rwandaMinistryTypes = ["trauma"],
  rwandaLearnMoreUrl = "",

  showZambia = true,
  zambiaName = "Zambia",
  zambiaPopulation = "19M",
  zambiaChristianPercent = "95%",
  zambiaImage = "/placeholder.svg?height=200&width=300",
  zambiaMinistryTypes = ["media"],
  zambiaLearnMoreUrl = "",

  showMalawi = true,
  malawiName = "Malawi",
  malawiPopulation = "20M",
  malawiChristianPercent = "82%",
  malawiImage = "/placeholder.svg?height=200&width=300",
  malawiMinistryTypes = ["media"],
  malawiLearnMoreUrl = "",

  showGuatemala = true,
  guatemalaName = "Guatemala",
  guatemalaPopulation = "18M",
  guatemalaChristianPercent = "95%",
  guatemalaImage = "/placeholder.svg?height=200&width=300",
  guatemalaMinistryTypes = ["media"],
  guatemalaLearnMoreUrl = "",

  showHonduras = true,
  hondurasName = "Honduras",
  hondurasPopulation = "10M",
  hondurasChristianPercent = "97%",
  hondurasImage = "/placeholder.svg?height=200&width=300",
  hondurasMinistryTypes = ["media"],
  hondurasLearnMoreUrl = "",

  showElSalvador = true,
  elSalvadorName = "El Salvador",
  elSalvadorPopulation = "6.5M",
  elSalvadorChristianPercent = "88%",
  elSalvadorImage = "/placeholder.svg?height=200&width=300",
  elSalvadorMinistryTypes = ["media"],
  elSalvadorLearnMoreUrl = "",

  showHaiti = true,
  haitiName = "Haiti",
  haitiPopulation = "11.5M",
  haitiChristianPercent = "87%",
  haitiImage = "/placeholder.svg?height=200&width=300",
  haitiMinistryTypes = ["humanitarian"],
  haitiLearnMoreUrl = "",

  // Additional countries (hidden by default)
  showChina = false,
  chinaName = "China",
  chinaPopulation = "1.4B",
  chinaChristianPercent = "5%",
  chinaImage = "/placeholder.svg?height=200&width=300",
  chinaMinistryTypes = ["future"],
  chinaLearnMoreUrl = "",

  showIndonesia = false,
  indonesiaName = "Indonesia",
  indonesiaPopulation = "275M",
  indonesiaChristianPercent = "10%",
  indonesiaImage = "/placeholder.svg?height=200&width=300",
  indonesiaMinistryTypes = ["future"],
  indonesiaLearnMoreUrl = "",

  showPakistan = false,
  pakistanName = "Pakistan",
  pakistanPopulation = "231M",
  pakistanChristianPercent = "2%",
  pakistanImage = "/placeholder.svg?height=200&width=300",
  pakistanMinistryTypes = ["future"],
  pakistanLearnMoreUrl = "",

  showBangladesh = false,
  bangladeshName = "Bangladesh",
  bangladeshPopulation = "169M",
  bangladeshChristianPercent = "0.5%",
  bangladeshImage = "/placeholder.svg?height=200&width=300",
  bangladeshMinistryTypes = ["future"],
  bangladeshLearnMoreUrl = "",

  showJapan = false,
  japanName = "Japan",
  japanPopulation = "125M",
  japanChristianPercent = "1%",
  japanImage = "/placeholder.svg?height=200&width=300",
  japanMinistryTypes = ["future"],
  japanLearnMoreUrl = "",

  showVietnam = false,
  vietnamName = "Vietnam",
  vietnamPopulation = "98M",
  vietnamChristianPercent = "8%",
  vietnamImage = "/placeholder.svg?height=200&width=300",
  vietnamMinistryTypes = ["future"],
  vietnamLearnMoreUrl = "",

  showThailand = false,
  thailandName = "Thailand",
  thailandPopulation = "70M",
  thailandChristianPercent = "1%",
  thailandImage = "/placeholder.svg?height=200&width=300",
  thailandMinistryTypes = ["future"],
  thailandLearnMoreUrl = "",

  showMyanmar = false,
  myanmarName = "Myanmar",
  myanmarPopulation = "54M",
  myanmarChristianPercent = "6%",
  myanmarImage = "/placeholder.svg?height=200&width=300",
  myanmarMinistryTypes = ["future"],
  myanmarLearnMoreUrl = "",

  showSouthKorea = false,
  southKoreaName = "South Korea",
  southKoreaPopulation = "52M",
  southKoreaChristianPercent = "29%",
  southKoreaImage = "/placeholder.svg?height=200&width=300",
  southKoreaMinistryTypes = ["future"],
  southKoreaLearnMoreUrl = "",

  showAfghanistan = false,
  afghanistanName = "Afghanistan",
  afghanistanPopulation = "40M",
  afghanistanChristianPercent = "0.01%",
  afghanistanImage = "/placeholder.svg?height=200&width=300",
  afghanistanMinistryTypes = ["future"],
  afghanistanLearnMoreUrl = "",

  showIraq = false,
  iraqName = "Iraq",
  iraqPopulation = "42M",
  iraqChristianPercent = "1%",
  iraqImage = "/placeholder.svg?height=200&width=300",
  iraqMinistryTypes = ["arabic"],
  iraqLearnMoreUrl = "",

  showSyria = false,
  syriaName = "Syria",
  syriaPopulation = "19M",
  syriaChristianPercent = "5%",
  syriaImage = "/placeholder.svg?height=200&width=300",
  syriaMinistryTypes = ["arabic"],
  syriaLearnMoreUrl = "",

  showYemen = false,
  yemenName = "Yemen",
  yemenPopulation = "31M",
  yemenChristianPercent = "0.01%",
  yemenImage = "/placeholder.svg?height=200&width=300",
  yemenMinistryTypes = ["arabic"],
  yemenLearnMoreUrl = "",

  showSaudiArabia = false,
  saudiArabiaName = "Saudi Arabia",
  saudiArabiaPopulation = "35M",
  saudiArabiaChristianPercent = "4%",
  saudiArabiaImage = "/placeholder.svg?height=200&width=300",
  saudiArabiaMinistryTypes = ["arabic"],
  saudiArabiaLearnMoreUrl = "",

  showIran = false,
  iranName = "Iran",
  iranPopulation = "87M",
  iranChristianPercent = "0.5%",
  iranImage = "/placeholder.svg?height=200&width=300",
  iranMinistryTypes = ["arabic"],
  iranLearnMoreUrl = "",

  showTurkey = false,
  turkeyName = "Turkey",
  turkeyPopulation = "85M",
  turkeyChristianPercent = "0.2%",
  turkeyImage = "/placeholder.svg?height=200&width=300",
  turkeyMinistryTypes = ["future"],
  turkeyLearnMoreUrl = "",

  showEgypt = false,
  egyptName = "Egypt",
  egyptPopulation = "106M",
  egyptChristianPercent = "10%",
  egyptImage = "/placeholder.svg?height=200&width=300",
  egyptMinistryTypes = ["arabic"],
  egyptLearnMoreUrl = "",

  showSouthAfrica = false,
  southAfricaName = "South Africa",
  southAfricaPopulation = "60M",
  southAfricaChristianPercent = "86%",
  southAfricaImage = "/placeholder.svg?height=200&width=300",
  southAfricaMinistryTypes = ["future"],
  southAfricaLearnMoreUrl = "",

  showAlgeria = false,
  algeriaName = "Algeria",
  algeriaPopulation = "45M",
  algeriaChristianPercent = "0.2%",
  algeriaImage = "/placeholder.svg?height=200&width=300",
  algeriaMinistryTypes = ["arabic"],
  algeriaLearnMoreUrl = "",

  showMorocco = false,
  moroccoName = "Morocco",
  moroccoPopulation = "37M",
  moroccoChristianPercent = "0.1%",
  moroccoImage = "/placeholder.svg?height=200&width=300",
  moroccoMinistryTypes = ["arabic"],
  moroccoLearnMoreUrl = "",

  showSudan = false,
  sudanName = "Sudan",
  sudanPopulation = "45M",
  sudanChristianPercent = "5%",
  sudanImage = "/placeholder.svg?height=200&width=300",
  sudanMinistryTypes = ["arabic"],
  sudanLearnMoreUrl = "",

  showCameroon = false,
  cameroonName = "Cameroon",
  cameroonPopulation = "28M",
  cameroonChristianPercent = "70%",
  cameroonImage = "/placeholder.svg?height=200&width=300",
  cameroonMinistryTypes = ["future"],
  cameroonLearnMoreUrl = "",

  showMozambique = false,
  mozambiqueName = "Mozambique",
  mozambiquePopulation = "32M",
  mozambiqueChristianPercent = "56%",
  mozambiqueImage = "/placeholder.svg?height=200&width=300",
  mozambiqueMinistryTypes = ["future"],
  mozambiqueLearnMoreUrl = "",

  showMadagascar = false,
  madagascarName = "Madagascar",
  madagascarPopulation = "29M",
  madagascarChristianPercent = "85%",
  madagascarImage = "/placeholder.svg?height=200&width=300",
  madagascarMinistryTypes = ["future"],
  madagascarLearnMoreUrl = "",

  showAngola = false,
  angolaName = "Angola",
  angolaPopulation = "34M",
  angolaChristianPercent = "95%",
  angolaImage = "/placeholder.svg?height=200&width=300",
  angolaMinistryTypes = ["future"],
  angolaLearnMoreUrl = "",

  showZimbabwe = false,
  zimbabweName = "Zimbabwe",
  zimbabwePopulation = "15M",
  zimbabweChristianPercent = "87%",
  zimbabweImage = "/placeholder.svg?height=200&width=300",
  zimbabweMinistryTypes = ["future"],
  zimbabweLearnMoreUrl = "",

  showMali = false,
  maliName = "Mali",
  maliPopulation = "21M",
  maliChristianPercent = "3%",
  maliImage = "/placeholder.svg?height=200&width=300",
  maliMinistryTypes = ["future"],
  maliLearnMoreUrl = "",

  showBurkinaFaso = false,
  burkinaFasoName = "Burkina Faso",
  burkinaFasoPopulation = "22M",
  burkinaFasoChristianPercent = "23%",
  burkinaFasoImage = "/placeholder.svg?height=200&width=300",
  burkinaFasoMinistryTypes = ["future"],
  burkinaFasoLearnMoreUrl = "",

  showSenegal = false,
  senegalName = "Senegal",
  senegalPopulation = "17M",
  senegalChristianPercent = "5%",
  senegalImage = "/placeholder.svg?height=200&width=300",
  senegalMinistryTypes = ["future"],
  senegalLearnMoreUrl = "",

  showChad = false,
  chadName = "Chad",
  chadPopulation = "17M",
  chadChristianPercent = "40%",
  chadImage = "/placeholder.svg?height=200&width=300",
  chadMinistryTypes = ["future"],
  chadLearnMoreUrl = "",

  showSomalia = false,
  somaliaName = "Somalia",
  somaliaPopulation = "16M",
  somaliaChristianPercent = "0.01%",
  somaliaImage = "/placeholder.svg?height=200&width=300",
  somaliaMinistryTypes = ["future"],
  somaliaLearnMoreUrl = "",

  showArgentina = false,
  argentinaName = "Argentina",
  argentinaPopulation = "46M",
  argentinaChristianPercent = "92%",
  argentinaImage = "/placeholder.svg?height=200&width=300",
  argentinaMinistryTypes = ["future"],
  argentinaLearnMoreUrl = "",

  showVenezuela = false,
  venezuelaName = "Venezuela",
  venezuelaPopulation = "28M",
  venezuelaChristianPercent = "96%",
  venezuelaImage = "/placeholder.svg?height=200&width=300",
  venezuelaMinistryTypes = ["future"],
  venezuelaLearnMoreUrl = "",

  showChile = false,
  chileName = "Chile",
  chilePopulation = "19M",
  chileChristianPercent = "88%",
  chileImage = "/placeholder.svg?height=200&width=300",
  chileMinistryTypes = ["future"],
  chileLearnMoreUrl = "",

  showEcuador = false,
  ecuadorName = "Ecuador",
  ecuadorPopulation = "18M",
  ecuadorChristianPercent = "94%",
  ecuadorImage = "/placeholder.svg?height=200&width=300",
  ecuadorMinistryTypes = ["future"],
  ecuadorLearnMoreUrl = "",

  showBolivia = false,
  boliviaName = "Bolivia",
  boliviaPopulation = "12M",
  boliviaChristianPercent = "96%",
  boliviaImage = "/placeholder.svg?height=200&width=300",
  boliviaMinistryTypes = ["future"],
  boliviaLearnMoreUrl = "",

  showParaguay = false,
  paraguayName = "Paraguay",
  paraguayPopulation = "7M",
  paraguayChristianPercent = "96%",
  paraguayImage = "/placeholder.svg?height=200&width=300",
  paraguayMinistryTypes = ["future"],
  paraguayLearnMoreUrl = "",

  showSuriname = false,
  surinameName = "Suriname",
  surinamePopulation = "0.6M",
  surinameChristianPercent = "48%",
  surinameImage = "/placeholder.svg?height=200&width=300",
  surinameMinistryTypes = ["future"],
  surinameLearnMoreUrl = "",
  
  showGuyana = false,
  guyanaName = "Guyana",
  guyanaPopulation = "0.8M",
  guyanaChristianPercent = "57%",
  guyanaImage = "/placeholder.svg?height=200&width=300",
  guyanaMinistryTypes = ["future"],
  guyanaLearnMoreUrl = "",

  showPalestine = false,
  palestineName = "Palestine",
  palestinePopulation = "5.3M",
  palestineChristianPercent = "1%",
  palestineImage = "/placeholder.svg?height=200&width=300",
  palestineMinistryTypes = ["future"],
  palestineLearnMoreUrl = "",

  showUruguay = false,
  uruguayName = "Uruguay",
  uruguayPopulation = "3.5M",
  uruguayChristianPercent = "58%",
  uruguayImage = "/placeholder.svg?height=200&width=300",
  uruguayMinistryTypes = ["future"],
  uruguayLearnMoreUrl = "",

  showNicaragua = false,
  nicaraguaName = "Nicaragua",
  nicaraguaPopulation = "6.8M",
  nicaraguaChristianPercent = "95%",
  nicaraguaImage = "/placeholder.svg?height=200&width=300",
  nicaraguaMinistryTypes = ["future"],
  nicaraguaLearnMoreUrl = "",

  showCostaRica = false,
  costaRicaName = "Costa Rica",
  costaRicaPopulation = "5.2M",
  costaRicaChristianPercent = "90%",
  costaRicaImage = "/placeholder.svg?height=200&width=300",
  costaRicaMinistryTypes = ["future"],
  costaRicaLearnMoreUrl = "",

  showPanama = false,
  panamaName = "Panama",
  panamaPopulation = "4.4M",
  panamaChristianPercent = "93%",
  panamaImage = "/placeholder.svg?height=200&width=300",
  panamaMinistryTypes = ["future"],
  panamaLearnMoreUrl = "",

  showDominicanRepublic = false,
  dominicanRepublicName = "Dominican Republic",
  dominicanRepublicPopulation = "11M",
  dominicanRepublicChristianPercent = "88%",
  dominicanRepublicImage = "/placeholder.svg?height=200&width=300",
  dominicanRepublicMinistryTypes = ["future"],
  dominicanRepublicLearnMoreUrl = "",

  showCuba = false,
  cubaName = "Cuba",
  cubaPopulation = "11M",
  cubaChristianPercent = "60%",
  cubaImage = "/placeholder.svg?height=200&width=300",
  cubaMinistryTypes = ["future"],
  cubaLearnMoreUrl = "",

  showJamaica = false,
  jamaicaName = "Jamaica",
  jamaicaPopulation = "3M",
  jamaicaChristianPercent = "77%",
  jamaicaImage = "/placeholder.svg?height=200&width=300",
  jamaicaMinistryTypes = ["future"],
  jamaicaLearnMoreUrl = "",

  showTrinidadAndTobago = false,
  trinidadAndTobagoName = "Trinidad and Tobago",
  trinidadAndTobagoPopulation = "1.5M",
  trinidadAndTobagoChristianPercent = "65%",
  trinidadAndTobagoImage = "/placeholder.svg?height=200&width=300",
  trinidadAndTobagoMinistryTypes = ["future"],
  trinidadAndTobagoLearnMoreUrl = "",

  showRussia = false,
  russiaName = "Russia",
  russiaPopulation = "144M",
  russiaChristianPercent = "73%",
  russiaImage = "/placeholder.svg?height=200&width=300",
  russiaMinistryTypes = ["future"],
  russiaLearnMoreUrl = "",

  showPoland = false,
  polandName = "Poland",
  polandPopulation = "38M",
  polandChristianPercent = "92%",
  polandImage = "/placeholder.svg?height=200&width=300",
  polandMinistryTypes = ["future"],
  polandLearnMoreUrl = "",

  showRomania = false,
  romaniaName = "Romania",
  romaniaPopulation = "19M",
  romaniaChristianPercent = "99%",
  romaniaImage = "/placeholder.svg?height=200&width=300",
  romaniaMinistryTypes = ["future"],
  romaniaLearnMoreUrl = "",

  showCzechRepublic = false,
  czechRepublicName = "Czech Republic",
  czechRepublicPopulation = "10.5M",
  czechRepublicChristianPercent = "21%",
  czechRepublicImage = "/placeholder.svg?height=200&width=300",
  czechRepublicMinistryTypes = ["future"],
  czechRepublicLearnMoreUrl = "",

  showHungary = false,
  hungaryName = "Hungary",
  hungaryPopulation = "9.7M",
  hungaryChristianPercent = "67%",
  hungaryImage = "/placeholder.svg?height=200&width=300",
  hungaryMinistryTypes = ["future"],
  hungaryLearnMoreUrl = "",

  showBelarus = false,
  belarusName = "Belarus",
  belarusPopulation = "9.4M",
  belarusChristianPercent = "73%",
  belarusImage = "/placeholder.svg?height=200&width=300",
  belarusMinistryTypes = ["future"],
  belarusLearnMoreUrl = "",

  showBulgaria = false,
  bulgariaName = "Bulgaria",
  bulgariaPopulation = "6.9M",
  bulgariaChristianPercent = "82%",
  bulgariaImage = "/placeholder.svg?height=200&width=300",
  bulgariaMinistryTypes = ["future"],
  bulgariaLearnMoreUrl = "",

  showSerbia = false,
  serbiaName = "Serbia",
  serbiaPopulation = "6.9M",
  serbiaChristianPercent = "91%",
  serbiaImage = "/placeholder.svg?height=200&width=300",
  serbiaMinistryTypes = ["future"],
  serbiaLearnMoreUrl = "",

  showAustria = false,
  austriaName = "Austria",
  austriaPopulation = "9M",
  austriaChristianPercent = "73%",
  austriaImage = "/placeholder.svg?height=200&width=300",
  austriaMinistryTypes = ["future"],
  austriaLearnMoreUrl = "",

  showSwitzerland = false,
  switzerlandName = "Switzerland",
  switzerlandPopulation = "8.7M",
  switzerlandChristianPercent = "67%",
  switzerlandImage = "/placeholder.svg?height=200&width=300",
  switzerlandMinistryTypes = ["future"],
  switzerlandLearnMoreUrl = "",

  showNetherlands = false,
  netherlandsName = "Netherlands",
  netherlandsPopulation = "17.5M",
  netherlandsChristianPercent = "43%",
  netherlandsImage = "/placeholder.svg?height=200&width=300",
  netherlandsMinistryTypes = ["future"],
  netherlandsLearnMoreUrl = "",

  showBelgium = false,
  belgiumName = "Belgium",
  belgiumPopulation = "11.6M",
  belgiumChristianPercent = "60%",
  belgiumImage = "/placeholder.svg?height=200&width=300",
  belgiumMinistryTypes = ["future"],
  belgiumLearnMoreUrl = "",

  showGreece = false,
  greeceName = "Greece",
  greecePopulation = "10.7M",
  greeceChristianPercent = "98%",
  greeceImage = "/placeholder.svg?height=200&width=300",
  greeceMinistryTypes = ["future"],
  greeceLearnMoreUrl = "",

  showPortugal = false,
  portugalName = "Portugal",
  portugalPopulation = "10.3M",
  portugalChristianPercent = "84%",
  portugalImage = "/placeholder.svg?height=200&width=300",
  portugalMinistryTypes = ["future"],
  portugalLearnMoreUrl = "",

  showSweden = false,
  swedenName = "Sweden",
  swedenPopulation = "10.5M",
  swedenChristianPercent = "63%",
  swedenImage = "/placeholder.svg?height=200&width=300",
  swedenMinistryTypes = ["future"],
  swedenLearnMoreUrl = "",

  showNorway = false,
  norwayName = "Norway",
  norwayPopulation = "5.5M",
  norwayChristianPercent = "82%",
  norwayImage = "/placeholder.svg?height=200&width=300",
  norwayMinistryTypes = ["future"],
  norwayLearnMoreUrl = "",

  showDenmark = false,
  denmarkName = "Denmark",
  denmarkPopulation = "5.9M",
  denmarkChristianPercent = "75%",
  denmarkImage = "/placeholder.svg?height=200&width=300",
  denmarkMinistryTypes = ["future"],
  denmarkLearnMoreUrl = "",

  showFinland = false,
  finlandName = "Finland",
  finlandPopulation = "5.5M",
  finlandChristianPercent = "70%",
  finlandImage = "/placeholder.svg?height=200&width=300",
  finlandMinistryTypes = ["future"],
  finlandLearnMoreUrl = "",

  showIreland = false,
  irelandName = "Ireland",
  irelandPopulation = "5M",
  irelandChristianPercent = "78%",
  irelandImage = "/placeholder.svg?height=200&width=300",
  irelandMinistryTypes = ["future"],
  irelandLearnMoreUrl = "",

  showNewZealand = false,
  newZealandName = "New Zealand",
  newZealandPopulation = "5.1M",
  newZealandChristianPercent = "37%",
  newZealandImage = "/placeholder.svg?height=200&width=300",
  newZealandMinistryTypes = ["future"],
  newZealandLearnMoreUrl = "",

  showAustralia = false,
  australiaName = "Australia",
  australiaPopulation = "26M",
  australiaChristianPercent = "44%",
  australiaImage = "/placeholder.svg?height=200&width=300",
  australiaMinistryTypes = ["future"],
  australiaLearnMoreUrl = "",

  showPapuaNewGuinea = false,
  papuaNewGuineaName = "Papua New Guinea",
  papuaNewGuineaPopulation = "9.1M",
  papuaNewGuineaChristianPercent = "96%",
  papuaNewGuineaImage = "/placeholder.svg?height=200&width=300",
  papuaNewGuineaMinistryTypes = ["future"],
  papuaNewGuineaLearnMoreUrl = "",

  showFiji = false,
  fijiName = "Fiji",
  fijiPopulation = "0.9M",
  fijiChristianPercent = "64%",
  fijiImage = "/placeholder.svg?height=200&width=300",
  fijiMinistryTypes = ["future"],
  fijiLearnMoreUrl = "",

  showMalaysia = false,
  malaysiaName = "Malaysia",
  malaysiaPopulation = "33M",
  malaysiaChristianPercent = "9%",
  malaysiaImage = "/placeholder.svg?height=200&width=300",
  malaysiaMinistryTypes = ["future"],
  malaysiaLearnMoreUrl = "",

  showSingapore = false,
  singaporeName = "Singapore",
  singaporePopulation = "5.9M",
  singaporeChristianPercent = "19%",
  singaporeImage = "/placeholder.svg?height=200&width=300",
  singaporeMinistryTypes = ["future"],
  singaporeLearnMoreUrl = "",

  showCambodia = false,
  cambodiaName = "Cambodia",
  cambodiaPopulation = "17M",
  cambodiaChristianPercent = "2%",
  cambodiaImage = "/placeholder.svg?height=200&width=300",
  cambodiaMinistryTypes = ["future"],
  cambodiaLearnMoreUrl = "",

  showLaos = false,
  laosName = "Laos",
  laosPopulation = "7.5M",
  laosChristianPercent = "2%",
  laosImage = "/placeholder.svg?height=200&width=300",
  laosMinistryTypes = ["future"],
  laosLearnMoreUrl = "",

  showMongolia = false,
  mongoliaName = "Mongolia",
  mongoliaPopulation = "3.4M",
  mongoliaChristianPercent = "2%",
  mongoliaImage = "/placeholder.svg?height=200&width=300",
  mongoliaMinistryTypes = ["future"],
  mongoliaLearnMoreUrl = "",

  showNepal = false,
  nepalName = "Nepal",
  nepalPopulation = "30M",
  nepalChristianPercent = "1.4%",
  nepalImage = "/placeholder.svg?height=200&width=300",
  nepalMinistryTypes = ["future"],
  nepalLearnMoreUrl = "",

  showSriLanka = false,
  sriLankaName = "Sri Lanka",
  sriLankaPopulation = "22M",
  sriLankaChristianPercent = "7%",
  sriLankaImage = "/placeholder.svg?height=200&width=300",
  sriLankaMinistryTypes = ["future"],
  sriLankaLearnMoreUrl = "",

  showKazakhstan = false,
  kazakhstanName = "Kazakhstan",
  kazakhstanPopulation = "19M",
  kazakhstanChristianPercent = "26%",
  kazakhstanImage = "/placeholder.svg?height=200&width=300",
  kazakhstanMinistryTypes = ["future"],
  kazakhstanLearnMoreUrl = "",

  showUzbekistan = false,
  uzbekistanName = "Uzbekistan",
  uzbekistanPopulation = "34M",
  uzbekistanChristianPercent = "2%",
  uzbekistanImage = "/placeholder.svg?height=200&width=300",
  uzbekistanMinistryTypes = ["future"],
  uzbekistanLearnMoreUrl = "",

  showTajikistan = false,
  tajikistanName = "Tajikistan",
  tajikistanPopulation = "9.8M",
  tajikistanChristianPercent = "1%",
  tajikistanImage = "/placeholder.svg?height=200&width=300",
  tajikistanMinistryTypes = ["future"],
  tajikistanLearnMoreUrl = "",

  showKyrgyzstan = false,
  kyrgyzstanName = "Kyrgyzstan",
  kyrgyzstanPopulation = "6.7M",
  kyrgyzstanChristianPercent = "11%",
  kyrgyzstanImage = "/placeholder.svg?height=200&width=300",
  kyrgyzstanMinistryTypes = ["future"],
  kyrgyzstanLearnMoreUrl = "",

  showTurkmenistan = false,
  turkmenistanName = "Turkmenistan",
  turkmenistanPopulation = "6.2M",
  turkmenistanChristianPercent = "9%",
  turkmenistanImage = "/placeholder.svg?height=200&width=300",
  turkmenistanMinistryTypes = ["future"],
  turkmenistanLearnMoreUrl = "",

  showAzerbaijan = false,
  azerbaijanName = "Azerbaijan",
  azerbaijanPopulation = "10M",
  azerbaijanChristianPercent = "3%",
  azerbaijanImage = "/placeholder.svg?height=200&width=300",
  azerbaijanMinistryTypes = ["future"],
  azerbaijanLearnMoreUrl = "",

  showGeorgia = false,
  georgiaName = "Georgia",
  georgiaPopulation = "3.7M",
  georgiaChristianPercent = "88%",
  georgiaImage = "/placeholder.svg?height=200&width=300",
  georgiaMinistryTypes = ["future"],
  georgiaLearnMoreUrl = "",

  showArmenia = false,
  armeniaName = "Armenia",
  armeniaPopulation = "3M",
  armeniaChristianPercent = "95%",
  armeniaImage = "/placeholder.svg?height=200&width=300",
  armeniaMinistryTypes = ["future"],
  armeniaLearnMoreUrl = "",

  showJordan = false,
  jordanName = "Jordan",
  jordanPopulation = "10.3M",
  jordanChristianPercent = "2%",
  jordanImage = "/placeholder.svg?height=200&width=300",
  jordanMinistryTypes = ["arabic"],
  jordanLearnMoreUrl = "",

  showLebanon = false,
  lebanonName = "Lebanon",
  lebanonPopulation = "6.8M",
  lebanonChristianPercent = "33%",
  lebanonImage = "/placeholder.svg?height=200&width=300",
  lebanonMinistryTypes = ["arabic"],
  lebanonLearnMoreUrl = "",

  showOman = false,
  omanName = "Oman",
  omanPopulation = "5.2M",
  omanChristianPercent = "3%",
  omanImage = "/placeholder.svg?height=200&width=300",
  omanMinistryTypes = ["arabic"],
  omanLearnMoreUrl = "",

  showKuwait = false,
  kuwaitName = "Kuwait",
  kuwaitPopulation = "4.3M",
  kuwaitChristianPercent = "18%",
  kuwaitImage = "/placeholder.svg?height=200&width=300",
  kuwaitMinistryTypes = ["arabic"],
  kuwaitLearnMoreUrl = "",

  showQatar = false,
  qatarName = "Qatar",
  qatarPopulation = "2.9M",
  qatarChristianPercent = "14%",
  qatarImage = "/placeholder.svg?height=200&width=300",
  qatarMinistryTypes = ["arabic"],
  qatarLearnMoreUrl = "",

  showUAE = false,
  uaeName = "United Arab Emirates",
  uaePopulation = "10M",
  uaeChristianPercent = "13%",
  uaeImage = "/placeholder.svg?height=200&width=300",
  uaeMinistryTypes = ["arabic"],
  uaeLearnMoreUrl = "",

  showBahrain = false,
  bahrainName = "Bahrain",
  bahrainPopulation = "1.5M",
  bahrainChristianPercent = "14%",
  bahrainImage = "/placeholder.svg?height=200&width=300",
  bahrainMinistryTypes = ["arabic"],
  bahrainLearnMoreUrl = "",

  showLibya = false,
  libyaName = "Libya",
  libyaPopulation = "7M",
  libyaChristianPercent = "3%",
  libyaImage = "/placeholder.svg?height=200&width=300",
  libyaMinistryTypes = ["arabic"],
  libyaLearnMoreUrl = "",

  showTunisia = false,
  tunisiaName = "Tunisia",
  tunisiaPopulation = "12M",
  tunisiaChristianPercent = "0.2%",
  tunisiaImage = "/placeholder.svg?height=200&width=300",
  tunisiaMinistryTypes = ["arabic"],
  tunisiaLearnMoreUrl = "",

  showMauritania = false,
  mauritaniaName = "Mauritania",
  mauritaniaPopulation = "4.8M",
  mauritaniaChristianPercent = "0.3%",
  mauritaniaImage = "/placeholder.svg?height=200&width=300",
  mauritaniaMinistryTypes = ["future"],
  mauritaniaLearnMoreUrl = "",

  showNiger = false,
  nigerName = "Niger",
  nigerPopulation = "25M",
  nigerChristianPercent = "1%",
  nigerImage = "/placeholder.svg?height=200&width=300",
  nigerMinistryTypes = ["future"],
  nigerLearnMoreUrl = "",

  showBenin = false,
  beninName = "Benin",
  beninPopulation = "13M",
  beninChristianPercent = "48%",
  beninImage = "/placeholder.svg?height=200&width=300",
  beninMinistryTypes = ["future"],
  beninLearnMoreUrl = "",

  showTogo = false,
  togoName = "Togo",
  togoPopulation = "8.6M",
  togoChristianPercent = "43%",
  togoImage = "/placeholder.svg?height=200&width=300",
  togoMinistryTypes = ["future"],
  togoLearnMoreUrl = "",

  showSierraLeone = false,
  sierraLeoneName = "Sierra Leone",
  sierraLeonePopulation = "8.4M",
  sierraLeoneChristianPercent = "21%",
  sierraLeoneImage = "/placeholder.svg?height=200&width=300",
  sierraLeoneMinistryTypes = ["future"],
  sierraLeoneLearnMoreUrl = "",

  showLiberia = false,
  liberiaName = "Liberia",
  liberiaPopulation = "5.2M",
  liberiaChristianPercent = "86%",
  liberiaImage = "/placeholder.svg?height=200&width=300",
  liberiaMinistryTypes = ["future"],
  liberiaLearnMoreUrl = "",

  showGuinea = false,
  guineaName = "Guinea",
  guineaPopulation = "13.5M",
  guineaChristianPercent = "10%",
  guineaImage = "/placeholder.svg?height=200&width=300",
  guineaMinistryTypes = ["future"],
  guineaLearnMoreUrl = "",

  showIvoryCoast = false,
  ivoryCoastName = "Ivory Coast",
  ivoryCoastPopulation = "27M",
  ivoryCoastChristianPercent = "44%",
  ivoryCoastImage = "/placeholder.svg?height=200&width=300",
  ivoryCoastMinistryTypes = ["future"],
  ivoryCoastLearnMoreUrl = "",

  showGambia = false,
  gambiaName = "Gambia",
  gambiaPopulation = "2.5M",
  gambiaChristianPercent = "9%",
  gambiaImage = "/placeholder.svg?height=200&width=300",
  gambiaMinistryTypes = ["future"],
  gambiaLearnMoreUrl = "",

  showGuineaBissau = false,
  guineaBissauName = "Guinea-Bissau",
  guineaBissauPopulation = "2M",
  guineaBissauChristianPercent = "19%",
  guineaBissauImage = "/placeholder.svg?height=200&width=300",
  guineaBissauMinistryTypes = ["future"],
  guineaBissauLearnMoreUrl = "",

  showEquatorialGuinea = false,
  equatorialGuineaName = "Equatorial Guinea",
  equatorialGuineaPopulation = "1.5M",
  equatorialGuineaChristianPercent = "88%",
  equatorialGuineaImage = "/placeholder.svg?height=200&width=300",
  equatorialGuineaMinistryTypes = ["future"],
  equatorialGuineaLearnMoreUrl = "",

  showGabon = false,
  gabonName = "Gabon",
  gabonPopulation = "2.3M",
  gabonChristianPercent = "76%",
  gabonImage = "/placeholder.svg?height=200&width=300",
  gabonMinistryTypes = ["future"],
  gabonLearnMoreUrl = "",

  showCongo = false,
  congoName = "Republic of Congo",
  congoPopulation = "5.8M",
  congoChristianPercent = "85%",
  congoImage = "/placeholder.svg?height=200&width=300",
  congoMinistryTypes = ["future"],
  congoLearnMoreUrl = "",

  showDRC = false,
  drcName = "Democratic Republic of Congo",
  drcPopulation = "95M",
  drcChristianPercent = "95%",
  drcImage = "/placeholder.svg?height=200&width=300",
  drcMinistryTypes = ["future"],
  drcLearnMoreUrl = "",

  showCAR = false,
  carName = "Central African Republic",
  carPopulation = "5.5M",
  carChristianPercent = "89%",
  carImage = "/placeholder.svg?height=200&width=300",
  carMinistryTypes = ["future"],
  carLearnMoreUrl = "",

  showSouthSudan = false,
  southSudanName = "South Sudan",
  southSudanPopulation = "11M",
  southSudanChristianPercent = "60%",
  southSudanImage = "/placeholder.svg?height=200&width=300",
  southSudanMinistryTypes = ["future"],
  southSudanLearnMoreUrl = "",

  showEritrea = false,
  eritreaName = "Eritrea",
  eritreaPopulation = "3.6M",
  eritreaChristianPercent = "63%",
  eritreaImage = "/placeholder.svg?height=200&width=300",
  eritreaMinistryTypes = ["future"],
  eritreaLearnMoreUrl = "",

  showDjibouti = false,
  djiboutiName = "Djibouti",
  djiboutiPopulation = "1M",
  djiboutiChristianPercent = "2%",
  djiboutiImage = "/placeholder.svg?height=200&width=300",
  djiboutiMinistryTypes = ["future"],
  djiboutiLearnMoreUrl = "",

  showBurundi = false,
  burundiName = "Burundi",
  burundiPopulation = "12M",
  burundiChristianPercent = "93%",
  burundiImage = "/placeholder.svg?height=200&width=300",
  burundiMinistryTypes = ["future"],
  burundiLearnMoreUrl = "",

  showBotswana = false,
  botswanaName = "Botswana",
  botswanaPopulation = "2.4M",
  botswanaChristianPercent = "79%",
  botswanaImage = "/placeholder.svg?height=200&width=300",
  botswanaMinistryTypes = ["future"],
  botswanaLearnMoreUrl = "",

  showNamibia = false,
  namibiaName = "Namibia",
  namibiaPopulation = "2.6M",
  namibiaChristianPercent = "97%",
  namibiaImage = "/placeholder.svg?height=200&width=300",
  namibiaMinistryTypes = ["future"],
  namibiaLearnMoreUrl = "",

  showLesotho = false,
  lesothoName = "Lesotho",
  lesothoPopulation = "2.2M",
  lesothoChristianPercent = "96%",
  lesothoImage = "/placeholder.svg?height=200&width=300",
  lesothoMinistryTypes = ["future"],
  lesothoLearnMoreUrl = "",

  showEswatini = false,
  eswatiniName = "Eswatini",
  eswatiniPopulation = "1.2M",
  eswatiniChristianPercent = "88%",
  eswatiniImage = "/placeholder.svg?height=200&width=300",
  eswatiniMinistryTypes = ["future"],
  eswatiniLearnMoreUrl = "",

  showMauritius = false,
  mauritiusName = "Mauritius",
  mauritiusPopulation = "1.3M",
  mauritiusChristianPercent = "32%",
  mauritiusImage = "/placeholder.svg?height=200&width=300",
  mauritiusMinistryTypes = ["future"],
  mauritiusLearnMoreUrl = "",

  showComoros = false,
  comorosName = "Comoros",
  comorosPopulation = "0.9M",
  comorosChristianPercent = "1%",
  comorosImage = "/placeholder.svg?height=200&width=300",
  comorosMinistryTypes = ["future"],
  comorosLearnMoreUrl = "",

  showCapeVerde = false,
  capeVerdeName = "Cape Verde",
  capeVerdePopulation = "0.6M",
  capeVerdeChristianPercent = "89%",
  capeVerdeImage = "/placeholder.svg?height=200&width=300",
  capeVerdeMinistryTypes = ["future"],
  capeVerdeLearnMoreUrl = "",

  showSaoTomeAndPrincipe = false,
  saoTomeAndPrincipeName = "Sao Tome and Principe",
  saoTomeAndPrincipePopulation = "0.2M",
  saoTomeAndPrincipeChristianPercent = "82%",
  saoTomeAndPrincipeImage = "/placeholder.svg?height=200&width=300",
  saoTomeAndPrincipeMinistryTypes = ["future"],
  saoTomeAndPrincipeLearnMoreUrl = "",

  showSeychelles = false,
  seychellesName = "Seychelles",
  seychellesPopulation = "0.1M",
  seychellesChristianPercent = "94%",
  seychellesImage = "/placeholder.svg?height=200&width=300",
  seychellesMinistryTypes = ["future"],
  seychellesLearnMoreUrl = "",
}: MissionMapProps) {
  const [selectedCountry, setSelectedCountry] = useState<any>(null)
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // Ministry type colors - in display order
  const MINISTRY_COLORS: Record<string, string> = {
    multipleministries: multipleministriesColor,
    megacity: megaCityMediaCampaignColor,
    window1040: window1040MediaOutreachColor,
    ukraineaid: ukraineAidColor,
    trauma: traumaRecoveryColor,
    jewish: jewishMinistryColor,
    social: socialMediaOutreachColor,
    mediaoutreach: mediaOutreachColor,
  }

  // Ministry type visibility
  const MINISTRY_VISIBILITY: Record<string, boolean> = {
    multipleministries: showMultipleMinistries,
    megacity: showMegaCityMediaCampaign,
    window1040: showWindow1040MediaOutreach,
    ukraineaid: showUkraineAid,
    trauma: showTraumaRecovery,
    jewish: showJewishMinistry,
    social: showSocialMediaOutreach,
    mediaoutreach: showMediaOutreach,
  }

  const MINISTRY_NAMES: Record<string, string> = {
    multipleministries: multipleministriesName,
    megacity: megaCityMediaCampaignName,
    window1040: window1040MediaOutreachName,
    ukraineaid: ukraineAidName,
    trauma: traumaRecoveryName,
    jewish: jewishMinistryName,
    social: socialMediaOutreachName,
    mediaoutreach: mediaOutreachName,
  }

  // City-level data for countries with multiple ministry locations
  // Add city entries here to display different colored pins within the same country
  interface CityEntry {
    name: string
    coordinates: [number, number]
    ministryType: string
  }

  const HARDCODED_CITIES: Record<string, CityEntry[]> = {
    ukraine: [],
    india: [
      { name: "Mumbai", coordinates: [72.8777, 19.076], ministryType: "megacity" },
      { name: "Delhi", coordinates: [77.209, 28.6139], ministryType: "mediaoutreach" },
    ],
    brazil: [
      { name: "São Paulo", coordinates: [-46.6333, -23.5505], ministryType: "megacity" },
      { name: "Rio de Janeiro", coordinates: [-43.1729, -22.9068], ministryType: "mediaoutreach" },
    ],
    nigeria: [
      { name: "Lagos", coordinates: [3.3792, 6.5244], ministryType: "megacity" },
      { name: "Abuja", coordinates: [7.4891, 9.0579], ministryType: "mediaoutreach" },
    ],
    philippines: [
      { name: "Manila", coordinates: [120.9842, 14.5995], ministryType: "megacity" },
      { name: "Cebu", coordinates: [123.8854, 10.3157], ministryType: "mediaoutreach" },
    ],
    kenya: [
      { name: "Nairobi", coordinates: [36.8219, -1.2921], ministryType: "megacity" },
      { name: "Mombasa", coordinates: [39.6682, -4.0435], ministryType: "mediaoutreach" },
    ],
    mexico: [
      { name: "Mexico City", coordinates: [-99.1332, 19.4326], ministryType: "megacity" },
      { name: "Guadalajara", coordinates: [-103.3496, 20.6597], ministryType: "mediaoutreach" },
    ],
    ethiopia: [
      { name: "Addis Ababa", coordinates: [38.7578, 9.032], ministryType: "megacity" },
      { name: "Dire Dawa", coordinates: [41.8664, 9.5935], ministryType: "mediaoutreach" },
    ],
    egypt: [
      { name: "Cairo", coordinates: [31.2357, 30.0444], ministryType: "window1040" },
      { name: "Alexandria", coordinates: [29.9187, 31.2001], ministryType: "mediaoutreach" },
    ],
    colombia: [
      { name: "Bogotá", coordinates: [-74.0721, 4.711], ministryType: "megacity" },
      { name: "Medellín", coordinates: [-75.5752, 6.2476], ministryType: "mediaoutreach" },
    ],
    ghana: [
      { name: "Accra", coordinates: [-0.1869, 5.6037], ministryType: "megacity" },
      { name: "Kumasi", coordinates: [-1.6244, 6.6885], ministryType: "mediaoutreach" },
    ],
  }

  // Use Plasmic-provided JSON if available, otherwise fall back to hardcoded data
  const CITY_DATA: Record<string, CityEntry[]> = useMemo(() => {
    if (cityDataJson) {
      try {
        const parsed = typeof cityDataJson === "string" ? JSON.parse(cityDataJson) : cityDataJson
        console.log("[MapPage] Using cityDataJson from Plasmic, keys:", Object.keys(parsed))
        return parsed
      } catch (e) {
        console.error("[MapPage] Invalid cityDataJson:", cityDataJson, e)
        return HARDCODED_CITIES
      }
    }
    console.log("[MapPage] No cityDataJson prop, using hardcoded defaults")
    return HARDCODED_CITIES
  }, [cityDataJson])

  // Parse popup ministry links
  const popupMinistryLinks: { label: string; url: string }[] = useMemo(() => {
    if (popupMinistryLinksJson) {
      try {
        const parsed = typeof popupMinistryLinksJson === "string" ? JSON.parse(popupMinistryLinksJson) : popupMinistryLinksJson
        if (Array.isArray(parsed)) {
          console.log("[MapPage] Using popupMinistryLinksJson, count:", parsed.length)
          return parsed
        }
        console.error("[MapPage] popupMinistryLinksJson must be an array:", parsed)
        return []
      } catch (e) {
        console.error("[MapPage] Invalid popupMinistryLinksJson:", popupMinistryLinksJson, e)
        return []
      }
    }
    return []
  }, [popupMinistryLinksJson])

  // Country data with coordinates
  const countryStats = [
    // Original 21 countries
    {
      id: "israel",
      name: israelName,
      population: israelPopulation,
      christianPercent: israelChristianPercent,
      image: israelImage,
      ministryTypes: israelMinistryTypes,
      learnMoreUrl: israelLearnMoreUrl,
      coordinates: [34.8516, 31.0461],
      show: showIsrael,
      color: "#0f006f",
    },
    {
      id: "westernsahara",
      name: westernSaharaName,
      population: westernSaharaPopulation,
      christianPercent: westernSaharaChristianPercent,
      image: westernSaharaImage,
      ministryTypes: westernSaharaMinistryTypes,
      learnMoreUrl: westernSaharaLearnMoreUrl,
      coordinates: [-13.0, 24.5],
      show: showWesternSahara,
    },
    {
      id: "ukraine",
      name: ukraineName,
      population: ukrainePopulation,
      christianPercent: ukraineChristianPercent,
      image: ukraineImage,
      ministryTypes: ukraineMinistryTypes,
      learnMoreUrl: ukraineLearnMoreUrl,
      coordinates: [31.1656, 49.5],
      show: showUkraine,
      color: "#F1A100",
    },
    {
      id: "india",
      name: indiaName,
      population: indiaPopulation,
      christianPercent: indiaChristianPercent,
      image: indiaImage,
      ministryTypes: indiaMinistryTypes,
      learnMoreUrl: indiaLearnMoreUrl,
      coordinates: [78.9629, 20.5937],
      show: showIndia,
    },
    {
      id: "philippines",
      name: philippinesName,
      population: philippinesPopulation,
      christianPercent: philippinesChristianPercent,
      image: philippinesImage,
      ministryTypes: philippinesMinistryTypes,
      learnMoreUrl: philippinesLearnMoreUrl,
      coordinates: [121.774, 12.8797],
      show: showPhilippines,
    },
    {
      id: "brazil",
      name: brazilName,
      population: brazilPopulation,
      christianPercent: brazilChristianPercent,
      image: brazilImage,
      ministryTypes: brazilMinistryTypes,
      learnMoreUrl: brazilLearnMoreUrl,
      coordinates: [-51.9253, -14.235],
      show: showBrazil,
    },
    {
      id: "nigeria",
      name: nigeriaName,
      population: nigeriaPopulation,
      christianPercent: nigeriaChristianPercent,
      image: nigeriaImage,
      ministryTypes: nigeriaMinistryTypes,
      learnMoreUrl: nigeriaLearnMoreUrl,
      coordinates: [8.6753, 9.082],
      show: showNigeria,
    },
    {
      id: "ethiopia",
      name: ethiopiaName,
      population: ethiopiaPopulation,
      christianPercent: ethiopiaChristianPercent,
      image: ethiopiaImage,
      ministryTypes: ethiopiaMinistryTypes,
      learnMoreUrl: ethiopiaLearnMoreUrl,
      coordinates: [40.4897, 9.145],
      show: showEthiopia,
    },
    {
      id: "mexico",
      name: mexicoName,
      population: mexicoPopulation,
      christianPercent: mexicoChristianPercent,
      image: mexicoImage,
      ministryTypes: mexicoMinistryTypes,
      learnMoreUrl: mexicoLearnMoreUrl,
      coordinates: [-102.5528, 23.6345],
      show: showMexico,
    },
    {
      id: "kenya",
      name: kenyaName,
      population: kenyaPopulation,
      christianPercent: kenyaChristianPercent,
      image: kenyaImage,
      ministryTypes: kenyaMinistryTypes,
      learnMoreUrl: kenyaLearnMoreUrl,
      coordinates: [37.9062, -0.0236],
      show: showKenya,
    },
    {
      id: "colombia",
      name: colombiaName,
      population: colombiaPopulation,
      christianPercent: colombiaChristianPercent,
      image: colombiaImage,
      ministryTypes: colombiaMinistryTypes,
      learnMoreUrl: colombiaLearnMoreUrl,
      coordinates: [-74.2973, 4.5709],
      show: showColombia,
    },
    {
      id: "peru",
      name: peruName,
      population: peruPopulation,
      christianPercent: peruChristianPercent,
      image: peruImage,
      ministryTypes: peruMinistryTypes,
      learnMoreUrl: peruLearnMoreUrl,
      coordinates: [-75.0152, -9.19],
      show: showPeru,
    },
    {
      id: "ghana",
      name: ghanaName,
      population: ghanaPopulation,
      christianPercent: ghanaChristianPercent,
      image: ghanaImage,
      ministryTypes: ghanaMinistryTypes,
      learnMoreUrl: ghanaLearnMoreUrl,
      coordinates: [-1.0232, 7.9465],
      show: showGhana,
    },
    {
      id: "uganda",
      name: ugandaName,
      population: ugandaPopulation,
      christianPercent: ugandaChristianPercent,
      image: ugandaImage,
      ministryTypes: ugandaMinistryTypes,
      learnMoreUrl: ugandaLearnMoreUrl,
      coordinates: [32.2903, 1.3733],
      show: showUganda,
    },
    {
      id: "tanzania",
      name: tanzaniaName,
      population: tanzaniaPopulation,
      christianPercent: tanzaniaChristianPercent,
      image: tanzaniaImage,
      ministryTypes: tanzaniaMinistryTypes,
      learnMoreUrl: tanzaniaLearnMoreUrl,
      coordinates: [34.8888, -6.369],
      show: showTanzania,
    },
    {
      id: "rwanda",
      name: rwandaName,
      population: rwandaPopulation,
      christianPercent: rwandaChristianPercent,
      image: rwandaImage,
      ministryTypes: rwandaMinistryTypes,
      learnMoreUrl: rwandaLearnMoreUrl,
      coordinates: [29.8739, -1.9403],
      show: showRwanda,
    },
    {
      id: "zambia",
      name: zambiaName,
      population: zambiaPopulation,
      christianPercent: zambiaChristianPercent,
      image: zambiaImage,
      ministryTypes: zambiaMinistryTypes,
      learnMoreUrl: zambiaLearnMoreUrl,
      coordinates: [27.8493, -13.1339],
      show: showZambia,
    },
    {
      id: "malawi",
      name: malawiName,
      population: malawiPopulation,
      christianPercent: malawiChristianPercent,
      image: malawiImage,
      ministryTypes: malawiMinistryTypes,
      learnMoreUrl: malawiLearnMoreUrl,
      coordinates: [34.3015, -13.2543],
      show: showMalawi,
    },
    {
      id: "guatemala",
      name: guatemalaName,
      population: guatemalaPopulation,
      christianPercent: guatemalaChristianPercent,
      image: guatemalaImage,
      ministryTypes: guatemalaMinistryTypes,
      learnMoreUrl: guatemalaLearnMoreUrl,
      coordinates: [-90.2308, 15.7835],
      show: showGuatemala,
    },
    {
      id: "honduras",
      name: hondurasName,
      population: hondurasPopulation,
      christianPercent: hondurasChristianPercent,
      image: hondurasImage,
      ministryTypes: hondurasMinistryTypes,
      learnMoreUrl: hondurasLearnMoreUrl,
      coordinates: [-86.2419, 15.2],
      show: showHonduras,
    },
    {
      id: "elsalvador",
      name: elSalvadorName,
      population: elSalvadorPopulation,
      christianPercent: elSalvadorChristianPercent,
      image: elSalvadorImage,
      ministryTypes: elSalvadorMinistryTypes,
      learnMoreUrl: elSalvadorLearnMoreUrl,
      coordinates: [-88.8965, 13.7942],
      show: showElSalvador,
    },
    {
      id: "haiti",
      name: haitiName,
      population: haitiPopulation,
      christianPercent: haitiChristianPercent,
      image: haitiImage,
      ministryTypes: haitiMinistryTypes,
      learnMoreUrl: haitiLearnMoreUrl,
      coordinates: [-72.2852, 18.9712],
      show: showHaiti,
    },

    {
      id: "moldova",
      name: moldovaName,
      population: moldovaPopulation,
      christianPercent: moldovaChristianPercent,
      image: moldovaImage,
      ministryTypes: moldovaMinistryTypes,
      learnMoreUrl: moldovaLearnMoreUrl,
      coordinates: [28.3698, 47.4116],
      show: showMoldova,
    },

    // Additional countries (hidden by default)
    {
      id: "china",
      name: chinaName,
      population: chinaPopulation,
      christianPercent: chinaChristianPercent,
      image: chinaImage,
      ministryTypes: chinaMinistryTypes,
      learnMoreUrl: chinaLearnMoreUrl,
      coordinates: [104.1954, 35.8617],
      show: showChina,
    },
    {
      id: "indonesia",
      name: indonesiaName,
      population: indonesiaPopulation,
      christianPercent: indonesiaChristianPercent,
      image: indonesiaImage,
      ministryTypes: indonesiaMinistryTypes,
      learnMoreUrl: indonesiaLearnMoreUrl,
      coordinates: [113.9213, -0.7893],
      show: showIndonesia,
    },
    {
      id: "pakistan",
      name: pakistanName,
      population: pakistanPopulation,
      christianPercent: pakistanChristianPercent,
      image: pakistanImage,
      ministryTypes: pakistanMinistryTypes,
      learnMoreUrl: pakistanLearnMoreUrl,
      coordinates: [69.3451, 30.3753],
      show: showPakistan,
    },
    {
      id: "bangladesh",
      name: bangladeshName,
      population: bangladeshPopulation,
      christianPercent: bangladeshChristianPercent,
      image: bangladeshImage,
      ministryTypes: bangladeshMinistryTypes,
      learnMoreUrl: bangladeshLearnMoreUrl,
      coordinates: [90.3563, 23.685],
      show: showBangladesh,
    },
    {
      id: "japan",
      name: japanName,
      population: japanPopulation,
      christianPercent: japanChristianPercent,
      image: japanImage,
      ministryTypes: japanMinistryTypes,
      learnMoreUrl: japanLearnMoreUrl,
      coordinates: [138.2529, 36.2048],
      show: showJapan,
    },
    {
      id: "vietnam",
      name: vietnamName,
      population: vietnamPopulation,
      christianPercent: vietnamChristianPercent,
      image: vietnamImage,
      ministryTypes: vietnamMinistryTypes,
      learnMoreUrl: vietnamLearnMoreUrl,
      coordinates: [108.2772, 14.0583],
      show: showVietnam,
    },
    {
      id: "thailand",
      name: thailandName,
      population: thailandPopulation,
      christianPercent: thailandChristianPercent,
      image: thailandImage,
      ministryTypes: thailandMinistryTypes,
      learnMoreUrl: thailandLearnMoreUrl,
      coordinates: [100.9925, 15.87],
      show: showThailand,
    },
    {
      id: "myanmar",
      name: myanmarName,
      population: myanmarPopulation,
      christianPercent: myanmarChristianPercent,
      image: myanmarImage,
      ministryTypes: myanmarMinistryTypes,
      learnMoreUrl: myanmarLearnMoreUrl,
      coordinates: [95.956, 21.9162],
      show: showMyanmar,
    },
    {
      id: "southkorea",
      name: southKoreaName,
      population: southKoreaPopulation,
      christianPercent: southKoreaChristianPercent,
      image: southKoreaImage,
      ministryTypes: southKoreaMinistryTypes,
      learnMoreUrl: southKoreaLearnMoreUrl,
      coordinates: [127.7669, 35.9078],
      show: showSouthKorea,
    },
    {
      id: "afghanistan",
      name: afghanistanName,
      population: afghanistanPopulation,
      christianPercent: afghanistanChristianPercent,
      image: afghanistanImage,
      ministryTypes: afghanistanMinistryTypes,
      learnMoreUrl: afghanistanLearnMoreUrl,
      coordinates: [67.71, 33.9391],
      show: showAfghanistan,
    },
    {
      id: "iraq",
      name: iraqName,
      population: iraqPopulation,
      christianPercent: iraqChristianPercent,
      image: iraqImage,
      ministryTypes: iraqMinistryTypes,
      learnMoreUrl: iraqLearnMoreUrl,
      coordinates: [43.6793, 33.2232],
      show: showIraq,
    },
    {
      id: "syria",
      name: syriaName,
      population: syriaPopulation,
      christianPercent: syriaChristianPercent,
      image: syriaImage,
      ministryTypes: syriaMinistryTypes,
      learnMoreUrl: syriaLearnMoreUrl,
      coordinates: [38.9968, 34.8021],
      show: showSyria,
    },
    {
      id: "yemen",
      name: yemenName,
      population: yemenPopulation,
      christianPercent: yemenChristianPercent,
      image: yemenImage,
      ministryTypes: yemenMinistryTypes,
      learnMoreUrl: yemenLearnMoreUrl,
      coordinates: [48.5164, 15.5527],
      show: showYemen,
    },
    {
      id: "saudiarabia",
      name: saudiArabiaName,
      population: saudiArabiaPopulation,
      christianPercent: saudiArabiaChristianPercent,
      image: saudiArabiaImage,
      ministryTypes: saudiArabiaMinistryTypes,
      learnMoreUrl: saudiArabiaLearnMoreUrl,
      coordinates: [45.0792, 23.8859],
      show: showSaudiArabia,
    },
    {
      id: "iran",
      name: iranName,
      population: iranPopulation,
      christianPercent: iranChristianPercent,
      image: iranImage,
      ministryTypes: iranMinistryTypes,
      learnMoreUrl: iranLearnMoreUrl,
      coordinates: [53.688, 32.4279],
      show: showIran,
    },
    {
      id: "turkey",
      name: turkeyName,
      population: turkeyPopulation,
      christianPercent: turkeyChristianPercent,
      image: turkeyImage,
      ministryTypes: turkeyMinistryTypes,
      learnMoreUrl: turkeyLearnMoreUrl,
      coordinates: [35.2433, 38.9637],
      show: showTurkey,
    },
    {
      id: "egypt",
      name: egyptName,
      population: egyptPopulation,
      christianPercent: egyptChristianPercent,
      image: egyptImage,
      ministryTypes: egyptMinistryTypes,
      learnMoreUrl: egyptLearnMoreUrl,
      coordinates: [30.8025, 26.8206],
      show: showEgypt,
    },
    {
      id: "southafrica",
      name: southAfricaName,
      population: southAfricaPopulation,
      christianPercent: southAfricaChristianPercent,
      image: southAfricaImage,
      ministryTypes: southAfricaMinistryTypes,
      learnMoreUrl: southAfricaLearnMoreUrl,
      coordinates: [22.9375, -30.5595],
      show: showSouthAfrica,
    },
    {
      id: "algeria",
      name: algeriaName,
      population: algeriaPopulation,
      christianPercent: algeriaChristianPercent,
      image: algeriaImage,
      ministryTypes: algeriaMinistryTypes,
      learnMoreUrl: algeriaLearnMoreUrl,
      coordinates: [1.6596, 28.0339],
      show: showAlgeria,
    },
    {
      id: "morocco",
      name: moroccoName,
      population: moroccoPopulation,
      christianPercent: moroccoChristianPercent,
      image: moroccoImage,
      ministryTypes: moroccoMinistryTypes,
      learnMoreUrl: moroccoLearnMoreUrl,
      coordinates: [-7.0926, 31.7917],
      show: showMorocco,
    },
    {
      id: "sudan",
      name: sudanName,
      population: sudanPopulation,
      christianPercent: sudanChristianPercent,
      image: sudanImage,
      ministryTypes: sudanMinistryTypes,
      learnMoreUrl: sudanLearnMoreUrl,
      coordinates: [30.2176, 12.8628],
      show: showSudan,
    },
    {
      id: "cameroon",
      name: cameroonName,
      population: cameroonPopulation,
      christianPercent: cameroonChristianPercent,
      image: cameroonImage,
      ministryTypes: cameroonMinistryTypes,
      learnMoreUrl: cameroonLearnMoreUrl,
      coordinates: [12.3547, 7.3697],
      show: showCameroon,
    },
    {
      id: "mozambique",
      name: mozambiqueName,
      population: mozambiquePopulation,
      christianPercent: mozambiqueChristianPercent,
      image: mozambiqueImage,
      ministryTypes: mozambiqueMinistryTypes,
      learnMoreUrl: mozambiqueLearnMoreUrl,
      coordinates: [35.5296, -18.6657],
      show: showMozambique,
    },
    {
      id: "madagascar",
      name: madagascarName,
      population: madagascarPopulation,
      christianPercent: madagascarChristianPercent,
      image: madagascarImage,
      ministryTypes: madagascarMinistryTypes,
      learnMoreUrl: madagascarLearnMoreUrl,
      coordinates: [46.8691, -18.7669],
      show: showMadagascar,
    },
    {
      id: "angola",
      name: angolaName,
      population: angolaPopulation,
      christianPercent: angolaChristianPercent,
      image: angolaImage,
      ministryTypes: angolaMinistryTypes,
      learnMoreUrl: angolaLearnMoreUrl,
      coordinates: [17.8739, -11.2027],
      show: showAngola,
    },
    {
      id: "zimbabwe",
      name: zimbabweName,
      population: zimbabwePopulation,
      christianPercent: zimbabweChristianPercent,
      image: zimbabweImage,
      ministryTypes: zimbabweMinistryTypes,
      learnMoreUrl: zimbabweLearnMoreUrl,
      coordinates: [29.1549, -19.0154],
      show: showZimbabwe,
    },
    {
      id: "mali",
      name: maliName,
      population: maliPopulation,
      christianPercent: maliChristianPercent,
      image: maliImage,
      ministryTypes: maliMinistryTypes,
      learnMoreUrl: maliLearnMoreUrl,
      coordinates: [-3.9962, 17.5707],
      show: showMali,
    },
    {
      id: "burkinafaso",
      name: burkinaFasoName,
      population: burkinaFasoPopulation,
      christianPercent: burkinaFasoChristianPercent,
      image: burkinaFasoImage,
      ministryTypes: burkinaFasoMinistryTypes,
      learnMoreUrl: burkinaFasoLearnMoreUrl,
      coordinates: [-1.5616, 12.2383],
      show: showBurkinaFaso,
    },
    {
      id: "senegal",
      name: senegalName,
      population: senegalPopulation,
      christianPercent: senegalChristianPercent,
      image: senegalImage,
      ministryTypes: senegalMinistryTypes,
      learnMoreUrl: senegalLearnMoreUrl,
      coordinates: [-14.4524, 14.4974],
      show: showSenegal,
    },
    {
      id: "chad",
      name: chadName,
      population: chadPopulation,
      christianPercent: chadChristianPercent,
      image: chadImage,
      ministryTypes: chadMinistryTypes,
      learnMoreUrl: chadLearnMoreUrl,
      coordinates: [18.7322, 15.4542],
      show: showChad,
    },
    {
      id: "somalia",
      name: somaliaName,
      population: somaliaPopulation,
      christianPercent: somaliaChristianPercent,
      image: somaliaImage,
      ministryTypes: somaliaMinistryTypes,
      learnMoreUrl: somaliaLearnMoreUrl,
      coordinates: [46.1996, 5.1521],
      show: showSomalia,
    },
    {
      id: "argentina",
      name: argentinaName,
      population: argentinaPopulation,
      christianPercent: argentinaChristianPercent,
      image: argentinaImage,
      ministryTypes: argentinaMinistryTypes,
      learnMoreUrl: argentinaLearnMoreUrl,
      coordinates: [-63.6167, -38.4161],
      show: showArgentina,
    },
    {
      id: "venezuela",
      name: venezuelaName,
      population: venezuelaPopulation,
      christianPercent: venezuelaChristianPercent,
      image: venezuelaImage,
      ministryTypes: venezuelaMinistryTypes,
      learnMoreUrl: venezuelaLearnMoreUrl,
      coordinates: [-66.5897, 6.4238],
      show: showVenezuela,
    },
    {
      id: "chile",
      name: chileName,
      population: chilePopulation,
      christianPercent: chileChristianPercent,
      image: chileImage,
      ministryTypes: chileMinistryTypes,
      learnMoreUrl: chileLearnMoreUrl,
      coordinates: [-71.543, -35.6751],
      show: showChile,
    },
    {
      id: "ecuador",
      name: ecuadorName,
      population: ecuadorPopulation,
      christianPercent: ecuadorChristianPercent,
      image: ecuadorImage,
      ministryTypes: ecuadorMinistryTypes,
      learnMoreUrl: ecuadorLearnMoreUrl,
      coordinates: [-78.1834, -1.8312],
      show: showEcuador,
    },
    {
      id: "bolivia",
      name: boliviaName,
      population: boliviaPopulation,
      christianPercent: boliviaChristianPercent,
      image: boliviaImage,
      ministryTypes: boliviaMinistryTypes,
      learnMoreUrl: boliviaLearnMoreUrl,
      coordinates: [-63.5887, -16.2902],
      show: showBolivia,
    },
    {
      id: "paraguay",
      name: paraguayName,
      population: paraguayPopulation,
      christianPercent: paraguayChristianPercent,
      image: paraguayImage,
      ministryTypes: paraguayMinistryTypes,
      learnMoreUrl: paraguayLearnMoreUrl,
      coordinates: [-58.4438, -23.4425],
      show: showParaguay,
    },
    {
      id: "palestine",
      name: palestineName,
      population: palestinePopulation,
      christianPercent: palestineChristianPercent,
      image: palestineImage,
      ministryTypes: palestineMinistryTypes,
      learnMoreUrl: palestineLearnMoreUrl,
      coordinates: [35.2332, 31.9522],
      show: showPalestine,
    },
    {
      id: "guyana",
      name: guyanaName,
      population: guyanaPopulation,
      christianPercent: guyanaChristianPercent,
      image: guyanaImage,
      ministryTypes: guyanaMinistryTypes,
      learnMoreUrl: guyanaLearnMoreUrl,
      coordinates: [-58.9302, 4.8604],
      show: showGuyana,
    },
    {
      id: "suriname",
      name: surinameName,
      population: surinamePopulation,
      christianPercent: surinameChristianPercent,
      image: surinameImage,
      ministryTypes: surinameMinistryTypes,
      learnMoreUrl: surinameLearnMoreUrl,
      coordinates: [-55.2038, 5.8520],
      show: showSuriname,
    },
    {
      id: "uruguay",
      name: uruguayName,
      population: uruguayPopulation,
      christianPercent: uruguayChristianPercent,
      image: uruguayImage,
      ministryTypes: uruguayMinistryTypes,
      learnMoreUrl: uruguayLearnMoreUrl,
      coordinates: [-55.7658, -32.5228],
      show: showUruguay,
    },
    {
      id: "nicaragua",
      name: nicaraguaName,
      population: nicaraguaPopulation,
      christianPercent: nicaraguaChristianPercent,
      image: nicaraguaImage,
      ministryTypes: nicaraguaMinistryTypes,
      learnMoreUrl: nicaraguaLearnMoreUrl,
      coordinates: [-85.2072, 12.8654],
      show: showNicaragua,
    },
    {
      id: "costarica",
      name: costaRicaName,
      population: costaRicaPopulation,
      christianPercent: costaRicaChristianPercent,
      image: costaRicaImage,
      ministryTypes: costaRicaMinistryTypes,
      learnMoreUrl: costaRicaLearnMoreUrl,
      coordinates: [-83.7534, 9.7489],
      show: showCostaRica,
    },
    {
      id: "panama",
      name: panamaName,
      population: panamaPopulation,
      christianPercent: panamaChristianPercent,
      image: panamaImage,
      ministryTypes: panamaMinistryTypes,
      learnMoreUrl: panamaLearnMoreUrl,
      coordinates: [-80.7821, 8.538],
      show: showPanama,
    },
    {
      id: "dominicanrepublic",
      name: dominicanRepublicName,
      population: dominicanRepublicPopulation,
      christianPercent: dominicanRepublicChristianPercent,
      image: dominicanRepublicImage,
      ministryTypes: dominicanRepublicMinistryTypes,
      learnMoreUrl: dominicanRepublicLearnMoreUrl,
      coordinates: [-70.1627, 18.7357],
      show: showDominicanRepublic,
    },
    {
      id: "cuba",
      name: cubaName,
      population: cubaPopulation,
      christianPercent: cubaChristianPercent,
      image: cubaImage,
      ministryTypes: cubaMinistryTypes,
      learnMoreUrl: cubaLearnMoreUrl,
      coordinates: [-77.7812, 21.5218],
      show: showCuba,
    },
    {
      id: "jamaica",
      name: jamaicaName,
      population: jamaicaPopulation,
      christianPercent: jamaicaChristianPercent,
      image: jamaicaImage,
      ministryTypes: jamaicaMinistryTypes,
      learnMoreUrl: jamaicaLearnMoreUrl,
      coordinates: [-77.2975, 18.1096],
      show: showJamaica,
    },
    {
      id: "trinidadandtobago",
      name: trinidadAndTobagoName,
      population: trinidadAndTobagoPopulation,
      christianPercent: trinidadAndTobagoChristianPercent,
      image: trinidadAndTobagoImage,
      ministryTypes: trinidadAndTobagoMinistryTypes,
      learnMoreUrl: trinidadAndTobagoLearnMoreUrl,
      coordinates: [-61.2225, 10.6918],
      show: showTrinidadAndTobago,
    },
    {
      id: "russia",
      name: russiaName,
      population: russiaPopulation,
      christianPercent: russiaChristianPercent,
      image: russiaImage,
      ministryTypes: russiaMinistryTypes,
      learnMoreUrl: russiaLearnMoreUrl,
      coordinates: [105.3188, 61.524],
      show: showRussia,
    },
    {
      id: "poland",
      name: polandName,
      population: polandPopulation,
      christianPercent: polandChristianPercent,
      image: polandImage,
      ministryTypes: polandMinistryTypes,
      learnMoreUrl: polandLearnMoreUrl,
      coordinates: [19.1451, 51.9194],
      show: showPoland,
    },
    {
      id: "romania",
      name: romaniaName,
      population: romaniaPopulation,
      christianPercent: romaniaChristianPercent,
      image: romaniaImage,
      ministryTypes: romaniaMinistryTypes,
      learnMoreUrl: romaniaLearnMoreUrl,
      coordinates: [24.9668, 45.9432],
      show: showRomania,
    },
    {
      id: "czechrepublic",
      name: czechRepublicName,
      population: czechRepublicPopulation,
      christianPercent: czechRepublicChristianPercent,
      image: czechRepublicImage,
      ministryTypes: czechRepublicMinistryTypes,
      learnMoreUrl: czechRepublicLearnMoreUrl,
      coordinates: [15.473, 49.8175],
      show: showCzechRepublic,
    },
    {
      id: "hungary",
      name: hungaryName,
      population: hungaryPopulation,
      christianPercent: hungaryChristianPercent,
      image: hungaryImage,
      ministryTypes: hungaryMinistryTypes,
      learnMoreUrl: hungaryLearnMoreUrl,
      coordinates: [19.5033, 47.1625],
      show: showHungary,
    },
    {
      id: "belarus",
      name: belarusName,
      population: belarusPopulation,
      christianPercent: belarusChristianPercent,
      image: belarusImage,
      ministryTypes: belarusMinistryTypes,
      learnMoreUrl: belarusLearnMoreUrl,
      coordinates: [27.9534, 53.7098],
      show: showBelarus,
    },
    {
      id: "bulgaria",
      name: bulgariaName,
      population: bulgariaPopulation,
      christianPercent: bulgariaChristianPercent,
      image: bulgariaImage,
      ministryTypes: bulgariaMinistryTypes,
      learnMoreUrl: bulgariaLearnMoreUrl,
      coordinates: [25.4858, 42.7339],
      show: showBulgaria,
    },
    {
      id: "serbia",
      name: serbiaName,
      population: serbiaPopulation,
      christianPercent: serbiaChristianPercent,
      image: serbiaImage,
      ministryTypes: serbiaMinistryTypes,
      learnMoreUrl: serbiaLearnMoreUrl,
      coordinates: [21.0059, 44.0165],
      show: showSerbia,
    },
    {
      id: "austria",
      name: austriaName,
      population: austriaPopulation,
      christianPercent: austriaChristianPercent,
      image: austriaImage,
      ministryTypes: austriaMinistryTypes,
      learnMoreUrl: austriaLearnMoreUrl,
      coordinates: [14.5501, 47.5162],
      show: showAustria,
    },
    {
      id: "switzerland",
      name: switzerlandName,
      population: switzerlandPopulation,
      christianPercent: switzerlandChristianPercent,
      image: switzerlandImage,
      ministryTypes: switzerlandMinistryTypes,
      learnMoreUrl: switzerlandLearnMoreUrl,
      coordinates: [8.2275, 46.8182],
      show: showSwitzerland,
    },
    {
      id: "netherlands",
      name: netherlandsName,
      population: netherlandsPopulation,
      christianPercent: netherlandsChristianPercent,
      image: netherlandsImage,
      ministryTypes: netherlandsMinistryTypes,
      learnMoreUrl: netherlandsLearnMoreUrl,
      coordinates: [5.2913, 52.1326],
      show: showNetherlands,
    },
    {
      id: "belgium",
      name: belgiumName,
      population: belgiumPopulation,
      christianPercent: belgiumChristianPercent,
      image: belgiumImage,
      ministryTypes: belgiumMinistryTypes,
      learnMoreUrl: belgiumLearnMoreUrl,
      coordinates: [4.4699, 50.5039],
      show: showBelgium,
    },
    {
      id: "greece",
      name: greeceName,
      population: greecePopulation,
      christianPercent: greeceChristianPercent,
      image: greeceImage,
      ministryTypes: greeceMinistryTypes,
      learnMoreUrl: greeceLearnMoreUrl,
      coordinates: [21.8243, 39.0742],
      show: showGreece,
    },
    {
      id: "portugal",
      name: portugalName,
      population: portugalPopulation,
      christianPercent: portugalChristianPercent,
      image: portugalImage,
      ministryTypes: portugalMinistryTypes,
      learnMoreUrl: portugalLearnMoreUrl,
      coordinates: [-8.2245, 39.3999],
      show: showPortugal,
    },
    {
      id: "sweden",
      name: swedenName,
      population: swedenPopulation,
      christianPercent: swedenChristianPercent,
      image: swedenImage,
      ministryTypes: swedenMinistryTypes,
      learnMoreUrl: swedenLearnMoreUrl,
      coordinates: [18.6435, 60.1282],
      show: showSweden,
    },
    {
      id: "norway",
      name: norwayName,
      population: norwayPopulation,
      christianPercent: norwayChristianPercent,
      image: norwayImage,
      ministryTypes: norwayMinistryTypes,
      learnMoreUrl: norwayLearnMoreUrl,
      coordinates: [8.4689, 60.472],
      show: showNorway,
    },
    {
      id: "denmark",
      name: denmarkName,
      population: denmarkPopulation,
      christianPercent: denmarkChristianPercent,
      image: denmarkImage,
      ministryTypes: denmarkMinistryTypes,
      learnMoreUrl: denmarkLearnMoreUrl,
      coordinates: [9.5018, 56.2639],
      show: showDenmark,
    },
    {
      id: "finland",
      name: finlandName,
      population: finlandPopulation,
      christianPercent: finlandChristianPercent,
      image: finlandImage,
      ministryTypes: finlandMinistryTypes,
      learnMoreUrl: finlandLearnMoreUrl,
      coordinates: [25.7482, 61.9241],
      show: showFinland,
    },
    {
      id: "ireland",
      name: irelandName,
      population: irelandPopulation,
      christianPercent: irelandChristianPercent,
      image: irelandImage,
      ministryTypes: irelandMinistryTypes,
      learnMoreUrl: irelandLearnMoreUrl,
      coordinates: [-8.2439, 53.4129],
      show: showIreland,
    },
    {
      id: "newzealand",
      name: newZealandName,
      population: newZealandPopulation,
      christianPercent: newZealandChristianPercent,
      image: newZealandImage,
      ministryTypes: newZealandMinistryTypes,
      learnMoreUrl: newZealandLearnMoreUrl,
      coordinates: [174.886, -40.9006],
      show: showNewZealand,
    },
    {
      id: "australia",
      name: australiaName,
      population: australiaPopulation,
      christianPercent: australiaChristianPercent,
      image: australiaImage,
      ministryTypes: australiaMinistryTypes,
      learnMoreUrl: australiaLearnMoreUrl,
      coordinates: [133.7751, -25.2744],
      show: showAustralia,
    },
    {
      id: "papuanewguinea",
      name: papuaNewGuineaName,
      population: papuaNewGuineaPopulation,
      christianPercent: papuaNewGuineaChristianPercent,
      image: papuaNewGuineaImage,
      ministryTypes: papuaNewGuineaMinistryTypes,
      learnMoreUrl: papuaNewGuineaLearnMoreUrl,
      coordinates: [143.9555, -6.315],
      show: showPapuaNewGuinea,
    },
    {
      id: "fiji",
      name: fijiName,
      population: fijiPopulation,
      christianPercent: fijiChristianPercent,
      image: fijiImage,
      ministryTypes: fijiMinistryTypes,
      learnMoreUrl: fijiLearnMoreUrl,
      coordinates: [179.4144, -17.7134],
      show: showFiji,
    },
    {
      id: "malaysia",
      name: malaysiaName,
      population: malaysiaPopulation,
      christianPercent: malaysiaChristianPercent,
      image: malaysiaImage,
      ministryTypes: malaysiaMinistryTypes,
      learnMoreUrl: malaysiaLearnMoreUrl,
      coordinates: [101.9758, 4.2105],
      show: showMalaysia,
    },
    {
      id: "singapore",
      name: singaporeName,
      population: singaporePopulation,
      christianPercent: singaporeChristianPercent,
      image: singaporeImage,
      ministryTypes: singaporeMinistryTypes,
      learnMoreUrl: singaporeLearnMoreUrl,
      coordinates: [103.8198, 1.3521],
      show: showSingapore,
    },
    {
      id: "cambodia",
      name: cambodiaName,
      population: cambodiaPopulation,
      christianPercent: cambodiaChristianPercent,
      image: cambodiaImage,
      ministryTypes: cambodiaMinistryTypes,
      learnMoreUrl: cambodiaLearnMoreUrl,
      coordinates: [104.991, 12.5657],
      show: showCambodia,
    },
    {
      id: "laos",
      name: laosName,
      population: laosPopulation,
      christianPercent: laosChristianPercent,
      image: laosImage,
      ministryTypes: laosMinistryTypes,
      learnMoreUrl: laosLearnMoreUrl,
      coordinates: [102.4955, 19.8563],
      show: showLaos,
    },
    {
      id: "mongolia",
      name: mongoliaName,
      population: mongoliaPopulation,
      christianPercent: mongoliaChristianPercent,
      image: mongoliaImage,
      ministryTypes: mongoliaMinistryTypes,
      learnMoreUrl: mongoliaLearnMoreUrl,
      coordinates: [103.8467, 46.8625],
      show: showMongolia,
    },
    {
      id: "nepal",
      name: nepalName,
      population: nepalPopulation,
      christianPercent: nepalChristianPercent,
      image: nepalImage,
      ministryTypes: nepalMinistryTypes,
      learnMoreUrl: nepalLearnMoreUrl,
      coordinates: [84.124, 28.3949],
      show: showNepal,
    },
    {
      id: "srilanka",
      name: sriLankaName,
      population: sriLankaPopulation,
      christianPercent: sriLankaChristianPercent,
      image: sriLankaImage,
      ministryTypes: sriLankaMinistryTypes,
      learnMoreUrl: sriLankaLearnMoreUrl,
      coordinates: [80.7718, 7.8731],
      show: showSriLanka,
    },
    {
      id: "kazakhstan",
      name: kazakhstanName,
      population: kazakhstanPopulation,
      christianPercent: kazakhstanChristianPercent,
      image: kazakhstanImage,
      ministryTypes: kazakhstanMinistryTypes,
      learnMoreUrl: kazakhstanLearnMoreUrl,
      coordinates: [66.9237, 48.0196],
      show: showKazakhstan,
    },
    {
      id: "uzbekistan",
      name: uzbekistanName,
      population: uzbekistanPopulation,
      christianPercent: uzbekistanChristianPercent,
      image: uzbekistanImage,
      ministryTypes: uzbekistanMinistryTypes,
      learnMoreUrl: uzbekistanLearnMoreUrl,
      coordinates: [64.5853, 41.3775],
      show: showUzbekistan,
    },
    {
      id: "tajikistan",
      name: tajikistanName,
      population: tajikistanPopulation,
      christianPercent: tajikistanChristianPercent,
      image: tajikistanImage,
      ministryTypes: tajikistanMinistryTypes,
      learnMoreUrl: tajikistanLearnMoreUrl,
      coordinates: [71.2761, 38.861],
      show: showTajikistan,
    },
    {
      id: "kyrgyzstan",
      name: kyrgyzstanName,
      population: kyrgyzstanPopulation,
      christianPercent: kyrgyzstanChristianPercent,
      image: kyrgyzstanImage,
      ministryTypes: kyrgyzstanMinistryTypes,
      learnMoreUrl: kyrgyzstanLearnMoreUrl,
      coordinates: [74.7661, 41.2044],
      show: showKyrgyzstan,
    },
    {
      id: "turkmenistan",
      name: turkmenistanName,
      population: turkmenistanPopulation,
      christianPercent: turkmenistanChristianPercent,
      image: turkmenistanImage,
      ministryTypes: turkmenistanMinistryTypes,
      learnMoreUrl: turkmenistanLearnMoreUrl,
      coordinates: [59.5563, 38.9697],
      show: showTurkmenistan,
    },
    {
      id: "azerbaijan",
      name: azerbaijanName,
      population: azerbaijanPopulation,
      christianPercent: azerbaijanChristianPercent,
      image: azerbaijanImage,
      ministryTypes: azerbaijanMinistryTypes,
      learnMoreUrl: azerbaijanLearnMoreUrl,
      coordinates: [47.5769, 40.1431],
      show: showAzerbaijan,
    },
    {
      id: "georgia",
      name: georgiaName,
      population: georgiaPopulation,
      christianPercent: georgiaChristianPercent,
      image: georgiaImage,
      ministryTypes: georgiaMinistryTypes,
      learnMoreUrl: georgiaLearnMoreUrl,
      coordinates: [43.3569, 42.3154],
      show: showGeorgia,
    },
    {
      id: "armenia",
      name: armeniaName,
      population: armeniaPopulation,
      christianPercent: armeniaChristianPercent,
      image: armeniaImage,
      ministryTypes: armeniaMinistryTypes,
      learnMoreUrl: armeniaLearnMoreUrl,
      coordinates: [45.0382, 40.0691],
      show: showArmenia,
    },
    {
      id: "jordan",
      name: jordanName,
      population: jordanPopulation,
      christianPercent: jordanChristianPercent,
      image: jordanImage,
      ministryTypes: jordanMinistryTypes,
      learnMoreUrl: jordanLearnMoreUrl,
      coordinates: [36.2384, 30.5852],
      show: showJordan,
    },
    {
      id: "lebanon",
      name: lebanonName,
      population: lebanonPopulation,
      christianPercent: lebanonChristianPercent,
      image: lebanonImage,
      ministryTypes: lebanonMinistryTypes,
      learnMoreUrl: lebanonLearnMoreUrl,
      coordinates: [35.8623, 33.8547],
      show: showLebanon,
    },
    {
      id: "oman",
      name: omanName,
      population: omanPopulation,
      christianPercent: omanChristianPercent,
      image: omanImage,
      ministryTypes: omanMinistryTypes,
      learnMoreUrl: omanLearnMoreUrl,
      coordinates: [55.9233, 21.4735],
      show: showOman,
    },
    {
      id: "kuwait",
      name: kuwaitName,
      population: kuwaitPopulation,
      christianPercent: kuwaitChristianPercent,
      image: kuwaitImage,
      ministryTypes: kuwaitMinistryTypes,
      learnMoreUrl: kuwaitLearnMoreUrl,
      coordinates: [47.4818, 29.3117],
      show: showKuwait,
    },
    {
      id: "qatar",
      name: qatarName,
      population: qatarPopulation,
      christianPercent: qatarChristianPercent,
      image: qatarImage,
      ministryTypes: qatarMinistryTypes,
      learnMoreUrl: qatarLearnMoreUrl,
      coordinates: [51.1839, 25.3548],
      show: showQatar,
    },
    {
      id: "uae",
      name: uaeName,
      population: uaePopulation,
      christianPercent: uaeChristianPercent,
      image: uaeImage,
      ministryTypes: uaeMinistryTypes,
      learnMoreUrl: uaeLearnMoreUrl,
      coordinates: [53.8478, 23.4241],
      show: showUAE,
    },
    {
      id: "bahrain",
      name: bahrainName,
      population: bahrainPopulation,
      christianPercent: bahrainChristianPercent,
      image: bahrainImage,
      ministryTypes: bahrainMinistryTypes,
      learnMoreUrl: bahrainLearnMoreUrl,
      coordinates: [50.5577, 26.0667],
      show: showBahrain,
    },
    {
      id: "libya",
      name: libyaName,
      population: libyaPopulation,
      christianPercent: libyaChristianPercent,
      image: libyaImage,
      ministryTypes: libyaMinistryTypes,
      learnMoreUrl: libyaLearnMoreUrl,
      coordinates: [17.2283, 26.3351],
      show: showLibya,
    },
    {
      id: "tunisia",
      name: tunisiaName,
      population: tunisiaPopulation,
      christianPercent: tunisiaChristianPercent,
      image: tunisiaImage,
      ministryTypes: tunisiaMinistryTypes,
      learnMoreUrl: tunisiaLearnMoreUrl,
      coordinates: [9.5375, 33.8869],
      show: showTunisia,
    },
    {
      id: "mauritania",
      name: mauritaniaName,
      population: mauritaniaPopulation,
      christianPercent: mauritaniaChristianPercent,
      image: mauritaniaImage,
      ministryTypes: mauritaniaMinistryTypes,
      learnMoreUrl: mauritaniaLearnMoreUrl,
      coordinates: [-10.9408, 21.0079],
      show: showMauritania,
    },
    {
      id: "niger",
      name: nigerName,
      population: nigerPopulation,
      christianPercent: nigerChristianPercent,
      image: nigerImage,
      ministryTypes: nigerMinistryTypes,
      learnMoreUrl: nigerLearnMoreUrl,
      coordinates: [8.0817, 17.6078],
      show: showNiger,
    },
    {
      id: "benin",
      name: beninName,
      population: beninPopulation,
      christianPercent: beninChristianPercent,
      image: beninImage,
      ministryTypes: beninMinistryTypes,
      learnMoreUrl: beninLearnMoreUrl,
      coordinates: [2.3158, 9.3077],
      show: showBenin,
    },
    {
      id: "togo",
      name: togoName,
      population: togoPopulation,
      christianPercent: togoChristianPercent,
      image: togoImage,
      ministryTypes: togoMinistryTypes,
      learnMoreUrl: togoLearnMoreUrl,
      coordinates: [0.8248, 8.6195],
      show: showTogo,
    },
    {
      id: "sierraleone",
      name: sierraLeoneName,
      population: sierraLeonePopulation,
      christianPercent: sierraLeoneChristianPercent,
      image: sierraLeoneImage,
      ministryTypes: sierraLeoneMinistryTypes,
      learnMoreUrl: sierraLeoneLearnMoreUrl,
      coordinates: [-11.7799, 8.4606],
      show: showSierraLeone,
    },
    {
      id: "liberia",
      name: liberiaName,
      population: liberiaPopulation,
      christianPercent: liberiaChristianPercent,
      image: liberiaImage,
      ministryTypes: liberiaMinistryTypes,
      learnMoreUrl: liberiaLearnMoreUrl,
      coordinates: [-9.4295, 6.4281],
      show: showLiberia,
    },
    {
      id: "guinea",
      name: guineaName,
      population: guineaPopulation,
      christianPercent: guineaChristianPercent,
      image: guineaImage,
      ministryTypes: guineaMinistryTypes,
      learnMoreUrl: guineaLearnMoreUrl,
      coordinates: [-9.6966, 9.9456],
      show: showGuinea,
    },
    {
      id: "ivorycoast",
      name: ivoryCoastName,
      population: ivoryCoastPopulation,
      christianPercent: ivoryCoastChristianPercent,
      image: ivoryCoastImage,
      ministryTypes: ivoryCoastMinistryTypes,
      learnMoreUrl: ivoryCoastLearnMoreUrl,
      coordinates: [-5.5471, 7.54],
      show: showIvoryCoast,
    },
    {
      id: "gambia",
      name: gambiaName,
      population: gambiaPopulation,
      christianPercent: gambiaChristianPercent,
      image: gambiaImage,
      ministryTypes: gambiaMinistryTypes,
      learnMoreUrl: gambiaLearnMoreUrl,
      coordinates: [-15.3101, 13.4432],
      show: showGambia,
    },
    {
      id: "guineabissau",
      name: guineaBissauName,
      population: guineaBissauPopulation,
      christianPercent: guineaBissauChristianPercent,
      image: guineaBissauImage,
      ministryTypes: guineaBissauMinistryTypes,
      learnMoreUrl: guineaBissauLearnMoreUrl,
      coordinates: [-15.1804, 11.8037],
      show: showGuineaBissau,
    },
    {
      id: "equatorialguinea",
      name: equatorialGuineaName,
      population: equatorialGuineaPopulation,
      christianPercent: equatorialGuineaChristianPercent,
      image: equatorialGuineaImage,
      ministryTypes: equatorialGuineaMinistryTypes,
      learnMoreUrl: equatorialGuineaLearnMoreUrl,
      coordinates: [10.2679, 1.6508],
      show: showEquatorialGuinea,
    },
    {
      id: "gabon",
      name: gabonName,
      population: gabonPopulation,
      christianPercent: gabonChristianPercent,
      image: gabonImage,
      ministryTypes: gabonMinistryTypes,
      learnMoreUrl: gabonLearnMoreUrl,
      coordinates: [11.6094, -0.8037],
      show: showGabon,
    },
    {
      id: "congo",
      name: congoName,
      population: congoPopulation,
      christianPercent: congoChristianPercent,
      image: congoImage,
      ministryTypes: congoMinistryTypes,
      learnMoreUrl: congoLearnMoreUrl,
      coordinates: [15.8277, -0.228],
      show: showCongo,
    },
    {
      id: "drc",
      name: drcName,
      population: drcPopulation,
      christianPercent: drcChristianPercent,
      image: drcImage,
      ministryTypes: drcMinistryTypes,
      learnMoreUrl: drcLearnMoreUrl,
      coordinates: [21.7587, -4.0383],
      show: showDRC,
    },
    {
      id: "car",
      name: carName,
      population: carPopulation,
      christianPercent: carChristianPercent,
      image: carImage,
      ministryTypes: carMinistryTypes,
      learnMoreUrl: carLearnMoreUrl,
      coordinates: [20.9394, 6.6111],
      show: showCAR,
    },
    {
      id: "southsudan",
      name: southSudanName,
      population: southSudanPopulation,
      christianPercent: southSudanChristianPercent,
      image: southSudanImage,
      ministryTypes: southSudanMinistryTypes,
      learnMoreUrl: southSudanLearnMoreUrl,
      coordinates: [31.307, 6.877],
      show: showSouthSudan,
    },
    {
      id: "eritrea",
      name: eritreaName,
      population: eritreaPopulation,
      christianPercent: eritreaChristianPercent,
      image: eritreaImage,
      ministryTypes: eritreaMinistryTypes,
      learnMoreUrl: eritreaLearnMoreUrl,
      coordinates: [39.7823, 15.1794],
      show: showEritrea,
    },
    {
      id: "djibouti",
      name: djiboutiName,
      population: djiboutiPopulation,
      christianPercent: djiboutiChristianPercent,
      image: djiboutiImage,
      ministryTypes: djiboutiMinistryTypes,
      learnMoreUrl: djiboutiLearnMoreUrl,
      coordinates: [42.5903, 11.8251],
      show: showDjibouti,
    },
    {
      id: "burundi",
      name: burundiName,
      population: burundiPopulation,
      christianPercent: burundiChristianPercent,
      image: burundiImage,
      ministryTypes: burundiMinistryTypes,
      learnMoreUrl: burundiLearnMoreUrl,
      coordinates: [29.9189, -3.3731],
      show: showBurundi,
    },
    {
      id: "botswana",
      name: botswanaName,
      population: botswanaPopulation,
      christianPercent: botswanaChristianPercent,
      image: botswanaImage,
      ministryTypes: botswanaMinistryTypes,
      learnMoreUrl: botswanaLearnMoreUrl,
      coordinates: [24.6849, -22.3285],
      show: showBotswana,
    },
    {
      id: "namibia",
      name: namibiaName,
      population: namibiaPopulation,
      christianPercent: namibiaChristianPercent,
      image: namibiaImage,
      ministryTypes: namibiaMinistryTypes,
      learnMoreUrl: namibiaLearnMoreUrl,
      coordinates: [18.4904, -22.9576],
      show: showNamibia,
    },
    {
      id: "lesotho",
      name: lesothoName,
      population: lesothoPopulation,
      christianPercent: lesothoChristianPercent,
      image: lesothoImage,
      ministryTypes: lesothoMinistryTypes,
      learnMoreUrl: lesothoLearnMoreUrl,
      coordinates: [28.2336, -29.61],
      show: showLesotho,
    },
    {
      id: "eswatini",
      name: eswatiniName,
      population: eswatiniPopulation,
      christianPercent: eswatiniChristianPercent,
      image: eswatiniImage,
      ministryTypes: eswatiniMinistryTypes,
      learnMoreUrl: eswatiniLearnMoreUrl,
      coordinates: [31.4659, -26.5225],
      show: showEswatini,
    },
    {
      id: "mauritius",
      name: mauritiusName,
      population: mauritiusPopulation,
      christianPercent: mauritiusChristianPercent,
      image: mauritiusImage,
      ministryTypes: mauritiusMinistryTypes,
      learnMoreUrl: mauritiusLearnMoreUrl,
      coordinates: [57.5522, -20.3484],
      show: showMauritius,
    },
    {
      id: "comoros",
      name: comorosName,
      population: comorosPopulation,
      christianPercent: comorosChristianPercent,
      image: comorosImage,
      ministryTypes: comorosMinistryTypes,
      learnMoreUrl: comorosLearnMoreUrl,
      coordinates: [43.8722, -11.875],
      show: showComoros,
    },
    {
      id: "capeverde",
      name: capeVerdeName,
      population: capeVerdePopulation,
      christianPercent: capeVerdeChristianPercent,
      image: capeVerdeImage,
      ministryTypes: capeVerdeMinistryTypes,
      learnMoreUrl: capeVerdeLearnMoreUrl,
      coordinates: [-24.0132, 16.5388],
      show: showCapeVerde,
    },
    {
      id: "saotomeandprincipe",
      name: saoTomeAndPrincipeName,
      population: saoTomeAndPrincipePopulation,
      christianPercent: saoTomeAndPrincipeChristianPercent,
      image: saoTomeAndPrincipeImage,
      ministryTypes: saoTomeAndPrincipeMinistryTypes,
      learnMoreUrl: saoTomeAndPrincipeLearnMoreUrl,
      coordinates: [6.6131, 0.1864],
      show: showSaoTomeAndPrincipe,
    },
    {
      id: "seychelles",
      name: seychellesName,
      population: seychellesPopulation,
      christianPercent: seychellesChristianPercent,
      image: seychellesImage,
      ministryTypes: seychellesMinistryTypes,
      learnMoreUrl: seychellesLearnMoreUrl,
      coordinates: [55.492, -4.6796],
      show: showSeychelles,
    },
  ]
const getMinistryKeyFromString = (ministryString: string): string | null => {
    const lowerStr = ministryString.toLowerCase()
    
    // Special case for 10/40 Window
    if (lowerStr.includes('10/40') || lowerStr.includes('1040')) {
      return 'window1040'
    }
    
    // Map non-standard ministry type strings to their canonical color keys
    const ALIAS_MAP: Record<string, string> = {
      humanitarian: 'ukraineaid',
      media: 'megacity',
      arabic: 'window1040',
    }
    if (ALIAS_MAP[lowerStr]) {
      return ALIAS_MAP[lowerStr]
    }
    
    // Remove spaces and slashes for general matching
    const cleanStr = lowerStr.replace(/\s+/g, '').replace(/\//g, '')
    
    // Sort keys by length (longest first) to match more specific terms first
    const sortedKeys = Object.keys(MINISTRY_COLORS).sort((a, b) => b.length - a.length)
    
    for (const key of sortedKeys) {
      if (cleanStr.includes(key.toLowerCase())) {
        return key
      }
    }
    
    return null
  }

  // Helper function to get the color for a ministry type string
  const getMinistryColor = (ministryString: string): string => {
    const key = getMinistryKeyFromString(ministryString)
    return key ? MINISTRY_COLORS[key] : MINISTRY_COLORS.multipleministries // Default to first color
  }

  // Helper function to get color for a country (checks for multiple ministries)
  const getCountryColor = (country: any): string => {
    // If country has a specific color override, use it
    if (country.color) {
      return country.color
    }
    // If country has more than one ministry type, show as Multiple Ministries
    if (country.ministryTypes && country.ministryTypes.length > 1) {
      return MINISTRY_COLORS.multipleministries
    }
    // Otherwise show the color of the single ministry
    return getMinistryColor(country.ministryTypes[0])
  }

  // Helper function to get the display name for a ministry type string
  const getMinistryDisplayName = (ministryString: string): string => {
    const key = getMinistryKeyFromString(ministryString)
    return key ? MINISTRY_NAMES[key] : ministryString
  }

  // Ministry URLs mapping
  const MINISTRY_URLS: Record<string, string> = {
    multipleministries: multipleministriesUrl,
    megacity: megaCityMediaCampaignUrl,
    window1040: window1040MediaOutreachUrl,
    ukraineaid: ukraineAidUrl,
    trauma: traumaRecoveryUrl,
    jewish: jewishMinistryUrl,
    social: socialMediaOutreachUrl,
    mediaoutreach: mediaOutreachUrl,
  }

  // Helper function to get URL for a ministry type
  const getMinistryUrl = (ministryKey: string): string => {
    return MINISTRY_URLS[ministryKey] || ""
  }

  // Filter countries based on visibility
  const visibleCountries = countryStats.filter((country) => country.show)

  // Add scroll listener when popup is open
  if (typeof window !== 'undefined' && selectedCountry) {
    const handleScroll = () => {
      setSelectedCountry(null)
    }
    
    // Remove any existing listener first
    window.removeEventListener('scroll', handleScroll)
    // Add the listener
    window.addEventListener('scroll', handleScroll, { once: true })
  }

  return (
    <div className={className} style={{ backgroundColor, color: textColor, overflowY: isMobile ? "auto" : undefined }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={
              useTitleGradient
                ? {
                    backgroundImage: `linear-gradient(to right, ${normalizeColor(titleGradientFrom)}, ${normalizeColor(titleGradientTo)})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }
                : { color: normalizeColor(titleColor) }
            }
          >
            {title}
          </h2>
          <p className="text-xl opacity-90">{subtitle}</p>
        </div>

        <div className="flex flex-col-reverse lg:flex-col gap-6">
          {/* Map */}
          <div className="relative" style={{ backgroundColor: mapBackgroundColor }}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 170,
              center: [0, 20],
            }}
            width={isMobile ? 600 : 800}
            height={isMobile ? 800 : 600}
            preserveAspectRatio={isMobile ? "xMidYMid slice" : "xMidYMid meet"}
            style={{ width: "100%", height: "auto" }}
          >
            {isMobile ? (
            <ZoomableGroup minZoom={1} maxZoom={8}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={mapLandColor}
                      stroke={mapBorderColor}
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "#475569" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {[...visibleCountries].sort((a, b) => (a.id === "israel" ? 1 : b.id === "israel" ? -1 : 0)).map((country) => {
                const isIsrael = country.id === "israel"
                return (
                  <Marker
                    key={country.id}
                    coordinates={country.coordinates as [number, number]}
                    onMouseEnter={() => setHoveredCountry(country.id)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    onClick={() => {
                      setSelectedCountry(country)
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <g transform="translate(-18, -36)" opacity={isIsrael ? 1 : hoveredCountry === country.id ? 1 : 0.8}>
                      <path
                        d="M18 0C8.1 0 0 8.1 0 18c0 13.5 18 36 18 36s18-22.5 18-36c0-9.9-8.1-18-18-18z"
                        fill={getCountryColor(country)}
                        stroke="#fff"
                        strokeWidth={isIsrael ? 1.5 : 1}
                      />
                      <circle cx="18" cy="18" r={isIsrael ? 2.5 : 2} fill="#fff" />
                    </g>
                  </Marker>
                )
              })}
            </ZoomableGroup>
            ) : (
            <>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={mapLandColor}
                      stroke={mapBorderColor}
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "#475569" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {[...visibleCountries].sort((a, b) => (a.id === "israel" ? 1 : b.id === "israel" ? -1 : 0)).map((country) => {
                const isIsrael = country.id === "israel"
                return (
                  <Marker
                    key={country.id}
                    coordinates={country.coordinates as [number, number]}
                    onMouseEnter={() => setHoveredCountry(country.id)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    onClick={() => {
                      setSelectedCountry(country)
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <g transform="translate(-6, -12)" opacity={isIsrael ? 1 : hoveredCountry === country.id ? 1 : 0.8}>
                      <path
                        d="M6 0C2.7 0 0 2.7 0 6c0 4.5 6 12 6 12s6-7.5 6-12c0-3.3-2.7-6-6-6z"
                        fill={getCountryColor(country)}
                        stroke="#fff"
                        strokeWidth={isIsrael ? 1.5 : 1}
                      />
                      <circle cx="6" cy="6" r={isIsrael ? 2.5 : 2} fill="#fff" />
                    </g>
                  </Marker>
                )
              })}
            </>
            )}
          </ComposableMap>
        </div>

        {/* Dynamic Legend - CLICKABLE */}
        <div className="flex flex-wrap justify-center gap-4">
          {Object.entries(MINISTRY_COLORS).map(([key, color]) => {
            if (!MINISTRY_VISIBILITY[key]) return null

            const url = getMinistryUrl(key)
            const content = (
              <>
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-sm">{MINISTRY_NAMES[key]}</span>
              </>
            )

            if (url) {
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer"
                >
                  {content}
                </a>
              )
            }

            return (
              <div key={key} className="flex items-center gap-2">
                {content}
              </div>
            )
          })}
        </div>
      </div>

        <AnimatePresence>
          {selectedCountry && (
            <motion.div
              initial={isMobile ? { opacity: 0, y: 100 } : { opacity: 0, x: -50 }}
              animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
              exit={isMobile ? { opacity: 0, y: 100 } : { opacity: 0, x: -50 }}
              className="fixed z-50 inset-x-0 bottom-0 md:left-32 md:top-1/2 md:inset-x-auto md:bottom-auto md:-translate-x-0 md:-translate-y-1/2"
              style={{
                maxWidth: isMobile ? "100%" : "360px",
                width: isMobile ? "100%" : "90%",
              }}
              onClick={() => setSelectedCountry(null)}
            >
              <div
                className="rounded-t-xl md:rounded-lg shadow-2xl w-full overflow-hidden"
                style={{ backgroundColor: popupBackgroundColor, color: popupTextColor }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedCountry.image || "/placeholder.svg"}
                  alt={selectedCountry.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-3">
                    {selectedCountry.selectedCity
                      ? `${selectedCountry.selectedCity.name}, ${selectedCountry.name}`
                      : selectedCountry.name}
                  </h3>
                  <div className="space-y-1.5 mb-3 text-sm">
                    <p>
                      <span className="font-semibold">Population:</span> {selectedCountry.population}
                    </p>
                    <p>
                      <span className="font-semibold">Evangelical Population:</span> {selectedCountry.christianPercent}
                    </p>
                  </div>
                  <div className="space-y-1.5 mb-3">
                    {popupMinistryLinks.length > 0 ? (
                      popupMinistryLinks.map((link, i) => (
                        <div key={i}>
                          {link.url ? (
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:opacity-80 transition-opacity inline-block"
                            >
                              <span
                                className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"
                                style={{
                                  backgroundColor: getMinistryColor(selectedCountry.ministryTypes[0] || "multipleministries"),
                                  color: "#ffffff",
                                }}
                              >
                                {link.label}
                              </span>
                            </a>
                          ) : (
                            <span
                              className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor: getMinistryColor(selectedCountry.ministryTypes[0] || "multipleministries"),
                                color: "#ffffff",
                              }}
                            >
                              {link.label}
                            </span>
                          )}
                        </div>
                      ))
                    ) : (
                    (
                      selectedCountry.selectedCity
                        ? [...new Set([...selectedCountry.ministryTypes, selectedCountry.selectedCity.ministryType])]
                        : selectedCountry.ministryTypes
                    ).map((type: string) => {
                      const description = selectedCountry.ministryDescriptions?.[type]
                      const ministryKey = getMinistryKeyFromString(type)
                      const ministryUrl = ministryKey ? getMinistryUrl(ministryKey) : ""
                      const ministryName = ministryKey ? MINISTRY_NAMES[ministryKey] : type
                      const linkUrl = ministryKey === "megacity" ? selectedCountry.learnMoreUrl || ministryUrl : ministryUrl || selectedCountry.learnMoreUrl

                      const badge = (
                        <span
                          className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: getMinistryColor(type),
                            color: "#ffffff",
                          }}
                        >
                          {ministryName}
                        </span>
                      )

                      return (
                        <div key={type}>
                          {linkUrl ? (
                            <a
                              href={linkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:opacity-80 transition-opacity inline-block"
                            >
                              {badge}
                            </a>
                          ) : (
                            badge
                          )}
                          {description && <p className="text-xs mt-0.5 ml-1 opacity-90">{description}</p>}
                        </div>
                      )
                    })
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedCountry(null)}
                      className="flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                      style={{
                        backgroundColor: "#e5e7eb",
                        color: "#1f2937",
                      }}
                    >
                      Close
                    </button>
                    {selectedCountry.learnMoreUrl && (
                      <a
                        href={selectedCountry.learnMoreUrl}
                        className="flex-1 px-3 py-1.5 rounded-lg text-sm font-medium text-center transition-colors"
                        style={{
                          backgroundColor: selectedCountry.selectedCity
                            ? getMinistryColor(selectedCountry.selectedCity.ministryType)
                            : getCountryColor(selectedCountry),
                          color: "#ffffff",
                        }}
                      >
                        Learn More
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
