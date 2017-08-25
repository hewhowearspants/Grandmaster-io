import React, { Component } from 'react';

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
                {this.props.leaderInfo.map(data=>{
                    return <div className = 'leader-single' key = {data.id}>
                                <h4>{this.props.leaderInfo.indexOf(data)+1}</h4>
                                <div className="inside-leaderboard" style={{height:'5vh', width: (data.wins+1)*10+'vw', background:`rgba(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},1)`}}>
                                    <b>{data.display_name}</b>
                                    <p>Wins: {data.wins}</p>
                                </div>
                           </div>
                    })
                }
            </div>
        )
    }
}

export default Leaderboard;
