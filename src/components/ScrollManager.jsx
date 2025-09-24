import { useEffect } from 'react'
import { currentPage, scrollOffset } from '../GlobalState'
import { useSetAtom } from 'jotai'
import { create } from 'zustand'
import { useMediaQuery } from 'react-responsive'
import { useViewportStore } from './ViewportManager'
import { UAParser } from 'ua-parser-js'
import * as THREE from 'three'

export const useScrollStore = create(set => ({
  scrollRatio: 0,
  page: 0,
  menuLinkPosition: 0,

  setScrollRatio: scrollRatio =>
    set({
      scrollRatio
    }),
  setPage: page =>
    set({
      page
    }),
  setMenuLinkPosition: menuLinkPosition => set({ menuLinkPosition })
}))

const ScrollManager = ({ pages = [], pathname = '/' }) => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 440px)' })
  const windowHeight = useViewportStore(state => state.availableHeight)

  const setScrollOffset = useSetAtom(scrollOffset)
  const setCurrentPage = useSetAtom(currentPage)
  const setScrollRatio = useScrollStore(state => state.setScrollRatio)
  const setPage = useScrollStore(state => state.setPage)

  const parser = new UAParser()
  const device = parser.getDevice()

  console.info('[ScrollManager] rendered', pages)

  // safe viewport height to use in calculations/render
  const vh = Math.max(1, windowHeight || (typeof window !== 'undefined' ? window.innerHeight : 1))

  useEffect(() => {
    // ensure start at top
    if (typeof window !== 'undefined') window.scrollTo(0, 0)

    const scrollme = () => {
      try {
        const scrollY = typeof window !== 'undefined' ? (window.scrollY || window.pageYOffset || 0) : 0

        // total scrollable height for our page-based layout
        const pageCount = Math.max(1, pages.length)
        const totalScrollable = Math.max(1, vh * Math.max(0, pageCount - 1))

        // safe ratio clamped to [0,1]
        const rawRatio = scrollY / totalScrollable
        const ratio = Number.isFinite(rawRatio) ? Math.max(0, Math.min(1, rawRatio)) : 0

        // safe current page index clamped to available pages
        const rawPage = vh > 0 ? Math.floor(scrollY / vh) : 0
        const currentPg = Number.isFinite(rawPage) ? Math.max(0, Math.min(pageCount - 1, rawPage)) : 0

        // update atoms / zustand safely
        setScrollOffset(ratio)
        setScrollRatio(ratio)
        setCurrentPage(currentPg)
        setPage(currentPg)

        console.debug('[ScrollManager] @useEffect', ratio)
      } catch (err) {
        console.warn('[ScrollManager] scrollme error', err)
        // fallback safe updates
        setScrollOffset(0)
        setScrollRatio(0)
        setCurrentPage(0)
        setPage(0)
      }
    }

    // init
    scrollme()

    window.addEventListener('scroll', scrollme, { passive: true })
    window.addEventListener('resize', scrollme)

    return () => {
      setScrollOffset(0)
      setScrollRatio(0)
      window.removeEventListener('scroll', scrollme)
      window.removeEventListener('resize', scrollme)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages.length, pathname, windowHeight])

  return (
    <div
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        left: 0,
        top: 0,
        width: '100%',
        height: Math.max(1, pages.length) * vh
      }}
    >
      {pages.map((d, i, arr) => (
        <div
          className="page-content"
          key={'i' + i}
          style={{
            height: i === arr.length - 1 ? vh + vh / (isBigScreen ? 4 : 2.3) : vh
          }}
        ></div>
      ))}
    </div>
  )
}

export default ScrollManager