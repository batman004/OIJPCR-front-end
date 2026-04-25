export default function NotFound (props) {
  const {msg} = props.msg ? props : ''
  return (
    <div className="p-8 flex-grow flex items-center justify-center">
      <div className="text-center">
        <p
          className="text-xs uppercase tracking-widest mb-3"
          style={{ color: 'var(--color-text-muted)', letterSpacing: '0.12em' }}
        >Error 404</p>
        <h1
          className="text-3xl md:text-5xl font-serif font-bold mb-3"
          style={{ color: 'var(--color-primary)' }}
        >
          Page not found
        </h1>
        {msg && (
          <p style={{ color: 'var(--color-text-muted)' }}>{msg}</p>
        )}
      </div>
    </div>
  )
}
