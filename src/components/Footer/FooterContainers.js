function FooterContainer (props) {
  return (
    <footer className="flex flex-col-reverse p-4 text-gray-400 bg-black md:flex-row">
      {props.children}
    </footer>
  )
}

function FooterNavContainer (props) {
  return (
    <div className="flex flex-row flex-1 w-full mt-2 md:flex-1 md:w-1/2 md:mt-0 noprint">
      {props.children}
    </div>
  )
}

export {FooterContainer, FooterNavContainer}