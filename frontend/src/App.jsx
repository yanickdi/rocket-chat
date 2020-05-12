import React from 'react';

const VIDEOS = [
    {
        name: 'Open Book Prüfung mit Moodle',
        videoId: "71b8bc85-92c8-402e-9940-3da6b75c2d83",
        channel: 'openbookpruefungmitmoodle'
    }, {
        name: 'Zeit mit Kindern verbringen',
        videoId: '452adff3-65eb-446e-911a-e0f051937d70',
        channel: 'zeitmitkids'
    }, {
        name: 'Statement zum Coronavirus: Rektor Martin Polaschek (2. April)',
        videoId: 'f9def79e-6725-435d-b05b-53ae61b88df9',
        channel: 'rektorat'
    }
]

class App extends React.Component {

    startVideo(video) {
        this.setState({currentVideo: video});
        this.rocketChatComp.goToChannel(video.channel);
    }

    state = {
        currentVideo: null
    }

    rocketChatComp = null;

    render() {
        return (
            <div className="app">
                <ul className="nav">
                    {VIDEOS.map(video => <li key={video.videoId}>
                        <a href="#" onClick={() => this.startVideo(video)}><span>{video.name}</span></a>
                    </li>)}
                </ul>
                <div className="video">
                    {!!this.state.currentVideo && <EmbeddedUniTubeVideo videoId={this.state.currentVideo.videoId}/>}
                </div>
                <div className="rocket-chat">
                    <RocketChatComponent ref={(comp) => this.rocketChatComp = comp}/>
                </div>
            </div>
        );
    }

}

const EmbeddedUniTubeVideo = ({videoId}) => {
    return <iframe title="unitube" allowFullScreen="" className="embed-responsive-item ng-star-inserted"
                   frameBorder="0" scrolling="no"
                   src={`https://unitube.uni-graz.at/paella/ui/watch.html?id=${videoId}`}></iframe>;
}

class RocketChatComponent extends React.Component {
    state = {
        hasChannel: false
    }

    goToChannel(channelName) {
        document.getElementById('rocket-chat-iframe').contentWindow.postMessage({
            externalCommand: 'go',
            path: `/channel/${channelName}`,
        }, '*');
        setTimeout(() => this.setState({hasChannel: true}), 500);

    }

    render() {
        return <iframe style={{opacity: this.state.hasChannel ? 1 : 0}} title="rocket-chat" frameBorder="0"
                       id="rocket-chat-iframe"
                       src={`http://chat.rocket.local:3000/`}></iframe>;
    }
}

export default App;
