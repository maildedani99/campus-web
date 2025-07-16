type PageHeaderProps = {
  title: string
  subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-6 w-full">
      <h1 className="text-2xl font-bold text-white text-center">{title}</h1>
      {subtitle && (
        <p className="text-sm text-white/60 mt-1 text-center">{subtitle}</p>
      )}
    </div>
  )
}
