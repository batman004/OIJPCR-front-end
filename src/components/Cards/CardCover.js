const CardCover = ({ coverPhoto, authorText }) => {
  return (
    <>
      <img className="object-cover w-full h-64 hover:bg-gray"
        src={coverPhoto}
        alt="Article-List cover"
      />
      <p
        className="h-6 mx-2 mt-3 text-xs font-medium text-center truncate whitespace-nowrap tracking-widest uppercase"
        style={{ color: 'var(--color-text-muted)' }}
      >{authorText}</p>
    </>
  )
}


export default CardCover