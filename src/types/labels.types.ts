import { labels } from "@/content/labels"

/**
 * Flat, namespaced key -> already-translated string.
 * Backend resolves locale server-side; this repo never picks a language.
 * This is the wire shape — content-client.ts nests it into TNestedLabels
 * before handing it to components.
 */
export type TLabels = typeof labels

export type TLabelsHomepageLocationsDetails =
  TLabels["homepage"]["locations"]["locationsDetails"][number]
export type TLabelsHomepageTeamMembers = TLabels["homepage"]["team"]["members"][number]
export type TLabelsHomepageMethodsCards = TLabels["homepage"]["methods"]["cards"][number]
export type TLabelsHomepageServicesAreas = TLabels["homepage"]["services"]["services"][number]
export type TLabelsAboutpageTimelineItems = TLabels["about"]["timeline"]["items"][number]
export type TLabelsServicespagePillars = TLabels["servicesPage"]["pillars"][number]
export type TLabelsCultureCareerPageValues = TLabels["cultureCareerPage"]["values"][number]
export type TLabelsCultureCareerpageAwardsItems =
  TLabels["cultureCareerPage"]["awards"]["items"][number]
export type TLabelsFooter = TLabels["footer"]
export type TLabelsServicesDetailsPages = TLabels["servicesDetailsPages"]
export type TLabelsServiceDetailPage =
  TLabelsServicesDetailsPages[keyof TLabelsServicesDetailsPages]
