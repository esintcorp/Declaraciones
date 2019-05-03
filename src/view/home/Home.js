import React, { Component } from 'react';

import '../../App.css';
import Header from '../../components/logic/Header';
import FormIconButton from '../../components/form/FormIconButton';
import FormIconInput from '../../components/form/FormIconInput';

const Item = props => <button
  className="item"
>
  {props.children}
</button>;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      questions: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleSubmit(event) {
    const { history } = this.props;

    history.push({
      pathname: "/home"
    });
  }

  handleLogout() {
    const { history } = this.props;

    history.push({
      pathname: "/"
    });
    window.location.reload();
  }

  render() {
    const { history } = this.props;
    return (
      <React.Fragment>
        <Header
          classNames="App-logo"
          afterLogout={this.handleLogout}
          history={history}
          logout
          profile
        />
        <section className="App-section App-section-authenticated">
        <aside style={{
          display: 'flex',
          flexDirection: 'column',
          // backgroundColor: 'red',
          width: '300vmin',
          float: 'left',
          minWidth: 170,
          padding: "30px 20px"
        }}>
          <Item>IVA</Item>
          <Item>Anexos</Item>
          <Item>Renta</Item>
        </aside>
          <div className="home-div">
            {/* <h2><strong>Lorem Ipsum</strong></h2> */}
            <p>Nullam eu turpis purus.</p>
            <FormIconInput
              // name="userId"
              // type="email"
              // placeholder="Correo Electrónico"
              // value={this.state.user.userId}
              // onChange={this.handleChange}
              // iconName="envelope"
              classNames={["flex1", "quest"]}
              style={{marginTop: 0}}
            />
            <p>Lorem ipsum dolor sit amet</p>
            <FormIconInput
              // name="userId"
              // type="email"
              // placeholder="Correo Electrónico"
              // value={this.state.user.userId}
              // onChange={this.handleChange}
              // iconName="envelope"
              classNames={["flex1", "quest"]}
              style={{marginTop: 0, marginBottom: 40}}
            />

            <p>Pellentesque libero sapien.</p>
            <FormIconInput
              // name="userId"
              // type="email"
              // placeholder="Correo Electrónico"
              // value={this.state.user.userId}
              // onChange={this.handleChange}
              // iconName="envelope"
              classNames={["flex1", "quest"]}
              style={{marginTop: 0}}
            />

            <p>Mauris laoreet magna eu metus iaculis dignissim. Nullam varius libero vel nulla mollis dictum. Etiam sagittis laoreet tortor ac pretium. Nam ut ipsum in ligula bibendum convallis. Aenean feugiat nibh nibh, vel consectetur sapien laoreet id. Proin vitae nunc eget arcu ultricies tristique. Donec dictum tincidunt accumsan. Curabitur in dui vel enim facilisis commodo nec sit amet urna. Morbi tincidunt, mauris vel convallis efficitur, dui nisi sollicitudin turpis, quis molestie nibh odio vitae felis. Praesent posuere in sapien nec lobortis. Ut a consequat nisi. In justo erat, fringilla a feugiat a, consequat eget tellus. Integer mauris odio, suscipit non quam vel, iaculis consectetur risus. Duis non ultrices est.</p>
            <FormIconInput
              // name="userId"
              // type="email"
              // placeholder="Correo Electrónico"
              // value={this.state.user.userId}
              // onChange={this.handleChange}
              // iconName="envelope"
              classNames={["flex1", "quest"]}
              style={{marginTop: 0}}
            />

            <p>Mauris sed malesuada ex. Donec eu molestie enim. Vestibulum neque felis, varius ut pharetra id, consequat sit amet enim. Mauris tempor, est in tempor egestas, ante tellus semper lorem, sed venenatis dolor nibh non odio. Suspendisse ultricies faucibus dictum. Sed vulputate luctus nulla. In hac habitasse platea dictumst. Sed vitae lacus nec dolor interdum pulvinar id a elit. In placerat eget eros sit amet imperdiet. Sed consequat non purus vel pulvinar. Phasellus a sagittis purus, nec eleifend ex. Cras enim elit, venenatis id elit at, fringilla condimentum dolor. Praesent sit amet congue libero. Duis nibh libero, sollicitudin a dui vitae, tristique mollis urna.</p>

            <p>Pellentesque augue urna, viverra vitae nisl sed, tempor pellentesque nibh. Morbi tincidunt nibh a est egestas, nec dapibus ipsum facilisis. Aenean malesuada malesuada nulla, in ornare lectus varius vitae. Proin tincidunt laoreet nunc vitae condimentum. Vestibulum eget nunc nisi. Pellentesque varius mi quis consectetur dapibus. Mauris finibus pellentesque tellus nec egestas. Suspendisse eget felis bibendum, sagittis mauris ultrices, ullamcorper ligula. In sapien elit, egestas sit amet egestas et, efficitur nec nunc. Aenean volutpat nisl nisl, a auctor nunc aliquet et. Aliquam erat volutpat. Sed vel justo diam. Nullam nec mi quis ipsum congue tristique eu non purus.</p>

            <FormIconButton
              style={{width: '23vmin'}}
              iconName="clipboard-check"
              onClick={this.handleSubmit}
              iconSize="2x"
            />
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Home;
