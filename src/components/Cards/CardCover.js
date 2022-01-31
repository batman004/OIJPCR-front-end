const CardCover = ({ coverPhoto, authorText }) => {
  return (
    <>
      <img className="object-cover w-full h-64 hover:bg-gray"
        src={coverPhoto}
        alt="Article-List cover"
      />
      <p className="mt-2 text-xs font-medium text-center text-gray-500">{authorText}</p>
    </>
  )
}


export default CardCover