import SectionHeader from './SectionHeader'
import SectionBody from './SectionBody'

type props = {
  message: string
}

const ErrorPage = ({ message }: props) => {
  return (
    <>
      <SectionHeader>
          <h1 className="text-4xl font-semibold text-slate-950 dark:text-slate-50">
              Error
          </h1>
      </SectionHeader>
      <SectionBody>
          <div className="flex flex-col items-start justify-start h-[50vh] mx-[2vw]">
              <h1 className="text-xl font-medium text-slate-950 dark:text-slate-50">
                  {message}
              </h1>
          </div>
      </SectionBody>
    </>
  )
}

export default ErrorPage