function Container(props) {
  return (
    <div className="card-surface flex flex-col p-6 my-10 lg:flex-row md:mx-4 sm:mx-2 md:p-10">
      {props.children}
    </div>
  )
}

function Body(props) {
  return (
    <div className="lg:w-2/3 md:pl-6">
      {props.children}
    </div>
  )
}

export { Container, Body }
