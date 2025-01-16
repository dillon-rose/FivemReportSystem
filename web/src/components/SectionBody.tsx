const SectionBody = ({ children, classname }: { children: React.ReactNode, classname?: string }) => {
    return (
      <>
          <div className={`h-[64.6vh] px-[0.5vw] pt-[2vh] pb-[1vh] ${classname}`}>
              {children}
          </div>
      </>
      
    )
}

export default SectionBody