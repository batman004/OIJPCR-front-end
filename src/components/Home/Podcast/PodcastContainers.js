function Container(props) {
  return (
    <div className="flex flex-col p-6 my-8 border rounded-md shadow-xl lg:flex-row md:mx-4 sm:mx-2 md:p-10">
      {props.children}
    </div>
  )
}

function Body(props) {
  return (
    <div className="lg:w-2/3">
      {props.children}
    </div>
  )
}

export { Container, Body }