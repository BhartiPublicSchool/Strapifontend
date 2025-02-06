import log from 'lib/logger'
import apiClient from './apiClient'
import qs from 'qs'

export const fetchSharedData = async () => {
  try {
    const queryString = `populate[0]=header_menu.submenu&populate[1]=header_menu.menu_hover_image&
    populate[2]=quickMenu.links&populate[3]=dropdownHover.q_links&populate[4]=admission_handbook.background&
    populate[5]=footer_links&populate[6]=startup_modal.modal_img&populate[7]=startup_modal.buttons&
    populate[8]=logo&populate[9]=favicon&populate[10]=accreditation&populate[11]=footer.footer_bg&populate[12]=meta`
    const commons = await apiClient.get(`/api/shared?${queryString}`)
    return commons
  } catch (error: any) {
    log.error(`fetchSharedData() - Failed RootCause: ${error.message}`)
    throw error
  }
}

export const fetchLandingPageContent = async () => {
  try {
    const response = await apiClient.get(`/api/landing-page?populate=*`)
    return response.data
  } catch (error: any) {
    log.error(`fetchLandingPageContent() - Failed RootCause: ${error.message}`)
    throw error
  }
}

export const fetchHomePageContent = async () => {
  try {
    const query = `?populate[0]=homeVideo.titleVideo&populate[1]=homeVideo.logo&populate[2]=BPS_PRIDE.fold2_bg&populate[3]=Fold3.card_img&populate[4]=Fold4&populate[5]=NewsAndAnnouncement.news_img&populate[6]=StoryTimeline.timeline_img&populate[7]=Footer.footer_bg&populate[8]=Fold4_title&populate[9]=newsAnnouncement_title_with_bg.background&populate[10]=video_poster&populate[11]=meta&populate[12]=Fold3.card_link&populate[13]=Fold4.Fold4_icon&populate[14]=NewsAndAnnouncement.modal.img&populate[15]=BPS_PRIDE.fold2_link`
    const queryString = qs.stringify({
      populate: '*'
    })
    const response = await apiClient.get(`/api/home${query}`)
    return response.data
  } catch (error: any) {
    log.error(`fetchHomePageContent() - Failed RootCause: ${error.message}`)
    throw error
  }
}

export const fetchMissionPageContent = async () => {
  try {
    const queryString = `populate[0]=fold1&populate[1]=fold2.video&populate[2]=fold3.img&populate[3]=page_bg&populate[4]=meta`
    const response = await apiClient.get(`/api/mission?${queryString}`)
    return response.data
  } catch (error: any) {
    log.error(`fetchMissionPageContent() - Failed RootCause: ${error.message}`)
    throw error
  }
}

export const fetchExploreCampusPageContent = async () => {
  try {
    const queryString = `populate[0]=Legends.slides&populate[1]=page_bg_sm&populate[2]=Legends.slides.slide_img&populate[3]=page_bg&populate[4]=meta`
    const response = await apiClient.get(`/api/explore-campus?${queryString}`)
    return response.data
  } catch (error: any) {
    log.error(
      `fetchExploreCampusPageContent() - Failed RootCause: ${error.message}`
    )
    throw error
  }
}

export const fetchExploreCampusSlidesPageContent = async () => {
  try {
    const queryString = `populate[0]=Legends.slides&populate[1]=Legends.slides.slide_img`
    const response = await apiClient.get(`/api/explore-campus?${queryString}`)
    return response.data.Legends
  } catch (error: any) {
    log.error(
      `fetchExploreCampusSlidesPageContent() - Failed RootCause: ${error.message}`
    )
    throw error
  }
}

export const fetchBPSDifferencePageContent = async () => {
    try {
      const queryString = `populate[0]=fold2&populate[1]=fold3.img&populate[2]=lastFold&populate[3]=page_bg&populate[4]=subheader&populate[5]=meta`
      const response = await apiClient.get(`/api/the-bps-difference?${queryString}`)
      return response.data.Legends
    } catch (error: any) {
      log.error(
        `fetchExploreCampusSlidesPageContent() - Failed RootCause: ${error.message}`
      )
      throw error
    }
  }