interface IHelloProps {};

interface IHelloState {};

class Hello extends React.Component<IHelloProps, IHelloState> {
  render() {
    return (
      <h1>{'Hello world!'}</h1>
    );
  }
}
