
import VaiTroContent from '../Data/vaiTro.json'
import { useLocation } from 'react-router-dom'
import ScrollManager, { useScrollStore } from './ScrollManager'
import Feature from '../Ui/Feature'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useSpring, a, config } from '@react-spring/web'
import { useViewportStore } from './ViewportManager'
import ScrollDownIndicator from '../Ui/ScrollDownIndicator'
import VaiTroCustom from '../Ui/VaiTroCustom'

const VaiTroRoute = '/vai-tro'
const AvailableContents = {
  [VaiTroRoute]: VaiTroContent
}
const ContentManager = ({ openModal, scrollToTop }) => {
  const bottomRef = useRef(null)
  const availableHeight = useViewportStore(state => state.availableHeight)
  const setBottomVisible = useViewportStore(state => state.setBottomVisible)
  // Fetch initial state
  const ratioRef = useRef(useScrollStore.getState().scrollRatio)
  const pageRef = useRef(useScrollStore.getState().page)
  const totalPagesRef = useRef(0)
  const [displayIndicator, setDisplayIndicator] = useState(true)

  const { pathname } = useLocation()

  const contents = AvailableContents[pathname]

  const [styles, api] = useSpring(() => ({
    y: 0,
    config: config.slow
  }))

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBottomVisible(true)
          console.debug('[ContentManager] Bottom is visible')
        } else {
          setBottomVisible(false)
          console.debug('[ContentManager] Bottom is not visible')
        }
      },
      { threshold: 1 }
    )
    if (bottomRef.current) {
      observer.observe(bottomRef.current)
    }
    return () => {
      // cleanup observer
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    console.info('[ContentManager] @useEffect pathname', pathname)
    totalPagesRef.current = contents?.sections?.length
  }, [pathname])

  useEffect(() => {
    return useScrollStore.subscribe(state => {
      ratioRef.current = state.scrollRatio * (totalPagesRef.current - 1)
      if (pageRef.current !== state.page) {
        pageRef.current = state.page
        if (pageRef.current === 0) {
          setDisplayIndicator(true)
        } else {
          setDisplayIndicator(false)
        }
        // api.start({
        //   y: -window.innerHeight * pageRef.current,
        // })
        console.info('[ContentManager] page changed', pageRef.current)
      }
      api.start({
        y: -window.innerHeight * ratioRef.current
      })
      // console.info('[ContentManager] scrolling', ratioRef.current)
    })
  }, [])

  return (
    <>
      <a.div
        style={styles}
        className={`ContentManager ${displayIndicator === true ? 'display-indicator' : ''} ${pathname === '/' ? 'index-page' : ''} flex flex-col items-center fixed`}
      >
        <div className="absolute w-screen h-screen flex items-end pointer-events-none">
          <ScrollDownIndicator className={'mb-10'}></ScrollDownIndicator>
        </div>
        {pathname === VaiTroRoute ? (
          <VaiTroCustom scrollToTop={scrollToTop}
            openModal={openModal}
            contents={contents}
          />
        ) : (
          contents?.sections.map((d, i, arr) => (
            <div
              id={`slide-${d.id}`}
              style={{ height: availableHeight }}
              className="..."
              key={d.path ?? i}
            >
              <Feature
                scrollToTop={scrollToTop}
                openModal={openModal}
                contents={contents}
                title={d.title}
                description={d.description}
                i={i}
                lastItem={i === arr.length - 1}
              />
            </div>
          ))
        )}
        <div className="opacity-0" ref={bottomRef}>
          Footer Trigger
        </div>
      </a.div>

      <ScrollManager pages={contents?.sections} pathname={pathname} />
    </>
  )
}

export default ContentManager
