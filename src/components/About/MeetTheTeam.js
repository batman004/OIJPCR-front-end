import TeamMemberCard from './TeamMemberCard'

const MeetTheTeam = ({ teamMembers }) => (
  <>
    <h3 className="mt-16 text-2xl font-bold text-center sm:text-3xl md:text-4xl lg:text-5xl lg:text-left">
      Meet the team
    </h3>
    <div className="flex flex-col flex-wrap my-8 lg:flex-row lg:justify-around">
      {
        teamMembers.map((member, index) => {
          return <TeamMemberCard {...member} key={index} />
        })
      }
    </div>
  </>
)


export default MeetTheTeam