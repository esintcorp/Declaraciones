import React, { Component } from 'react';

import '../../App.css';
import Header from '../../components/logic/Header';
import FormIconButton from '../../components/form/FormIconButton';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { history } = this.props;

    history.push({
      pathname: "/home"
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header classNames="App-logo" logout/>
        <section className="App-section">
          <div className="terms-div">
            <h2><strong>Lorem Ipsum</strong></h2>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac elit non risus congue aliquam. Nunc vitae arcu neque. Sed pellentesque at dolor sit amet gravida. Cras lorem sem, accumsan eget eros id, malesuada efficitur felis. Cras tellus urna, accumsan in velit vitae, consequat posuere erat. Phasellus ut quam sit amet lectus condimentum condimentum. Aenean sit amet erat non augue fermentum vestibulum at at diam. Aenean vitae felis sed purus pulvinar iaculis. Nullam placerat leo in hendrerit suscipit.</p>

            <p>Pellentesque libero sapien, vulputate et imperdiet quis, pretium quis libero. Curabitur elementum, arcu nec pretium pulvinar, enim neque accumsan nisl, consectetur suscipit neque nunc vel augue. Sed porttitor tristique hendrerit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque vel dapibus enim. Morbi volutpat eget nisi a condimentum. Duis dictum urna ac dapibus semper. Sed a eros non dui volutpat consectetur imperdiet non elit. Maecenas ante neque, bibendum commodo fermentum sit amet, laoreet in odio. Vestibulum efficitur suscipit risus vitae pulvinar. Praesent eu metus nec tortor imperdiet auctor. Etiam aliquet euismod risus eu placerat. Aliquam eleifend leo sit amet lacus feugiat tincidunt.</p>

            <p>Mauris laoreet magna eu metus iaculis dignissim. Nullam varius libero vel nulla mollis dictum. Etiam sagittis laoreet tortor ac pretium. Nam ut ipsum in ligula bibendum convallis. Aenean feugiat nibh nibh, vel consectetur sapien laoreet id. Proin vitae nunc eget arcu ultricies tristique. Donec dictum tincidunt accumsan. Curabitur in dui vel enim facilisis commodo nec sit amet urna. Morbi tincidunt, mauris vel convallis efficitur, dui nisi sollicitudin turpis, quis molestie nibh odio vitae felis. Praesent posuere in sapien nec lobortis. Ut a consequat nisi. In justo erat, fringilla a feugiat a, consequat eget tellus. Integer mauris odio, suscipit non quam vel, iaculis consectetur risus. Duis non ultrices est.</p>

            <p>Mauris sed malesuada ex. Nullam eu turpis purus. Donec eu molestie enim. Vestibulum neque felis, varius ut pharetra id, consequat sit amet enim. Mauris tempor, est in tempor egestas, ante tellus semper lorem, sed venenatis dolor nibh non odio. Suspendisse ultricies faucibus dictum. Sed vulputate luctus nulla. In hac habitasse platea dictumst. Sed vitae lacus nec dolor interdum pulvinar id a elit. In placerat eget eros sit amet imperdiet. Sed consequat non purus vel pulvinar. Phasellus a sagittis purus, nec eleifend ex. Cras enim elit, venenatis id elit at, fringilla condimentum dolor. Praesent sit amet congue libero. Duis nibh libero, sollicitudin a dui vitae, tristique mollis urna.</p>

            <p>Pellentesque augue urna, viverra vitae nisl sed, tempor pellentesque nibh. Morbi tincidunt nibh a est egestas, nec dapibus ipsum facilisis. Aenean malesuada malesuada nulla, in ornare lectus varius vitae. Proin tincidunt laoreet nunc vitae condimentum. Vestibulum eget nunc nisi. Pellentesque varius mi quis consectetur dapibus. Mauris finibus pellentesque tellus nec egestas. Suspendisse eget felis bibendum, sagittis mauris ultrices, ullamcorper ligula. In sapien elit, egestas sit amet egestas et, efficitur nec nunc. Aenean volutpat nisl nisl, a auctor nunc aliquet et. Aliquam erat volutpat. Sed vel justo diam. Nullam nec mi quis ipsum congue tristique eu non purus.</p>
            <FormIconButton style={{width: '23vmin'}} iconName="clipboard-check" onClick={this.handleSubmit} iconSize="2x"/>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Home;
