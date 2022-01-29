const TeamMemberCard = ({
  name,
  position,
  description,
  profilePhoto
}) => (
  <div className="flex items-center justify-center my-4 md:my-4 md:mx-4">
    <figure className="relative max-w-xs cursor-pointer">
      <img className="rounded-lg h-80 md:h-96"
        src={profilePhoto}
        alt={name}
      />
      <figcaption className="absolute inset-0 px-4 pb-4 text-gray-900 duration-300 opacity-0 hover:opacity-90 hover:bg-gray-50">
        <div className="mt-2 mb-2 md:mt-8">
          <h5 className="text-2xl font-bold text-center" >{name}</h5>
        </div>
        <div className="mt-2 mb-2">
          <h6 className="text-xl font-semibold text-center" >{position}</h6>
        </div>
        <div>
          <p className="leading-snug text-md">{description}</p>
        </div>
      </figcaption>
    </figure>
  </div>
)


export default TeamMemberCard