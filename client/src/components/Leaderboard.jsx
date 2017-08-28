import React, { Component } from 'react';

// displays all users by how many wins they have
class Leaderboard extends Component {
    // constructor(){
    //     super();
    //     this.state=({
    //         leaderInfo: null
    //     })
    // }

    componentDidMount(){
        console.log(this.props.leaderInfo)
    }

    render(){
        return(
            <div className = 'leader-board'>
                <h3>Leaderboard</h3>
                {this.props.leaderInfo.map(data => {
                    return <div className = 'leader-single' key = {data.id}>
                                <h4>{this.props.leaderInfo.indexOf(data)+1}</h4>
                                <div className = 'leader-start'>
                                <div className = 'inside-leaderboard' style = {{ width: (data.wins+1)*10+'vw', background:`rgba(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},1)`, animation: 'scoregrow 1s linear'}}>
                                    <b>{data.display_name}</b>
                                    <p style = {{color:'white'}}>Wins: {data.wins}</p>
                                </div>
                                </div>
                           </div>
                    })
                }
            </div>
        )
    }
}

export default Leaderboard;
