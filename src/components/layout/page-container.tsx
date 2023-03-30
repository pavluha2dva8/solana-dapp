export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="drawer-content flex flex-col">
      <div className="container min-h-screen grid grid-rows-[auto,1fr] mx-auto max-w-6xl p-8 2xl:px-0">
        {children}
      </div>
    </div>
  )
}
