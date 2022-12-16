const Wrapper = ({ children }) => {
  const wrapperClass = `flex flex-col justify-center py-8 items-center min-h-screen bg-center`

  return (
    <main
      className={wrapperClass}
      style={{backgroundImage: "url('https://tailwindcss.com/_next/static/media/hero@75.b2469a49.jpg')"}}>
        <div className="container mx-auto flex flex-col justify-center items-center px-16 md:px-0">
          {children}
        </div>
    </main>
  )
}

export default Wrapper