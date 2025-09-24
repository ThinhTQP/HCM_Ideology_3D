const Logo3dStories = ({ color = 'var(--white)', width = 100, className, scrollToTop, pointerEvent = true }) => {
  const ratio = 291.87 / 345.67
  const height = width / ratio

  return (
    <div
      onClick={scrollToTop}
      className={`Logo3dStories SVG ${className} flex cursor-pointer ${pointerEvent ? 'pointer-events-auto' : 'pointer-events-none'}`}
      style={{ height: height + 'px', width: width + 'px' }}
    >
      <img src="/logo.png" alt="Logo 3D Stories"  />
    </div>
  )
}

export default Logo3dStories
